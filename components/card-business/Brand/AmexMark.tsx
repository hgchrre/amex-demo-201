/**
 * Official American Express wordmark (2018), vector from Wikimedia Commons:
 * https://commons.wikimedia.org/wiki/File:American_Express_logo_(2018).svg
 * Used under the file’s license on Commons; trademark remains American Express.
 */
import Image from 'next/image';

export function AmexMark({ className = '', size = 48 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/american-express-logo.svg"
      alt="American Express"
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
      priority
    />
  );
}
