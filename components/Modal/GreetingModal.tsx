import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type GreetingModalProps = {
  title: string;
  description?: string;
  secondaryDescription?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  Icon?: React.ReactNode;
  cta?: string;
  redirectTo?: string;
  onRedirect?: () => void;
};

const GreetingModal = ({
  title,
  description,
  secondaryDescription,
  isOpen,
  onOpenChange,
  Icon,
  cta,
  redirectTo,
  onRedirect,
}: GreetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full flex flex-col justify-center min-h-screen m-0 px-4 max-w-full sm:max-w-full rounded-none"
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-4 text-center mb-8">
          <div className="mb-4 fixed top-16 -translate-y-1/2">
            <h1 className="text-logo">roomey.</h1>
          </div>
          {Icon && <div className="flex items-center gap-2">{Icon}</div>}
          <DialogTitle className="text-sub-heading font-bold">
            {title}
          </DialogTitle>

          {description && (
            <div>
              <p className="text-center text-secondary text-md font-semibold w-60">
                {description}
              </p>
              {secondaryDescription && (
                <p className=" text-secondary text-center text-md font-semibold w-60">
                  {secondaryDescription}
                </p>
              )}
            </div>
          )}
        </DialogHeader>
        {redirectTo && (
          <a href={redirectTo}>
            <Button size="lg" className="w-full text-lg" onClick={onRedirect}>
              {cta}
            </Button>
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GreetingModal;
