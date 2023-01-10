import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAllDates } from '../../data/dummy-data';
import Button from '../ui/Button';
import s from './EventSearch.module.css';

const months = [
  { value: '01', month: 'January' },
  { value: '02', month: 'February' },
  { value: '03', month: 'March' },
  { value: '04', month: 'April' },
  { value: '05', month: 'May' },
  { value: '06', month: 'June' },
  { value: '07', month: 'July' },
  { value: '08', month: 'August' },
  { value: '09', month: 'September' },
  { value: '10', month: 'October' },
  { value: '11', month: 'November' },
  { value: '12', month: 'December' },
];

type SelectName = 'year' | 'month';

const EventsSearch = () => {
  const dates = getAllDates();
  const [year, setYear] = useState<string>(() => dates[dates.length - 1]);
  const [month, setMonth] = useState<string>(() =>
    new Date().getMonth().toString()
  );
  const router = useRouter();
  console.log(router);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;

    switch (name as SelectName) {
      case 'year': {
        setYear(value);
        break;
      }

      case 'month': {
        setMonth(value);
        break;
      }

      default: {
        return;
      }
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/events/${year}/${month}`);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.controls}>
        <div className={s.control}>
          <label htmlFor="year">Year</label>
          <select id="year" name="year" value={year} onChange={handleChange}>
            {dates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div className={s.control}>
          <label htmlFor="month">Month</label>
          <select id="month" name="month" value={month} onChange={handleChange}>
            {months.map(({ month, value }) => (
              <option key={value} value={value}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
};

export default EventsSearch;
