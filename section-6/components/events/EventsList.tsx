import { Event } from '../../models/Event';
import EventItem from './EventItem';
import s from './EventList.module.css';

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  let content = events.map(event => <EventItem key={event.id} event={event} />);

  return <ul className={s.list}>{content}</ul>;
};

export default EventList;
