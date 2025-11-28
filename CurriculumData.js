export const CURRICULUM_DATA = {
  // ============================================
  // TIER 1: The Gatekeepers (Freshman Spring / Sophomore Fall)
  // ============================================
  
  "CS 102: Data Structures & Functional Utility": {
    "prereqs": ["AP Computer Science A"],
    "description": "The universal follow-up to AP CSA. Shifts focus from syntax to efficiency and data organization.",
    "tier": 1,
    "weeks": [
      {
        "week": 1,
        "topic": "Asymptotic Analysis: Big-O Notation",
        "description": "Formal Big-O analysis of time and space complexity. Learn to analyze algorithm efficiency.",
        "resources": [
          { "title": "Big-O Notation Explained", "url": "https://www.youtube.com/watch?v=__vX2sjlpXU", "type": "Video" },
          { "title": "Big-O Notation Tutorial", "url": "https://www.youtube.com/watch?v=Mo4vesaut8g", "type": "Video" },
          { "title": "Understanding Big-O Notation", "url": "https://www.youtube.com/watch?v=kS_gr2_-ws8", "type": "Video" },
          { "title": "Big-O Cheat Sheet", "url": "https://www.bigocheatsheet.com/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Big-O Analysis Template",
            "description": "Download the template file and fill in the missing code sections. The template contains partially implemented algorithms with TODO comments. Complete the implementations and analyze their time complexity using Big-O notation.",
            "guidelines": [
              "Download the template file provided",
              "Fill in the missing code sections marked with TODO comments",
              "The template includes 3-4 simple algorithms (e.g., finding max in array, linear search, simple loop examples)",
              "For each completed algorithm, write a comment explaining its time complexity in Big-O notation",
              "Test your implementations with sample inputs",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Big-O Notation Assessment",
            "description": "Complete a written test covering: (1) Analyzing code snippets to determine time complexity, (2) Proving Big-O bounds using formal definitions, (3) Comparing different algorithms and their complexity classes, (4) Space complexity analysis, (5) Best, average, and worst case scenarios. Submit detailed solutions with mathematical proofs.",
            "guidelines": [
              "Analyze 10 code snippets and determine their time complexity with justification",
              "Prove at least 3 Big-O bounds using formal definition (f(n) = O(g(n)) if...)",
              "Compare algorithms in same complexity class (e.g., O(n log n) sorting algorithms)",
              "Analyze space complexity for at least 5 algorithms",
              "Explain best, average, and worst case scenarios for algorithms that vary",
              "All solutions must show step-by-step analysis with clear reasoning"
            ]
          },
          "communicator": {
            "title": "Big-O Notation Teaching Presentation",
            "description": "Create a 10-15 minute presentation explaining Big-O notation. Include: (1) What is Big-O and why it matters, (2) Common complexity classes with examples, (3) How to analyze code to determine complexity, (4) Visual demonstrations showing how different complexities grow, (5) Real-world implications of choosing efficient algorithms. Use visual aids and code examples.",
            "guidelines": [
              "10-15 minute presentation with visual aids",
              "Explain Big-O notation in accessible terms (avoid heavy math jargon initially)",
              "Cover at least 5 complexity classes: O(1), O(log n), O(n), O(n log n), O(n²)",
              "Walk through analyzing 2-3 code examples step-by-step",
              "Use graphs/charts to visualize how different complexities grow",
              "Discuss real-world impact: why O(n²) vs O(n log n) matters in practice",
              "Clear speaking, organized slides, and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 2,
        "topic": "Linear Structures: Dynamic Arrays and Linked Lists",
        "description": "Implement dynamic arrays with resize logic, and singly/doubly linked lists. Compare tradeoffs.",
        "resources": [
          { "title": "Dynamic Arrays Explained", "url": "https://www.youtube.com/watch?v=8hly31xKli0", "type": "Video" },
          { "title": "Linked Lists Tutorial", "url": "https://www.youtube.com/watch?v=WwfhLC16bis", "type": "Video" },
          { "title": "Arrays vs Linked Lists", "url": "https://www.youtube.com/watch?v=lC-yYCOnN8Q", "type": "Video" },
          { "title": "Linked Lists Article", "url": "https://www.geeksforgeeks.org/data-structures/linked-list/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dynamic Array and Linked List Template",
            "description": "Download the template file containing a partially implemented dynamic array and linked list class. Fill in the missing methods marked with TODO comments. The template includes method signatures, helper methods, and test cases.",
            "guidelines": [
              "Download the template file provided",
              "Complete the dynamic array methods: resize(), add(), remove(), get()",
              "Complete the linked list methods: addFirst(), addLast(), remove(), get()",
              "Fill in helper methods like findNode() and updateSize()",
              "Test your implementations using the provided test cases",
              "Add comments explaining the time complexity of each method in Big-O notation",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Linear Data Structures Assessment",
            "description": "Complete a written test covering: (1) Time complexity analysis for dynamic arrays vs linked lists (insertion, deletion, access), (2) Space complexity comparison, (3) When to use arrays vs linked lists, (4) Implementation details (resizing strategy, memory allocation), (5) Tradeoffs between singly vs doubly linked lists. Submit detailed solutions with complexity analysis.",
            "guidelines": [
              "Analyze time complexity for all operations (access, insert, delete) for both structures",
              "Compare space complexity: arrays vs linked lists (including overhead)",
              "Explain when to use arrays vs linked lists with specific use cases",
              "Describe dynamic array resizing strategies (doubling, geometric growth)",
              "Compare singly vs doubly linked lists: advantages and disadvantages",
              "All solutions must include Big-O notation with justification"
            ]
          },
          "communicator": {
            "title": "Arrays vs Linked Lists Presentation",
            "description": "Create a 10-15 minute presentation comparing dynamic arrays and linked lists. Include: (1) How each data structure works internally, (2) Time complexity comparison for common operations, (3) Memory layout and space efficiency, (4) When to choose arrays vs linked lists, (5) Real-world examples of each in use. Use visual diagrams and code examples.",
            "guidelines": [
              "10-15 minute presentation with visual diagrams",
              "Explain internal structure of both arrays and linked lists with memory diagrams",
              "Create comparison table showing time complexity for all operations",
              "Discuss memory layout: contiguous (arrays) vs scattered (linked lists)",
              "Provide 3-5 real-world scenarios and recommend which structure to use",
              "Use code examples to demonstrate key concepts",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 3,
        "topic": "Stacks, Queues, and Deques",
        "description": "Implement stacks, queues, and double-ended queues. Learn common use cases and applications.",
        "resources": [
          { "title": "Stacks and Queues Explained", "url": "https://www.youtube.com/watch?v=wjI1WNcIntg", "type": "Video" },
          { "title": "Stack Data Structure", "url": "https://www.youtube.com/watch?v=I37kGX-nZEI", "type": "Video" },
          { "title": "Queue Data Structure", "url": "https://www.youtube.com/watch?v=XuCbpw6Bj1U", "type": "Video" },
          { "title": "Stack and Queue Tutorial", "url": "https://www.programiz.com/dsa/stack", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Stack, Queue, and Deque Template",
            "description": "Download the template file with partially implemented Stack, Queue, and Deque classes. Fill in the missing methods and complete a simple application using each structure.",
            "guidelines": [
              "Download the template file provided",
              "Complete Stack methods: push(), pop(), peek(), isEmpty()",
              "Complete Queue methods: enqueue(), dequeue(), front(), isEmpty()",
              "Complete Deque methods: addFirst(), addLast(), removeFirst(), removeLast()",
              "Implement a simple balanced parentheses checker using the Stack (template provided)",
              "Implement a simple task scheduler using the Queue (template provided)",
              "Add comments explaining the time complexity of each operation",
              "Test your implementations and submit your completed template file"
            ]
          },
          "academic": {
            "title": "Stacks, Queues, and Deques Assessment",
            "description": "Complete a written test covering: (1) Time complexity analysis for all operations, (2) Implementation choices (array vs linked list), (3) Applications of stacks (parsing, recursion), (4) Applications of queues (BFS, scheduling), (5) When to use deque vs stack/queue, (6) Solving problems using these structures. Submit detailed solutions.",
            "guidelines": [
              "Analyze time complexity for push, pop, enqueue, dequeue operations",
              "Compare array-based vs linked list-based implementations",
              "Explain how stacks are used in recursion and parsing",
              "Explain how queues are used in BFS and scheduling algorithms",
              "Solve 3 problems using stacks (e.g., next greater element, histogram)",
              "Solve 2 problems using queues (e.g., level-order traversal, sliding window)",
              "All solutions must show step-by-step execution"
            ]
          },
          "communicator": {
            "title": "Stacks and Queues Presentation",
            "description": "Create a 10-15 minute presentation explaining stacks, queues, and deques. Include: (1) What each structure is and how it works, (2) LIFO vs FIFO principles, (3) Common applications with examples, (4) Implementation details, (5) Real-world use cases (browser back button, printer queue, etc.). Use visual demonstrations and code examples.",
            "guidelines": [
              "10-15 minute presentation with visual demonstrations",
              "Explain LIFO (Last In First Out) for stacks and FIFO (First In First Out) for queues",
              "Demonstrate at least 3 stack applications with live examples",
              "Demonstrate at least 3 queue applications with live examples",
              "Show implementation code and explain key operations",
              "Discuss real-world examples: browser history, task scheduling, etc.",
              "Engaging visuals and clear explanations"
            ]
          }
        }
      },
      {
        "week": 4,
        "topic": "Hash-Based Structures: HashMaps and HashSets",
        "description": "Understand hashing, collision resolution (chaining vs probing), and load factors.",
        "resources": [
          { "title": "Hash Tables Explained", "url": "https://www.youtube.com/watch?v=shs0KM3wKv8", "type": "Video" },
          { "title": "Hash Tables Tutorial", "url": "https://www.youtube.com/watch?v=2Ti5yvumFTU", "type": "Video" },
          { "title": "Hash Maps and Hash Sets", "url": "https://www.youtube.com/watch?v=U79Bo8c0rLk", "type": "Video" },
          { "title": "Hash Table Implementation", "url": "https://www.geeksforgeeks.org/implementing-our-own-hash-table-with-separate-chaining-in-java/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Hash Map Template",
            "description": "Download the template file with a partially implemented HashMap class using chaining collision resolution. Fill in the missing methods including hash function, put(), get(), and remove().",
            "guidelines": [
              "Download the template file provided",
              "Complete the hash function: hash(key) - use a simple polynomial hash for strings",
              "Complete put(key, value) method: handle collisions using chaining",
              "Complete get(key) method: search through the chain if collision occurred",
              "Complete remove(key) method: remove from chain if found",
              "Complete resize() method: rehash all elements when load factor exceeds threshold",
              "Add comments explaining how chaining handles collisions",
              "Test with the provided test cases and submit your completed template file"
            ]
          },
          "academic": {
            "title": "Hash Tables Assessment",
            "description": "Complete a written test covering: (1) Hash function design and properties, (2) Collision resolution strategies (chaining, linear probing, quadratic probing), (3) Load factor and its impact on performance, (4) Time complexity analysis (average vs worst case), (5) Rehashing strategies, (6) When hash tables are optimal. Submit detailed solutions with proofs.",
            "guidelines": [
              "Design a hash function for strings and explain its properties",
              "Compare collision resolution strategies: chaining vs open addressing",
              "Analyze time complexity: average O(1) vs worst case O(n)",
              "Explain how load factor affects performance with mathematical analysis",
              "Describe rehashing strategies and when to trigger them",
              "Solve problems using hash tables (e.g., two sum, group anagrams)",
              "All solutions must include complexity analysis"
            ]
          },
          "communicator": {
            "title": "Hash Tables Presentation",
            "description": "Create a 10-15 minute presentation explaining hash tables. Include: (1) What is hashing and why it's fast, (2) How hash functions work, (3) Collision resolution strategies with examples, (4) Load factor and performance tradeoffs, (5) Real-world applications (dictionaries, caches, databases). Use visual diagrams and code examples.",
            "guidelines": [
              "10-15 minute presentation with visual diagrams",
              "Explain hashing concept: mapping keys to array indices",
              "Demonstrate hash function with examples (show collisions)",
              "Visualize collision resolution: chaining vs probing with diagrams",
              "Explain load factor impact with performance graphs",
              "Discuss real-world applications: Python dict, Java HashMap, Redis",
              "Use code examples to show hash table operations",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 5,
        "topic": "Trees: Binary Search Trees and Traversals",
        "description": "Implement BSTs with insert, search, delete. Master in-order, pre-order, and post-order traversals.",
        "resources": [
          { "title": "Binary Search Trees", "url": "https://www.youtube.com/watch?v=H5JubkIy_p8", "type": "Video" },
          { "title": "BST Implementation", "url": "https://www.youtube.com/watch?v=zIX3zQP0khM", "type": "Video" },
          { "title": "Tree Traversals Explained", "url": "https://www.youtube.com/watch?v=1WxLM2hwL-U", "type": "Video" },
          { "title": "Tree Traversals Article", "url": "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Binary Search Tree Template",
            "description": "Download the template file with a partially implemented BST class. Fill in the missing methods for insert, search, delete, and all three traversal methods.",
            "guidelines": [
              "Download the template file provided",
              "Complete insert(value) method: maintain BST property (left < node < right)",
              "Complete search(value) method: return true if value exists, false otherwise",
              "Complete delete(value) method: handle three cases (no children, one child, two children)",
              "Complete inOrder(), preOrder(), postOrder() traversal methods",
              "Complete findMin() helper method used in delete operation",
              "Add comments explaining the BST property and time complexity of each method",
              "Test with the provided test cases and submit your completed template file"
            ]
          },
          "academic": {
            "title": "Binary Search Trees Assessment",
            "description": "Complete a written test covering: (1) BST property and why it enables efficient search, (2) Time complexity analysis for all operations (best, average, worst case), (3) Step-by-step execution of insert, search, delete, (4) Traversal algorithms and their applications, (5) BST vs balanced trees tradeoffs, (6) Solving problems using BSTs. Submit detailed solutions.",
            "guidelines": [
              "Explain BST property and prove it enables O(log n) search in balanced case",
              "Analyze time complexity: best O(log n), average O(log n), worst O(n)",
              "Show step-by-step execution of insert, search, delete on given trees",
              "Explain when to use each traversal (in-order for sorted output, pre-order for copying, etc.)",
              "Compare BST vs balanced trees (AVL, Red-Black) with complexity analysis",
              "Solve 3-4 problems using BSTs (e.g., range queries, kth smallest element)",
              "All solutions must show tree structure at each step"
            ]
          },
          "communicator": {
            "title": "Binary Search Trees Presentation",
            "description": "Create a 10-15 minute presentation explaining binary search trees. Include: (1) What is a BST and the ordering property, (2) How insert, search, and delete work, (3) Tree traversals with examples, (4) Time complexity and when BSTs are efficient, (5) Real-world applications (databases, file systems). Use tree diagrams and visual demonstrations.",
            "guidelines": [
              "10-15 minute presentation with tree diagrams",
              "Explain BST ordering property with visual examples",
              "Demonstrate insert, search, delete operations step-by-step",
              "Show all three traversals on same tree with output",
              "Explain time complexity with examples (balanced vs unbalanced)",
              "Discuss real-world applications: database indexing, expression trees",
              "Use interactive demonstrations or animations if possible",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 6,
        "topic": "Self-Balancing Trees: AVL or Red-Black",
        "description": "Learn why self-balancing is needed. Implement AVL trees or study Red-Black tree rotations.",
        "resources": [
          { "title": "AVL Trees Explained", "url": "https://www.youtube.com/watch?v=jDM6_TnYIqE", "type": "Video" },
          { "title": "AVL Tree Rotations", "url": "https://www.youtube.com/watch?v=vRwi_UcZjeE", "type": "Video" },
          { "title": "Red-Black Trees Tutorial", "url": "https://www.youtube.com/watch?v=qvZGUFHWChY", "type": "Video" },
          { "title": "Red-Black Trees Article", "url": "https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "AVL Tree Template",
            "description": "Download the template file with a partially implemented AVL tree class. Fill in the missing rotation methods and update the insert method to maintain balance.",
            "guidelines": [
              "Download the template file provided",
              "Complete getHeight() and getBalanceFactor() helper methods",
              "Complete rotateLeft() method: perform left rotation",
              "Complete rotateRight() method: perform right rotation",
              "Complete rotateLeftRight() and rotateRightLeft() methods (double rotations)",
              "Update insert() method to check balance factor and perform rotations when needed",
              "Add comments explaining when each rotation type is needed",
              "Test with the provided test cases and submit your completed template file"
            ]
          },
          "academic": {
            "title": "Self-Balancing Trees Assessment",
            "description": "Complete a written test covering: (1) Why self-balancing is needed (worst case BST), (2) AVL tree property and balance factor, (3) All rotation types and when to apply them, (4) Time complexity analysis (guaranteed O(log n)), (5) Comparison of AVL vs Red-Black trees, (6) Step-by-step insertion with rotations. Submit detailed solutions.",
            "guidelines": [
              "Explain why unbalanced BSTs degrade to O(n) and need balancing",
              "Define AVL balance factor and height property",
              "Describe all 4 rotation types: left, right, left-right, right-left",
              "Prove AVL trees guarantee O(log n) height",
              "Compare AVL vs Red-Black: balancing strictness, rotation frequency",
              "Show step-by-step insertion with rotations on given sequence",
              "All solutions must show tree structure and balance factors at each step"
            ]
          },
          "communicator": {
            "title": "Self-Balancing Trees Presentation",
            "description": "Create a 10-15 minute presentation explaining self-balancing trees. Include: (1) Problem with unbalanced BSTs, (2) How AVL trees maintain balance, (3) Rotation operations with examples, (4) Why guaranteed O(log n) matters, (5) AVL vs Red-Black comparison, (6) Real-world usage (Java TreeMap, C++ map). Use tree diagrams and animations.",
            "guidelines": [
              "10-15 minute presentation with tree diagrams and animations",
              "Demonstrate problem: show worst-case unbalanced BST",
              "Explain AVL balance factor and height property",
              "Animate or step through rotation operations",
              "Show before/after comparisons of tree height",
              "Compare AVL vs Red-Black with use case recommendations",
              "Discuss real-world implementations: Java TreeMap uses Red-Black",
              "Clear explanations and engaging visuals"
            ]
          }
        }
      },
      {
        "week": 7,
        "topic": "Binary Heaps and Priority Queues",
        "description": "Implement min/max heaps and use them for priority queues. Heapify operations.",
        "resources": [
          { "title": "Heaps and Priority Queues", "url": "https://www.youtube.com/watch?v=HqPJF2L5h9U", "type": "Video" },
          { "title": "Binary Heap Implementation", "url": "https://www.programiz.com/dsa/heap-data-structure", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Heap and Priority Queue Template",
            "description": "Download the template file with a partially implemented MinHeap class. Fill in the missing heap operations and use it to implement a simple priority queue.",
            "guidelines": [
              "Download the template file provided",
              "Complete parent(), leftChild(), rightChild() helper methods for array indexing",
              "Complete heapifyUp() method: bubble up element to maintain heap property",
              "Complete heapifyDown() method: bubble down element to maintain heap property",
              "Complete insert(value) method: add to end and heapify up",
              "Complete extractMin() method: remove root, replace with last element, heapify down",
              "Complete a simple PriorityQueue class using the MinHeap (template provided)",
              "Add comments explaining the heap property and array representation",
              "Test with the provided test cases and submit your completed template file"
            ]
          },
          "academic": {
            "title": "Heaps and Priority Queues Assessment",
            "description": "Complete a written test covering: (1) Heap property and array representation, (2) Time complexity analysis for all operations, (3) Heapify algorithms (bottom-up and top-down), (4) Building a heap from array (O(n) method), (5) Applications of priority queues, (6) Heap vs BST for priority operations. Submit detailed solutions.",
            "guidelines": [
              "Explain heap property (min-heap and max-heap) with examples",
              "Show array representation of heap and parent/child index formulas",
              "Analyze time complexity: insert O(log n), extract O(log n), build O(n)",
              "Describe heapify-up and heapify-down algorithms step-by-step",
              "Prove building heap from array is O(n) not O(n log n)",
              "Compare heap vs BST for priority queue operations",
              "Solve problems using heaps (e.g., find k largest elements, median maintenance)",
              "All solutions must show heap structure at each step"
            ]
          },
          "communicator": {
            "title": "Heaps and Priority Queues Presentation",
            "description": "Create a 10-15 minute presentation explaining binary heaps and priority queues. Include: (1) What is a heap and the heap property, (2) Array representation and indexing, (3) Heap operations (insert, extract, heapify), (4) Building a heap efficiently, (5) Applications (Dijkstra's algorithm, scheduling, heapsort). Use visual diagrams and code examples.",
            "guidelines": [
              "10-15 minute presentation with visual diagrams",
              "Explain heap property with tree and array representations",
              "Demonstrate parent/child index calculations",
              "Animate or step through insert and extract operations",
              "Show how to build heap from array efficiently",
              "Discuss applications: Dijkstra's algorithm, task scheduling, heapsort",
              "Use code examples to show key operations",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 8,
        "topic": "Intro to Graphs: Representation and Basic Traversals",
        "description": "Learn adjacency matrix vs adjacency list. Implement BFS and DFS.",
        "resources": [
          { "title": "Graph Data Structure", "url": "https://www.youtube.com/watch?v=tWVWeAqZ0WU", "type": "Video" },
          { "title": "Graph Representation", "url": "https://www.geeksforgeeks.org/graph-and-its-representations/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Graph Representation and Traversal Template",
            "description": "Download the template file with a partially implemented Graph class using adjacency list representation. Fill in the missing BFS and DFS traversal methods.",
            "guidelines": [
              "Download the template file provided",
              "Complete addEdge() method: add edges to the adjacency list",
              "Complete BFS(start) method: use a queue to traverse level by level",
              "Complete DFS(start) method: use recursion or a stack to traverse depth-first",
              "Complete hasPath(start, end) method using BFS or DFS (template provided)",
              "Add comments explaining the difference between BFS and DFS",
              "Add comments explaining adjacency list representation",
              "Test with the provided test graphs and submit your completed template file"
            ]
          },
          "academic": {
            "title": "Graph Traversals Assessment",
            "description": "Complete a written test covering: (1) Adjacency matrix vs adjacency list tradeoffs, (2) Time and space complexity for BFS and DFS, (3) Step-by-step execution of BFS and DFS on given graphs, (4) Applications of BFS (shortest path, level-order) vs DFS (cycle detection, topological sort), (5) When to use each traversal. Submit detailed solutions.",
            "guidelines": [
              "Compare adjacency matrix vs list: space O(V²) vs O(V+E), query time O(1) vs O(degree)",
              "Analyze time complexity: BFS O(V+E), DFS O(V+E) with justification",
              "Show step-by-step BFS execution (queue state at each step)",
              "Show step-by-step DFS execution (stack/recursion trace)",
              "Explain when BFS finds shortest path (unweighted graphs)",
              "Explain DFS applications: cycle detection, topological sort, maze solving",
              "Solve problems using BFS (e.g., word ladder, islands) and DFS (e.g., path finding)",
              "All solutions must show graph and traversal state at each step"
            ]
          },
          "communicator": {
            "title": "Graph Traversals Presentation",
            "description": "Create a 10-15 minute presentation explaining graphs and traversals. Include: (1) What are graphs and common terminology, (2) Adjacency matrix vs adjacency list representations, (3) How BFS works (queue-based, level-order), (4) How DFS works (stack-based, depth-first), (5) When to use BFS vs DFS, (6) Real-world applications (social networks, web crawling). Use graph diagrams and animations.",
            "guidelines": [
              "10-15 minute presentation with graph diagrams and animations",
              "Explain graph terminology: vertices, edges, directed/undirected, weighted",
              "Visualize adjacency matrix vs list with examples",
              "Animate BFS traversal showing queue and visited nodes",
              "Animate DFS traversal showing stack/recursion and visited nodes",
              "Compare BFS vs DFS with use case recommendations",
              "Discuss real-world applications: social networks (friends), web pages (links)",
              "Use interactive demonstrations if possible",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 9,
        "topic": "Final Assessment: Data Structures Portfolio",
        "description": "Complete one Ellis Activity demonstrating mastery of data structures.",
        "resources": [],
        "deliverables": {
          "builder": {
            "title": "Maze Generator and Pathfinding Solver",
            "description": "Build an interactive maze generator and solver application. Generate random mazes using graph algorithms, then solve them using multiple pathfinding strategies (BFS, DFS, A*). Visualize the generation and solving process in real-time. This project naturally uses graphs, stacks, queues, heaps, and hash maps to create a cohesive, engaging application.",
            "guidelines": [
              "Maze Generation: Implement at least 2 algorithms (e.g., Randomized Depth-First Search, Kruskal's algorithm, Prim's algorithm) using graph data structures",
              "Maze Representation: Use adjacency lists or matrices to represent the maze graph, and arrays/2D arrays for the visual grid",
              "Pathfinding Solvers: Implement at least 3 solving algorithms:",
              "  - BFS (using Queue) for shortest path in unweighted mazes",
              "  - DFS (using Stack) for any valid path",
              "  - A* Algorithm (using Priority Queue/Heap) for optimal pathfinding",
              "Visualization: Create real-time visualizations showing:",
              "  - Maze generation process (walls being removed)",
              "  - Pathfinding algorithms exploring the maze",
              "  - Final solution path highlighted",
              "Interactive Features: Allow users to adjust maze size, generation algorithm, solving algorithm, and animation speed",
              "Data Structure Usage: Clearly demonstrate use of:",
              "  - Graphs (maze structure, adjacency representation)",
              "  - Stacks (DFS, backtracking in generation)",
              "  - Queues (BFS traversal)",
              "  - Heaps/Priority Queues (A* algorithm)",
              "  - Hash Maps (visited nodes tracking, path reconstruction)",
              "  - Arrays (grid representation, coordinate storage)",
              "Performance Analysis: Compare solving times and path lengths for different algorithms on various maze sizes",
              "Documentation: Include README explaining algorithms, data structure choices, complexity analysis, and usage instructions",
              "Bonus: Add features like maze difficulty levels, custom start/end points, or multiple solution paths"
            ]
          },
          "academic": {
            "title": "Comprehensive Data Structures Exam",
            "description": "Complete a comprehensive written exam covering all course topics: (1) Design and analyze data structures for given problems, (2) Choose appropriate data structures for scenarios, (3) Time and space complexity analysis, (4) Compare different data structures, (5) Solve 5-7 complex problems requiring multiple structures. Submit detailed solutions with analysis.",
            "guidelines": [
              "Design data structures for 2-3 new problems not covered in class",
              "Justify choice of data structure for given scenarios with complexity analysis",
              "Complete time and space complexity analysis for all solutions",
              "Compare different data structures for same problem (e.g., array vs linked list)",
              "Solve 5-7 complex problems requiring multiple data structures",
              "All solutions must be rigorous with clear reasoning and proofs",
              "Demonstrate deep understanding of tradeoffs and design decisions"
            ]
          },
          "communicator": {
            "title": "Data Structures Course Presentation",
            "description": "Create a 20-30 minute comprehensive presentation summarizing the entire course. Include: (1) Overview of all data structures covered, (2) When to use each structure with examples, (3) Complexity analysis and tradeoffs, (4) Real-world applications, (5) Your favorite data structure and why, (6) Future learning directions. Use visual aids and live demonstrations.",
            "guidelines": [
              "20-30 minute comprehensive presentation",
              "Overview of all data structures: linear, tree-based, hash-based, graph",
              "Decision framework: when to use each structure with examples",
              "Complexity comparison table for common operations",
              "Real-world applications with specific examples for each structure",
              "Deep dive into your favorite data structure: why, how it works, applications",
              "Future learning directions: advanced structures, optimization techniques",
              "Engaging visuals, clear structure, and confident delivery"
            ]
          }
        }
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Data Structures Library",
        "description": "Implement a complete library of data structures: dynamic array, linked list, stack, queue, hash map, BST, and heap with full documentation."
      },
      "academic": {
        "title": "Data Structures Problem Set",
        "description": "Complete 20-25 problems from LeetCode/Codeforces covering all major data structures and their operations."
      },
      "communicator": {
        "title": "Data Structures Tutorial Series",
        "description": "Create a video or written tutorial series explaining 3-4 data structures with visualizations and code examples."
      }
    }
  },

  "Math 201: Discrete Mathematics for CS": {
    "prereqs": ["Algebra II / Pre-Calculus"],
    "description": "The mathematical language of computer science. Essential for proving code correctness and analyzing speed.",
    "tier": 1,
    "weeks": [
      {
        "week": 1,
        "topic": "Propositional Logic and Truth Tables",
        "description": "Learn propositions, logical connectives (AND, OR, NOT, IMPLIES), truth tables, and logical equivalences.",
        "resources": [
          { "title": "Propositional Logic", "url": "https://www.youtube.com/watch?v=FMh8qNV3PHk", "type": "Video" },
          { "title": "Truth Tables Tutorial", "url": "https://www.mathsisfun.com/sets/logic-truth-tables.html", "type": "Article" }
        ],
        "deliverable": "Create truth tables for 10 compound propositions. Identify logically equivalent pairs."
      },
      {
        "week": 2,
        "topic": "Predicates, Quantifiers, and Logical Reasoning",
        "description": "Use predicates, universal and existential quantifiers. Translate between English and formal logic.",
        "resources": [
          { "title": "Predicate Logic and Quantifiers", "url": "https://www.youtube.com/watch?v=8xvHsh3MGvg", "type": "Video" },
          { "title": "Quantifiers Explained", "url": "https://www.mathsisfun.com/sets/logic-predicates-quantifiers.html", "type": "Article" }
        ],
        "deliverable": "Translate 10 English statements into predicate logic with quantifiers. Prove simple quantified statements."
      },
      {
        "week": 3,
        "topic": "Proof Techniques: Direct Proof and Proof by Contradiction",
        "description": "Master direct proofs and proof by contradiction. Practice formal mathematical reasoning.",
        "resources": [
          { "title": "Proof Techniques", "url": "https://www.youtube.com/watch?v=FMh8qNV3PHk", "type": "Video" },
          { "title": "Mathematical Proofs", "url": "https://www.mathsisfun.com/algebra/mathematical-induction.html", "type": "Article" }
        ],
        "deliverable": "Write 5 formal proofs: 3 direct proofs and 2 proofs by contradiction on number theory topics."
      },
      {
        "week": 4,
        "topic": "Set Theory: Sets, Relations, and Functions",
        "description": "Work with sets, set operations, relations, functions, cardinality, and countability of infinite sets.",
        "resources": [
          { "title": "Set Theory Basics", "url": "https://www.youtube.com/playlist?list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", "type": "Video" },
          { "title": "Sets and Functions", "url": "https://www.mathsisfun.com/sets/", "type": "Article" }
        ],
        "deliverable": "Solve 15 problems involving set operations, Venn diagrams, and function properties (injective/surjective/bijective)."
      },
      {
        "week": 5,
        "topic": "Combinatorics: Permutations, Combinations, and Counting",
        "description": "Learn permutations, combinations, the Pigeonhole Principle, and Pascal's Triangle.",
        "resources": [
          { "title": "Combinatorics", "url": "https://www.youtube.com/watch?v=8xvHsh3MGvg", "type": "Video" },
          { "title": "Permutations and Combinations", "url": "https://www.mathsisfun.com/combinatorics/combinations-permutations.html", "type": "Article" }
        ],
        "deliverable": "Solve 20 counting problems using permutations, combinations, and the Pigeonhole Principle."
      },
      {
        "week": 6,
        "topic": "Mathematical Induction: Weak and Strong Induction",
        "description": "Master weak and strong mathematical induction. Essential for proving recursive algorithms correct.",
        "resources": [
          { "title": "Mathematical Induction", "url": "https://www.youtube.com/watch?v=FMh8qNV3PHk", "type": "Video" },
          { "title": "Induction Tutorial", "url": "https://www.mathsisfun.com/algebra/mathematical-induction.html", "type": "Article" }
        ],
        "deliverable": "Write 5 inductive proofs including summations, inequalities, and recursive function correctness."
      },
      {
        "week": 7,
        "topic": "Number Theory: Modular Arithmetic and GCD",
        "description": "Learn modular arithmetic, GCD, the Euclidean Algorithm, and basics of RSA encryption.",
        "resources": [
          { "title": "Modular Arithmetic", "url": "https://www.youtube.com/watch?v=Eg6CTCu8iio", "type": "Video" },
          { "title": "Euclidean Algorithm", "url": "https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm", "type": "Article" }
        ],
        "deliverable": "Implement the Euclidean Algorithm. Solve 10 problems involving modular arithmetic and GCD."
      },
      {
        "week": 8,
        "topic": "Graph Theory Basics: Graphs, Paths, and Connectivity",
        "description": "Study graphs, paths, cycles, trees, and basic graph properties. Connect to algorithms.",
        "resources": [
          { "title": "Graph Theory Introduction", "url": "https://www.youtube.com/watch?v=FMh8qNV3PHk", "type": "Video" },
          { "title": "Graph Theory Basics", "url": "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", "type": "Article" }
        ],
        "deliverable": "Model 3 real-world problems as graphs. Analyze properties like degree, connectivity, and paths."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Discrete Math Portfolio",
        "description": "Complete one Ellis Activity demonstrating mastery of discrete mathematics.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (proof collection, problem set, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Discrete Math Application Project",
        "description": "Apply discrete math to solve a real CS problem: model a network as a graph, use combinatorics for optimization, or implement cryptographic algorithms."
      },
      "academic": {
        "title": "Discrete Math Problem Set",
        "description": "Complete 25-30 rigorous problems covering logic, sets, combinatorics, induction, number theory, and graph theory."
      },
      "communicator": {
        "title": "Teach a Discrete Math Topic",
        "description": "Create a detailed lesson (slides or video) teaching one discrete math topic (e.g., induction, combinatorics, or graph theory) to AP CSA students."
      }
    }
  },

  "Sys 201: Computer Systems (The Hardware/Software Interface)": {
    "prereqs": ["AP Computer Science A"],
    "description": "Peeking under the hood. Move from Java's managed memory to C and Assembly, learning how hardware executes software.",
    "tier": 1,
    "weeks": [
      {
        "week": 1,
        "topic": "C Programming: Pointers and Address Arithmetic",
        "description": "Learn C basics, pointers, address arithmetic, and manual memory management.",
        "resources": [
          { "title": "C Programming Tutorial", "url": "https://www.youtube.com/watch?v=KJgsSFOSQv0", "type": "Video" },
          { "title": "Pointers in C", "url": "https://www.geeksforgeeks.org/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/", "type": "Article" }
        ],
        "deliverable": "Write 5 C programs using pointers. Implement a function that swaps two integers using pointers."
      },
      {
        "week": 2,
        "topic": "Manual Memory Management: malloc and free",
        "description": "Master dynamic memory allocation with malloc, calloc, realloc, and free. Understand memory leaks.",
        "resources": [
          { "title": "Memory Management in C", "url": "https://www.youtube.com/watch?v=9uAjCrxqtP4", "type": "Video" },
          { "title": "malloc and free", "url": "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/", "type": "Article" }
        ],
        "deliverable": "Implement a dynamic array in C using malloc. Ensure no memory leaks with proper free() calls."
      },
      {
        "week": 3,
        "topic": "C Structs and Data Representation",
        "description": "Use structs to organize data. Understand memory layout and alignment.",
        "resources": [
          { "title": "C Structures", "url": "https://www.youtube.com/watch?v=9uAjCrxqtP4", "type": "Video" },
          { "title": "Structs in C", "url": "https://www.geeksforgeeks.org/structures-c/", "type": "Article" }
        ],
        "deliverable": "Create a struct for a student record. Write functions to create, modify, and print student data."
      },
      {
        "week": 4,
        "topic": "Data Representation: Bits, Bytes, and Two's Complement",
        "description": "Understand binary representation, two's complement for signed integers, and hexadecimal notation.",
        "resources": [
          { "title": "Number Systems", "url": "https://www.youtube.com/watch?v=ot-ufo2AJ_c", "type": "Video" },
          { "title": "Two's Complement", "url": "https://www.geeksforgeeks.org/1s-2s-complement-binary-number/", "type": "Article" }
        ],
        "deliverable": "Convert numbers between decimal, binary (two's complement), and hex. Perform binary arithmetic."
      },
      {
        "week": 5,
        "topic": "Floating Point Representation: IEEE 754",
        "description": "Learn how floating point numbers are represented in memory using IEEE 754 standard.",
        "resources": [
          { "title": "IEEE 754 Floating Point", "url": "https://www.youtube.com/watch?v=8afbTaA-gOQ", "type": "Video" },
          { "title": "Floating Point Representation", "url": "https://www.geeksforgeeks.org/ieee-standard-754-floating-point-numbers/", "type": "Article" }
        ],
        "deliverable": "Convert decimal numbers to IEEE 754 single and double precision. Understand precision limitations."
      },
      {
        "week": 6,
        "topic": "Assembly Language: x86-64 Basics",
        "description": "Introduction to x86-64 assembly: registers, instructions, and basic operations.",
        "resources": [
          { "title": "x86-64 Assembly", "url": "https://www.youtube.com/watch?v=wLXIWKUWpSs", "type": "Video" },
          { "title": "Assembly Language Basics", "url": "https://www.tutorialspoint.com/assembly_programming/", "type": "Article" }
        ],
        "deliverable": "Write 3 simple assembly programs: add two numbers, loop, and call a function."
      },
      {
        "week": 7,
        "topic": "The Stack Frame and Calling Conventions",
        "description": "Understand how function calls work: stack frames, parameter passing, and return values.",
        "resources": [
          { "title": "Stack Frames", "url": "https://www.youtube.com/watch?v=7r_LMQf6c5U", "type": "Video" },
          { "title": "Calling Conventions", "url": "https://en.wikipedia.org/wiki/Calling_convention", "type": "Article" }
        ],
        "deliverable": "Trace a recursive function's stack frames. Draw stack diagrams for nested function calls."
      },
      {
        "week": 8,
        "topic": "Linking and Loading: Object Files and Libraries",
        "description": "Learn how compilers, linkers, and loaders work. Understand object files and static/dynamic linking.",
        "resources": [
          { "title": "Linking and Loading", "url": "https://www.youtube.com/watch?v=wLXIWKUWpSs", "type": "Video" },
          { "title": "Linkers and Loaders", "url": "https://www.geeksforgeeks.org/static-and-dynamic-linking-in-operating-systems/", "type": "Article" }
        ],
        "deliverable": "Compile a multi-file C program. Examine object files and understand the linking process."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Systems Programming Project",
        "description": "Complete one Ellis Activity demonstrating mastery of computer systems concepts.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (C program, assembly analysis, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Systems Programming Project",
        "description": "Build a C program that demonstrates memory management, pointers, and structs (e.g., a simple memory allocator or data structure library)."
      },
      "academic": {
        "title": "Computer Systems Problem Set",
        "description": "Complete 20-25 problems covering C programming, memory management, data representation, and assembly language."
      },
      "communicator": {
        "title": "Explain How Code Executes",
        "description": "Create a tutorial explaining how a simple C program compiles, links, and executes, including assembly representation."
      }
    }
  },

  // ============================================
  // TIER 2: The Core (Sophomore Spring / Junior Fall)
  // ============================================

  "CS 301: Design & Analysis of Algorithms": {
    "prereqs": ["CS 102: Data Structures & Functional Utility", "Math 201: Discrete Mathematics for CS"],
    "description": "The primary filter for Big Tech interviews and the theoretical peak of the undergraduate core. Focuses on solving hard problems efficiently.",
    "tier": 2,
    "weeks": [
      {
        "week": 1,
        "topic": "Graph Algorithms: Dijkstra and Shortest Paths",
        "description": "Implement Dijkstra's algorithm for single-source shortest paths. Understand priority queue usage.",
        "resources": [
          { "title": "Dijkstra's Algorithm", "url": "https://www.youtube.com/watch?v=XB4MIexjvY0", "type": "Video" },
          { "title": "Shortest Path Algorithms", "url": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dijkstra's Algorithm Implementation Project",
            "description": "Build a complete implementation of Dijkstra's algorithm with visualization. Create a program that finds shortest paths in a weighted graph and displays the path visually (using a graph visualization library or ASCII art). Include test cases with different graph structures.",
            "guidelines": [
              "Working implementation that correctly finds shortest paths",
              "Visualization of the algorithm execution (graph drawing or step-by-step output)",
              "At least 5 test cases covering different scenarios (small/large graphs, different edge weights)",
              "Clean, documented code with comments explaining key steps",
              "README explaining how to run and what the program does"
            ]
          },
          "academic": {
            "title": "Dijkstra's Algorithm Assessment",
            "description": "Complete a written test covering: (1) Step-by-step execution of Dijkstra's on a given graph, (2) Time complexity analysis (O(V log V + E) with binary heap), (3) Comparison with other shortest path algorithms, (4) Edge cases (negative weights, disconnected graphs). Submit solutions with detailed explanations.",
            "guidelines": [
              "Show complete step-by-step execution on provided graph (show priority queue state at each step)",
              "Prove time complexity O(V log V + E) with binary heap implementation",
              "Compare Dijkstra with at least 2 other algorithms (BFS, Bellman-Ford, Floyd-Warshall)",
              "Explain why Dijkstra fails with negative weights with a counterexample",
              "All solutions must be handwritten or typed with clear mathematical notation"
            ]
          },
          "communicator": {
            "title": "Dijkstra's Algorithm Presentation",
            "description": "Create a 10-15 minute presentation explaining Dijkstra's algorithm. Include: (1) Problem it solves, (2) How the algorithm works with step-by-step example, (3) Priority queue data structure role, (4) Time complexity analysis, (5) Real-world applications (GPS navigation, network routing). Use visual aids and live demonstration if possible.",
            "guidelines": [
              "10-15 minute presentation (recorded video or live)",
              "Visual aids required: diagrams showing graph, priority queue, and path construction",
              "Walk through at least one complete example step-by-step",
              "Explain time complexity with clear reasoning",
              "Discuss at least 2 real-world applications with examples",
              "Clear speaking, organized slides, and engaging delivery"
            ]
          }
        }
      },
      {
        "week": 2,
        "topic": "Graph Algorithms: Bellman-Ford and Negative Weights",
        "description": "Learn Bellman-Ford for graphs with negative edges. Detect negative cycles.",
        "resources": [
          { "title": "Bellman-Ford Algorithm", "url": "https://www.youtube.com/watch?v=obWXjtg0L64", "type": "Video" },
          { "title": "Bellman-Ford Tutorial", "url": "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Bellman-Ford Implementation and Comparison Project",
            "description": "Implement Bellman-Ford algorithm with negative cycle detection. Build a comparison tool that runs both Dijkstra and Bellman-Ford on the same graphs and generates a performance report showing when each algorithm is appropriate. Include visualization of the relaxation process.",
            "guidelines": [
              "Working Bellman-Ford implementation with negative cycle detection",
              "Comparison tool that benchmarks both algorithms on same graphs",
              "Performance report analyzing when each algorithm is better",
              "Visualization showing relaxation process (distance updates)",
              "Test cases including graphs with negative edges and negative cycles"
            ]
          },
          "academic": {
            "title": "Bellman-Ford Algorithm Assessment",
            "description": "Complete a written test covering: (1) Step-by-step execution of Bellman-Ford on a graph with negative edges, (2) Negative cycle detection process, (3) Time complexity analysis (O(VE)), (4) When to use Bellman-Ford vs Dijkstra, (5) Proof of correctness for negative cycle detection. Submit detailed solutions.",
            "guidelines": [
              "Show complete step-by-step execution with distance array updates at each iteration",
              "Demonstrate negative cycle detection with a graph containing a negative cycle",
              "Prove time complexity O(VE) with clear analysis",
              "Compare Bellman-Ford vs Dijkstra with decision tree for when to use each",
              "Provide proof sketch for why V-1 iterations are sufficient (or counterexample if not)"
            ]
          },
          "communicator": {
            "title": "Bellman-Ford Algorithm Presentation",
            "description": "Create a 10-15 minute presentation explaining Bellman-Ford algorithm. Include: (1) Why Dijkstra fails with negative weights, (2) How Bellman-Ford handles negative edges, (3) Relaxation process with examples, (4) Negative cycle detection, (5) Real-world applications (arbitrage detection, network routing with costs). Use visual demonstrations.",
            "guidelines": [
              "10-15 minute presentation with clear structure",
              "Demonstrate why Dijkstra fails with negative weights using visual example",
              "Show relaxation process with animated or step-by-step diagrams",
              "Explain negative cycle detection with example graph",
              "Discuss real-world applications (arbitrage, routing) with concrete examples",
              "Engaging visuals and clear explanations"
            ]
          }
        }
      },
      {
        "week": 3,
        "topic": "All-Pairs Shortest Paths: Floyd-Warshall",
        "description": "Master Floyd-Warshall for finding shortest paths between all pairs of vertices.",
        "resources": [
          { "title": "Floyd-Warshall Algorithm", "url": "https://www.youtube.com/watch?v=oNI0rf2P9gE", "type": "Video" },
          { "title": "Floyd-Warshall Tutorial", "url": "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Floyd-Warshall Implementation and Path Reconstruction",
            "description": "Implement Floyd-Warshall algorithm with path reconstruction. Build a tool that not only finds shortest distances but also reconstructs the actual paths between all pairs. Create a visualization showing the distance matrix at each iteration and the final shortest paths.",
            "guidelines": [
              "Complete Floyd-Warshall implementation with path reconstruction",
              "Visualization showing distance matrix at each iteration (k=0, k=1, k=2, etc.)",
              "Function to reconstruct actual paths between any two vertices",
              "Interactive tool or clear output showing matrix evolution",
              "Test on graphs of different sizes (at least 3-4 test cases)"
            ]
          },
          "academic": {
            "title": "Floyd-Warshall Algorithm Assessment",
            "description": "Complete a written test covering: (1) Step-by-step execution showing distance matrix updates, (2) Dynamic programming recurrence relation, (3) Time complexity analysis (O(V³)), (4) Space complexity optimization, (5) When to use Floyd-Warshall vs running Dijkstra V times, (6) Path reconstruction algorithm. Submit detailed solutions.",
            "guidelines": [
              "Show complete distance matrix at each iteration (all k values)",
              "Write and explain the DP recurrence: D[i][j][k] = min(...)",
              "Prove time complexity O(V³) with nested loop analysis",
              "Explain space optimization from O(V³) to O(V²)",
              "Compare Floyd-Warshall vs V×Dijkstra with complexity and use case analysis",
              "Describe path reconstruction algorithm step-by-step"
            ]
          },
          "communicator": {
            "title": "Floyd-Warshall Algorithm Presentation",
            "description": "Create a 10-15 minute presentation explaining Floyd-Warshall algorithm. Include: (1) Problem of all-pairs shortest paths, (2) Dynamic programming approach with intermediate vertices, (3) Distance matrix updates with examples, (4) Path reconstruction, (5) Comparison with other approaches, (6) Applications (social network analysis, transitive closure). Use matrix visualizations.",
            "guidelines": [
              "10-15 minute presentation with matrix visualizations",
              "Explain the DP idea: allowing intermediate vertices 0..k",
              "Show matrix updates with clear before/after comparisons",
              "Demonstrate path reconstruction with example",
              "Compare with alternative approaches (V×Dijkstra, V×Bellman-Ford)",
              "Discuss applications with concrete examples (social networks, transitive closure)"
            ]
          }
        }
      },
      {
        "week": 4,
        "topic": "Minimum Spanning Trees: Prim and Kruskal",
        "description": "Learn Prim's and Kruskal's algorithms for finding minimum spanning trees.",
        "resources": [
          { "title": "MST Algorithms", "url": "https://www.youtube.com/watch?v=4ZlRH0eK-qQ", "type": "Video" },
          { "title": "Prim and Kruskal", "url": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "MST Algorithms Implementation and Comparison Project",
            "description": "Implement both Prim's and Kruskal's algorithms. Build a comparison tool that visualizes the MST construction process for both algorithms side-by-side. Include performance benchmarking on different graph types (dense vs sparse) and create a report analyzing when each algorithm is more efficient.",
            "guidelines": [
              "Working implementations of both Prim's and Kruskal's algorithms",
              "Side-by-side visualization showing MST construction for both",
              "Performance benchmarking on dense graphs (E ≈ V²) and sparse graphs (E ≈ V)",
              "Written report analyzing when each algorithm is more efficient",
              "At least 3 test cases with different graph structures",
              "Include Union-Find implementation for Kruskal"
            ]
          },
          "academic": {
            "title": "MST Algorithms Assessment",
            "description": "Complete a written test covering: (1) Step-by-step execution of Prim's algorithm on a given graph, (2) Step-by-step execution of Kruskal's algorithm, (3) Time complexity analysis for both (with different data structures), (4) Proof of correctness (cut property), (5) When to use Prim vs Kruskal, (6) Union-Find data structure for Kruskal. Submit detailed solutions.",
            "guidelines": [
              "Show step-by-step execution of Prim's (show priority queue and selected edges)",
              "Show step-by-step execution of Kruskal's (show sorted edges and Union-Find operations)",
              "Analyze time complexity: Prim with binary heap O(E log V), Kruskal with Union-Find O(E log E)",
              "Prove correctness using cut property (at least outline the proof)",
              "Decision criteria: when to use Prim vs Kruskal based on graph density",
              "Explain Union-Find operations (Find, Union) with path compression"
            ]
          },
          "communicator": {
            "title": "MST Algorithms Presentation",
            "description": "Create a 10-15 minute presentation comparing Prim's and Kruskal's algorithms. Include: (1) What is a minimum spanning tree, (2) How Prim's algorithm works (greedy approach from a vertex), (3) How Kruskal's algorithm works (greedy approach on edges), (4) Visual comparison of both algorithms, (5) Time complexity comparison, (6) Real-world applications (network design, clustering). Use graph visualizations.",
            "guidelines": [
              "10-15 minute presentation with graph visualizations",
              "Define MST clearly with examples",
              "Explain Prim's greedy approach: grow tree from a vertex",
              "Explain Kruskal's greedy approach: add edges in sorted order",
              "Side-by-side visual comparison showing both algorithms on same graph",
              "Time complexity comparison table",
              "Real-world applications with concrete examples (network cables, clustering)"
            ]
          }
        }
      },
      {
        "week": 5,
        "topic": "Divide and Conquer: Merge Sort and Quick Sort Analysis",
        "description": "Deep dive into divide-and-conquer paradigm. Analyze merge sort and quicksort complexity.",
        "resources": [
          { "title": "Divide and Conquer", "url": "https://www.youtube.com/watch?v=2Rr2tW9zRga", "type": "Video" },
          { "title": "Merge Sort Analysis", "url": "https://www.geeksforgeeks.org/merge-sort/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Sorting Algorithms Implementation and Benchmarking Project",
            "description": "Implement merge sort and quicksort with detailed performance analysis. Build a benchmarking tool that compares both algorithms on different input types (random, sorted, reverse sorted, nearly sorted). Visualize the sorting process and create graphs showing time complexity in practice. Include analysis of space complexity.",
            "guidelines": [
              "Working implementations of both merge sort and quicksort",
              "Benchmarking tool testing on random, sorted, reverse sorted, and nearly sorted arrays",
              "Graphs/charts showing actual runtime vs input size (verify O(n log n))",
              "Visualization of sorting process (optional but recommended)",
              "Written analysis comparing performance and space usage",
              "Test with arrays of sizes: 100, 1000, 10000, 100000 elements"
            ]
          },
          "academic": {
            "title": "Divide and Conquer Sorting Assessment",
            "description": "Complete a written test covering: (1) Recurrence relation for merge sort and solving it using Master Theorem, (2) Recurrence relation for quicksort (best, average, worst case), (3) Step-by-step execution of both algorithms, (4) Space complexity analysis, (5) When to use merge sort vs quicksort, (6) Stability and in-place sorting concepts. Submit detailed solutions with proofs.",
            "guidelines": [
              "Write recurrence T(n) = 2T(n/2) + O(n) for merge sort and solve using Master Theorem",
              "Write recurrences for quicksort: best case T(n) = 2T(n/2) + O(n), worst case T(n) = T(n-1) + O(n)",
              "Show step-by-step execution of merge sort on array [5,2,8,1,9]",
              "Show step-by-step execution of quicksort on same array",
              "Analyze space complexity: merge sort O(n), quicksort O(log n) average",
              "Compare when to use each: stability, worst-case guarantees, space constraints"
            ]
          },
          "communicator": {
            "title": "Divide and Conquer Sorting Presentation",
            "description": "Create a 10-15 minute presentation explaining divide-and-conquer sorting. Include: (1) Divide-and-conquer paradigm overview, (2) How merge sort works with visual demonstration, (3) How quicksort works with pivot selection strategies, (4) Time complexity analysis using recurrence relations, (5) Comparison of both algorithms, (6) Real-world applications and optimizations. Use visual animations.",
            "guidelines": [
              "10-15 minute presentation with visual animations",
              "Explain divide-and-conquer paradigm with general structure",
              "Animate merge sort: show divide phase and merge phase clearly",
              "Animate quicksort: show partitioning and recursive calls",
              "Derive time complexity using recurrence relations visually",
              "Comparison table: stability, worst-case, space, when to use",
              "Discuss real-world optimizations (introsort, timsort)"
            ]
          }
        }
      },
      {
        "week": 6,
        "topic": "Dynamic Programming: Tabulation and Memoization",
        "description": "Master DP techniques: bottom-up (tabulation) and top-down (memoization). Solve classic DP problems.",
        "resources": [
          { "title": "Dynamic Programming", "url": "https://www.youtube.com/watch?v=oBt53YbR9Kk", "type": "Video" },
          { "title": "DP Tutorial", "url": "https://www.geeksforgeeks.org/dynamic-programming/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dynamic Programming Problem Solver Project",
            "description": "Build a comprehensive DP problem solver that implements both memoization and tabulation for multiple classic problems (Fibonacci, 0/1 Knapsack, Longest Common Subsequence, Edit Distance). Include visualization of the DP table filling process and comparison of time/space complexity between both approaches. Create a framework that can solve new DP problems.",
            "guidelines": [
              "Implement at least 4 classic DP problems (Fibonacci, Knapsack, LCS, Edit Distance)",
              "Both memoization and tabulation versions for each problem",
              "Visualization showing DP table filling (can be ASCII or simple graphics)",
              "Performance comparison: time and space for both approaches",
              "Framework/interface that makes it easy to add new DP problems",
              "Documentation explaining how to use the framework"
            ]
          },
          "academic": {
            "title": "Dynamic Programming Assessment",
            "description": "Complete a written test covering: (1) Identifying when to use DP (optimal substructure, overlapping subproblems), (2) Converting recursive solution to memoized version, (3) Converting memoized solution to tabulation, (4) Space optimization techniques, (5) Solving 5-7 DP problems with both approaches, (6) Time/space complexity analysis. Submit detailed solutions with DP table traces.",
            "guidelines": [
              "Identify optimal substructure and overlapping subproblems in given problems",
              "Convert recursive Fibonacci to memoized version with code",
              "Convert memoized solution to tabulation with code",
              "Show space optimization: 2D DP → 1D DP (e.g., knapsack)",
              "Solve 5-7 DP problems showing DP table traces (fill tables step-by-step)",
              "Analyze time/space complexity for each problem and approach"
            ]
          },
          "communicator": {
            "title": "Dynamic Programming Presentation",
            "description": "Create a 10-15 minute presentation explaining dynamic programming. Include: (1) What is DP and when to use it, (2) Memoization vs tabulation with examples, (3) Step-by-step solution of a classic problem (e.g., knapsack) showing both approaches, (4) DP table visualization, (5) Common DP patterns (1D, 2D, knapsack, LCS), (6) Real-world applications. Use visual aids and live coding.",
            "guidelines": [
              "10-15 minute presentation with DP table visualizations",
              "Explain when to use DP: optimal substructure + overlapping subproblems",
              "Compare memoization vs tabulation with side-by-side examples",
              "Walk through complete solution of knapsack problem showing table filling",
              "Cover common DP patterns with examples (1D, 2D, knapsack, LCS)",
              "Discuss real-world applications (sequence alignment, resource allocation)"
            ]
          }
        }
      },
      {
        "week": 7,
        "topic": "Greedy Algorithms: Design and Proof Techniques",
        "description": "Learn when greedy algorithms work. Study activity selection, fractional knapsack, and Huffman coding.",
        "resources": [
          { "title": "Greedy Algorithms", "url": "https://www.youtube.com/watch?v=HzeK7g8cD0Y", "type": "Video" },
          { "title": "Greedy Strategy", "url": "https://www.geeksforgeeks.org/greedy-algorithms/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Greedy Algorithms Implementation Portfolio",
            "description": "Implement three greedy algorithms: Activity Selection, Fractional Knapsack, and Huffman Coding. For each, create a visualization showing the greedy choices being made step-by-step. Build a comparison tool showing when greedy works vs when it fails (e.g., 0/1 knapsack). Include proof sketches for why each greedy choice is optimal.",
            "guidelines": [
              "Working implementations of Activity Selection, Fractional Knapsack, and Huffman Coding",
              "Visualization showing greedy choices step-by-step for each algorithm",
              "Comparison tool demonstrating greedy success vs failure (0/1 knapsack counterexample)",
              "Proof sketches explaining why each greedy choice is optimal",
              "Test cases for each algorithm with different inputs",
              "Documentation explaining the greedy strategy for each problem"
            ]
          },
          "academic": {
            "title": "Greedy Algorithms Assessment",
            "description": "Complete a written test covering: (1) Greedy choice property and optimal substructure, (2) Step-by-step execution of activity selection, fractional knapsack, and Huffman coding, (3) Proof of correctness for one greedy algorithm (e.g., activity selection), (4) When greedy algorithms fail (0/1 knapsack example), (5) Comparison with DP solutions. Submit detailed solutions with proofs.",
            "guidelines": [
              "Define greedy choice property and optimal substructure clearly",
              "Show step-by-step execution of all three algorithms on provided inputs",
              "Provide formal proof of correctness for activity selection (or another chosen algorithm)",
              "Demonstrate when greedy fails: show 0/1 knapsack counterexample",
              "Compare greedy vs DP solution for same problem (e.g., activity selection vs weighted activity selection)",
              "All proofs must be rigorous with clear logical steps"
            ]
          },
          "communicator": {
            "title": "Greedy Algorithms Presentation",
            "description": "Create a 10-15 minute presentation explaining greedy algorithms. Include: (1) What makes an algorithm greedy, (2) Greedy choice property and optimal substructure, (3) Step-by-step examples of 2-3 greedy algorithms, (4) Proof techniques for greedy correctness, (5) When greedy fails and why, (6) Real-world applications (scheduling, compression). Use visual demonstrations.",
            "guidelines": [
              "10-15 minute presentation with visual demonstrations",
              "Define what makes an algorithm greedy with clear examples",
              "Explain greedy choice property and optimal substructure conceptually",
              "Walk through 2-3 greedy algorithms step-by-step with visual aids",
              "Explain proof techniques (exchange argument, cut-and-paste) with example",
              "Show when greedy fails with concrete counterexample",
              "Discuss real-world applications with specific use cases"
            ]
          }
        }
      },
      {
        "week": 8,
        "topic": "Complexity Theory: P vs NP and NP-Completeness",
        "description": "Introduction to computational complexity. Understand P, NP, NP-complete, and reductions.",
        "resources": [
          { "title": "P vs NP", "url": "https://www.youtube.com/watch?v=YX40hbAHx3s", "type": "Video" },
          { "title": "NP-Completeness", "url": "https://www.geeksforgeeks.org/np-completeness-set-1/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Complexity Theory Problem Classifier",
            "description": "Build a tool that classifies problems into complexity classes (P, NP, NP-Complete, NP-Hard). Implement polynomial-time reductions between problems (e.g., reduce 3-SAT to Vertex Cover). Create visualizations showing the relationships between complexity classes and include examples of problems in each class. Build a decision tree for classifying new problems.",
            "guidelines": [
              "Tool that classifies at least 10 problems into complexity classes",
              "Implement at least one polynomial-time reduction (e.g., 3-SAT to Vertex Cover)",
              "Visualization showing relationships between P, NP, NP-Complete, NP-Hard",
              "Examples of problems in each class with brief explanations",
              "Decision tree or flowchart for classifying new problems",
              "Documentation explaining how reductions work"
            ]
          },
          "academic": {
            "title": "Complexity Theory Assessment",
            "description": "Complete a written test covering: (1) Definitions of P, NP, NP-Complete, NP-Hard, (2) Relationship between complexity classes, (3) Polynomial-time reduction from one NP-Complete problem to another, (4) Identifying which complexity class various problems belong to, (5) Cook-Levin theorem overview, (6) Implications of P=NP. Submit detailed solutions with proofs where applicable.",
            "guidelines": [
              "Provide formal definitions of P, NP, NP-Complete, NP-Hard",
              "Draw and explain the relationship diagram between complexity classes",
              "Perform polynomial-time reduction from 3-SAT to another NP-Complete problem (show transformation)",
              "Classify at least 5 problems into their complexity classes with justification",
              "Explain Cook-Levin theorem and its significance",
              "Discuss implications of P=NP (what would it mean if proven?)"
            ]
          },
          "communicator": {
            "title": "Complexity Theory Presentation",
            "description": "Create a 10-15 minute presentation explaining computational complexity. Include: (1) P vs NP problem explained simply, (2) Definitions of P, NP, NP-Complete, NP-Hard with examples, (3) Polynomial-time reductions with an example, (4) Why NP-Complete problems are important, (5) Implications of solving P vs NP, (6) Approximation algorithms for NP-Complete problems. Use visual diagrams of complexity class relationships.",
            "guidelines": [
              "10-15 minute presentation with visual diagrams",
              "Explain P vs NP problem in accessible terms (no heavy math jargon)",
              "Define each complexity class with concrete problem examples",
              "Walk through one polynomial-time reduction step-by-step",
              "Explain why NP-Complete problems matter (practical implications)",
              "Discuss what solving P vs NP would mean for cryptography, optimization",
              "Cover approximation algorithms as practical solution for NP-Complete problems"
            ]
          }
        }
      },
      {
        "week": 9,
        "topic": "Final Assessment: Algorithm Design Portfolio",
        "description": "Complete one Ellis Activity demonstrating mastery of algorithm design and analysis.",
        "resources": [],
        "deliverables": {
          "builder": {
            "title": "Comprehensive Algorithm Library Project",
            "description": "Build a complete algorithm library covering all topics from the course: graph algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall, MST), divide-and-conquer sorting, dynamic programming solutions, and greedy algorithms. Include comprehensive testing, documentation, complexity analysis, and visualizations. Create a unified interface for accessing all algorithms.",
            "guidelines": [
              "Implement at least 8 algorithms covering all course topics",
              "Comprehensive test suite with edge cases for each algorithm",
              "Full documentation: API reference, usage examples, complexity analysis",
              "Visualizations for at least 3 algorithms showing execution",
              "Unified interface/API for accessing all algorithms",
              "Performance benchmarks comparing implementations",
              "README with installation, usage, and contribution guidelines"
            ]
          },
          "academic": {
            "title": "Comprehensive Algorithm Design Exam",
            "description": "Complete a comprehensive written exam covering all course topics: (1) Design and analyze algorithms for new problems, (2) Choose appropriate algorithm paradigms, (3) Prove correctness and analyze complexity, (4) Compare different approaches, (5) Solve 5-7 complex problems requiring multiple techniques. Submit detailed solutions with proofs and analysis.",
            "guidelines": [
              "Design algorithms for 2-3 new problems not covered in class",
              "Justify choice of algorithm paradigm (greedy, DP, divide-and-conquer, etc.)",
              "Provide correctness proofs for at least 2 algorithms",
              "Complete complexity analysis (time and space) for all solutions",
              "Compare different approaches to same problem (e.g., greedy vs DP)",
              "Solve 5-7 complex problems requiring multiple techniques",
              "All solutions must be rigorous with clear reasoning"
            ]
          },
          "communicator": {
            "title": "Algorithm Design Course Presentation",
            "description": "Create a 20-30 minute comprehensive presentation summarizing the entire course. Include: (1) Overview of all algorithm paradigms covered, (2) When to use each approach with examples, (3) Complexity analysis techniques, (4) Real-world applications of algorithms, (5) Your favorite algorithm and why, (6) Future learning directions. Use visual aids and live demonstrations.",
            "guidelines": [
              "20-30 minute comprehensive presentation",
              "Overview of all paradigms: greedy, DP, divide-and-conquer, graph algorithms",
              "Decision framework: when to use each paradigm with examples",
              "Explain complexity analysis techniques (recurrence relations, Master Theorem, etc.)",
              "Real-world applications with specific examples for each paradigm",
              "Deep dive into your favorite algorithm: why you chose it, how it works, applications",
              "Future learning directions: advanced topics, research areas, practical skills",
              "Engaging visuals, clear structure, and confident delivery"
            ]
          }
        }
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Algorithm Library",
        "description": "Implement a library of algorithms: graph algorithms (Dijkstra, MST), sorting, DP solutions, and greedy algorithms with complexity analysis."
      },
      "academic": {
        "title": "Algorithm Problem Marathon",
        "description": "Solve 30-40 LeetCode/HackerRank problems covering all major algorithm paradigms: graphs, DP, greedy, and divide-and-conquer."
      },
      "communicator": {
        "title": "Algorithm Explanation Series",
        "description": "Create video tutorials explaining 3-4 complex algorithms (e.g., Dijkstra, DP, MST) with visualizations and step-by-step walkthroughs."
      }
    }
  },

  "Sys 301: Operating Systems (OS)": {
    "prereqs": ["Sys 201: Computer Systems (The Hardware/Software Interface)", "CS 102: Data Structures & Functional Utility"],
    "description": "Building the software that manages the hardware. Famous for massive C coding projects (building a kernel, file system, or shell).",
    "tier": 2,
    "weeks": [
      {
        "week": 1,
        "topic": "Concurrency: Processes vs Threads",
        "description": "Understand the difference between processes and threads. Learn process creation and management.",
        "resources": [
          { "title": "Processes and Threads", "url": "https://www.youtube.com/watch?v=mXw9ruZaxzQ", "type": "Video" },
          { "title": "Process Management", "url": "https://www.geeksforgeeks.org/operating-systems/", "type": "Article" }
        ],
        "deliverable": "Write C programs using fork() to create processes. Compare process vs thread creation overhead."
      },
      {
        "week": 2,
        "topic": "Race Conditions and Synchronization",
        "description": "Understand race conditions, critical sections, and why synchronization is needed.",
        "resources": [
          { "title": "Race Conditions", "url": "https://www.youtube.com/watch?v=p4RZQF3cSkg", "type": "Video" },
          { "title": "Synchronization", "url": "https://www.geeksforgeeks.org/process-synchronization-in-operating-system/", "type": "Article" }
        ],
        "deliverable": "Write a program that demonstrates a race condition. Fix it using synchronization primitives."
      },
      {
        "week": 3,
        "topic": "Locks, Semaphores, and Mutexes",
        "description": "Implement synchronization using locks, semaphores, and mutexes. Understand deadlock.",
        "resources": [
          { "title": "Locks and Semaphores", "url": "https://www.youtube.com/watch?v=8X9c6r6pI0c", "type": "Video" },
          { "title": "Semaphores", "url": "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/", "type": "Article" }
        ],
        "deliverable": "Implement producer-consumer and reader-writer problems using semaphores. Detect and prevent deadlock."
      },
      {
        "week": 4,
        "topic": "CPU Scheduling: Context Switching and Algorithms",
        "description": "Learn CPU scheduling algorithms: FCFS, Round Robin, Priority, and SJF. Understand context switching.",
        "resources": [
          { "title": "CPU Scheduling", "url": "https://www.youtube.com/watch?v=CSZLNYF-768", "type": "Video" },
          { "title": "Scheduling Algorithms", "url": "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/", "type": "Article" }
        ],
        "deliverable": "Simulate 4 CPU scheduling algorithms. Compare average waiting time and turnaround time."
      },
      {
        "week": 5,
        "topic": "Virtual Memory: Paging and Segmentation",
        "description": "Understand virtual memory, paging, segmentation, and how addresses are translated.",
        "resources": [
          { "title": "Virtual Memory", "url": "https://www.youtube.com/watch?v=7aNVGkltFRM", "type": "Video" },
          { "title": "Paging", "url": "https://www.geeksforgeeks.org/paging-in-operating-system/", "type": "Article" }
        ],
        "deliverable": "Simulate paging with page tables. Handle page faults and implement page replacement algorithms (LRU, FIFO)."
      },
      {
        "week": 6,
        "topic": "TLBs, Page Faults, and Caching Strategies",
        "description": "Learn Translation Lookaside Buffers (TLBs), page fault handling, and memory caching strategies.",
        "resources": [
          { "title": "TLB and Page Faults", "url": "https://www.youtube.com/watch?v=7aNVGkltFRM", "type": "Video" },
          { "title": "Page Replacement", "url": "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/", "type": "Article" }
        ],
        "deliverable": "Implement LRU and FIFO page replacement. Analyze TLB hit rates and page fault frequencies."
      },
      {
        "week": 7,
        "topic": "File Systems: inodes, Journaling, and I/O",
        "description": "Understand how file systems organize data. Learn about inodes, directories, and journaling.",
        "resources": [
          { "title": "File Systems", "url": "https://www.youtube.com/watch?v=h3BteVQKfD0", "type": "Video" },
          { "title": "File System Structure", "url": "https://www.geeksforgeeks.org/file-systems-in-operating-system/", "type": "Article" }
        ],
        "deliverable": "Design a simple file system structure. Implement basic file operations (create, read, write, delete)."
      },
      {
        "week": 8,
        "topic": "OS Project: Build a Mini Shell or Kernel Module",
        "description": "Apply OS concepts by building a simple shell or kernel module.",
        "resources": [
          { "title": "Building a Shell", "url": "https://www.youtube.com/watch?v=z4LEuxMGGs8", "type": "Video" },
          { "title": "Shell Implementation", "url": "https://www.geeksforgeeks.org/making-linux-shell-c/", "type": "Article" }
        ],
        "deliverable": "Build a mini shell that supports commands, pipes, and background processes. OR implement a kernel module."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Operating Systems Portfolio",
        "description": "Complete one Ellis Activity demonstrating mastery of operating systems concepts.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (OS project, problem set, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Operating System Component",
        "description": "Build a significant OS component: a mini shell with pipes/redirection, a simple file system, or a process scheduler simulator."
      },
      "academic": {
        "title": "Operating Systems Problem Set",
        "description": "Complete 25-30 problems covering processes, threads, synchronization, scheduling, memory management, and file systems."
      },
      "communicator": {
        "title": "OS Concepts Tutorial",
        "description": "Create a comprehensive tutorial explaining OS concepts (processes, memory, file systems) with diagrams and code examples."
      }
    }
  },

  "CS 302: Modern Software Engineering (Web Systems)": {
    "prereqs": ["CS 102: Data Structures & Functional Utility"],
    "description": "The 'Practical' core. Translating theory into shipped, scalable, maintainable products.",
    "tier": 2,
    "weeks": [
      {
        "week": 1,
        "topic": "Full Stack Architecture: REST and GraphQL APIs",
        "description": "Learn RESTful API design and GraphQL. Understand client-server model and HTTP methods.",
        "resources": [
          { "title": "REST API Tutorial", "url": "https://www.youtube.com/watch?v=Q-BpqyOT3a8", "type": "Video" },
          { "title": "GraphQL Basics", "url": "https://www.youtube.com/watch?v=ed8SzALpx1Q", "type": "Video" }
        ],
        "deliverable": "Design and implement a REST API with 5 endpoints. Create a simple GraphQL API."
      },
      {
        "week": 2,
        "topic": "MVC Patterns and Backend Frameworks",
        "description": "Understand Model-View-Controller architecture. Build a backend using Express.js, Flask, or similar.",
        "resources": [
          { "title": "MVC Pattern", "url": "https://www.youtube.com/watch?v=1IsL6g2ixak", "type": "Video" },
          { "title": "Express.js Tutorial", "url": "https://www.youtube.com/watch?v=SccSCuHhOw0", "type": "Video" }
        ],
        "deliverable": "Build a backend application using MVC pattern. Implement routes, controllers, and models."
      },
      {
        "week": 3,
        "topic": "Database Integration: ORMs and SQL",
        "description": "Learn SQL basics and use ORMs (Object-Relational Mapping) to interact with databases.",
        "resources": [
          { "title": "SQL Tutorial", "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY", "type": "Video" },
          { "title": "ORM Basics", "url": "https://www.youtube.com/watch?v=6WcC7Vq1jqE", "type": "Video" }
        ],
        "deliverable": "Design a database schema. Use an ORM (Sequelize, SQLAlchemy, etc.) to perform CRUD operations."
      },
      {
        "week": 4,
        "topic": "SQL vs NoSQL: Trade-offs and Data Modeling",
        "description": "Compare SQL and NoSQL databases. Learn when to use each. Model data for both.",
        "resources": [
          { "title": "SQL vs NoSQL", "url": "https://www.youtube.com/watch?v=Q5aTUc7c4jg", "type": "Video" },
          { "title": "Database Comparison", "url": "https://www.mongodb.com/nosql-explained", "type": "Article" }
        ],
        "deliverable": "Design the same application using SQL and NoSQL. Compare schemas and query patterns."
      },
      {
        "week": 5,
        "topic": "DevOps: CI/CD Pipelines with GitHub Actions",
        "description": "Set up continuous integration and deployment. Automate testing and deployment.",
        "resources": [
          { "title": "GitHub Actions", "url": "https://www.youtube.com/watch?v=R8_veQiYBjI", "type": "Video" },
          { "title": "CI/CD Basics", "url": "https://www.youtube.com/watch?v=scEDHsr3APg", "type": "Video" }
        ],
        "deliverable": "Set up a CI/CD pipeline for your project. Automate tests and deploy to a staging environment."
      },
      {
        "week": 6,
        "topic": "Containerization: Docker and Container Orchestration",
        "description": "Learn Docker basics. Containerize applications and understand container orchestration.",
        "resources": [
          { "title": "Docker Tutorial", "url": "https://www.youtube.com/watch?v=fqMOX6JJhGo", "type": "Video" },
          { "title": "Docker Basics", "url": "https://docs.docker.com/get-started/", "type": "Article" }
        ],
        "deliverable": "Containerize your web application. Create Dockerfiles and docker-compose configurations."
      },
      {
        "week": 7,
        "topic": "Cloud Deployment: AWS, Heroku, or Vercel",
        "description": "Deploy applications to the cloud. Learn cloud services and infrastructure.",
        "resources": [
          { "title": "AWS Tutorial", "url": "https://www.youtube.com/watch?v=ulprqHHWlng", "type": "Video" },
          { "title": "Cloud Deployment", "url": "https://www.youtube.com/watch?v=7B7YxqY3VgY", "type": "Video" }
        ],
        "deliverable": "Deploy your full-stack application to a cloud platform. Configure environment variables and domains."
      },
      {
        "week": 8,
        "topic": "Collaboration: Agile/Scrum, Code Reviews, and Testing",
        "description": "Learn software development practices: Agile methodology, code reviews, and testing strategies.",
        "resources": [
          { "title": "Agile Methodology", "url": "https://www.youtube.com/watch?v=Z9QbYZh1YXY", "type": "Video" },
          { "title": "Testing Strategies", "url": "https://www.youtube.com/watch?v=urrfJgHwIJA", "type": "Video" }
        ],
        "deliverable": "Write unit, integration, and end-to-end tests for your application. Conduct a code review."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Full-Stack Web Application",
        "description": "Complete one Ellis Activity demonstrating mastery of modern software engineering.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (full-stack project, deployment guide, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Full-Stack Web Application",
        "description": "Build a complete full-stack web application with frontend, backend API, database, CI/CD, and cloud deployment."
      },
      "academic": {
        "title": "Software Engineering Case Study",
        "description": "Analyze a real-world software system. Document architecture, design patterns, and deployment strategy."
      },
      "communicator": {
        "title": "Web Development Tutorial Series",
        "description": "Create a tutorial series teaching full-stack development: API design, database integration, and deployment."
      }
    }
  },

  // ============================================
  // TIER 3: Senior Tracks / Specializations
  // ============================================

  // Track A: Artificial Intelligence
  "AI 401: Intro to Machine Learning": {
    "prereqs": ["CS 301: Design & Analysis of Algorithms", "Linear Algebra"],
    "description": "Introduction to machine learning: regression, classification, neural networks, and backpropagation.",
    "tier": 3,
    "track": "Artificial Intelligence",
    "weeks": [
      {
        "week": 1,
        "topic": "Linear Regression and Gradient Descent",
        "description": "Learn linear regression from scratch. Implement gradient descent optimization.",
        "resources": [
          { "title": "Linear Regression", "url": "https://www.youtube.com/watch?v=4PHI11lX11I", "type": "Video" },
          { "title": "Gradient Descent", "url": "https://www.youtube.com/watch?v=sDv4f4s2SB8", "type": "Video" }
        ],
        "deliverable": "Implement linear regression with gradient descent from scratch. Visualize the learning process."
      },
      {
        "week": 2,
        "topic": "Classification: Logistic Regression",
        "description": "Learn logistic regression for binary classification. Understand the sigmoid function and loss.",
        "resources": [
          { "title": "Logistic Regression", "url": "https://www.youtube.com/watch?v=yIYKR4sgzI8", "type": "Video" },
          { "title": "Classification Basics", "url": "https://www.youtube.com/watch?v=J5bXOOmkopc", "type": "Video" }
        ],
        "deliverable": "Implement logistic regression. Classify a dataset and evaluate accuracy, precision, and recall."
      },
      {
        "week": 3,
        "topic": "Neural Networks: Perceptrons and Multi-Layer Networks",
        "description": "Build neural networks from scratch. Understand forward propagation and activation functions.",
        "resources": [
          { "title": "Neural Networks", "url": "https://www.youtube.com/watch?v=aircAruvnKk", "type": "Video" },
          { "title": "Building Neural Networks", "url": "https://www.youtube.com/watch?v=Ilg3gGewQ5U", "type": "Video" }
        ],
        "deliverable": "Implement a multi-layer neural network from scratch. Train it on a classification problem."
      },
      {
        "week": 4,
        "topic": "Backpropagation: Training Neural Networks",
        "description": "Master backpropagation algorithm. Understand how gradients flow through the network.",
        "resources": [
          { "title": "Backpropagation", "url": "https://www.youtube.com/watch?v=Ilg3gGewQ5U", "type": "Video" },
          { "title": "Backpropagation Explained", "url": "https://www.youtube.com/watch?v=GlcnxUlrtek", "type": "Video" }
        ],
        "deliverable": "Implement backpropagation manually. Train a neural network and visualize weight updates."
      },
      {
        "week": 5,
        "topic": "Overfitting, Regularization, and Validation",
        "description": "Learn to prevent overfitting using regularization (L1, L2) and cross-validation.",
        "resources": [
          { "title": "Overfitting and Regularization", "url": "https://www.youtube.com/watch?v=K3RjoP8kMqY", "type": "Video" },
          { "title": "Cross-Validation", "url": "https://www.youtube.com/watch?v=TIgfjmp-4BA", "type": "Video" }
        ],
        "deliverable": "Implement L2 regularization. Use cross-validation to tune hyperparameters and prevent overfitting."
      },
      {
        "week": 6,
        "topic": "Deep Learning Frameworks: PyTorch or TensorFlow",
        "description": "Learn to use PyTorch or TensorFlow. Build and train models using high-level APIs.",
        "resources": [
          { "title": "PyTorch Tutorial", "url": "https://www.youtube.com/watch?v=ORMx45xqWkA", "type": "Video" },
          { "title": "TensorFlow Basics", "url": "https://www.youtube.com/watch?v=tPYj3fFJGjk", "type": "Video" }
        ],
        "deliverable": "Build a neural network using PyTorch or TensorFlow. Train it on a real dataset (MNIST, CIFAR-10)."
      },
      {
        "week": 7,
        "topic": "Convolutional Neural Networks (CNNs) for Computer Vision",
        "description": "Introduction to CNNs. Learn convolutions, pooling, and image classification.",
        "resources": [
          { "title": "CNNs Explained", "url": "https://www.youtube.com/watch?v=FmpDIaiMIeA", "type": "Video" },
          { "title": "Computer Vision", "url": "https://www.youtube.com/watch?v=aircAruvnKk", "type": "Video" }
        ],
        "deliverable": "Build a CNN for image classification. Train on CIFAR-10 or a custom image dataset."
      },
      {
        "week": 8,
        "topic": "Recurrent Neural Networks (RNNs) and LSTMs",
        "description": "Learn RNNs and LSTMs for sequence data. Understand vanishing gradients and solutions.",
        "resources": [
          { "title": "RNNs and LSTMs", "url": "https://www.youtube.com/watch?v=9zhrxE5PEg4", "type": "Video" },
          { "title": "LSTM Explained", "url": "https://www.youtube.com/watch?v=YCzL96nL7j0", "type": "Video" }
        ],
        "deliverable": "Build an LSTM for text classification or time series prediction. Compare with simple RNN."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Machine Learning Project",
        "description": "Complete one Ellis Activity demonstrating mastery of machine learning.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (ML project, model comparison, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "End-to-End ML Project",
        "description": "Build a complete ML project: data collection, preprocessing, model training, evaluation, and deployment."
      },
      "academic": {
        "title": "ML Algorithm Implementation",
        "description": "Implement 5-7 ML algorithms from scratch (linear regression, logistic regression, neural network, CNN, RNN) with detailed documentation."
      },
      "communicator": {
        "title": "ML Concepts Tutorial",
        "description": "Create a tutorial series explaining ML concepts (gradient descent, backpropagation, CNNs) with visualizations and code."
      }
    }
  },

  "AI 402: Deep Learning & Neural Networks": {
    "prereqs": ["AI 401: Intro to Machine Learning"],
    "description": "Advanced deep learning: CNNs for computer vision, RNNs/LSTMs for sequences, and Transformers with attention mechanisms.",
    "tier": 3,
    "track": "Artificial Intelligence",
    "weeks": [
      {
        "week": 1,
        "topic": "Advanced CNNs: Architectures and Transfer Learning",
        "description": "Study ResNet, VGG, and modern CNN architectures. Learn transfer learning and fine-tuning.",
        "resources": [
          { "title": "CNN Architectures", "url": "https://www.youtube.com/watch?v=aircAruvnKk", "type": "Video" },
          { "title": "Transfer Learning", "url": "https://www.youtube.com/watch?v=yofjFQddwHE", "type": "Video" }
        ],
        "deliverable": "Implement a ResNet or VGG architecture. Use transfer learning to fine-tune on a custom dataset."
      },
      {
        "week": 2,
        "topic": "Computer Vision: Object Detection and Segmentation",
        "description": "Learn YOLO, R-CNN, and semantic segmentation. Understand object detection pipelines.",
        "resources": [
          { "title": "Object Detection", "url": "https://www.youtube.com/watch?v=4m9F3oqybgk", "type": "Video" },
          { "title": "YOLO Algorithm", "url": "https://www.youtube.com/watch?v=MPU2HistivI", "type": "Video" }
        ],
        "deliverable": "Implement object detection using a pre-trained model. Detect objects in images or video."
      },
      {
        "week": 3,
        "topic": "RNNs and LSTMs: Advanced Sequence Modeling",
        "description": "Deep dive into RNNs, LSTMs, and GRUs. Understand sequence-to-sequence models.",
        "resources": [
          { "title": "Advanced RNNs", "url": "https://www.youtube.com/watch?v=9zhrxE5PEg4", "type": "Video" },
          { "title": "Sequence Models", "url": "https://www.youtube.com/watch?v=YCzL96nL7j0", "type": "Video" }
        ],
        "deliverable": "Build a sequence-to-sequence model for machine translation or text generation."
      },
      {
        "week": 4,
        "topic": "Transformers: Attention Mechanisms",
        "description": "Learn the Transformer architecture. Understand self-attention and multi-head attention.",
        "resources": [
          { "title": "Transformers", "url": "https://www.youtube.com/watch?v=U0s0f995w14", "type": "Video" },
          { "title": "Attention Mechanism", "url": "https://www.youtube.com/watch?v=5vcj8kSwBCY", "type": "Video" }
        ],
        "deliverable": "Implement a Transformer from scratch. Build a simple language model or translation system."
      },
      {
        "week": 5,
        "topic": "BERT and Pre-trained Language Models",
        "description": "Study BERT, GPT, and other pre-trained models. Learn fine-tuning for NLP tasks.",
        "resources": [
          { "title": "BERT Explained", "url": "https://www.youtube.com/watch?v=xI0HHN5XKDo", "type": "Video" },
          { "title": "GPT Models", "url": "https://www.youtube.com/watch?v=kCc8FmEb1nY", "type": "Video" }
        ],
        "deliverable": "Fine-tune BERT or GPT on a custom NLP task (sentiment analysis, question answering, etc.)."
      },
      {
        "week": 6,
        "topic": "Generative Models: GANs and VAEs",
        "description": "Learn Generative Adversarial Networks (GANs) and Variational Autoencoders (VAEs).",
        "resources": [
          { "title": "GANs Explained", "url": "https://www.youtube.com/watch?v=JPBz7-UCqRg", "type": "Video" },
          { "title": "VAEs Tutorial", "url": "https://www.youtube.com/watch?v=9zKuYvjFFS8", "type": "Video" }
        ],
        "deliverable": "Implement a GAN or VAE. Generate images or other data samples."
      },
      {
        "week": 7,
        "topic": "Reinforcement Learning: Q-Learning and Deep Q-Networks",
        "description": "Introduction to reinforcement learning. Learn Q-learning and Deep Q-Networks (DQN).",
        "resources": [
          { "title": "Reinforcement Learning", "url": "https://www.youtube.com/watch?v=JgvyzIkgxF0", "type": "Video" },
          { "title": "Deep Q-Learning", "url": "https://www.youtube.com/watch?v=wrBUkpiRvCA", "type": "Video" }
        ],
        "deliverable": "Implement Q-learning and DQN. Train an agent to play a simple game (e.g., CartPole, Atari)."
      },
      {
        "week": 8,
        "topic": "Advanced Topics: Optimization and Regularization",
        "description": "Study advanced optimization (Adam, RMSprop), batch normalization, and dropout.",
        "resources": [
          { "title": "Optimization Algorithms", "url": "https://www.youtube.com/watch?v=k8fTYJPd3_I", "type": "Video" },
          { "title": "Batch Normalization", "url": "https://www.youtube.com/watch?v=dXB-KQYkzNU", "type": "Video" }
        ],
        "deliverable": "Compare different optimizers. Implement batch normalization and dropout in a neural network."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Deep Learning Research Project",
        "description": "Complete one Ellis Activity demonstrating mastery of deep learning.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (research project, model implementation, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Advanced Deep Learning Project",
        "description": "Build a sophisticated deep learning project: image generation with GANs, language model fine-tuning, or reinforcement learning agent."
      },
      "academic": {
        "title": "Deep Learning Architecture Implementation",
        "description": "Implement 3-4 advanced architectures from scratch: Transformer, GAN, or DQN with detailed analysis."
      },
      "communicator": {
        "title": "Deep Learning Tutorial Series",
        "description": "Create comprehensive tutorials explaining advanced concepts: attention mechanisms, GANs, or reinforcement learning."
      }
    }
  },

  // Track B: Systems & Data
  "Sys 401: Database System Implementation": {
    "prereqs": ["Sys 301: Operating Systems (OS)", "CS 102: Data Structures & Functional Utility"],
    "description": "Building a database engine (not just using SQL). B+ Trees, buffer management, query optimization, ACID transactions, and WAL.",
    "tier": 3,
    "track": "Systems & Data",
    "weeks": [
      {
        "week": 1,
        "topic": "Database Architecture: Storage and Buffer Management",
        "description": "Understand how databases store data on disk. Learn buffer pool management and page replacement.",
        "resources": [
          { "title": "Database Internals", "url": "https://www.youtube.com/watch?v=W2Z7fbCLSTw", "type": "Video" },
          { "title": "Buffer Management", "url": "https://www.youtube.com/watch?v=Z_h3Jb1X8u8", "type": "Video" }
        ],
        "deliverable": "Implement a simple buffer pool manager with page replacement policies (LRU, Clock)."
      },
      {
        "week": 2,
        "topic": "B+ Trees: Index Structures",
        "description": "Master B+ tree data structure. Implement insertion, deletion, and search operations.",
        "resources": [
          { "title": "B+ Trees", "url": "https://www.youtube.com/watch?v=aZjYr87r1b8", "type": "Video" },
          { "title": "B+ Tree Implementation", "url": "https://www.geeksforgeeks.org/introduction-of-b-tree/", "type": "Article" }
        ],
        "deliverable": "Implement a B+ tree from scratch. Use it to build an index for a database table."
      },
      {
        "week": 3,
        "topic": "Query Processing: Parsing and Execution Plans",
        "description": "Learn SQL parsing and query execution. Understand execution plans and cost estimation.",
        "resources": [
          { "title": "Query Processing", "url": "https://www.youtube.com/watch?v=W2Z7fbCLSTw", "type": "Video" },
          { "title": "Query Optimization", "url": "https://www.youtube.com/watch?v=Z_h3Jb1X8u8", "type": "Video" }
        ],
        "deliverable": "Build a simple SQL parser. Generate and visualize query execution plans."
      },
      {
        "week": 4,
        "topic": "Query Optimization: Cost-Based Optimization",
        "description": "Learn query optimization techniques. Understand cost models and join algorithms.",
        "resources": [
          { "title": "Query Optimization", "url": "https://www.youtube.com/watch?v=Z_h3Jb1X8u8", "type": "Video" },
          { "title": "Join Algorithms", "url": "https://www.youtube.com/watch?v=W2Z7fbCLSTw", "type": "Video" }
        ],
        "deliverable": "Implement different join algorithms (nested loop, hash join, merge join). Compare performance."
      },
      {
        "week": 5,
        "topic": "ACID Transactions: Concurrency Control",
        "description": "Understand ACID properties. Implement locking and concurrency control mechanisms.",
        "resources": [
          { "title": "ACID Properties", "url": "https://www.youtube.com/watch?v=U3VjzEOA7WY", "type": "Video" },
          { "title": "Concurrency Control", "url": "https://www.youtube.com/watch?v=Z_h3Jb1X8u8", "type": "Video" }
        ],
        "deliverable": "Implement a transaction manager with locking. Handle deadlock detection and recovery."
      },
      {
        "week": 6,
        "topic": "Write-Ahead Logging (WAL) and Crash Recovery",
        "description": "Learn WAL protocol. Implement crash recovery and transaction logging.",
        "resources": [
          { "title": "Write-Ahead Logging", "url": "https://www.youtube.com/watch?v=Z_h3Jb1X8u8", "type": "Video" },
          { "title": "Crash Recovery", "url": "https://www.youtube.com/watch?v=W2Z7fbCLSTw", "type": "Video" }
        ],
        "deliverable": "Implement WAL for your database. Test crash recovery and ensure data durability."
      },
      {
        "week": 7,
        "topic": "Multi-Version Concurrency Control (MVCC)",
        "description": "Learn MVCC for snapshot isolation. Understand versioning and visibility rules.",
        "resources": [
          { "title": "MVCC Explained", "url": "https://www.youtube.com/watch?v=Z_h3Jb1X8u8", "type": "Video" },
          { "title": "Snapshot Isolation", "url": "https://www.youtube.com/watch?v=W2Z7fbCLSTw", "type": "Video" }
        ],
        "deliverable": "Implement MVCC in your database. Support read-committed and serializable isolation levels."
      },
      {
        "week": 8,
        "topic": "Database Project: Mini Database Engine",
        "description": "Build a complete mini database engine with storage, indexing, query processing, and transactions.",
        "resources": [
          { "title": "Building a Database", "url": "https://www.youtube.com/watch?v=W2Z7fbCLSTw", "type": "Video" },
          { "title": "Database Implementation", "url": "https://cstack.github.io/db_tutorial/", "type": "Article" }
        ],
        "deliverable": "Build a functional database engine supporting SQL queries, transactions, and crash recovery."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Database Systems Portfolio",
        "description": "Complete one Ellis Activity demonstrating mastery of database system implementation.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (database engine, research paper, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Mini Database Engine",
        "description": "Build a complete database engine with B+ tree indexing, query processing, ACID transactions, and WAL-based recovery."
      },
      "academic": {
        "title": "Database Systems Research",
        "description": "Research and implement a specific database technique (e.g., advanced indexing, query optimization, or distributed transactions)."
      },
      "communicator": {
        "title": "Database Internals Tutorial",
        "description": "Create a comprehensive tutorial explaining database internals: B+ trees, query optimization, or transaction management."
      }
    }
  },

  "Sys 402: Distributed Systems": {
    "prereqs": ["Sys 301: Operating Systems (OS)"],
    "description": "MapReduce, distributed consensus (Paxos/Raft), fault tolerance, scalability, and the CAP Theorem.",
    "tier": 3,
    "track": "Systems & Data",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Distributed Systems: Challenges and Models",
        "description": "Understand distributed system challenges: network failures, partial failures, and consistency.",
        "resources": [
          { "title": "Distributed Systems", "url": "https://www.youtube.com/watch?v=Y6Ev8GXbYV8", "type": "Video" },
          { "title": "Distributed Systems Basics", "url": "https://www.youtube.com/watch?v=7CmL5IP8y4U", "type": "Video" }
        ],
        "deliverable": "Write a report analyzing distributed system challenges. Compare different system models."
      },
      {
        "week": 2,
        "topic": "MapReduce: Distributed Data Processing",
        "description": "Learn MapReduce programming model. Implement map and reduce functions for parallel processing.",
        "resources": [
          { "title": "MapReduce Explained", "url": "https://www.youtube.com/watch?v=htEKd_VFfTs", "type": "Video" },
          { "title": "MapReduce Tutorial", "url": "https://www.youtube.com/watch?v=1Eyb3VgSHLc", "type": "Video" }
        ],
        "deliverable": "Implement a simple MapReduce framework. Process a large dataset using map and reduce operations."
      },
      {
        "week": 3,
        "topic": "Distributed Consensus: Paxos Algorithm",
        "description": "Master the Paxos algorithm for achieving consensus in distributed systems.",
        "resources": [
          { "title": "Paxos Algorithm", "url": "https://www.youtube.com/watch?v=JEpsBg0AO6o", "type": "Video" },
          { "title": "Consensus Algorithms", "url": "https://www.youtube.com/watch?v=JEpsBg0AO6o", "type": "Video" }
        ],
        "deliverable": "Implement a simplified Paxos algorithm. Simulate consensus in a distributed environment."
      },
      {
        "week": 4,
        "topic": "Raft: A Understandable Consensus Algorithm",
        "description": "Learn Raft algorithm as an alternative to Paxos. Understand leader election and log replication.",
        "resources": [
          { "title": "Raft Algorithm", "url": "https://www.youtube.com/watch?v=uXEYuDwm7e4", "type": "Video" },
          { "title": "Raft Explained", "url": "https://raft.github.io/", "type": "Article" }
        ],
        "deliverable": "Implement Raft consensus algorithm. Build a distributed key-value store using Raft."
      },
      {
        "week": 5,
        "topic": "Fault Tolerance: Replication and Failure Handling",
        "description": "Learn replication strategies. Implement failure detection and recovery mechanisms.",
        "resources": [
          { "title": "Fault Tolerance", "url": "https://www.youtube.com/watch?v=Y6Ev8GXbYV8", "type": "Video" },
          { "title": "Replication", "url": "https://www.youtube.com/watch?v=7CmL5IP8y4U", "type": "Video" }
        ],
        "deliverable": "Implement a replicated service with primary-backup replication. Handle node failures gracefully."
      },
      {
        "week": 6,
        "topic": "Scalability: Load Balancing and Sharding",
        "description": "Understand horizontal scaling. Learn load balancing and data sharding techniques.",
        "resources": [
          { "title": "Load Balancing", "url": "https://www.youtube.com/watch?v=K0Ta65Oiiw4", "type": "Video" },
          { "title": "Sharding", "url": "https://www.youtube.com/watch?v=5faMjKuB9bc", "type": "Video" }
        ],
        "deliverable": "Design and implement a sharded database system. Implement consistent hashing for shard assignment."
      },
      {
        "week": 7,
        "topic": "CAP Theorem: Consistency, Availability, Partition Tolerance",
        "description": "Understand the CAP theorem. Learn trade-offs between consistency and availability.",
        "resources": [
          { "title": "CAP Theorem", "url": "https://www.youtube.com/watch?v=k-Yaq8AHlFA", "type": "Video" },
          { "title": "CAP Explained", "url": "https://www.youtube.com/watch?v=BHqjEjzA3pM", "type": "Video" }
        ],
        "deliverable": "Analyze real distributed systems (Cassandra, MongoDB, etc.) in terms of CAP theorem. Design a system for specific CAP guarantees."
      },
      {
        "week": 8,
        "topic": "Distributed Systems Project: Building a Distributed Service",
        "description": "Build a distributed system: distributed cache, message queue, or key-value store.",
        "resources": [
          { "title": "Building Distributed Systems", "url": "https://www.youtube.com/watch?v=Y6Ev8GXbYV8", "type": "Video" },
          { "title": "Distributed Services", "url": "https://www.youtube.com/watch?v=7CmL5IP8y4U", "type": "Video" }
        ],
        "deliverable": "Build a distributed service (e.g., distributed cache or message queue) with replication and fault tolerance."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Distributed Systems Portfolio",
        "description": "Complete one Ellis Activity demonstrating mastery of distributed systems.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (distributed system implementation, research paper, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Distributed System Implementation",
        "description": "Build a complete distributed system: distributed key-value store, message queue, or cache with consensus, replication, and fault tolerance."
      },
      "academic": {
        "title": "Distributed Systems Research",
        "description": "Research and implement a distributed algorithm (Raft, Paxos, or Byzantine fault tolerance) with detailed analysis."
      },
      "communicator": {
        "title": "Distributed Systems Tutorial",
        "description": "Create a comprehensive tutorial explaining distributed systems concepts: consensus, CAP theorem, or replication strategies."
      }
    }
  },

  // Track C: Languages & Theory
  "CS 401: Programming Languages & Compilers": {
    "prereqs": ["Sys 201: Computer Systems (The Hardware/Software Interface)"],
    "description": "Lexical analysis, parsing (CFGs), Abstract Syntax Trees, type systems, code generation, and optimization.",
    "tier": 3,
    "track": "Languages & Theory",
    "weeks": [
      {
        "week": 1,
        "topic": "Lexical Analysis: Tokenization and Regular Expressions",
        "description": "Learn lexical analysis. Implement a tokenizer using regular expressions and finite automata.",
        "resources": [
          { "title": "Lexical Analysis", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "Regular Expressions", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Implement a lexical analyzer (tokenizer) for a simple programming language."
      },
      {
        "week": 2,
        "topic": "Parsing: Context-Free Grammars and Recursive Descent",
        "description": "Learn context-free grammars. Implement recursive descent and LL parsing.",
        "resources": [
          { "title": "Parsing", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "CFG and Parsing", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Write a context-free grammar for a simple language. Implement a recursive descent parser."
      },
      {
        "week": 3,
        "topic": "Abstract Syntax Trees (ASTs)",
        "description": "Build Abstract Syntax Trees from parse trees. Design AST node structures.",
        "resources": [
          { "title": "Abstract Syntax Trees", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "AST Construction", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Build an AST from your parser. Implement tree traversal and pretty-printing."
      },
      {
        "week": 4,
        "topic": "Type Systems: Static Typing and Type Checking",
        "description": "Learn type systems. Implement type checking for a statically typed language.",
        "resources": [
          { "title": "Type Systems", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "Type Checking", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Implement a type checker for your language. Support basic types and type inference."
      },
      {
        "week": 5,
        "topic": "Semantic Analysis: Symbol Tables and Scoping",
        "description": "Build symbol tables. Implement scoping rules and name resolution.",
        "resources": [
          { "title": "Symbol Tables", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "Scoping", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Implement symbol tables with scoping. Resolve variable and function names."
      },
      {
        "week": 6,
        "topic": "Code Generation: Intermediate Representation",
        "description": "Learn intermediate representations (IR). Generate IR from AST.",
        "resources": [
          { "title": "Code Generation", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "Intermediate Representation", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Design an IR for your language. Generate IR code from AST."
      },
      {
        "week": 7,
        "topic": "Code Generation: Target Code and Assembly",
        "description": "Generate assembly or bytecode from IR. Understand instruction selection and register allocation.",
        "resources": [
          { "title": "Assembly Generation", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "Register Allocation", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Generate assembly code from IR. Implement basic register allocation."
      },
      {
        "week": 8,
        "topic": "Optimization: Constant Folding and Dead Code Elimination",
        "description": "Learn compiler optimizations: constant folding, dead code elimination, and basic optimizations.",
        "resources": [
          { "title": "Compiler Optimizations", "url": "https://www.youtube.com/watch?v=e4hZg5NcYx4", "type": "Video" },
          { "title": "Optimization Techniques", "url": "https://www.youtube.com/watch?v=sa-TUpSx1JA", "type": "Video" }
        ],
        "deliverable": "Implement 3-4 compiler optimizations. Measure performance improvements."
      },
      {
        "week": 9,
        "topic": "Final Assessment: Compiler Project",
        "description": "Complete one Ellis Activity demonstrating mastery of programming languages and compilers.",
        "resources": [],
        "deliverable": "Submit your chosen Ellis Activity (compiler implementation, language design, or teaching resource)."
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Complete Compiler",
        "description": "Build a complete compiler for a simple programming language: lexer, parser, type checker, and code generator."
      },
      "academic": {
        "title": "Language Design and Implementation",
        "description": "Design and implement a domain-specific language (DSL) with full compiler toolchain."
      },
      "communicator": {
        "title": "Compiler Construction Tutorial",
        "description": "Create a comprehensive tutorial series explaining compiler phases: lexing, parsing, type checking, and code generation."
      }
    }
  },

  // ============================================
  // TIER 3: Track A - Artificial Intelligence (Additional)
  // ============================================
  
  "AI 403: Reinforcement Learning": {
    "prereqs": ["AI 401: Intro to Machine Learning"],
    "description": "Teaching AI to play games and make decisions through trial and error. Learn the algorithms behind AlphaGo and game-playing agents.",
    "tier": 3,
    "track": "Artificial Intelligence",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Reinforcement Learning",
        "description": "Understand the RL framework: agents, environments, rewards, and policies.",
        "resources": [
          { "title": "Reinforcement Learning Basics", "url": "https://www.youtube.com/watch?v=JgvyzIkgxF0", "type": "Video" },
          { "title": "RL Tutorial Series", "url": "https://www.youtube.com/watch?v=2pWv7GOvuf0", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "RL Environment Template",
            "description": "Download and complete a simple RL environment (like a grid world). Implement the agent-environment interaction loop.",
            "guidelines": [
              "Download the template file provided",
              "Complete the environment step() and reset() methods",
              "Implement a random policy agent",
              "Test the agent-environment interaction",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "RL Fundamentals Assessment",
            "description": "Complete a written test on RL concepts: Markov Decision Processes, rewards, policies, and value functions.",
            "guidelines": [
              "Define MDP components: states, actions, transitions, rewards",
              "Explain the difference between policy and value function",
              "Compare model-based vs model-free RL",
              "All solutions must show clear understanding of RL framework"
            ]
          },
          "communicator": {
            "title": "RL Introduction Presentation",
            "description": "Create a 10-15 minute presentation explaining what reinforcement learning is and how it differs from supervised learning.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain the agent-environment loop",
              "Compare RL to supervised and unsupervised learning",
              "Use game examples (chess, Mario) to illustrate concepts",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  // ============================================
  // TIER 3: Track D - Cybersecurity
  // ============================================
  
  "Sec 301: Network & Computer Security": {
    "prereqs": ["Sys 201: Computer Systems (The Hardware/Software Interface)"],
    "description": "The 'Hacker' course. Learn how systems break to understand how to defend them. Covers vulnerabilities, exploits, and defense mechanisms.",
    "tier": 3,
    "track": "Cybersecurity",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Security and Threat Models",
        "description": "Understand security principles: confidentiality, integrity, availability. Learn common threat models and attack vectors.",
        "resources": [
          { "title": "Computer Security Basics", "url": "https://www.youtube.com/watch?v=inWWhr5tnEA", "type": "Video" },
          { "title": "Security Fundamentals", "url": "https://www.youtube.com/watch?v=3b86p7XGlqk", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Security Analysis Template",
            "description": "Download a template with vulnerable code examples. Identify security flaws and suggest fixes.",
            "guidelines": [
              "Download the template file provided",
              "Identify at least 5 security vulnerabilities",
              "Explain why each is a vulnerability",
              "Suggest fixes for each issue",
              "Submit your completed analysis"
            ]
          },
          "academic": {
            "title": "Security Fundamentals Assessment",
            "description": "Complete a written test on security principles, threat models, and common vulnerabilities.",
            "guidelines": [
              "Explain CIA triad (Confidentiality, Integrity, Availability)",
              "Describe common attack vectors",
              "Compare different threat models",
              "All solutions must demonstrate understanding of security principles"
            ]
          },
          "communicator": {
            "title": "Security Awareness Presentation",
            "description": "Create a 10-15 minute presentation explaining common security threats and how to protect against them.",
            "guidelines": [
              "10-15 minute presentation with real-world examples",
              "Explain common vulnerabilities (SQL injection, XSS, buffer overflow)",
              "Discuss defense mechanisms",
              "Use engaging examples and clear explanations"
            ]
          }
        }
      }
    ]
  },

  "Math 302: Cryptography": {
    "prereqs": ["Math 201: Discrete Mathematics for CS"],
    "description": "The math behind secrets. Learn how encryption works, from symmetric ciphers to public key cryptography and zero-knowledge proofs.",
    "tier": 3,
    "track": "Cybersecurity",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Cryptography and Symmetric Encryption",
        "description": "Learn the fundamentals of encryption: symmetric ciphers, one-time pads, and block ciphers like AES.",
        "resources": [
          { "title": "Cryptography Basics", "url": "https://www.youtube.com/watch?v=jhXCTbFnK8o", "type": "Video" },
          { "title": "Symmetric Encryption", "url": "https://www.youtube.com/watch?v=VFjP2ZLx8hU", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Encryption Template",
            "description": "Download a template implementing basic encryption. Complete the encryption and decryption functions.",
            "guidelines": [
              "Download the template file provided",
              "Complete the encryption function",
              "Complete the decryption function",
              "Test with sample plaintext",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Cryptography Fundamentals Assessment",
            "description": "Complete a written test on symmetric encryption, key management, and cryptographic properties.",
            "guidelines": [
              "Explain symmetric vs asymmetric encryption",
              "Describe properties of good ciphers",
              "Analyze security of different encryption methods",
              "All solutions must show mathematical understanding"
            ]
          },
          "communicator": {
            "title": "Cryptography Introduction Presentation",
            "description": "Create a 10-15 minute presentation explaining how encryption works and why it matters.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain encryption concepts in accessible terms",
              "Use real-world examples (HTTPS, messaging apps)",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  "Sec 402: Reverse Engineering & Malware Analysis": {
    "prereqs": ["Sys 201: Computer Systems (The Hardware/Software Interface)"],
    "description": "Disassembling viruses to see how they work. Learn to use tools like Ghidra and IDA Pro to analyze malicious code safely.",
    "tier": 3,
    "track": "Cybersecurity",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Reverse Engineering",
        "description": "Learn the basics of disassembly, decompilation, and analyzing binary code. Understand assembly language patterns.",
        "resources": [
          { "title": "Reverse Engineering Basics", "url": "https://www.youtube.com/watch?v=VroEiMOueMo", "type": "Video" },
          { "title": "Binary Analysis", "url": "https://www.youtube.com/watch?v=3NTXFUxcKPc", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Reverse Engineering Template",
            "description": "Download a template with a simple binary. Use Ghidra or similar tools to reverse engineer its functionality.",
            "guidelines": [
              "Download the template file provided",
              "Use Ghidra/IDA Pro to analyze the binary",
              "Document the program's functionality",
              "Identify key functions and their purposes",
              "Submit your analysis report"
            ]
          },
          "academic": {
            "title": "Reverse Engineering Assessment",
            "description": "Complete a written test on assembly language, disassembly techniques, and binary analysis.",
            "guidelines": [
              "Explain common assembly patterns",
              "Describe disassembly process",
              "Analyze control flow in binaries",
              "All solutions must demonstrate understanding of low-level code"
            ]
          },
          "communicator": {
            "title": "Reverse Engineering Presentation",
            "description": "Create a 10-15 minute presentation explaining what reverse engineering is and how it's used in security.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain reverse engineering process",
              "Discuss legal and ethical considerations",
              "Use safe, educational examples",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  // ============================================
  // TIER 3: Track E - Game Design & Simulation
  // ============================================
  
  "CS 403: Computer Graphics (Real-Time Rendering)": {
    "prereqs": ["CS 102: Data Structures & Functional Utility"],
    "description": "How to render millions of polygons onto the screen at 60 FPS. Learn the GPU pipeline, shaders, and 3D mathematics.",
    "tier": 3,
    "track": "Game Design & Simulation",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Computer Graphics and 3D Mathematics",
        "description": "Learn the fundamentals: coordinate systems, vectors, matrices, and transformations in 3D space.",
        "resources": [
          { "title": "Computer Graphics Basics", "url": "https://www.youtube.com/watch?v=HIvNePu7UEE", "type": "Video" },
          { "title": "3D Math for Graphics", "url": "https://www.youtube.com/watch?v=U0_ONQQ5ZNM", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Graphics Math Template",
            "description": "Download a template with 3D math functions. Complete matrix multiplication, vector operations, and transformations.",
            "guidelines": [
              "Download the template file provided",
              "Complete matrix multiplication function",
              "Complete vector operations (dot product, cross product)",
              "Implement translation, rotation, and scaling transformations",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Graphics Mathematics Assessment",
            "description": "Complete a written test on 3D mathematics, transformations, and coordinate systems.",
            "guidelines": [
              "Explain 3D coordinate systems",
              "Describe matrix transformations",
              "Calculate transformations for given scenarios",
              "All solutions must show mathematical work"
            ]
          },
          "communicator": {
            "title": "Graphics Introduction Presentation",
            "description": "Create a 10-15 minute presentation explaining how 3D graphics work and the mathematics behind them.",
            "guidelines": [
              "10-15 minute presentation with visual examples",
              "Explain 3D coordinate systems and transformations",
              "Use diagrams to illustrate concepts",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  "CS 405: Game Engine Architecture": {
    "prereqs": ["CS 102: Data Structures & Functional Utility"],
    "description": "Building 'Unity' from scratch. Learn the game loop, physics engines, entity component systems, and memory management for games.",
    "tier": 3,
    "track": "Game Design & Simulation",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Game Engines and The Game Loop",
        "description": "Understand the core architecture: the game loop, fixed vs variable timesteps, and game state management.",
        "resources": [
          { "title": "Game Engine Basics", "url": "https://www.youtube.com/watch?v=W7vXz2bq-0Y", "type": "Video" },
          { "title": "Game Loop Design", "url": "https://www.youtube.com/watch?v=4n_I6cYV7WY", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Game Loop Template",
            "description": "Download a template with a basic game structure. Implement the game loop with update and render phases.",
            "guidelines": [
              "Download the template file provided",
              "Complete the game loop (input, update, render)",
              "Implement fixed timestep logic",
              "Add basic game state management",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Game Engine Architecture Assessment",
            "description": "Complete a written test on game loop design, timesteps, and game state management.",
            "guidelines": [
              "Explain the game loop architecture",
              "Compare fixed vs variable timesteps",
              "Describe game state management patterns",
              "All solutions must show understanding of engine design"
            ]
          },
          "communicator": {
            "title": "Game Engine Presentation",
            "description": "Create a 10-15 minute presentation explaining how game engines work and their core components.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain the game loop and its phases",
              "Discuss common engine architectures",
              "Use examples from popular game engines",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  "CS 406: VR & Augmented Reality (XR)": {
    "prereqs": ["CS 403: Computer Graphics (Real-Time Rendering)"],
    "description": "Building immersive spatial interfaces. Learn head tracking, spatial audio, hand tracking, and SLAM algorithms.",
    "tier": 3,
    "track": "Game Design & Simulation",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to XR and Spatial Computing",
        "description": "Understand the fundamentals of VR/AR: tracking, rendering, and interaction in 3D space.",
        "resources": [
          { "title": "VR/AR Basics", "url": "https://www.youtube.com/watch?v=HBNH8tzsfVM", "type": "Video" },
          { "title": "Spatial Computing", "url": "https://www.youtube.com/watch?v=5TjXIsj1vK0", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "XR Template",
            "description": "Download a template for a basic VR/AR application. Implement head tracking and basic interactions.",
            "guidelines": [
              "Download the template file provided",
              "Implement head tracking",
              "Add basic hand/controller tracking",
              "Create a simple interactive scene",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "XR Fundamentals Assessment",
            "description": "Complete a written test on VR/AR concepts, tracking systems, and spatial computing.",
            "guidelines": [
              "Explain VR vs AR vs MR",
              "Describe tracking systems (6DOF, SLAM)",
              "Analyze challenges in XR development",
              "All solutions must show understanding of spatial computing"
            ]
          },
          "communicator": {
            "title": "XR Technology Presentation",
            "description": "Create a 10-15 minute presentation explaining VR/AR technology and its applications.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain VR/AR/MR differences",
              "Discuss tracking and rendering challenges",
              "Use real-world XR applications as examples",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  // ============================================
  // TIER 3: Track F - Futurist Electives
  // ============================================
  
  "CS 410: Quantum Computing": {
    "prereqs": ["Math 201: Discrete Mathematics for CS"],
    "description": "Coding for physics-defying computers. Learn qubits, superposition, entanglement, and quantum algorithms like Shor's algorithm.",
    "tier": 3,
    "track": "Futurist Electives",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Quantum Computing",
        "description": "Understand quantum mechanics basics: qubits, superposition, and measurement. Learn the difference between classical and quantum bits.",
        "resources": [
          { "title": "Quantum Computing Basics", "url": "https://www.youtube.com/watch?v=JhHMJCUmq28", "type": "Video" },
          { "title": "Qubits and Superposition", "url": "https://www.youtube.com/watch?v=zNzzGgr2mhk", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Quantum Circuit Template",
            "description": "Download a template using Qiskit or similar. Implement basic quantum gates and simple quantum circuits.",
            "guidelines": [
              "Download the template file provided",
              "Implement basic quantum gates (Hadamard, CNOT)",
              "Create simple quantum circuits",
              "Run circuits on quantum simulators",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Quantum Computing Fundamentals Assessment",
            "description": "Complete a written test on quantum mechanics basics, qubits, and quantum gates.",
            "guidelines": [
              "Explain qubits vs classical bits",
              "Describe superposition and entanglement",
              "Analyze quantum gate operations",
              "All solutions must show understanding of quantum principles"
            ]
          },
          "communicator": {
            "title": "Quantum Computing Presentation",
            "description": "Create a 10-15 minute presentation explaining what quantum computing is and why it matters.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain quantum mechanics basics in accessible terms",
              "Compare quantum to classical computing",
              "Discuss potential applications",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  "Fin 301: Blockchain & Decentralized Finance": {
    "prereqs": ["Math 302: Cryptography"],
    "description": "Web3 engineering. Learn distributed ledgers, consensus algorithms, smart contracts, and DeFi protocols.",
    "tier": 3,
    "track": "Futurist Electives",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Blockchain Technology",
        "description": "Understand the fundamentals: distributed ledgers, blocks, hashing, and the blockchain data structure.",
        "resources": [
          { "title": "Blockchain Basics", "url": "https://www.youtube.com/watch?v=SSo_EIwHSd4", "type": "Video" },
          { "title": "How Blockchain Works", "url": "https://www.youtube.com/watch?v=3xGLc-zz9cA", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Blockchain Template",
            "description": "Download a template implementing a simple blockchain. Complete the block structure, hashing, and chain validation.",
            "guidelines": [
              "Download the template file provided",
              "Complete the Block class with hash calculation",
              "Implement blockchain validation",
              "Add mining functionality (proof of work)",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Blockchain Fundamentals Assessment",
            "description": "Complete a written test on blockchain architecture, consensus mechanisms, and cryptographic hashing.",
            "guidelines": [
              "Explain blockchain data structure",
              "Describe proof of work vs proof of stake",
              "Analyze security properties of blockchains",
              "All solutions must show understanding of distributed systems"
            ]
          },
          "communicator": {
            "title": "Blockchain Technology Presentation",
            "description": "Create a 10-15 minute presentation explaining how blockchain works and its applications.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain blockchain architecture",
              "Discuss consensus mechanisms",
              "Use real-world blockchain examples",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  },

  "Bio 301: Computational Biology": {
    "prereqs": ["CS 301: Design & Analysis of Algorithms"],
    "description": "Using algorithms to cure disease. Learn DNA sequencing, protein folding, and biological data analysis.",
    "tier": 3,
    "track": "Futurist Electives",
    "weeks": [
      {
        "week": 1,
        "topic": "Introduction to Bioinformatics",
        "description": "Understand biological data: DNA sequences, proteins, and how computer science applies to biology.",
        "resources": [
          { "title": "Bioinformatics Basics", "url": "https://www.youtube.com/watch?v=K2F7pO0J7X4", "type": "Video" },
          { "title": "Computational Biology", "url": "https://www.youtube.com/watch?v=Y7s7mQwYQqE", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Sequence Analysis Template",
            "description": "Download a template for DNA sequence analysis. Implement sequence alignment and pattern matching algorithms.",
            "guidelines": [
              "Download the template file provided",
              "Implement basic sequence alignment",
              "Complete pattern matching in DNA sequences",
              "Analyze sequence similarity",
              "Submit your completed template file"
            ]
          },
          "academic": {
            "title": "Bioinformatics Fundamentals Assessment",
            "description": "Complete a written test on biological data structures, sequence analysis, and algorithmic approaches.",
            "guidelines": [
              "Explain DNA/RNA/Protein data representation",
              "Describe sequence alignment algorithms",
              "Analyze computational challenges in biology",
              "All solutions must show understanding of biological computing"
            ]
          },
          "communicator": {
            "title": "Computational Biology Presentation",
            "description": "Create a 10-15 minute presentation explaining how computer science is used in biology and medicine.",
            "guidelines": [
              "10-15 minute presentation with examples",
              "Explain bioinformatics applications",
              "Discuss DNA sequencing and analysis",
              "Use real-world examples (CRISPR, AlphaFold)",
              "Clear explanations and engaging delivery"
            ]
          }
        }
      }
    ]
  }
};
