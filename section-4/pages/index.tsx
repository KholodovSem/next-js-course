import EventList from '../components/events/EventsList';
import { getFeaturedEvents } from '../data/dummy-data';

const HomePage = () => {
  const events = getFeaturedEvents();

  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
