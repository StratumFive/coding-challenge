class Coordinates {
    x : number 
    y : number

    constructor(x : number, y : number) {
        this.x = x
        this.y = y
    }

    moveEast() {
        return [this.x + 1, this.y]
    }
    moveSouth() {
        return [this.x, this.y - 1]
    }
    moveWest() {
        return [this.x - 1, this.y]
    }
    moveNorth() {
        return [this.x, this.y + 1]
    }
}