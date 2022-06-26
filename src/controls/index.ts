import robot from 'robotjs';
import Jimp from 'jimp';

//MouseHandlers
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


//PrintScreen
export const takeScreenshot = (ws: any): void => {
    const { x, y } = robot.getMousePos();
    new Jimp(
        {
            data: robot.screen.capture(
                x - 100,
                y - 200,
                200,
                200
            ).image,
            width: 200,
            height: 200,
        },
        (err: Error, picture: any) => {
            if (err) {
                throw err;
            } else {
                picture.getBuffer(
                    Jimp.PNG_FILTER_AUTO,
                    (err: Error, string: string) => {
                        if (err) {
                            throw err;
                        } else {
                            ws.send(
                                `prnt_scrn ${Buffer.from(string).toString("base64")}`
                            );
                            console.log(`message prnt_scrn`);
                        }
                    }
                );
            }
        }
    );
};