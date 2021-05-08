import {  calculatePosition } from "../utils/navigate"

describe('calculatePosition', () => {
    const shipInfoTest = {
        coordinates: '1 1 N',
        instructions: 'RF'
    }

    test('calculatePosition gives the right output', () => {
        const gridBorderTest = [3,3]
        const result = calculatePosition(gridBorderTest, shipInfoTest, [])
        const output = `${result.x} ${result.y} ${result.direction}  `
        expect(output).toBe('2 1 E  ')
    })
    
    test('calculatePosition logs if ship is LOST', () => {
        const gridBorderTest = [1,1]
        const result = calculatePosition(gridBorderTest, shipInfoTest, [])
        const output = `${result.x} ${result.y} ${result.direction} LOST`
        expect(output).toBe('1 1 E LOST')
    })
})