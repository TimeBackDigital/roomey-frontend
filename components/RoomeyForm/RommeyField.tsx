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

  const hiddenFields = [
    "budget_amount",
    "budget_unit",
    "rent_amount",
    "rent_unit",
    "bond_amount",
    "bond_unit",
    "availability",
  ];

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
                      placeholder="$250"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key={"budget_unit"}
              control={control}
              name={"budget_unit"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-background-secondary">
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
    } else if (f.name === "rent_amount") {
      const amountField = fields.find((ff) => ff.name === "rent_amount");
      const unitField = fields.find((ff) => ff.name === "rent_unit");

      if (!amountField?.name || !unitField?.name) return null;

      return (
        <div key="rent-group" className="space-y-2">
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
                      placeholder="$250"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key={unitField?.name}
              control={control}
              name={unitField?.name as FieldPath<FieldValues>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-background-secondary">
                        <SelectValue
                          placeholder={unitField?.placeholder || "Select"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {unitField?.options?.map((opt) => (
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
    } else if (f.name === "bond_amount") {
      const unitField = fields.find((ff) => ff.name === "availability");
      const amountField = fields.find((ff) => ff.name === "bond_amount");

      if (!amountField?.name || !unitField?.name) return null;

      return (
        <div key="availability-group" className="gap-2 grid grid-cols-2">
          <div className="space-y-2">
            <FormLabel>
              {amountField.label} {amountField.required && <span>*</span>}
            </FormLabel>

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
                      placeholder="$250"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormLabel>
              {unitField.label} {unitField.required && <span>*</span>}
            </FormLabel>
            <FormField
              key={unitField?.name}
              control={control}
              name={unitField?.name as FieldPath<FieldValues>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-background-secondary">
                        <SelectValue
                          placeholder={unitField.placeholder || "Select"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {unitField?.options?.map((opt) => (
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

    if (hiddenFields.includes(f.name)) return null;

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
                              "border",
                              active && "bg-primary text-background-secondary",
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
                  className={`${
                    f.isRow ? "flex flex-wrap items-center" : "flex flex-col"
                  }`}
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
                      value={field.value ?? ""}
                      className={"flex flex-wrap gap-2"}
                    >
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-wrap gap-2"
                      >
                        {f.options?.map((opt) => {
                          const active = field.value === opt.value;

                          return (
                            <Button
                              key={opt.value}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                field.onChange(active ? undefined : opt.value);
                              }}
                              aria-pressed={active}
                              className={[
                                "border text-sm",
                                active &&
                                  "bg-primary text-background-secondary",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                            >
                              {opt.label}
                            </Button>
                          );
                        })}
                      </RadioGroup>
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
                        className="rounded-xl h-46 border border-dashed border-muted-foreground/30 bg-muted/20 p-6 sm:p-8 text-center flex justify-center items-center"
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
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Images />
                            <p className="text-sm">+ Upload your best Photo</p>
                            <Button
                              type="button"
                              className="inline-flex items-center gap-2"
                              onClick={onButtonPick}
                            >
                              <CloudUpload className="h-8 w-8 text-white" />
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

            case "multi file": {
              const MAX_FILE_SIZE = 5 * 1024 * 1024;
              const MAX_FILES = 10;
              const ACCEPT = "image/png,image/jpeg,video/mp4,video/quicktime";

              const inputId = `${f.name}-input`;

              const toArray = (list?: FileList | null) =>
                list ? Array.from(list) : [];
              const isAcceptable = (file: File) =>
                /^(image\/(png|jpe?g)|video\/(mp4|quicktime))$/i.test(
                  file.type
                ) && file.size <= MAX_FILE_SIZE;

              return (
                <FormItem>
                  <FormControl>
                    <div className="space-y-4">
                      <div
                        className="rounded-xl min-h-46 border border-dashed border-muted-foreground/30 bg-muted/20 p-6 sm:p-8 text-center flex justify-center items-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const incoming = toArray(e.dataTransfer.files).filter(
                            isAcceptable
                          );
                          if (!incoming.length) return;
                          const curr: File[] = Array.isArray(field.value)
                            ? field.value
                            : [];
                          const room = Math.max(0, MAX_FILES - curr.length);
                          field.onChange(curr.concat(incoming.slice(0, room)));
                        }}
                        role="button"
                        tabIndex={0}
                        onClick={onContainerClick}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            pickFile();
                          }
                        }}
                      >
                        {!(
                          Array.isArray(field.value) && field.value.length > 0
                        ) ? (
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Images />
                            <p className="text-sm">
                              + Upload up to 10 Photos &amp; Media
                            </p>
                            <Button
                              type="button"
                              className="inline-flex items-center gap-2"
                              onClick={onButtonPick}
                            >
                              <CloudUpload className="h-8 w-8 text-white" />
                              Choose Photo
                            </Button>
                          </div>
                        ) : (
                          <div className="w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {field.value.map((file: File, idx: number) => {
                                const isImage = file.type.startsWith("image/");
                                const url = URL.createObjectURL(file);
                                return (
                                  <div
                                    key={idx}
                                    className="relative group rounded-md overflow-hidden border bg-background"
                                  >
                                    {isImage ? (
                                      <Image
                                        src={url}
                                        alt={file.name}
                                        width={240}
                                        height={180}
                                        className="w-full h-32 object-cover"
                                        onLoad={() => URL.revokeObjectURL(url)}
                                      />
                                    ) : (
                                      <video
                                        src={url}
                                        className="w-full h-32 object-cover"
                                        onLoadedData={() =>
                                          URL.revokeObjectURL(url)
                                        }
                                        muted
                                      />
                                    )}
                                    <div className="absolute inset-0 flex items-end justify-between p-2 opacity-0 group-hover:opacity-100 transition">
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();

                                          inputRef.current?.click();

                                          if (inputRef.current) {
                                            inputRef.current.dataset.replaceIndex =
                                              String(idx);
                                          }
                                        }}
                                      >
                                        Replace
                                      </Button>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const next = [...field.value];
                                          next.splice(idx, 1);
                                          field.onChange(next);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Counter */}
                            <div className="mt-3 text-sm text-muted-foreground">
                              {field.value.length}/{MAX_FILES} selected
                            </div>

                            {/* Add more button */}
                            {field.value.length < MAX_FILES && (
                              <div className="mt-3 flex justify-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={onButtonPick}
                                >
                                  Add More
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        <input
                          id={inputId}
                          name={field.name}
                          type="file"
                          accept={ACCEPT}
                          multiple
                          className="hidden"
                          ref={inputRef}
                          onChange={(e) => {
                            const picked = toArray(e.target.files).filter(
                              isAcceptable
                            );
                            e.currentTarget.value = "";

                            if (!picked.length) return;

                            const replaceIndex = (
                              inputRef.current as unknown as HTMLInputElement
                            )?.dataset?.replaceIndex;
                            if (replaceIndex !== undefined) {
                              const idx = Number(replaceIndex);
                              const next: File[] = Array.isArray(field.value)
                                ? [...field.value]
                                : [];
                              next[idx] = picked[0];
                              field.onChange(next);
                              delete (
                                inputRef.current as unknown as HTMLInputElement
                              ).dataset.replaceIndex;
                              return;
                            }

                            // add files (respect max)
                            const curr: File[] = Array.isArray(field.value)
                              ? field.value
                              : [];
                            const room = Math.max(0, MAX_FILES - curr.length);
                            field.onChange(curr.concat(picked.slice(0, room)));
                          }}
                        />
                      </div>

                      {/* tips area under the drop zone */}
                      <div className="flex flex-col justify-center items-center">
                        <p className="italic text-sm mx-auto max-w-2xs text-center">
                          Tip: Natural lighting and decluttered spaces get 3x
                          more inquiries
                        </p>
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
                          variant="outline_card"
                          className={`justify-between font-normal bg-background-secondary ${
                            !selected ? "text-muted-foreground text-sm" : ""
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
