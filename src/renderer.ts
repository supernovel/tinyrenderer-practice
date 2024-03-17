import { Bitmap, BitmapColor } from "./bitmap";

export function line(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  image: Bitmap,
  color: BitmapColor,
) {
  let steep = false;

  // 변화량이 큰 방향으로 그리기
  if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
    const temp = [x0, y0, x1, y1];
    x0 = temp[1];
    y0 = temp[0];
    x1 = temp[3];
    y1 = temp[2];

    steep = true;
  }

  // 왼쪽에서 오른쪽으로 그리기
  if (x0 > x1) {
    const temp = [x0, y0, x1, y1];
    x1 = temp[0];
    y1 = temp[1];
    x0 = temp[2];
    y0 = temp[3];
  }

  for (let x = x0; x < x1; x++) {
    const t = (x - x0) / (x1 - x0);
    const y = y0 + (y1 - y0) * t;

    if (steep) {
      image.set(y, x, color);
      continue;
    }

    image.set(x, y, color);
  }
}
