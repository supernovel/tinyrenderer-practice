import { render } from "lit";
import { Bitmap, BitmapColor } from "./bitmap";
import "./render-target";
import { line } from "./renderer";

const renderTarget = document.createElement("render-target");

const white = new BitmapColor(255, 255, 255);
const red = new BitmapColor(255, 0, 0);

renderTarget.buildImage = () => {
  const image = new Bitmap(100, 100);

  line(13, 20, 80, 40, image, white);
  line(20, 13, 40, 80, image, red);
  line(80, 40, 13, 20, image, red);

  return new Blob([image.writeData()], { type: "image/bmp" });
};

render(renderTarget, document.querySelector("#app") as HTMLElement);
