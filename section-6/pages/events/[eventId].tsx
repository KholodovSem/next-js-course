import { Fragment } from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { fetchEvents, getEventById } from '../../helpers/api';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventDetailPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

interface DynamicPath {
  eventId: string;
  [key: string]: string;
}

export const getStaticPaths: GetStaticPaths<DynamicPath> = async () => {
  const events = await fetchEvents();
  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

interface PageProps {
  event: Event;
}

export const getStaticProps: GetStaticProps<PageProps> = async (
  context: GetStaticPropsContext<DynamicPath>
) => {
  const { params } = context;
  const eventId = params.eventId;

  const events = await fetchEvents();
  const event = getEventById(eventId, events);

  if (!event) {
    return { notFound: true };
  } else {
    return {
      props: {
        event,
      },
      revalidate: 600,
    };
  }
};
