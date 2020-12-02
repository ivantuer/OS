import { ProcessFactory } from './ProcessFactory';
import { RR } from './RR';
import { SJF } from './SJF';

const RR_COEF = 0.8;
const SJF_COEF = 0.2;

export class Scheduler {
  rr: RR;
  sjf: SJF;
  rrTime: number;
  sjfTime: number;
  currentMode: 'rr' | 'sjf';
  workingTime: number;
  factory: ProcessFactory;

  constructor(
    maxExecutionTime: number,
    rr: RR,
    sjf: SJF,
    factory: ProcessFactory
  ) {
    this.rr = rr;
    this.sjf = sjf;
    this.factory = factory;

    this.rrTime = RR_COEF * maxExecutionTime;
    this.sjfTime = SJF_COEF * maxExecutionTime;

    this.workingTime = 0;

    let currentModeDependingOnMinimalArrivalTime: 'rr' | 'sjf' = 'rr';
    const minRRTime = Math.min(...rr.processes.map((proc) => proc.arrivalTime));
    const minSJFTime = Math.min(
      ...rr.processes.map((proc) => proc.arrivalTime)
    );
    if (minRRTime <= minSJFTime) {
      currentModeDependingOnMinimalArrivalTime = 'rr';
    } else {
      currentModeDependingOnMinimalArrivalTime = 'sjf';
    }
    this.currentMode = currentModeDependingOnMinimalArrivalTime;
  }

  executeRR() {
    let localTime = 0;

    while (localTime < this.rrTime && this.rr.processes.length !== 0) {
      const process = this.rr.getProcess(this.workingTime);
      process.setStartTime(this.workingTime);

      if (process.execute()) {
        localTime = localTime + 1;
        this.workingTime = this.workingTime + 1;
        process.setEndTime(this.workingTime);
        this.rr.deleteProcess(process);
        continue;
      }
      localTime = localTime + 1;
      this.workingTime = this.workingTime + 1;
    }
  }

  executeSJF() {
    let localTime = 0;
    while (localTime < this.sjfTime && this.sjf.processes.length !== 0) {
      let process = this.sjf.getProcess(this.workingTime);
      process.setStartTime(this.workingTime);
      while (!process.execute()) {
        localTime = localTime + 1;
        this.workingTime = this.workingTime + 1;
      }
      localTime = localTime + 1;
      this.workingTime = this.workingTime + 1;
      process.setEndTime(this.workingTime);
      this.sjf.deleteProcess(process);
    }
  }

  run() {
    while (this.rr.processes.length !== 0 || this.sjf.processes.length !== 0) {
      if (this.currentMode === 'sjf') {
        this.executeSJF();
        this.currentMode = 'rr';
      } else {
        this.executeRR();
        this.currentMode = 'sjf';
      }
    }

    this.rr.toStrFinal();
    this.sjf.toStrFinal();
  }
}
