import React from "react";

function FuelResult({ result }) {
  if (!result) return null;

  const { totalLaps, minFuel, safeFuel, formationLapFuel } = result;

  return (
    <div className="results-container">
      <div id="result">
        <p>Minimaalne kütus: {minFuel?.toFixed(1)} liitrit</p>
        <p>Ohutu kütus: {safeFuel?.toFixed(1)} liitrit</p>
        <p>
          Kütus koos formatsiooni ringiga: {formationLapFuel?.toFixed(1)}{" "}
          liitrit
        </p>
        <p>Kokku ringe: {totalLaps?.toFixed(0)}</p>
      </div>
    </div>
  );
}

export default FuelResult;
