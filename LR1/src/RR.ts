import { Process, ProcessObject } from './Process';

export class RR {
  private quantumTimeAmount: number;
  private currentProcessIndex: number;
  private currentProcessExecTime: number;
  public processes: Process[];
  private completedProcesses: ProcessObject[] = [];

  constructor(quantumTimeAmount: number, processes: Process[]) {
    this.quantumTimeAmount = quantumTimeAmount;
    this.processes = processes;

    this.currentProcessIndex = 0;
    this.currentProcessExecTime = 0;
  }

  addProcess(process: Process) {
    this.processes = [...this.processes, process];
  }

  addProcesses(processes: Process[]) {
    this.processes = [...this.processes, ...processes];
  }

  getProcess(workingTime: number) {
    if (this.currentProcessExecTime >= this.quantumTimeAmount) {
      if (
        this.currentProcessIndex + 1 === this.processes.length ||
        this.processes[this.currentProcessIndex + 1].arrivalTime >= workingTime
      ) {
        this.currentProcessIndex = 0;
      } else {
        this.currentProcessIndex = this.currentProcessIndex + 1;
      }
      this.currentProcessExecTime = 1;
    } else {
      this.currentProcessExecTime = this.currentProcessExecTime + 1;
    }

    return this.processes[this.currentProcessIndex];
  }

  deleteProcess(process: Process) {
    const clonedProc = { ...process };
    this.currentProcessExecTime = 0;

    if (this.processes.length - 1 === this.currentProcessIndex) {
      this.currentProcessIndex = 0;
    }
    this.completedProcesses.push(clonedProc);
    this.processes = this.processes.filter((proc) => proc.id !== process.id);
    return clonedProc;
  }

  toStr() {
    console.table(this.processes);
  }

  toStrFinal() {
    console.log(`RR Table`);

    const processesWithStats = this.completedProcesses.map(
      ({ estimatedTime, ...proc }) => ({
        ...proc,
        waitingTime:
          proc.endTime! - proc.arrivalTime! - proc.finalEstimatedTime,
      })
    );
    const avgWaitingTime =
      processesWithStats.reduce((acum, proc) => proc.waitingTime + acum, 0) /
      processesWithStats.length;
    console.table(processesWithStats);
    console.log(`AVG WAITING TIME: ${avgWaitingTime}`);
  }
}
