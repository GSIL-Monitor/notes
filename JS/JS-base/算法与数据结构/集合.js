function Set() {
    let items = {};
    // 判断某个值是否在集合里
    this.has = function (value) {
        return items.hasOwnProperty(value);
    };
    // 向集合中添加新的一项
    this.add = function (value) {
        // 首先检测集合中是否存在此项
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    };
    // 从集合中移除某个值
    this.remove = function (value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };
    // 清空集合
    this.clear = function () {
        items = {};
    };
    // 查看集合的个数
    this.size = function () {
        let count = 0;
        for (let prop in items) {
            if (items.hasOwnProperty(prop)) {
                ++count;
            }
        }
        return count;
    };
    // 遍历集合所有值组成的数组
    this.values = function () {
        let keys = [];
        for (let key in items) {
            keys.push(key);
        }
        return keys;
    };
    // 获取集合
    this.getItems = function () {
        return items;
    };
    // 并集
    this.union = function (otherSet) {
        // 利用Set集合：不允许重复。可求并集
        let unionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    };
    // 交集
    this.intersection = function (otherSet) {
        let intersectionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            // 两个集合的相同点
            if (otherSet.hasOwnProperty(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    };
    // 差集
    this.difference = function (otherSet) {
        let differenceSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    };
    // 子集
    this.subset = function (otherSet) {
        // 子集的个数必须要小于父集
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    // 子集中有一个元素是父集没有的都会返回false
                    return false;
                }
            }
            return true;
        }
    }


}





