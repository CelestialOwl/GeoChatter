import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  text: string;
  username: string;
  time: string;
  isOwn: boolean;
}

export function ChatBubble({ text, username, time, isOwn }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "mb-3 flex max-w-[75%] flex-col",
        isOwn ? "ml-auto items-end" : "items-start"
      )}
    >
      {!isOwn && (
        <span className="mb-1 text-xs font-medium text-muted-foreground">
          {username}
        </span>
      )}
      <div
        className={cn(
          "rounded-2xl px-4 py-2 text-sm",
          isOwn
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-secondary text-secondary-foreground"
        )}
      >
        {text}
      </div>
      <span className="mt-1 text-[10px] text-muted-foreground">{time}</span>
    </div>
  );
}
