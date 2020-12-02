export class Process {
  public id: number;
  public arrivalTime: number;
  public estimatedTime: number;
  public finalEstimatedTime: number;
  public startTime: number | null = null;
  public endTime: number | null = null;

  constructor(id: number, aTime: number, eTime: number) {
    this.id = id;
    this.arrivalTime = aTime;
    this.estimatedTime = eTime;
    this.finalEstimatedTime = eTime;
  }

  public execute(): boolean {
    this.estimatedTime = this.estimatedTime - 1;
    return this.estimatedTime === 0;
  }

  public getExecTime(): number {
    return this.estimatedTime;
  }

  public setStartTime(startTime: number): number {
    if (this.startTime === null) {
      this.startTime = startTime;
    }
    return startTime;
  }

  public setEndTime(endTime: number): number {
    this.endTime = endTime;
    return endTime;
  }
}

export type ProcessObject = {
  id: number;
  arrivalTime: number;
  estimatedTime: number;
  startTime: number | null;
  endTime: number | null;
  finalEstimatedTime: number;
};
