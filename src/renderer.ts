import { Bitmap, BitmapColor } from "./bitmap";

export function line(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  image: Bitmap,
  color: BitmapColor,
) {
  for (let x = x0; x < x1; x++) {
    const t = (x - x0) / (x1 - x0);
    const y = y0 + (y1 - y0) * t;

    image.set(x, y, color);
  }
}
