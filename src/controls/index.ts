import robot from 'robotjs';
import Jimp from 'jimp';

type Coordinates = {
    x: number;
    y: number;
};

//MouseHandlers
export const mouseUp = (num: number): void => {
    const { x, y }: Coordinates = robot.getMousePos();
    robot.moveMouse(x, y - num);
};

export const mouseDown = (num: number): void => {
    const { x, y }: Coordinates = robot.getMousePos();
    robot.moveMouse(x, y + num);
}

export const mouseLeft = (num: number): void => {
    const { x, y }: Coordinates = robot.getMousePos();
    robot.moveMouse(x - num, y);
}

export const mouseRight = (num: number): void => {
    const { x, y }: Coordinates = robot.getMousePos();
    robot.moveMouse(x + num, y);
}


//PrintScreen
export const takeScreenshot = (ws: any): void => {
    const { x, y } = robot.getMousePos();


    // var img=robot.screen.capture();
    // var data=[];
    // var bitmap=img.image;
    // var i=0,l=bitmap.length;
    // for(i=0;i<l;i+=4){
    //     data.push(bitmap[i+2],bitmap[i+1],bitmap[i],bitmap[i+3]);
    // }
    // new Jimp({
    //     "data":new Uint8Array(data),
    //     "width":img.width,
    //     "height":img.height
    // }



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
                            console.log(`Screenshot is taken`);
                        }
                    }
                );
            }
        }
    );
};

export const drawSquare = (radius: number): void => {
    const coordinates: Coordinates = robot.getMousePos();

    robot.mouseToggle("down");
    robot.moveMouseSmooth(coordinates.x + radius, coordinates.y);
    robot.moveMouseSmooth(coordinates.x + radius, coordinates.y + radius);
    robot.moveMouseSmooth(coordinates.x, coordinates.y + radius);
    robot.moveMouseSmooth(coordinates.x, coordinates.y);
    robot.mouseToggle("up");
};


export const drawRectangle = (input: string): void => {
    const coordinates: Coordinates = robot.getMousePos();

    const rectX: number = parseInt(input.split(" ")[1]);
    const rectY: number = parseInt(input.split(" ")[2]);
    robot.mouseToggle("down");
    robot.moveMouseSmooth(coordinates.x + rectX, coordinates.y);
    robot.moveMouseSmooth(coordinates.x + rectX, coordinates.y + rectY);
    robot.moveMouseSmooth(coordinates.x, coordinates.y + rectY);
    robot.moveMouseSmooth(coordinates.x, coordinates.y);
    robot.mouseToggle("up");
};

export const drawCircle = (radius: number): void => {
    const coordinates: Coordinates = robot.getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x: number = coordinates.x + radius * Math.cos(i);
        const y: number = coordinates.y + radius * Math.sin(i);
        robot.dragMouse(x, y);
        robot.mouseClick();
    }
};