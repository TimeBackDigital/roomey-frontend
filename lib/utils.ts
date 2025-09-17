import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { ROLE_SLUG } from "./enum";
import { formatErrorMessage } from "./helper";
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

export const ErrorMap: z.ZodErrorMap = (issue) => {
  switch (issue.code) {
    case "invalid_enum_value":
      return {
        message: `Please select a valid option for ${formatErrorMessage(
          issue.path.join(" > ")
        )}`,
      };
    case "invalid_date":
      return {
        message: `Please select a specific date for ${formatErrorMessage(
          issue.path.join(" > ")
        )}`,
      };
    case "invalid_type": {
      const received = String(issue.received);
      const expected = String(issue.expected);
      if (received === "undefined" || received === "null") {
        return {
          message: `Please complete this field ${formatErrorMessage(
            issue.path.join(" > ")
          )}`,
        };
      }
      if (expected === "number")
        return {
          message: `Please enter a valid number for ${formatErrorMessage(
            issue.path.join(" > ")
          )}`,
        };
      return {
        message: `Please enter a valid input ${formatErrorMessage(
          issue.path.join(" > ")
        )}`,
      };
    }
    case "too_small":
      return {
        message: `The text is too small for ${formatErrorMessage(
          issue.path.join(" > ")
        )}`,
      };
    case "too_big":

    case "custom":
      return {
        message: `${"Please enter a valid input"} for ${formatErrorMessage(
          issue.path.join(" > ")
        )}`,
      };

    default:
      return {
        message: `Plase complete this field ${formatErrorMessage(
          issue.path.join(" > ")
        )}`,
      };
  }
};

function zodForField(f: FieldConfig): z.ZodTypeAny {
  const isFieldRequired = f.required === true;

  const makeOptionalOrRequired = <T extends z.ZodTypeAny>(schema: T): T =>
    isFieldRequired ? schema : (schema.optional() as unknown as T);

  switch (f.type) {
    case "text":
      let schema = z.string().trim();
      if (isFieldRequired) schema = schema.min(1);
      return makeOptionalOrRequired(schema);
    case "textarea": {
      let schema = z.string().trim();
      if (isFieldRequired) schema = schema.min(50).max(300);
      return makeOptionalOrRequired(schema);
    }

    case "number": {
      const schema = z.preprocess(
        (v) => (v === "" || v == null ? undefined : v),

        z.coerce
          .number()
          .refine((n) => Number.isFinite(n), { message: "Invalid input" })
      );

      return makeOptionalOrRequired(schema);
    }
    case "multi file":
      const MULTI_FILE_MAX = 10;
      const PER_FILE_MAX = 5 * 1024 * 1024;
      const multiFileSchema = z
        .array(z.instanceof(File))
        .max(MULTI_FILE_MAX)
        .refine(
          (files) =>
            files.every((f) =>
              /^image\/(png|jpe?g)|video\/(mp4|quicktime)$/i.test(f.type)
            ),
          { message: "Only JPG/PNG images or MP4/MOV videos are allowed" }
        )
        .refine((files) => files.every((f) => f.size <= PER_FILE_MAX), {
          message: "Each file must be ≤ 5MB",
        });

      return makeOptionalOrRequired(multiFileSchema);
    case "select": {
      const values = (f.options?.map((o) => o.value) ?? []).filter(
        (v): v is string => typeof v === "string" && v.length > 0
      );

      if (values.length > 0) {
        const enumSchema = z.preprocess(
          (v) => (v === "" || v == null ? undefined : v),
          z.enum([values[0], ...values.slice(1)])
        );
        return makeOptionalOrRequired(enumSchema);
      }

      const s = z
        .string()
        .trim()
        .min(1)
        .transform(
          (v) => (v === "" ? undefined : v) as unknown as string | undefined
        );

      return makeOptionalOrRequired(s);
    }

    case "radio group": {
      const values = f.options?.map((o) => o.value) ?? [];
      if (values.length > 0) {
        const enumSchema = z.enum(values as [string, ...string[]]);
        return makeOptionalOrRequired(enumSchema);
      }

      let s = z.string().trim();
      if (isFieldRequired) s = s.min(1);
      return makeOptionalOrRequired(s);
    }

    case "checkbox": {
      let arr = z.array(z.string());
      if (isFieldRequired) {
        arr = arr.min(1);
      }
      arr = makeOptionalOrRequired(arr);
      return arr;
    }

    case "date": {
      const d = z.coerce.date().refine((v) => !Number.isNaN(v.getTime()));

      return makeOptionalOrRequired(d);
    }

    case "file": {
      let any = z.instanceof(File);
      if (isFieldRequired) {
        any = any.refine((v: File) => v != null);
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
    case "multi file":
      return [];
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

export const toBoolFromYesNo = (v: unknown) =>
  String(v).toLowerCase() === "yes";

export const isFile = (v: unknown): v is File =>
  typeof window !== "undefined" && v instanceof File;

export function mapZodErrorsToForm(
  err: z.ZodError,
  setError: (name: string, error: { message: string }) => void
) {
  for (const issue of err.errors) {
    if (issue.path.length > 0) {
      setError(issue.path[0] as string, { message: issue.message });
    }
  }
}
