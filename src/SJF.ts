import { Process, ProcessObject } from './Process';

export class SJF {
  public processes: Process[];
  private completedProcesses: ProcessObject[] = [];

  constructor(processes: Process[]) {
    this.processes = processes;
  }

  addProcess(process: Process) {
    this.processes = [...this.processes, process];
  }

  addProcesses(processes: Process[]) {
    this.processes = [...this.processes, ...processes];
  }

  getProcess(workingTime: number) {
    let indexToReturn = 0;
    this.processes.forEach((proc, i) => {
      if (
        proc.estimatedTime < this.processes[indexToReturn].estimatedTime &&
        proc.arrivalTime <= workingTime
      ) {
        indexToReturn = i;
      }
    });
    return this.processes[indexToReturn];
  }

  deleteProcess(process: Process) {
    const clonedProc = { ...process };
    this.completedProcesses.push(clonedProc);
    this.processes = this.processes.filter((proc) => proc.id !== process.id);
    return clonedProc;
  }

  toStr() {
    console.table(this.processes);
  }

  toStrFinal() {
    console.log(`SJF Table`);
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
