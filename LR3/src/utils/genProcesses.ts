import { Process } from "../Process";
import { randomIntBetween } from "./randomIntBetween";

export const NO_VALUE_PROVIDED = -1;

export function genProcesses(amount: number, availableSegments: number) {
  const processes: Process[] = [];
  for (let i = 0; i < amount; i++) {
    processes.push(
      new Process(i, randomIntBetween(100, 250), 0, NO_VALUE_PROVIDED)
    );
  }
  return processes;
}
