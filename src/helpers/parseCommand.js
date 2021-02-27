/** Why all this regex and complexity?
 * I'm sticking with the Sample input as given, and taking responsibility for
 * parsing that into a more user-friendly command object, for the next steps.
 * Not assuming a UI of separate inputs for grid, ship-start, commands.
 *
 * What "magic" there is here is at least covered by the dedicated unit tests,
 * after which future actions will be more readable.
 *
 * See the last test of the parseCommand spec for the output goal of exposed simplicity.
 */
export default (command) => {
  const regexForCoordinates = /\d+ \d+\n/gm;
  const coordinates = command
    .match(regexForCoordinates)[0]
    .replace("\n", "")
    .split(" ");
  const commandWithoutCoordinates = command.replace(regexForCoordinates, "");
  const shipsRaw = commandWithoutCoordinates.split("\n\n");
  const ships = shipsRaw.map(parseShip);
  return {
    maxY: Number(coordinates[0]),
    maxX: Number(coordinates[1]),
    ships,
  };
};

function parseShip(ship) {
  const coordsRaw = ship.match(/\d+ \d+ [NSEW]\n/gm)[0].split(" ");
  return {
    startingCoords: {
      x: Number(coordsRaw[0]),
      y: Number(coordsRaw[1]),
    },
    startingDirection: coordsRaw[2].replace("\n", ""),
    commands: ship.split("\n")[1],
  };
}
