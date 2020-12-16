import { Process } from "./Process";
import { Segment } from "./Segment";
import { genProcesses, NO_VALUE_PROVIDED } from "./utils/genProcesses";
import { genSegments } from "./utils/genSegments";

export class Memory {
  private processes: Process[];
  private memorySegments: Segment[];

  private addedProcessesIds: number[] = [];

  constructor(processesQty: number, memorySegmentsQty: number) {
    this.memorySegments = genSegments(memorySegmentsQty);
    this.processes = genProcesses(processesQty, memorySegmentsQty);
  }

  displayMemory() {
    console.log(`PROCESSES`);
    console.table(this.processes);
    console.log(
      `FULL MEMORY SIZE:`,
      this.processes.reduce((acum, proc) => acum + proc.getSize(), 0)
    );

    console.log(`SEGMENTS`);
    console.table(this.memorySegments);
  }

  getFreeMemorySize() {
    return this.memorySegments.reduce(
      (acum, segment) => acum + segment.getFreeSize(),
      0
    );
  }

  getProcesses() {
    return this.processes;
  }

  upload(processId: number) {
    const process = this.processes.find(
      (process) => process.getId() === processId
    );

    if (process && process.getSection() !== NO_VALUE_PROVIDED) {
      return {
        message: "Process is already uploaded. Try another",
        status: false,
      };
    }

    if (process) {
      const segment = this.findSegmentToAddProcess(process.getSize());
      if (segment) {
        process.setAddress(segment.getSize() - segment.getFreeSize());
        process.setSection(segment.getId());
        segment.setFreeSize(segment.getFreeSize() - process.getSize());
        this.addedProcessesIds.push(process.getId());
        return {
          message: `Process with id = ${process.getId()} was successfully uploaded to segment with id = ${segment.getId()}, with offset = ${process.getAddress()}`,
          status: true,
        };
      } else {
        if (this.getFreeMemorySize() > process.getSize()) {
          this.defragmentate(process.getId());
          return {
            message: `Process with id = ${process.getId()} was successfully uploaded after defragmentation`,
            status: true,
          };
        } else {
          return {
            message: "No memory found to upload process",
            status: false,
          };
        }
      }
    }

    return {
      message: "UNKNOWN ERROR",
      status: false,
    };
  }

  unload(processId: number) {
    const process = this.processes.find(
      (process) => process.getId() === processId
    );

    if (!process) {
      return {
        message: "No process with such id found!",
        status: false,
      };
    }

    if (process.getSection() === -1) {
      return {
        message: "Process is already unloaded. Try another",
        status: false,
      };
    }

    const segment = this.memorySegments.find(
      (segment) => segment.getId() === process.getSection()
    );

    if (!segment) {
      return {
        message: "No segment with such id found!",
        status: false,
      };
    }

    segment.setFreeSize(segment.getFreeSize() + process.getSize());
    process.setAddress(0);
    process.setSection(NO_VALUE_PROVIDED);

    return {
      message: `Process with id = ${process.getId()} was successfully unloaded!`,
      status: true,
    };
  }

  transformAddress(processId: number) {
    const process = this.processes.find(
      (process) => process.getId() === processId
    );

    if (process?.getSection() === NO_VALUE_PROVIDED) {
      return {
        status: false,
        message: "Process is not uploaded",
      };
    }

    const segment = this.memorySegments.find(
      (seg) => seg.getId() === process?.getSection()
    );

    const realAddress = segment!.getAddress() + process!.getAddress();

    return {
      status: true,
      message: `Real address is ${realAddress}`,
    };
  }

  private findSegmentToAddProcess(size: number) {
    for (let segment of this.memorySegments) {
      if (segment.getFreeSize() >= size) return segment;
    }
    return null;
  }

  defragmentate(oneMoreProcId?: number) {
    for (let process of this.processes) {
      if (process.getSection() !== NO_VALUE_PROVIDED) {
        this.unload(process.getId());
      }
    }

    if (oneMoreProcId !== undefined) {
      this.defragmentateUpload([...this.addedProcessesIds, oneMoreProcId]);
    } else {
      this.defragmentateUpload(this.addedProcessesIds);
    }
  }

  defragmentateUpload(processesIds: number[]) {
    const processes = [];
    let memSegmentIndex = 0;
    let proccessIndex = 0;
    let lessMemory = 0;

    for (let processId of processesIds) {
      const process = this.processes.find(
        (process) => process.getId() === processId
      );
      processes.push(process);
    }

    while (proccessIndex < processes.length) {
      const proc = processes[proccessIndex];
      const mem = this.memorySegments[memSegmentIndex];
      const sizeOfProcOrLess = lessMemory > 0 ? lessMemory : proc!.getSize();

      if (sizeOfProcOrLess < mem.getFreeSize()) {
        if (lessMemory === 0) {
          proc!.setSection(mem.getId());
          proc!.setAddress(mem.getSize() - mem.getFreeSize());
        }
        mem!.setFreeSize(mem.getFreeSize() - sizeOfProcOrLess);
        proccessIndex++;
        lessMemory = 0;
      } else {
        proc?.setSection(mem.getId());
        proc?.setAddress(mem.getSize() - mem.getFreeSize());
        lessMemory = sizeOfProcOrLess - mem.getFreeSize();
        mem!.setFreeSize(0);
        memSegmentIndex++;
      }
    }

    if (memSegmentIndex < this.memorySegments.length) {
      return {
        status: true,
        message: "Defragmentation was successfully made!",
      };
    }

    return {
      status: false,
      message: "Not enough memory!",
    };
  }
}
