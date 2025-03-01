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
   
   class Graph {
    constructor(banks, links) {
    this.banks = new Map();
    this.adjList = new Map();
   
    // Initialize banks
    banks.forEach(({ id, charge }) => {
    this.banks.set(id, charge);
    this.adjList.set(id, []);
    });
   
    // Build adjacency list
    links.forEach(({ srcbid, tobanks }) => {
    tobanks.forEach(({ destbid, time }) => {
    this.adjList.get(srcbid).push({ destbid, time });
    this.adjList.get(destbid).push({ destbid: srcbid, time }); // Assuming bidirectional links
    });
    });
    }
   
    // Dijkstra’s algorithm for cheapest charge
    findCheapestCharge(start, end) {
    let minHeap = new MinHeap();
    let costMap = new Map();
   
    // Initialize all costs to Infinity
    this.banks.forEach((_, id) => costMap.set(id, Infinity));
    costMap.set(start, this.banks.get(start));
   
    minHeap.enqueue({ node: start, priority: this.banks.get(start) });
   
    while (!minHeap.isEmpty()) {
    let { node, priority: cost } = minHeap.dequeue();
   
    if (node === end) return cost;
   
    for (let { destbid } of this.adjList.get(node)) {
    let newCost = cost + this.banks.get(destbid);
    if (newCost < costMap.get(destbid)) {
    costMap.set(destbid, newCost);
    minHeap.enqueue({ node: destbid, priority: newCost });
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
    this.banks.forEach((_, id) => timeMap.set(id, Infinity));
    timeMap.set(start, 0);
   
    minHeap.enqueue({ node: start, priority: 0 });
   
    while (!minHeap.isEmpty()) {
    let { node, priority: time } = minHeap.dequeue();
   
    if (node === end) return time;
   
    for (let { destbid, time: travelTime } of this.adjList.get(node)) {
    let newTime = time + travelTime;
    if (newTime < timeMap.get(destbid)) {
    timeMap.set(destbid, newTime);
    minHeap.enqueue({ node: destbid, priority: newTime });
    }
    }
    }
   
    return -1; // No path found
    }
   }
   
   const banks = [
    { id: "A", charge: 10 },
    { id: "B", charge: 20 },
    { id: "C", charge: 15 }
   ];
   
   const links = [
    { srcbid: "A", tobanks: [{ destbid: "B", time: 5 }, { destbid: "C", time: 20 }] },
    { srcbid: "B", tobanks: [{ destbid: "C", time: 10 }] }
   ];
   
   const graph = new Graph(banks, links);
   export const h =()=>{
    console.log(graph.findCheapestCharge("A", "C"));
    console.log(graph.findLeastTime("A", "C")); 
  }
   
   