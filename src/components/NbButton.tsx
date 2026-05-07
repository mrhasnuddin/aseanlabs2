import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 
  | 'primary-yellow' 
  | 'primary-cyan' 
  | 'primary-black' 
  | 'secondary-yellow' 
  | 'secondary-cyan' 
  | 'secondary-black';
type Size = 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    href: string;
    external?: boolean;
  };

const VARIANT_CLASSES: Record<Variant, string> = {
  'primary-yellow':
    'bg-primary text-ink border-ink shadow-[6px_6px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000]',
  'primary-cyan':
    'bg-cyan text-ink border-ink shadow-[6px_6px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000]',
  'primary-black':
    'bg-ink text-primary border-primary shadow-[6px_6px_0_0_#F4BF4B] hover:shadow-[8px_8px_0_0_#F4BF4B]',
  'secondary-yellow':
    'bg-ink text-primary border-primary shadow-[6px_6px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000]',
  'secondary-cyan':
    'bg-ink text-cyan border-cyan shadow-[6px_6px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000]',
  'secondary-black':
    'bg-primary text-ink border-ink shadow-[6px_6px_0_0_#F4BF4B] hover:shadow-[8px_8px_0_0_#F4BF4B]',
};

const SIZE_CLASSES: Record<Size, string> = {
  md: 'px-5 py-3 text-sm tracking-wide',
  lg: 'px-7 py-4 text-base tracking-wide',
};

const BASE =
  'inline-flex items-center justify-center gap-2 font-sans font-medium border-nb rounded-nb ' +
  'transition-all duration-150 ease-out ' +
  'hover:-translate-x-px hover:-translate-y-px ' +
  'active:shadow-none active:translate-x-[6px] active:translate-y-[6px] ' +
  'focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'select-none';

function classes(variant: Variant, size: Size, extra?: string) {
  return [BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], extra].filter(Boolean).join(' ');
}

export function NbButton(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? 'primary-yellow';
  const size = props.size ?? 'md';
  const cls = classes(variant, size, props.className);

  if ('href' in props && props.href) {
    const { href, external, children, variant: _v, size: _s, className: _c, ...rest } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, variant: _v, size: _s, className: _c, ...rest } = props as ButtonProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
