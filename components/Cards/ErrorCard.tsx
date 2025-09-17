import { capitalizeFirstLetters } from "@/lib/helper";
import { FieldError } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ErrorsProps = {
  Errors: object;
};

const ErrorCard = ({ Errors }: ErrorsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive text-center font-bold">
          Almost there! Please complete:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-destructive font-thin">
          {Object.entries(Errors)
            .map(([field, error]: [string, FieldError]) => {
              if (!error?.message) return null;

              const formattedField = capitalizeFirstLetters(
                field.replace(/[_\-]/g, " ")
              );
              return <li key={field}>{formattedField}</li>;
            })
            .filter(Boolean)}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
