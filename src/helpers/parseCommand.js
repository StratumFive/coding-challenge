export default (command) => {
  const regexForCoordinates = /\d+ \d+\n/gm;
  const coordinates = command
    .match(regexForCoordinates)[0]
    .replace("\n", "")
    .split(" ");
  console.log("coordinates", coordinates);
  return {
    maxY: Number(coordinates[0]),
    maxX: Number(coordinates[1]),
  };
};
