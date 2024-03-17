export class BitmapColor {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export class Bitmap {
  width: number;
  height: number;
  data: Array<BitmapColor | undefined>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.data = [];
  }

  set(x: number, y: number, color: BitmapColor): void {
    const position = Math.floor(y) * this.width + Math.floor(x);

    this.data[position] = color;
  }

  writeData(): Uint8Array {
    const bitPerPixel = 24;
    // 24비트 비트맵 파일은 각각의 픽셀이 3바이트(RGB 순서대로 1바이트씩)으로 되어 있다.
    // 한 줄의 row가 끝나면, 한 row의 바이트를 4의 배수로 맞춰주기 위해 패딩(0으로 채워짐)이 채워진다.
    const fileHeaderSize = 14;
    const dibHeaderSize = 40;
    const dataOffset = fileHeaderSize + dibHeaderSize;
    // 데이터 Row는 4의 배수로 맞춰줘야 하므로, 패딩을 추가해야 한다.
    const dataPadding = this.width % 4;
    const dataSize = this.height * (3 * this.width + dataPadding);
    const fileSize = dataOffset + dataSize;
    const buffer = new Uint8Array(fileSize);

    let bufferPosition = 0;

    // type
    buffer.set(
      "BM".split("").map((c) => c.charCodeAt(0)),
      bufferPosition,
    );
    bufferPosition += 2;

    // file size
    buffer.set(Uint32Array.of(fileSize), bufferPosition);
    bufferPosition += 4;

    // reserved
    buffer.set(Uint32Array.of(0), bufferPosition);
    bufferPosition += 4;

    // file data offset
    buffer.set(Uint32Array.of(dataOffset), bufferPosition);
    bufferPosition += 4;

    // DIB header size
    buffer.set(Uint32Array.of(dibHeaderSize), bufferPosition);
    bufferPosition += 4;

    // image width
    buffer.set(Uint32Array.of(this.width), bufferPosition);
    bufferPosition += 4;

    // image height
    buffer.set(Uint32Array.of(this.height), bufferPosition);
    bufferPosition += 4;

    // color planes
    buffer.set(Uint16Array.of(1), bufferPosition);
    bufferPosition += 2;

    // bit per pixel
    buffer.set(Uint16Array.of(bitPerPixel), bufferPosition);
    bufferPosition += 2;

    // compression
    buffer.set(Uint32Array.of(0), bufferPosition);
    bufferPosition += 4;

    // image size
    buffer.set(Uint32Array.of(dataSize), bufferPosition);
    bufferPosition += 4;

    // horizontal resolution
    buffer.set(Uint32Array.of(0), bufferPosition);
    bufferPosition += 4;

    // vertical resolution
    buffer.set(Uint32Array.of(0), bufferPosition);
    bufferPosition += 4;

    // colors in color palette
    buffer.set(Uint32Array.of(0), bufferPosition);
    bufferPosition += 4;

    // important colors
    buffer.set(Uint32Array.of(0), bufferPosition);
    bufferPosition += 4;

    // image data
    for (let y = this.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        const position = y * this.width + x;
        const pixel = this.data[position];

        buffer.set(
          Uint8Array.of(pixel?.r ?? 0, pixel?.g ?? 0, pixel?.b ?? 0),
          bufferPosition,
        );
        bufferPosition += 3;
      }

      // 마지막에 패딩 추가
      if (dataPadding > 0) {
        const padding = new Uint8Array(dataPadding);
        buffer.set(padding, bufferPosition);
        bufferPosition += padding.length;
      }
    }

    return buffer;
  }
}
