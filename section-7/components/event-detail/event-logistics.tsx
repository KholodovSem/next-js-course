import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import s from './event-logistics.module.css';

interface EventLogisticsProps {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

function EventLogistics({
  address,
  date,
  image,
  imageAlt,
}: EventLogisticsProps) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');

  return (
    <section className={s.logistics}>
      <div className={s.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={s.list}>
        <LogisticsItem Icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem Icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
