import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import FuelForm from "./FuelForm";
import FuelResult from "./FuelResult";
import PitStopCalculator from "./PitStopCalculator";
import PitStopResult from "./PitStopResult";
import FuelRecords from "./FuelRecords";
import PitStopRecords from "./PitStopRecords";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles.css";

// Määratle algolek ja reducer-funktsioon useReducer jaoks.
const initialState = {
  result: null,
  pitStopResult: null,
  fuelRecords: [],
  pitStopRecords: [],
  weatherFilter: "all",
};

// Reducer-funktsioon oleku uuendamiseks.
function reducer(state, action) {
  switch (action.type) {
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_PIT_STOP_RESULT":
      return { ...state, pitStopResult: action.payload };
    case "SET_FUEL_RECORDS":
      return { ...state, fuelRecords: action.payload };
    case "SET_PIT_STOP_RECORDS":
      return { ...state, pitStopRecords: action.payload };
    case "ADD_FUEL_RECORD":
      return { ...state, fuelRecords: [...state.fuelRecords, action.payload] };
    case "ADD_PIT_STOP_RECORD":
      return {
        ...state,
        pitStopRecords: [...state.pitStopRecords, action.payload],
      };
    case "DELETE_FUEL_RECORD":
      return {
        ...state,
        fuelRecords: state.fuelRecords.filter(
          (_, index) => index !== action.payload
        ),
      };
    case "DELETE_PIT_STOP_RECORD":
      return {
        ...state,
        pitStopRecords: state.pitStopRecords.filter(
          (_, index) => index !== action.payload
        ),
      };
    case "SET_WEATHER_FILTER":
      return { ...state, weatherFilter: action.payload };
    default:
      return state;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#f83b00",
    },
    secondary: {
      main: "#202030",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#fdfffc",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1100,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fdfffc",
          "&.Mui-selected": {
            color: "#fdfffc",
            borderBottom: "2px solid #202030",
          },
        },
      },
    },
  },
});

function App() {
  // Defineerib oleku ja dispatch funktsiooni useReducer hooki abil.
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedCalculator, setSelectedCalculator] = useState("fuel");

  useEffect(() => {
    // Laeb kütuse- ja boksipeatuse kirjed API-st komponendi laadimisel.
    axios
      .get("http://localhost:5000/api/fuelRecords")
      .then((response) => {
        dispatch({ type: "SET_FUEL_RECORDS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching fuel records:", error);
      });

    axios
      .get("http://localhost:5000/api/pitStopRecords")
      .then((response) => {
        dispatch({ type: "SET_PIT_STOP_RECORDS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching pit stop records:", error);
      });
  }, []);

  // Käitleb kütusekalkulaatori arvutust ja salvestab tulemuse.
  const handleCalculate = (data) => {
    dispatch({ type: "SET_RESULT", payload: data });
    axios
      .post("http://localhost:5000/api/fuelRecords", data)
      .then((response) => {
        dispatch({ type: "ADD_FUEL_RECORD", payload: response.data });
      })
      .catch((error) => {
        console.error("Error adding fuel record:", error);
      });
  };

  // Käitleb boksipeatuse kalkulaatori arvutust ja salvestab tulemuse.
  const handlePitStopCalculate = (data) => {
    dispatch({ type: "SET_PIT_STOP_RESULT", payload: data });
    axios
      .post("http://localhost:5000/api/pitStopRecords", data)
      .then((response) => {
        dispatch({ type: "ADD_PIT_STOP_RECORD", payload: response.data });
      })
      .catch((error) => {
        console.error("Error adding pit stop record:", error);
      });
  };

  // Käitleb kütusekirje kustutamist.
  const handleDelete = (index) => {
    axios
      .delete(`http://localhost:5000/api/fuelRecords/${index}`)
      .then(() => {
        dispatch({ type: "DELETE_FUEL_RECORD", payload: index });
      })
      .catch((error) => {
        console.error("Error deleting fuel record:", error);
      });
  };

  // Käitleb boksipeatuse kirje kustutamist.
  const handlePitStopDelete = (index) => {
    axios
      .delete(`http://localhost:5000/api/pitStopRecords/${index}`)
      .then(() => {
        dispatch({ type: "DELETE_PIT_STOP_RECORD", payload: index });
      })
      .catch((error) => {
        console.error("Error deleting pit stop record:", error);
      });
  };

  // Filtreerib kütusekirjed ilmastiku järgi.
  const filteredFuelRecords = state.fuelRecords.filter((record) => {
    if (state.weatherFilter === "all") return true;
    return record.weather === state.weatherFilter;
  });

  // Käitleb vahekaardi muutust.
  const handleTabChange = (event, newValue) => {
    setSelectedCalculator(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Tabs
          value={selectedCalculator}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: "#202030",
            },
          }}
        >
          <Tab label="Kütusekalkulaator" value="fuel" />
          <Tab label="Boksipeatuse kalkulaator" value="pitstop" />
        </Tabs>
      </AppBar>
      <Container style={{ marginTop: "64px" }}>
        {selectedCalculator === "fuel" && (
          <Box mt={3}>
            <Typography variant="h4" gutterBottom>
              Kütusekalkulaator
            </Typography>
            <FuelForm onCalculate={handleCalculate} />
            <FuelResult result={state.result} />
            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Salvestatud kütusekogused
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ilm</InputLabel>
                <Select
                  value={state.weatherFilter}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_WEATHER_FILTER",
                      payload: e.target.value,
                    })
                  }
                >
                  <MenuItem value="all">Kõik</MenuItem>
                  <MenuItem value="dry">Kuiv</MenuItem>
                  <MenuItem value="wet">Märg</MenuItem>
                </Select>
              </FormControl>
              <FuelRecords
                records={filteredFuelRecords}
                onDelete={handleDelete}
              />
            </Box>
          </Box>
        )}

        {selectedCalculator === "pitstop" && (
          <Box mt={3}>
            <Typography variant="h4" gutterBottom>
              Boksipeatuse kalkulaator
            </Typography>
            <PitStopCalculator onCalculate={handlePitStopCalculate} />
            <PitStopResult result={state.pitStopResult} />
            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Salvestatud boksipeatused
              </Typography>
              <PitStopRecords
                records={state.pitStopRecords}
                onDelete={handlePitStopDelete}
              />
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
