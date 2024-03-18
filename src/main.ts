import { render } from "lit";
import { Bitmap, BitmapColor } from "./bitmap";
import { WavefrontModel } from "./model";
import africanHeadObject from "./obj/african_head.obj?raw";
import "./render-target";
import { line } from "./renderer";

const renderTarget = document.createElement("render-target");

const white = new BitmapColor(255, 255, 255);

renderTarget.buildImage = () => {
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

      line(x0, y0, x1, y1, image, white);
    }
  }

  return new Blob([image.writeData()], { type: "image/bmp" });
};

render(renderTarget, document.querySelector("#app") as HTMLElement);
