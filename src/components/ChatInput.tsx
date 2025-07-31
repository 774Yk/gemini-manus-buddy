import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background/80 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Button
            type="button"
            size="sm"
            disabled={disabled}
            className={cn(
              "absolute left-2 bottom-2 h-8 w-8 p-0 z-10",
              "bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground",
              "transition-all duration-300"
            )}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Yassen..."
            disabled={disabled}
            className={cn(
              "min-h-[60px] max-h-[200px] resize-none pl-12 pr-12",
              "border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary",
              "transition-all duration-300 hover:bg-muted/70"
            )}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || isLoading || disabled}
            className={cn(
              "absolute right-2 bottom-2 h-8 w-8 p-0",
              "bg-gradient-primary hover:shadow-glow transition-all duration-300",
              "disabled:opacity-50 disabled:hover:shadow-none"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}