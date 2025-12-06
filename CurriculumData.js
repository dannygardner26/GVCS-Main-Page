export const CURRICULUM_DATA = {
  // ============================================
  // TIER 1: The Gatekeepers (Year 1 - Early Year 2)
  // Non-negotiable pillars of CS education
  // ============================================

  "CS 102: Data Structures & Algorithms": {
    "prereqs": ["AP Computer Science A"],
    "nice_to_have": ["Precalculus"],
    "description": "The universal follow-up to AP CSA. Master efficiency and data organization through Big-O analysis, fundamental data structures, and core algorithms. Follows MIT 6.006 Introduction to Algorithms.",
    "tier": 1,
    "mit_anchor": "6.006 Introduction to Algorithms",
    "ocw": {
      "course_code": "6.006",
      "course_name": "Introduction to Algorithms",
      "semester": "Spring 2020",
      "course_home": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      "playlist": "https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY"
    },
    "weeks": [
      {
        "week": 1,
        "topic": "Algorithms and Computation",
        "description": "Introduction to algorithms, computational problems, and the word RAM model of computation. Learn what makes a good algorithm.",
        "mit_lecture": { "number": 1, "title": "Algorithms and Computation", "url": "https://www.youtube.com/watch?v=ZA-tUyM_y7s" },
        "resources": [
          { "title": "MIT 6.006 Lecture 1: Algorithms and Computation", "url": "https://www.youtube.com/watch?v=ZA-tUyM_y7s", "type": "Video" },
          { "title": "Big-O Cheat Sheet", "url": "https://www.bigocheatsheet.com/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Algorithm Correctness & Efficiency Lab",
            "description": "Download a starter project containing 4 algorithm stubs. Implement each algorithm, prove correctness with loop invariants, and analyze time/space complexity.",
            "languages": ["java", "cpp"],
            "template_files": {
              "java": {
                "filename": "Week1_AlgorithmLab.java",
                "content": "/**\n * Week 1: Algorithms and Computation Lab\n * MIT 6.006 - Introduction to Algorithms\n * \n * In this lab, you will implement fundamental algorithms and analyze their\n * correctness and efficiency using the concepts from Lecture 1.\n * \n * Learning Objectives:\n * - Understand what makes an algorithm correct (loop invariants)\n * - Analyze time complexity using the Word RAM model\n * - Compare algorithm efficiency across different input sizes\n */\n\nimport java.util.Arrays;\n\npublic class Week1_AlgorithmLab {\n    \n    /**\n     * PROBLEM 1: Find Maximum Element\n     * \n     * Given an array of integers, find and return the maximum value.\n     * \n     * TODO:\n     * 1. Implement the algorithm\n     * 2. Write the loop invariant in comments above the loop\n     * 3. Document time complexity: O(?)\n     * 4. Document space complexity: O(?)\n     * \n     * @param arr - non-empty array of integers\n     * @return the maximum value in the array\n     */\n    public static int findMax(int[] arr) {\n        // Loop Invariant: ???\n        // Your implementation here\n        return 0; // TODO: Replace\n    }\n    \n    /**\n     * PROBLEM 2: Linear Search\n     * \n     * Search for a target value in an unsorted array.\n     * Return the index if found, -1 otherwise.\n     * \n     * TODO:\n     * 1. Implement the algorithm\n     * 2. Write the loop invariant\n     * 3. Analyze: What is the best case? Worst case? Average case?\n     * 4. Time complexity: O(?)\n     * 5. Space complexity: O(?)\n     * \n     * @param arr - array of integers\n     * @param target - value to search for\n     * @return index of target, or -1 if not found\n     */\n    public static int linearSearch(int[] arr, int target) {\n        // Loop Invariant: ???\n        // Your implementation here\n        return -1; // TODO: Replace\n    }\n    \n    /**\n     * PROBLEM 3: Binary Search (Iterative)\n     * \n     * Search for a target value in a SORTED array using binary search.\n     * Return the index if found, -1 otherwise.\n     * \n     * TODO:\n     * 1. Implement the algorithm\n     * 2. Write the loop invariant (this one is tricky!)\n     * 3. Why does this require a sorted array?\n     * 4. Time complexity: O(?)\n     * 5. Space complexity: O(?)\n     * \n     * @param arr - SORTED array of integers\n     * @param target - value to search for\n     * @return index of target, or -1 if not found\n     */\n    public static int binarySearch(int[] arr, int target) {\n        // Loop Invariant: ???\n        // Your implementation here\n        return -1; // TODO: Replace\n    }\n    \n    /**\n     * PROBLEM 4: Verify Sorted Array\n     * \n     * Given an array, verify that it is sorted in non-decreasing order.\n     * This is a verification algorithm - we're checking a property.\n     * \n     * TODO:\n     * 1. Implement the algorithm\n     * 2. What is the loop invariant?\n     * 3. Can we do better than O(n)? Why or why not?\n     * 4. Time complexity: O(?)\n     * 5. Space complexity: O(?)\n     * \n     * @param arr - array of integers\n     * @return true if sorted in non-decreasing order, false otherwise\n     */\n    public static boolean isSorted(int[] arr) {\n        // Loop Invariant: ???\n        // Your implementation here\n        return false; // TODO: Replace\n    }\n    \n    /**\n     * BONUS PROBLEM: Two Sum\n     * \n     * Given an array and a target sum, find two distinct indices i and j\n     * such that arr[i] + arr[j] == target. Return the indices as an array [i, j].\n     * If no such pair exists, return null.\n     * \n     * TODO:\n     * 1. Implement a brute force O(n²) solution first\n     * 2. Think: Can we do better? (Hint: What if we could look up values in O(1)?)\n     * 3. Time complexity of your solution: O(?)\n     * 4. Space complexity of your solution: O(?)\n     * \n     * @param arr - array of integers\n     * @param target - target sum\n     * @return array of two indices, or null if not found\n     */\n    public static int[] twoSum(int[] arr, int target) {\n        // Your implementation here\n        return null; // TODO: Replace\n    }\n    \n    // ==================== TEST CASES ====================\n    public static void main(String[] args) {\n        System.out.println(\"=== Week 1: Algorithm Lab Tests ===\");\n        System.out.println();\n        \n        // Test findMax\n        System.out.println(\"--- Testing findMax ---\");\n        int[] test1 = {3, 1, 4, 1, 5, 9, 2, 6};\n        System.out.println(\"findMax([3,1,4,1,5,9,2,6]) = \" + findMax(test1) + \" (expected: 9)\");\n        System.out.println(\"findMax([42]) = \" + findMax(new int[]{42}) + \" (expected: 42)\");\n        System.out.println(\"findMax([-5,-2,-8,-1]) = \" + findMax(new int[]{-5,-2,-8,-1}) + \" (expected: -1)\");\n        System.out.println();\n        \n        // Test linearSearch\n        System.out.println(\"--- Testing linearSearch ---\");\n        int[] test2 = {10, 20, 30, 40, 50};\n        System.out.println(\"linearSearch([10,20,30,40,50], 30) = \" + linearSearch(test2, 30) + \" (expected: 2)\");\n        System.out.println(\"linearSearch([10,20,30,40,50], 35) = \" + linearSearch(test2, 35) + \" (expected: -1)\");\n        System.out.println(\"linearSearch([10,20,30,40,50], 10) = \" + linearSearch(test2, 10) + \" (expected: 0)\");\n        System.out.println();\n        \n        // Test binarySearch\n        System.out.println(\"--- Testing binarySearch ---\");\n        int[] test3 = {1, 3, 5, 7, 9, 11, 13};\n        System.out.println(\"binarySearch([1,3,5,7,9,11,13], 7) = \" + binarySearch(test3, 7) + \" (expected: 3)\");\n        System.out.println(\"binarySearch([1,3,5,7,9,11,13], 1) = \" + binarySearch(test3, 1) + \" (expected: 0)\");\n        System.out.println(\"binarySearch([1,3,5,7,9,11,13], 13) = \" + binarySearch(test3, 13) + \" (expected: 6)\");\n        System.out.println(\"binarySearch([1,3,5,7,9,11,13], 6) = \" + binarySearch(test3, 6) + \" (expected: -1)\");\n        System.out.println();\n        \n        // Test isSorted\n        System.out.println(\"--- Testing isSorted ---\");\n        System.out.println(\"isSorted([1,2,3,4,5]) = \" + isSorted(new int[]{1,2,3,4,5}) + \" (expected: true)\");\n        System.out.println(\"isSorted([1,2,2,3,4]) = \" + isSorted(new int[]{1,2,2,3,4}) + \" (expected: true)\");\n        System.out.println(\"isSorted([5,4,3,2,1]) = \" + isSorted(new int[]{5,4,3,2,1}) + \" (expected: false)\");\n        System.out.println(\"isSorted([1]) = \" + isSorted(new int[]{1}) + \" (expected: true)\");\n        System.out.println();\n        \n        // Test twoSum (Bonus)\n        System.out.println(\"--- Testing twoSum (Bonus) ---\");\n        int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);\n        System.out.println(\"twoSum([2,7,11,15], 9) = \" + (result != null ? Arrays.toString(result) : \"null\") + \" (expected: [0,1])\");\n        result = twoSum(new int[]{3, 2, 4}, 6);\n        System.out.println(\"twoSum([3,2,4], 6) = \" + (result != null ? Arrays.toString(result) : \"null\") + \" (expected: [1,2])\");\n        result = twoSum(new int[]{1, 2, 3}, 10);\n        System.out.println(\"twoSum([1,2,3], 10) = \" + (result != null ? Arrays.toString(result) : \"null\") + \" (expected: null)\");\n        \n        System.out.println();\n        System.out.println(\"=== Lab Complete ===\");\n        System.out.println(\"Don't forget to document your loop invariants and complexity analysis!\");\n    }\n}"
              },
              "cpp": {
                "filename": "Week1_AlgorithmLab.cpp",
                "content": "/**\n * Week 1: Algorithms and Computation Lab\n * MIT 6.006 - Introduction to Algorithms\n * \n * In this lab, you will implement fundamental algorithms and analyze their\n * correctness and efficiency using the concepts from Lecture 1.\n * \n * Learning Objectives:\n * - Understand what makes an algorithm correct (loop invariants)\n * - Analyze time complexity using the Word RAM model\n * - Compare algorithm efficiency across different input sizes\n * \n * Compile: g++ -std=c++17 -o lab Week1_AlgorithmLab.cpp\n * Run: ./lab\n */\n\n#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\n/**\n * PROBLEM 1: Find Maximum Element\n * \n * Given a vector of integers, find and return the maximum value.\n * \n * TODO:\n * 1. Implement the algorithm\n * 2. Write the loop invariant in comments above the loop\n * 3. Document time complexity: O(?)\n * 4. Document space complexity: O(?)\n */\nint findMax(const vector<int>& arr) {\n    // Loop Invariant: ???\n    // Your implementation here\n    return 0; // TODO: Replace\n}\n\n/**\n * PROBLEM 2: Linear Search\n * \n * Search for a target value in an unsorted vector.\n * Return the index if found, -1 otherwise.\n * \n * TODO:\n * 1. Implement the algorithm\n * 2. Write the loop invariant\n * 3. Analyze: What is the best case? Worst case? Average case?\n * 4. Time complexity: O(?)\n * 5. Space complexity: O(?)\n */\nint linearSearch(const vector<int>& arr, int target) {\n    // Loop Invariant: ???\n    // Your implementation here\n    return -1; // TODO: Replace\n}\n\n/**\n * PROBLEM 3: Binary Search (Iterative)\n * \n * Search for a target value in a SORTED vector using binary search.\n * Return the index if found, -1 otherwise.\n * \n * TODO:\n * 1. Implement the algorithm\n * 2. Write the loop invariant (this one is tricky!)\n * 3. Why does this require a sorted array?\n * 4. Time complexity: O(?)\n * 5. Space complexity: O(?)\n */\nint binarySearch(const vector<int>& arr, int target) {\n    // Loop Invariant: ???\n    // Your implementation here\n    return -1; // TODO: Replace\n}\n\n/**\n * PROBLEM 4: Verify Sorted Array\n * \n * Given a vector, verify that it is sorted in non-decreasing order.\n * \n * TODO:\n * 1. Implement the algorithm\n * 2. What is the loop invariant?\n * 3. Can we do better than O(n)? Why or why not?\n * 4. Time complexity: O(?)\n * 5. Space complexity: O(?)\n */\nbool isSorted(const vector<int>& arr) {\n    // Loop Invariant: ???\n    // Your implementation here\n    return false; // TODO: Replace\n}\n\n/**\n * BONUS PROBLEM: Two Sum\n * \n * Given a vector and a target sum, find two distinct indices i and j\n * such that arr[i] + arr[j] == target. Return the indices as a pair.\n * If no such pair exists, return {-1, -1}.\n * \n * TODO:\n * 1. Implement a brute force O(n²) solution first\n * 2. Think: Can we do better? (Hint: What if we could look up values in O(1)?)\n * 3. Time complexity of your solution: O(?)\n * 4. Space complexity of your solution: O(?)\n */\npair<int, int> twoSum(const vector<int>& arr, int target) {\n    // Your implementation here\n    return {-1, -1}; // TODO: Replace\n}\n\n// ==================== TEST CASES ====================\nint main() {\n    cout << \"=== Week 1: Algorithm Lab Tests ===\" << endl << endl;\n    \n    // Test findMax\n    cout << \"--- Testing findMax ---\" << endl;\n    cout << \"findMax({3,1,4,1,5,9,2,6}) = \" << findMax({3,1,4,1,5,9,2,6}) << \" (expected: 9)\" << endl;\n    cout << \"findMax({42}) = \" << findMax({42}) << \" (expected: 42)\" << endl;\n    cout << \"findMax({-5,-2,-8,-1}) = \" << findMax({-5,-2,-8,-1}) << \" (expected: -1)\" << endl << endl;\n    \n    // Test linearSearch\n    cout << \"--- Testing linearSearch ---\" << endl;\n    vector<int> test2 = {10, 20, 30, 40, 50};\n    cout << \"linearSearch({10,20,30,40,50}, 30) = \" << linearSearch(test2, 30) << \" (expected: 2)\" << endl;\n    cout << \"linearSearch({10,20,30,40,50}, 35) = \" << linearSearch(test2, 35) << \" (expected: -1)\" << endl;\n    cout << \"linearSearch({10,20,30,40,50}, 10) = \" << linearSearch(test2, 10) << \" (expected: 0)\" << endl << endl;\n    \n    // Test binarySearch\n    cout << \"--- Testing binarySearch ---\" << endl;\n    vector<int> test3 = {1, 3, 5, 7, 9, 11, 13};\n    cout << \"binarySearch({1,3,5,7,9,11,13}, 7) = \" << binarySearch(test3, 7) << \" (expected: 3)\" << endl;\n    cout << \"binarySearch({1,3,5,7,9,11,13}, 1) = \" << binarySearch(test3, 1) << \" (expected: 0)\" << endl;\n    cout << \"binarySearch({1,3,5,7,9,11,13}, 13) = \" << binarySearch(test3, 13) << \" (expected: 6)\" << endl;\n    cout << \"binarySearch({1,3,5,7,9,11,13}, 6) = \" << binarySearch(test3, 6) << \" (expected: -1)\" << endl << endl;\n    \n    // Test isSorted\n    cout << \"--- Testing isSorted ---\" << endl;\n    cout << \"isSorted({1,2,3,4,5}) = \" << (isSorted({1,2,3,4,5}) ? \"true\" : \"false\") << \" (expected: true)\" << endl;\n    cout << \"isSorted({1,2,2,3,4}) = \" << (isSorted({1,2,2,3,4}) ? \"true\" : \"false\") << \" (expected: true)\" << endl;\n    cout << \"isSorted({5,4,3,2,1}) = \" << (isSorted({5,4,3,2,1}) ? \"true\" : \"false\") << \" (expected: false)\" << endl;\n    cout << \"isSorted({1}) = \" << (isSorted({1}) ? \"true\" : \"false\") << \" (expected: true)\" << endl << endl;\n    \n    // Test twoSum (Bonus)\n    cout << \"--- Testing twoSum (Bonus) ---\" << endl;\n    auto result = twoSum({2, 7, 11, 15}, 9);\n    cout << \"twoSum({2,7,11,15}, 9) = [\" << result.first << \",\" << result.second << \"] (expected: [0,1])\" << endl;\n    result = twoSum({3, 2, 4}, 6);\n    cout << \"twoSum({3,2,4}, 6) = [\" << result.first << \",\" << result.second << \"] (expected: [1,2])\" << endl;\n    result = twoSum({1, 2, 3}, 10);\n    cout << \"twoSum({1,2,3}, 10) = [\" << result.first << \",\" << result.second << \"] (expected: [-1,-1])\" << endl;\n    \n    cout << endl << \"=== Lab Complete ===\" << endl;\n    cout << \"Don't forget to document your loop invariants and complexity analysis!\" << endl;\n    \n    return 0;\n}"
              }
            },
            "guidelines": [
              "Download the starter file in your preferred language (Java or C++)",
              "Open in your IDE (VS Code, IntelliJ, CLion, etc.)",
              "Implement all 4 required functions (findMax, linearSearch, binarySearch, isSorted)",
              "For EACH function, write a clear loop invariant comment explaining why the algorithm is correct",
              "Document time and space complexity in Big-O notation for each function",
              "Run the included test cases to verify your implementations",
              "BONUS: Implement twoSum and analyze whether O(n) is achievable",
              "Submit your completed file with all invariants and complexity analysis"
            ],
            "grading": {
              "implementation_correctness": 40,
              "loop_invariants": 25,
              "complexity_analysis": 25,
              "code_quality": 10
            }
          },
          "academic": {
            "title": "Algorithms & Computation Assessment",
            "description": "Test your understanding of computational problems, algorithm correctness, efficiency analysis, and the Word RAM model covered in MIT 6.006 Lecture 1.",
            "format": {
              "mcq": 6,
              "fill_in_blank": 4,
              "short_answer": 3,
              "total_points": 50,
              "time_limit": "40 minutes",
              "attempts": 2
            },
            "questions": {
              "mcq": [
                {
                  "id": "w1_mcq1",
                  "question": "Which of the following best describes the relationship between a problem and an algorithm?",
                  "options": [
                    "A problem is a specific solution, an algorithm is a general description",
                    "A problem describes a desired input-output relationship, an algorithm is a procedure to achieve it",
                    "A problem and an algorithm are the same thing",
                    "An algorithm defines the problem space"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w1_mcq2",
                  "question": "In the Word RAM model, which operation is NOT considered O(1)?",
                  "options": [
                    "Adding two w-bit integers",
                    "Accessing an array element by index",
                    "Sorting an array of n elements",
                    "Comparing two integers"
                  ],
                  "correct": 2,
                  "points": 3
                },
                {
                  "id": "w1_mcq3",
                  "question": "What does it mean for an algorithm to be 'correct'?",
                  "options": [
                    "It runs without errors",
                    "It terminates and produces the correct output for all valid inputs",
                    "It runs in polynomial time",
                    "It uses minimal memory"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w1_mcq4",
                  "question": "Which growth rate is the slowest for large n?",
                  "options": [
                    "O(n log n)",
                    "O(n²)",
                    "O(2ⁿ)",
                    "O(n³)"
                  ],
                  "correct": 0,
                  "points": 3
                },
                {
                  "id": "w1_mcq5",
                  "question": "If algorithm A runs in O(n) time and algorithm B runs in O(n²) time, for n = 1,000,000, approximately how many times faster is A than B?",
                  "options": [
                    "2 times faster",
                    "1,000 times faster",
                    "1,000,000 times faster",
                    "They are roughly the same"
                  ],
                  "correct": 2,
                  "points": 3
                },
                {
                  "id": "w1_mcq6",
                  "question": "A loop invariant must satisfy which three properties?",
                  "options": [
                    "Speed, correctness, efficiency",
                    "Initialization, maintenance, termination",
                    "Input, process, output",
                    "Best case, average case, worst case"
                  ],
                  "correct": 1,
                  "points": 3
                }
              ],
              "fill_in_blank": [
                {
                  "id": "w1_fib1",
                  "question": "In asymptotic notation, O(n²) grows _______ than O(n log n) as n approaches infinity.",
                  "answer": "faster",
                  "accept": ["faster", "quicker", "more quickly"],
                  "points": 3
                },
                {
                  "id": "w1_fib2",
                  "question": "The Word RAM model assumes that basic arithmetic operations on w-bit words take _______ time.",
                  "answer": "constant",
                  "accept": ["constant", "O(1)", "unit"],
                  "points": 3
                },
                {
                  "id": "w1_fib3",
                  "question": "Binary search requires the input array to be _______ in order to work correctly.",
                  "answer": "sorted",
                  "accept": ["sorted", "ordered"],
                  "points": 3
                },
                {
                  "id": "w1_fib4",
                  "question": "The time complexity of linear search in the worst case is _______.",
                  "answer": "O(n)",
                  "accept": ["O(n)", "linear", "Θ(n)"],
                  "points": 3
                }
              ],
              "short_answer": [
                {
                  "id": "w1_sa1",
                  "question": "Explain what a loop invariant is and why it is useful for proving algorithm correctness. Give an example using a simple search or max-finding algorithm.",
                  "points": 10,
                  "rubric": [
                    "Definition of loop invariant (2 pts)",
                    "Explanation of initialization property (2 pts)",
                    "Explanation of maintenance property (2 pts)",
                    "Explanation of termination property (2 pts)",
                    "Correct example with invariant stated (2 pts)"
                  ]
                },
                {
                  "id": "w1_sa2",
                  "question": "Why do we use the Word RAM model for algorithm analysis instead of counting exact CPU cycles? What are the key assumptions of this model?",
                  "points": 8,
                  "rubric": [
                    "Explains abstraction benefit - machine independence (2 pts)",
                    "Mentions w-bit word assumption (2 pts)",
                    "Lists O(1) operations: arithmetic, comparison, memory access (2 pts)",
                    "Mentions memory size assumption (2 pts)"
                  ]
                },
                {
                  "id": "w1_sa3",
                  "question": "Compare linear search and binary search. For each, state the time complexity and explain when you would choose one over the other.",
                  "points": 8,
                  "rubric": [
                    "Linear search: O(n) time (1 pt)",
                    "Binary search: O(log n) time (1 pt)",
                    "Linear works on unsorted arrays (2 pts)",
                    "Binary requires sorted array (2 pts)",
                    "Trade-off discussion: sorting cost vs search frequency (2 pts)"
                  ]
                }
              ]
            }
          },
          "communicator": {
            "title": "Introduction to Algorithms Presentation",
            "description": "Create and deliver a 12-15 minute presentation explaining key concepts from MIT 6.006 Lecture 1. You must demonstrate understanding of each concept listed below.",
            "format": {
              "duration": "12-15 minutes",
              "slides": "10-15 slides recommended",
              "delivery": "Live presentation or recorded video"
            },
            "key_concepts": [
              "Define what a computational problem is and how it differs from an algorithm",
              "Explain why the same problem can have multiple algorithms with different efficiencies",
              "Describe what it means for an algorithm to be 'correct' (termination + correct output)",
              "Explain the purpose of asymptotic analysis - why we ignore constants and lower-order terms",
              "Demonstrate how to count operations in a simple loop to derive time complexity",
              "Compare the growth rates of O(1), O(log n), O(n), O(n log n), and O(n²) with a visual graph",
              "Explain the Word RAM model: what operations cost O(1) and why we use this abstraction",
              "Define a loop invariant and explain why it helps prove algorithm correctness",
              "Walk through proving correctness of a simple algorithm (e.g., finding max) using initialization, maintenance, and termination",
              "Explain the difference between best-case, worst-case, and average-case analysis with an example"
            ],
            "grading": {
              "concept_coverage": 40,
              "clarity_of_explanation": 25,
              "visual_aids": 20,
              "delivery": 15
            },
            "submission": {
              "slides": "PDF or PPTX format",
              "video": "MP4, YouTube link, or schedule live presentation"
            }
          }
        }
      },
      {
        "week": 2,
        "topic": "Data Structures and Dynamic Arrays",
        "description": "Introduction to data structures, interfaces vs implementations. Deep dive into dynamic arrays with amortized analysis.",
        "mit_lecture": { "number": 2, "title": "Data Structures and Dynamic Arrays", "url": "https://www.youtube.com/watch?v=CHhwJjR0mZA" },
        "resources": [
          { "title": "MIT 6.006 Lecture 2: Data Structures and Dynamic Arrays", "url": "https://www.youtube.com/watch?v=CHhwJjR0mZA", "type": "Video" },
          { "title": "Dynamic Arrays Article", "url": "https://www.geeksforgeeks.org/how-do-dynamic-arrays-work/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dynamic Array Implementation Lab",
            "description": "Download the starter project and implement a complete dynamic array data structure with automatic resizing, insert, delete, and access operations.",
            "languages": ["java", "cpp"],
            "template_files": {
              "java": {
                "filename": "Week2_DynamicArray.java",
                "content": "/**\n * Week 2: Data Structures and Dynamic Arrays Lab\n * MIT 6.006 - Introduction to Algorithms\n * \n * In this lab, you will implement a dynamic array (similar to ArrayList/Vector)\n * that automatically resizes when capacity is exceeded.\n * \n * Learning Objectives:\n * - Understand the difference between interface and implementation\n * - Implement dynamic resizing with table doubling\n * - Analyze amortized cost of append operations\n * - Compare time complexity of different operations\n */\n\nimport java.util.Arrays;\n\npublic class Week2_DynamicArray<T> {\n    private Object[] data;\n    private int size;      // Number of elements currently stored\n    private int capacity;  // Total capacity of the array\n    \n    private static final int INITIAL_CAPACITY = 4;\n    \n    /**\n     * Constructor: Initialize empty dynamic array\n     * \n     * TODO: Initialize data array with INITIAL_CAPACITY\n     * Time Complexity: O(?)\n     * Space Complexity: O(?)\n     */\n    public Week2_DynamicArray() {\n        // Your implementation here\n    }\n    \n    /**\n     * Get the number of elements in the array\n     * Time Complexity: O(?)\n     */\n    public int size() {\n        // Your implementation here\n        return 0;\n    }\n    \n    /**\n     * Check if the array is empty\n     * Time Complexity: O(?)\n     */\n    public boolean isEmpty() {\n        // Your implementation here\n        return true;\n    }\n    \n    /**\n     * Get element at index i\n     * \n     * TODO: Return element at index, throw exception if out of bounds\n     * Time Complexity: O(?)\n     * \n     * @throws IndexOutOfBoundsException if i < 0 or i >= size\n     */\n    @SuppressWarnings(\"unchecked\")\n    public T get(int i) {\n        // Your implementation here\n        return null;\n    }\n    \n    /**\n     * Set element at index i to value x\n     * \n     * TODO: Replace element at index, throw exception if out of bounds\n     * Time Complexity: O(?)\n     * \n     * @throws IndexOutOfBoundsException if i < 0 or i >= size\n     */\n    public void set(int i, T x) {\n        // Your implementation here\n    }\n    \n    /**\n     * PRIVATE HELPER: Resize the internal array to new capacity\n     * \n     * TODO: \n     * 1. Create new array with newCapacity\n     * 2. Copy all elements from old array to new array\n     * 3. Update data and capacity\n     * \n     * Time Complexity: O(?)\n     * Space Complexity: O(?)\n     */\n    private void resize(int newCapacity) {\n        // Your implementation here\n    }\n    \n    /**\n     * Append element x to the end of the array\n     * \n     * TODO:\n     * 1. If size == capacity, call resize(capacity * 2) [TABLE DOUBLING]\n     * 2. Add element at index size\n     * 3. Increment size\n     * \n     * Time Complexity: O(?) worst case, O(?) amortized\n     * \n     * IMPORTANT: Explain WHY amortized cost is O(1) in your comments!\n     */\n    public void append(T x) {\n        // Your implementation here\n    }\n    \n    /**\n     * Remove and return the last element\n     * \n     * TODO:\n     * 1. If empty, throw exception\n     * 2. Get last element\n     * 3. Decrement size\n     * 4. OPTIONAL: If size < capacity/4, resize to capacity/2 (prevents memory waste)\n     * \n     * Time Complexity: O(?)\n     * \n     * @throws RuntimeException if array is empty\n     */\n    @SuppressWarnings(\"unchecked\")\n    public T pop() {\n        // Your implementation here\n        return null;\n    }\n    \n    /**\n     * Insert element x at index i, shifting elements right\n     * \n     * TODO:\n     * 1. Check bounds (0 <= i <= size)\n     * 2. Resize if necessary\n     * 3. Shift elements from i to size-1 one position right\n     * 4. Insert x at index i\n     * 5. Increment size\n     * \n     * Time Complexity: O(?)\n     */\n    public void insertAt(int i, T x) {\n        // Your implementation here\n    }\n    \n    /**\n     * Remove element at index i, shifting elements left\n     * \n     * TODO:\n     * 1. Check bounds\n     * 2. Save element at i\n     * 3. Shift elements from i+1 to size-1 one position left\n     * 4. Decrement size\n     * 5. Return removed element\n     * \n     * Time Complexity: O(?)\n     */\n    @SuppressWarnings(\"unchecked\")\n    public T removeAt(int i) {\n        // Your implementation here\n        return null;\n    }\n    \n    /**\n     * Return current capacity (for testing purposes)\n     */\n    public int getCapacity() {\n        return capacity;\n    }\n    \n    @Override\n    public String toString() {\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int i = 0; i < size; i++) {\n            sb.append(data[i]);\n            if (i < size - 1) sb.append(\", \");\n        }\n        sb.append(\"] (size=\").append(size).append(\", capacity=\").append(capacity).append(\")\");\n        return sb.toString();\n    }\n    \n    // ==================== TEST CASES ====================\n    public static void main(String[] args) {\n        System.out.println(\"=== Week 2: Dynamic Array Lab Tests ===\");\n        System.out.println();\n        \n        Week2_DynamicArray<Integer> arr = new Week2_DynamicArray<>();\n        \n        // Test initial state\n        System.out.println(\"--- Initial State ---\");\n        System.out.println(\"isEmpty(): \" + arr.isEmpty() + \" (expected: true)\");\n        System.out.println(\"size(): \" + arr.size() + \" (expected: 0)\");\n        System.out.println();\n        \n        // Test append and automatic resizing\n        System.out.println(\"--- Testing append with automatic resizing ---\");\n        for (int i = 1; i <= 10; i++) {\n            arr.append(i * 10);\n            System.out.println(\"After append(\" + (i*10) + \"): \" + arr);\n        }\n        System.out.println();\n        \n        // Test get and set\n        System.out.println(\"--- Testing get and set ---\");\n        System.out.println(\"get(0): \" + arr.get(0) + \" (expected: 10)\");\n        System.out.println(\"get(4): \" + arr.get(4) + \" (expected: 50)\");\n        arr.set(4, 999);\n        System.out.println(\"After set(4, 999): get(4) = \" + arr.get(4) + \" (expected: 999)\");\n        arr.set(4, 50); // Reset\n        System.out.println();\n        \n        // Test pop\n        System.out.println(\"--- Testing pop ---\");\n        System.out.println(\"pop(): \" + arr.pop() + \" (expected: 100)\");\n        System.out.println(\"pop(): \" + arr.pop() + \" (expected: 90)\");\n        System.out.println(\"After pops: \" + arr);\n        System.out.println();\n        \n        // Test insertAt\n        System.out.println(\"--- Testing insertAt ---\");\n        arr.insertAt(0, 5);  // Insert at beginning\n        System.out.println(\"After insertAt(0, 5): \" + arr);\n        arr.insertAt(4, 45); // Insert in middle\n        System.out.println(\"After insertAt(4, 45): \" + arr);\n        System.out.println();\n        \n        // Test removeAt\n        System.out.println(\"--- Testing removeAt ---\");\n        System.out.println(\"removeAt(0): \" + arr.removeAt(0) + \" (expected: 5)\");\n        System.out.println(\"After removeAt(0): \" + arr);\n        System.out.println();\n        \n        System.out.println(\"=== Lab Complete ===\");\n        System.out.println(\"Don't forget to analyze amortized complexity of append!\");\n    }\n}"
              },
              "cpp": {
                "filename": "Week2_DynamicArray.cpp",
                "content": "/**\n * Week 2: Data Structures and Dynamic Arrays Lab\n * MIT 6.006 - Introduction to Algorithms\n * \n * Implement a dynamic array (similar to std::vector) with automatic resizing.\n * \n * Compile: g++ -std=c++17 -o lab Week2_DynamicArray.cpp\n * Run: ./lab\n */\n\n#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\ntemplate <typename T>\nclass DynamicArray {\nprivate:\n    T* data;\n    int _size;\n    int _capacity;\n    static const int INITIAL_CAPACITY = 4;\n    \n    /**\n     * PRIVATE HELPER: Resize internal array to newCapacity\n     * Time Complexity: O(?)\n     */\n    void resize(int newCapacity) {\n        // TODO: Implement\n    }\n    \npublic:\n    /**\n     * Constructor: Initialize empty dynamic array\n     * Time Complexity: O(?)\n     */\n    DynamicArray() {\n        // TODO: Implement\n        data = nullptr;\n        _size = 0;\n        _capacity = 0;\n    }\n    \n    /**\n     * Destructor: Free memory\n     */\n    ~DynamicArray() {\n        delete[] data;\n    }\n    \n    int size() const { return _size; }\n    bool isEmpty() const { return _size == 0; }\n    int capacity() const { return _capacity; }\n    \n    /**\n     * Get element at index i\n     * Time Complexity: O(?)\n     */\n    T get(int i) const {\n        // TODO: Implement with bounds checking\n        return T();\n    }\n    \n    /**\n     * Set element at index i\n     * Time Complexity: O(?)\n     */\n    void set(int i, T x) {\n        // TODO: Implement with bounds checking\n    }\n    \n    /**\n     * Append element to end (with table doubling)\n     * Time Complexity: O(?) worst case, O(?) amortized\n     */\n    void append(T x) {\n        // TODO: Implement with automatic resizing\n    }\n    \n    /**\n     * Remove and return last element\n     * Time Complexity: O(?)\n     */\n    T pop() {\n        // TODO: Implement\n        return T();\n    }\n    \n    /**\n     * Insert at index i, shifting elements right\n     * Time Complexity: O(?)\n     */\n    void insertAt(int i, T x) {\n        // TODO: Implement\n    }\n    \n    /**\n     * Remove at index i, shifting elements left\n     * Time Complexity: O(?)\n     */\n    T removeAt(int i) {\n        // TODO: Implement\n        return T();\n    }\n    \n    void print() const {\n        cout << \"[\";\n        for (int i = 0; i < _size; i++) {\n            cout << data[i];\n            if (i < _size - 1) cout << \", \";\n        }\n        cout << \"] (size=\" << _size << \", capacity=\" << _capacity << \")\" << endl;\n    }\n};\n\nint main() {\n    cout << \"=== Week 2: Dynamic Array Lab Tests ===\" << endl << endl;\n    \n    DynamicArray<int> arr;\n    \n    cout << \"--- Testing append with automatic resizing ---\" << endl;\n    for (int i = 1; i <= 10; i++) {\n        arr.append(i * 10);\n        cout << \"After append(\" << i*10 << \"): \";\n        arr.print();\n    }\n    \n    cout << endl << \"--- Testing get/set ---\" << endl;\n    cout << \"get(0): \" << arr.get(0) << \" (expected: 10)\" << endl;\n    cout << \"get(4): \" << arr.get(4) << \" (expected: 50)\" << endl;\n    \n    cout << endl << \"--- Testing pop ---\" << endl;\n    cout << \"pop(): \" << arr.pop() << \" (expected: 100)\" << endl;\n    arr.print();\n    \n    cout << endl << \"=== Lab Complete ===\" << endl;\n    return 0;\n}"
              }
            },
            "guidelines": [
              "Download the starter file in Java or C++",
              "Implement all TODO methods following the specifications",
              "Document time complexity for EVERY method",
              "Explain in comments WHY append() has O(1) amortized cost despite O(n) worst case",
              "Run all test cases to verify correctness",
              "Consider edge cases: empty array, single element, resizing triggers"
            ],
            "grading": {
              "implementation_correctness": 40,
              "amortized_analysis_explanation": 25,
              "complexity_documentation": 20,
              "code_quality": 15
            }
          },
          "academic": {
            "title": "Data Structures & Amortized Analysis Assessment",
            "description": "Test your understanding of data structure interfaces, dynamic arrays, and amortized analysis from MIT 6.006 Lecture 2.",
            "format": {
              "mcq": 6,
              "fill_in_blank": 4,
              "short_answer": 3,
              "total_points": 50,
              "time_limit": "40 minutes",
              "attempts": 2
            },
            "questions": {
              "mcq": [
                {
                  "id": "w2_mcq1",
                  "question": "What is the key difference between a data structure interface and its implementation?",
                  "options": [
                    "An interface is faster than an implementation",
                    "An interface defines WHAT operations are supported; implementation defines HOW",
                    "An interface is written in pseudocode, implementation in real code",
                    "There is no difference"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w2_mcq2",
                  "question": "In a dynamic array using table doubling, what is the amortized cost of append()?",
                  "options": [
                    "O(n)",
                    "O(log n)",
                    "O(1)",
                    "O(n²)"
                  ],
                  "correct": 2,
                  "points": 3
                },
                {
                  "id": "w2_mcq3",
                  "question": "If a dynamic array has size 8 and capacity 8, what happens when we append one more element?",
                  "options": [
                    "The element is rejected",
                    "A new array of capacity 16 is allocated and elements are copied",
                    "A new array of capacity 9 is allocated",
                    "The element overwrites the first element"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w2_mcq4",
                  "question": "What is the worst-case time complexity of get(i) in a dynamic array?",
                  "options": [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(n²)"
                  ],
                  "correct": 0,
                  "points": 3
                },
                {
                  "id": "w2_mcq5",
                  "question": "Why do we double the capacity rather than adding a fixed amount (e.g., +10)?",
                  "options": [
                    "Doubling uses less memory",
                    "Doubling ensures O(1) amortized append; fixed increment gives O(n) amortized",
                    "Doubling is simpler to implement",
                    "There is no advantage to doubling"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w2_mcq6",
                  "question": "What is the time complexity of inserting an element at the BEGINNING of a dynamic array?",
                  "options": [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(1) amortized"
                  ],
                  "correct": 2,
                  "points": 3
                }
              ],
              "fill_in_blank": [
                {
                  "id": "w2_fib1",
                  "question": "In table doubling, when we resize from capacity n to 2n and copy n elements, the cost is _______ but this happens only once every n appends.",
                  "answer": "O(n)",
                  "accept": ["O(n)", "linear", "n"],
                  "points": 3
                },
                {
                  "id": "w2_fib2",
                  "question": "The Sequence interface supports operations like get(i), set(i,x), insert(i,x), and _______ at index i.",
                  "answer": "delete",
                  "accept": ["delete", "remove", "delete(i)", "remove(i)"],
                  "points": 3
                },
                {
                  "id": "w2_fib3",
                  "question": "Amortized analysis gives the average cost per operation over a _______ of operations.",
                  "answer": "sequence",
                  "accept": ["sequence", "series", "sequence of operations"],
                  "points": 3
                },
                {
                  "id": "w2_fib4",
                  "question": "A static array has fixed _______, while a dynamic array can grow automatically.",
                  "answer": "size",
                  "accept": ["size", "capacity", "length"],
                  "points": 3
                }
              ],
              "short_answer": [
                {
                  "id": "w2_sa1",
                  "question": "Prove that append() in a dynamic array with table doubling has O(1) amortized cost. Use the accounting method or aggregate analysis.",
                  "points": 12,
                  "rubric": [
                    "Identifies that resize copies n elements every n appends (3 pts)",
                    "Shows total cost of n appends is O(n) (3 pts)",
                    "Concludes amortized cost = O(n)/n = O(1) (3 pts)",
                    "Clear mathematical reasoning (3 pts)"
                  ]
                },
                {
                  "id": "w2_sa2",
                  "question": "Compare a static array vs a linked list for implementing the Sequence interface. Give the time complexity of get(i), insert_first(x), and insert_last(x) for each.",
                  "points": 8,
                  "rubric": [
                    "Static array: get O(1), insert_first O(n), insert_last O(1) amortized (3 pts)",
                    "Linked list: get O(n), insert_first O(1), insert_last O(1) with tail pointer (3 pts)",
                    "Discussion of trade-offs (2 pts)"
                  ]
                },
                {
                  "id": "w2_sa3",
                  "question": "Why is the distinction between 'interface' and 'implementation' important in algorithm design? Give an example.",
                  "points": 6,
                  "rubric": [
                    "Explains interface defines operations abstractly (2 pts)",
                    "Explains same interface can have multiple implementations (2 pts)",
                    "Good example (e.g., Stack interface with array vs linked list implementation) (2 pts)"
                  ]
                }
              ]
            }
          },
          "communicator": {
            "title": "Data Structures & Dynamic Arrays Presentation",
            "description": "Create and deliver a 12-15 minute presentation explaining key concepts from MIT 6.006 Lecture 2. Cover all concepts listed below.",
            "format": {
              "duration": "12-15 minutes",
              "slides": "10-15 slides recommended",
              "delivery": "Live presentation or recorded video"
            },
            "key_concepts": [
              "Explain the difference between a data structure interface and its implementation",
              "Describe the Sequence interface operations: get(i), set(i,x), insert(i,x), delete(i)",
              "Show how a static array stores elements contiguously in memory",
              "Explain why static arrays have O(1) access but O(n) insert at arbitrary position",
              "Demonstrate the table doubling strategy: when and how resizing occurs",
              "Walk through an example of 8 consecutive appends showing when resizes happen",
              "Explain what amortized analysis means and why it differs from worst-case analysis",
              "Prove or demonstrate why append has O(1) amortized cost with table doubling",
              "Compare dynamic arrays vs linked lists: trade-offs for different operations",
              "Discuss real-world examples of dynamic arrays (ArrayList in Java, vector in C++, list in Python)"
            ],
            "grading": {
              "concept_coverage": 40,
              "clarity_of_explanation": 25,
              "visual_aids": 20,
              "delivery": 15
            },
            "submission": {
              "slides": "PDF or PPTX format",
              "video": "MP4, YouTube link, or schedule live presentation"
            }
          }
        }
      },
      {
        "week": 3,
        "topic": "Sets and Sorting",
        "description": "Set interface and implementations. Introduction to sorting: permutation sort, selection sort, insertion sort, and merge sort.",
        "mit_lecture": { "number": 3, "title": "Sets and Sorting", "url": "https://www.youtube.com/watch?v=oS9aPzUNG-s" },
        "resources": [
          { "title": "MIT 6.006 Lecture 3: Sets and Sorting", "url": "https://www.youtube.com/watch?v=oS9aPzUNG-s", "type": "Video" },
          { "title": "Sorting Algorithms Visualized", "url": "https://visualgo.net/en/sorting", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "Sorting Algorithms Implementation Lab",
            "description": "Download the starter project and implement three sorting algorithms: selection sort, insertion sort, and merge sort. Analyze and compare their performance.",
            "languages": ["java", "cpp"],
            "template_files": {
              "java": {
                "filename": "Week3_Sorting.java",
                "content": "/**\n * Week 3: Sets and Sorting Lab\n * MIT 6.006 - Introduction to Algorithms\n * \n * In this lab, you will implement and analyze three sorting algorithms:\n * - Selection Sort (O(n²))\n * - Insertion Sort (O(n²) worst, O(n) best)\n * - Merge Sort (O(n log n))\n * \n * Learning Objectives:\n * - Understand the Set interface and how sorting relates to it\n * - Implement comparison-based sorting algorithms\n * - Analyze and compare time complexity across different inputs\n * - Understand stability in sorting algorithms\n */\n\nimport java.util.Arrays;\nimport java.util.Random;\n\npublic class Week3_Sorting {\n    \n    /**\n     * SELECTION SORT\n     * \n     * Algorithm:\n     * 1. Find the minimum element in unsorted portion\n     * 2. Swap it with the first unsorted element\n     * 3. Repeat for remaining unsorted portion\n     * \n     * TODO: Implement selection sort\n     * Time Complexity: O(?) for ALL cases (best, average, worst)\n     * Space Complexity: O(?)\n     * Stable: Yes/No?\n     */\n    public static void selectionSort(int[] arr) {\n        // Your implementation here\n    }\n    \n    /**\n     * INSERTION SORT\n     * \n     * Algorithm:\n     * 1. Start with second element\n     * 2. Compare with elements to the left, shift larger elements right\n     * 3. Insert current element in correct position\n     * 4. Repeat for all elements\n     * \n     * TODO: Implement insertion sort\n     * Time Complexity: O(?) best case, O(?) worst case\n     * Space Complexity: O(?)\n     * Stable: Yes/No?\n     * \n     * QUESTION: When does insertion sort achieve O(n)? Why?\n     */\n    public static void insertionSort(int[] arr) {\n        // Your implementation here\n    }\n    \n    /**\n     * MERGE SORT (Recursive)\n     * \n     * Algorithm (Divide and Conquer):\n     * 1. Divide array into two halves\n     * 2. Recursively sort each half\n     * 3. Merge the sorted halves\n     * \n     * TODO: Implement merge sort\n     * Time Complexity: O(?) for ALL cases\n     * Space Complexity: O(?)\n     * Stable: Yes/No?\n     * \n     * QUESTION: Write the recurrence relation T(n) = ?\n     */\n    public static void mergeSort(int[] arr) {\n        if (arr.length <= 1) return;\n        mergeSort(arr, 0, arr.length - 1);\n    }\n    \n    private static void mergeSort(int[] arr, int left, int right) {\n        // TODO: Implement recursive merge sort\n        // Base case: if left >= right, return\n        // Recursive case:\n        //   1. Find mid = (left + right) / 2\n        //   2. mergeSort(arr, left, mid)\n        //   3. mergeSort(arr, mid+1, right)\n        //   4. merge(arr, left, mid, right)\n    }\n    \n    /**\n     * MERGE helper function\n     * \n     * Merges two sorted subarrays: arr[left..mid] and arr[mid+1..right]\n     * \n     * TODO: Implement the merge function\n     * Time Complexity: O(?)\n     * Space Complexity: O(?)\n     */\n    private static void merge(int[] arr, int left, int mid, int right) {\n        // TODO: Implement merge\n        // 1. Create temp arrays for left and right halves\n        // 2. Copy data to temp arrays\n        // 3. Merge temp arrays back into arr[left..right]\n    }\n    \n    /**\n     * BONUS: In-Place Merge Sort\n     * Can you implement merge sort with O(1) extra space?\n     * (This is tricky and not required, but good practice!)\n     */\n    \n    // ==================== HELPER METHODS ====================\n    \n    public static int[] copyArray(int[] arr) {\n        return Arrays.copyOf(arr, arr.length);\n    }\n    \n    public static boolean isSorted(int[] arr) {\n        for (int i = 0; i < arr.length - 1; i++) {\n            if (arr[i] > arr[i + 1]) return false;\n        }\n        return true;\n    }\n    \n    public static int[] generateRandom(int n) {\n        Random rand = new Random(42); // Fixed seed for reproducibility\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) {\n            arr[i] = rand.nextInt(1000);\n        }\n        return arr;\n    }\n    \n    public static int[] generateSorted(int n) {\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = i;\n        return arr;\n    }\n    \n    public static int[] generateReversed(int n) {\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = n - i;\n        return arr;\n    }\n    \n    // ==================== TEST CASES ====================\n    public static void main(String[] args) {\n        System.out.println(\"=== Week 3: Sorting Algorithms Lab ===\");\n        System.out.println();\n        \n        // Basic correctness tests\n        System.out.println(\"--- Correctness Tests ---\");\n        \n        int[] test1 = {64, 34, 25, 12, 22, 11, 90};\n        int[] arr1 = copyArray(test1);\n        selectionSort(arr1);\n        System.out.println(\"Selection Sort: \" + Arrays.toString(arr1));\n        System.out.println(\"Sorted correctly: \" + isSorted(arr1));\n        \n        int[] arr2 = copyArray(test1);\n        insertionSort(arr2);\n        System.out.println(\"Insertion Sort: \" + Arrays.toString(arr2));\n        System.out.println(\"Sorted correctly: \" + isSorted(arr2));\n        \n        int[] arr3 = copyArray(test1);\n        mergeSort(arr3);\n        System.out.println(\"Merge Sort: \" + Arrays.toString(arr3));\n        System.out.println(\"Sorted correctly: \" + isSorted(arr3));\n        \n        System.out.println();\n        \n        // Performance comparison\n        System.out.println(\"--- Performance Comparison (n=1000) ---\");\n        int n = 1000;\n        \n        // Test on random array\n        int[] random = generateRandom(n);\n        \n        int[] r1 = copyArray(random);\n        long start = System.nanoTime();\n        selectionSort(r1);\n        long selectionTime = System.nanoTime() - start;\n        \n        int[] r2 = copyArray(random);\n        start = System.nanoTime();\n        insertionSort(r2);\n        long insertionTimeRandom = System.nanoTime() - start;\n        \n        int[] r3 = copyArray(random);\n        start = System.nanoTime();\n        mergeSort(r3);\n        long mergeTime = System.nanoTime() - start;\n        \n        System.out.println(\"Random array:\");\n        System.out.println(\"  Selection: \" + selectionTime/1000000.0 + \" ms\");\n        System.out.println(\"  Insertion: \" + insertionTimeRandom/1000000.0 + \" ms\");\n        System.out.println(\"  Merge:     \" + mergeTime/1000000.0 + \" ms\");\n        \n        // Test on already sorted (best case for insertion sort)\n        int[] sorted = generateSorted(n);\n        int[] s1 = copyArray(sorted);\n        start = System.nanoTime();\n        insertionSort(s1);\n        long insertionTimeSorted = System.nanoTime() - start;\n        \n        System.out.println(\"\\nAlready sorted array (Insertion Sort best case):\");\n        System.out.println(\"  Insertion: \" + insertionTimeSorted/1000000.0 + \" ms\");\n        \n        // Test on reverse sorted (worst case for insertion sort)\n        int[] reversed = generateReversed(n);\n        int[] rev1 = copyArray(reversed);\n        start = System.nanoTime();\n        insertionSort(rev1);\n        long insertionTimeReversed = System.nanoTime() - start;\n        \n        System.out.println(\"\\nReverse sorted array (Insertion Sort worst case):\");\n        System.out.println(\"  Insertion: \" + insertionTimeReversed/1000000.0 + \" ms\");\n        \n        System.out.println();\n        System.out.println(\"=== Lab Complete ===\");\n        System.out.println(\"Answer in comments: Why is merge sort always O(n log n)?\");\n        System.out.println(\"Answer in comments: When would you choose insertion sort over merge sort?\");\n    }\n}"
              },
              "cpp": {
                "filename": "Week3_Sorting.cpp",
                "content": "/**\n * Week 3: Sets and Sorting Lab\n * MIT 6.006 - Introduction to Algorithms\n * \n * Implement Selection Sort, Insertion Sort, and Merge Sort.\n * \n * Compile: g++ -std=c++17 -o lab Week3_Sorting.cpp\n * Run: ./lab\n */\n\n#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <chrono>\n#include <random>\nusing namespace std;\n\n/**\n * SELECTION SORT\n * Time Complexity: O(?) all cases\n * Space Complexity: O(?)\n * Stable: Yes/No?\n */\nvoid selectionSort(vector<int>& arr) {\n    // TODO: Implement\n}\n\n/**\n * INSERTION SORT\n * Time Complexity: O(?) best, O(?) worst\n * Space Complexity: O(?)\n * Stable: Yes/No?\n */\nvoid insertionSort(vector<int>& arr) {\n    // TODO: Implement\n}\n\n/**\n * MERGE helper function\n * Time Complexity: O(?)\n */\nvoid merge(vector<int>& arr, int left, int mid, int right) {\n    // TODO: Implement\n}\n\n/**\n * MERGE SORT\n * Time Complexity: O(?) all cases\n * Space Complexity: O(?)\n * Stable: Yes/No?\n * Recurrence: T(n) = ?\n */\nvoid mergeSort(vector<int>& arr, int left, int right) {\n    // TODO: Implement\n}\n\nvoid mergeSort(vector<int>& arr) {\n    if (arr.size() <= 1) return;\n    mergeSort(arr, 0, arr.size() - 1);\n}\n\nbool isSorted(const vector<int>& arr) {\n    for (size_t i = 0; i < arr.size() - 1; i++) {\n        if (arr[i] > arr[i + 1]) return false;\n    }\n    return true;\n}\n\nint main() {\n    cout << \"=== Week 3: Sorting Lab ===\" << endl << endl;\n    \n    vector<int> test = {64, 34, 25, 12, 22, 11, 90};\n    \n    vector<int> arr1 = test;\n    selectionSort(arr1);\n    cout << \"Selection Sort sorted: \" << (isSorted(arr1) ? \"YES\" : \"NO\") << endl;\n    \n    vector<int> arr2 = test;\n    insertionSort(arr2);\n    cout << \"Insertion Sort sorted: \" << (isSorted(arr2) ? \"YES\" : \"NO\") << endl;\n    \n    vector<int> arr3 = test;\n    mergeSort(arr3);\n    cout << \"Merge Sort sorted: \" << (isSorted(arr3) ? \"YES\" : \"NO\") << endl;\n    \n    cout << endl << \"=== Lab Complete ===\" << endl;\n    return 0;\n}"
              }
            },
            "guidelines": [
              "Download the starter file in Java or C++",
              "Implement all three sorting algorithms: selection sort, insertion sort, merge sort",
              "Document time complexity (best, average, worst case) for each algorithm",
              "Document space complexity and whether each sort is stable",
              "Write the recurrence relation for merge sort: T(n) = 2T(n/2) + O(n)",
              "Run the performance tests and observe the differences",
              "Answer in comments: When does insertion sort outperform merge sort?"
            ],
            "grading": {
              "implementation_correctness": 40,
              "complexity_analysis": 30,
              "stability_analysis": 15,
              "code_quality": 15
            }
          },
          "academic": {
            "title": "Sets and Sorting Assessment",
            "description": "Test your understanding of the Set interface, sorting algorithms, and their analysis from MIT 6.006 Lecture 3.",
            "format": {
              "mcq": 6,
              "fill_in_blank": 4,
              "short_answer": 3,
              "total_points": 50,
              "time_limit": "40 minutes",
              "attempts": 2
            },
            "questions": {
              "mcq": [
                {
                  "id": "w3_mcq1",
                  "question": "What is the time complexity of merge sort in ALL cases (best, average, worst)?",
                  "options": [
                    "O(n)",
                    "O(n log n)",
                    "O(n²)",
                    "O(log n)"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w3_mcq2",
                  "question": "Which sorting algorithm has O(n) best-case time complexity?",
                  "options": [
                    "Selection Sort",
                    "Merge Sort",
                    "Insertion Sort",
                    "All of the above"
                  ],
                  "correct": 2,
                  "points": 3
                },
                {
                  "id": "w3_mcq3",
                  "question": "What is the space complexity of merge sort?",
                  "options": [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(n²)"
                  ],
                  "correct": 2,
                  "points": 3
                },
                {
                  "id": "w3_mcq4",
                  "question": "A sorting algorithm is 'stable' if:",
                  "options": [
                    "It always completes without crashing",
                    "It uses O(1) extra space",
                    "Equal elements maintain their relative order after sorting",
                    "It runs in O(n log n) time"
                  ],
                  "correct": 2,
                  "points": 3
                },
                {
                  "id": "w3_mcq5",
                  "question": "The recurrence relation for merge sort is T(n) = 2T(n/2) + O(n). What does the O(n) term represent?",
                  "options": [
                    "The time to divide the array",
                    "The time to merge two sorted halves",
                    "The time for the base case",
                    "The time for recursive calls"
                  ],
                  "correct": 1,
                  "points": 3
                },
                {
                  "id": "w3_mcq6",
                  "question": "Which Set interface operation does sorting help optimize?",
                  "options": [
                    "insert(x)",
                    "delete(x)",
                    "find(x) using binary search",
                    "All operations become O(1)"
                  ],
                  "correct": 2,
                  "points": 3
                }
              ],
              "fill_in_blank": [
                {
                  "id": "w3_fib1",
                  "question": "Selection sort always performs _______ comparisons regardless of input order.",
                  "answer": "O(n²)",
                  "accept": ["O(n²)", "n²", "n^2", "quadratic"],
                  "points": 3
                },
                {
                  "id": "w3_fib2",
                  "question": "Insertion sort achieves O(n) time when the input is already _______.",
                  "answer": "sorted",
                  "accept": ["sorted", "in order", "ordered"],
                  "points": 3
                },
                {
                  "id": "w3_fib3",
                  "question": "Merge sort uses the _______ algorithmic paradigm.",
                  "answer": "divide and conquer",
                  "accept": ["divide and conquer", "divide-and-conquer", "D&C"],
                  "points": 3
                },
                {
                  "id": "w3_fib4",
                  "question": "The Set interface supports operations: find(k), insert(x), delete(k), and _______ which returns the next larger key.",
                  "answer": "find_next",
                  "accept": ["find_next", "successor", "find_next(k)"],
                  "points": 3
                }
              ],
              "short_answer": [
                {
                  "id": "w3_sa1",
                  "question": "Solve the merge sort recurrence T(n) = 2T(n/2) + cn using the recursion tree method. Show your work and derive the O(n log n) result.",
                  "points": 12,
                  "rubric": [
                    "Draws recursion tree correctly (3 pts)",
                    "Identifies tree has log n levels (2 pts)",
                    "Shows each level does O(n) work total (3 pts)",
                    "Concludes T(n) = O(n log n) (2 pts)",
                    "Clear reasoning (2 pts)"
                  ]
                },
                {
                  "id": "w3_sa2",
                  "question": "Compare insertion sort and merge sort. When would you choose insertion sort over merge sort? Consider time complexity, space complexity, and practical factors.",
                  "points": 8,
                  "rubric": [
                    "Identifies insertion sort is O(n) for nearly sorted data (2 pts)",
                    "Identifies merge sort has O(n) space overhead (2 pts)",
                    "Mentions insertion sort is better for small arrays (2 pts)",
                    "Discusses cache efficiency or implementation simplicity (2 pts)"
                  ]
                },
                {
                  "id": "w3_sa3",
                  "question": "Why is stability important in sorting? Give a real-world example where using an unstable sort would produce incorrect results.",
                  "points": 6,
                  "rubric": [
                    "Defines stability correctly (2 pts)",
                    "Gives valid real-world example (2 pts)",
                    "Explains why instability causes problem in example (2 pts)"
                  ]
                }
              ]
            }
          },
          "communicator": {
            "title": "Sets and Sorting Algorithms Presentation",
            "description": "Create and deliver a 12-15 minute presentation explaining key concepts from MIT 6.006 Lecture 3. Cover all concepts listed below.",
            "format": {
              "duration": "12-15 minutes",
              "slides": "10-15 slides recommended",
              "delivery": "Live presentation or recorded video"
            },
            "key_concepts": [
              "Define the Set interface and its core operations: find(k), insert(x), delete(k), find_min(), find_max(), find_next(k)",
              "Explain how sorting a set enables O(log n) search via binary search",
              "Demonstrate selection sort step-by-step on a small example array",
              "Explain why selection sort is always O(n²) regardless of input",
              "Demonstrate insertion sort step-by-step on a small example",
              "Explain why insertion sort is O(n) on already-sorted input",
              "Explain the divide-and-conquer paradigm used by merge sort",
              "Walk through merge sort recursion on a small array, showing the divide and merge steps",
              "Derive the merge sort recurrence T(n) = 2T(n/2) + O(n) and solve it to get O(n log n)",
              "Define what it means for a sort to be 'stable' and explain why it matters",
              "Compare selection sort, insertion sort, and merge sort: when to use each"
            ],
            "grading": {
              "concept_coverage": 40,
              "clarity_of_explanation": 25,
              "visual_aids": 20,
              "delivery": 15
            },
            "submission": {
              "slides": "PDF or PPTX format",
              "video": "MP4, YouTube link, or schedule live presentation"
            }
          }
        }
      },
      {
        "week": 4,
        "topic": "Hashing",
        "description": "Hash functions, hash tables, chaining, and open addressing. Universal hashing and load factors.",
        "mit_lecture": { "number": 4, "title": "Hashing", "url": "https://www.youtube.com/watch?v=Nu8YGneFCWE" },
        "resources": [
          { "title": "MIT 6.006 Lecture 4: Hashing", "url": "https://www.youtube.com/watch?v=Nu8YGneFCWE", "type": "Video" },
          { "title": "Hash Table Implementation", "url": "https://www.geeksforgeeks.org/implementing-our-own-hash-table-with-separate-chaining-in-java/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Hash Table Implementation",
            "description": "Build a hash table with chaining collision resolution and automatic resizing.",
            "guidelines": ["Implement polynomial hash function", "Handle collisions with chaining", "Resize when load factor > 0.75", "Support put, get, remove, containsKey"]
          },
          "academic": {
            "title": "Hashing Theory Assessment",
            "description": "Written test on hash functions, collision resolution, and expected complexity analysis.",
            "guidelines": ["Explain universal hashing", "Analyze expected chain length", "Compare chaining vs open addressing", "Prove expected O(1) operations"]
          },
          "communicator": {
            "title": "Hashing Deep Dive Presentation",
            "description": "10-minute presentation explaining how hash tables achieve O(1) average operations.",
            "guidelines": ["Visualize hash function mapping", "Demonstrate collision scenarios", "Explain load factor impact", "Show real-world applications"]
          }
        }
      },
      {
        "week": 5,
        "topic": "Linear Sorting",
        "description": "Breaking the O(n log n) barrier: counting sort, radix sort. When and why linear sorting is possible.",
        "mit_lecture": { "number": 5, "title": "Linear Sorting", "url": "https://www.youtube.com/watch?v=yndgIDO0zQQ" },
        "resources": [
          { "title": "MIT 6.006 Lecture 5: Linear Sorting", "url": "https://www.youtube.com/watch?v=yndgIDO0zQQ", "type": "Video" },
          { "title": "Counting Sort Tutorial", "url": "https://www.programiz.com/dsa/counting-sort", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Linear Sorting Algorithms",
            "description": "Implement counting sort and radix sort. Benchmark against comparison sorts.",
            "guidelines": ["Implement counting sort for integers", "Implement radix sort (LSD)", "Compare with merge sort on large inputs", "Analyze space-time tradeoffs"]
          },
          "academic": {
            "title": "Linear Sorting Analysis",
            "description": "Written test on why comparison sorting has O(n log n) lower bound and when we can do better.",
            "guidelines": ["Prove comparison sort lower bound", "Explain when linear sorting applies", "Analyze counting sort complexity", "Compare radix sort variants"]
          },
          "communicator": {
            "title": "Breaking the Sorting Barrier",
            "description": "10-minute presentation on how we can sort faster than O(n log n).",
            "guidelines": ["Explain comparison sort limitation", "Demonstrate counting sort visually", "Show radix sort step-by-step", "Discuss practical applications"]
          }
        }
      },
      {
        "week": 6,
        "topic": "Binary Trees, Part 1",
        "description": "Binary tree terminology, traversals (in-order, pre-order, post-order), and binary search tree operations.",
        "mit_lecture": { "number": 6, "title": "Binary Trees, Part 1", "url": "https://www.youtube.com/watch?v=76dhtgZt38A" },
        "resources": [
          { "title": "MIT 6.006 Lecture 6: Binary Trees, Part 1", "url": "https://www.youtube.com/watch?v=76dhtgZt38A", "type": "Video" },
          { "title": "BST Visualization", "url": "https://visualgo.net/en/bst", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "Binary Search Tree Implementation",
            "description": "Implement a BST with insert, search, delete, and all traversal methods.",
            "guidelines": ["Implement BST with proper ordering", "Handle all delete cases", "Implement three traversal methods", "Add min/max/successor operations"]
          },
          "academic": {
            "title": "BST Analysis Assessment",
            "description": "Written test on BST properties, operations, and complexity analysis.",
            "guidelines": ["Prove BST property enables binary search", "Analyze height-dependent complexity", "Explain delete algorithm cases", "Compare traversal applications"]
          },
          "communicator": {
            "title": "BST Operations Explained",
            "description": "10-minute presentation demonstrating BST operations with visualizations.",
            "guidelines": ["Show BST property visually", "Animate insert and search", "Demonstrate delete cases", "Compare to sorted arrays"]
          }
        }
      },
      {
        "week": 7,
        "topic": "Binary Trees, Part 2: AVL",
        "description": "Balanced binary search trees. AVL trees: rotations, balance factor, and maintaining O(log n) height.",
        "mit_lecture": { "number": 7, "title": "Binary Trees, Part 2: AVL", "url": "https://www.youtube.com/watch?v=U1JYwHcFfso" },
        "resources": [
          { "title": "MIT 6.006 Lecture 7: Binary Trees, Part 2: AVL", "url": "https://www.youtube.com/watch?v=U1JYwHcFfso", "type": "Video" },
          { "title": "AVL Tree Visualization", "url": "https://visualgo.net/en/bst", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "AVL Tree Implementation",
            "description": "Implement an AVL tree with automatic balancing through rotations.",
            "guidelines": ["Implement all four rotation types", "Track and update heights", "Balance after insert and delete", "Verify balance invariant maintained"]
          },
          "academic": {
            "title": "AVL Tree Analysis",
            "description": "Written test on AVL tree properties and rotation analysis.",
            "guidelines": ["Prove AVL height is O(log n)", "Analyze rotation complexity", "Compare to unbalanced BST", "Explain when each rotation applies"]
          },
          "communicator": {
            "title": "Balancing Act: AVL Trees",
            "description": "10-minute presentation on why balance matters and how AVL trees maintain it.",
            "guidelines": ["Show worst-case unbalanced BST", "Animate rotation operations", "Demonstrate rebalancing process", "Compare AVL to Red-Black trees"]
          }
        }
      },
      {
        "week": 8,
        "topic": "Binary Heaps",
        "description": "Heap property, array representation, heapify operations, and priority queue implementation.",
        "mit_lecture": { "number": 8, "title": "Binary Heaps", "url": "https://www.youtube.com/watch?v=Xnpo1atN-Iw" },
        "resources": [
          { "title": "MIT 6.006 Lecture 8: Binary Heaps", "url": "https://www.youtube.com/watch?v=Xnpo1atN-Iw", "type": "Video" },
          { "title": "Heap Visualization", "url": "https://visualgo.net/en/heap", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "Binary Heap & Priority Queue",
            "description": "Implement a min-heap with insert, extract-min, and build-heap operations.",
            "guidelines": ["Use array representation", "Implement heapify-up and heapify-down", "Build heap in O(n) time", "Create PriorityQueue wrapper class"]
          },
          "academic": {
            "title": "Heap Analysis Assessment",
            "description": "Written test on heap properties and build-heap complexity proof.",
            "guidelines": ["Prove heap property maintenance", "Derive build-heap O(n) complexity", "Compare heap vs BST for priority queue", "Analyze heapsort"]
          },
          "communicator": {
            "title": "Heaps and Priority Queues",
            "description": "10-minute presentation on heaps and their applications.",
            "guidelines": ["Show tree and array representations", "Animate insert and extract", "Explain priority queue use cases", "Demonstrate heapsort"]
          }
        }
      },
      {
        "week": 9,
        "topic": "Breadth-First Search",
        "description": "Graph representations, BFS algorithm, shortest paths in unweighted graphs, and applications.",
        "mit_lecture": { "number": 9, "title": "Breadth-First Search", "url": "https://www.youtube.com/watch?v=oFVYVzlvk9c" },
        "resources": [
          { "title": "MIT 6.006 Lecture 9: Breadth-First Search", "url": "https://www.youtube.com/watch?v=oFVYVzlvk9c", "type": "Video" },
          { "title": "BFS Visualization", "url": "https://visualgo.net/en/dfsbfs", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "Graph BFS Implementation",
            "description": "Implement graph class with BFS traversal and shortest path finding.",
            "guidelines": ["Implement adjacency list representation", "Write BFS using queue", "Track distances and parents", "Reconstruct shortest paths"]
          },
          "academic": {
            "title": "BFS Analysis Assessment",
            "description": "Written test on BFS correctness and complexity.",
            "guidelines": ["Prove BFS finds shortest paths", "Analyze O(V+E) complexity", "Compare adjacency list vs matrix", "Apply BFS to solve problems"]
          },
          "communicator": {
            "title": "BFS: Level by Level",
            "description": "10-minute presentation on BFS algorithm and applications.",
            "guidelines": ["Animate BFS traversal", "Show queue state at each step", "Demonstrate shortest path finding", "Discuss real-world applications"]
          }
        }
      },
      {
        "week": 10,
        "topic": "Depth-First Search",
        "description": "DFS algorithm, edge classification, cycle detection, and topological sort.",
        "mit_lecture": { "number": 10, "title": "Depth-First Search", "url": "https://www.youtube.com/watch?v=IBfWDYSffUU" },
        "resources": [
          { "title": "MIT 6.006 Lecture 10: Depth-First Search", "url": "https://www.youtube.com/watch?v=IBfWDYSffUU", "type": "Video" },
          { "title": "DFS Visualization", "url": "https://visualgo.net/en/dfsbfs", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "DFS and Topological Sort",
            "description": "Implement DFS with cycle detection and topological sorting.",
            "guidelines": ["Implement recursive and iterative DFS", "Classify edges (tree, back, forward, cross)", "Detect cycles using back edges", "Implement topological sort"]
          },
          "academic": {
            "title": "DFS Analysis Assessment",
            "description": "Written test on DFS properties and applications.",
            "guidelines": ["Prove DFS edge classification", "Explain cycle detection algorithm", "Prove topological sort correctness", "Compare DFS vs BFS applications"]
          },
          "communicator": {
            "title": "DFS: Going Deep",
            "description": "10-minute presentation on DFS and its powerful applications.",
            "guidelines": ["Animate DFS traversal", "Show edge classification", "Demonstrate cycle detection", "Explain topological sort use cases"]
          }
        }
      },
      {
        "week": 11,
        "topic": "Weighted Shortest Paths",
        "description": "Introduction to weighted graphs, shortest path problem formulation, and relaxation framework.",
        "mit_lecture": { "number": 11, "title": "Weighted Shortest Paths", "url": "https://www.youtube.com/watch?v=5cF5Bgv59Sc" },
        "resources": [
          { "title": "MIT 6.006 Lecture 11: Weighted Shortest Paths", "url": "https://www.youtube.com/watch?v=5cF5Bgv59Sc", "type": "Video" },
          { "title": "Shortest Path Algorithms", "url": "https://www.geeksforgeeks.org/shortest-path-algorithms-a-complete-guide/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Weighted Graph Implementation",
            "description": "Extend graph class to support weighted edges and implement relaxation.",
            "guidelines": ["Add edge weights to graph", "Implement edge relaxation", "Track distances and predecessors", "Handle DAG shortest paths"]
          },
          "academic": {
            "title": "Weighted Paths Analysis",
            "description": "Written test on shortest path problem formulation and properties.",
            "guidelines": ["Define shortest path problem formally", "Prove optimal substructure property", "Explain relaxation correctness", "Analyze DAG shortest paths"]
          },
          "communicator": {
            "title": "Introduction to Weighted Graphs",
            "description": "10-minute presentation on weighted shortest path problems.",
            "guidelines": ["Visualize weighted graphs", "Explain real-world applications", "Introduce relaxation concept", "Preview upcoming algorithms"]
          }
        }
      },
      {
        "week": 12,
        "topic": "Bellman-Ford Algorithm",
        "description": "Bellman-Ford algorithm for single-source shortest paths with negative weights. Detecting negative cycles.",
        "mit_lecture": { "number": 12, "title": "Bellman-Ford", "url": "https://www.youtube.com/watch?v=f9cVS_URPc0" },
        "resources": [
          { "title": "MIT 6.006 Lecture 12: Bellman-Ford", "url": "https://www.youtube.com/watch?v=f9cVS_URPc0", "type": "Video" },
          { "title": "Bellman-Ford Visualization", "url": "https://visualgo.net/en/sssp", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "Bellman-Ford Implementation",
            "description": "Implement Bellman-Ford algorithm with negative cycle detection.",
            "guidelines": ["Implement V-1 relaxation rounds", "Detect negative cycles with extra round", "Handle disconnected vertices", "Return shortest path distances"]
          },
          "academic": {
            "title": "Bellman-Ford Analysis",
            "description": "Written test on Bellman-Ford correctness and complexity.",
            "guidelines": ["Prove algorithm correctness", "Analyze O(VE) complexity", "Explain negative cycle detection", "Compare to other shortest path algorithms"]
          },
          "communicator": {
            "title": "Bellman-Ford Explained",
            "description": "10-minute presentation on Bellman-Ford algorithm.",
            "guidelines": ["Animate relaxation rounds", "Show negative weight handling", "Demonstrate cycle detection", "Discuss when to use Bellman-Ford"]
          }
        }
      },
      {
        "week": 13,
        "topic": "Dijkstra's Algorithm",
        "description": "Dijkstra's algorithm for efficient single-source shortest paths with non-negative weights.",
        "mit_lecture": { "number": 13, "title": "Dijkstra", "url": "https://www.youtube.com/watch?v=NSHizBK9JD8" },
        "resources": [
          { "title": "MIT 6.006 Lecture 13: Dijkstra", "url": "https://www.youtube.com/watch?v=NSHizBK9JD8", "type": "Video" },
          { "title": "Dijkstra Visualization", "url": "https://visualgo.net/en/sssp", "type": "Interactive" }
        ],
        "deliverables": {
          "builder": {
            "title": "Dijkstra's Algorithm Implementation",
            "description": "Implement Dijkstra's algorithm using a priority queue.",
            "guidelines": ["Use min-heap priority queue", "Process vertices in order of distance", "Track predecessors for path reconstruction", "Handle disconnected components"]
          },
          "academic": {
            "title": "Dijkstra Analysis",
            "description": "Written test on Dijkstra's correctness and complexity.",
            "guidelines": ["Prove greedy choice is optimal", "Analyze complexity with different heaps", "Explain non-negative weight requirement", "Compare Dijkstra vs Bellman-Ford"]
          },
          "communicator": {
            "title": "Dijkstra's Algorithm Deep Dive",
            "description": "10-minute presentation on Dijkstra's algorithm.",
            "guidelines": ["Animate algorithm execution", "Show priority queue operations", "Explain why negative weights fail", "Discuss real-world applications (GPS)"]
          }
        }
      },
      {
        "week": 14,
        "topic": "APSP and Johnson's Algorithm",
        "description": "All-pairs shortest paths. Johnson's algorithm combining Bellman-Ford and Dijkstra.",
        "mit_lecture": { "number": 14, "title": "APSP and Johnson", "url": "https://www.youtube.com/watch?v=EmSmaW-ud6A" },
        "resources": [
          { "title": "MIT 6.006 Lecture 14: APSP and Johnson", "url": "https://www.youtube.com/watch?v=EmSmaW-ud6A", "type": "Video" },
          { "title": "Johnson's Algorithm", "url": "https://www.geeksforgeeks.org/johnsons-algorithm/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Johnson's Algorithm Implementation",
            "description": "Implement Johnson's algorithm for all-pairs shortest paths.",
            "guidelines": ["Add auxiliary vertex and edges", "Run Bellman-Ford for reweighting", "Run Dijkstra from each vertex", "Reconstruct original distances"]
          },
          "academic": {
            "title": "APSP Analysis",
            "description": "Written test on all-pairs shortest paths algorithms.",
            "guidelines": ["Compare Floyd-Warshall vs Johnson", "Prove reweighting preserves shortest paths", "Analyze Johnson's complexity", "Explain when to use each algorithm"]
          },
          "communicator": {
            "title": "All-Pairs Shortest Paths",
            "description": "10-minute presentation on APSP problem and solutions.",
            "guidelines": ["Explain APSP problem", "Show reweighting technique", "Compare algorithm choices", "Discuss applications"]
          }
        }
      },
      {
        "week": 15,
        "topic": "Dynamic Programming, Part 1: SRTBOT",
        "description": "Introduction to dynamic programming. SRTBOT framework: Subproblems, Relate, Topological order, Base cases, Original problem, Time.",
        "mit_lecture": { "number": 15, "title": "Dynamic Programming, Part 1: SRTBOT", "url": "https://www.youtube.com/watch?v=r4-cftqTcdI" },
        "resources": [
          { "title": "MIT 6.006 Lecture 15: Dynamic Programming, Part 1", "url": "https://www.youtube.com/watch?v=r4-cftqTcdI", "type": "Video" },
          { "title": "DP Tutorial", "url": "https://www.geeksforgeeks.org/dynamic-programming/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "DP Foundations: Fibonacci & DAG Paths",
            "description": "Implement DP solutions for Fibonacci and DAG shortest paths.",
            "guidelines": ["Implement memoized Fibonacci", "Implement bottom-up Fibonacci", "Solve DAG shortest paths with DP", "Apply SRTBOT framework"]
          },
          "academic": {
            "title": "DP Framework Assessment",
            "description": "Written test on SRTBOT framework and DP fundamentals.",
            "guidelines": ["Apply SRTBOT to new problems", "Compare memoization vs tabulation", "Analyze DP time complexity", "Identify optimal substructure"]
          },
          "communicator": {
            "title": "Introduction to Dynamic Programming",
            "description": "10-minute presentation introducing DP concepts.",
            "guidelines": ["Explain overlapping subproblems", "Walk through SRTBOT framework", "Show Fibonacci example", "Discuss DP mindset"]
          }
        }
      },
      {
        "week": 16,
        "topic": "Dynamic Programming, Part 2: LCS, LIS",
        "description": "Classic DP problems: Longest Common Subsequence and Longest Increasing Subsequence.",
        "mit_lecture": { "number": 16, "title": "Dynamic Programming, Part 2: LCS, LIS", "url": "https://www.youtube.com/watch?v=KLBCUx1is2c" },
        "resources": [
          { "title": "MIT 6.006 Lecture 16: Dynamic Programming, Part 2", "url": "https://www.youtube.com/watch?v=KLBCUx1is2c", "type": "Video" },
          { "title": "LCS and LIS Explained", "url": "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "LCS and LIS Implementation",
            "description": "Implement solutions for Longest Common Subsequence and Longest Increasing Subsequence.",
            "guidelines": ["Implement LCS with 2D DP table", "Reconstruct the actual LCS", "Implement LIS in O(n²)", "Implement LIS in O(n log n) with binary search"]
          },
          "academic": {
            "title": "Sequence DP Assessment",
            "description": "Written test on LCS, LIS, and related problems.",
            "guidelines": ["Derive LCS recurrence relation", "Prove LIS correctness", "Analyze space optimization", "Solve variations (edit distance)"]
          },
          "communicator": {
            "title": "Sequence Problems with DP",
            "description": "10-minute presentation on LCS and LIS problems.",
            "guidelines": ["Visualize DP table filling", "Show backtracking for solution", "Explain applications (diff tools)", "Compare complexity approaches"]
          }
        }
      },
      {
        "week": 17,
        "topic": "Dynamic Programming, Part 3: APSP, Knapsack",
        "description": "Floyd-Warshall for APSP and the 0/1 Knapsack problem.",
        "mit_lecture": { "number": 17, "title": "Dynamic Programming, Part 3: APSP", "url": "https://www.youtube.com/watch?v=TDo3r5M1LNo" },
        "resources": [
          { "title": "MIT 6.006 Lecture 17: Dynamic Programming, Part 3", "url": "https://www.youtube.com/watch?v=TDo3r5M1LNo", "type": "Video" },
          { "title": "Knapsack Problem", "url": "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "Floyd-Warshall and Knapsack",
            "description": "Implement Floyd-Warshall APSP and 0/1 Knapsack solutions.",
            "guidelines": ["Implement Floyd-Warshall with path reconstruction", "Implement 0/1 Knapsack with backtracking", "Optimize space usage", "Handle edge cases"]
          },
          "academic": {
            "title": "Advanced DP Assessment",
            "description": "Written test on Floyd-Warshall and Knapsack analysis.",
            "guidelines": ["Prove Floyd-Warshall correctness", "Analyze pseudo-polynomial complexity", "Compare Knapsack variants", "Identify DP problem patterns"]
          },
          "communicator": {
            "title": "DP for Graphs and Optimization",
            "description": "10-minute presentation on Floyd-Warshall and Knapsack.",
            "guidelines": ["Animate Floyd-Warshall", "Explain Knapsack state definition", "Show optimization decision making", "Discuss real-world applications"]
          }
        }
      },
      {
        "week": 18,
        "topic": "Dynamic Programming, Part 4: Piano Fingering",
        "description": "Advanced DP application: optimal piano fingering as a complex optimization problem.",
        "mit_lecture": { "number": 18, "title": "Dynamic Programming, Part 4: Piano", "url": "https://www.youtube.com/watch?v=i9OAOk0CUQE" },
        "resources": [
          { "title": "MIT 6.006 Lecture 18: Dynamic Programming, Part 4", "url": "https://www.youtube.com/watch?v=i9OAOk0CUQE", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Complex DP Application",
            "description": "Implement a complex DP problem involving multiple constraints.",
            "guidelines": ["Model problem with appropriate state", "Define transition function", "Handle multi-dimensional DP", "Optimize for time and space"]
          },
          "academic": {
            "title": "DP Problem Modeling Assessment",
            "description": "Written test on modeling complex problems with DP.",
            "guidelines": ["Design state for novel problems", "Derive recurrence relations", "Prove solution optimality", "Analyze tradeoffs in state design"]
          },
          "communicator": {
            "title": "DP Beyond the Basics",
            "description": "10-minute presentation on advanced DP techniques.",
            "guidelines": ["Show complex state design", "Explain constraint handling", "Demonstrate optimization process", "Discuss DP problem-solving strategies"]
          }
        }
      },
      {
        "week": 19,
        "topic": "Complexity",
        "description": "Introduction to computational complexity: P, NP, NP-completeness, and reductions.",
        "mit_lecture": { "number": 19, "title": "Complexity", "url": "https://www.youtube.com/watch?v=JbafQJx1CIA" },
        "resources": [
          { "title": "MIT 6.006 Lecture 19: Complexity", "url": "https://www.youtube.com/watch?v=JbafQJx1CIA", "type": "Video" },
          { "title": "P vs NP Problem", "url": "https://www.geeksforgeeks.org/np-completeness-set-1/", "type": "Article" }
        ],
        "deliverables": {
          "builder": {
            "title": "NP-Complete Problem Exploration",
            "description": "Implement brute-force and approximation for an NP-complete problem.",
            "guidelines": ["Implement brute-force for small instances", "Verify solutions efficiently", "Implement a greedy approximation", "Compare solution quality and time"]
          },
          "academic": {
            "title": "Complexity Theory Assessment",
            "description": "Written test on P, NP, and NP-completeness.",
            "guidelines": ["Define P, NP, NP-hard, NP-complete", "Explain polynomial reductions", "Prove a problem is in NP", "Discuss implications of P=NP"]
          },
          "communicator": {
            "title": "P vs NP Explained",
            "description": "10-minute presentation on computational complexity.",
            "guidelines": ["Explain the million-dollar problem", "Give examples of P and NP problems", "Illustrate reductions", "Discuss practical implications"]
          }
        }
      },
      {
        "week": 20,
        "topic": "Course Review",
        "description": "Comprehensive review of all course topics: data structures, algorithms, and analysis techniques.",
        "mit_lecture": { "number": 20, "title": "Course Review", "url": "https://www.youtube.com/watch?v=2NMtS1ecb3o" },
        "resources": [
          { "title": "MIT 6.006 Lecture 20: Course Review", "url": "https://www.youtube.com/watch?v=2NMtS1ecb3o", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Data Structures & Algorithms Library",
            "description": "Build a comprehensive library containing all major data structures and algorithms from the course.",
            "guidelines": ["Implement arrays, linked lists, stacks, queues", "Implement hash tables, BST, AVL, heaps", "Implement graph algorithms (BFS, DFS, Dijkstra)", "Include comprehensive tests and documentation"]
          },
          "academic": {
            "title": "Comprehensive Final Assessment",
            "description": "Written exam covering all course topics.",
            "guidelines": ["Analyze complexity of algorithms", "Choose appropriate data structures", "Solve problems using DP", "Apply graph algorithms"]
          },
          "communicator": {
            "title": "Course Summary Presentation",
            "description": "20-minute presentation summarizing the entire course.",
            "guidelines": ["Overview all data structures", "Compare algorithm paradigms", "Create decision flowchart", "Reflect on key insights"]
          }
        }
      },
      {
        "week": 21,
        "topic": "Algorithms—Next Steps",
        "description": "Where to go from here: advanced topics, research directions, and practical applications.",
        "mit_lecture": { "number": 21, "title": "Algorithms—Next Steps", "url": "https://www.youtube.com/watch?v=4nXw-f6NJ9s" },
        "resources": [
          { "title": "MIT 6.006 Lecture 21: Algorithms—Next Steps", "url": "https://www.youtube.com/watch?v=4nXw-f6NJ9s", "type": "Video" }
        ],
        "deliverables": {
          "builder": {
            "title": "Capstone Project: Algorithm Visualizer",
            "description": "Build an interactive algorithm visualization tool showcasing multiple algorithms.",
            "guidelines": ["Visualize at least 5 algorithms", "Allow user interaction (input, speed control)", "Show step-by-step execution", "Compare algorithm performance"]
          },
          "academic": {
            "title": "Advanced Topics Research Paper",
            "description": "Write a research summary on an advanced algorithms topic.",
            "guidelines": ["Choose an advanced topic (approximation, randomized, etc.)", "Research current state of the art", "Summarize key techniques", "Discuss open problems"]
          },
          "communicator": {
            "title": "Teaching Algorithms Workshop",
            "description": "Design and deliver a 30-minute workshop teaching one algorithm topic.",
            "guidelines": ["Choose a topic from the course", "Create engaging materials", "Include hands-on exercises", "Assess participant understanding"]
          }
        }
      }
    ],
    "ellis_activities": {
      "builder": {
        "title": "Complete Algorithms Library",
        "description": "Implement a production-quality library of all data structures and algorithms covered in MIT 6.006."
      },
      "academic": {
        "title": "Algorithm Problem Marathon",
        "description": "Complete 50+ problems from LeetCode covering all topics from the course."
      },
      "communicator": {
        "title": "Algorithm Tutorial Series",
        "description": "Create a complete video series teaching all 21 lectures with visualizations and examples."
      }
    }
  },

  "Math 201: Discrete Mathematics for CS": {
    "prereqs": ["Precalculus"],
    "nice_to_have": ["AP Calculus AB", "AP Calculus BC"],
    "description": "The mathematical language of computer science. Essential for proving code correctness and analyzing speed. Covers proofs, graphs, counting, recurrences, asymptotics, and discrete probability. Anchored by MIT 6.042J/6.1200J.",
    "tier": 1,
    "mit_anchor": "6.042J / 6.1200J Mathematics for Computer Science",
    "ocw": {
      "course_code": "6.042J",
      "course_name": "Mathematics for Computer Science",
      "semester": "Fall 2010",
      "course_home": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
      "playlist": null
    },
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
    "ocw": {
      "course_code": "6.004",
      "course_name": "Computation Structures",
      "semester": "Spring 2017",
      "course_home": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      "playlist": "https://www.youtube.com/playlist?list=PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2"
    },
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
    "description": "The primary filter for Big Tech interviews and the theoretical peak of the undergraduate core. Focuses on solving hard problems efficiently through graph algorithms, dynamic programming, and amortized analysis. Anchored by MIT 6.046J.",
    "tier": 2,
    "mit_anchor": "6.046J Design and Analysis of Algorithms",
    "ocw": {
      "course_code": "6.046J",
      "course_name": "Design and Analysis of Algorithms",
      "semester": "Spring 2015",
      "course_home": "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/",
      "playlist": "https://www.youtube.com/playlist?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp"
    },
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
    "description": "Building the software that manages the hardware. Famous for massive C coding projects (building a kernel, file system, or shell). Covers processes, virtual memory, file systems, and concurrency. Anchored by MIT 6.S081 Operating System Engineering.",
    "tier": 2,
    "mit_anchor": "6.S081 Operating System Engineering",
    "ocw": {
      "course_code": "6.S081",
      "course_name": "Operating System Engineering",
      "semester": "Fall 2020",
      "course_home": "https://pdos.csail.mit.edu/6.S081/2020/schedule.html",
      "playlist": null
    },
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
    "ocw": {
      "course_code": "6.033",
      "course_name": "Computer System Engineering",
      "semester": "Spring 2018",
      "course_home": "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/",
      "playlist": null
    },
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
    "description": "Introduction to machine learning: regression, classification, neural networks, and backpropagation. Covers toned-down undergrad ML structure aligned with introductory MIT ML topics. Anchored by MIT 6.036 Introduction to Machine Learning.",
    "tier": 3,
    "mit_anchor": "6.036 Introduction to Machine Learning",
    "ocw": {
      "course_code": "6.036",
      "course_name": "Introduction to Machine Learning",
      "semester": "Fall 2020",
      "course_home": "https://introml.mit.edu/",
      "playlist": "https://www.youtube.com/playlist?list=PLxC_ffO4q_rW0bqQB80_vcQB09HOA3ClV"
    },
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
    "description": "The 'Hacker' course. Learn how systems break to understand how to defend them. Covers threat models, vulnerabilities, basic crypto use, and secure design. Anchored by MIT 6.858 Computer Systems Security.",
    "tier": 3,
    "mit_anchor": "6.858 Computer Systems Security",
    "ocw": {
      "course_code": "6.858",
      "course_name": "Computer Systems Security",
      "semester": "Spring 2022",
      "course_home": "https://css.csail.mit.edu/6.858/2022/schedule.html",
      "playlist": null
    },
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
