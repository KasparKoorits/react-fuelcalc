import React, { useState } from "react";

function FuelForm({ onCalculate, formRef }) {
  const [lapTime, setLapTime] = useState("");
  const [fuelPerLap, setFuelPerLap] = useState("");
  const [raceTime, setRaceTime] = useState("");
  const [weather, setWeather] = useState("dry");

  // Käitleb vormi esitust
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lapTime || !fuelPerLap || !raceTime) {
      alert("Palun täida kõik väljad!");
      return;
    }

    const lapTimeNum = parseFloat(lapTime);
    const fuelPerLapNum = parseFloat(fuelPerLap);
    const raceTimeNum = parseFloat(raceTime);

    if (isNaN(lapTimeNum) || isNaN(fuelPerLapNum) || isNaN(raceTimeNum)) {
      alert("Palun sisesta kehtivad numbrid!");
      return;
    }

    const totalLaps = (raceTimeNum * 60) / lapTimeNum;
    const minFuel = fuelPerLapNum * totalLaps;
    const safeFuel = minFuel * 1.1;
    const formationLapFuel = minFuel + fuelPerLapNum;

    onCalculate({ totalLaps, minFuel, safeFuel, formationLapFuel, weather });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Ringiaeg (sekundites):</label>
        <input
          type="number"
          value={lapTime}
          onChange={(e) => setLapTime(e.target.value)}
          step="0.01"
          required
          ref={formRef}
        />
      </div>
      <div className="form-group">
        <label>Kütusekulu ringi kohta (liitrites):</label>
        <input
          type="number"
          value={fuelPerLap}
          onChange={(e) => setFuelPerLap(e.target.value)}
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label>Võistluse aeg (minutites):</label>
        <input
          type="number"
          value={raceTime}
          onChange={(e) => setRaceTime(e.target.value)}
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label>Ilm:</label>
        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="dry">Kuiv</option>
          <option value="wet">Märg</option>
        </select>
      </div>
      <button type="submit" className="btn">
        Arvuta
      </button>
    </form>
  );
}

export default FuelForm;
