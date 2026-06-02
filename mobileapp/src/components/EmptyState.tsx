import { View, Text } from "react-native";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-center text-lg font-medium text-gray-700">
        {title}
      </Text>
      {description && (
        <Text className="mt-1 text-center text-sm text-gray-500">
          {description}
        </Text>
      )}
    </View>
  );
}
