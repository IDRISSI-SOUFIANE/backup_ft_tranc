import type { ButtonHTMLAttributes} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({children = "Button", variant = "primary",
                                      size = "md", loading = false, className = "", disabled, ...props}: ButtonProps) {
  const baseStyles =
    "cursor-pointer relative w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-hover focus:bg-primary-hover",

    secondary:
      "border-2 border-gray-300 bg-white text-secondary hover:bg-gray-100 focus:bg-gray-100",

    danger:
      "bg-danger text-white hover:bg-red-700 focus:bg-red-700",

    ghost:
      "bg-transparent text-text hover:bg-gray-100 focus:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-md",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} 
      disabled={disabled || loading} {...props}>
      {loading && (<span className="absolute h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>)}
      <span className={loading ? "opacity-0 pointer-events-none" : ""}>
      {children}
      </span>
    </button>
  );
}