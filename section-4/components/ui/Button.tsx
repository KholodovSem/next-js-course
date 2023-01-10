import { PropsWithChildren } from 'react';
import Link from 'next/link';
import s from './Button.module.css';

interface ButtonProps extends PropsWithChildren {
  link?: string;
}

const Button = ({ children, link, ...rest }: ButtonProps) => {
  if (!link) {
    return (
      <button className={s.btn} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <Link className={s.btn} href={link}>
      {children}
    </Link>
  );
};

export default Button;
