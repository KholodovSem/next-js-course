import s from './EventItem.module.css';
import { Event } from '../../models/Event';
import Button from '../ui/Button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

interface EventItemProps {
  event: Event;
}

const EventItem = ({ event }: EventItemProps) => {
  const readableDate = new Date(event.date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = event.location.replace(', ', '\n');
  const linkPath = `/events/${event.id}`;

  return (
    <li className={s.item}>
      <img src={`/${event.image}`} alt={event.title} width="400px" />
      <div className={s.content}>
        <div className={s.summary}>
          <h2>{event.title}</h2>
        </div>
        <div className={s.date}>
          <DateIcon />
          <time>{readableDate}</time>
        </div>
        <div className={s.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
        <div className={s.actions}>
          <Button link={linkPath}>
            <span>Explore Event</span>
            <span className={s.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
