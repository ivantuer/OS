import { Process } from './Process';
import { randomIntBetween } from './utils/randomIntBetween';

export class ProcessFactory {
  idNumber: number = 0;
  minExecTime: number;
  maxExecTime: number;
  minArrivalTime: number;
  maxArrivalTime: number;

  constructor(
    minExecTime: number,
    maxExecTime: number,
    minArrivalTime: number,
    maxArrivalTime: number
  ) {
    this.minExecTime = minExecTime;
    this.maxExecTime = maxExecTime;
    this.minArrivalTime = minArrivalTime;
    this.maxArrivalTime = maxArrivalTime;
  }

  updateArrivalTimeLimits(minArrivalTime: number, maxArrivalTime: number) {
    this.minArrivalTime = minArrivalTime;
    this.maxArrivalTime = maxArrivalTime;
  }

  getId() {
    return this.idNumber++;
  }

  generate(length: number) {
    const processes: Process[] = [];
    for (let i = 0; i < length; i++) {
      processes.push(
        new Process(
          this.getId(),
          randomIntBetween(this.minArrivalTime, this.maxArrivalTime),
          randomIntBetween(this.minExecTime, this.maxExecTime)
        )
      );
    }
    return processes;
  }

  generateLater(processes: Process[], length: number) {
    const sumExecTime = processes.reduce(
      (sum, process) => process.estimatedTime + sum,
      0
    );

    this.updateArrivalTimeLimits(Math.floor(sumExecTime / 2), sumExecTime);

    return this.generate(length);
  }
}
