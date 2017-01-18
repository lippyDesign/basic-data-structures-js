
///// CONSTRUCTOR FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////

function User(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
};

var user1 = new User('John', 'Smith', 26, 'male');
var user200 = new User('Jill', 'Robinson', 25, 'female');

User.prototype.emailDomain = '@facebook.com';
User.prototype.getEmailAddress = function() {
    return this.firstName + this.lastName + this.emailDomain;
}

///// LINKED LIST ///////////////////////////////////////////////////////////////////////////////////////

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

var node1 = new Node(100, 'node2', null);

LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value, this.head, null);
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  this.head = newNode;
};

LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value, null, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) return null
  var val = this.head.value;
  this.head = this.head.next;
  if (this.head) this.head.prev = null;
  else this.tail = null;
  return val;
};

LinkedList.prototype.removeTail = function() {
    if (!this.tail) return null;
    var val = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = hull;
    return val;
};

LinkedList.prototype.search = function(searchValue) {
    var currentNode = this.head;
    while(currentNode) {
        if (currentNode.value === searchValue) return currentNode.value;
        currentNode = currentNode.next;
    }
    return null;
};

LinkedList.prototype.indexOf = function(value) {
    var currentNode = this.head;
    var currentIndex = 0;
    var indexes = [];
    while (currentNode) {
        if (currentNode.value === value) indexes.push(currentIndex);
        currentNode = currentNode.next;
        currentIndex++;
    }
    return indexes;
};

///// BIG O NOTATION ///////////////////////////////////////////////////////////////////////////////////////

/*
O(1) - constant run time - as input size grows, the ammount of operations is still constant
O(n) - linear run time - as input size grows, the ammount of operations grows by the same amount
O(n^2) - exponential run time - as input size grows, the ammount of operations grows exponentially - stay away as much as possible
O(log n) - logorithmic run time - as input size grows, the ammount of operations only grows logorithmically
*/

// Constant runtime - Big O Notation:  "O (1)"
function log(array) {
 console.log(array[0]);
 console.log(array[1]);
}
 
// log([1, 2, 3, 4]);
// log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
 
 
// Linear runtime - Big O Notation:  "O (n)"
function logAll(array) {
 for (var i = 0; i < array.length; i++) {
   console.log(array[i]); 
 }
}
 
// logAll([1, 2, 3, 4, 5]);
// logAll([1, 2, 3, 4, 5, 6]);
// logAll([1, 2, 3, 4, 5, 6, 7]);
 
 
// Exponential runtime - Big O Notation: "O (n^2)"
function addAndLog(array) {
 for (var i = 0; i < array.length; i++) {
   for (var j = 0; j < array.length; j++) {
     console.log(array[i] + array[j]);
   }
 } 
}
 
// addAndLog(['A', 'B', 'C']);  // 9 pairs logged out
// addAndLog(['A', 'B', 'C', 'D']);  // 16 pairs logged out
// addAndLog(['A', 'B', 'C', 'D', 'E']);  // 25 pairs logged out
 
 
// Logarithmic runtime - Big O Notation: O (log n)
function binarySearch(array, key) {
    var low = 0;
    var high = array.length - 1;
    var mid;
    var element;
    
    while (low <= high) {
        mid = Math.floor((low + high) / 2, 10);
        element = array[mid];
        if (element < key) {
            low = mid + 1;
        } else if (element > key) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

///// RECURSION ///////////////////////////////////////////////////////////////////////////////////////

/*
    recursive case calls itself
    base case returns a value and does not do recursion
*/

function factorial(num) {
    if (num === 1) {
        return num;
    } else {
        return num * factorial(num - 1);
    }
}

///// BINARY SEARCH TREE ///////////////////////////////////////////////////////////////////////////////////////

/*
    nodes smaller than or equal to the parent node are inserted to the left, nodes larger than the parent node are inserted to the right
    each node in the tree is a subtree, it is its own binary search tree
*/

// Binary Search Tree constructor function
function BST(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

BST.prototype.insert = function(val) {
    if (val <= this.value) {
        if (!this.left) this.left = new BST(val);
        else this.left.insert(val);
    } else if (val > this.value) {
        if (!this.right) this.right = new BST(val);
        else this.right.insert(val);
    }
};

BST.prototype.contains = function(val) {
    if (val === this.value) {
        return true;
    } else if (val < this.value) {
        if (!this.left) return false;
        else return this.left.contains(val);
    } else if (val > this.value) {
        if (!this.right) return false;
        else return this.right.contains(val);
    }
};

BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
    if (order === 'pre-order') iteratorFunc(this.value);
    if (this.left) this.left.depthFirstTraversal(iteratorFunc, order);
    if (order === 'in-order') iteratorFunc(this.value);
    if (this.right) this.right.depthFirstTraversal(iteratorFunc, order);
    if (order === 'post-order') iteratorFunc(this.value);
};

BST.prototype.breadthFirstTraversal = function(iteratorFunc) {
    var queue = [this];
    while(queue.length) {
        var treeNode = queue.shift();
        iteratorFunc(treeNode);
        if (treeNode.left) queue.push(treeNode.left);
        if (treeNode.right) queue.push(treeNode.right);
    }
};

BST.prototype.getMinVal = function() {
    if (!this.left) return this.value;
    return this.left.getMinVal();
};

BST.prototype.getMaxVal = function() {
    if (!this.right) return this.value;
    return this.right.getMaxVal();
};

var bst = new BST(50);
bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);

function logOne(value) {
    console.log(value)
}

function logTwo(node) {
    console.log(node.value)
}

///// HASH TABLE ///////////////////////////////////////////////////////////////////////////////////////

/*
    Hash tables on average have a constant run time O(1), that's for insertion and look up.
    We hash the key of an object to a number corresponding to a bucket in a hash table.
    If two items hash to the same value, we have a collision.
    To solve a collision we make a linked list in the the bucket.
*/

// Hash table constructor function
function HashTable(size) {
    this.buckets = Array(size);
    this.numBuckets = this.buckets.length;
}

function HashNode(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next || null;
}

HashTable.prototype.hash = function(key) {
    var total = 0;
    for (var i = 0; i < key.length; i++) {
        total += key.charCodeAt(i);
    }
    var bucket = total % this.numBuckets; // this will give us the proper number (0 to 29 in our example)
    return bucket;
};

HashTable.prototype.insert = function(key, value) {
    var index = this.hash(key);
    // if there is no node at this index
    if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
    // check the first node in the bucket, because we'll only be checking the one ahead node with the while loop
    else if (this.buckets[index].key === key) {
        this.buckets[index].value = value;
    }
    else {
        var currentNode = this.buckets[index];
        // we are checking the next node instead of the current node because the last node in the chain is null and our loop does not run when it is null
        while (currentNode.next) {
            // to update value, we'll check if the key already exists, if it does, we'll update the value and return;
            if (currentNode.next.key === key) {
                currentNode.next.value = value;
                return;
            }
            currentNode = currentNode.next;
        }
        // after the while loop finished running, our currentNode = last node in the chain
        currentNode.next = new HashNode(key, value)
    }
};

HashTable.prototype.get = function(key) {
    var index = this.hash(key);
    if (!this.buckets[index]) return null;
    else {
        var currentNode = this.buckets[index];
        while(currentNode) {
            if (currentNode.key === key) return currentNode.value;
            currentNode = currentNode.next;
        }
        return null;
    }
};

HashTable.prototype.retrieveAll = function() {
    var allNodes = [];
    for (var i = 0; i < this.numBuckets; i++) {
        var currentNode = this.buckets[i];
        while (currentNode) {
            allNodes.push(currentNode);
            currentNode = currentNode.next
        }
    }
    return allNodes;
};

var myHT = new HashTable(30);

myHT.insert('Dean', 'dean@gmail.com');
myHT.insert('Megan', 'megan@gmail.com');
myHT.insert('Dane', 'dane@yahoo.com');
myHT.insert('Dnae', 'dane@yahoo.com');

myHT.insert('Dean', 'deanmachine@gmail.com');
myHT.insert('Megan', 'megansmith@gmail.com');
myHT.insert('Dane', 'dane1010@outlook.com');

myHT.insert('Joe', 'joey@facebook.com');
myHT.insert('Samantha', 'sammy@twitter.com');

console.log(myHT.retrieveAll())
