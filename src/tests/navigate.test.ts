import { compassNavigation, Compass } from "../navigate"

test('compass directions are correct', () => {
    const result = compassNavigation(Compass.E, 'L')
    expect(result).toBe('N')
})