export class Node<T> {
  private _key: T;
  private _left: Node<T> | null;
  private _right: Node<T> | null;

  constructor(key: T) {
    this._key = key;
    this._left = null;
    this._right = null;
  }

  get key(): T {
    return this._key;
  }

  get left(): Node<T> | null {
    return this._left;
  }

  get right(): Node<T> | null {
    return this._right;
  }

  set key(key: T) {
    this._key = key;
  }

  set left(child: Node<T> | null) {
    this._left = child;
  }

  set right(child: Node<T> | null) {
    this._right = child;
  }
}
