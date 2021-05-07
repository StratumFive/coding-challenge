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
    coordinates: '3 2 N',
    instructions: 'FRRFLLFFRRFLL'
}

function calculatePosition(gridBorder : number[], ship : Ship) {
    const eastBorder : number = gridBorder[0]
    const northBorder : number = gridBorder[1]
    const splitCoords : string[] = ship.coordinates.split(' ')
    let xCoords : number = Number(splitCoords[0])
    let yCoords : number = Number(splitCoords[1])
    let currentDirection : string = splitCoords[2]
    const shipInstruction = ship.instructions
    let shipLost : boolean = false

    for(let i = 0; i < shipInstruction.length; i++) {
        if(!shipLost) {
            if(shipInstruction.charAt(i) == 'F') {
                if(currentDirection == Compass[2]) {
                    if(xCoords < eastBorder) {
                        xCoords = xCoords + 1
                    } else {
                        shipLost = true
                    }
                } else if(currentDirection == Compass[3]){
                    if(yCoords > 0) {
                        yCoords = yCoords - 1
                    } else {
                        shipLost = true
                    }
                } else if(currentDirection == Compass[4]) {
                    if(xCoords > 0) {
                        xCoords = xCoords - 1
                    } else {
                        shipLost = true
                    }
                } else if(currentDirection == Compass[1]) {
                    if(yCoords < northBorder) {
                        yCoords = yCoords + 1
                    } else {
                        shipLost = true
                    }
                }
            } else if(shipInstruction.charAt(i) == 'R') {
                currentDirection = compassNavigation(Compass[currentDirection], 'R')
            } else if(shipInstruction.charAt(i) == 'L') {
                currentDirection = compassNavigation(Compass[currentDirection], 'L')
            }
        }
    }
    console.log(xCoords, yCoords, currentDirection, shipLost ? 'LOST' : '')
}


export {compassNavigation, Compass, calculatePosition, shipInfo} 