export const CURRICULUM_DATA = {
  // ============================================
  // TIER 1: The Gatekeepers (Year 1 - Early Year 2)
  // Non-negotiable pillars of CS education
  // ============================================

  "CS 102: Data Structures & Algorithms": {
    "prereqs": ["AP Computer Science A"],
    "nice_to_have": ["Precalculus"],
    "description": "The universal follow-up to AP CSA. Master efficiency and data organization through Big-O analysis, fundamental data structures, and core algorithms. Anchored by MIT 6.006.",
    "tier": 1,
    "mit_anchor": "6.006 Introduction to Algorithms",
    "weeks": [
      {
        "week": 1,
        "topic": "Asymptotic Analysis: Big-O Notation",
        "description": "Formal Big-O analysis of time and space complexity. Learn to analyze algorithm efficiency.",
        "resources": [
          { "title": "Big-O Notation Explained", "url": "https://www.youtube.com/watch?v=__vX2sjlpXU", "type": "Video" },
          { "title": "Big-O Notation Tutorial", "url": "https://www.youtube.com/watch?v=Mo4vesaut8g", "type": "Video" },
          { "title": "Understanding Big-O Notation", "url": "https://www.youtube.com/watch?v=kS_gr2_-ws8", "type": "Video" },
          { "title": "Big-O Cheat Sheet", "url": "https://www.bigocheatsheet.com/", "type": "Article" },
          { "title": "Introduction to Algorithms (CLRS) - Chapter 3: Growth of Functions (PDF)", "url": "https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture2.pdf", "type": "PDF" }
        ],
        "deliverables": {
          "builder": {
            "title": "Big-O Analysis Template",
            "description": "Complete a template file containing 4 partially implemented algorithms. Your task is to: (1) Implement the missing code sections marked with TODO comments, (2) Analyze and document the time complexity of each algorithm using Big-O notation, (3) Test each implementation with provided test cases, (4) Submit your completed file with all code working and complexity analysis included.",
            "guidelines": [
              "Implementation Requirements (Required):",
              "  (1) Download the template file (Java or C++) from the download button below",
              "  (2) Open the file in your IDE - you will find 4 functions with TODO comments:",
              "    - findMax(): Find maximum value in array",
              "    - linearSearch(): Search for target value in array",
              "    - bubbleSort(): Sort array using bubble sort algorithm",
              "    - binarySearch(): Search for target in sorted array",
              "  (3) Implement each function according to the comments and specifications",
              "  (4) Ensure your code compiles without errors",
              "Code Documentation (Required):",
              "  Above each completed function, add a comment block explaining:",
              "    (a) Time complexity in Big-O notation",
              "    (b) Space complexity",
              "    (c) Best case, average case, and worst case scenarios",
              "Testing Requirements (Required):",
              "  (a) Run the provided test cases (included in the template) to verify your implementations work correctly",
              "  (b) Ensure all test cases pass",
              "  (c) Test edge cases (empty arrays, single elements, already sorted arrays, etc.)",
              "Code Quality Requirements:",
              "  (a) Use meaningful variable names (arr, target, left, right, etc.)",
              "  (b) Follow consistent code style and formatting",
              "  (c) Include appropriate comments for complex logic",
              "  (d) Organize code logically"
            ],
            "template_files": {
              "java": {
                "filename": "BigO_Analysis.java",
                "content": "public class BigO_Analysis {\n    \n    // TODO: Implement this function to find the maximum value in an array\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static int findMax(int[] arr) {\n        // Your implementation here\n        return -1;\n    }\n    \n    // TODO: Implement linear search to find the index of target value\n    // Return -1 if not found\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static int linearSearch(int[] arr, int target) {\n        // Your implementation here\n        return -1;\n    }\n    \n    // TODO: Implement bubble sort algorithm\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static void bubbleSort(int[] arr) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement binary search (assumes array is sorted)\n    // Return -1 if not found\n    // Time Complexity: ???\n    // Space Complexity: ???\n    public static int binarySearch(int[] arr, int target) {\n        // Your implementation here\n        return -1;\n    }\n    \n    // Test cases - uncomment to test your implementations\n    public static void main(String[] args) {\n        int[] test1 = {3, 1, 4, 1, 5, 9, 2, 6};\n        System.out.println(\"findMax test: \" + (findMax(test1) == 9 ? \"PASS\" : \"FAIL\"));\n        \n        int[] test2 = {1, 2, 3, 4, 5};\n        System.out.println(\"linearSearch test: \" + (linearSearch(test2, 3) == 2 ? \"PASS\" : \"FAIL\"));\n        \n        int[] test3 = {5, 2, 8, 1, 9};\n        bubbleSort(test3);\n        System.out.println(\"bubbleSort test: \" + (test3[0] == 1 && test3[4] == 9 ? \"PASS\" : \"FAIL\"));\n        \n        int[] test4 = {1, 3, 5, 7, 9};\n        System.out.println(\"binarySearch test: \" + (binarySearch(test4, 5) == 2 ? \"PASS\" : \"FAIL\"));\n    }\n}"
              },
              "cpp": {
                "filename": "BigO_Analysis.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// TODO: Implement findMax\nint findMax(vector<int>& arr) {\n    // Your implementation here\n    return -1;\n}\n\n// TODO: Implement linearSearch\nint linearSearch(vector<int>& arr, int target) {\n    // Your implementation here\n    return -1;\n}\n\n// TODO: Implement bubbleSort\nvoid bubbleSort(vector<int>& arr) {\n    // Your implementation here\n}\n\n// TODO: Implement binarySearch\nint binarySearch(vector<int>& arr, int target) {\n    // Your implementation here\n    return -1;\n}\n\nint main() {\n    // Test cases\n    vector<int> test1 = {3, 1, 4, 1, 5, 9, 2, 6};\n    cout << \"findMax test: \" << (findMax(test1) == 9 ? \"PASS\" : \"FAIL\") << endl;\n    return 0;\n}"
              }
            }
          },
          "academic": {
            "title": "Big-O Notation Assessment",
            "description": "Complete a comprehensive written assessment demonstrating mastery of asymptotic analysis. You will: (1) Analyze 10 code snippets to determine their time and space complexity, (2) Prove 3 Big-O bounds using formal mathematical definitions, (3) Compare algorithms within the same complexity class, (4) Analyze best, average, and worst case scenarios. Submit a PDF document with all solutions showing step-by-step work and clear mathematical reasoning.",
            "guidelines": [
              "Part 1 - Code Analysis (40 points): Analyze 10 provided code snippets. For each snippet: (a) Identify all loops and nested structures, (b) Count operations in terms of input size n, (c) Determine time complexity in Big-O notation, (d) Determine space complexity, (e) Provide 2-3 sentence justification for your answer",
              "Part 2 - Formal Proofs (30 points): Prove 3 Big-O bounds using the formal definition: f(n) = O(g(n)) if there exist positive constants c and n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀. Show: (a) Your choice of c and n₀, (b) Algebraic manipulation proving the inequality, (c) Clear conclusion",
              "Part 3 - Algorithm Comparison (15 points): Compare 3 sorting algorithms (e.g., Merge Sort, Quick Sort, Heap Sort) all in O(n log n). Explain: (a) When each performs best, (b) Space requirements, (c) Stability, (d) Practical considerations",
              "Part 4 - Case Analysis (15 points): For 2 algorithms with varying performance, analyze: (a) Best case scenario with example input, (b) Average case with expected input, (c) Worst case scenario with adversarial input, (d) Time complexity for each case",
              "Format Requirements: Submit as a single PDF document. Use clear headings for each part. Show all work - partial credit will be given for correct reasoning even if final answer is wrong. Include your name and date on the first page",
              "Grading: Correctness (60%), Mathematical rigor (25%), Clarity of explanation (15%)"
            ]
          },
          "communicator": {
            "title": "Big-O Notation Teaching Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation teaching Big-O notation to fellow students. Your presentation must: (1) Explain what Big-O notation is and why it matters in software development, (2) Cover 5 common complexity classes with real code examples, (3) Demonstrate how to analyze code step-by-step, (4) Use visual graphs showing how different complexities scale, (5) Connect theory to real-world impact. Submit your slides (PDF or PowerPoint) and either a video recording or deliver live to the class.",
            "guidelines": [
              "Slide Structure (Required):",
              "  (1) Title slide with your name",
              "  (2) Introduction: What is Big-O? (2-3 slides)",
              "    - Define Big-O notation in simple terms",
              "    - Explain why it matters in software development",
              "  (3) Why it matters: Real-world examples (2 slides)",
              "    - Show examples of slow vs fast algorithms",
              "    - Connect to user experience and system performance",
              "  (4) Complexity classes: O(1), O(log n), O(n), O(n log n), O(n²) with code examples (5-6 slides)",
              "    - For each complexity class, include:",
              "      (a) Definition in simple terms",
              "      (b) At least one code example",
              "      (c) Real-world use case",
              "      (d) Visual representation (graph or chart)",
              "  (5) How to analyze: Step-by-step walkthrough of 2 code examples (3-4 slides)",
              "    - Show the code",
              "    - Line-by-line complexity analysis",
              "    - Final Big-O result",
              "    - Explanation of why",
              "  (6) Visual comparison: Graph showing growth rates (1-2 slides)",
              "    - Graph showing how O(1), O(log n), O(n), O(n log n), and O(n²) grow",
              "    - Use different colors for each line",
              "    - Include axis labels and a legend",
              "  (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: For each complexity class, include: (a) Definition in simple terms, (b) At least one code example, (c) Real-world use case (e.g., O(log n) for binary search in phone contacts), (d) Visual representation (graph or chart)",
              "Code Examples: Include 2-3 complete code examples that you analyze step-by-step. Show: (a) The code, (b) Line-by-line complexity analysis, (c) Final Big-O result, (d) Explanation of why",
              "Visual Aids: Create or use a graph showing how O(1), O(log n), O(n), O(n log n), and O(n²) grow as input size increases. Use different colors for each line. Include axis labels and a legend",
              "Delivery: Speak clearly and at an appropriate pace. Use transitions between slides. Engage the audience with questions or examples. If recording, ensure good audio quality and visible slides",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time with your instructor",
              "Grading Criteria: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
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
            "title": "Dynamic Array and Linked List Implementation",
            "description": "Implement complete DynamicArray and LinkedList classes from scratch. Your implementation must include: (1) Full class implementations with all core methods, (2) Proper memory management (resizing for arrays, node management for lists), (3) Time complexity analysis for each method, (4) Comprehensive test suite. This project demonstrates understanding of linear data structures and their tradeoffs.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Download the template file (Java or C++) from the download button below, (2) Implement a complete DynamicArray<T> generic class with all core methods, (3) Implement a complete LinkedList<T> generic class with all core methods, (4) Both classes must be fully functional and production-ready",
              "DynamicArray Class (Required): (1) Implement constructor that initializes with default capacity (e.g., 10), (2) Implement resize() method that doubles capacity when array is full, (3) Implement add(int index, T item) method with bounds checking and element shifting, (4) Implement addLast(T item) method for appending, (5) Implement remove(int index) method that removes and shifts elements, (6) Implement get(int index) and set(int index, T item) methods, (7) Implement size() and isEmpty() methods, (8) Implement clear() method to reset array",
              "LinkedList Class (Required): (1) Implement Node<T> inner class to store data and next pointer, (2) Implement constructor initializing head and size, (3) Implement addFirst(T item) method adding to head, (4) Implement addLast(T item) method adding to tail, (5) Implement add(int index, T item) method inserting at specific position, (6) Implement remove(T item) method finding and removing first occurrence, (7) Implement remove(int index) method removing at position, (8) Implement get(int index) method traversing to index, (9) Implement size() and isEmpty() methods, (10) Implement helper methods: findNode(T item), getNode(int index)",
              "Complexity Analysis (Required): (1) Above each method, add comment block with: (a) Time complexity in Big-O notation, (b) Space complexity if applicable, (c) Best/average/worst case scenarios, (2) Example: '// O(1) amortized time, O(1) space' for addLast(), (3) Document why resize is O(n) but amortized O(1)",
              "Code Quality Requirements: (a) Use meaningful variable names (capacity, size, head, tail, current), (b) Follow consistent code style and formatting, (c) Include comments for complex logic (resizing, node manipulation), (d) Handle edge cases properly (empty list, single element, boundaries), (e) Ensure no memory leaks (proper node cleanup in LinkedList)",
              "Testing Requirements (Required): (a) Run the comprehensive test suite included in template (15+ test cases), (b) Test edge cases: empty structures, single element, adding/removing at boundaries, (c) Test with various data types (Integer, String, custom objects), (d) Verify all test cases pass, (e) Test memory efficiency (no leaks)"
            ],
            "template_files": {
              "java": {
                "filename": "DynamicArray_LinkedList.java",
                "content": "import java.util.Arrays;\n\n// DynamicArray class with generic type support\npublic class DynamicArray<T> {\n    private T[] array;\n    private int size;\n    private int capacity;\n    private static final int DEFAULT_CAPACITY = 10;\n    \n    // TODO: Implement constructor that initializes array with initial capacity\n    @SuppressWarnings(\"unchecked\")\n    public DynamicArray() {\n        // Your implementation here\n        // Initialize capacity to DEFAULT_CAPACITY\n        // Create array of type T\n        // Set size to 0\n    }\n    \n    // TODO: Implement resize method that doubles the capacity when array is full\n    // Time Complexity: O(n) - must copy all elements\n    // Space Complexity: O(n) - new array allocation\n    @SuppressWarnings(\"unchecked\")\n    private void resize() {\n        // Your implementation here\n        // Double the capacity\n        // Create new array with new capacity\n        // Copy all elements from old array to new array\n        // Update array reference\n    }\n    \n    // TODO: Implement addLast method to append item to end\n    // Time Complexity: O(1) amortized (O(n) worst case when resizing)\n    // Space Complexity: O(1) amortized\n    public void addLast(T item) {\n        // Your implementation here\n        // Check if resize needed (size >= capacity)\n        // Add item at index 'size'\n        // Increment size\n    }\n    \n    // TODO: Implement add method to insert item at given index\n    // Time Complexity: O(n) - must shift elements\n    // Space Complexity: O(1)\n    public void add(int index, T item) {\n        // Your implementation here\n        // Check bounds (0 <= index <= size)\n        // Check if resize needed\n        // Shift elements from index to end right by one position\n        // Insert item at index\n        // Increment size\n    }\n    \n    // TODO: Implement remove method to remove item at given index\n    // Time Complexity: O(n) - must shift elements\n    // Space Complexity: O(1)\n    public T remove(int index) {\n        // Your implementation here\n        // Check bounds (0 <= index < size)\n        // Save element at index\n        // Shift elements from index+1 to end left by one position\n        // Decrement size\n        // Return removed element\n        return null;\n    }\n    \n    // TODO: Implement get method to retrieve item at given index\n    // Time Complexity: O(1)\n    // Space Complexity: O(1)\n    public T get(int index) {\n        // Your implementation here\n        // Check bounds\n        // Return element at index\n        return null;\n    }\n    \n    // TODO: Implement set method to update item at given index\n    // Time Complexity: O(1)\n    // Space Complexity: O(1)\n    public void set(int index, T item) {\n        // Your implementation here\n        // Check bounds\n        // Set element at index to item\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: O(1)\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: O(1)\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement clear method to reset array\n    // Time Complexity: O(1)\n    public void clear() {\n        // Your implementation here\n        // Reset size to 0\n        // Optionally reset array\n    }\n}\n\n// Node class for LinkedList\nclass Node<T> {\n    T data;\n    Node<T> next;\n    \n    Node(T data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\n// LinkedList class with generic type support\npublic class LinkedList<T> {\n    private Node<T> head;\n    private int size;\n    \n    // TODO: Implement constructor\n    public LinkedList() {\n        // Your implementation here\n        // Initialize head to null\n        // Initialize size to 0\n    }\n    \n    // TODO: Implement addFirst method\n    // Time Complexity: O(1)\n    // Space Complexity: O(1)\n    public void addFirst(T item) {\n        // Your implementation here\n        // Create new node with item\n        // Set new node's next to current head\n        // Update head to new node\n        // Increment size\n    }\n    \n    // TODO: Implement addLast method\n    // Time Complexity: O(n) - must traverse to end\n    // Space Complexity: O(1)\n    public void addLast(T item) {\n        // Your implementation here\n        // Create new node\n        // If list is empty, set head to new node\n        // Otherwise, traverse to last node and set its next to new node\n        // Increment size\n    }\n    \n    // TODO: Implement add method to insert at specific index\n    // Time Complexity: O(n) - must traverse to index\n    // Space Complexity: O(1)\n    public void add(int index, T item) {\n        // Your implementation here\n        // Check bounds (0 <= index <= size)\n        // If index is 0, use addFirst\n        // Otherwise, traverse to node at index-1\n        // Insert new node after that node\n        // Increment size\n    }\n    \n    // TODO: Implement helper method to find node containing item\n    // Time Complexity: O(n)\n    // Space Complexity: O(1)\n    private Node<T> findNode(T item) {\n        // Your implementation here\n        // Traverse list looking for node with matching data\n        // Return node if found, null otherwise\n        return null;\n    }\n    \n    // TODO: Implement remove method to remove first occurrence of item\n    // Time Complexity: O(n)\n    // Space Complexity: O(1)\n    public boolean remove(T item) {\n        // Your implementation here\n        // Handle empty list\n        // Handle removal of head\n        // Otherwise, find node and remove it\n        // Decrement size\n        // Return true if removed, false if not found\n        return false;\n    }\n    \n    // TODO: Implement remove method to remove at specific index\n    // Time Complexity: O(n)\n    // Space Complexity: O(1)\n    public T remove(int index) {\n        // Your implementation here\n        // Check bounds\n        // Handle removal of head\n        // Otherwise, traverse to node at index-1 and remove next node\n        // Decrement size\n        // Return removed data\n        return null;\n    }\n    \n    // TODO: Implement get method\n    // Time Complexity: O(n)\n    // Space Complexity: O(1)\n    public T get(int index) {\n        // Your implementation here\n        // Check bounds\n        // Traverse to node at index\n        // Return data\n        return null;\n    }\n    \n    // TODO: Implement getNode helper method\n    // Time Complexity: O(n)\n    private Node<T> getNode(int index) {\n        // Your implementation here\n        // Traverse to node at index\n        // Return node\n        return null;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: O(1)\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: O(1)\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n}\n\n// Comprehensive test cases\nclass TestCases {\n    public static void main(String[] args) {\n        System.out.println(\"=== Testing DynamicArray ===\");\n        DynamicArray<Integer> arr = new DynamicArray<>();\n        \n        // Test addLast and size\n        arr.addLast(10);\n        arr.addLast(20);\n        System.out.println(\"Test 1: \" + (arr.size() == 2 ? \"PASS\" : \"FAIL\"));\n        \n        // Test get\n        System.out.println(\"Test 2: \" + (arr.get(0) == 10 ? \"PASS\" : \"FAIL\"));\n        \n        // Test add at index\n        arr.add(1, 15);\n        System.out.println(\"Test 3: \" + (arr.get(1) == 15 ? \"PASS\" : \"FAIL\"));\n        \n        // Test remove\n        int removed = arr.remove(1);\n        System.out.println(\"Test 4: \" + (removed == 15 && arr.size() == 2 ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\n=== Testing LinkedList ===\");\n        LinkedList<Integer> list = new LinkedList<>();\n        \n        // Test addFirst\n        list.addFirst(5);\n        list.addFirst(3);\n        System.out.println(\"Test 5: \" + (list.get(0) == 3 ? \"PASS\" : \"FAIL\"));\n        \n        // Test addLast\n        list.addLast(7);\n        System.out.println(\"Test 6: \" + (list.get(2) == 7 ? \"PASS\" : \"FAIL\"));\n        \n        // Test size\n        System.out.println(\"Test 7: \" + (list.size() == 3 ? \"PASS\" : \"FAIL\"));\n        \n        // Test remove\n        boolean removed2 = list.remove(5);\n        System.out.println(\"Test 8: \" + (removed2 && list.size() == 2 ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\nAll tests completed!\");\n    }\n}"
              },
              "cpp": {
                "filename": "DynamicArray_LinkedList.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <stdexcept>\nusing namespace std;\n\ntemplate<typename T>\nclass DynamicArray {\nprivate:\n    T* array;\n    int size;\n    int capacity;\n    static const int DEFAULT_CAPACITY = 10;\n    \n    void resize() {\n        capacity *= 2;\n        T* newArray = new T[capacity];\n        for (int i = 0; i < size; i++) {\n            newArray[i] = array[i];\n        }\n        delete[] array;\n        array = newArray;\n    }\n    \npublic:\n    DynamicArray() : size(0), capacity(DEFAULT_CAPACITY) {\n        array = new T[capacity];\n    }\n    \n    void addLast(const T& item) {\n        if (size >= capacity) resize();\n        array[size++] = item;\n    }\n    \n    void add(int index, const T& item) {\n        if (index < 0 || index > size) throw out_of_range(\"Index out of range\");\n        if (size >= capacity) resize();\n        for (int i = size; i > index; i--) {\n            array[i] = array[i-1];\n        }\n        array[index] = item;\n        size++;\n    }\n    \n    T remove(int index) {\n        if (index < 0 || index >= size) throw out_of_range(\"Index out of range\");\n        T item = array[index];\n        for (int i = index; i < size - 1; i++) {\n            array[i] = array[i+1];\n        }\n        size--;\n        return item;\n    }\n    \n    T get(int index) const {\n        if (index < 0 || index >= size) throw out_of_range(\"Index out of range\");\n        return array[index];\n    }\n    \n    int getSize() const { return size; }\n    bool isEmpty() const { return size == 0; }\n    \n    ~DynamicArray() { delete[] array; }\n};\n\ntemplate<typename T>\nclass Node {\npublic:\n    T data;\n    Node<T>* next;\n    Node(const T& data) : data(data), next(nullptr) {}\n};\n\ntemplate<typename T>\nclass LinkedList {\nprivate:\n    Node<T>* head;\n    int size;\n    \npublic:\n    LinkedList() : head(nullptr), size(0) {}\n    \n    void addFirst(const T& item) {\n        Node<T>* newNode = new Node<T>(item);\n        newNode->next = head;\n        head = newNode;\n        size++;\n    }\n    \n    void addLast(const T& item) {\n        Node<T>* newNode = new Node<T>(item);\n        if (!head) {\n            head = newNode;\n        } else {\n            Node<T>* current = head;\n            while (current->next) current = current->next;\n            current->next = newNode;\n        }\n        size++;\n    }\n    \n    T get(int index) const {\n        if (index < 0 || index >= size) throw out_of_range(\"Index out of range\");\n        Node<T>* current = head;\n        for (int i = 0; i < index; i++) current = current->next;\n        return current->data;\n    }\n    \n    int getSize() const { return size; }\n    bool isEmpty() const { return size == 0; }\n};\n\nint main() {\n    // Test cases\n    DynamicArray<int> arr;\n    arr.addLast(10);\n    cout << \"DynamicArray test: \" << (arr.get(0) == 10 ? \"PASS\" : \"FAIL\") << endl;\n    \n    LinkedList<int> list;\n    list.addFirst(5);\n    cout << \"LinkedList test: \" << (list.get(0) == 5 ? \"PASS\" : \"FAIL\") << endl;\n    return 0;\n}"
              }
            }
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
            "title": "Stack, Queue, and Deque Implementation",
            "description": "Implement complete Stack, Queue, and Deque classes from scratch, then use them to build practical applications. Your implementation must include: (1) Full class implementations with all core methods, (2) Balanced parentheses checker using Stack, (3) Task scheduler using Queue, (4) Time complexity analysis for each method. This project demonstrates understanding of LIFO, FIFO, and double-ended queue operations.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Download the template file (Java or C++) from the download button below, (2) Implement a complete Stack<T> generic class with all core methods, (3) Implement a complete Queue<T> generic class with all core methods, (4) Implement a complete Deque<T> generic class with all core methods, (5) All classes must be fully functional and production-ready",
              "Stack Class (Required): (1) Implement constructor initializing internal data structure, (2) Implement push(T item) method adding to top, (3) Implement pop() method removing and returning top element, (4) Implement peek() method returning top without removing, (5) Implement isEmpty() and size() methods, (6) Handle stack underflow (throw exception or return null), (7) Add comments explaining LIFO principle",
              "Queue Class (Required): (1) Implement constructor initializing internal data structure, (2) Implement enqueue(T item) method adding to rear, (3) Implement dequeue() method removing and returning front element, (4) Implement front() method returning front without removing, (5) Implement isEmpty() and size() methods, (6) Handle queue underflow, (7) Add comments explaining FIFO principle",
              "Deque Class (Required): (1) Implement constructor, (2) Implement addFirst(T item) and addLast(T item) methods, (3) Implement removeFirst() and removeLast() methods, (4) Implement peekFirst() and peekLast() methods, (5) Implement isEmpty() and size() methods, (6) Handle underflow for all operations, (7) Add comments explaining double-ended operations",
              "Balanced Parentheses Checker (Required): (1) Implement BalancedParenthesesChecker class using your Stack, (2) Implement isBalanced(String expression) method that returns true if parentheses are balanced, (3) Handle three types: '()', '[]', '{}', (4) Use stack to track opening brackets and match with closing brackets, (5) Return false for unmatched brackets or incorrect nesting, (6) Add comments explaining algorithm",
              "Task Scheduler (Required): (1) Implement TaskScheduler class using your Queue, (2) Implement scheduleTask(String task) method adding task to queue, (3) Implement executeNext() method removing and returning next task, (4) Implement hasTasks() method checking if tasks remain, (5) Implement getQueueSize() method returning number of pending tasks, (6) Add comments explaining FIFO scheduling",
              "Complexity Analysis (Required): (1) Above each method, add comment with time complexity in Big-O notation, (2) Document space complexity if applicable, (3) Explain why operations are O(1) for well-implemented structures",
              "Code Quality Requirements: (a) Use meaningful variable names, (b) Include detailed comments explaining LIFO/FIFO principles, (c) Handle edge cases (empty structures, single element), (d) Proper error handling",
              "Testing Requirements (Required): (a) Run comprehensive test suite (15+ test cases), (b) Test all operations on empty, single-element, and multi-element structures, (c) Test balanced parentheses checker with various expressions, (d) Test task scheduler with multiple tasks, (e) All test cases must pass"
            ],
            "template_files": {
              "java": {
                "filename": "Stack_Queue_Deque.java",
                "content": "import java.util.LinkedList;\n\n// Stack Implementation (LIFO - Last In First Out)\npublic class Stack<T> {\n    private LinkedList<T> list;\n    \n    // TODO: Implement constructor\n    public Stack() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement push method to add item to top\n    // Time Complexity: O(1)\n    public void push(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement pop method to remove and return top item\n    // Time Complexity: O(1)\n    public T pop() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement peek method to return top without removing\n    // Time Complexity: O(1)\n    public T peek() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: O(1)\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: O(1)\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Queue Implementation (FIFO - First In First Out)\npublic class Queue<T> {\n    private LinkedList<T> list;\n    \n    // TODO: Implement constructor\n    public Queue() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement enqueue method to add item to rear\n    // Time Complexity: O(1)\n    public void enqueue(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement dequeue method to remove and return front item\n    // Time Complexity: O(1)\n    public T dequeue() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement front method to return front without removing\n    // Time Complexity: O(1)\n    public T front() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: O(1)\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: O(1)\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Deque Implementation (Double-Ended Queue)\npublic class Deque<T> {\n    private LinkedList<T> list;\n    \n    // TODO: Implement constructor\n    public Deque() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addFirst method\n    // Time Complexity: O(1)\n    public void addFirst(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addLast method\n    // Time Complexity: O(1)\n    public void addLast(T item) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement removeFirst method\n    // Time Complexity: O(1)\n    public T removeFirst() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement removeLast method\n    // Time Complexity: O(1)\n    public T removeLast() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement peekFirst method\n    // Time Complexity: O(1)\n    public T peekFirst() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement peekLast method\n    // Time Complexity: O(1)\n    public T peekLast() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement isEmpty method\n    // Time Complexity: O(1)\n    public boolean isEmpty() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement size method\n    // Time Complexity: O(1)\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Balanced Parentheses Checker using Stack\nclass BalancedParenthesesChecker {\n    // TODO: Implement isBalanced method using your Stack\n    // Time Complexity: O(n) where n is length of expression\n    public static boolean isBalanced(String expression) {\n        // Your implementation here\n        // Use a Stack to track opening brackets\n        // When you see '(', '[', '{' -> push to stack\n        // When you see ')', ']', '}' -> pop from stack and check if it matches\n        // Return true if stack is empty at end (all matched)\n        return false;\n    }\n}\n\n// Task Scheduler using Queue\nclass TaskScheduler {\n    private Queue<String> taskQueue;\n    \n    // TODO: Implement constructor\n    public TaskScheduler() {\n        // Your implementation here\n    }\n    \n    // TODO: Implement scheduleTask method\n    // Time Complexity: O(1)\n    public void scheduleTask(String task) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement executeNext method\n    // Time Complexity: O(1)\n    public String executeNext() {\n        // Your implementation here\n        return null;\n    }\n    \n    // TODO: Implement hasTasks method\n    // Time Complexity: O(1)\n    public boolean hasTasks() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement getQueueSize method\n    // Time Complexity: O(1)\n    public int getQueueSize() {\n        // Your implementation here\n        return 0;\n    }\n}\n\n// Comprehensive test cases\nclass TestCases {\n    public static void main(String[] args) {\n        System.out.println(\"=== Testing Stack ===\");\n        Stack<Integer> stack = new Stack<>();\n        stack.push(1);\n        stack.push(2);\n        System.out.println(\"Test 1: \" + (stack.pop() == 2 ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 2: \" + (stack.peek() == 1 ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 3: \" + (stack.size() == 1 ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\n=== Testing Queue ===\");\n        Queue<String> queue = new Queue<>();\n        queue.enqueue(\"first\");\n        queue.enqueue(\"second\");\n        System.out.println(\"Test 4: \" + (queue.dequeue().equals(\"first\") ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 5: \" + (queue.front().equals(\"second\") ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\n=== Testing Deque ===\");\n        Deque<Character> deque = new Deque<>();\n        deque.addFirst('a');\n        deque.addLast('b');\n        System.out.println(\"Test 6: \" + (deque.removeFirst() == 'a' ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 7: \" + (deque.removeLast() == 'b' ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\n=== Testing Balanced Parentheses ===\");\n        System.out.println(\"Test 8: \" + (BalancedParenthesesChecker.isBalanced(\"()\") ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 9: \" + (BalancedParenthesesChecker.isBalanced(\"([{}])\") ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 10: \" + (!BalancedParenthesesChecker.isBalanced(\"([)]\") ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\n=== Testing Task Scheduler ===\");\n        TaskScheduler scheduler = new TaskScheduler();\n        scheduler.scheduleTask(\"Task 1\");\n        scheduler.scheduleTask(\"Task 2\");\n        System.out.println(\"Test 11: \" + (scheduler.executeNext().equals(\"Task 1\") ? \"PASS\" : \"FAIL\"));\n        System.out.println(\"Test 12: \" + (scheduler.hasTasks() ? \"PASS\" : \"FAIL\"));\n        \n        System.out.println(\"\\nAll tests completed!\");\n    }\n}"
              },
              "cpp": {
                "filename": "Stack_Queue_Deque.cpp",
                "content": "#include <iostream>\n#include <list>\n#include <string>\nusing namespace std;\n\ntemplate<typename T>\nclass Stack {\nprivate:\n    list<T> data;\npublic:\n    void push(const T& item) { /* TODO: O(1) */ }\n    T pop() { /* TODO: O(1) */ return T(); }\n    T peek() { /* TODO: O(1) */ return T(); }\n    bool isEmpty() { /* TODO: O(1) */ return false; }\n    int size() { /* TODO: O(1) */ return 0; }\n};\n\ntemplate<typename T>\nclass Queue {\nprivate:\n    list<T> data;\npublic:\n    void enqueue(const T& item) { /* TODO: O(1) */ }\n    T dequeue() { /* TODO: O(1) */ return T(); }\n    T front() { /* TODO: O(1) */ return T(); }\n    bool isEmpty() { /* TODO: O(1) */ return false; }\n    int size() { /* TODO: O(1) */ return 0; }\n};\n\ntemplate<typename T>\nclass Deque {\nprivate:\n    list<T> data;\npublic:\n    void addFirst(const T& item) { /* TODO: O(1) */ }\n    void addLast(const T& item) { /* TODO: O(1) */ }\n    T removeFirst() { /* TODO: O(1) */ return T(); }\n    T removeLast() { /* TODO: O(1) */ return T(); }\n    bool isEmpty() { /* TODO: O(1) */ return false; }\n    int size() { /* TODO: O(1) */ return 0; }\n};\n\nclass BalancedParenthesesChecker {\npublic:\n    static bool isBalanced(const string& expression) { /* TODO: O(n) */ return false; }\n};\n\nclass TaskScheduler {\nprivate:\n    Queue<string> taskQueue;\npublic:\n    void scheduleTask(const string& task) { /* TODO: O(1) */ }\n    string executeNext() { /* TODO: O(1) */ return \"\"; }\n    bool hasTasks() { /* TODO: O(1) */ return false; }\n};\n\nint main() {\n    // Test cases\n    return 0;\n}"
              }
            }
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
        "topic": "Graph Traversals: Breadth-First Search (BFS)",
        "description": "Learn graph representations and implement breadth-first search for level-order traversal and shortest path finding in unweighted graphs.",
        "resources": [
          { "title": "Graph Data Structure", "url": "https://www.youtube.com/watch?v=tWVWeAqZ0WU", "type": "Video" },
          { "title": "Graph Representation", "url": "https://www.geeksforgeeks.org/graph-and-its-representations/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Graph Class with BFS Implementation",
            "description": "Implement a complete Graph class using adjacency list representation with full BFS functionality. Your implementation must include: (1) Graph representation with adjacency lists, (2) Complete BFS traversal method, (3) Shortest path finder using BFS, (4) Level-order traversal, (5) Path reconstruction. This project demonstrates understanding of graph data structures and breadth-first search algorithm.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Download the template file (Java or C++) from the download button below, (2) Implement a Graph class with adjacency list representation, (3) Implement addVertex(vertex) method to add vertices, (4) Implement addEdge(from, to) method for undirected graphs, (5) Implement addDirectedEdge(from, to) method for directed graphs",
              "BFS Implementation (Required): (1) Implement BFS(start) method that returns list of vertices in BFS order, (2) Use a Queue data structure (you can use your Queue from Week 3 or Java's Queue), (3) Track visited vertices using a Set or boolean array, (4) Process vertices level by level (all vertices at distance 1, then distance 2, etc.), (5) Add comments explaining each step of the BFS algorithm",
              "Shortest Path (Required): (1) Implement shortestPath(start, end) method using BFS, (2) Track parent/previous vertices to reconstruct path, (3) Return the shortest path as a list of vertices, (4) Return empty list if no path exists, (5) Handle both directed and undirected graphs",
              "Additional Methods (Required): (1) Implement getLevel(vertex) method that returns the level (distance from start) of each vertex after BFS, (2) Implement getAllLevels(start) method that returns a map of level -> list of vertices at that level, (3) Implement hasPath(start, end) method using BFS",
              "Code Quality Requirements: (a) Use meaningful variable names (queue, visited, parent, level), (b) Follow consistent code style, (c) Include detailed comments explaining BFS algorithm steps, (d) Handle edge cases (empty graph, disconnected vertices, self-loops)",
              "Testing Requirements (Required): (a) Test with provided test cases covering various graph structures, (b) Test shortest path on graphs with multiple paths, (c) Test on disconnected graphs, (d) Verify level-order traversal correctness, (e) All test cases must pass"
            ],
            "template_files": {
              "java": {
                "filename": "GraphBFS.java",
                "content": "import java.util.*;\n\n// Graph class with adjacency list representation\npublic class Graph {\n    private Map<Integer, List<Integer>> adjacencyList;\n    private boolean directed;\n    \n    // TODO: Implement constructor\n    // Initialize adjacencyList as HashMap\n    // Set directed flag\n    public Graph(boolean directed) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addVertex method\n    // Time Complexity: ???\n    public void addVertex(int vertex) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addEdge for undirected graph\n    // Time Complexity: ???\n    public void addEdge(int from, int to) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addDirectedEdge for directed graph\n    // Time Complexity: ???\n    public void addDirectedEdge(int from, int to) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement BFS traversal\n    // Returns list of vertices in BFS order\n    // Time Complexity: ???\n    public List<Integer> BFS(int start) {\n        // Your implementation here\n        // Use Queue to process vertices level by level\n        // Track visited vertices\n        // Return list in BFS order\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement shortest path using BFS\n    // Returns shortest path from start to end as list of vertices\n    // Returns empty list if no path exists\n    // Time Complexity: ???\n    public List<Integer> shortestPath(int start, int end) {\n        // Your implementation here\n        // Use BFS to find shortest path\n        // Track parent vertices to reconstruct path\n        // Return path as list\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement getLevel method\n    // Returns level (distance from start) for each vertex after BFS\n    // Time Complexity: ???\n    public Map<Integer, Integer> getLevel(int start) {\n        // Your implementation here\n        // Perform BFS and track level of each vertex\n        // Return map: vertex -> level\n        return new HashMap<>();\n    }\n    \n    // TODO: Implement getAllLevels method\n    // Returns map of level -> list of vertices at that level\n    // Time Complexity: ???\n    public Map<Integer, List<Integer>> getAllLevels(int start) {\n        // Your implementation here\n        // Group vertices by their level\n        // Return map: level -> list of vertices\n        return new HashMap<>();\n    }\n    \n    // TODO: Implement hasPath method using BFS\n    // Returns true if path exists from start to end\n    // Time Complexity: ???\n    public boolean hasPath(int start, int end) {\n        // Your implementation here\n        return false;\n    }\n}\n\n// Test cases - uncomment to test\nclass TestCases {\n    public static void main(String[] args) {\n        Graph g = new Graph(false); // Undirected graph\n        g.addVertex(0);\n        g.addVertex(1);\n        g.addVertex(2);\n        g.addEdge(0, 1);\n        g.addEdge(1, 2);\n        \n        List<Integer> bfsOrder = g.BFS(0);\n        System.out.println(\"BFS test 1: \" + (bfsOrder.size() == 3 ? \"PASS\" : \"FAIL\"));\n        \n        List<Integer> path = g.shortestPath(0, 2);\n        System.out.println(\"Shortest path test 1: \" + (path.size() == 3 ? \"PASS\" : \"FAIL\"));\n        \n        boolean hasPath = g.hasPath(0, 2);\n        System.out.println(\"Has path test 1: \" + (hasPath ? \"PASS\" : \"FAIL\"));\n    }\n}"
              },
              "cpp": {
                "filename": "GraphBFS.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\n\nclass Graph {\nprivate:\n    unordered_map<int, vector<int>> adjacencyList;\n    bool directed;\n    \npublic:\n    // TODO: Implement constructor\n    Graph(bool isDirected) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addVertex method\n    void addVertex(int vertex) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addEdge for undirected graph\n    void addEdge(int from, int to) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement addDirectedEdge for directed graph\n    void addDirectedEdge(int from, int to) {\n        // Your implementation here\n    }\n    \n    // TODO: Implement BFS traversal\n    vector<int> BFS(int start) {\n        // Your implementation here\n        return vector<int>();\n    }\n    \n    // TODO: Implement shortest path using BFS\n    vector<int> shortestPath(int start, int end) {\n        // Your implementation here\n        return vector<int>();\n    }\n    \n    // TODO: Implement getLevel method\n    unordered_map<int, int> getLevel(int start) {\n        // Your implementation here\n        return unordered_map<int, int>();\n    }\n    \n    // TODO: Implement getAllLevels method\n    unordered_map<int, vector<int>> getAllLevels(int start) {\n        // Your implementation here\n        return unordered_map<int, vector<int>>();\n    }\n    \n    // TODO: Implement hasPath method\n    bool hasPath(int start, int end) {\n        // Your implementation here\n        return false;\n    }\n};\n\nint main() {\n    Graph g(false);\n    g.addVertex(0);\n    g.addVertex(1);\n    g.addVertex(2);\n    g.addEdge(0, 1);\n    g.addEdge(1, 2);\n    \n    vector<int> bfsOrder = g.BFS(0);\n    cout << \"BFS test: \" << (bfsOrder.size() == 3 ? \"PASS\" : \"FAIL\") << endl;\n    \n    return 0;\n}"
              }
            }
          },
          "academic": {
            "title": "Breadth-First Search Assessment",
            "description": "Complete an online assessment with multiple question types covering BFS algorithm. The assessment includes: (1) Multiple Choice Questions analyzing BFS execution and complexity, (2) Short Answer Questions explaining BFS properties and applications, (3) Fill-in-the-Blank questions completing BFS implementations.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze BFS execution, time/space complexity, queue operations, and shortest path properties",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain BFS algorithm step-by-step, prove time complexity O(V+E), explain why BFS finds shortest path in unweighted graphs, compare BFS vs DFS, describe real-world applications",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete BFS implementation code, fill in queue operations, complete shortest path reconstruction, fill in level calculation",
              "Time Limit: 90 minutes. Submit all answers through the online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Breadth-First Search Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation teaching BFS algorithm to fellow students. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure (Required): (1) Title slide with your name, (2) Introduction: What is BFS? (2-3 slides), (3) How BFS works: Queue-based traversal (3-4 slides), (4) Step-by-step example: Walk through BFS on a graph (4-5 slides), (5) Shortest path application: Why BFS finds shortest paths (2-3 slides), (6) Real-world applications: Social networks, web crawling, etc. (2 slides), (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: Include: (a) Clear explanation of queue-based traversal, (b) Visual demonstration of BFS execution with queue state shown, (c) Proof/explanation of why BFS finds shortest paths, (d) Code example of BFS implementation, (e) Real-world use cases with examples",
              "Visual Aids: Create animations or step-by-step diagrams showing: (a) Queue state at each step, (b) Visited vertices, (c) Level-by-level exploration, (d) Shortest path reconstruction",
              "Code Examples: Include complete BFS implementation with comments explaining each step",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          }
        }
      },
      {
        "week": 9,
        "topic": "Graph Traversals: Depth-First Search (DFS)",
        "description": "Master depth-first search for graph traversal, cycle detection, and topological sorting. Understand recursive and iterative implementations.",
        "resources": [
          { "title": "Depth-First Search", "url": "https://www.youtube.com/watch?v=Urx87-NMm6c", "type": "Video" },
          { "title": "DFS Implementation", "url": "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/", "type": "Article" },
          { "title": "DFS Applications", "url": "https://www.geeksforgeeks.org/applications-of-depth-first-search/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Graph Class with DFS Implementation",
            "description": "Extend your Graph class from Week 8 with complete DFS functionality. Your implementation must include: (1) Recursive DFS traversal, (2) Iterative DFS using stack, (3) Cycle detection in directed and undirected graphs, (4) Topological sorting for DAGs, (5) Path finding using DFS. This project demonstrates understanding of depth-first search and its applications.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Use your Graph class from Week 8 or download the extended template, (2) Implement recursive DFS(start) method that returns list of vertices in DFS order, (3) Implement iterative DFS(start) method using a Stack, (4) Track visited vertices and discovery/finish times",
              "Cycle Detection (Required): (1) Implement hasCycle() method for undirected graphs using DFS, (2) Implement hasCycleDirected() method for directed graphs (detect back edges), (3) Return true if cycle exists, false otherwise, (4) Add comments explaining cycle detection logic",
              "Topological Sort (Required): (1) Implement topologicalSort() method for directed acyclic graphs (DAGs), (2) Use DFS with finish times, (3) Return vertices in topological order, (4) Handle graphs with cycles (return empty list or throw exception), (5) Add comments explaining topological sort algorithm",
              "Path Finding (Required): (1) Implement findPathDFS(start, end) method using DFS, (2) Track path during DFS traversal, (3) Return path as list of vertices if exists, empty list otherwise, (4) Compare DFS path vs BFS shortest path",
              "Additional Methods (Required): (1) Implement getAllPaths(start, end) method that finds all paths (not just one), (2) Implement getConnectedComponents() method using DFS, (3) Implement isBipartite() method using DFS coloring",
              "Code Quality Requirements: (a) Use meaningful variable names, (b) Include detailed comments explaining DFS algorithm and applications, (c) Handle edge cases (empty graph, disconnected components), (d) Compare recursive vs iterative implementations in comments",
              "Testing Requirements (Required): (a) Test recursive and iterative DFS produce same results, (b) Test cycle detection on graphs with and without cycles, (c) Test topological sort on DAGs, (d) Test path finding and compare with BFS results, (e) All test cases must pass"
            ],
            "template_files": {
              "java": {
                "filename": "GraphDFS.java",
                "content": "import java.util.*;\n\n// Extended Graph class with DFS functionality\npublic class GraphDFS extends Graph { // Extend your Week 8 Graph class\n    \n    // TODO: Implement recursive DFS\n    // Returns list of vertices in DFS order\n    // Time Complexity: ???\n    public List<Integer> DFSRecursive(int start) {\n        // Your implementation here\n        // Use helper method with visited set\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement iterative DFS using Stack\n    // Returns list of vertices in DFS order\n    // Time Complexity: ???\n    public List<Integer> DFSIterative(int start) {\n        // Your implementation here\n        // Use Stack instead of recursion\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement cycle detection for undirected graph\n    // Returns true if cycle exists\n    // Time Complexity: ???\n    public boolean hasCycle() {\n        // Your implementation here\n        // Use DFS and check for back edges\n        return false;\n    }\n    \n    // TODO: Implement cycle detection for directed graph\n    // Returns true if cycle exists\n    // Time Complexity: ???\n    public boolean hasCycleDirected() {\n        // Your implementation here\n        // Use DFS with three colors: white, gray, black\n        return false;\n    }\n    \n    // TODO: Implement topological sort\n    // Returns vertices in topological order\n    // Returns empty list if cycle exists\n    // Time Complexity: ???\n    public List<Integer> topologicalSort() {\n        // Your implementation here\n        // Use DFS with finish times\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement path finding using DFS\n    // Returns path from start to end, empty if no path\n    // Time Complexity: ???\n    public List<Integer> findPathDFS(int start, int end) {\n        // Your implementation here\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement get all paths using DFS\n    // Returns all paths from start to end\n    // Time Complexity: ???\n    public List<List<Integer>> getAllPaths(int start, int end) {\n        // Your implementation here\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement get connected components\n    // Returns list of connected components\n    // Time Complexity: ???\n    public List<List<Integer>> getConnectedComponents() {\n        // Your implementation here\n        return new ArrayList<>();\n    }\n    \n    // TODO: Implement bipartite check using DFS\n    // Returns true if graph is bipartite\n    // Time Complexity: ???\n    public boolean isBipartite() {\n        // Your implementation here\n        // Use DFS with two-color coloring\n        return false;\n    }\n}\n\n// Test cases\nclass TestCases {\n    public static void main(String[] args) {\n        GraphDFS g = new GraphDFS(false);\n        // Add test cases here\n    }\n}"
              },
              "cpp": {
                "filename": "GraphDFS.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <unordered_set>\nusing namespace std;\n\n// Extended Graph class with DFS\nclass GraphDFS : public Graph {\npublic:\n    // TODO: Implement recursive DFS\n    vector<int> DFSRecursive(int start) {\n        // Your implementation here\n        return vector<int>();\n    }\n    \n    // TODO: Implement iterative DFS\n    vector<int> DFSIterative(int start) {\n        // Your implementation here\n        return vector<int>();\n    }\n    \n    // TODO: Implement cycle detection\n    bool hasCycle() {\n        // Your implementation here\n        return false;\n    }\n    \n    // TODO: Implement topological sort\n    vector<int> topologicalSort() {\n        // Your implementation here\n        return vector<int>();\n    }\n    \n    // TODO: Implement path finding\n    vector<int> findPathDFS(int start, int end) {\n        // Your implementation here\n        return vector<int>();\n    }\n};\n\nint main() {\n    // Test cases\n    return 0;\n}"
              }
            }
          },
          "academic": {
            "title": "Depth-First Search Assessment",
            "description": "Complete an online assessment with multiple question types covering DFS algorithm. The assessment includes: (1) Multiple Choice Questions analyzing DFS execution and applications, (2) Short Answer Questions explaining DFS properties, cycle detection, and topological sort, (3) Fill-in-the-Blank questions completing DFS implementations.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze DFS execution, time/space complexity, stack operations, cycle detection, and topological sort",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain DFS algorithm step-by-step, prove time complexity O(V+E), explain cycle detection methods, describe topological sort algorithm, compare recursive vs iterative DFS",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete DFS implementation code, fill in cycle detection logic, complete topological sort, fill in path finding",
              "Time Limit: 90 minutes. Submit all answers through the online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Depth-First Search Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation teaching DFS algorithm to fellow students. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure (Required): (1) Title slide with your name, (2) Introduction: What is DFS? (2-3 slides), (3) How DFS works: Stack-based traversal (3-4 slides), (4) Recursive vs Iterative: Compare both approaches (2-3 slides), (5) Applications: Cycle detection, topological sort, path finding (4-5 slides), (6) Step-by-step examples: Walk through DFS on graphs (3-4 slides), (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: Include: (a) Clear explanation of stack-based/recursive traversal, (b) Visual demonstration of DFS execution, (c) Explanation of cycle detection methods, (d) Topological sort algorithm with example, (e) Code examples of key methods",
              "Visual Aids: Create animations showing: (a) Stack/recursion state, (b) Visited vertices, (c) Discovery and finish times, (d) Cycle detection process, (e) Topological sort ordering",
              "Code Examples: Include complete DFS implementation with recursive and iterative versions",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          }
        }
      },
      {
        "week": 10,
        "topic": "Shortest Paths: Weighted Graphs and Introduction",
        "description": "Introduction to weighted graphs and shortest path problems. Learn about edge weights, path costs, and the need for different algorithms.",
        "resources": [
          { "title": "Weighted Graphs", "url": "https://www.youtube.com/watch?v=XB4MIexjvY0", "type": "Video" },
          { "title": "Shortest Path Introduction", "url": "https://www.geeksforgeeks.org/shortest-path-algorithms/", "type": "Article" },
          { "title": "MIT 6.006 Lecture 17: Shortest Paths I", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-17-shortest-paths-i-properties-dijkstras-algorithm-breadth-first-search/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Weighted Graph Class Implementation",
            "description": "Implement a complete WeightedGraph class that extends your Graph class to handle weighted edges. Your implementation must include: (1) Weighted edge representation, (2) Methods to add weighted edges, (3) Path cost calculation, (4) Basic shortest path visualization. This project demonstrates understanding of weighted graphs and prepares for Dijkstra's algorithm.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Download the template file (Java or C++) from the download button below, (2) Implement a WeightedGraph class with adjacency list storing edge weights, (3) Implement addWeightedEdge(from, to, weight) method, (4) Implement getWeight(from, to) method to retrieve edge weight, (5) Implement getAllEdges() method returning all edges with weights",
              "Path Cost Calculation (Required): (1) Implement calculatePathCost(path) method that sums weights along a path, (2) Handle invalid paths (return -1 or throw exception), (3) Implement findCheapestPathNaive(start, end) method using brute force (try all paths for small graphs), (4) Add comments explaining why brute force is inefficient",
              "Graph Analysis (Required): (1) Implement isConnected() method checking if all vertices are reachable, (2) Implement hasNegativeWeights() method checking for negative edge weights, (3) Implement getTotalWeight() method summing all edge weights, (4) Implement visualizeGraph() method printing graph structure with weights",
              "Code Quality Requirements: (a) Use meaningful variable names, (b) Include comments explaining weighted graph concepts, (c) Handle edge cases (no path, negative weights, zero weights), (d) Document time complexity of each method",
              "Testing Requirements (Required): (a) Test with graphs having positive weights only, (b) Test with graphs having negative weights, (c) Test path cost calculation on various paths, (d) Test edge cases, (e) All test cases must pass"
            ],
            "template_files": {
              "java": {
                "filename": "WeightedGraph.java",
                "content": "import java.util.*;\n\nclass Edge {\n    int to, weight;\n    Edge(int t, int w) { to = t; weight = w; }\n}\n\npublic class WeightedGraph {\n    private Map<Integer, List<Edge>> adjacencyList;\n    private boolean directed;\n    \n    public WeightedGraph(boolean directed) { /* TODO */ }\n    public void addVertex(int vertex) { /* TODO */ }\n    public void addWeightedEdge(int from, int to, int weight) { /* TODO */ }\n    public int getWeight(int from, int to) { /* TODO: return -1 if no edge */ }\n    public int calculatePathCost(List<Integer> path) { /* TODO */ }\n    public boolean hasNegativeWeights() { /* TODO */ }\n}\n"
              },
              "cpp": {
                "filename": "WeightedGraph.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstruct Edge { int to, weight; };\nclass WeightedGraph {\n    unordered_map<int, vector<Edge>> adjacencyList;\n    bool directed;\npublic:\n    WeightedGraph(bool isDirected) : directed(isDirected) {}\n    void addVertex(int vertex) { /* TODO */ }\n    void addWeightedEdge(int from, int to, int weight) { /* TODO */ }\n    int getWeight(int from, int to) { /* TODO */ }\n};\n"
              }
            }
          },
          "academic": {
            "title": "Weighted Graphs Assessment",
            "description": "Complete an online assessment with multiple question types covering weighted graphs and shortest path concepts. The assessment includes: (1) Multiple Choice Questions on weighted graph properties, (2) Short Answer Questions explaining path costs and algorithm needs, (3) Fill-in-the-Blank questions on graph representations.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze weighted graph properties, path costs, edge weight types, and algorithm requirements",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain why BFS doesn't work for weighted graphs, describe path cost calculation, explain when different algorithms are needed, compare weighted vs unweighted shortest paths",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete weighted graph representation code, fill in path cost calculation, complete edge weight handling",
              "Time Limit: 90 minutes. Submit all answers through the online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Weighted Graphs Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation explaining weighted graphs and shortest path problems. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure (Required): (1) Title slide with your name, (2) Introduction: What are weighted graphs? (2-3 slides), (3) Path costs and shortest path problem (2-3 slides), (4) Why BFS doesn't work: Example with weighted graph (3-4 slides), (5) Need for new algorithms: Dijkstra's, Bellman-Ford introduction (2-3 slides), (6) Real-world applications: GPS navigation, network routing (2 slides), (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: Include: (a) Clear explanation of weighted graphs vs unweighted, (b) Path cost calculation with examples, (c) Visual demonstration of why BFS fails, (d) Introduction to Dijkstra's algorithm concept, (e) Real-world examples",
              "Visual Aids: Create diagrams showing: (a) Weighted graph with edge labels, (b) Path cost calculations, (c) Example where BFS finds wrong path, (d) Applications in maps and networks",
              "Code Examples: Include weighted graph representation and path cost calculation",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          }
        }
      },
      {
        "week": 11,
        "topic": "Shortest Paths: Dijkstra's Algorithm",
        "description": "Master Dijkstra's algorithm for finding shortest paths in graphs with non-negative edge weights. Understand priority queue usage and correctness proof.",
        "resources": [
          { "title": "Dijkstra's Algorithm", "url": "https://www.youtube.com/watch?v=XB4MIexjvY0", "type": "Video" },
          { "title": "Dijkstra's Implementation", "url": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", "type": "Article" },
          { "title": "MIT 6.006 Lecture 17: Shortest Paths I", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-17-shortest-paths-i-properties-dijkstras-algorithm-breadth-first-search/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dijkstra's Algorithm Implementation",
            "description": "Implement a complete Dijkstra's algorithm for finding shortest paths in weighted graphs. Your implementation must include: (1) Priority queue-based Dijkstra's, (2) Shortest path reconstruction, (3) Distance tracking, (4) Handling of non-negative weights. This project demonstrates mastery of greedy algorithms and priority queues.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Download the template file (Java or C++) from the download button below, (2) Implement dijkstra(start) method that returns shortest distances to all vertices, (3) Use a PriorityQueue (min-heap) to select next vertex, (4) Track distances and previous vertices for path reconstruction, (5) Handle graphs with non-negative weights only",
              "Shortest Path (Required): (1) Implement shortestPath(start, end) method using Dijkstra's, (2) Reconstruct path using previous/parent array, (3) Return path as list of vertices, (4) Return empty list if no path exists, (5) Add comments explaining each step of algorithm",
              "Distance Tracking (Required): (1) Implement getShortestDistances(start) method returning map of vertex -> shortest distance, (2) Implement getShortestDistance(start, end) method, (3) Handle unreachable vertices (return Integer.MAX_VALUE or -1)",
              "Algorithm Correctness (Required): (1) Add comments explaining why Dijkstra's works (greedy choice property), (2) Explain why it requires non-negative weights, (3) Compare time complexity with different priority queue implementations, (4) Document O((V+E) log V) complexity",
              "Code Quality Requirements: (a) Use meaningful variable names (distances, previous, pq, visited), (b) Include detailed comments explaining algorithm steps, (c) Handle edge cases (disconnected graphs, same start/end), (d) Compare with BFS in comments",
              "Testing Requirements (Required): (a) Test on graphs with various structures, (b) Verify shortest paths are correct, (c) Test on graphs where BFS would give wrong answer, (d) Test edge cases, (e) All test cases must pass"
            ],
            "template_files": {
              "java": {
                "filename": "Dijkstra.java",
                "content": "import java.util.*;\n\npublic class Dijkstra {\n    private WeightedGraph graph;\n    public Dijkstra(WeightedGraph graph) { this.graph = graph; }\n    public Map<Integer, Integer> dijkstra(int start) { /* TODO: O((V+E) log V) */ }\n    public List<Integer> shortestPath(int start, int end) { /* TODO */ }\n    public Map<Integer, Integer> getShortestDistances(int start) { /* TODO */ }\n    public int getShortestDistance(int start, int end) { /* TODO */ }\n}\n"
              },
              "cpp": {
                "filename": "Dijkstra.cpp",
                "content": "#include <iostream>\n#include <queue>\n#include <unordered_map>\nusing namespace std;\n\nclass Dijkstra {\n    WeightedGraph* graph;\npublic:\n    Dijkstra(WeightedGraph* g) : graph(g) {}\n    unordered_map<int, int> dijkstra(int start) { /* TODO */ }\n    vector<int> shortestPath(int start, int end) { /* TODO */ }\n};\n"
              }
            }
          },
          "academic": {
            "title": "Dijkstra's Algorithm Assessment",
            "description": "Complete an online assessment with multiple question types covering Dijkstra's algorithm. The assessment includes: (1) Multiple Choice Questions on algorithm execution and complexity, (2) Short Answer Questions explaining correctness and implementation, (3) Fill-in-the-Blank questions completing algorithm code.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze Dijkstra's execution, priority queue operations, time complexity, and shortest path properties",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain Dijkstra's algorithm step-by-step, prove correctness (greedy choice), explain why non-negative weights required, compare with BFS, analyze time complexity O((V+E) log V)",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete Dijkstra's implementation code, fill in priority queue operations, complete path reconstruction, fill in distance updates",
              "Time Limit: 90 minutes. Submit all answers through the online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Dijkstra's Algorithm Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation teaching Dijkstra's algorithm to fellow students. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure (Required): (1) Title slide with your name, (2) Introduction: What is Dijkstra's? (2-3 slides), (3) How it works: Priority queue and relaxation (4-5 slides), (4) Step-by-step example: Walk through algorithm (4-5 slides), (5) Why it works: Greedy choice property (2-3 slides), (6) Applications: GPS, network routing (2 slides), (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: Include: (a) Clear explanation of priority queue usage, (b) Visual demonstration of algorithm execution, (c) Explanation of relaxation step, (d) Proof/explanation of correctness, (e) Code example of implementation",
              "Visual Aids: Create animations showing: (a) Priority queue state, (b) Distance updates, (c) Vertex selection process, (d) Path reconstruction, (e) Comparison with BFS",
              "Code Examples: Include complete Dijkstra's implementation with comments",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
            ]
          }
        }
      },
      {
        "week": 12,
        "topic": "Dynamic Programming Fundamentals",
        "description": "Introduction to dynamic programming paradigm. Learn recursive subproblems, memoization, and solve classic DP problems like Fibonacci, LCS, and LIS.",
        "resources": [
          { "title": "Dynamic Programming", "url": "https://www.youtube.com/watch?v=oBt53YbR9Kk", "type": "Video" },
          { "title": "DP Tutorial", "url": "https://www.geeksforgeeks.org/dynamic-programming/", "type": "Article" },
          { "title": "MIT 6.006 Lecture 19: Dynamic Programming I", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-19-dynamic-programming-i-fibonacci-shortest-paths/", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dynamic Programming Problems Implementation",
            "description": "Implement solutions to classic dynamic programming problems using both recursive and memoized approaches. Your implementation must include: (1) Fibonacci with memoization, (2) Longest Common Subsequence (LCS), (3) Longest Increasing Subsequence (LIS), (4) Coin Change problem. This project demonstrates understanding of DP patterns and optimization techniques.",
            "guidelines": [
              "Implementation Requirements (Required): (1) Download the template file (Java or C++) from the download button below, (2) Implement all problems with both naive recursive and memoized versions, (3) Compare performance of both approaches, (4) Add comments explaining DP patterns",
              "Fibonacci (Required): (1) Implement fibRecursive(n) - naive recursive, (2) Implement fibMemoized(n) - with memoization, (3) Implement fibDP(n) - bottom-up DP, (4) Compare time complexities: O(2^n) vs O(n), (5) Add comments explaining optimization",
              "Longest Common Subsequence (Required): (1) Implement lcsRecursive(s1, s2) - naive recursive, (2) Implement lcsMemoized(s1, s2) - with memoization, (3) Implement lcsDP(s1, s2) - bottom-up DP with table, (4) Implement lcsReconstruct(s1, s2) - reconstruct actual LCS string, (5) Add comments explaining DP table construction",
              "Longest Increasing Subsequence (Required): (1) Implement lisDP(arr) - find length of LIS, (2) Implement lisReconstruct(arr) - find actual LIS sequence, (3) Add comments explaining algorithm",
              "Coin Change (Required): (1) Implement coinChangeRecursive(coins, amount) - naive recursive, (2) Implement coinChangeDP(coins, amount) - DP solution, (3) Implement coinChangeReconstruct(coins, amount) - return actual coins used, (4) Add comments explaining DP approach",
              "Code Quality Requirements: (a) Use meaningful variable names, (b) Include detailed comments explaining DP patterns (optimal substructure, overlapping subproblems), (c) Document time and space complexity, (d) Compare recursive vs DP approaches",
              "Testing Requirements (Required): (a) Test all problems with various inputs, (b) Verify memoized and DP versions produce same results, (c) Compare execution times for large inputs, (d) Test edge cases, (e) All test cases must pass"
            ],
            "template_files": {
              "java": {
                "filename": "DynamicProgramming.java",
                "content": "import java.util.*;\n\npublic class DynamicProgramming {\n    public static long fibRecursive(int n) { /* TODO: O(2^n) */ }\n    public static long fibMemoized(int n) { /* TODO: O(n) */ }\n    public static long fibDP(int n) { /* TODO: O(n), O(1) space */ }\n    public static int lcsDP(String s1, String s2) { /* TODO: O(m*n) */ }\n    public static String lcsReconstruct(String s1, String s2) { /* TODO */ }\n    public static int lisDP(int[] arr) { /* TODO: O(n^2) or O(n log n) */ }\n    public static int coinChangeDP(int[] coins, int amount) { /* TODO */ }\n}\n"
              },
              "cpp": {
                "filename": "DynamicProgramming.cpp",
                "content": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass DynamicProgramming {\npublic:\n    static long fibDP(int n) { /* TODO */ }\n    static int lcsDP(string s1, string s2) { /* TODO */ }\n    static int lisDP(vector<int>& arr) { /* TODO */ }\n    static int coinChangeDP(vector<int>& coins, int amount) { /* TODO */ }\n};\n"
              }
            }
          },
          "academic": {
            "title": "Dynamic Programming Assessment",
            "description": "Complete an online assessment with multiple question types covering dynamic programming. The assessment includes: (1) Multiple Choice Questions on DP concepts and problems, (2) Short Answer Questions explaining DP patterns, (3) Fill-in-the-Blank questions completing DP solutions.",
            "guidelines": [
              "Part 1 - Multiple Choice Questions (40 points, 10 questions): Analyze DP problems, identify optimal substructure, recognize overlapping subproblems, analyze time/space complexity",
              "Part 2 - Short Answer Questions (35 points, 5 questions): Explain optimal substructure property, explain memoization vs tabulation, solve DP problems step-by-step, compare recursive vs DP approaches, analyze complexity",
              "Part 3 - Fill-in-the-Blank (25 points, 5 questions): Complete DP table construction, fill in recurrence relations, complete memoization code, fill in base cases",
              "Time Limit: 90 minutes. Submit all answers through the online assessment platform",
              "Grading: MCQ auto-graded (40%), SAQ graded on correctness and clarity (35%), Fill-in-the-blank graded on correctness (25%)"
            ]
          },
          "communicator": {
            "title": "Dynamic Programming Presentation",
            "description": "Create and deliver a 10-15 minute educational presentation teaching dynamic programming to fellow students. Submit your slides and either a video recording or deliver live.",
            "guidelines": [
              "Slide Structure (Required): (1) Title slide with your name, (2) Introduction: What is DP? (2-3 slides), (3) Key concepts: Optimal substructure, overlapping subproblems (3-4 slides), (4) Example: Fibonacci with and without DP (3-4 slides), (5) Classic problems: LCS, LIS, Coin Change (4-5 slides), (6) DP patterns: When to use DP (2-3 slides), (7) Conclusion: Key takeaways (1 slide)",
              "Content Requirements: Include: (a) Clear explanation of DP paradigm, (b) Visual demonstration of memoization, (c) Step-by-step DP table construction, (d) Code examples of key problems, (e) When to recognize DP problems",
              "Visual Aids: Create diagrams showing: (a) Recursive tree with overlapping subproblems, (b) Memoization process, (c) DP table filling, (d) Problem-solving framework",
              "Code Examples: Include complete DP solutions with both memoized and tabulated versions",
              "Submission: Upload your presentation file (PDF, PowerPoint, or Google Slides link) and either: (a) A video recording (MP4, MOV, or YouTube link), or (b) Schedule a live presentation time",
              "Grading Rubric: Content accuracy (40%), Clarity of explanation (25%), Visual aids quality (15%), Delivery/presentation skills (20%)"
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
            "title": "Data Structures and Algorithms Portfolio Project",
            "description": "Create a comprehensive portfolio project that demonstrates mastery of all course concepts. Choose one of: (1) Complete data structures library with all structures implemented, (2) Algorithm visualization tool showing multiple algorithms, (3) Problem-solving application using various data structures and algorithms. This is your capstone project showcasing everything you've learned.",
            "guidelines": [
              "Project Selection (Required): Choose one project type that interests you and demonstrates comprehensive understanding",
              "Data Structures Library Option: (1) Implement all major data structures: DynamicArray, LinkedList, Stack, Queue, HashMap, BST, Heap, Graph, (2) Include comprehensive test suite, (3) Document time/space complexity for all operations, (4) Create usage examples and documentation",
              "Algorithm Visualization Option: (1) Create interactive tool visualizing: sorting algorithms, graph traversals, shortest paths, DP problems, (2) Show step-by-step execution, (3) Compare algorithm performance, (4) Include educational explanations",
              "Problem-Solving Application Option: (1) Build application solving real-world problem (e.g., route planner, task scheduler, data analyzer), (2) Use multiple data structures appropriately, (3) Implement efficient algorithms, (4) Include user interface and documentation",
              "Requirements for All Options: (1) Use at least 5 different data structures, (2) Implement at least 3 different algorithms, (3) Include comprehensive testing, (4) Document design decisions and complexity analysis, (5) Create README with setup instructions",
              "Code Quality Requirements: (a) Clean, well-organized code, (b) Comprehensive comments, (c) Proper error handling, (d) Efficient implementations, (e) Professional documentation",
              "Submission Requirements: (a) Complete source code, (b) README file, (c) Test suite, (d) Documentation of design choices, (e) Complexity analysis for key operations"
            ]
          },
          "academic": {
            "title": "Comprehensive Final Exam",
            "description": "Complete a comprehensive written exam covering all course topics: (1) Design and analyze data structures for given problems, (2) Choose appropriate data structures and algorithms for scenarios, (3) Time and space complexity analysis, (4) Compare different approaches, (5) Solve 5-7 complex problems requiring multiple concepts. Submit detailed solutions with rigorous analysis.",
            "guidelines": [
              "Design data structures for 2-3 new problems not covered in class",
              "Justify choice of data structure and algorithm for given scenarios with complexity analysis",
              "Complete time and space complexity analysis for all solutions",
              "Compare different data structures and algorithms for same problem",
              "Solve 5-7 complex problems requiring multiple data structures and algorithms",
              "All solutions must be rigorous with clear reasoning, proofs, and analysis",
              "Demonstrate deep understanding of tradeoffs, design decisions, and optimization techniques"
            ]
          },
          "communicator": {
            "title": "Course Reflection and Summary Presentation",
            "description": "Create a 20-30 minute comprehensive presentation summarizing the entire course. Include: (1) Overview of all topics covered, (2) When to use each data structure and algorithm with examples, (3) Complexity analysis and tradeoffs, (4) Real-world applications, (5) Your learning journey and key insights, (6) Future learning directions. Use visual aids and live demonstrations.",
            "guidelines": [
              "20-30 minute comprehensive presentation",
              "Overview of all data structures: linear, tree-based, hash-based, graph",
              "Overview of all algorithms: sorting, searching, graph algorithms, dynamic programming",
              "Decision framework: when to use each structure/algorithm with examples",
              "Complexity comparison table for common operations",
              "Real-world applications with specific examples",
              "Personal reflection: challenges, breakthroughs, favorite topics",
              "Future learning directions: advanced topics, specializations",
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
