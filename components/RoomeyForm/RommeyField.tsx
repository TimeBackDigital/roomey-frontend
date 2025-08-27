import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
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
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { Control, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";

type RenderFieldsProps = {
  control: Control<FieldValues>;
  fields: FieldConfig[];
  nextStep: () => void;
};

const RenderFields = ({ control, fields, nextStep }: RenderFieldsProps) => {
  return fields.map((f) => (
    <FormField
      key={f.name}
      control={control}
      name={f.name}
      render={({ field }) => {
        switch (f.type) {
          case "checkbox_agreement":
            return (
              <FormItem className="flex flex-col items-center justify-center space-x-3 space-y-0">
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    src={"/assets/avatar/onboarding_avatar.webp"}
                    alt="Profile Preview"
                    width={500}
                    height={500}
                    className="rounded-full w-52 h-52 object-cover"
                  />
                </div>
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none w-full">
                    <FormLabel>{f.label}</FormLabel>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            );
          case "checkbox":
            return (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none w-full">
                  <FormLabel>{f.label}</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            );

          // Select
          case "select":
            return (
              <FormItem>
                <FormLabel>{f.label}</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={f.placeholder || "Select..."} />
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

          // Textarea
          case "textarea":
            return (
              <FormItem>
                <FormLabel>{f.label}</FormLabel>
                <FormControl>
                  <Textarea placeholder={f.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );

          case "file":
            return (
              <FormItem>
                <FormLabel>{f.label}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );

          case "profile_photo":
            return (
              <FormItem className="text-center flex flex-col justify-between h-[80vh]">
                <div className="space-y-4">
                  <h3>Add a profile photo</h3>
                  <h3 className="font-normal">{f.title}</h3>

                  <p>{f.description}</p>
                </div>

                <FormControl>
                  <div className="flex flex-col items-center gap-4">
                    {field.value ? (
                      <Image
                        src={URL.createObjectURL(field.value)}
                        alt="Profile Preview"
                        width={500}
                        height={500}
                        className="rounded-full w-52 h-52 object-cover"
                      />
                    ) : (
                      <UserCircle className="w-42 h-42 text-primary" />
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`${f.name}-input`}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                    <FormMessage />
                  </div>
                </FormControl>

                <div className="space-y-2 w-full">
                  {!field.value ? (
                    <>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() =>
                          document.getElementById(`${f.name}-input`)?.click()
                        }
                        type="button"
                      >
                        Choose a photo
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        type="button"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.capture = "user";
                          input.onchange = function (
                            this: GlobalEventHandlers,
                            ev: Event
                          ) {
                            const file = (ev.target as HTMLInputElement)
                              .files?.[0];
                            if (file) field.onChange(file);
                          };
                          input.click();
                        }}
                      >
                        Take a photo
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() =>
                          document.getElementById(`${f.name}-input`)?.click()
                        }
                        type="button"
                      >
                        Replace photo
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        type="button"
                        onClick={nextStep}
                      >
                        Next
                      </Button>
                    </>
                  )}
                </div>
              </FormItem>
            );

          default:
            return (
              <FormItem>
                <FormLabel>{f.label}</FormLabel>
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
  ));
};

export default RenderFields;
