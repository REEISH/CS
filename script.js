
function fib(n) {
    if (n === 0 || n == 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

function fibIter(n) {
    let A = [];
    A.push(1);
    A.push(1);
    let end = 1;
    for (let i = 1; i < n; i++) {
        A.push(A[end] + A[end - 1]);
        end++;
    }
    console.log(A);
}

function merge(A, start, mid, end) {
    let i = start, j = mid + 1;
    let B = []
    for (let it = start; it <= end; it++) {
        if (i <= mid && j <= end) {
            if (A[i] < A[j]) {
                B.push(A[i]);
                i++;
            }
            else {
                B.push(A[j]);
                j++;
            }
        }
        else if (i == mid + 1) {
            B.push(A[j]);
            j++;
        }
        else if (j == end + 1) {
            B.push(A[i]);
            i++;
        }
    }
    for (let it = start; it <= end; it++)
        A[it] = B[it - start];
}

function mergeSort(A, start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        mergeSort(A, start, mid);
        mergeSort(A, mid + 1, end);
        merge(A, start, mid, end);
    }
    return A;
}

// let A = []
// for (let i = 1; i <= 100; i++)
//     A.push(Math.floor(Math.random() * 1000));
// console.log(A);
// console.log(mergeSort(A, 0, 99));

function LinkedList() {
    if (!new.target) {
        console.log("ERROR");
        return;
    }
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.append = (value) => {
        let node = new Node(value);
        if (this.tail)
            (this.tail).next = node;
        node.prev = this.tail;
        this.tail = node;
        if (!this.head)
            this.head = node;
        this.size++;
    }

    this.prepend = (value) => {
        let node = new Node(value);
        if (this.head)
            (this.head).prev = node;
        node.next = this.head;
        this.head = node;
        if (!this.tail)
            this.tail = node;
        this.size++;
    }

    this.at = (index) => {
        if (index > this.size || index <= 0) {
            console.log("ERROR");
            return;
        }
        let node = this.head;
        index--;
        while (index) {
            node = node.next;
            index--;
        }
        return node;
    }

    this.pop = () => {
        if (this.tail)
            this.tail = (this.tail).prev;
        if (!this.size--)
            this.head = null;
        if (this.tail)
            this.tail.next = null;

    }

    this.contains = (value) => {
        let node = this.head;
        while (node) {
            if (node.value == value) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    this.find = (value) => {
        let node = this.head;
        let index = 1;
        while (node) {
            if (node.value == value) {
                return index;
            }
            node = node.next;
            index++;
        }
        return null;
    }

    this.findKey = (key) => {
        let node = this.head;
        let index = 1;
        while (node) {
            if (node.key == key) {
                return index;
            }
            node = node.next;
            index++;
        }
        return null;
    }

    this.toString = () => {
        let S = "";
        let node = this.head;
        while (node) {
            S += "(";
            S = S + (node.value).toString();
            S += ")->";
            node = node.next;
        }
        S += "null";
        return S;
    }

    this.insertAt = (value, index) => {
        if (index > this.size || index <= 0) {
            console.log("ERROR");
            return;
        }
        let node = this.head;
        index--;
        while (index) {
            node = node.next;
            index--;
        }
        let x = new Node(value);
        x.next = node;
        x.prev = node.prev;
        if (node.prev)
            (node.prev).next = x;
        node.prev = x;
        this.size++;
    }

    this.removeAt = (index) => {
        if (this.size < index || index <= 0 || index == NaN) {
            console.log("ERROR");
            return;
        }
        let node = this.head;
        index--;
        while (index) {
            node = node.next;
            index--;
        }
        if (node.prev)
            (node.prev).next = node.next;
        else
            this.head = node.next;
        if (node.next)
            (node.next).prev = node.prev;
        else
            this.tail = node.prev;
        this.size--;
    }

}

function Node(value) {
    if (!new.target) {
        console.log("ERROR");
        return;
    }
    this.value = value;
    this.next = null;
    this.prev = null;
    this.key = null;
    this.setKey = (key) => {
        this.key = key;
    }
    this.updateVal = (value) => {
        this.value = value;
    }
}

// const list = new LinkedList();
// list.append(1);
// list.append(2);
// list.append(3);
// list.prepend(0);
// console.log(list.toString());
// console.log(list.at(2));
// list.append(4);
// list.append(5);
// list.pop();
// console.log(list.contains(3));
// console.log(list.contains(-1));
// console.log(list.find(2));
// list.insertAt(7, 2);
// console.log(list.toString());
// console.log(list);
// list.removeAt(2);
// console.log(list.toString());

function HashMap() {
    this.loadfactor = 0.75;
    this.capacity = 16;
    this.occupied = 0;
    let MAP = [];
    MAP.length = this.capacity;
    this.hash = (key) => {
        let hashCode = 0;
        const primeNumber = 13;
        for (let i = 0; i < key.length; i++)
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
        return hashCode;
    }

    this.set = (key, value) => {
        let X = this.hash(key) % MAP.length;
        //console.log(X);
        if (MAP[X] == undefined) {
            MAP[X] = new LinkedList();
            MAP[X].append(value);
            MAP[X].head.setKey(key);
            //console.log(value);
            this.occupied++;
        }
        else {
            let h = MAP[X].head;
            let done = false;
            while (h) {
                if (h.key == key) {
                    h.updateVal(value);
                    done = true;
                    break;
                }
                h = h.next;
            }
            if (!done) {
                MAP[X].append(value);
                MAP[X].tail.setKey(key);
            }
            // console.log(value);
            // console.log("FOUND");
        }
        if (this.occupied > this.loadfactor * this.capacity) {
            this.capacity *= 2;
            MAP.length = this.capacity;
        }
    }

    this.get = (key) => {
        let X = this.hash(key);
        let tempCapacity = 16;
        for (tempCapacity = 16; tempCapacity <= this.capacity; tempCapacity *= 2) {

            if (MAP[X % tempCapacity] == undefined) {
                return null;
            }
            else {
                let h = MAP[X % tempCapacity].head;
                //console.log(X % tempCapacity);
                while (h != null) {
                    if (h.key == key) {
                        // console.log(h.value);
                        return h.value;
                    }
                    h = h.next;
                }
                return null;
            }
        }
        return null;
    }

    this.has = (key) => {
        if (this.get(key) === null)
            return false;
        else
            return true;
    }

    this.remove = (key) => {
        for (let i = 0; i < this.capacity; i++) {
            if (MAP[i] != undefined) {
                // console.log(i, "index");
                // console.log(MAP[i].findKey(key));
                while (MAP[i].findKey(key) != null) {
                    // console.log(MAP[i].findKey(key));
                    MAP[i].removeAt(MAP[i].findKey(key));
                }
            }
        }
    }

    this.size = () => {
        let result = 0;
        for (let i = 0; i < this.capacity; i++)
            if (MAP[i] != undefined)
                result += MAP[i].size;
        return result;
    }

    this.clear = () => {
        for (let i = 0; i < this.capacity; i++)
            MAP[i] = undefined;
    }

    this.keys = () => {
        result = [];
        for (let i = 0; i < this.capacity; i++) {
            if (MAP[i] != undefined) {
                let it = MAP[i].head;
                while (it != null) {
                    result.push(it.key);
                    it = it.next;
                }
            }
        }
        return result;
    }

    this.values = () => {
        result = [];
        for (let i = 0; i < this.capacity; i++) {
            if (MAP[i] != undefined) {
                let it = MAP[i].head;
                while (it != null) {
                    result.push(it.value);
                    it = it.next;
                }
            }
        }
        return result;
    }

    this.entries = () => {
        result = [];
        for (let i = 0; i < this.capacity; i++) {
            if (MAP[i] != undefined) {
                //console.log(i);
                let it = MAP[i].head;
                while (it != null) {
                    // console.log(it.key, it.value);
                    result.push([it.key, it.value]);
                    it = it.next;
                }
            }
        }
        return result;
    }
}

// const hashMap = new HashMap();
// hashMap.set("girl", 2);
// hashMap.set("AVNI", 5);
// console.log(hashMap.entries());
// console.log(hashMap.keys());
// console.log(hashMap.values());
// console.log(hashMap.get("girl"));
// console.log(hashMap.get("Girl"));
// console.log(hashMap.has("girl"));
// console.log(hashMap.has("Girl"));
// hashMap.remove("girl");
// hashMap.set("india", 100);
// hashMap.set("US", 90);
// hashMap.set("USSR", 80);
// console.log(hashMap.entries());
// hashMap.remove("AVNI");
// console.log(hashMap.entries());
// console.log(hashMap.size());
// hashMap.clear();
// console.log(hashMap.entries());

function Tree() {
    this.size = 0;
    this.root = null;

    this.height = (node) => {
        return node ? node.height : 0;
    }

    this.updateHeight = (node) => {
        if (node.leftChild != null && node.rightChild != null) {
            //console.log(2, node.value, node.rightChild);
            node.height = Math.max(this.height(node.leftChild), this.height(node.rightChild)) + 1;
        }
        else if (node.leftChild == null && node.rightChild == null) {
            //console.log(0, node.value, node.rightChild);
            node.height = 1;
        }
        else {
            //console.log(1, node.value, node.rightChild);
            node.height = (node.leftChild ? node.leftChild.height + 1 : node.rightChild.height + 1);
        }
        return node.height;
    }

    this.balanceFactor = (node) => {
        if (node.leftChild != null && node.rightChild != null)
            return this.height(node.leftChild) - this.height(node.rightChild);
        else if (node.leftChild == null && node.rightChild == null) return 0;
        else {
            return (node.leftChild ? node.leftChild.height : -node.rightChild.height);
        }
    }

    this.rotateRight = (nodeY) => {
        let nodeX = nodeY.leftChild;
        let T2 = nodeX.rightChild;

        // Perform rotation
        nodeX.rightChild = nodeY;
        nodeY.leftChild = T2;

        // Update heights
        this.updateHeight(nodeY);
        this.updateHeight(nodeX);

        return nodeX; // New root of the subtree
    }


    this.rotateLeft = (nodeX) => {
        let nodeY = nodeX.rightChild;
        let T2 = nodeY.leftChild;

        // Perform rotation
        nodeY.leftChild = nodeX;
        nodeX.rightChild = T2;

        // Update heights
        this.updateHeight(nodeX);
        this.updateHeight(nodeY);

        return nodeY; // New root of the subtree
    }

    this.balance = (node) => {
        node.height = this.updateHeight(node);
        //console.log(node);
        const balanceFactor = this.balanceFactor(node);
        //console.log(balanceFactor);
        // Left heavy
        if (balanceFactor > 1) {
            // Left-Right case
            if (node.leftChild && this.balanceFactor(node.leftChild) < 0) {
                node.leftChild = this.rotateLeft(node.leftChild);
            }
            // Left-Left case
            return this.rotateRight(node);
        }

        // Right heavy
        if (balanceFactor < -1) {
            // Right-Left case
            if (node.rightChild && this.balanceFactor(node.rightChild) > 0) {
                node.rightChild = this.rotateRight(node.rightChild);
            }
            // Right-Right case
            return this.rotateLeft(node);
        }

        return node; // No balancing needed
    }

    this.insert = (value) => {
        this.root = this.insertNode(this.root, value);
        this.size++;
    }

    this.insertNode = (node, value) => {
        // Perform standard BST insertion
        if (node == null) {
            return new TreeNode(value);
        }

        if (value < node.value) {
            node.leftChild = this.insertNode(node.leftChild, value);
        } else if (value > node.value) {
            node.rightChild = this.insertNode(node.rightChild, value);
        } else {
            // Duplicate data is not allowed in a BST
            return node;
        }
        // Rebalance the node after insertion
        return this.balance(node);
    }

    this.buildTree = (values) => {
        const newValues = [...new Set(values)].sort((a, b) => a - b);
        for (let i = 0; i < newValues.length; i++)
            this.insert(newValues[i]);
        return this.root;
    }

    this.preOrder = (node) => {
        if (node == null) return;
        console.log(node.value);
        this.inOrder(node.leftChild);
        this.inOrder(node.rightChild);
    }

    this.inOrder = (node) => {
        if (node == null) return;
        this.inOrder(node.leftChild);
        console.log(node.value);
        this.inOrder(node.rightChild);
    }

    this.postOrder = (node) => {
        if (node == null) return;
        this.postOrder(node.leftChild);
        this.postOrder(node.rightChild);
        console.log(node.value);
    }

    this.levelOrder = (node) => {
        q = []
        result = [];
        q.push(node);
        while (q.length != 0) {
            let top = q.shift();
            result.push(top);
            if (top.leftChild != null)
                q.push(top.leftChild);
            if (top.rightChild != null)
                q.push(top.rightChild);
        }
        return result;
    }

    this.find = (node, value) => {
        if (node == null) return null;
        else if (node.value == value) return node;
        else if (node.value > value) return this.find(node.leftChild, value);
        else return this.find(node.rightChild, value);
    }

    this.depth = (node, value) => {
        if (this.find(node, value) == null) return -1;
        else {
            if (node.value == value) return 0;
            else if (node.value > value) return this.depth(node.leftChild, value) + 1;
            else return this.depth(node.rightChild, value) + 1;
        }
    }

    this.delete = (value) => {
        if (this.find(this.root, value) != null) {
            this.root = this.deleteNode(this.root, value);
        }
        return this.root;
    }

    this.minNode = (node) => {
        result = node;
        while (result.leftChild != null) result = result.leftChild;
        return result;
    }

    this.deleteNode = (node, value) => {
        //console.log(node, this.root);
        if (node == null) return null;
        if (value < node.value)
            node.leftChild = this.deleteNode(node.leftChild, value);
        else if (value > node.value)
            node.rightChild = this.deleteNode(node.rightChild, value);
        else {
            if (node.leftChild == null && node.rightChild == null) {
                node = null;
            }
            else if (node.leftChild != null && node.rightChild == null) {
                node = node.leftChild;
            }
            else if (node.leftChild == null && node.rightChild != null) {
                node = node.rightChild;
            }
            else {
                minNode = this.minNode(node.rightChild);
                node.value = minNode.value;
                node.rightChild = this.deleteNode(node.rightChild, node.value);
            }
        }
        if (node == null) return null;
        node = this.balance(node);
        return node;
    }
}

function TreeNode(value) {
    if (!new.target) {
        console.log("ERROR");
        return;
    }
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.height = 1;
    this.depth = 0;
    this.leftHeight = 0;
    this.rightHeight = 0;
}

//const tree = new Tree();
//tree.insert(2);
//console.log(tree.root);
//tree.insert(3);
//console.log(tree.root, tree.root.rightChild);
//tree.insert(4);
//console.log(tree.root);
//console.log(tree.inOrder(tree.root));
//console.log(tree.root);
//console.log(tree.find(tree.root, 2));
//tree.insert(5);
//tree.insert(6);
//console.log(tree.root);
//tree.insert(7);
//console.log(tree.root);
//console.log(tree.levelOrder(tree.root));
//console.log(tree.depth(tree.root, 3));
//console.log(tree.root);
//tree.delete(2);
//console.log(tree.root);
//tree.delete(6);
//console.log(tree.root);
//tree.delete(5);
//console.log(tree.root);
//console.log(tree.inOrder(tree.root));

function KnightDance() {
    this.start = [0, 0];
    this.end = [7, 7];
    this.isLegal = (x, y) => {
        if ((x >= 0 && x <= 7) && (y >= 0 && y <= 7)) return true;
        return false;

    }

    this.nextLegal = (point) => {
        array = [[point[0] + 1, point[1] + 2], [point[0] + 2, point[1] + 1], [point[0] - 1, point[1] - 2], [point[0] - 2, point[1] - 1], [point[0] + 2, point[1] - 1], [point[0] + 1, point[1] - 2], [point[0] - 1, point[1] + 2], [point[0] - 2, point[1] + 1]];
        let newArray = array.filter(function (X) {
            if ((X[0] >= 0 && X[0] <= 7) && (X[1] >= 0 && X[1] <= 7)) return true;
            return false;
        });
        return newArray;
    }

    this.grid = [];
    for (let i = 0; i <= 7; i++) {
        this.grid.push(new Array(8));
        for (let j = 0; j <= 7; j++)
            this.grid[i][j] = 50;
    }

    this.doBFS = (start) => {
        this.grid[start[0]][start[1]] = 0;
        let q = [start];
        while (q.length > 0) {
            let P = q.shift();
            let neighbours = this.nextLegal(P);
            for (let i = 0; i < neighbours.length; i++) {
                if (this.grid[neighbours[i][0]][neighbours[i][1]] == 50) {
                    q.push(neighbours[i]);
                    this.grid[neighbours[i][0]][neighbours[i][1]] = this.grid[P[0]][P[1]] + 1;
                }
                else {
                    this.grid[neighbours[i][0]][neighbours[i][1]] = Math.min(this.grid[P[0]][P[1]] + 1, this.grid[neighbours[i][0]][neighbours[i][1]]);
                }
            }
        }
    }

    this.getRoute = (end) => {
        let result = [end];
        let current = end;
        let D = this.grid[end[0]][end[1]];
        let it = 0;
        console.log(this.grid);
        while (D) {
            it++;
            let neighbours = this.nextLegal(current);
            console.log(D, current, neighbours);
            for (let i = 0; i < neighbours.length; i++) {
                if (this.grid[neighbours[i][0]][neighbours[i][1]] == D - 1) {
                    current = neighbours[i];
                    result.push(current);
                    D--;
                    break;
                }
            }
            if (it > 1000) break;
        }
        return result;
    }

    this.knightMoves = (start, end) => {
        // this.gridInit();
        this.doBFS(start);
        return this.getRoute(end);
    }

}

//const Knight = new KnightDance();
//console.log(Knight.knightMoves([0, 0], [7, 7]));