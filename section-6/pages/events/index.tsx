import { Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Event } from '../../models/Event';
import { fetchEvents, getAllDates } from '../../helpers/api';
import EventList from '../../components/events/EventsList';
import EventsSearch from '../../components/events/EventSearch';

const EventsPage = ({
  events,
  dates,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <EventsSearch dates={dates} />
      <EventList events={events} />
    </Fragment>
  );
};

export default EventsPage;

interface PageProps {
  events: Event[];
  dates: string[];
}

export const getStaticProps: GetStaticProps<PageProps> = async context => {
  const events = await fetchEvents();
  const dates = getAllDates(events);

  return {
    props: {
      events,
      dates,
    },
    revalidate: 600,
  };
};
