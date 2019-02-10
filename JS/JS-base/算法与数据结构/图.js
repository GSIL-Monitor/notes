function Dictionary() {
    let items = {};
    this.set = function (key, value) {
        items[key] = value;
    };
    // 删除
    this.remove = function (key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };
    // 判断是否存在
    this.has = function (key) {
        return items.hasOwnProperty(key);
    };
    // 获取
    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    };
    // 清空
    this.clear = function () {
        items = {};
    };
    // 字典大小
    this.size = function () {
        return Object.keys(items).length;
    };
    this.keys = function () {
        return Object.keys(items)
    };
    this.value = function () {
        let values = [];
        for (let k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };
    // each 方法，fn为操作方法
    this.each = function (fn) {
        for (let k in items) {
            if (this.has(k)) {
                fn(k, items[k]);
            }
        }
    };
    this.getItems = function () {
        return items;
    }
}

function Graph() {
    let vertices = [];// 存储所有图中的顶点名字
    let addList = new Dictionary(); // 用字典来存储链表
    // 添加顶点
    this.addVertex = function (v) {
        vertices.push(v);
        addList.set(v, []);// 顶点为键，字典值为空数组
    };
    // 添加边
    this.addEdge = function (v, w) {
        addList.get(v).push(w);// 基于有向图
        addList.get(w).push(v);// 基于无向图
    };

    this.toString = function () {
        let s = "";
        for (let i = 0; i < vertices.length; i++) {
            s += vertices[i] + ' -> ';
            let neighbors = addList.get(vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    };

    let initializeColor = function () {
        let color = [];
        for (let i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white';
        }
        return color;
    }
}

// 测试
let graph = new Graph();
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('F', 'A');
graph.addEdge('I', 'G');
graph.addEdge('E', 'I');
graph.addEdge('C', 'H');
graph.addEdge('F', 'A');
console.log(graph.toString());

