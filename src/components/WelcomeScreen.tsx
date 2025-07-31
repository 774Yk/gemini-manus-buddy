import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MessageCircle, Zap, Settings } from "lucide-react";

interface WelcomeScreenProps {
  onStartChat: () => void;
  onOpenSettings: () => void;
}

export function WelcomeScreen({ onStartChat, onOpenSettings }: WelcomeScreenProps) {
  const suggestions = [
    "Explain quantum computing",
    "Write a creative story",
    "Help me plan a project",
    "Analyze this code snippet"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              Welcome to Yassen AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Your intelligent assistant powered by Gemini 2.5 Pro
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6 space-y-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Natural Conversations</h3>
              <p className="text-sm text-muted-foreground">
                Engage in natural, context-aware conversations
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6 space-y-2">
              <Zap className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Get instant responses with advanced AI
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6 space-y-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Creative Tasks</h3>
              <p className="text-sm text-muted-foreground">
                Generate ideas, write content, solve problems
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Try asking about:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-sm hover:bg-primary/10 hover:border-primary/20 transition-all duration-300"
                onClick={() => onStartChat()}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onStartChat}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-3"
          >
            Start Chatting
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Need to configure your API key?</span>
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={onOpenSettings}
            >
              <Settings className="h-4 w-4 mr-1" />
              Open Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}