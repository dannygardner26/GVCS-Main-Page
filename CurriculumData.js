export const CURRICULUM_DATA = {
  // ============================================
  // TIER 1: The Gatekeepers (Year 1 - Early Year 2)
  // Non-negotiable pillars of CS education
  // ============================================

  "CS 102: Data Structures & Algorithms": {
    "prereqs": ["AP Computer Science A"],
    "nice_to_have": ["Precalculus", "Math 201: Discrete Mathematics for CS"],
    "description": "The universal follow-up to AP CSA. Master efficiency and data organization through Big-O analysis, fundamental data structures, and core algorithms. Anchored by MIT 6.006.",
    "tier": 1,
    "mit_anchor": "6.006 Introduction to Algorithms (Spring 2020)",
    "weeks": [
      {
        "week": 1,
        "topic": "Asymptotic Analysis: Big-O Notation",
        "description": "Formal Big-O analysis of time and space complexity. Learn to analyze algorithm efficiency.",
        "resources": [
          { "title": "MIT 6.006 Lecture 1: Algorithms and Computation", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-1-algorithms-and-computation/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Big-O Analysis Template",
            "description": "Download and complete the template file containing 4 partially implemented algorithms. Implement the missing code sections marked with TODO comments, analyze time complexity, and submit your completed file.",
            "guidelines": [
              "Step 1: Download the template file 'BigO_Analysis.java' from the download button below",
              "Step 2: Open the file in your IDE. You will find 4 functions with TODO comments: findMax(), linearSearch(), bubbleSort(), and binarySearch()",
              "Step 3: Implement each function according to the comments",
              "Step 4: Above each completed function, add a comment block explaining: (a) Time complexity in Big-O notation, (b) Space complexity, (c) Best case, average case, and worst case scenarios",
              "Step 5: Run the provided test cases (included in the template) to verify your implementations work correctly",
              "Step 6: Ensure your code compiles without errors and all test cases pass",
              "Step 7: Submit your completed file. Grading: Correctness (40%), Complexity analysis accuracy (30%), Code quality (20%), Test results (10%)"
            ],
            "template_file": {
              "filename": "BigO_Analysis.java",
              "content": "public class BigO_Analysis {\n    \n    // TODO: Implement this function to find the maximum value in an array\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static int findMax(int[] arr) {\n        // Your implementation here\n        return -1;\n    }\n    \n    // TODO: Implement linear search to find the index of target value\n    // Return -1 if not found\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static int linearSearch(int[] arr, int target) {\n        // Your implementation here\n        return -1;\n    }\n    \n    // TODO: Implement bubble sort algorithm\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static void bubbleSort(int[] arr) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement binary search (assumes array is sorted)\n    // Return -1 if not found\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static int binarySearch(int[] arr, int target) {\n        // Your implementation here\n        return -1;\n    }\n    \n    // Test cases - uncomment to test your implementations\n    public static void main(String[] args) {\n        int[] test1 = {3, 1, 4, 1, 5, 9, 2, 6};\n        System.out.println(\"findMax test: \" + (findMax(test1) == 9 ? \"PASS\" : \"FAIL\"));\n        \n        int[] test2 = {1, 2, 3, 4, 5};\n        System.out.println(\"linearSearch test: \" + (linearSearch(test2, 3) == 2 ? \"PASS\" : \"FAIL\"));\n        \n        int[] test3 = {5, 2, 8, 1, 9};\n        bubbleSort(test3);\n        System.out.println(\"bubbleSort test: \" + (test3[0] == 1 && test3[4] == 9 ? \"PASS\" : \"FAIL\"));\n        \n        int[] test4 = {1, 3, 5, 7, 9};\n        System.out.println(\"binarySearch test: \" + (binarySearch(test4, 5) == 2 ? \"PASS\" : \"FAIL\"));\n    }\n}"
            }
          },
          "academic": {
            "title": "Big-O Notation Assessment",
            "description": "Complete an online assessment with multiple question types covering asymptotic analysis. The assessment includes: (1) Multiple Choice Questions (MCQ) analyzing code snippets for time/space complexity, (2) Short Answer Questions (SAQ) explaining Big-O concepts and proving bounds, (3) Fill-in-the-Blank questions completing data structure implementations with complexity annotations.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze code snippets and select the correct time/space complexity. Questions cover: loop analysis, nested structures, recursive functions, and algorithm comparison",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Provide written explanations for: (a) Defining Big-O notation formally, (b) Proving 2 Big-O bounds with mathematical reasoning, (c) Comparing algorithms within the same complexity class, (d) Explaining best/average/worst case scenarios",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete partial code implementations by filling in: (a) Missing complexity annotations (Big-O notation), (b) Algorithm implementations with TODO comments, (c) Complexity analysis comments for given functions",
              "Time Limit: 90 minutes. Submit all answers through the online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Big-O Notation Teaching Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation teaching Big-O notation to fellow students. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure (Required): (1) Title slide with your name, (2) Introduction: What is Big-O? (2-3 slides), (3) Why it matters: Real-world examples (2 slides), (4) Complexity classes: O(1), O(log n), O(n), O(n log n), O(n²) with code examples (5-6 slides), (5) How to analyze: Step-by-step walkthrough of 2 code examples (3-4 slides), (6) Visual comparison: Graph showing growth rates (1-2 slides), (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: For each complexity class, include: (a) Definition in simple terms, (b) At least one code example, (c) Real-world use case, (d) Visual representation (graph or chart)",
              "Code Examples: Include 2-3 complete code examples that you analyze step-by-step",
              "Visual Aids: Create or use a graph showing how different complexities scale with input size",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 1 Notes Submission",
            "description": "Submit your handwritten or typed notes from MIT 6.006 Lecture 1: Algorithms and Computation. Your notes will be assessed for completeness, accuracy, and identification of key concepts.",
            "guidelines": [
              "Take comprehensive notes while watching the lecture video",
              "Include: (a) Key definitions and concepts, (b) Important examples and algorithms discussed, (c) Complexity analysis covered, (d) Any questions or insights you had",
              "Format: Submit as PDF (scanned handwritten notes or typed document)",
              "Length: 2-4 pages expected for a complete lecture",
              "Grading Rubric: Completeness (40% - all major topics covered), Accuracy (30% - correct understanding of concepts), Organization (20% - clear structure and headings), Critical thinking (10% - questions, insights, connections)",
              "Submission: Upload your notes PDF through the course platform"
            ]
          }
        }
      },
      {
        "week": 2,
        "topic": "Linear Structures: Dynamic Arrays and Linked Lists",
        "description": "Implement dynamic arrays with resize logic, and singly/doubly linked lists. Compare tradeoffs.",
        "resources": [
          { "title": "MIT 6.006 Lecture 2: Data Structures and Dynamic Arrays", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-2-data-structures-and-dynamic-arrays/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dynamic Array and Linked List Template",
            "description": "Complete a template file implementing two fundamental data structures: a DynamicArray class and a LinkedList class. Your task is to: (1) Implement all methods marked with TODO comments for both classes, (2) Ensure proper memory management (resizing for arrays, node management for lists), (3) Add time complexity comments for each method, (4) Pass all provided test cases, (5) Submit your working implementation. This project demonstrates understanding of linear data structures and their tradeoffs.",
            "guidelines": [
              "Step 1: Download 'DynamicArray_LinkedList.java' template file from the download button",
              "Step 2: Implement DynamicArray class methods: (a) resize() - double capacity when full, (b) add(int index, T item) - insert at position with bounds checking, (c) remove(int index) - remove element and shift, (d) get(int index) - retrieve element, (e) size() - return current size",
              "Step 3: Implement LinkedList class methods: (a) addFirst(T item) - add to head, (b) addLast(T item) - add to tail, (c) remove(T item) - find and remove first occurrence, (d) get(int index) - traverse to index and return, (e) Helper: findNode(T item) - locate node containing item",
              "Step 4: For each implemented method, add a comment above it stating: (a) Time complexity in Big-O, (b) Space complexity if applicable, (c) Example: '// O(1) amortized time, O(1) space' for addLast()",
              "Step 5: Run the test suite included in the template. All 15 test cases must pass. Fix any failing tests before submission",
              "Step 6: Verify edge cases: empty list/array, single element, adding/removing at boundaries (index 0, last index)",
              "Step 7: Code quality: Use meaningful variable names, add brief comments for complex logic, ensure no memory leaks (properly handle node references in LinkedList)",
              "Step 8: Submit your completed file. Grading: Correctness (50%), Time complexity analysis (25%), Code quality (15%), Test results (10%)"
            ],
            "template_file": {
              "filename": "DynamicArray_LinkedList.java",
              "content": "public class DynamicArray<T> {\n    private T[] array;\n    private int size;\n    private int capacity;\n    \n    // TODO: Implement constructor that initializes array with initial capacity of 10\n    public DynamicArray() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement resize method that doubles the capacity when array is full\n    // Time Complexity: ???\n    private void resize() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement add method to insert item at given index\n    // Time Complexity: ???\n    public void add(int index, T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement remove method to remove item at given index\n    // Time Complexity: ???\n    public T remove(int index) {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement get method to retrieve item at given index\n    // Time Complexity: ???\n    public T get(int index) {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: ???\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\nclass Node<T> {\n    T data;\n    Node<T> next;\n    \n    Node(T data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\npublic class LinkedList<T> {\n    private Node<T> head;\n    private int size;\n    \n    // TODO: Implement constructor\n    public LinkedList() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addFirst method\n    // Time Complexity: ???\n    public void addFirst(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addLast method\n    // Time Complexity: ???\n    public void addLast(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement helper method to find node containing item\n    // Time Complexity: ???\n    private Node<T> findNode(T item) {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement remove method\n    // Time Complexity: ???\n    public boolean remove(T item) {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement get method\n    // Time Complexity: ???\n    public T get(int index) {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: ???\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Test cases - uncomment to test\nclass TestCases {\n    public static void main(String[] args) {\n        // Test DynamicArray\n        DynamicArray<Integer> arr = new DynamicArray<>();\n        arr.add(0, 10);\n        arr.add(1, 20);\n        System.out.println(\"DynamicArray test 1: \" + (arr.get(0) == 10 ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"DynamicArray test 2: \" + (arr.size() == 2 ? \"PASS\" : \"FAIL\"));\n        \n        // Test LinkedList\n        LinkedList<Integer> list = new LinkedList<>();\n        list.addFirst(5);\n        list.addLast(15);\n        System.out.println(\"LinkedList test 1: \" + (list.get(0) == 5 ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"LinkedList test 2: \" + (list.size() == 2 ? \"PASS\" : \"FAIL\"));\n    }\n}"
            }
          },
          "academic": {
            "title": "Linear Data Structures Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering dynamic arrays and linked lists. Topics include time/space complexity analysis, implementation details, and tradeoffs.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze code snippets for time/space complexity, compare array vs linked list operations, identify correct implementation strategies",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain when to use arrays vs linked lists, describe resizing strategies, compare singly vs doubly linked lists, analyze tradeoffs",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete partial implementations of DynamicArray and LinkedList methods, fill in complexity annotations, complete resize() logic",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Arrays vs Linked Lists Presentation",
            "description": "Create a 10-15 minute presentation comparing dynamic arrays and linked lists. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to both structures (2 slides), (3) Internal structure and memory layout with diagrams (3-4 slides), (4) Time complexity comparison table (1-2 slides), (5) When to use each with real-world examples (2-3 slides), (6) Conclusion (1 slide)",
              "Content Requirements: Explain internal structure with memory diagrams, create comparison table for all operations, discuss memory layout differences, provide 3-5 real-world scenarios",
              "Visual Aids: Memory diagrams showing contiguous vs scattered storage, comparison tables, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 2 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 2: Data Structures and Dynamic Arrays. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: key definitions, dynamic array implementation details, amortized analysis, linked list concepts",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 3,
        "topic": "Stacks, Queues, and Deques",
        "description": "Implement stacks, queues, and double-ended queues. Learn common use cases and applications.",
        "resources": [
          { "title": "MIT 6.006 Lecture 3: Sets and Sorting", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-3-sets-and-sorting/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Stack, Queue, and Deque Template",
            "description": "Complete a template file implementing three fundamental linear data structures: Stack, Queue, and Deque. Your task is to: (1) Implement all methods marked with TODO comments for all three classes, (2) Build a balanced parentheses checker using the Stack, (3) Build a task scheduler using the Queue, (4) Add time complexity comments for each method, (5) Pass all provided test cases, (6) Submit your working implementation. This project demonstrates understanding of LIFO, FIFO, and double-ended queue operations.",
            "guidelines": [
              "Step 1: Download 'Stack_Queue_Deque.java' template file from the download button",
              "Step 2: Implement Stack class methods: (a) push(T item) - add to top, (b) pop() - remove and return top element, (c) peek() - return top without removing, (d) isEmpty() - check if empty, (e) size() - return number of elements",
              "Step 3: Implement Queue class methods: (a) enqueue(T item) - add to rear, (b) dequeue() - remove and return front element, (c) front() - return front without removing, (d) isEmpty() - check if empty, (e) size() - return number of elements",
              "Step 4: Implement Deque class methods: (a) addFirst(T item) - add to front, (b) addLast(T item) - add to rear, (c) removeFirst() - remove and return front, (d) removeLast() - remove and return rear, (e) isEmpty() and size()",
              "Step 5: Implement BalancedParenthesesChecker class using your Stack: (a) isBalanced(String expression) - returns true if parentheses are balanced, (b) Handle '(', ')', '[', ']', '{', '}' characters, (c) Use stack to track opening brackets",
              "Step 6: Implement TaskScheduler class using your Queue: (a) scheduleTask(String task) - add task to queue, (b) executeNext() - remove and return next task, (c) hasTasks() - check if tasks remain",
              "Step 7: For each implemented method, add a comment above it stating time complexity in Big-O notation",
              "Step 8: Run the test suite included in the template. All test cases must pass. Fix any failing tests before submission",
              "Step 9: Submit your completed file. Grading: Correctness (50%), Time complexity analysis (25%), Code quality (15%), Test results (10%)"
            ],
            "template_file": {
              "filename": "Stack_Queue_Deque.java",
              "content": "import java.util.LinkedList;\n\n// Stack Implementation (LIFO - Last In First Out)\npublic class Stack<T> {\n    private LinkedList<T> list;\n    \n    // TODO: Implement constructor\n    public Stack() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement push method to add item to top\n    // Time Complexity: ???\n    public void push(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement pop method to remove and return top item\n    // Time Complexity: ???\n    public T pop() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement peek method to return top without removing\n    // Time Complexity: ???\n    public T peek() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: ???\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: ???\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Queue Implementation (FIFO - First In First Out)\npublic class Queue<T> {\n    private LinkedList<T> list;\n    \n    // TODO: Implement constructor\n    public Queue() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement enqueue method to add item to rear\n    // Time Complexity: ???\n    public void enqueue(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement dequeue method to remove and return front item\n    // Time Complexity: ???\n    public T dequeue() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement front method to return front without removing\n    // Time Complexity: ???\n    public T front() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: ???\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: ???\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Deque Implementation (Double-Ended Queue)\npublic class Deque<T> {\n    private LinkedList<T> list;\n    \n    // TODO: Implement constructor\n    public Deque() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addFirst method\n    // Time Complexity: ???\n    public void addFirst(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addLast method\n    // Time Complexity: ???\n    public void addLast(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement removeFirst method\n    // Time Complexity: ???\n    public T removeFirst() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement removeLast method\n    // Time Complexity: ???\n    public T removeLast() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: ???\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: ???\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Balanced Parentheses Checker using Stack\nclass BalancedParenthesesChecker {\n    // TODO: Implement isBalanced method using your Stack\n    // Time Complexity: ???\n    public static boolean isBalanced(String expression) {\n        // Your implementation here\n        // Hint: Use a Stack to track opening brackets\n        // When you see '(', '[', '{' -> push to stack\n        // When you see ')', ']', '}' -> pop from stack and check if it matches\n        return false;\n    }\n}\n\n// Task Scheduler using Queue\nclass TaskScheduler {\n    private Queue<String> taskQueue;\n    \n    // TODO: Implement constructor\n    public TaskScheduler() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement scheduleTask method\n    // Time Complexity: ???\n    public void scheduleTask(String task) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement executeNext method\n    // Time Complexity: ???\n    public String executeNext() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement hasTasks method\n    // Time Complexity: ???\n    public boolean hasTasks() {\n        // Your implementation here\n        return false;\n    }\n}\n\n// Test cases - uncomment to test\nclass TestCases {\n    public static void main(String[] args) {\n        // Test Stack\n        Stack<Integer> stack = new Stack<>();\n        stack.push(1);\n        stack.push(2);\n        System.out.println(\\\"Stack test 1: \\\" + (stack.pop() == 2 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"Stack test 2: \\\" + (stack.peek() == 1 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test Queue\n        Queue<String> queue = new Queue<>();\n        queue.enqueue(\\\"first\\\");\n        queue.enqueue(\\\"second\\\");\n        System.out.println(\\\"Queue test 1: \\\" + (queue.dequeue().equals(\\\"first\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"Queue test 2: \\\" + (queue.front().equals(\\\"second\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test Deque\n        Deque<Character> deque = new Deque<>();\n        deque.addFirst('a');\n        deque.addLast('b');\n        System.out.println(\\\"Deque test 1: \\\" + (deque.removeFirst() == 'a' ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"Deque test 2: \\\" + (deque.removeLast() == 'b' ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test Balanced Parentheses\n        System.out.println(\\\"Parentheses test 1: \\\" + (BalancedParenthesesChecker.isBalanced(\\\"()\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"Parentheses test 2: \\\" + (BalancedParenthesesChecker.isBalanced(\\\"([{}])\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"Parentheses test 3: \\\" + (!BalancedParenthesesChecker.isBalanced(\\\"([)]\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test Task Scheduler\n        TaskScheduler scheduler = new TaskScheduler();\n        scheduler.scheduleTask(\\\"Task 1\\\");\n        scheduler.scheduleTask(\\\"Task 2\\\");\n        System.out.println(\\\"Scheduler test 1: \\\" + (scheduler.executeNext().equals(\\\"Task 1\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"Scheduler test 2: \\\" + (scheduler.hasTasks() ? \\\"PASS\\\" : \\\"FAIL\\\"));\n    }\n}"
            }
          },
          "academic": {
            "title": "Stacks, Queues, and Deques Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering stacks, queues, and deques. Topics include time complexity, implementation choices, and applications.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze code snippets for time complexity, identify correct implementations, compare array vs linked list approaches",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain LIFO vs FIFO principles, describe stack/queue applications, compare implementations, solve problems",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete partial Stack/Queue/Deque implementations, fill in complexity annotations, complete method bodies",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Stacks and Queues Presentation",
            "description": "Create a 10-15 minute presentation explaining stacks, queues, and deques. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to stacks, queues, deques (2 slides), (3) LIFO vs FIFO principles with examples (2-3 slides), (4) Applications with real-world examples (3-4 slides), (5) Implementation details (2 slides), (6) Conclusion (1 slide)",
              "Content Requirements: Explain LIFO/FIFO principles, demonstrate 3+ stack applications, demonstrate 3+ queue applications, show implementation code",
              "Visual Aids: Diagrams showing operations, comparison tables, code examples, real-world use case visuals",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 3 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 3: Sets and Sorting. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: key definitions, sorting algorithms, set operations, complexity analysis",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 4,
        "topic": "Hash-Based Structures: HashMaps and HashSets",
        "description": "Understand hashing, collision resolution (chaining vs probing), and load factors.",
        "resources": [
          { "title": "MIT 6.006 Lecture 4: Hashing", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-4-hashing/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Hash Map Template",
            "description": "Complete a template file implementing a HashMap class with collision resolution using chaining. Your task is to: (1) Implement a hash function for string keys, (2) Implement put(), get(), and remove() methods with collision handling, (3) Implement automatic resizing when load factor exceeds threshold, (4) Add time complexity comments for each method, (5) Pass all provided test cases, (6) Submit your working implementation. This project demonstrates understanding of hashing, collision resolution, and hash table performance.",
            "guidelines": [
              "Step 1: Download 'HashMap.java' template file from the download button",
              "Step 2: Implement hash function: hash(String key) - use polynomial hashing: h = (h * 31 + char) % capacity. This distributes keys evenly across buckets",
              "Step 3: Implement put(K key, V value) method: (a) Calculate hash index, (b) If bucket is empty, create new chain, (c) If key exists in chain, update value, (d) If key doesn't exist, add new entry to chain, (e) Check load factor and resize if needed",
              "Step 4: Implement get(K key) method: (a) Calculate hash index, (b) Search through the chain at that index, (c) Return value if key found, null otherwise",
              "Step 5: Implement remove(K key) method: (a) Calculate hash index, (b) Search chain for key, (c) Remove entry from chain if found, (d) Return removed value or null",
              "Step 6: Implement resize() method: (a) Create new array with double capacity, (b) Rehash all existing entries into new array, (c) Update capacity and threshold",
              "Step 7: For each implemented method, add a comment above it stating: (a) Time complexity in Big-O (average and worst case), (b) Space complexity if applicable",
              "Step 8: Run the test suite included in the template. All test cases must pass. Test with various key types and collision scenarios",
              "Step 9: Verify edge cases: empty map, single entry, many collisions, resizing triggers",
              "Step 10: Submit your completed file. Grading: Correctness (50%), Hash function quality (15%), Collision handling (15%), Time complexity analysis (10%), Test results (10%)"
            ],
            "template_file": {
              "filename": "HashMap.java",
              "content": "import java.util.LinkedList;\n\n// Entry class to store key-value pairs\nclass Entry<K, V> {\n    K key;\n    V value;\n    \n    Entry(K key, V value) {\n        this.key = key;\n        this.value = value;\n    }\n}\n\n// HashMap Implementation with Chaining Collision Resolution\npublic class HashMap<K, V> {\n    private LinkedList<Entry<K, V>>[] buckets;\n    private int capacity;\n    private int size;\n    private static final double LOAD_FACTOR_THRESHOLD = 0.75;\n    \n    // TODO: Implement constructor that initializes buckets array with initial capacity of 16\n    @SuppressWarnings(\"unchecked\")\n    public HashMap() {\n        // Your implementation here\n        // Initialize buckets as array of LinkedLists\n        // Set initial capacity to 16\n        // Initialize size to 0\n    }\n    \n    // TODO: Implement hash function using polynomial hashing\n    // Formula: h = (h * 31 + char) % capacity\n    // Time Complexity: O(k) where k is length of key\n    private int hash(K key) {\n        // Your implementation here\n        // Convert key to string, then apply polynomial hash\n        return 0;\n    }\n    \n    // TODO: Implement put method to insert or update key-value pair\n    // Time Complexity: O(1) average, O(n) worst case (all keys hash to same bucket)\n    public void put(K key, V value) {\n        // Your implementation here\n        // 1. Calculate hash index\n        // 2. Get the chain (LinkedList) at that index\n        // 3. If chain is null, create new LinkedList\n        // 4. Search chain for existing key - if found, update value\n        // 5. If not found, add new Entry to chain\n        // 6. Increment size\n        // 7. Check if resize needed (size / capacity > LOAD_FACTOR_THRESHOLD)\n    }\n    \n    // TODO: Implement get method to retrieve value by key\n    // Time Complexity: O(1) average, O(n) worst case\n    public V get(K key) {\n        // Your implementation here\n        // 1. Calculate hash index\n        // 2. Get the chain at that index\n        // 3. Search chain for key\n        // 4. Return value if found, null otherwise\n        return null;\n    }\n    \n    // TODO: Implement remove method to delete key-value pair\n    // Time Complexity: O(1) average, O(n) worst case\n    public V remove(K key) {\n        // Your implementation here\n        // 1. Calculate hash index\n        // 2. Get the chain at that index\n        // 3. Search chain for key\n        // 4. Remove entry if found, decrement size\n        // 5. Return removed value or null\n        return null;\n    }\n    \n    // TODO: Implement resize method to double capacity and rehash all entries\n    // Time Complexity: O(n) where n is number of entries\n    @SuppressWarnings(\"unchecked\")\n    private void resize() {\n        // Your implementation here\n        // 1. Save old buckets array\n        // 2. Double the capacity\n        // 3. Create new buckets array with new capacity\n        // 4. Rehash all entries from old array to new array\n        // 5. Update capacity\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: O(1)\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: O(1)\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement containsKey method\n    // Time Complexity: O(1) average, O(n) worst case\n    public boolean containsKey(K key) {\n        // Your implementation here\n        return false;\n    }\n}\n\n// Test cases - uncomment to test\nclass TestCases {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        \n        // Test put and get\n        map.put(\"apple\", 5);\n        map.put(\"banana\", 3);\n        System.out.println(\\\"HashMap test 1: \\\" + (map.get(\\\"apple\\\") == 5 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"HashMap test 2: \\\" + (map.get(\\\"banana\\\") == 3 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test update\n        map.put(\\\"apple\\\", 10);\n        System.out.println(\\\"HashMap test 3: \\\" + (map.get(\\\"apple\\\") == 10 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test remove\n        map.remove(\\\"banana\\\");\n        System.out.println(\\\"HashMap test 4: \\\" + (map.get(\\\"banana\\\") == null ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test containsKey\n        System.out.println(\\\"HashMap test 5: \\\" + (map.containsKey(\\\"apple\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        System.out.println(\\\"HashMap test 6: \\\" + (!map.containsKey(\\\"banana\\\") ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test size\n        System.out.println(\\\"HashMap test 7: \\\" + (map.size() == 1 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n        \n        // Test collisions (keys that hash to same bucket)\n        map.put(\\\"cat\\\", 1);\n        map.put(\\\"dog\\\", 2);\n        map.put(\\\"bird\\\", 3);\n        System.out.println(\\\"HashMap test 8: \\\" + (map.size() == 4 ? \\\"PASS\\\" : \\\"FAIL\\\"));\n    }\n}"
            }
          },
          "academic": {
            "title": "Hash Tables Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering hash tables, hash functions, collision resolution, and performance analysis.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze hash function properties, identify collision resolution strategies, compare performance characteristics",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Design hash functions, explain collision resolution strategies, analyze load factor impact, describe rehashing strategies",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete hash function implementations, fill in collision resolution code, complete rehashing logic",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Hash Tables Presentation",
            "description": "Create a 10-15 minute presentation explaining hash tables. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to hashing (2 slides), (3) Hash functions with examples (2-3 slides), (4) Collision resolution strategies (3-4 slides), (5) Load factor and performance (2 slides), (6) Real-world applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain hashing concept, demonstrate hash functions with collision examples, visualize collision resolution strategies, explain load factor impact",
              "Visual Aids: Diagrams showing hash table structure, collision resolution visualizations, performance graphs, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 4 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 4: Hashing. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: hash functions, collision resolution, load factor, performance analysis",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 5,
        "topic": "Trees: Binary Search Trees and Traversals",
        "description": "Implement BSTs with insert, search, delete. Master in-order, pre-order, and post-order traversals.",
        "resources": [
          { "title": "MIT 6.006 Lecture 6: Binary Trees, Part 1", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-6-binary-trees-part-1/", "type": "Video" }
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
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering binary search trees, traversals, and operations.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze BST operations, identify correct tree structures, compare complexity classes",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain BST property, analyze time complexity, describe traversal algorithms, compare BST vs balanced trees",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete BST insert/search/delete implementations, fill in traversal code, complete complexity annotations",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Binary Search Trees Presentation",
            "description": "Create a 10-15 minute presentation explaining binary search trees. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to BSTs and ordering property (2 slides), (3) Insert, search, delete operations (3-4 slides), (4) Tree traversals with examples (2-3 slides), (5) Time complexity analysis (2 slides), (6) Real-world applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain BST ordering property, demonstrate operations step-by-step, show all three traversals, explain time complexity",
              "Visual Aids: Tree diagrams showing operations, traversal examples, complexity graphs, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 6 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 6: Binary Trees, Part 1. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: BST properties, operations, traversals, complexity analysis",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 6,
        "topic": "Self-Balancing Trees: AVL or Red-Black",
        "description": "Learn why self-balancing is needed. Implement AVL trees or study Red-Black tree rotations.",
        "resources": [
          { "title": "MIT 6.006 Lecture 7: Binary Trees, Part 2: AVL", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-7-binary-trees-part-2-avl/", "type": "Video" }
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
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering AVL trees, rotations, and self-balancing concepts.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Identify rotation types, analyze balance factors, compare AVL vs Red-Black properties",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain why balancing is needed, describe rotation types, prove O(log n) guarantee, compare tree types",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete rotation method implementations, fill in balance factor calculations, complete insertion logic",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Self-Balancing Trees Presentation",
            "description": "Create a 10-15 minute presentation explaining self-balancing trees. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Problem with unbalanced BSTs (2 slides), (3) AVL tree properties (2 slides), (4) Rotation operations with examples (3-4 slides), (5) AVL vs Red-Black comparison (2 slides), (6) Real-world applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Demonstrate unbalanced BST problem, explain AVL properties, show rotation operations, compare tree types",
              "Visual Aids: Tree diagrams showing rotations, before/after comparisons, animations of balancing, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 7 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 7: Binary Trees, Part 2: AVL. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: AVL properties, rotations, balancing, complexity guarantees",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 7,
        "topic": "Binary Heaps and Priority Queues",
        "description": "Implement min/max heaps and use them for priority queues. Heapify operations.",
        "resources": [
          { "title": "MIT 6.006 Lecture 8: Binary Heaps", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-8-binary-heaps/", "type": "Video" }
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
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering binary heaps, priority queues, and heap operations.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze heap operations, identify correct array representations, compare heap vs BST",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain heap property, analyze time complexity, describe heapify algorithms, prove O(n) build time",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete heap insert/extract implementations, fill in heapify methods, complete array indexing calculations",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Heaps and Priority Queues Presentation",
            "description": "Create a 10-15 minute presentation explaining binary heaps and priority queues. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to heaps and heap property (2 slides), (3) Array representation and indexing (2 slides), (4) Heap operations (3-4 slides), (5) Building heaps efficiently (2 slides), (6) Applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain heap property, demonstrate array representation, show operations step-by-step, discuss applications",
              "Visual Aids: Tree and array representations, operation animations, index calculation examples, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 8 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 8: Binary Heaps. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: heap property, array representation, operations, heapify algorithms",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 8,
        "topic": "Graph Traversals: Breadth-First Search (BFS)",
        "description": "Learn graph representations and implement breadth-first search for level-order traversal and shortest path finding in unweighted graphs.",
        "resources": [
          { "title": "MIT 6.006 Lecture 9: Breadth-First Search", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-9-breadth-first-search/", "type": "Video" },
          { "title": "Lecture 9 Notes: BFS", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec9/", "type": "PDF" },
          { "title": "Recitation 9 Notes", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_r09/", "type": "PDF" }
        ],
        "deliverables": {
          "builder": {
            "title": "BFS Implementation Starter",
            "description": "Download the starter file with a partially implemented Graph class. Complete the BFS traversal method and shortest path finding.",
            "guidelines": [
              "Download the starter file (Java or C++)",
              "Complete the Graph class constructor: initialize adjacency list representation",
              "Complete addEdge() method: add undirected edges to the graph",
              "Complete BFS(start) method: implement breadth-first search using a queue, return list of visited nodes in order",
              "Complete shortestPath(start, end) method: use BFS to find shortest path, return list of nodes in path",
              "Complete getLevels(start) method: return a map/dictionary of each node to its level (distance from start)",
              "Add time complexity comments for each method",
              "Test with provided test cases and submit your completed file"
            ],
            "template_files": {
              "java": {
                "filename": "BFSGraph.java",
                "content": "import java.util.*;\n\npublic class BFSGraph {\n    private Map<Integer, List<Integer>> adjList;\n    private int numVertices;\n    \n    // TODO: Implement constructor that initializes adjacency list\n    public BFSGraph(int numVertices) {\n        // Your implementation here\n        // Initialize adjList as HashMap\n        // Initialize numVertices\n    }\n    \n    // TODO: Implement addEdge method to add undirected edge\n    // Time Complexity: ???\n    public void addEdge(int u, int v) {\n        // Your implementation here\n        // Add v to u's adjacency list\n        // Add u to v's adjacency list (undirected graph)\n    }\n    \n    // TODO: Implement BFS traversal starting from 'start' vertex\n    // Return list of visited nodes in BFS order\n    // Time Complexity: ???\n    public List<Integer> BFS(int start) {\n        // Your implementation here\n        // Use a Queue for BFS\n        // Track visited nodes\n        // Return list of nodes in order visited\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement shortestPath method using BFS\n    // Return list of nodes representing shortest path from start to end\n    // Return empty list if no path exists\n    // Time Complexity: ???\n    public List<Integer> shortestPath(int start, int end) {\n        // Your implementation here\n        // Use BFS to find shortest path\n        // Track predecessors to reconstruct path\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement getLevels method\n    // Return a map where key is node and value is its level (distance from start)\n    // Level 0 = start node, Level 1 = nodes 1 edge away, etc.\n    // Time Complexity: ???\n    public Map<Integer, Integer> getLevels(int start) {\n        // Your implementation here\n        // Use BFS to assign levels\n        return new HashMap<>();\n    }\n    \n    // Test cases - uncomment to test\n    public static void main(String[] args) {\n        BFSGraph graph = new BFSGraph(5);\n        graph.addEdge(0, 1);\n        graph.addEdge(0, 2);\n        graph.addEdge(1, 3);\n        graph.addEdge(2, 4);\n        \n        List<Integer> bfsOrder = graph.BFS(0);\n        System.out.println(\"BFS from 0: \" + bfsOrder);\n        \n        List<Integer> path = graph.shortestPath(0, 4);\n        System.out.println(\"Shortest path from 0 to 4: \" + path);\n        \n        Map<Integer, Integer> levels = graph.getLevels(0);\n        System.out.println(\"Levels from 0: \" + levels);\n    }\n}"
              },
              "cpp": {
                "filename": "BFSGraph.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\n\nclass BFSGraph {\nprivate:\n    unordered_map<int, vector<int>> adjList;\n    int numVertices;\n    \npublic:\n    // TODO: Implement constructor that initializes adjacency list\n    BFSGraph(int numVertices) {\n        // Your implementation here\n        // Initialize numVertices\n        // adjList will be automatically initialized\n    }\n    \n    // TODO: Implement addEdge method to add undirected edge\n    // Time Complexity: ???\n    void addEdge(int u, int v) {\n        // Your implementation here\n        // Add v to u's adjacency list\n        // Add u to v's adjacency list (undirected graph)\n    }\n    \n    // TODO: Implement BFS traversal starting from 'start' vertex\n    // Return vector of visited nodes in BFS order\n    // Time Complexity: ???\n    vector<int> BFS(int start) {\n        // Your implementation here\n        // Use a queue for BFS\n        // Track visited nodes\n        // Return vector of nodes in order visited\n        return vector<int>();\n    }\n    \n    // TODO: Implement shortestPath method using BFS\n    // Return vector of nodes representing shortest path from start to end\n    // Return empty vector if no path exists\n    // Time Complexity: ???\n    vector<int> shortestPath(int start, int end) {\n        // Your implementation here\n        // Use BFS to find shortest path\n        // Track predecessors to reconstruct path\n        return vector<int>();\n    }\n    \n    // TODO: Implement getLevels method\n    // Return a map where key is node and value is its level (distance from start)\n    // Level 0 = start node, Level 1 = nodes 1 edge away, etc.\n    // Time Complexity: ???\n    unordered_map<int, int> getLevels(int start) {\n        // Your implementation here\n        // Use BFS to assign levels\n        return unordered_map<int, int>();\n    }\n};\n\n// Test cases - uncomment to test\nint main() {\n    BFSGraph graph(5);\n    graph.addEdge(0, 1);\n    graph.addEdge(0, 2);\n    graph.addEdge(1, 3);\n    graph.addEdge(2, 4);\n    \n    vector<int> bfsOrder = graph.BFS(0);\n    cout << \"BFS from 0: \";\n    for (int node : bfsOrder) cout << node << \" \";\n    cout << endl;\n    \n    vector<int> path = graph.shortestPath(0, 4);\n    cout << \"Shortest path from 0 to 4: \";\n    for (int node : path) cout << node << \" \";\n    cout << endl;\n    \n    return 0;\n}"
              }
            }
          },
          "academic": {
            "title": "BFS Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering graph representations and BFS algorithm.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Compare adjacency matrix vs list, analyze BFS complexity, identify correct BFS traversal order",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain graph representations, analyze BFS time/space complexity, describe BFS applications, explain why BFS finds shortest path",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete BFS implementation code, fill in adjacency list construction, complete queue operations",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "BFS Presentation",
            "description": "Create a 10-15 minute presentation explaining breadth-first search. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to graphs and terminology (2 slides), (3) Adjacency matrix vs list (2-3 slides), (4) BFS algorithm step-by-step (3-4 slides), (5) Why BFS finds shortest path (2 slides), (6) Real-world applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain graph concepts, visualize adjacency representations, demonstrate BFS step-by-step with queue visualization, explain shortest path property",
              "Visual Aids: Graph diagrams, adjacency representations, BFS traversal animations showing queue state, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 9 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 9: Breadth-First Search. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: graph representations, BFS algorithm, queue-based traversal, shortest path applications",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 9,
        "topic": "Graph Traversals: Depth-First Search (DFS)",
        "description": "Master depth-first search for graph traversal, cycle detection, and topological sorting. Understand recursive and iterative implementations.",
        "resources": [
          { "title": "MIT 6.006 Lecture 10: Depth-First Search", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-10-depth-first-search/", "type": "Video" },
          { "title": "Lecture 10 Notes: DFS", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec10/", "type": "PDF" },
          { "title": "Recitation 10 Notes", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_r10/", "type": "PDF" }
        ],
        "deliverables": {
          "builder": {
            "title": "DFS Implementation Starter",
            "description": "Download the starter file with a partially implemented Graph class. Complete the DFS traversal methods and cycle detection.",
            "guidelines": [
              "Download the starter file (Java or C++)",
              "Complete DFS_recursive(start) method: implement recursive depth-first search, return list of visited nodes",
              "Complete DFS_iterative(start) method: implement iterative DFS using a stack, return list of visited nodes",
              "Complete hasCycle() method: detect if the graph contains a cycle using DFS",
              "Complete topologicalSort() method: return topological ordering for directed acyclic graphs (if applicable)",
              "Complete findConnectedComponents() method: find all connected components in an undirected graph",
              "Add time complexity comments for each method",
              "Test with provided test cases and submit your completed file"
            ],
            "template_files": {
              "java": {
                "filename": "DFSGraph.java",
                "path": "templates/cs102/week9/DFSGraph.java"
              },
              "cpp": {
                "filename": "DFSGraph.cpp",
                "path": "templates/cs102/week9/DFSGraph.cpp"
              }
            }
          },
          "academic": {
            "title": "DFS Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering DFS algorithm and its applications.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze DFS complexity, identify correct DFS traversal order, compare recursive vs iterative DFS",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain DFS algorithm, analyze time/space complexity, describe DFS applications (cycle detection, topological sort), compare BFS vs DFS",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete DFS implementation code, fill in cycle detection logic, complete stack-based DFS",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "DFS Presentation",
            "description": "Create a 10-15 minute presentation explaining depth-first search. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to DFS (2 slides), (3) Recursive DFS algorithm (3-4 slides), (4) Iterative DFS with stack (2-3 slides), (5) DFS applications: cycle detection, topological sort (3-4 slides), (6) BFS vs DFS comparison (2 slides), (7) Real-world applications (2 slides), (8) Conclusion (1 slide)",
              "Content Requirements: Explain DFS concept, demonstrate recursive and iterative implementations, show applications with examples, compare with BFS",
              "Visual Aids: Graph diagrams, DFS traversal animations showing stack/recursion, cycle detection examples, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 10 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 10: Depth-First Search. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: DFS algorithm, recursive vs iterative implementations, cycle detection, topological sorting",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 10,
        "topic": "Shortest Paths: Weighted Graphs and Introduction",
        "description": "Introduction to weighted graphs and shortest path problems. Learn about edge weights, path costs, and the need for different algorithms.",
        "resources": [
          { "title": "MIT 6.006 Lecture 11: Weighted Shortest Paths", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-11-weighted-shortest-paths/", "type": "Video" },
          { "title": "Lecture 11 Notes: Weighted Shortest Paths", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec11/", "type": "PDF" }
        ],
        "deliverables": {
          "builder": {
            "title": "Weighted Graph Starter",
            "description": "Download the starter file with a partially implemented WeightedGraph class. Complete methods for handling weighted edges and basic path cost calculations.",
            "guidelines": [
              "Download the starter file (Java or C++)",
              "Complete the WeightedGraph class constructor: initialize adjacency list with edge weights",
              "Complete addWeightedEdge(u, v, weight) method: add directed weighted edge",
              "Complete getWeight(u, v) method: return weight of edge from u to v, or infinity if no edge",
              "Complete calculatePathCost(path) method: given a list of nodes representing a path, calculate total cost",
              "Complete getAllNeighbors(node) method: return all neighbors with their edge weights",
              "Add time complexity comments for each method",
              "Test with provided test cases and submit your completed file"
            ],
            "template_files": {
              "java": {
                "filename": "WeightedGraph.java",
                "path": "templates/cs102/week10/WeightedGraph.java"
              },
              "cpp": {
                "filename": "WeightedGraph.cpp",
                "path": "templates/cs102/week10/WeightedGraph.cpp"
              }
            }
          },
          "academic": {
            "title": "Weighted Graphs Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering weighted graphs and shortest path concepts.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Understand edge weights, path costs, identify when BFS fails for weighted graphs",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain weighted graphs, analyze why BFS doesn't work, describe shortest path problem variations",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete weighted graph representation code, fill in path cost calculations",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Weighted Graphs Presentation",
            "description": "Create a 10-15 minute presentation explaining weighted graphs and shortest path problems. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to weighted graphs (2 slides), (3) Path costs and edge weights (2 slides), (4) Why BFS fails for weighted graphs (2-3 slides), (5) Shortest path problem variations (2-3 slides), (6) Real-world applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain weighted graphs, demonstrate why BFS doesn't work, show real-world examples (GPS, network routing)",
              "Visual Aids: Weighted graph diagrams, path cost examples, BFS failure demonstration, application examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 11 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 11: Weighted Shortest Paths. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: weighted graphs, path costs, why BFS fails, shortest path problem variations",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 11,
        "topic": "Shortest Paths: Dijkstra's Algorithm",
        "description": "Master Dijkstra's algorithm for finding shortest paths in graphs with non-negative edge weights. Understand priority queue usage and correctness proof.",
        "resources": [
          { "title": "MIT 6.006 Lecture 13: Dijkstra's Algorithm", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-13-dijkstra/", "type": "Video" },
          { "title": "Lecture 13 Notes: Dijkstra", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec13/", "type": "PDF" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dijkstra's Algorithm Starter",
            "description": "Download the starter file with a partially implemented Dijkstra's algorithm. Complete the core algorithm using a priority queue.",
            "guidelines": [
              "Download the starter file (Java or C++)",
              "Complete dijkstra(start) method: implement Dijkstra's algorithm, return shortest distances to all nodes",
              "Complete shortestPath(start, end) method: use Dijkstra's to find shortest path, return list of nodes",
              "Complete reconstructPath(predecessors, start, end) method: reconstruct path from predecessor array",
              "Implement priority queue operations (or use built-in PriorityQueue/priority_queue)",
              "Handle edge cases: unreachable nodes, disconnected graphs",
              "Add time complexity comments (O((V+E)log V) with binary heap)",
              "Test with provided test cases and submit your completed file"
            ],
            "template_files": {
              "java": {
                "filename": "Dijkstra.java",
                "path": "templates/cs102/week11/Dijkstra.java"
              },
              "cpp": {
                "filename": "Dijkstra.cpp",
                "path": "templates/cs102/week11/Dijkstra.cpp"
              }
            }
          },
          "academic": {
            "title": "Dijkstra's Algorithm Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering Dijkstra's algorithm.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze Dijkstra's complexity, identify correct algorithm steps, understand priority queue usage",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain Dijkstra's algorithm, prove correctness, analyze time complexity, compare with BFS",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete Dijkstra's implementation code, fill in priority queue operations, complete relaxation step",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Dijkstra's Algorithm Presentation",
            "description": "Create a 10-15 minute presentation explaining Dijkstra's algorithm. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Problem statement: shortest path in weighted graphs (2 slides), (3) Dijkstra's algorithm step-by-step (4-5 slides), (4) Priority queue usage (2 slides), (5) Correctness intuition (2 slides), (6) Time complexity analysis (2 slides), (7) Real-world applications (2 slides), (8) Conclusion (1 slide)",
              "Content Requirements: Explain algorithm step-by-step, demonstrate with example, show priority queue operations, discuss applications",
              "Visual Aids: Graph diagrams, algorithm execution animations, priority queue visualizations, code examples, application examples (GPS)",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 13 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lecture 13: Dijkstra's Algorithm. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: Dijkstra's algorithm, priority queue usage, correctness proof, time complexity",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 12,
        "topic": "Dynamic Programming Fundamentals",
        "description": "Introduction to dynamic programming paradigm. Learn recursive subproblems, memoization, and solve classic DP problems like Fibonacci, LCS, and LIS.",
        "resources": [
          { "title": "MIT 6.006 Lecture 15: Dynamic Programming, Part 1", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-15-dynamic-programming-part-1-srtbot-fib-dags-bowling/", "type": "Video" },
          { "title": "MIT 6.006 Lecture 16: Dynamic Programming, Part 2", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-16-dynamic-programming-part-2-lcs-lis-coins/", "type": "Video" },
          { "title": "Lecture 15 Notes: DP Part 1", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec15/", "type": "PDF" },
          { "title": "Lecture 16 Notes: DP Part 2", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec16/", "type": "PDF" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dynamic Programming Starter",
            "description": "Download the starter file with partially implemented DP solutions. Complete memoization and bottom-up implementations for classic problems.",
            "guidelines": [
              "Download the starter file (Java or C++)",
              "Complete fibonacci_memoized(n) method: implement memoized Fibonacci using a hash map/dictionary",
              "Complete fibonacci_bottomup(n) method: implement bottom-up Fibonacci using array",
              "Complete longestCommonSubsequence(s1, s2) method: implement LCS using 2D DP table",
              "Complete longestIncreasingSubsequence(arr) method: implement LIS using DP",
              "Compare time/space complexity of memoized vs bottom-up approaches",
              "Add comments explaining the DP pattern for each problem",
              "Test with provided test cases and submit your completed file"
            ],
            "template_files": {
              "java": {
                "filename": "DynamicProgramming.java",
                "path": "templates/cs102/week12/DynamicProgramming.java"
              },
              "cpp": {
                "filename": "DynamicProgramming.cpp",
                "path": "templates/cs102/week12/DynamicProgramming.cpp"
              }
            }
          },
          "academic": {
            "title": "Dynamic Programming Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering dynamic programming concepts and problems.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Identify DP problems, analyze memoization vs tabulation, understand subproblem structure",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain DP paradigm, design DP solutions, analyze time/space complexity, compare with greedy algorithms",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete DP implementation code, fill in memoization logic, complete state transitions",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Dynamic Programming Presentation",
            "description": "Create a 10-15 minute presentation explaining dynamic programming. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to DP paradigm (2 slides), (3) Memoization vs tabulation (2-3 slides), (4) Classic DP problems: Fibonacci, LCS, LIS (4-5 slides), (5) DP pattern recognition (2 slides), (6) Real-world applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain DP concept, demonstrate memoization and tabulation, solve 2-3 classic problems step-by-step",
              "Visual Aids: Recursion trees, memoization tables, DP table fillings, code examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lectures 15-16 Notes Submission",
            "description": "Submit your notes from MIT 6.006 Lectures 15-16: Dynamic Programming. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: DP paradigm, memoization, tabulation, classic DP problems (Fibonacci, LCS, LIS)",
              "Format: Submit as PDF (3-5 pages expected for two lectures)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
      },
      {
        "week": 13,
        "topic": "Final Assessment: Course Summary and Reflection",
        "description": "Complete summarizing Ellis Activities that demonstrate your understanding of the entire course and reflect on your learning journey.",
        "resources": [],
        "deliverables": {
          "builder": {
            "title": "Interactive Data Structures Playground",
            "description": "Build a fun, interactive application that demonstrates multiple data structures and algorithms from the course. Create an engaging visualization tool that lets users explore and interact with different data structures.",
            "guidelines": [
              "Choose one of these fun project ideas (or propose your own):",
              "  - Interactive Sorting Visualizer: Visualize different sorting algorithms (bubble, merge, quick sort) with real-time animations",
              "  - Binary Tree Visualizer: Build and traverse binary trees interactively, show different traversal orders",
              "  - Graph Pathfinding Visualizer: Interactive graph where users can add nodes/edges and see BFS/DFS/Dijkstra in action",
              "  - Hash Table Explorer: Visualize hash collisions, rehashing, and search operations",
              "  - Stack/Queue Simulator: Interactive demonstration of stack and queue operations with visual feedback",
              "Requirements:",
              "  - Use at least 3 different data structures from the course",
              "  - Implement at least 2 algorithms we covered",
              "  - Include real-time visualizations/animations",
              "  - Make it interactive and engaging (user can input data, control speed, etc.)",
              "  - Include complexity analysis in documentation",
              "  - Clean, well-documented code",
              "Submission: Upload your project files or provide GitHub repository link"
            ],
            "template_files": {
              "java": {
                "filename": "FinalProject_Starter.java",
                "path": "templates/cs102/week13/FinalProject_Starter.java"
              },
              "cpp": {
                "filename": "FinalProject_Starter.cpp",
                "path": "templates/cs102/week13/FinalProject_Starter.cpp"
              }
            }
          },
          "academic": {
            "title": "Course Summary Assessment",
            "description": "Complete a summary assessment covering key concepts from throughout the entire course. Same format and length as weekly assessments, but questions span all 12 weeks.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Cover topics from all weeks - Big-O, arrays, linked lists, stacks, queues, hash tables, trees, heaps, graphs, BFS, DFS, Dijkstra, dynamic programming",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Synthesize concepts across weeks, compare data structures, analyze when to use different algorithms, explain key algorithmic paradigms",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete implementations across different data structures and algorithms from the course",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Course Reflection Presentation",
            "description": "Create a 15-20 minute presentation reflecting on your learning journey through the course. Discuss what you learned each week, your thoughts, challenges, and growth.",
            "guidelines": [
              "Slide Structure: (1) Title slide with your name, (2) Course overview and your initial expectations (2 slides), (3) Week-by-week reflection (12 slides - one per week):",
              "  - For each week: What you learned, what was challenging, what you found interesting, key takeaways",
              "(4) Favorite topics and why (2-3 slides), (5) Most challenging concepts and how you overcame them (2 slides), (6) How you'll apply this knowledge (2 slides), (7) Future learning goals (1 slide), (8) Conclusion and final thoughts (1 slide)",
              "Content Requirements: Be honest and reflective. Share both successes and struggles. Show your growth throughout the course",
              "Visual Aids: Use diagrams, code snippets, or examples from your work. Include screenshots of projects if relevant",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Reflection depth and honesty (30%), Coverage of all weeks (25%), Clarity of communication (20%), Visual aids (15%), Delivery/presentation skills (10%)"
            ]
          },
          "lecture_notes": {
            "title": "Course Notes Portfolio Submission",
            "description": "Submit a compilation of your best lecture notes from the course (select 3-4 weeks). This demonstrates your note-taking skills and understanding across the semester.",
            "guidelines": [
              "Select 3-4 weeks of your best lecture notes to include in the portfolio",
              "Format: Submit as single PDF document (8-16 pages total)",
              "Include a brief reflection (1 page) on your note-taking process and how it helped your learning",
              "Grading Rubric: Note quality across selected weeks (50%), Completeness and accuracy (30%), Organization and presentation (20%)",
              "Submission: Upload notes portfolio PDF through course platform"
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
    "prereqs": ["Precalculus"],
    "nice_to_have": ["AP Calculus AB", "AP Calculus BC"],
    "description": "The mathematical language of computer science. Essential for proving code correctness and analyzing speed. Covers proofs, graphs, counting, recurrences, asymptotics, and discrete probability. Anchored by MIT 6.042J/6.1200J.",
    "tier": 1,
    "mit_anchor": "6.042J / 6.1200J Mathematics for Computer Science",
    "weeks": [
      {
        "week": 1,
        "topic": "Propositional Logic and Truth Tables",
        "description": "Learn propositions, logical connectives (AND, OR, NOT, IMPLIES), truth tables, and logical equivalences.",
        "resources": [
          { "title": "MIT 6.042J Lecture 1: Introduction and Proofs", "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/lecture-1-introduction-and-proofs/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Truth Table Generator Template",
            "description": "Download and complete a template file that generates truth tables for compound propositions. Implement the logic evaluation functions.",
            "guidelines": [
              "Step 1: Download the template file 'TruthTableGenerator.java'",
              "Step 2: Implement functions to evaluate logical connectives (AND, OR, NOT, IMPLIES)",
              "Step 3: Implement truth table generation for compound propositions",
              "Step 4: Test with provided examples and submit your completed file",
              "Grading: Correctness (50%), Code quality (25%), Test results (25%)"
            ],
            "template_file": {
              "filename": "TruthTableGenerator.java",
              "content": "public class TruthTableGenerator {\n    // TODO: Implement logical AND operation\n    public static boolean and(boolean p, boolean q) {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement logical OR operation\n    public static boolean or(boolean p, boolean q) {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement logical NOT operation\n    public static boolean not(boolean p) {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement logical IMPLIES operation (p -> q)\n    public static boolean implies(boolean p, boolean q) {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Generate truth table for compound proposition\n    public static void generateTruthTable(String expression) {\n        // Your implementation here\n    }\n}"
            }
          },
          "academic": {
            "title": "Propositional Logic Assessment",
            "description": "Complete an online assessment with MCQ, SAQ, and fill-in-the-blank questions covering propositional logic, truth tables, and logical equivalences.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Evaluate truth values, identify logical equivalences, analyze compound propositions",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Construct truth tables, prove logical equivalences, translate English to logic",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete truth table rows, fill in logical connective evaluations, complete equivalence proofs",
              "Time Limit: 90 minutes. Submit through online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Propositional Logic Teaching Presentation",
            "description": "Create a 10-15 minute presentation teaching propositional logic to fellow students. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure: (1) Title slide, (2) Introduction to propositions (2 slides), (3) Logical connectives with examples (3-4 slides), (4) Truth tables (2-3 slides), (5) Logical equivalences (2 slides), (6) Applications (2 slides), (7) Conclusion (1 slide)",
              "Content Requirements: Explain all connectives, demonstrate truth tables, show logical equivalences, provide examples",
              "Visual Aids: Truth table diagrams, logical expression trees, equivalence examples",
              "Submission: Upload presentation file and either video recording or schedule live presentation",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          },
          "lecture_notes": {
            "title": "Lecture 1 Notes Submission",
            "description": "Submit your notes from MIT 6.042J Lecture 1: Introduction and Proofs. Notes will be assessed for completeness, accuracy, and understanding of key concepts.",
            "guidelines": [
              "Take comprehensive notes covering: propositions, logical connectives, truth tables, proof techniques",
              "Format: Submit as PDF (2-4 pages expected)",
              "Grading Rubric: Completeness (40%), Accuracy (30%), Organization (20%), Critical thinking (10%)",
              "Submission: Upload notes PDF through course platform"
            ]
          }
        }
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

  "Sys 201: Computer Systems (Hardware/Software Interface)": {
    "prereqs": ["AP Computer Science A"],
    "description": "Peeking under the hood. Move from Java's managed memory to C and Assembly, learning how hardware executes software. Covers digital logic, processor design, and the hardware/software interface. Anchored by MIT 6.004 Computation Structures.",
    "tier": 1,
    "mit_anchor": "6.004 Computation Structures",
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
  // TIER 2: The Core (Mid Year 2 - Early Year 3)
  // Rigorous center of CS degree
  // ============================================

  "CS 301: Design & Analysis of Algorithms": {
    "prereqs": ["CS 102: Data Structures & Algorithms", "Math 201: Discrete Mathematics for CS"],
    "nice_to_have": ["AP Calculus AB", "AP Calculus BC"],
    "description": "The primary filter for Big Tech interviews and the theoretical peak of the undergraduate core. Focuses on solving hard problems efficiently through graph algorithms, dynamic programming, and amortized analysis. Anchored by MIT 6.006 advanced topics.",
    "tier": 2,
    "mit_anchor": "6.006 Introduction to Algorithms (advanced topics)",
    "weeks": [
      {
        "week": 1,
        "topic": "Graph Algorithms: Dijkstra and Shortest Paths",
        "description": "Implement Dijkstra's algorithm for single-source shortest paths. Understand priority queue usage.",
        "resources": [
          { "title": "Dijkstra's Algorithm", "url": "https://www.youtube.com/watch?v=XB4MIexjvY0", "type": "Video" },
          { "title": "Shortest Path Algorithms", "url": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 24: Single-Source Shortest Paths (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture9.pdf", "type": "PDF" }
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
          { "title": "Bellman-Ford Tutorial", "url": "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 24: Bellman-Ford Algorithm (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture10.pdf", "type": "PDF" }
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
          { "title": "Floyd-Warshall Tutorial", "url": "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 25: All-Pairs Shortest Paths (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture11.pdf", "type": "PDF" }
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
          { "title": "Prim and Kruskal", "url": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 23: Minimum Spanning Trees (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture11.pdf", "type": "PDF" }
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
          { "title": "Merge Sort Analysis", "url": "https://www.geeksforgeeks.org/merge-sort/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 2 & 7: Divide and Conquer Sorting (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture3.pdf", "type": "PDF" }
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
          { "title": "DP Tutorial", "url": "https://www.geeksforgeeks.org/dynamic-programming/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 15: Dynamic Programming (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture5.pdf", "type": "PDF" }
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
          { "title": "Greedy Strategy", "url": "https://www.geeksforgeeks.org/greedy-algorithms/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 16: Greedy Algorithms (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture7.pdf", "type": "PDF" }
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
          { "title": "NP-Completeness", "url": "https://www.geeksforgeeks.org/np-completeness-set-1/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 34: NP-Completeness (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture15.pdf", "type": "PDF" }
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
    "prereqs": ["Sys 201: Computer Systems (Hardware/Software Interface)", "CS 102: Data Structures & Algorithms"],
    "nice_to_have": ["Math 201: Discrete Mathematics for CS"],
    "description": "Building the software that manages the hardware. Famous for massive C coding projects (building a kernel, file system, or shell). Covers processes, virtual memory, file systems, and concurrency. Anchored by MIT 6.828/6.1810 Operating System Engineering.",
    "tier": 2,
    "mit_anchor": "6.828 / 6.1810 Operating System Engineering",
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
    "prereqs": ["CS 102: Data Structures & Algorithms"],
    "nice_to_have": ["Sys 201: Computer Systems (Hardware/Software Interface)"],
    "description": "The 'Practical' core. Translating theory into shipped, scalable, maintainable products. Covers modularity, interfaces, networking, security, and fault tolerance with modern web practices layered on top. Anchored by MIT 6.033 Computer System Engineering.",
    "tier": 2,
    "mit_anchor": "6.033 Computer System Engineering",
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
  // TIER 3: Advanced Specializations (Late Year 2 - Year 3)
  // Early specialization - not full senior-level grad stuff
  // ============================================

  // Artificial Intelligence & Machine Learning
  "AI 401: Intro to Machine Learning": {
    "prereqs": ["CS 301: Design & Analysis of Algorithms", "Math 201: Discrete Mathematics for CS"],
    "nice_to_have": ["Linear Algebra", "AP Statistics"],
    "description": "Introduction to machine learning: regression, classification, neural networks, and backpropagation. Covers toned-down undergrad ML structure aligned with introductory MIT ML topics. Anchored by MIT 6.034 Artificial Intelligence introductory ML units.",
    "tier": 3,
    "mit_anchor": "6.034 Artificial Intelligence (ML units)",
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

  // Systems & Infrastructure
  "Sys 401: Database System Implementation": {
    "prereqs": ["CS 102: Data Structures & Algorithms", "Sys 301: Operating Systems (OS)"],
    "nice_to_have": ["Math 201: Discrete Mathematics for CS"],
    "description": "Building a database engine (not just using SQL). B+ Trees, buffer management, query optimization, ACID transactions, and WAL. Anchored by MIT 6.033 database/storage units.",
    "tier": 3,
    "mit_anchor": "6.033 Computer System Engineering (database units)",
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

  // Security & Cryptography
  "Sec 301: Network & Computer Security": {
    "prereqs": ["Sys 201: Computer Systems (Hardware/Software Interface)"],
    "nice_to_have": ["Sys 301: Operating Systems (OS)", "Math 201: Discrete Mathematics for CS"],
    "description": "The 'Hacker' course. Learn how systems break to understand how to defend them. Covers threat models, vulnerabilities, basic crypto use, and secure design. Anchored by MIT 6.033 security/privacy units.",
    "tier": 3,
    "mit_anchor": "6.033 Computer System Engineering (security units)",
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
    "nice_to_have": ["Linear Algebra", "AP Calculus AB", "AP Calculus BC"],
    "description": "The math behind secrets. Learn how encryption works, from symmetric ciphers to public key cryptography and zero-knowledge proofs. Leverages number theory and modular arithmetic from MIT's Mathematics for Computer Science.",
    "tier": 3,
    "mit_anchor": "6.042J / 6.1200J Mathematics for Computer Science (cryptography sections)",
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
    "prereqs": ["Sys 201: Computer Systems (Hardware/Software Interface)"],
    "description": "Disassembling viruses to see how they work. Learn to use tools like Ghidra and IDA Pro to analyze malicious code safely.",
    "tier": 3,
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

  // Graphics & Game Development
  "CS 403: Computer Graphics (Real-Time Rendering)": {
    "prereqs": ["CS 102: Data Structures & Algorithms"],
    "nice_to_have": ["Linear Algebra", "Multivariable Calculus"],
    "description": "How to render millions of polygons onto the screen at 60 FPS. Learn the GPU pipeline, shaders, and 3D mathematics.",
    "tier": 3,
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
    "prereqs": ["CS 102: Data Structures & Algorithms"],
    "nice_to_have": ["Sys 201: Computer Systems (Hardware/Software Interface)", "CS 403: Computer Graphics (Real-Time Rendering)"],
    "description": "Building 'Unity' from scratch. Learn the game loop, physics engines, entity component systems, and memory management for games.",
    "tier": 3,
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

  "Fin 301: Blockchain & Decentralized Finance": {
    "prereqs": ["Math 302: Cryptography"],
    "description": "Web3 engineering. Learn distributed ledgers, consensus algorithms, smart contracts, and DeFi protocols.",
    "tier": 3,
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

};
