export class Process {
  private id: number;
  private size: number;
  private address: number;
  private section: number;

  constructor(id: number, size: number, address: number, section: number) {
    this.id = id;
    this.size = size;
    this.address = address;
    this.section = section;
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
