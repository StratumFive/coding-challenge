enum Compass {
    N = 1,
    E,
    S,
    W
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

export {Compass, compassNavigation}