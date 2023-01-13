import { PropsWithChildren, ComponentElement } from 'react';
import s from './logistics-item.module.css';

interface LogisticsItemProps extends PropsWithChildren {
  Icon: () => JSX.Element;
}

function LogisticsItem({ children, Icon }: LogisticsItemProps) {
  return (
    <li className={s.item}>
      <span className={s.icon}>
        <Icon />
      </span>
      <span className={s.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
