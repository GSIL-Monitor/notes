/*
字典存储的是[键，值]对，其中键名是用来查询特定元素的。字典和集合很相似，集合以[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素。字典也称映射。
 */
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


