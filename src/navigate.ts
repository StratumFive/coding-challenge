import { directive } from "vue/types/umd";
import { Compass, compassNavigation } from "./compass";
import moveForward from "./moveForward";

interface Ship {
  coordinates: string;
  instructions: string;
}

interface Output {
    x: number,
    y: number, 
    direction: string, 
    lost: boolean
}

interface Coordinates {
  x: number;
  y: number;
}

function calculatePosition(gridBorder: number[], ship: Ship, bannedMoves: Output[]) {
    const northBorder: number = gridBorder[1];
  const eastBorder: number = gridBorder[0];

  const splitCoords: string[] = ship.coordinates.split(" ");

  let xCoords: number = Number(splitCoords[0]);
  let yCoords: number = Number(splitCoords[1]);
  let currentDirection = splitCoords[2];

  const shipInstruction = ship.instructions;
  let shipLost: boolean = false;
  console.log(`Current Coordinates: X:${xCoords}, Y: ${yCoords}`)

  for (let i = 0; i < shipInstruction.length; i++) {
    if (!shipLost) {
      if (shipInstruction.charAt(i) == "F") {
        let ignore : boolean = false
        
        bannedMoves.forEach((move : Output) => {
            if(move.x == xCoords && move.y == yCoords && move.direction == currentDirection) {
                ignore = true
            } else {
                ignore = false
            }
        })

        if(!ignore) {
               const newCoordinates = moveForward(xCoords, yCoords, currentDirection);
            if (
              newCoordinates.x > eastBorder ||
              newCoordinates.x < 0 ||
              newCoordinates.y > northBorder ||
              newCoordinates.y < 0
            ) {
              shipLost = true;
            } else {
              xCoords = newCoordinates.x;
              yCoords = newCoordinates.y;
            }
        }

      } else if (shipInstruction.charAt(i) == "R") {
        currentDirection = compassNavigation((<any>Compass)[currentDirection], "R");
      } else if (shipInstruction.charAt(i) == "L") {
        currentDirection = compassNavigation((<any>Compass)[currentDirection], "L");
      }
    }
  }
  //const output = `${xCoords} ${yCoords} ${currentDirection} ${shipLost ? "LOST" : ""}`;
  const output : Output = {
      x: xCoords,
      y: yCoords,
      direction: currentDirection,
      lost: shipLost
  }
  return output;
}

export { calculatePosition, Coordinates, Ship, Output };
