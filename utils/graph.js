class MinHeap {
    constructor() {
    this.heap = [];
    }
   
    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }
   
    swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
 
    enqueue(element) {
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
    }
   
    heapifyUp(index) {
    while (index > 0 && this.heap[index].priority < this.heap[this.parent(index)].priority) {
    this.swap(index, this.parent(index));
    index = this.parent(index);
    }
    }

    dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
   
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
   
    return min;
    }
  
    heapifyDown(index) {
    let smallest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);
   
    if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) {
    smallest = left;
    }
    if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) {
    smallest = right;
    }
    if (smallest !== index) {
    this.swap(index, smallest);
    this.heapifyDown(smallest);
    }
    }
   
    
    isEmpty() {
    return this.heap.length === 0;
    }
}
   
export class Graph {
    constructor(banks, links) {
    console.log("Building graph...");
    this.banks = new Map();
    this.adjList = new Map();
   
    // Initialize banks
    banks.forEach(({ bic, charge }) => {
    this.banks.set(bic, charge);
    this.adjList.set(bic, []);
    });
   
    // Build adjacency list
    links.forEach(({ frombic, tobanks }) => {
    tobanks.forEach(({ tobic, timerequired }) => {
    this.adjList.get(frombic).push({ tobic, timerequired });
    this.adjList.get(tobic).push({ tobic: frombic, timerequired }); 
    });
    });
    console.log("Graph created")
    }
   
  
    findCheapestCharge(start, end) {
    let minHeap = new MinHeap();
    let costMap = new Map();
   
    // Initialize all costs to Infinity
    this.banks.forEach((_, bic) => costMap.set(bic, Infinity));
    costMap.set(start, this.banks.get(start));
   
    minHeap.enqueue({ node: start, priority: this.banks.get(start) });
   
    while (!minHeap.isEmpty()) {
    let { node, priority: cost } = minHeap.dequeue();
   
    if (node === end) return cost;
    if(!this.adjList.get(node)) return -1;
    for (let { tobic } of this.adjList.get(node)) {
    let newCost = cost + this.banks.get(tobic);
    if (newCost < costMap.get(tobic)) {
    costMap.set(tobic, newCost);
    minHeap.enqueue({ node: tobic, priority: newCost });
    }
    }
    }
   
    return -1; // No path found
    }
   
    // Dijkstra’s algorithm for least time
    findLeastTime(start, end) {
    let minHeap = new MinHeap();
    let timeMap = new Map();
   
    // Initialize all times to Infinity
    this.banks.forEach((_, bic) => timeMap.set(bic, Infinity));
    timeMap.set(start, 0);
   
    minHeap.enqueue({ node: start, priority: 0 });
   
    while (!minHeap.isEmpty()) {
    let { node, priority: timerequired } = minHeap.dequeue();
   
    if (node === end) return timerequired;
   if(!this.adjList.get(node)) return -1;
    for (let { tobic, timerequired: travelTime } of this.adjList.get(node)) {
    let newTime = timerequired + travelTime;
    if (newTime < timeMap.get(tobic)) {
    timeMap.set(tobic, newTime);
    minHeap.enqueue({ node: tobic, priority: newTime });
    }
    }
    }
   
    return -1; 
    }
}
   
   
   