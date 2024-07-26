import React from 'react'
import { getYearMonthDayFormattedDate } from '../../utils/date';

export default function FilterForm({filter, onFilterChange}) {
  return (
    <form className="filter">
      <div className="inputs">
        <div className="input">
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            id="category"
            value={filter.category}
            onChange={onFilterChange}
          >
            <option value="all">All </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="from-date">From: </label>
          <input
            max={getYearMonthDayFormattedDate(new Date())}
            type="date"
            id="from-date"
            name="fromDate"
            value={filter.fromDate}
            onChange={onFilterChange}
          />
        </div>

        <div className="input">
          <label htmlFor="to-date">To: </label>
          <input
            min={filter.fromDate}
            max={getYearMonthDayFormattedDate(new Date())}
            type="date"
            id="to-date"
            name="toDate"
            value={filter.toDate}
            onChange={onFilterChange}
          />
        </div>
      </div>
    </form>
  );
}
