// 最大堆调整
function maxHeapfiy(array,i,heapSize) {
    let left=2*i+1,right=2*i+2,mid=i;
    if (left<heapSize&&array[left]>array[mid]){
        mid=left;
    }
    if (right < heapSize && array[right] > array[mid]) {
        mid=right;
    }
    if (mid !== i) {
        [array[i],array[mid]]=[array[mid],array[i]];
        maxHeapfiy(array,mid,heapSize);
    }
}
// 构建最大堆
const buildMaxHeap=(array,heapSize)=>{
    let parent=Math.floor(heapSize/2)
    for (parent; parent >= 0; parent--) {
        maxHeapfiy(array,parent,heapSize);
    }
}
// 堆排序
let arr=[1,5,6,8,2,3,6,12,4,5,7,8];
let heapSize=arr.length;
buildMaxHeap(arr,heapSize);
for (let i = heapSize - 1; i >= 0; i--) {
    [arr[0],arr[i]]=[arr[i],arr[0]];
    maxHeapfiy(arr,0,i);
}
console.log(arr);
