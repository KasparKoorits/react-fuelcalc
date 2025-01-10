import React, { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import "./styles.css";

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

    onCalculate({
      totalLaps,
      minFuel,
      safeFuel,
      formationLapFuel,
      weather,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="fuel-form">
      <TextField
        label="Ringiaeg (sekundites)"
        type="number"
        value={lapTime}
        onChange={(e) => setLapTime(e.target.value)}
        step="0.01"
        required
        fullWidth
        margin="normal"
        inputRef={formRef}
      />
      <TextField
        label="Kütusekulu ringi kohta (liitrites)"
        type="number"
        value={fuelPerLap}
        onChange={(e) => setFuelPerLap(e.target.value)}
        step="0.01"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Võistluse aeg (minutites)"
        type="number"
        value={raceTime}
        onChange={(e) => setRaceTime(e.target.value)}
        step="0.01"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Ilm"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="dry">Kuiv</MenuItem>
        <MenuItem value="wet">Märg</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" className="btn">
        Arvuta
      </Button>
    </Box>
  );
}

export default FuelForm;
