export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  subtract(other: Vec3) {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  cross(other: Vec3) {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
    );
  }

  normalize() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    return new Vec3(this.x / length, this.y / length, this.z / length);
  }

  dot(other: Vec3) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
}
