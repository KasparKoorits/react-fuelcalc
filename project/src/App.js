import React, { useEffect, useRef, useReducer } from "react";
import FuelForm from "./FuelForm";
import FuelResult from "./FuelResult";
import "./styles.css";

// Määratle algolek ja reducer-funktsioon useReducer jaoks
const initialState = {
  result: null,
  fuelRecords: [],
  weatherFilter: "all",
};

// Reducer-funktsioon oleku uuendamiseks
function reducer(state, action) {
  switch (action.type) {
    case "SET_RESULT":
      // Uuendab olekut, määrates uue tulemuse
      return { ...state, result: action.payload };
    case "ADD_FUEL_RECORD":
      // Lisab uue kütusekoguse kirje olemasolevatele kirjetel
      return { ...state, fuelRecords: [...state.fuelRecords, action.payload] };
    case "DELETE_FUEL_RECORD":
      // Kustutab kütusekoguse kirje indeksi järgi
      return {
        ...state,
        fuelRecords: state.fuelRecords.filter(
          (_, index) => index !== action.payload
        ),
      };
    case "SET_WEATHER_FILTER":
      // Uuendab ilmafiltri olekut
      return { ...state, weatherFilter: action.payload };
    default:
      // Tagastab praeguse oleku, kui tegevuse tüüp ei ole määratud
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    // Fokuseerib vormi, kui komponent laetakse
    formRef.current.focus();
  }, []);

  // Käitleb arvutust ja lisab uue kütusekoguse kirje
  const handleCalculate = (data) => {
    dispatch({ type: "SET_RESULT", payload: data });
    dispatch({ type: "ADD_FUEL_RECORD", payload: data });
  };

  // Käitleb kütusekoguse kirje kustutamist indeksi järgi
  const handleDelete = (index) => {
    dispatch({ type: "DELETE_FUEL_RECORD", payload: index });
  };

  // Filtreerib kütusekoguse kirjed ilmafiltri alusel
  const filteredFuelRecords = state.fuelRecords.filter((record) => {
    if (state.weatherFilter === "all") return true;
    return record.weather === state.weatherFilter;
  });

  return (
    <div className="container">
      <h1>Kütusekalkulaator</h1>
      <FuelForm onCalculate={handleCalculate} formRef={formRef} />
      <FuelResult result={state.result} />

      <h2>Salvestatud kütusekogused</h2>
      <div>
        <label>Ilm:</label>
        <select
          onChange={(e) =>
            dispatch({ type: "SET_WEATHER_FILTER", payload: e.target.value })
          }
        >
          <option value="all">Kõik</option>
          <option value="dry">Kuiv</option>
          <option value="wet">Märg</option>
        </select>
      </div>
      <ul>
        {filteredFuelRecords.map((record, index) => (
          <li key={index}>
            Minimaalne kütus: {record.minFuel.toFixed(2)} liitrit, Ohutu kütus:{" "}
            {record.safeFuel.toFixed(2)} liitrit, Kütus koos formatsiooni
            ringiga: {record.formationLapFuel.toFixed(2)} liitrit, Kokku ringe:{" "}
            {record.totalLaps.toFixed(0)}, Ilm:{" "}
            {record.weather === "dry" ? "Kuiv" : "Märg"}
            <button onClick={() => handleDelete(index)}>Kustuta</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
