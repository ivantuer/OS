import inquirer from "inquirer";
import { BinaryTree } from "./BST";

enum choices {
  ADD = "Add new node",
  DELETE = "Delete existing node",
  FIND = "Find existing node",
  BALANCE = "Balance tree",
  BACK = "Back",
}

const availableKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const userInterface = async (tree: BinaryTree<number>) => {
  const { action } = await inquirer.prompt({
    message: "Select action",
    type: "list",
    name: "action",
    choices: [
      choices.ADD,
      choices.DELETE,
      choices.FIND,
      choices.BALANCE,
      choices.BACK,
    ],
  });

  if (action === choices.ADD) {
    const { key } = await inquirer.prompt({
      message: "Select action",
      type: "list",
      name: "key",
      choices: availableKeys.map((k) => `${k}`),
    });

    tree.addNodeI(+key);
    // console.log(JSON.stringify(tree, null, 2));
    return true;
  }

  if (action === choices.DELETE) {
    const { key } = await inquirer.prompt({
      message: "Select action",
      type: "list",
      name: "key",
      choices: tree
        .storeBSTNodes(tree.getRoot(), [])
        ?.map((node) => `${node.key}`) || ["No nodes"],
    });

    if (key === "No nodes") {
      return true;
    }
    tree.removeNodeI(+key);
    // console.log(JSON.stringify(tree, null, 2));
    return true;
  }

  if (action === choices.FIND) {
    const { key } = await inquirer.prompt({
      message: "Select action",
      type: "list",
      name: "key",
      choices: tree
        .storeBSTNodes(tree.getRoot(), [])
        ?.map((node) => `${node.key}`) || ["No nodes"],
    });

    console.log(tree.findNodeI(+key));
    // console.log(JSON.stringify(tree, null, 2));
    return true;
  }
  if (action === choices.BALANCE) {
    tree.setRoot(tree.buildTree(tree.getRoot()));
    console.log(JSON.stringify(tree, null, 2));

    return true;
  }

  if (action === choices.BACK) {
    return false;
  }

  console.log("TRY AGAIN");
  return true;
};

const main = async () => {
  const tree = new BinaryTree<number>();
  while (true) {
    if (!(await userInterface(tree))) {
      return;
    }
  }
};

main();
