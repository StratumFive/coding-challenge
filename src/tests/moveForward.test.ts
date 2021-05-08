import moveForward from '../utils/moveForward'

test('Next step is in right direction', () => {
    expect(moveForward(1,1,'N')).toEqual({x: 1, y: 2})
    expect(moveForward(1,1,'E')).toEqual({x: 2, y: 1})
    expect(moveForward(1,1,'S')).toEqual({x: 1, y: 0})
    expect(moveForward(1,1,'W')).toEqual({x: 0, y: 1})
})
