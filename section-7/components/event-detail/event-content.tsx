import { PropsWithChildren } from 'react';
import s from './event-content.module.css';

function EventContent({ children }: PropsWithChildren) {
  return <section className={s.content}>{children}</section>;
}

export default EventContent;
