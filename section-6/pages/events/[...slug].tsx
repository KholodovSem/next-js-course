import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { Event } from '../../models/Event';
import { fetchEvents, getFilteredEvents } from '../../helpers/api';
import EventList from '../../components/events/EventsList';

const FilteredEventsPage = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EventList events={events} />;
};

export default FilteredEventsPage;

interface DynamicPath {
  slug: string[];
  [key: string]: string[];
}

interface PageProps {
  events: Event[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext<DynamicPath>
) => {
  const { params } = context;
  const [year, month] = params!.slug;
  const eventDate = {
    year: parseInt(year),
    month: parseInt(month),
  };

  const events = await fetchEvents();
  const filtredEvents = getFilteredEvents(eventDate, events);

  return {
    props: {
      events: filtredEvents,
    },
  };
};
