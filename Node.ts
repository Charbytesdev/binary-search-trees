export default class Node {
  _data: number | null;
  _left: Node | null;
  _right: Node | null;

  constructor(
    data: number | null = null,
    left: Node | null = null,
    right: Node | null = null
  ) {
    this._data = data;
    this._left = left;
    this._right = right;
  }

  public get data(): number | null {
    return this._data;
  }

  public set data(data: number) {
    this._data = data;
  }

  public get left(): Node | null {
    return this._left;
  }

  public set left(left: Node) {
    this._left = left;
  }

  public get right(): Node | null {
    return this._right;
  }

  public set right(right: Node) {
    this._right = right;
  }
}
