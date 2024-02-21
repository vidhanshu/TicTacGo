import { cn } from "@/lib/utils";

export const Input = ({
  label,
  className,
  containerProps = {},
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
}) => {
  let id = props.id ?? `label-${Math.random()}`;
  return (
    <div {...containerProps}>
      {label && (
        <label className="mr-2" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={cn("mt-1 px-4 py-1 bg-slate-600 rounded-md focus:outline-none focus:outline-blue-500", className)}
        id={id}
        {...props}
      />
    </div>
  );
};

export default Input;
