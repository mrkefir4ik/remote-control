import robot from 'robotjs';

//Handlers
export const mouseUp = (x, y, n) => {
    robot.moveMouse(x, y - n)
};

export const mouseDown = (x, y, n) => {
    robot.moveMouse(x, y + n)
}

export const mouseLeft = (x, y, n) => {
    robot.moveMouse(x - n, y)
}

export const mouseRight = (x, y, n) => {
    robot.moveMouse(x + n, y)
} 