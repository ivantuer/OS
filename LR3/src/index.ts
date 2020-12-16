import inquirer from "inquirer";
import { Memory } from "./Memory";

enum choices {
  DISPLAY_MEMORY = "Display memory",
  UPLOAD_PROCESS = "Upload process",
  UNLOAD_PROCESS = "Unload process",
  TRANSFORM_ADDRESS = "Transform address",
  EXIT = "Exit",
}

const userInterface = async (memory: Memory) => {
  const { action } = await inquirer.prompt({
    message: "Select action",
    type: "list",
    name: "action",
    choices: [
      choices.DISPLAY_MEMORY,
      choices.UPLOAD_PROCESS,
      choices.UNLOAD_PROCESS,
      choices.TRANSFORM_ADDRESS,
      choices.EXIT,
    ],
  });

  if (action === choices.DISPLAY_MEMORY) {
    memory.displayMemory();
    return true;
  }

  if (action === choices.UPLOAD_PROCESS) {
    const { processId } = await inquirer.prompt({
      message: "Select process id to upload",
      type: "list",
      name: "processId",
      choices: memory.getProcesses().map((proc) => `${proc.getId()}`),
    });

    console.log("UPLOAD:", +processId);
    console.log(memory.upload(+processId));

    return true;
  }

  if (action === choices.UNLOAD_PROCESS) {
    const { processId } = await inquirer.prompt({
      message: "Select process id to unload",
      type: "list",
      name: "processId",
      choices: memory.getProcesses().map((proc) => `${proc.getId()}`),
    });

    console.log("UNLOAD:", +processId);
    console.log(memory.unload(+processId));

    return true;
  }

  if (action === choices.TRANSFORM_ADDRESS) {
    const { processId } = await inquirer.prompt({
      message: "Select process id to transform virtual address into real",
      type: "list",
      name: "processId",
      choices: memory.getProcesses().map((proc) => `${proc.getId()}`),
    });

    console.log("TRANSFORM:", +processId);
    console.log(memory.transformAddress(+processId));

    return true;
  }

  if (action === choices.EXIT) {
    return false;
  }

  console.log("TRY AGAIN");
  return true;
};

const main = async () => {
  const memory = new Memory(5, 5);
  while (true) {
    if (!(await userInterface(memory))) {
      return;
    }
  }
};

main();
