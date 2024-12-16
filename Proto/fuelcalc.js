document
  .getElementById("fuelCalcForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const lapTime = parseFloat(document.getElementById("lapTime").value);
    const fuelPerLap = parseFloat(document.getElementById("fuelPerLap").value);
    const raceTime = parseFloat(document.getElementById("raceTime").value);

    const totalLaps = (raceTime * 60) / lapTime;
    const minFuel = fuelPerLap * totalLaps;
    const safeFuel = minFuel * 1.1;
    const formationLapFuel = minFuel + fuelPerLap;

    document.getElementById("result").innerHTML = `
        <p>Minimaalne kütus: ${minFuel.toFixed(2)} liitrit</p>
        <p>Ohutu kütus: ${safeFuel.toFixed(2)} liitrit</p>
        <p>Kütus koos formatsiooni ringiga: ${formationLapFuel.toFixed(
          2
        )} liitrit</p>
        <p>Kokku ringe: ${totalLaps.toFixed(0)}</p>
    `;
  });
s;
