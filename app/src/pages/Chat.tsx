import { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone,
  Video,
  Info,
  Check,
  CheckCheck
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { ScrollArea } from '@/components/ui/scroll-area';
import { mockChats } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', senderId: '4', content: 'Bonjour, j\'aimerais savoir si ma commande est prête ?', timestamp: '2024-03-14T15:30:00Z', isRead: true },
    { id: '2', senderId: '2', content: 'Bonjour ! Oui, votre costume est presque terminé. Je finis les derniers ajustements.', timestamp: '2024-03-14T15:35:00Z', isRead: true },
    { id: '3', senderId: '4', content: 'Super ! Quand puis-je passer l\'essayer ?', timestamp: '2024-03-14T15:40:00Z', isRead: true },
    { id: '4', senderId: '2', content: 'Vous pouvez passer demain à partir de 14h. Je vous enverrai l\'adresse exacte.', timestamp: '2024-03-14T15:45:00Z', isRead: false },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      senderId: '1', // Admin
      content: messageInput,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4">
      {/* Chat List */}
      <Card className="w-80 bg-dark-900 border-gold-500/20 flex flex-col">
        <div className="p-4 border-b border-gold-500/20">
          <h2 className="text-lg font-bold text-gold-100">Messages</h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {mockChats.map((chat) => {
              const otherParticipant = chat.participants.find(p => p.userId !== '1');
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={cn(
                    'w-full p-3 rounded-lg flex items-center gap-3 transition-colors text-left',
                    selectedChat?.id === chat.id 
                      ? 'bg-gold-500/20 border border-gold-500/30' 
                      : 'hover:bg-gold-500/10'
                  )}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gold-500 text-dark-950">
                        {otherParticipant?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {chat.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-dark-950 text-xs font-bold flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gold-100 truncate">{otherParticipant?.name}</p>
                      <span className="text-xs text-gold-400/60">
                        {chat.lastMessage && new Date(chat.lastMessage.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gold-400/60 truncate">
                      {chat.lastMessage?.content}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 bg-dark-900 border-gold-500/20 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gold-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gold-500 text-dark-950">
                    {selectedChat.participants.find(p => p.userId !== '1')?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gold-100">
                    {selectedChat.participants.find(p => p.userId !== '1')?.name}
                  </p>
                  <p className="text-xs text-green-400">En ligne</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gold-400 hover:bg-gold-500/10">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gold-400 hover:bg-gold-500/10">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gold-400 hover:bg-gold-500/10">
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isMe = message.senderId === '1';
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        isMe ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[70%] px-4 py-2 rounded-2xl',
                          isMe 
                            ? 'bg-gold-500 text-dark-950 rounded-br-md' 
                            : 'bg-dark-800 text-gold-100 rounded-bl-md'
                        )}
                      >
                        <p>{message.content}</p>
                        <div className={cn(
                          'flex items-center justify-end gap-1 mt-1',
                          isMe ? 'text-dark-950/60' : 'text-gold-400/60'
                        )}>
                          <span className="text-xs">
                            {new Date(message.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isMe && (
                            message.isRead 
                              ? <CheckCheck className="w-3 h-3" />
                              : <Check className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gold-500/20">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gold-400 hover:bg-gold-500/10">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Écrivez un message..."
                  className="flex-1 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gold-500 text-dark-950 hover:bg-gold-600"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Send className="w-10 h-10 text-gold-400" />
              </div>
              <p className="text-gold-100 font-medium">Sélectionnez une conversation</p>
              <p className="text-gold-400/60 text-sm">Choisissez un contact pour commencer à discuter</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
