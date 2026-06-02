import { View, Image, Text } from "react-native";
import { API_URL } from "@/lib/api";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
};

export function Avatar({ src, alt, size = "md", fallback }: AvatarProps) {
  const imgUri = src
    ? src.startsWith("http")
      ? src
      : `${API_URL}/${src}`
    : null;

  const initials = fallback || alt?.charAt(0).toUpperCase() || "?";

  if (imgUri) {
    return (
      <Image
        source={{ uri: imgUri }}
        className={`${sizeMap[size]} rounded-full bg-gray-200`}
        accessibilityLabel={alt}
      />
    );
  }

  return (
    <View
      className={`${sizeMap[size]} items-center justify-center rounded-full bg-primary-100`}
    >
      <Text className={`${textSizeMap[size]} font-semibold text-primary-700`}>
        {initials}
      </Text>
    </View>
  );
}
