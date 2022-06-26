import 'dotenv/config'
import { httpServer } from './src/http_server/index';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import {
    MOUSE_UP, MOUSE_DOWN, MOUSE_LEFT,
    MOUSE_RIGHT, MOUSE_POSITION, DRAW_CIRCLE,
    DRAW_SQUARE, DRAW_RECTANGLE, PRNT_SCRN
} from './src/constants';
import { mouseUp, mouseDown, mouseLeft, mouseRight, takeScreenshot, drawCircle, drawSquare, drawRectangle } from './src/controls';

type Coordinates = {
    x: number;
    y: number;
};

const HTTP_PORT: number | string = process.env.HTTP_PORT || 3000;
const WEB_SOCKET_PORT: number | string = process.env.WSS_PORT || 8181;


console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: +WEB_SOCKET_PORT }, () => console.log(`Server started on PORT: ${WEB_SOCKET_PORT}`));

wss.on('connection', function connection(ws) {
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.on('data', (chunk) => {
        const input = chunk.toString();
        const values: number = parseInt(input.match(/\d+/));
        const { x, y }: Coordinates = robot.getMousePos()

        if (input.includes(MOUSE_UP)) {
            duplex.write(MOUSE_UP)
            mouseUp(values)
        } else if (input.includes(MOUSE_DOWN)) {
            duplex.write(MOUSE_DOWN)
            mouseDown(values)
        } else if (input.includes(MOUSE_LEFT)) {
            duplex.write(MOUSE_LEFT)
            mouseLeft(values)
        } else if (input.includes(MOUSE_RIGHT)) {
            duplex.write(MOUSE_RIGHT)
            mouseRight(values)
        } else if (input.includes(MOUSE_POSITION)) {
            duplex.write(`${MOUSE_POSITION} ${x}px,${y}px`)
        } else if (input.includes(DRAW_CIRCLE)) {
            duplex.write(DRAW_CIRCLE);
            drawCircle(values)
        } else if (input.includes(DRAW_SQUARE)) {
            duplex.write(DRAW_SQUARE);
            drawSquare(values);
        } else if (input.includes(DRAW_RECTANGLE)) {
            duplex.write(DRAW_RECTANGLE);
            drawRectangle(input);
        } else if (input.includes(PRNT_SCRN)) {
            duplex.write(PRNT_SCRN)
            takeScreenshot(ws)
        } else {
            console.log('Invalid input. Please, try again.')
        }
    });
});

wss.on('close', () => {
    console.log('Socket is closed.');
})