import {
  TextInput,
  type TextInputProps,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  type PressableProps,
} from "react-native";
import { forwardRef } from "react";

// Input
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <View className="w-full">
        {label && (
          <Text className="mb-1.5 text-sm font-medium text-gray-700">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={`h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900 ${
            error ? "border-red-500" : "focus:border-primary-500"
          } ${className || ""}`}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {error && (
          <Text className="mt-1 text-xs text-red-500">{error}</Text>
        )}
      </View>
    );
  }
);

// Button
interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}

export function Button({
  title,
  variant = "primary",
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "h-12 items-center justify-center rounded-xl px-6";
  const variantClasses = {
    primary: "bg-primary-600 active:bg-primary-700",
    secondary: "bg-gray-100 active:bg-gray-200",
    ghost: "bg-transparent active:bg-gray-50",
  };
  const textClasses = {
    primary: "text-white font-semibold",
    secondary: "text-gray-900 font-medium",
    ghost: "text-primary-600 font-medium",
  };

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled || loading ? "opacity-50" : ""
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#2563eb"} />
      ) : (
        <Text className={`text-base ${textClasses[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}
