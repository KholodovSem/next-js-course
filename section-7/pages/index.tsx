import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Event } from '../models/Event';
import EventList from '../components/events/EventsList';
import { fetchEvents, getFeaturedEvents } from '../helpers/api';

const HomePage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="descrription"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
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
