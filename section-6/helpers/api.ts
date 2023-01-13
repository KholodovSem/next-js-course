import { Event } from '../models/Event';
import axios from 'axios';

interface DateObject {
  year: number;
  month: number;
}

interface unNormalizeEventObject {
  [key: string]: Event;
}

const normalizeEvents = (data: unNormalizeEventObject): Event[] => {
  const normalizeData: Event[] = [];
  for (let key in data) {
    normalizeData.push(data[key]);
  }
  return normalizeData;
};

export const fetchEvents = async () => {
  const { data } = await axios.get<unNormalizeEventObject>(
    'https://react-refresher-8e25c-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  return normalizeEvents(data);
};

export const getFeaturedEvents = (events: Event[]) => {
  return events.filter(event => event.isFeatured);
};

export const getAllDates = (events: Event[]) => {
  return events
    .map(event => {
      return event.date.split('-').find(el => el.length === 4) as string;
    })
    .sort((a, b) => parseInt(a) - parseFloat(b))
    .filter((date, index, array) => index === array.indexOf(date));
};

export const getFilteredEvents = (date: DateObject, events: Event[]) => {
  const { year, month } = date;

  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export function getEventById(id: string, events: Event[]) {
  return events.find(event => event.id === id);
}
