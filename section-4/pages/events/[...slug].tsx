import { useRouter } from 'next/router';
import { Event } from '../../models/Event';
import { getFilteredEvents } from '../../data/dummy-data';
import EventList from '../../components/events/EventsList';

const FilteredEventsPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  let eventDate;
  let events: Event[];
  if (slug) {
    eventDate = {
      year: parseInt(slug[0]),
      month: parseInt(slug[1]),
    };
    events = getFilteredEvents(eventDate);
  } else {
    return <p className="center">Loading...</p>;
  }

  return <EventList events={events!} />;
};

export default FilteredEventsPage;
