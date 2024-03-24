import { Bitmap, BitmapColor } from "./bitmap";

export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export function line(p0: Vec2, p1: Vec2, image: Bitmap, color: BitmapColor) {
  let steep = false;

  // 변화량이 큰 방향으로 그리기
  if (Math.abs(p0.x - p1.x) < Math.abs(p0.y - p1.y)) {
    p0 = new Vec2(p0.y, p0.x);
    p1 = new Vec2(p1.y, p1.x);

    steep = true;
  }

  // 왼쪽에서 오른쪽으로 그리기
  if (p0.x > p1.x) {
    [p0, p1] = [p1, p0];
  }

  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const derror = Math.abs(dy) * 2;
  let error = 0;
  let y = p0.y;

  for (let x = p0.x; x < p1.x; x++) {
    if (steep) {
      image.set(y, x, color);
    } else {
      image.set(x, y, color);
    }

    error += derror;
    if (error > dx) {
      y += p1.y > p0.y ? 1 : -1;
      error -= dx * 2;
    }
  }
}

export function triangle(
  t0: Vec2,
  t1: Vec2,
  t2: Vec2,
  image: Bitmap,
  color: BitmapColor,
) {
  line(t0, t1, image, color);
  line(t1, t2, image, color);
  line(t2, t0, image, color);
}
