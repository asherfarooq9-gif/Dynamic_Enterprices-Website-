import { cn } from '@/lib/cn';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-small leading-relaxed',
          isUser ? 'bg-navy text-white' : 'bg-cream text-navy',
        )}
      >
        {content}
      </p>
    </div>
  );
}
