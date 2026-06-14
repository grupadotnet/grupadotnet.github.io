import type { ReactNode } from 'react';

export function Button({
  children,
  target,
}: {
  children: ReactNode;
  target?: string;
}) {
  return (
    <a className={'m-5 button'} href={target}>
      {children}
    </a>
  );
}
