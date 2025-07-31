import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ChatHeader } from "@/components/ChatHeader";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useGeminiChat } from "@/hooks/useGeminiChat";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const {
    messages,
    isLoading,
    apiKey,
    setApiKey,
    sendMessage,
  } = useGeminiChat();
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleStartChat = () => {
    if (!apiKey) {
      setSettingsOpen(true);
    } else {
      setHasStartedChat(true);
    }
  };

  const handleSendMessage = (message: string) => {
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }
    sendMessage(message);
  };

  if (!hasStartedChat && messages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-background flex flex-col">
        <ChatHeader onOpenSettings={() => setSettingsOpen(true)} />
        <WelcomeScreen
          onStartChat={handleStartChat}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      <ChatHeader onOpenSettings={() => setSettingsOpen(true)} />
      
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-2 animate-fade-in">
                <p className="text-lg text-muted-foreground">Ready to start chatting!</p>
                <p className="text-sm text-muted-foreground">Type your message below to begin.</p>
              </div>
            </div>
          ) : (
            <div className="py-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && (
                <div className="flex gap-3 p-4 animate-slide-in-bottom">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <div className="bg-chat-ai text-chat-ai-foreground rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
      
      <ChatInput
        onSend={handleSendMessage}
        isLoading={isLoading}
        disabled={!apiKey}
      />
      
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
      />
    </div>
  );
};

export default Index;
