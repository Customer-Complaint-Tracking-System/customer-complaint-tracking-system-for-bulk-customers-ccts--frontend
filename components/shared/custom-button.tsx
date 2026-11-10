import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CustomButtonProps = {
  title: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const CustomButton = ({
  title,
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
  className,
}: CustomButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant="ghost"
      className={cn(
        "h-10 rounded-md px-5 text-sm font-medium transition-colors cursor-pointer",

        variant === "primary" && "bg-teal-600 text-white! hover:bg-teal-700",

        variant === "outline" &&
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900",

        className,
      )}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
