import React, { useState } from "react";
import { useAsync } from "../../hooks/useAsync";
import { getMatches } from "../../services/match";
import FilterForm from "./FilterForm";
import {
  getMonthNameDayYearFormattedDate,
  getYearMonthDayFormattedDate,
} from "../../utils/date";
import MatchCard from ".././../components/MatchCard";
import ErrorMessage from "../../components/Error/ErrorMessage";
import Loading from "../../components/Loading";

export default function Matches() {
  const [filter, setFilter] = useState({
    category: "all",
    fromDate: getYearMonthDayFormattedDate(new Date()),
    toDate: getYearMonthDayFormattedDate(new Date()),
  });
  const {loading, error, value: matches} = useAsync(() => getMatches(filter), [filter])

  function handleFilterChange(e) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  }


  return (
    <div className="matches">
      <FilterForm filter={filter} onFilterChange={handleFilterChange} />
      <div>
        {loading ? (
          <Loading/>
        ) : error ? (
          <ErrorMessage error={error}/>
        ) : (
          <>
            <h1>{`${filter.category} matches ${
              filter.fromDate === filter.toDate
                ? `on ${getMonthNameDayYearFormattedDate(filter.fromDate)}`
                : `from ${getMonthNameDayYearFormattedDate(
                    filter.fromDate
                  )} to ${getMonthNameDayYearFormattedDate(filter.toDate)}`
            }`}</h1>

            {matches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
