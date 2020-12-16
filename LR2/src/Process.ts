export class Process {
  private id: number;
  private size: number;
  private segmentId: number;
  private address: number;
  private section: number;

  constructor(
    id: number,
    size: number,
    segmentId: number,
    address: number,
    section: number
  ) {
    this.id = id;
    this.size = size;
    this.segmentId = segmentId;
    this.address = address;
    this.section = section;
  }

  getId() {
    return this.id;
  }

  getSize() {
    return this.size;
  }

  getSegmentId() {
    return this.segmentId;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address: number) {
    this.address = address;
    return address;
  }

  getSection() {
    return this.section;
  }

  setSection(section: number) {
    this.section = section;
    return section;
  }
}
