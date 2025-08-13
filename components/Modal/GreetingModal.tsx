import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "../ui/button";

type GreetingModalProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  Icon: React.ReactNode;
  cta: string;
  redirectTo: string;
};

const GreetingModal = ({
  title,
  description,
  isOpen,
  onOpenChange,
  Icon,
  cta,
  redirectTo,
}: GreetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full flex flex-col justify-center min-h-screen m-0 px-4 max-w-full sm:max-w-full rounded-none">
        <DialogHeader className="flex flex-col items-center justify-center gap-4 text-center mb-8">
          <div className="mb-4">
            <h1>roomey.</h1>
          </div>
          <div className="flex items-center gap-2">{Icon}</div>
          <DialogTitle className="text-xl font-bold text-primary">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-primary">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <Link href={redirectTo}>
          <Button size="lg" className="w-full text-lg">
            {cta}
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default GreetingModal;
