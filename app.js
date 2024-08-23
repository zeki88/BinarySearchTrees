function node (data, left, right) {
    return {data, left, right}
}

function tree (array) {

    let root = buildTree(array);
    let cache = []; //guarda arrays de las funciones levelOrder, preOrder, postOrder y inOrder

    function insert (value, temp = root) {
        if (value < temp.data) {
            if (temp.left !== null) {
                temp = temp.left;
                insert(value, temp);
                return;
            } else {
                temp.left = node(value, null, null);
            } 
        } else if (value > temp.data) {
            if (temp.right !== null) {
                temp = temp.right;
                insert(value, temp);
                return;
            } else {
                temp.right = node(value, null, null);
            }
        } else {
            console.log('value already exists')
            return;
        }
        temp = root;
        return value;
    }


    function deleteItem (value, temp = root, previous = null) {
        if (value < temp.data) {
            deleteItem(value, temp.left, temp);
        } else if (value > temp.data) {
            deleteItem(value, temp.right, temp);
        } else if (value === temp.data) {
            if (temp.left === null && temp.right === null) {
                if (previous.left === temp) {
                    previous.left = null;
                } else if (previous.right === temp) {
                    previous.right = null;
                }
                temp = null;
                return temp;
            } else if (temp.left === null && temp.right !== null) {
                temp.data > previous.data ? previous.right = temp.right : previous.left = temp.right;
                temp = null;
                console.log('value deleted');
                return temp;
            } else if (temp.left !== null && temp.right === null) {
                temp.data > previous.data ? previous.right = temp.left : previous.left = temp.left;
                temp = null;
                console.log('value deleted');
                return temp;
            } else if (temp.left !== null && temp.right !== null) {
                const minValue = min(temp.right);
                deleteItem(minValue.data, temp.right, temp);
                temp.data = minValue.data;
            return temp;  
            }
    }
}

    function  min (node) {
        if (node.left !== null) return min(node.left);
        return node;
    }
    function find (value, temp = root) {
        if (value === temp.data) {
            return temp;
        } 
        if (value < temp.data) {
        if (temp.left !== null && temp.left.data === value) {
                return temp.left;
            } else if (temp.left !== null) {
                temp = temp.left;
                return find(value, temp);
            } else {
                console.log('value not found');
                return null;
            }
        } 
        if (value > temp.data) {
            if (temp.right !== null && temp.right.data === value) {
                return temp.right;
            } else if (temp.right !== null) {
                temp = temp.right;
                return find(value, temp);
            } else {
                console.log('value not found');
                return null;
            }
        };
    }  

    function levelOrder (callback) {

        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }

        if (root === null) return;

        const levelOrderList = [];

        const queue = [root];

        while (queue.length !== 0) {
            const currentNode = queue.shift();
            
            if (callback) {
                levelOrderList.push(callback(currentNode));
            }

            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return levelOrderList;
    }

    function inOrdering (node) {
    if (node === null) return;
    inOrdering(node.left);
    cache.push(node.data);
    inOrdering(node.right);
    return cache;
    }

    function inOrder (node = root) {
        const levelOrderList = inOrdering(node);
        cache = [];
    return levelOrderList;
    }




    function preOrdering (node) {  
        if (node === null) return;
        cache.push(node.data);
        preOrdering(node.left);
        preOrdering(node.right);
        return cache;
    }

    function preOrder (node = root) {
        const levelOrderList = preOrdering(node);
        cache = [];
    return levelOrderList;
    }

    function postOrdering (node) {
        if (node === null) return;
        postOrdering(node.left);
        postOrdering(node.right);
        cache.push(node.data);
        return cache;
    }

    function postOrder (node = root) { 
        const levelOrderList = postOrdering(node);
        cache = [];
    return levelOrderList;
    }


    function height (node = root) {
        if (node === null) {
            return -1;
        }

        return 1 + Math.max(height(node.left), height(node.right)); //se ejecuta de forma recursiva y va sumando 1 a cada llamada
    }

    function depth (node) {
        if (node === null || node === undefined) {
            return 'not found';
        }

        return Math.max(height(root.left), height(root.right)) - Math.max(height(node.left), height(node.right));
    }

    function isBalanced () {

        return height(root.left) - height(root.right) <= 1 && height(root.left) - height(root.right) >= -1;
    }

    function rebalance () {
        if (!isBalanced()) {
            root = buildTree(inOrder());
        }
    }

    function print () {
        return prettyPrint(root)
    }

        return {
            insert,
            deleteItem,
            find,
            levelOrder,
            inOrder,
            preOrder,
            postOrder,
            height,
            depth,
            isBalanced,
            rebalance,
            print
        };
}

function buildTree (array) {
    array.sort((a, b) => a - b)

    array.forEach((element) => {
        if (element === array[array.indexOf(element) + 1]) {
            array.splice(array.indexOf(element), 1);
            return array;
        }
    });
    
    function build (array, start, end) {
        if (start > end) {
            return null
        }
        
        let mid = parseInt((start + end) / 2)
        let newNode = node(array[mid], build(array, start, mid - 1), build(array, mid + 1, end))
        return newNode
    }

    let root = build(array, 0, array.length - 1)
    
    return root
}

function sort (array) {
    array.sort((a, b) => a - b)
    array.forEach((element) => {
        if (element === array[array.indexOf(element) + 1]) {
            array.splice(array.indexOf(element), 1);
            return array;
        }
    });

    return array
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function createRandomArray () {    
    let n = (Math.floor(Math.random() * 10)) + 5;
    let array = [];
    for (let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array
}

function main () {
    //const array = createRandomArray();
    const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    const newTree = tree(array);

    console.log ('isBalanced: ',newTree.isBalanced());
    console.log ('levelOrder: ',newTree.levelOrder(node => node.data));
    console.log('preOrder: ',newTree.preOrder());
    console.log('postOrder: ',newTree.postOrder());
    console.log('inOrder: ',newTree.inOrder());
    newTree.print();

    console.log('inserting values...');
    newTree.insert(120);
    newTree.insert(130);
    newTree.insert(140);
    newTree.insert(150);
    newTree.insert(160);
    newTree.insert(170);
    newTree.insert(180);
    newTree.insert(190);
    newTree.insert(200);
    newTree.insert(210);
    newTree.insert(220);
    newTree.insert(230);
    newTree.insert(240);
    newTree.insert(250);
    newTree.insert(260);
    newTree.insert(270);
    newTree.insert(280);
    newTree.insert(290);
    newTree.insert(300);
    newTree.insert(310);
    newTree.print();

    console.log ('isBalanced: ',newTree.isBalanced());
    newTree.rebalance();
    newTree.print();
    console.log ('isBalanced: ',newTree.isBalanced());
    console.log ('levelOrder: ',newTree.levelOrder(node => node.data));
    console.log('preOrder: ',newTree.preOrder());
    console.log('postOrder: ',newTree.postOrder());
    console.log('inOrder: ',newTree.inOrder());
    newTree.deleteItem(170);
    newTree.deleteItem(1);
    newTree.print();
    newTree.print();
    newTree.insert(4.5);
    newTree.insert(4.4);
    newTree.insert(4.3);
    newTree.print();
newTree.deleteItem(4);
    newTree.print();
    console.log(newTree.find(4.5));
}

main();