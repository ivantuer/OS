import { ProcessFactory } from './ProcessFactory';
import { RR } from './RR';
import { Scheduler } from './Scheduler';
import { SJF } from './SJF';

const main = () => {
  const factory = new ProcessFactory(15, 20, 0, 10);
  const rr = new RR(8, factory.generate(4));
  const sjf = new SJF(factory.generate(2));

  rr.addProcesses(factory.generateLater(rr.processes, 2));
  sjf.addProcesses(factory.generateLater(rr.processes, 2));

  rr.processes = rr.processes.sort(
    (proc1, proc2) => proc1.arrivalTime - proc2.arrivalTime
  );
  sjf.processes = sjf.processes.sort(
    (proc1, proc2) => proc1.arrivalTime - proc2.arrivalTime
  );

  const scheduler = new Scheduler(25, rr, sjf, factory);
  scheduler.run();
};

main();
