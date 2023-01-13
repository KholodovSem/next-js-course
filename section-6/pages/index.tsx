import EventList from '../components/events/EventsList';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Event } from '../models/Event';
import { fetchEvents, getFeaturedEvents } from '../helpers/api';

const HomePage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;

interface PageProps {
  events: Event[];
}

export const getStaticProps: GetStaticProps<PageProps> = async context => {
  const events = await fetchEvents();
  const filteredEvents = getFeaturedEvents(events);

  return {
    props: {
      events: filteredEvents,
    },
    revalidate: 600,
  };
};
