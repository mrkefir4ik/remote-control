import Jimp from 'jimp';
import { httpServer } from './src/http_server/index';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import {
    MOUSE_UP, MOUSE_DOWN, MOUSE_LEFT,
    MOUSE_RIGHT, MOUSE_POSITION, DRAW_CIRCLE, DRAW_SQUARE, DRAW_RECTANGLE, PRNT_SCRN
} from './src/constants';

import { mouseUp, mouseDown, mouseLeft, mouseRight } from './src/controls/index';


const HTTP_PORT = process.env.HTTP_PORT || 3000;;
const WSS_PORT = process.env.WSS_PORT || 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WSS = new WebSocketServer({ port: WSS_PORT }, () => console.log(`Server started on ${WSS_PORT}`));

WSS.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        const input = data.toString();

        const values: number = parseInt(input.match(/\d+/));
        const { x, y } = robot.getMousePos();

        if (input.includes(MOUSE_UP)) {
            ws.send(MOUSE_UP)
            mouseUp(values)
        } else if (input.includes(MOUSE_DOWN)) {
            ws.send(MOUSE_DOWN)
            mouseDown(values)
        } else if (input.includes(MOUSE_LEFT)) {
            ws.send(MOUSE_LEFT)
            mouseLeft(values)
        } else if (input.includes(MOUSE_RIGHT)) {
            ws.send(MOUSE_RIGHT)
            mouseRight(values)
        } else if (input.includes(MOUSE_POSITION)) {
            ws.send(`${MOUSE_POSITION}, x = ${x} px, y = ${y} px`)
        } else if (input.includes(DRAW_CIRCLE)) {
            ws.send(DRAW_CIRCLE)
        } else if (input.includes(DRAW_SQUARE)) {
            ws.send(DRAW_SQUARE)
        } else if (input.includes(DRAW_RECTANGLE)) {
            ws.send(DRAW_RECTANGLE)
        } else if (input.includes(PRNT_SCRN)) {
            ws.send(PRNT_SCRN)
        } else {
            console.log('Wrong input. Please try again')
        }
    });

});

WSS.on('close', () => {
    console.log('Socket is closed');
})