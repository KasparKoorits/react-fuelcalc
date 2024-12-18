import React from "react";

function FuelResult({ result }) {
  if (!result) return null;

  const { totalLaps, minFuel, safeFuel, formationLapFuel } = result;

  return (
    <div id="result">
      <p>Minimaalne kütus: {minFuel.toFixed(2)} liitrit</p>
      <p>Ohutu kütus: {safeFuel.toFixed(2)} liitrit</p>
      <p>
        Kütus koos formatsiooni ringiga: {formationLapFuel.toFixed(2)} liitrit
      </p>
      <p>Kokku ringe: {totalLaps.toFixed(0)}</p>
    </div>
  );
}

export default FuelResult;
