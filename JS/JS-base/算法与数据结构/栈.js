// 新元素都靠近栈顶，旧元素都靠近栈底。
function Stack() {
    var items = [];
    // 入栈
    this.push = function (element) {
        items.push(element);
    };
    // 出栈
    this.pop = function () {
        return items.pop();
    };
    // 返回栈顶元素，与出栈类似，但是不对栈做任何修改
    this.peek = function () {
        return items[items.length - 1];
    };
    // 查看栈是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    // 返回栈里的元素个数
    this.size = function () {
        return items.length;
    };
    // 清空栈
    this.clear = function () {
        items = [];
    };
    // 打印
    this.print = function () {
        console.log(items.toString());
    };
    this.toString = function () {
        return items.toString();
    }
}

// 10->2 进制转换
/**
 *
 * @param decNum 初始数据
 * @param base 待转化进制
 * @returns {string}
 */
function divideByBase(decNum, base) {
    var remStack = new Stack(), rem, baseString = "", digits = "0123456789ABCDEF";
    while (decNum > 0) {
        rem = Math.floor(decNum % base);
        remStack.push(rem);
        decNum = Math.floor(decNum / base);
    }
    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }
    return baseString;
}

console.log(divideByBase(99, 8));


