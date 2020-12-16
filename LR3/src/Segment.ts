export class Segment {
  private id: number;
  private size: number;
  private freeSize: number;
  private address: number;

  constructor(id: number, size: number, freeSize: number, address: number) {
    this.id = id;
    this.size = size;
    this.freeSize = freeSize;
    this.address = address;
  }

  getId() {
    return this.id;
  }

  getSize() {
    return this.size;
  }

  getAddress() {
    return this.address;
  }

  getFreeSize() {
    return this.freeSize;
  }

  setFreeSize(freeSize: number) {
    this.freeSize = freeSize;
    return freeSize;
  }
}
