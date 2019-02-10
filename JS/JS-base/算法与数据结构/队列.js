// 队列从尾部添加新元素，并从顶部移除元素，最新添加的元素必须排列在队列的末尾。
function Queue() {
    let items = [];
    // 向队列尾部添加元素
    this.enqueue = function (element) {
        items.push(element);
    };
    // 移除队列的第一个元素
    this.dequeue = function () {
        return items.shift();
    };
    // 获取队首元素，不修改队列
    this.front = function () {
        return items[0];
    };
    // 获取队尾元素，不修改队列
    this.end = function () {
        return items[items.length - 1];
    };
    // 查看队列是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    // 清空队列
    this.clear = function () {
        items = [];
    };
    this.size = function () {
        return items.length;
    };
    this.print = function () {
        console.log(items.toString());
    };
}

// 优先队列
function PriorityQueue() {
    let items = [];

    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    // 向队尾添加元素
    this.enqueue = function (element, priority) {
        let queueElement = new QueueElement(element, priority);
        // 如果为空，不论优先级，直接添加进去
        if (this.isEmpty()) {
            items.push(queueElement);
        } else {
            let added = false;
            for (let i = 0; i < items.length; i++) {
                // 如果优先级小于当前位置 i
                if (queueElement.priority < items[i].priority) {
                    // 将其插入到当前位置 i 之后
                    items.splice(i, 0, queueElement);
                    // 并且设置added 为 true,表示成功插入一个元素
                    added = true;
                    break;
                }
            }
        }
        if (!added) {
            items.push(queueElement);
        }
    };
    this.dequeue = function () {
        return items.shift();
    };
    this.front = function () {
        return items[0];
    };
    this.isEmpty = function () {
        return items.length === 0;
    };
    this.size = function () {
        return items.length;
    };
    this.print = function () {
        for (let i = 0; i < items.length; i++) {
            console.log(items[i].element + ' - ' + items[i].priority);
        }
    };

}

// 循环队列，击鼓传花
function hotPotato(nameList, num) {
    let queue = new Queue();
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }
    let eliminated = "";
    // 剩下最后一个不移除
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
            // 第1个循环：c d e a b  切掉c
            // 第2个循环：b d e a  切掉 b
            // 第3个循环：e a d   切掉e
            // 第4个循环：d a   切掉d
        }
        eliminated = queue.dequeue();
        console.log(eliminated + "在游戏中淘汰了！");
    }
    return queue.dequeue();
}

let names = ["a", "b", "c", "d", "e"];
let winner = hotPotato(names, 7);
console.log("胜利者是：" + winner);









