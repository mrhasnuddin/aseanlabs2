import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type CommonProps = {
  children: ReactNode;
  className?: string;
  size?: number;
  ariaLabel: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'aria-label'> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href' | 'aria-label'> & {
    href: string;
    external?: boolean;
  };

const BASE =
  'inline-flex items-center justify-center rounded-full bg-accent text-ink ' +
  'border-nb border-ink shadow-nb ' +
  'transition-all duration-150 ease-out ' +
  'hover:shadow-nb-lg hover:-translate-x-px hover:-translate-y-px ' +
  'active:shadow-none active:translate-x-[6px] active:translate-y-[6px] ' +
  'focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink';

export function StampButton(props: ButtonProps | LinkProps) {
  const size = props.size ?? 48;
  const style = { width: size, height: size };
  const cls = [BASE, props.className].filter(Boolean).join(' ');

  if ('href' in props && props.href) {
    const { href, external, children, ariaLabel, className: _c, size: _s, ...rest } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={cls}
          style={style}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={cls} style={style} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, ariaLabel, className: _c, size: _s, ...rest } = props as ButtonProps;
  return (
    <button aria-label={ariaLabel} className={cls} style={style} {...rest}>
      {children}
    </button>
  );
}
