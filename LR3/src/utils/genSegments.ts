import { Segment } from "../Segment";
import { randomIntBetween } from "./randomIntBetween";

export function genSegments(amount: number) {
  const memorySegments: Segment[] = [];
  let lastAddress = 0;
  for (let i = 0; i < amount; i++) {
    const size = randomIntBetween(100, 200);
    memorySegments.push(new Segment(i, size, size, lastAddress));
    lastAddress += size;
  }
  return memorySegments;
}
