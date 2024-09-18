import React from "react";
import { useSearchParams } from "react-router-dom";

export default function StatisticsSelect({ type }: { type: string }) {
  const [queryParams, setQueryParams] = useSearchParams();
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    setQueryParams({ ...queryParams, type: newType });
  };

  const config = [
    { key: "penalty_open", label: "Offene Strafen" },
    { key: "penalty_settled", label: "Gezahlte Strafen" },
    { key: "penalty_sum", label: "Summe Strafen" },
    { key: "penalty_count", label: "Anzahl Strafen" },
  ];

  return (
    <select
      value={type}
      onChange={handleTypeChange}
      className="form-select my-2"
    >
      {config.map(({ key, label }) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
