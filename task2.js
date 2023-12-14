class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  addNode(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  findSecondLargest() {
    if (!this.head || !this.head.next) {
      console.log("List should have at least two elements.");
      return;
    }

    let firstMax = Number.MIN_SAFE_INTEGER;
    let secondMax = Number.MIN_SAFE_INTEGER;

    let current = this.head;

    while (current) {
      if (current.data > firstMax) {
        secondMax = firstMax;
        firstMax = current.data;
      } else if (current.data > secondMax && current.data !== firstMax) {
        secondMax = current.data;
      }

      current = current.next;
    }

    if (secondMax === Number.MIN_SAFE_INTEGER) {
      console.log("No second largest element found.");
    } else {
      console.log("Second Largest Element:", secondMax);
    }
  }
}

function getInputAndFindSecondLargest() {
  const linkedList = new LinkedList();
  const n = parseInt(prompt("Enter the number of elements:"));

  for (let i = 0; i < n; i++) {
    const data = parseInt(prompt(`Enter element ${i + 1}:`));
    linkedList.addNode(data);
  }

  linkedList.findSecondLargest();
}

getInputAndFindSecondLargest();
