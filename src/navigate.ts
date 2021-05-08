import {Compass, compassNavigation} from "./compass"
import moveForward from "./moveForward"

interface Ship {
    coordinates: string, 
    instructions: string
}

interface Coordinates {
    x: number, 
    y: number
}

const gridTop : number[] = [5,3]
const shipInfo = {
    coordinates: '0 3 W',
    instructions: 'LLFFFLFLFL'
}

function calculatePosition(gridBorder : number[], ship : Ship) {
    const eastBorder : number = gridBorder[0]
    const northBorder : number = gridBorder[1]

    const splitCoords : string[] = ship.coordinates.split(' ')

    let xCoords : number = Number(splitCoords[0])
    let yCoords : number = Number(splitCoords[1])

    let currentDirection = splitCoords[2]
    const shipInstruction = ship.instructions
    let shipLost : boolean = false

    for(let i = 0; i < shipInstruction.length; i++) { 
        if(!shipLost) {
            if(shipInstruction.charAt(i) == 'F') {
                const newCoordinates = moveForward(xCoords, yCoords, currentDirection)
                if(newCoordinates.x > eastBorder || newCoordinates.x < 0) {
                    shipLost = true
                } else if(newCoordinates.y > northBorder || newCoordinates.y < 0) {
                    shipLost = true
                } else {
                    xCoords = newCoordinates.x
                    yCoords = newCoordinates.y
                }
            } else if(shipInstruction.charAt(i) == 'R') {
                currentDirection = compassNavigation((<any>Compass)[currentDirection], 'R')
            } else if(shipInstruction.charAt(i) == 'L') {
                currentDirection = compassNavigation((<any>Compass)[currentDirection], 'L')
            }
        }
    }
    const output = `${xCoords} ${yCoords} ${currentDirection} ${shipLost ? 'LOST' : ''}`
    console.log(output)
    return output
}


export {calculatePosition, shipInfo, Coordinates, Ship} 