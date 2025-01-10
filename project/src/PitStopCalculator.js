import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import "./styles.css";

function PitStopCalculator({ onCalculate }) {
  const [track, setTrack] = useState("default");
  const [tireChange, setTireChange] = useState(false);
  const [fuelAdded, setFuelAdded] = useState("");

  const trackLapTimes = {
    default: 0,
    Monza: 25,
    Spa: 55,
    Bathurst: 40,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fuelAdded) {
      alert("Palun täida kõik väljad!");
      return;
    }

    const fuelAddedNum = parseFloat(fuelAdded);

    if (isNaN(fuelAddedNum)) {
      alert("Palun sisesta kehtivad numbrid!");
      return;
    }

    const selectedTrackLapTime = trackLapTimes[track];
    const refuelTime = fuelAddedNum * 0.3;
    const pitStopTime = tireChange ? 30 : refuelTime;
    const totalPitStopTime = selectedTrackLapTime + pitStopTime;

    onCalculate({
      track,
      tireChange,
      fuelAdded: fuelAddedNum,
      pitStopTime,
      totalPitStopTime,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="fuel-form">
      <TextField
        select
        label="Rada"
        value={track}
        onChange={(e) => setTrack(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="default">Vali rada</MenuItem>
        <MenuItem value="Monza">Monza</MenuItem>
        <MenuItem value="Spa">Spa</MenuItem>
        <MenuItem value="Bathurst">Bathurst</MenuItem>
      </TextField>
      <FormLabel component="legend">Kas vahetatakse rehve?</FormLabel>
      <RadioGroup
        row
        value={tireChange}
        onChange={(e) => setTireChange(e.target.value === "true")}
      >
        <FormControlLabel value={true} control={<Radio />} label="Jah" />
        <FormControlLabel value={false} control={<Radio />} label="Ei" />
      </RadioGroup>
      <TextField
        label="Kütuse lisamine (liitrites)"
        type="number"
        value={fuelAdded}
        onChange={(e) => setFuelAdded(e.target.value)}
        step="0.01"
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" className="btn">
        Arvuta
      </Button>
    </Box>
  );
}

export default PitStopCalculator;
