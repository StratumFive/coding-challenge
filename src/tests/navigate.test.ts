import {  calculatePosition } from "../navigate"
import {compassNavigation, Compass} from "../compass"


describe('compass directions are correct', () => {
    test('test 1', () => {
        const result = compassNavigation(Compass.E, 'L')
        expect(result).toBe('N')
    })
    test('test 2', () => {
        const result = compassNavigation(Compass.W, 'L')
        expect(result).toBe('S')
    })
})

describe('calculatePosition', () => {
    const shipInfoTest = {
        coordinates: '1 1 N',
        instructions: 'RF'
    }

    test('calculatePosition gives the right output', () => {
        const gridBorderTest = [3,3]
        expect(calculatePosition(gridBorderTest, shipInfoTest, [])).toBe('2 1 E ')
    })
    
    test('calculatePosition logs if ship is LOST', () => {
        const gridBorderTest = [1,1]
        expect(calculatePosition(gridBorderTest, shipInfoTest, [])).toBe('1 1 E LOST')
    })
})