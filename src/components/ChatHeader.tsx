import { Sparkles, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onOpenSettings: () => void;
}

export function ChatHeader({ onOpenSettings }: ChatHeaderProps) {
  return (
    <div className="border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Yassen AI</h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini 2.5 Pro</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSettings}
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}