class Vertex {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class WavefrontModel {
  verts: Array<Vertex> = [];
  faces: Array<Array<number>> = [];
  data: string;

  constructor(data: string) {
    this.data = data;

    this._initialize();
  }

  _initialize() {
    const lines = this.data.split("\n");

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];

      if (line.startsWith("v ")) {
        const items = line.slice(2).split(/\s+/);
        const vertex = items.map((item) => parseFloat(item));

        this.verts.push(new Vertex(vertex[0], vertex[1], vertex[2]));
      } else if (line.startsWith("f ")) {
        const items = line.slice(2).split(/\s+/);

        this.faces.push(
          items.map((item) => {
            const indices = item.split("/");

            // in wavefront obj all indices start at 1, not zero
            return parseInt(indices[0]) - 1;
          }),
        );
      }
    }
  }
}
