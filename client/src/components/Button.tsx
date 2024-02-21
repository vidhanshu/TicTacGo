import { cn } from "@/lib/utils";
import { BiLoader } from "react-icons/bi";

export const Button = ({
  className,
  children,
  startContent,
  endContent,
  loading,
  disabled,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "disabled:bg-gray-500 px-4 py-1 bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 flex gap-x-2 items-center",
        className
      )}
      {...props}
    >
      {loading ? (
        <BiLoader className="animate-spin" size={20} />
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
