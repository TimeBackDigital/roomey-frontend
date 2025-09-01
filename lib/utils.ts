import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { ROLE_SLUG } from "./enum";
import { FieldConfig } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ExtractFirstLetterRole = (role: string) => {
  return role.charAt(0);
};

export const MaskPhoneNumberMiddle = (phoneNumber: string) => {
  return phoneNumber.replace(/\d/g, "*");
};

export const getRoleSegment = (role: unknown): string | undefined => {
  if (role) return ROLE_SLUG[role as keyof typeof ROLE_SLUG] || "";
  return undefined;
};

export const CheckEmail = (s: string) => /\S+@\S+\.\S+/.test(s);

// Very permissive: digits with optional +, spaces, dashes, parentheses
export const CheckPhone = (s: string) => /^[+]?[\d\s\-().]{7,20}$/.test(s);

export const NormalizePhone = (raw: string) => {
  let d = raw.replace(/[^\d]/g, "");
  if (d.startsWith("0")) d = `63${d.slice(1)}`;
  else if (!d.startsWith("63")) d = `63${d}`;
  return `+${d}`;
};

export const getRoleDashboard = (role: string) => {
  return role === "admin" ? "/admin/dashboard" : `/${role}/dashboard`;
};

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};

export const FormatDateTable = (date: Date | undefined) => {
  return date ? format(date, "dd/MM/yyyy") : "";
};

export const CapitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type StepConfig = Record<number, FieldConfig[]>;

export const ErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case "invalid_enum_value":
      return { message: "Please select a valid option" };
    case "invalid_date":
      return { message: "Please select a valid date" };
    case "invalid_type": {
      const received = String(issue.received);
      const expected = String(issue.expected);
      if (received === "undefined" || received === "null") {
        return { message: "This field is required" };
      }
      if (expected === "number")
        return { message: "Please enter a valid number" };
      return { message: "Invalid input" };
    }
    case "too_small":
    case "too_big":
    case "custom":
      return { message: ctx.defaultError || "Invalid input" };
    default:
      return { message: "Invalid input" };
  }
};

function zodForField(f: FieldConfig): z.ZodTypeAny {
  const isFieldRequired = f.required === true;

  const REQUIRED = "This field is required";
  const INVALID = "Invalid input";

  const makeOptionalOrRequired = <T extends z.ZodTypeAny>(schema: T): T =>
    isFieldRequired ? schema : (schema.optional() as unknown as T);

  switch (f.type) {
    case "text":
    case "textarea": {
      // no constructor options -> no chance of the “message + error” clash
      let schema = z.string().trim();
      if (isFieldRequired) schema = schema.min(1, REQUIRED);
      return makeOptionalOrRequired(schema);
    }

    case "number": {
      // accept string, coerce to number, generic invalid message
      const schema = z
        .union([z.number(), z.string()])
        .transform((v) => (typeof v === "string" ? Number(v) : v))
        .refine((v) => Number.isFinite(v), { message: INVALID });
      return makeOptionalOrRequired(schema);
    }

    case "select":
    case "radio group": {
      const values = f.options?.map((o) => o.value) ?? [];
      if (values.length > 0) {
        // Avoid enum options object to be compatible across Zod versions
        const enumSchema = z.enum(values as [string, ...string[]]);
        return makeOptionalOrRequired(enumSchema);
      }
      // Fallback if options not ready yet
      let s = z.string().trim();
      if (isFieldRequired) s = s.min(1, REQUIRED);
      return makeOptionalOrRequired(s);
    }

    case "checkbox": {
      // multi-select
      let arr = z.array(z.string()).default([]);
      if (isFieldRequired)
        arr = arr.refine((v) => v.length > 0, { message: REQUIRED });
      return makeOptionalOrRequired(arr);
    }

    case "date": {
      // coerce from string; also ensure valid date
      const d = z.coerce
        .date()
        .refine((v) => !Number.isNaN(v.getTime()), { message: INVALID });
      // requiredness handled by optional() wrapper
      return makeOptionalOrRequired(d);
    }

    case "file": {
      // Keep it lenient; add a simple required check if needed
      let any = z.any();
      if (isFieldRequired) {
        any = any.refine((v) => v != null && v !== "", { message: REQUIRED });
      }
      return makeOptionalOrRequired(any);
    }

    default:
      return z.any();
  }
}

export function buildStepSchema(fields: FieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    shape[f.name] = zodForField(f);
  }
  return z.object(shape);
}

export function buildAllStepsSchema(stepConfig: StepConfig) {
  const stepNumbers = Object.keys(stepConfig)
    .map(Number)
    .sort((a, b) => a - b);

  let schema: z.ZodObject<Record<string, z.ZodTypeAny>> | null = null;
  for (const n of stepNumbers) {
    const s = buildStepSchema(stepConfig[n] ?? []);
    schema = schema ? schema.merge(s) : s;
  }
  return schema ?? z.object({});
}

type DefaultStrategy = "empty" | "firstOption";

function defaultForField(
  f: FieldConfig,
  strategy: DefaultStrategy = "empty"
): unknown {
  switch (f.type) {
    case "text":
    case "textarea":
      return "";
    case "number":
      return "";
    case "date":
      return undefined;
    case "file":
      return undefined;
    case "checkbox":
      return [];
    case "select":
    case "radio group": {
      if (strategy === "firstOption" && f.options?.length) {
        return f.options[0].value;
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

export function buildStepDefaults(
  fields: FieldConfig[],
  strategy: DefaultStrategy = "empty"
) {
  return fields.reduce<Record<string, unknown>>((acc, f) => {
    acc[f.name] = defaultForField(f, strategy);
    return acc;
  }, {});
}

export function buildAllDefaults(
  stepConfig: StepConfig,
  strategy: DefaultStrategy = "empty"
) {
  const stepNumbers = Object.keys(stepConfig)
    .map(Number)
    .sort((a, b) => a - b);

  const all: Record<string, unknown> = {};
  for (const n of stepNumbers) {
    const stepFields = stepConfig[n] ?? [];
    Object.assign(all, buildStepDefaults(stepFields, strategy));
  }
  return all;
}
