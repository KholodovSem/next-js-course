import { Fragment } from 'react';
import { getAllEvents } from '../../data/dummy-data';
import EventList from '../../components/events/EventsList';
import EventsSearch from '../../components/events/EventSearch';

const EventsPage = () => {
  const events = getAllEvents();

  return (
    <Fragment>
      <EventsSearch />
      <EventList events={events} />
    </Fragment>
  );
};

export default EventsPage;
