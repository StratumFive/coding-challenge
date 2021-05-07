import {Compass} from "./compass"
import {Coordinates} from "./navigate"

function moveForward(x : number, y : number, direction : string) {
    const nextMove : Coordinates = {x, y}
    if(direction == Compass[2]) {
        nextMove.x = x + 1
        nextMove.y = y
    } else if(direction == Compass[3]) {
        nextMove.x = x
        nextMove.y = y - 1
    } else if(direction == Compass[4]) {
        nextMove.x = x - 1
        nextMove.y = y
    } else if(direction == Compass[1]) {
        nextMove.x = x
        nextMove.y = y + 1
    }
    return nextMove
}

export default moveForward