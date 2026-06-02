import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/api";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  const imgSrc = src
    ? src.startsWith("http")
      ? src
      : `${API_URL}/${src}`
    : undefined;
  const initials = fallback || alt?.charAt(0).toUpperCase() || "?";

  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
    >
      {imgSrc && (
        <AvatarPrimitive.Image
          className="aspect-square h-full w-full object-cover"
          src={imgSrc}
          alt={alt}
        />
      )}
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium">
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
