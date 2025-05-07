import { Bitmap, BitmapColor } from "./bitmap";
import { Vec2 } from "./types";

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
  [t0, t1, t2] = [t0, t1, t2].sort((a, b) => a.y - b.y);

  const totalHeight = t2.y - t0.y;

  for (let y = t0.y; y <= t2.y; y++) {
    const totalGradient = totalHeight != 0 ? (y - t0.y) / totalHeight : 0;
    const isSecondSegment = t1.y < y;

    const calculateX1 = (p0: Vec2, p1: Vec2) => {
      const segmentHeight = p1.y - p0.y + 1;
      const segmentHeightDiff = y - p0.y;
      const segmentGradient =
        segmentHeight != 0 ? segmentHeightDiff / segmentHeight : 0;

      return p0.x + (p1.x - p0.x) * segmentGradient;
    };

    let x0 = t0.x + (t2.x - t0.x) * totalGradient;
    let x1 = isSecondSegment ? calculateX1(t1, t2) : calculateX1(t0, t1);

    [x0, x1] = [x0, x1].sort((a, b) => a - b);

    for (let x = x0; x <= x1; x++) {
      image.set(x, y, color);
    }
  }
}
