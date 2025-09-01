import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldConfig } from "@/lib/type";
import { Check, ChevronDownIcon, CloudUpload, Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup } from "../ui/radio-group";

type RenderFieldsProps = {
  control: Control<FieldValues>;
  fields: FieldConfig[];
};

const RenderFields = ({ control, fields }: RenderFieldsProps) => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = () => inputRef.current?.click();

  const onContainerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) pickFile();
  };

  const onButtonPick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    pickFile();
  };
  return fields.map((f) => {
    if (f.name === "budget_amount") {
      const unitField = fields.find((ff) => ff.name === "budget_unit");
      const amountField = fields.find((ff) => ff.name === "budget_amount");

      if (!unitField?.name || !amountField?.name) return null;

      return (
        <div key="budget-group" className="space-y-2">
          <FormLabel>
            {f.label} {f.required && <span>*</span>}
          </FormLabel>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              key={amountField.name}
              control={control}
              name={amountField.name as FieldPath<FieldValues>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key={unitField.name}
              control={control}
              name={unitField.name as FieldPath<FieldValues>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={unitField.placeholder || "Select"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {unitField.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    if (f.name === "budget_unit") return null;

    return (
      <FormField
        key={f.name}
        control={control}
        name={f.name}
        render={({ field }) => {
          switch (f.type) {
            case "checkbox": {
              // Multi-select (array) when options exist
              if (f.options?.length) {
                const values: string[] = Array.isArray(field.value)
                  ? field.value
                  : [];

                const toggle = (val: string) => {
                  const next = new Set(values);
                  next.has(val) ? next.delete(val) : next.add(val);
                  field.onChange(Array.from(next));
                };

                return (
                  <FormItem className={"flex flex-wrap gap-2"}>
                    <FormLabel className="mb-1">
                      {f.label} {f.required && <span>*</span>}
                    </FormLabel>
                    {f.description && (
                      <FormDescription>{f.description}</FormDescription>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {f.options.map((opt) => {
                        const active = values.includes(opt.value);
                        return (
                          <Button
                            key={opt.value}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => toggle(opt.value)}
                            aria-pressed={active}
                            className={[
                              "border text-sm",
                              "border-primary/15",
                              active &&
                                "border-primary bg-primary/10 text-primary",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {opt.label}
                          </Button>
                        );
                      })}
                    </div>

                    <FormMessage />
                  </FormItem>
                );
              }

              // Single boolean (no options)
              return (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none w-full">
                    <FormLabel>{f.label}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }

            case "select":
              return (
                <FormItem>
                  <FormLabel>
                    {f.label}
                    {f.required && <span>*</span>}
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={f.placeholder || "Select..."}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );

            case "textarea": {
              const min = 50;
              const max = 300;

              const val = typeof field.value === "string" ? field.value : "";
              const len = val.length;
              const remaining = Math.max(0, max - len);

              return (
                <FormItem>
                  <FormLabel>
                    {f.label}
                    {f.required && <span>*</span>}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={f.placeholder}
                      value={val}
                      onChange={(e) => field.onChange(e.target.value)}
                      maxLength={max}
                      className="h-40"
                      aria-describedby={`${f.name}-counter`}
                    />
                  </FormControl>

                  <FormDescription>
                    {`${remaining} characters remaining (min ${min}, max ${max})`}
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              );
            }

            case "radio group": {
              return (
                <FormItem
                  className={`${f.isRow ? "flex flex-wrap items-center" : ""}`}
                >
                  <FormLabel className="mb-1">
                    {f.label}
                    {f.required && <span>*</span>}
                  </FormLabel>
                  {f.description && (
                    <FormDescription>{f.description}</FormDescription>
                  )}

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className={"flex flex-wrap gap-2"}
                    >
                      {f.options?.map((opt) => {
                        const active = field.value === opt.value;
                        return (
                          <Button
                            key={opt.value}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => field.onChange(opt.value)}
                            aria-pressed={active}
                            className={[
                              "border text-sm",
                              "border-primary/15",
                              active &&
                                "border-primary bg-primary/10 text-primary",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {opt.label}
                          </Button>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <div className="block">
                    <FormMessage className="block bottom-0 " />
                  </div>
                </FormItem>
              );
            }

            case "file": {
              const isProfilePhoto = f.name === "profile_photo";
              if (!isProfilePhoto) {
                return (
                  <FormItem>
                    <FormLabel>
                      {f.label}
                      {f.required && <span>*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }

              const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
              const inputId = `${f.name}-input`;

              return (
                <FormItem>
                  <FormControl>
                    <div className="space-y-4">
                      <div
                        className="rounded-xl h-46 border border-dashed border-muted-foreground/30 bg-muted/20 p-6 sm:p-8 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (!file) return;
                          if (!/^image\/(png|jpe?g)$/i.test(file.type)) return;
                          if (file.size > MAX_FILE_SIZE) return;
                          field.onChange(file);
                        }}
                        role="button"
                        tabIndex={0}
                        onClick={onContainerClick} // <- fires only when blank area is clicked
                        onKeyDown={(e) => {
                          // accessibility: Enter/Space to open
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            pickFile();
                          }
                        }}
                      >
                        {!(field.value instanceof File) ? (
                          <div className="flex flex-col items-center gap-3">
                            <Images />
                            <p className="text-sm">+ Upload your best Photo</p>
                            <Button
                              type="button"
                              className="inline-flex items-center gap-2"
                              onClick={onButtonPick}
                            >
                              <CloudUpload className="h-4 w-4" />
                              Choose Photo
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <Image
                              src={URL.createObjectURL(field.value)}
                              alt="profile photo"
                              width={100}
                              height={100}
                              className="rounded-full h-24 w-24"
                            />
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={onButtonPick}
                              >
                                Replace Photo
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  field.onChange(null);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <input
                          id={inputId}
                          name={field.name}
                          type="file"
                          accept="image/png,image/jpeg"
                          className="hidden"
                          ref={inputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.currentTarget.value = "";

                            if (!file) return;
                            if (!/^image\/(png|jpe?g)$/i.test(file.type))
                              return;
                            if (file.size > MAX_FILE_SIZE) return;

                            field.onChange(file);
                          }}
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-black">
                          Photo Tips for Maximum Impact:
                        </p>
                        <ul className="mt-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3" /> Clear, well-lit
                            face shot works best
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3" /> Smile naturally
                            — more approachable
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3" /> Avoid group
                            photos or sunglasses
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3" /> High resolution
                            (≥ 200×200px)
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3" /> JPG or PNG,
                            under 5 MB
                          </li>
                        </ul>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }

            case "number":
              return (
                <FormItem>
                  <FormLabel>
                    {f.label}
                    {f.required && <span>*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={f.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );

            case "date": {
              const selected: Date | undefined = field.value
                ? new Date(field.value)
                : undefined;

              return (
                <FormItem>
                  <FormLabel>
                    {f.label}
                    {f.required && <span>*</span>}
                  </FormLabel>
                  <FormControl>
                    <Popover
                      open={openPopover === f.name}
                      onOpenChange={(o) => setOpenPopover(o ? f.name : null)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={`justify-between font-normal ${
                            !selected ? "text-muted-foreground" : ""
                          }`}
                        >
                          {selected
                            ? selected.toLocaleDateString()
                            : f.placeholder ?? "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selected ?? undefined}
                          captionLayout="dropdown"
                          onSelect={(d) => {
                            field.onChange(d ?? null);
                            setOpenPopover(null); // close popover
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }

            default:
              return (
                <FormItem>
                  <FormLabel>
                    {f.label}
                    {f.required && <span>*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
          }
        }}
      />
    );
  });
};

export default RenderFields;
