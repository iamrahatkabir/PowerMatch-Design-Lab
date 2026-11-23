import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-dark",
  outline:
    "border border-line bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-canvas",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "outline", className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-[15px] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

/** Square 40px icon button used beside inputs (add range, remove, delete). */
export function IconButton({ className = "", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-white text-ink hover:bg-canvas disabled:cursor-not-allowed disabled:text-[#d0d5dd] disabled:hover:bg-white ${className}`}
      {...props}
    />
  );
}
