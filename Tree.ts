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

  insert(root: Node | null, data: number) {
    if (root == null) {
      root = new Node(data);
      return root;
    } else {
      if (data < (root.data as number))
        root.left = this.insert(root.left, data);
      else root.right = this.insert(root.right, data);
    }
    return root;
  }

  delete(root: Node | null, data: number): Node | null {
    if (!root) {
      return root;
    } else if (data > (root.data as number)) {
      root.right = this.delete(root.right, data) as Node;
      return root;
    } else if (data < (root.data as number)) {
      root.left = this.delete(root.left, data) as Node;
      return root;
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      let tempNode = root.right;
      while (tempNode.left) {
        tempNode = tempNode.left;
      }
      root.data = tempNode.data as number;
      root.right = this.delete(root.right, tempNode.data as number) as Node;
      return root;
    }
  }

  find(root: Node | null, data: number): Node | null {
    if (!root) return null;
    else if (root.data === data) return root;
    else if (data < (root.data as number)) return this.find(root.left, data);
    else return this.find(root.right, data);
  }

  levelOrder(root: Node, callback?: (node: Node) => Node) {
    if (root == null) return 0;
    let arr: Node[] = [],
      valueArr: Number[] = [];
    arr.push(root);
    while (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        let node = arr.shift();
        if (callback) callback(<Node>node);
        valueArr.push(<Number>node?._data);
        if (node?.left) arr.push(node.left);
        if (node?.right) arr.push(node.right);
      }
    }
    return valueArr;
  }

  height(root: Node | null): number {
    if (root == null) return 0;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.delete(tree.root, 6345);

tree.prettyPrint(tree.root);
console.log(
  tree.levelOrder(tree.root, (node) => {
    node.data = <number>node.data + 10;
    return node;
  })
);
