import { render } from "lit";
import { Bitmap, BitmapColor } from "./bitmap";
import { WavefrontModel } from "./model";
import africanHeadObject from "./obj/african_head.obj?raw";
import "./render-target";
import { Vec2, line, triangle } from "./renderer";

const renderTarget = document.createElement("render-target");

const white = new BitmapColor(255, 255, 255);
const red = new BitmapColor(255, 0, 0);
const green = new BitmapColor(0, 255, 0);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const drawModel = () => {
  const width = 800;
  const height = 800;
  const image = new Bitmap(width, height);
  const model = new WavefrontModel(africanHeadObject);

  for (let i = 0; i < model.faces.length; i++) {
    const face = model.faces[i];

    for (let j = 0; j < 3; j++) {
      const v0 = model.verts[face[j]];
      const v1 = model.verts[face[(j + 1) % 3]];
      const x0 = ((v0.x + 1) * width) / 2;
      const y0 = ((v0.y + 1) * height) / 2;
      const x1 = ((v1.x + 1) * width) / 2;
      const y1 = ((v1.y + 1) * height) / 2;

      line(new Vec2(x0, y0), new Vec2(x1, y1), image, white);
    }
  }

  return new Blob([image.writeData()], { type: "image/bmp" });
};

const drawTriangle = () => {
  const width = 800;
  const height = 800;
  const image = new Bitmap(width, height);

  const t0: Vec2[] = [new Vec2(10, 70), new Vec2(50, 160), new Vec2(70, 80)];
  const t1: Vec2[] = [new Vec2(180, 50), new Vec2(150, 1), new Vec2(70, 180)];
  const t2: Vec2[] = [
    new Vec2(180, 150),
    new Vec2(120, 160),
    new Vec2(130, 180),
  ];

  triangle(t0[0], t0[1], t0[2], image, red);
  triangle(t1[0], t1[1], t1[2], image, white);
  triangle(t2[0], t2[1], t2[2], image, green);

  return new Blob([image.writeData()], { type: "image/bmp" });
};

renderTarget.buildImage = () => {
  return drawTriangle();
};

render(renderTarget, document.querySelector("#app") as HTMLElement);
