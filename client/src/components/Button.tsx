import { cn } from "@/lib/utils";
import { BiLoader } from "react-icons/bi";

export const Button = ({
  className,
  children,
  startContent,
  endContent,
  loading,
  disabled,
  color = "primary",
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  loading?: boolean;
  color?: "danger" | "primary";
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "disabled:bg-gray-500 px-4 py-1 rounded-md flex gap-x-2 items-center",
        color === "primary"
          ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          : "bg-rose-500 hover:bg-rose-600 active:bg-rose-700",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="flex relative">
          <BiLoader className="inset-0 mx-auto absolute animate-spin" size={20} />
          <span className="invisible">{startContent}</span>
          <span className="invisible">{children}</span>
          <span className="invisible">{endContent}</span>
        </div>
      ) : (
        <>
          {startContent}
          {children}
          {endContent}
        </>
      )}
    </button>
  );
};
