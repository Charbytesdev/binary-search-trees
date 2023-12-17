import Node from "./Node";

class Tree {
  _root: Node;

  constructor(array: number[]) {
    array = array
      .sort((n1, n2) => n1 - n2)
      .filter((value, index) => array.indexOf(value) === index);
    this._root = this.buildTree(array) as Node;
  }

  get root() {
    return this._root;
  }

  buildTree(array: number[]): Node | null {
    if (array.length === 0) return null;
    const midIndex = Math.floor(array.length / 2);
    const midData = array[midIndex];
    const root = new Node(midData);
    root.left = this.buildTree(array.slice(0, midIndex)) as Node;
    root.right = this.buildTree(array.slice(midIndex + 1)) as Node;
    return root;
  }

  prettyPrint(node: Node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

// const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// console.log(tree.prettyPrint(tree.root));
