/* eslint-disable @typescript-eslint/no-unused-vars */
import { render } from "lit";
import { Bitmap, BitmapColor } from "./bitmap";
import { WavefrontModel } from "./model";
import africanHeadObject from "./obj/african_head.obj?raw";
import "./render-target";
import { Vec2, Vec3 } from "./types";
import { triangle } from "./renderer";

function drawModel() {
  const width = 800;
  const height = 800;
  const lightDirection = new Vec3(0, 0, -1);
  const image = new Bitmap(width, height);
  const model = new WavefrontModel(africanHeadObject);

  for (let i = 0; i < model.faces.length; i++) {
    const face = model.faces[i];
    const screenCoords = [];
    const worldCoords = [];

    for (let j = 0; j < 3; j++) {
      const v0 = model.verts[face[j]];
      const x0 = (v0.x + 1) * (width / 2);
      const y0 = (v0.y + 1) * (height / 2);

      screenCoords.push(new Vec2(x0, y0));
      worldCoords.push(v0);
    }

    const n = worldCoords[2]
      .subtract(worldCoords[0])
      .cross(worldCoords[1].subtract(worldCoords[0]));

    const intensity = n.normalize().dot(lightDirection);

    if (intensity < 0) {
      continue;
    }

    triangle(
      screenCoords[0],
      screenCoords[1],
      screenCoords[2],
      image,
      new BitmapColor(intensity * 255, intensity * 255, intensity * 255),
    );
  }

  return new Blob([image.writeData()], { type: "image/bmp" });
}

const renderTarget = document.createElement("render-target");

renderTarget.buildImage = drawModel;

render(renderTarget, document.querySelector("#app") as HTMLElement);
