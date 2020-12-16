import { Node } from "./Node";

export class BinaryTree<H> {
  private root: Node<H> | null = null;
  private route: Array<Node<H> | null> = [];

  public addNodeI(key: H): void {
    this.root = this.addNodeBy(this.root, key);
  }

  public removeNodeI(key: H): void {
    this.root = this.removeNode(this.root, key);
  }

  public findNodeI(key: H): Node<H> | null {
    this.route.push(this.root);
    const ret = this.findNode(this.root, key);
    console.log(
      "PATH",
      this.route.map((n) => n?.key)
    );
    return ret;
  }

  setRoot(root: Node<H> | null) {
    this.root = root;
  }

  getRoot(): Node<H> | null {
    return this.root;
  }

  public buildTree(node: Node<H> | null): Node<H> | null {
    const nodes: Node<H>[] = [];
    this.storeBSTNodes(node, nodes);
    const { length } = nodes;
    return this.buildTreeUtil(nodes, 0, length - 1);
  }

  private storeBSTNodes(root: Node<H> | null, nodes: Node<H>[]) {
    if (root === null) return;

    this.storeBSTNodes(root.left, nodes);
    nodes.push(root);
    this.storeBSTNodes(root.right, nodes);
  }

  private buildTreeUtil(
    nodes: Node<H>[],
    start: number,
    end: number
  ): Node<H> | null {
    if (start > end) {
      return null;
    }

    const mid = Math.round((start + end) / 2);

    const currentNode = nodes[mid];

    currentNode.left = this.buildTreeUtil(nodes, start, mid - 1);
    currentNode.right = this.buildTreeUtil(nodes, mid + 1, end);
    return currentNode;
  }

  private addNodeBy(currentNode: Node<H> | null, key: H): Node<H> {
    if (currentNode === null) {
      return new Node<H>(key);
    }
    if (key < currentNode.key) {
      currentNode.left = this.addNodeBy(currentNode.left, key);
    } else if (key > currentNode.key) {
      currentNode.right = this.addNodeBy(currentNode.right, key);
    }
    return currentNode;
  }

  private removeNode(currentNode: Node<H> | null, key: H): Node<H> | null {
    if (currentNode === null) {
      return null;
    }
    if (key === currentNode.key) {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      } else if (currentNode.left !== null && currentNode.right === null) {
        return currentNode.left;
      } else if (currentNode.left === null && currentNode.right !== null) {
        return currentNode.right;
      } else {
        let smallestKey: H = this.findSmallestKey(currentNode.right as Node<H>);
        currentNode.key = smallestKey;
        currentNode.right = this.removeNode(currentNode.right, smallestKey);
        return currentNode;
      }
    } else if (key < currentNode.key) {
      currentNode.left = this.removeNode(currentNode.left, key);
    } else if (key > currentNode.key) {
      currentNode.right = this.removeNode(currentNode.right, key);
    }
    return currentNode;
  }

  private findSmallestKey(currentNode: Node<H>): H {
    return currentNode.left === null
      ? currentNode.key
      : this.findSmallestKey(currentNode.left);
  }

  private findNode(currentNode: Node<H> | null, key: H): Node<H> | null {
    if (currentNode === null) {
      return null;
    }
    if (key === currentNode.key) {
      return currentNode;
    } else if (key < currentNode.key) {
      this.route.push(currentNode.left);
      return this.findNode(currentNode.left, key);
    } else if (key > currentNode.key) {
      this.route.push(currentNode.right);
      return this.findNode(currentNode.right, key);
    }

    return null;
  }
}
