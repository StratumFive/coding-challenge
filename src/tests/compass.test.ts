import {compassNavigation, Compass} from "../utils/compass"

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