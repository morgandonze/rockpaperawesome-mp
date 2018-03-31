const SHAKE_TIME = 3000
const RESULT = 1000
const MOVE_TIME = 3000
const HURRY = 2000

export default {
  SHAKE_TIME: SHAKE_TIME,
  MOVE_TIME: MOVE_TIME,
  HURRY: HURRY,
  RESULT: RESULT,
  TURN: SHAKE_TIME + RESULT + MOVE_TIME + 3*HURRY
}