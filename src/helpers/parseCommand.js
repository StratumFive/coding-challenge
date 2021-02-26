export default (command) => {
  const regexForCoordinates = /\d+ \d+\n/gm;
  const coordinates = command
    .match(regexForCoordinates)[0]
    .replace("\n", "")
    .split(" ");
  const commandWithoutCoordinates = command.replace(regexForCoordinates, "");
  const shipsRaw = commandWithoutCoordinates.split("\n\n");
  console.log("shipsRaw", shipsRaw);
  const ships = shipsRaw.map((ship) => {
    const coordsRaw = ship.match(/\d+ \d+ [NSEW]\n/gm)[0].split(" ");
    return {
      startingCoords: {
        y: Number(coordsRaw[0]),
        x: Number(coordsRaw[1]),
      },
    };
  });

  console.log("shipsRaw", shipsRaw);
  return {
    maxY: Number(coordinates[0]),
    maxX: Number(coordinates[1]),
    ships,
  };
};
