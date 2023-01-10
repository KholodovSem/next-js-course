import s from './event-summary.module.css';

interface EventSummaryProps {
  title: string;
}

function EventSummary({ title }: EventSummaryProps) {
  return (
    <section className={s.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
