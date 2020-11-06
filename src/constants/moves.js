export const kHeadingsMap = new Map([
  ['N', 0],
  ['E', 90],
  ['S', 180],
  ['W', 270]
])

export const kMoveMap = new Map([
  [0, { xDiff: 0, yDiff: 1 }],
  [90, { xDiff: 1, yDiff: 0 }],
  [180, { xDiff: 0, yDiff: -1 }],
  [270, { xDiff: -1, yDiff: 0 }]
])

export const kRotationMap = new Map([
  ['L', -90],
  ['R', 90]
])
