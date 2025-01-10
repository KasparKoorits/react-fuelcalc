import React from "react";

function PitStopResult({ result }) {
  if (!result) return null;

  const { track, tireChange, fuelAdded, pitStopTime, totalPitStopTime } =
    result;

  return (
    <div className="results-container">
      <div id="pit-stop-result">
        <p>Rada: {track}</p>
        <p>Vahetatakse rehve: {tireChange ? "Jah" : "Ei"}</p>
        <p>Kütuse lisamine: {fuelAdded?.toFixed(1)} liitrit</p>
        <p>Boksipeatuse aeg: {pitStopTime?.toFixed(1)} sekundit</p>
        <p>Kogu boksipeatuse aeg: {totalPitStopTime?.toFixed(1)} sekundit</p>
      </div>
    </div>
  );
}

export default PitStopResult;
