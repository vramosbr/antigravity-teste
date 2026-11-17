import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  id?: string;
}

export function CopyButton({
  text,
  label = 'Copiar Prompt',
  copiedLabel = 'Copiado!',
  variant = 'primary',
  size = 'md',
  id,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const sizeClasses =
    size === 'sm' ? 'px-3 py-1.5 text-xs gap-1.5' : 'px-4 py-2 text-sm gap-2';

  const variantClasses = copied
    ? 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500'
    : variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500'
      : 'bg-[var(--surface-muted)] hover:bg-[var(--surface-subtle)] text-[var(--text-primary)] border-[var(--border-strong)]';

  return (
    <button
      id={id}
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-lg border font-medium transition-colors cursor-pointer ${sizeClasses} ${variantClasses}`}
    >
      {copied ? <Check className="h-4 w-4 shrink-0" /> : <Copy className="h-4 w-4 shrink-0" />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
