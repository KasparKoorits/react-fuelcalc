import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function FuelRecords({ records, onDelete }) {
  return (
    <div>
      <List>
        {records.map((record, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Ohutu kütus: ${record.safeFuel.toFixed(
                1
              )} liitrit, Kütus koos formatsiooni ringiga: ${record.formationLapFuel.toFixed(
                1
              )} liitrit, Kokku ringe: ${record.totalLaps.toFixed(0)}, Ilm: ${
                record.weather === "dry" ? "Kuiv" : "Märg"
              }`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(index)}
                sx={{ color: "#f83b00" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default FuelRecords;
