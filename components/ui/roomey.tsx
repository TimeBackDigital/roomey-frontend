import { cn } from "@/lib/utils";

type RoomeyTextProps = {
  className?: string;
};

const RoomeyText = ({ className }: RoomeyTextProps) => {
  return (
    <div className={"flex flex-col items-center gap-2 text-center"}>
      <h1 className={cn("text-logo", className)}>roomey.</h1>
    </div>
  );
};

export default RoomeyText;
