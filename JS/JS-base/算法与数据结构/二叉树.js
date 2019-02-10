// 树是一种分层数据的抽象模型。一个树的结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点。

// 二叉树中的节点最多只能有两个节点：一个是左侧子节点，另一个是右侧子节点。二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大（或者等于）的值。

function BinarySearchTree() {
    // 构建数据结构类
    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    let root = null;//根节点

    let insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode)
            }
        }
    }

    // 插入新的值
    this.insert = function (key) {
        let newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    };

    this.getRoot = function () {
        return root;
    };

    this.search = function (key) {
        return searchNode(root, key)
    }
    let searchNode = function (node, key) {
        if (node === null) {
            return false;
        }
        if (key < node.key) {
            return search(node.left, key);
        } else if (key > node.key) {
            return searchNode(node.right, key);
        } else {
            return true;
        }
    };
    // 找最小键
    this.min = function () {
        return minNode(root);
    };
    let minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    };
    // 找最大键
    this.max = function () {
        return maxNode(root);
    };
    let maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    };

    this.remove = function (ele) {
        root = removeNode(root, ele);
    }
    let removeNode = function (node, ele) {
        if (node === null) {
            return null;
        }
        if (ele < node.key) {
            node.left = removeNode(node.left, ele);
            return node;
        } else if (ele > node.key) {
            node.right = removeNode(node.right, ele);
            return node;
        } else { // 找到要删除的节点之后的三种操作
            // 此节点没有左右子节点
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // 存在单一子节点
            if (node.left === null) {
                // 左节点为空
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            // 移除存在两个子节点的情况
            let aux = findMinNode(node.right);//找到右边子树的最小节点
            node.key = aux.key;//改变节点的键，更新节点的值
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    }
    // 返回节点
    let findMinNode = function (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }

}

