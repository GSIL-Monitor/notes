## 冒泡排序

冒泡排序需要两个嵌套的循环. 其中, `外层循环`移动游标; `内层循环`遍历游标及之后(或之前)的元素, 通过两两交换的方式, 每次只确保该内循环结束位置排序正确, 然后`内层循环`周期结束, 交由`外层循环`往后(或前)移动游标, 随即开始下一轮`内层循环`, 以此类推, 直至循环结束.

**Tips**: 由于冒泡排序只在相邻元素大小不符合要求时才调换他们的位置, 它并不改变相同元素之间的相对顺序, 因此它是稳定的排序算法.

![](E:\WebStorm_Dir\articles\images\bubbleSort.gif)

由于有两层循环, 因此可以有四种实现方式.

| 方案 | 外层循环 | 内层循环 |
| ---- | -------- | -------- |
| 1    | 正序     | 正序     |
| 2    | 正序     | 逆序     |
| 3    | 逆序     | 正序     |
| 4    | 逆序     | 逆序     |

下列是四种情况：

```JavaScript
/* 冒泡排序 */

// 将交换功能抽取出来
function swap(i, j, array) {
    let temp=array[i];
    array[i]=array[j];
    array[j]=temp;
}
// 内外层均为正序遍历，靠后的元素位置先确定
function bubbleSort1(array) {
    let len=array.length;
    for (let i = 0; i < len; i++) {
        for (let j=0;j<len-1-i;j++){
            if (array[j] > array[j + 1]) {// 增序排列
                swap(j,j+1,array);
            }
        }
    }
    return array;
}
// 内层逆序，外层正序，靠前的元素位置先确定
function bubbleSort2(array) {
    let len=array.length;
    for (let i = 0; i < len; i++) {
        for (let j=len-1;j>i;j--){
            if (array[j] < array[j - 1]) {// 增序排列
                swap(j,j-1,array);
            }
        }
    }
    return array;
}
// 外循环逆序排列，内循环正序排列
function bubbleSort3(array){
    let len=array.length;
    for (let i = len - 1; i > 0; i--) {//逆序
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {//正序
                swap(j,j+1,array);
            }
        }
    }
    return array;
}

// 内部外部均为逆序排列
function bubbleSort4(array){
    let len=array.length;
    for (let i = len - 1; i > 0; i--) {
        for (let j = len - 1; j > len - 1 - i; j--) {
            if (array[j]<array[j-1]){
                swap(j,j-1,array);
            }
        }
    }
    return array;
}

let arr=[3,7,4,9,1,0,5,8,2,45,123,54,34,11];
console.time("1");
console.log(bubbleSort1(arr));
console.timeEnd("1");
console.time("2");
console.log(bubbleSort2(arr));
console.timeEnd("2");
console.time("3");
console.log(bubbleSort3(arr));
console.timeEnd("3");
console.time("4");
console.log(bubbleSort4(arr));
console.timeEnd("4");
```

根据内循环的正序还是逆序可以判断元素是靠前显示还是靠后显示。

以下是其算法复杂度:

| 平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 |
| -------------- | -------- | -------- | ---------- |
| O(n²)          | O(n)     | O(n²)    | O(1)       |

冒泡排序是最容易实现的排序, 最坏的情况是每次都需要交换, 共需遍历并交换将近n²/2次, 时间复杂度为O(n²). 最佳的情况是内循环遍历一次后发现排序是对的, 因此退出循环, 时间复杂度为O(n). 平均来讲, 时间复杂度为O(n²). 由于冒泡排序中只有缓存的temp变量需要内存空间, 因此空间复杂度为常量O(1).

------

## 双向冒泡排序

双向冒泡排序是冒泡排序的一个简易升级版, 又称鸡尾酒排序. 冒泡排序是从低到高(或者从高到低)单向排序, 双向冒泡排序顾名思义就是从两个方向分别排序(通常, 先从低到高, 然后从高到低). 因此它比冒泡排序性能稍好一些.

```JavaScript
/* 双向冒泡排序 */

// 将交换功能抽取出来
function swap(i, j, array) {
    let temp=array[i];
    array[i]=array[j];
    array[j]=temp;
}


function bothBubbleSort(array) {
    let tail=arr.length-1,i;
    for (i=0;i<tail;tail--){
        for (let j=tail;j>i;j--){
            if (array[j - 1] > array[j]) {//将最小的靠前显示
                swap(j,j-1,array);
            }
        }
        i++;
        for (let j = i; j < tail; j++) {
            if (array[j] > array[j + 1]) {//将最大的靠后显示
                swap(j,j+1,array);
            }
        }
    }
    return array;
}
let arr=[3,7,4,9,1,0,5,8,2,45,123,54,34,11];

console.log(bothBubbleSort(arr));

```

------

## 选择排序

从算法逻辑上看, 选择排序是一种简单且直观的排序算法. 它也是两层循环. `内层循环`就像工人一样, 它是真正做事情的, `内层循环`每执行一遍, 将选出本次待排序的元素中最小(或最大)的一个, 存放在数组的起始位置. 而 `外层循环`则像老板一样, 它告诉`内层循环`你需要不停的工作, 直到工作完成(也就是全部的元素排序完成).

![](E:\WebStorm_Dir\articles\images\selectSort.gif)

**Tips**: 选择排序每次交换的元素都有可能不是相邻的, 因此它有可能打破原来值为相同的元素之间的顺序. 比如数组[2,2,1,3], 正向排序时, 第一个数字2将与数字1交换, 那么两个数字2之间的顺序将和原来的顺序不一致, **虽然它们的值相同, 但它们相对的顺序却发生了变化**. 我们将这种现象称作 `不稳定性` .

```JavaScript
/* 选择排序 */

// 将交换功能抽取出来
function swap(i, j, array) {
    let temp=array[i];
    array[i]=array[j];
    array[j]=temp;
}

// 选择最小值
function selectSort1(array) {
    let len=array.length,min;
    for (let i = 0; i < len - 1; i++) {
        min=i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[min]) {
                min=j;//始终获取最小值的坐标
            }
        }
        if (min !== i) {
            swap(i,min,array)
        }
    }
    return array;
}

// 选择最大值
function selectSort2(array) {
    let len=array.length,max;
    for (let i = len-1; i >0; i--) {
        max=i;
        for (let j = len + 1; j < len; j++) {
            if (array[j] > array[max]) {
                max=j;//始终获取最大值的坐标
            }
        }
        if (max !== i) {// 只要最大值不是当前坐标的值，就交换
            swap(i,max,array)
        }
    }
    return array;
}

let arr=[3,7,4,9,1,0,5,8,2,45,123,54,34,11];

console.log(selectSort1(arr));
console.log(selectSort2(arr));
```

以下是其算法复杂度:

| 平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 |
| -------------- | -------- | -------- | ---------- |
| O(n²)          | O(n²)    | O(n²)    | O(1)       |

选择排序的简单和直观名副其实, 这也造就了它”出了名的慢性子”, 无论是哪种情况, 哪怕原数组已排序完成, 它也将花费将近n²/2次遍历来确认一遍. 即便是这样, 它的排序结果也还是不稳定的. 唯一值得高兴的是, 它并不耗费额外的内存空间.

------



## 插入排序

插入排序的设计初衷是往有序的数组中快速插入一个新的元素. 它的算法思想是: 把要排序的数组分为了两个部分, 一部分是数组的全部元素(除去待插入的元素), 另一部分是待插入的元素; 先将第一部分排序完成, 然后再插入这个元素. 其中第一部分的排序也是通过再次拆分为两部分来进行的.

插入排序由于操作不尽相同, 可分为 `直接插入排序` , `折半插入排序`(又称二分插入排序), `链表插入排序` , `希尔排序` .

### 直接插入排序

它的基本思想是: 将待排序的元素按照大小顺序, 依次插入到一个已经排好序的数组之中, 直到所有的元素都插入进去.

![](E:\WebStorm_Dir\articles\images\insertSort1.gif)

就是将前面的几个先排序：

如前两个排好序，第三个看情况插入在合适的位置，前三个排好序了，第四个拿过来放在合适的位置，实现四个数的排序....

**Tips**: 由于直接插入排序每次只移动一个元素的位置, 并不会改变值相同的元素之间的排序, 因此它是一种稳定排序.

```javascript
// 直接插入排序
function directInsertionSort(array) {
    let len=array.length,index,current;
    for (let i = 1; i < len; i++) {
        index=i-1; // 待比较元素
        current=array[i]; // 当前元素
        while (index>=0&&array[index]>current){ // 前置条件之一：待比较元素比当前元素大
            array[index+1]=array[index];// 将待比较元素向后移一位
            index--; // 游标前移一位,如果前面的元素还大，则继续后移
        }
        if (index+1!==i){// 避免同一个元素赋值给自身
            array[index+1]=current;
            // console.log(array);
        }
    }
    return array;
}
```

### 折半插入排序

折半插入排序是直接插入排序的升级版. 鉴于插入排序第一部分为已排好序的数组, 我们不必按顺序依次寻找插入点, 只需比较它们的中间值与待插入元素的大小即可.

**Tips**: 同直接插入排序类似, 折半插入排序每次交换的是相邻的且值为不同的元素, 它并不会改变值相同的元素之间的顺序. 因此它是稳定的.

算法基本思想是:

1. 取0 ~ i-1的中间点( `m = (i-1)>>1` ), array[i] 与 array[m] 进行比较, 若array[i] < array[m] , 则说明待插入的元素array[i] 应该处于数组的 0 ~ m 索引之间; 反之, 则说明它应该处于数组的 m ~ i-1 索引之间.
2. 重复步骤1, 每次缩小一半的查找范围, 直至找到插入的位置.
3. 将数组中插入位置之后的元素全部后移一位.
4. 在指定位置插入第 i 个元素.

> `x>>1` 是位运算中的右移运算, 表示右移一位, 等同于x除以2再取整, 即 `x>>1 == Math.floor(x/2)` .
>
>

```javascript
// 折半插入排序
function binaryInsertionSort(array){
    let current,i,j,low,high,m;
    for (i = 1; i < array.length; i++) {
        low=0;
        high=i-1;
        current=array[i];
        while (low <= high) {
            m=(low+high)>>1;
            if (array[i] >= array[m]) {// 高区
                low=m+1;
            }else {// 低区
                high=m+1;
            }
        }
        for (j=i;j>low;j--){// 3.插入位置之后的元素全部后移一位
            array[j]=array[j-1];
        }
        array[low]=current; // 4.插入该元素
    }
    return array;
}
```

虽然折半插入排序明显减少了查询的次数, 但是数组元素移动的次数却没有改变. 它们的时间复杂度都是O(n²).



### 希尔排序

希尔排序也称缩小增量排序, 它是直接插入排序的另外一个升级版, 实质就是分组插入排序. 希尔排序以其设计者希尔(Donald Shell)的名字命名, 并于1959年公布.

算法的基本思想:

1. 将数组拆分为若干个子分组, 每个分组由相距一定”增量”的元素组成. 比方说将[0,1,2,3,4,5,6,7,8,9,10]的数组拆分为”增量”为5的分组, 那么子分组分别为 [0,5], [1,6], [2,7], [3,8], [4,9] 和 [5,10].
2. 然后对每个子分组应用直接插入排序.
3. 逐步减小”增量”, 重复步骤1,2.
4. 直至”增量”为1, 这是最后一个排序, 此时的排序, 也就是对全数组进行直接插入排序.

![](E:\WebStorm_Dir\articles\images\sherSort.png)

可见, 希尔排序实际上就是不断的进行直接插入排序, 分组是为了先将局部元素有序化. 因为直接插入排序在元素基本有序的状态下, 效率非常高. 而希尔排序呢, 通过先分组后排序的方式, 制造了直接插入排序高效运行的场景. 因此希尔排序效率更高.

我们试着抽象出共同点, 便不难发现上述希尔排序的第四步就是一次直接插入排序, 而希尔排序原本就是从”增量”为n开始, 直至”增量”为1, 循环应用直接插入排序的一种封装. 因此直接插入排序就可以看做是步长为1的希尔排序. 为此我们先来封装下直接插入排序.

```javascript
// 希尔排序
function shellInsertSort(array,gap){
    gap=(gap===undefined)?1:gap;
    let len=array.length,index,current;
    for (let i = gap; i < len; i++) {
        index=i-gap; // 待比较元素
        current=array[i];// 当前元素
        while (index >= 0 && array[index] > current) {
            array[index+gap]=array[index];// 待比较元素向后移gap位
            index-=gap;     // 游标向前移gap位，再进行比较
        }
        if (index + gap !== i) {
            array[index+gap]=current;
        }
    }
    return array;
}
function shellSort(array){
    let len=array.length,gap=len>>1;// 初始gap===length/2
    while (gap > 0) {
        shellInsertSort(array,gap); // 按指定步长直接插入排序
        gap=gap>>1;
    }
    return array;
}
```

对比上述直接插入排序和折半插入排序, 数组元素的移动次数由14次减少为7次. 通过拆分原数组为粒度更小的子数组, 希尔排序进一步提高了排序的效率.

不仅如此, 以上步长设置为了 {N/2, (N/2)/2, …, 1}. 该序列即[希尔增量](http://baike.baidu.com/view/10729635.htm), 其它的增量序列 还有Hibbard：{1, 3, …, 2^k-1}. 通过合理调节步长, 还能进一步提升排序效率. 实际上已知的最好步长序列是由Sedgewick提出的(1, 5, 19, 41, 109,…). 该序列中的项或者是9*4^i - 9*2^i + 1或者是4^i - 3*2^i + 1. 

> **Tips**: 我们知道, 单次直接插入排序是稳定的, 它不会改变相同元素之间的相对顺序, 但在多次不同的插入排序过程中, 相同的元素可能在各自的插入排序中移动, 可能导致相同元素相对顺序发生变化. 因此, 希尔排序并不稳定.



## 归并排序



## 快速排序



## 堆排序



## 计数排序



## 桶排序



## 基数排序