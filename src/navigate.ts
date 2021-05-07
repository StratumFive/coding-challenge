enum Compass {
    N = 1,
    E,
    S,
    W
}

interface Ship {
    coordinates: string, 
    instructions: string
}

function compassNavigation(current : Compass, direction : 'L' | 'R') {
    const currentNumber : number = current
    const left = currentNumber > 1 ? currentNumber - 1 : 4 
    const right = currentNumber < 4 ? currentNumber + 1 : 1
    if(direction == 'L') {
        return Compass[left]
    } else {
        return Compass[right]
    }
}

const gridTop : number[] = [5,3]
const shipInfo = {
    coordinates: '1 1 E',
    instructions: 'RFRFRFRF'
}

function calculatePosition(gridBorder : number[], ship : Ship) {
    const splitCoords : string[] = ship.coordinates.split(' ')
    let xCoords = Number(splitCoords[0])
    let yCoords = Number(splitCoords[1])
    const startingDirection = splitCoords[2]
    let currentDirection = startingDirection
    const shipInstruction = ship.instructions
    let lost : boolean = false

    for(let i = 0; i < shipInstruction.length; i++) {
        console.log(currentDirection)
        if(shipInstruction.charAt(i) == 'F') {
            if(currentDirection == Compass[2]) {
                xCoords = xCoords + 1
            } else if(currentDirection == Compass[3]){
                yCoords = yCoords - 1
            } else if(currentDirection == Compass[4]) {
                xCoords = xCoords - 1
            } else if(currentDirection == Compass[1]) {
                yCoords = yCoords + 1
            }
        } else if(shipInstruction.charAt(i) == 'R') {
            currentDirection = compassNavigation(Compass[currentDirection], 'R')
        } else if(shipInstruction.charAt(i) == 'L') {
            currentDirection = compassNavigation(Compass[currentDirection], 'L')
        }
    }

    console.log(xCoords, yCoords, currentDirection)
}


export {compassNavigation, Compass, calculatePosition, shipInfo} 