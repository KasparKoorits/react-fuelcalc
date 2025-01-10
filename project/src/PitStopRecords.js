import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function PitStopRecords({ records, onDelete }) {
  return (
    <div>
      <List>
        {records.map((record, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Rada: ${record.track}, Vahetatakse rehve: ${
                record.tireChange ? "Jah" : "Ei"
              }, Kütuse lisamine: ${record.fuelAdded.toFixed(
                1
              )} liitrit, Boksipeatuse aeg: ${record.pitStopTime.toFixed(
                1
              )} sekundit, Kogu boksipeatuse aeg: ${record.totalPitStopTime.toFixed(
                1
              )} sekundit`}
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

export default PitStopRecords;
