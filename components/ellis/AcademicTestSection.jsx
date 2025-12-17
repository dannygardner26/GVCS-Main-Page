import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { logCheatingFlagWithContext } from '../../utils/cheatingDetection';

const AcademicTestSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const [testAnswers, setTestAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [testHistory, setTestHistory] = useState(week.submissions?.academic?.history || []);
    const [testStartTime, setTestStartTime] = useState(null);
    const [codeLanguage, setCodeLanguage] = useState('java'); // 'java' or 'cpp'
    const currentSubmission = week.submissions?.academic;

    // Track test start time
    useEffect(() => {
        if (quizStarted && !testStartTime) {
            setTestStartTime(Date.now());
        }
    }, [quizStarted, testStartTime]);

    const generateTestQuestions = (week) => {
        const questions = {
            "Asymptotic Analysis: Big-O Notation": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of the following code snippet?\n\n```python\nfor i in range(n):\n    for j in range(i):\n        print(i, j)\n```", type: 'mcq', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(2ⁿ)'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the time complexity of accessing an element in an array by index?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0, points: 4 },
                    { id: 'q3', question: "Which of the following best describes Big-O notation?", type: 'mcq', options: ['Exact runtime', 'Upper bound on growth rate', 'Lower bound on growth rate', 'Average case complexity'], correct: 1, points: 4 },
                    { id: 'q4', question: "What is the time complexity of binary search on a sorted array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 2, points: 4 },
                    { id: 'q5', question: "What is the space complexity of merge sort?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 1, points: 4 },
                    { id: 'q6', question: "Which sorting algorithm has the best average time complexity?", type: 'mcq', options: ['Bubble sort', 'Insertion sort', 'Quick sort', 'Selection sort'], correct: 2, points: 4 },
                    { id: 'q7', question: "What is the time complexity of finding an element in an unsorted array?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2, points: 4 },
                    { id: 'q8', question: "Which data structure allows O(1) average time complexity for insert, delete, and search?", type: 'mcq', options: ['Array', 'Linked List', 'Hash Table', 'Binary Search Tree'], correct: 2, points: 4 },
                    { id: 'q9', question: "What is the time complexity of the following operation: finding the maximum element in an unsorted array?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 2, points: 4 },
                    { id: 'q10', question: "Which notation describes the tight bound (both upper and lower bound)?", type: 'mcq', options: ['Big-O', 'Big-Ω (Omega)', 'Big-Θ (Theta)', 'Little-o'], correct: 2, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "The time complexity of binary search is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "Big-O notation describes the ___ bound on the growth rate of an algorithm.", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "The time complexity of accessing an element in an array by index is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The space complexity of merge sort is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "The worst-case time complexity of quicksort is O(___).", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Define Big-O notation formally. Provide a mathematical definition and explain what it means in practical terms.", type: 'text', points: 7 },
                    { id: 'q17', question: "Prove that f(n) = 3n² + 2n + 1 is O(n²). Show your work step-by-step with mathematical reasoning.", type: 'text', points: 7 },
                    { id: 'q18', question: "Prove that f(n) = 5n log n + 3n is O(n log n). Show your work step-by-step with mathematical reasoning.", type: 'text', points: 7 },
                    { id: 'q19', question: "Compare two algorithms within the same complexity class (e.g., both O(n²)). Explain how you would choose between them and what factors matter beyond Big-O notation.", type: 'text', points: 7 },
                    { id: 'q20', question: "Explain the difference between best case, average case, and worst case time complexity. Provide an example algorithm and analyze all three cases.", type: 'text', points: 7 }
                ]
            },
            "Linear Structures: Dynamic Arrays and Linked Lists": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of inserting an element at the beginning of a dynamic array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the time complexity of inserting an element at the beginning of a linked list?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0, points: 4 },
                    { id: 'q3', question: "What is the amortized time complexity of appending to a dynamic array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 0, points: 4 },
                    { id: 'q4', question: "Which data structure uses contiguous memory allocation?", type: 'mcq', options: ['Linked List', 'Dynamic Array', 'Both', 'Neither'], correct: 1, points: 4 },
                    { id: 'q5', question: "What happens when a dynamic array needs to grow beyond its current capacity?", type: 'mcq', options: ['It fails', 'It automatically resizes', 'It overwrites existing elements', 'It uses linked list internally'], correct: 1, points: 4 },
                    { id: 'q6', question: "What is the time complexity of accessing an element by index in a linked list?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q7', question: "Which operation is more efficient in a dynamic array compared to a linked list?", type: 'mcq', options: ['Insertion at beginning', 'Random access by index', 'Deletion at beginning', 'All of the above'], correct: 1, points: 4 },
                    { id: 'q8', question: "What is the typical resizing strategy for dynamic arrays?", type: 'mcq', options: ['Add 1 element', 'Double the size', 'Triple the size', 'Add 10 elements'], correct: 1, points: 4 },
                    { id: 'q9', question: "Which data structure has better cache locality?", type: 'mcq', options: ['Linked List', 'Dynamic Array', 'Both are equal', 'Depends on implementation'], correct: 1, points: 4 },
                    { id: 'q10', question: "What is the space overhead per element in a linked list (assuming pointers)?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'Depends on data size'], correct: 0, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "Inserting an element at the beginning of a dynamic array has time complexity O(___).", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "The amortized time complexity of appending to a dynamic array is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "Accessing an element by index in a linked list has time complexity O(___).", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The typical resizing strategy for dynamic arrays is to ___ the capacity.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "Dynamic arrays have better ___ locality compared to linked lists.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Describe the resizing strategy for dynamic arrays. What happens when the array needs to grow? What is the amortized time complexity and why?", type: 'text', points: 7 },
                    { id: 'q17', question: "Compare the space complexity of arrays vs linked lists. Include overhead in your analysis. When would you choose a dynamic array over a linked list?", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain cache locality and why dynamic arrays have better cache performance than linked lists. Provide examples of when this matters.", type: 'text', points: 7 },
                    { id: 'q19', question: "Compare time complexity of all operations (insert, delete, access) for dynamic arrays vs linked lists. Create a comparison table and explain tradeoffs.", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe real-world scenarios where you would choose a dynamic array vs a linked list. Justify your choices with complexity analysis.", type: 'text', points: 7 }
                ]
            },
            "Stacks, Queues, and Deques": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of push() operation in a stack implemented using a linked list?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0, points: 4 },
                    { id: 'q2', question: "What is the time complexity of dequeue() operation in a queue implemented using an array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q3', question: "Which data structure is best for implementing a stack?", type: 'mcq', options: ['Array', 'Linked List', 'Both work equally well', 'Hash Table'], correct: 2, points: 4 },
                    { id: 'q4', question: "What is the principle behind a stack?", type: 'mcq', options: ['FIFO', 'LIFO', 'Priority-based', 'Random access'], correct: 1, points: 4 },
                    { id: 'q5', question: "What is the principle behind a queue?", type: 'mcq', options: ['FIFO', 'LIFO', 'Priority-based', 'Random access'], correct: 0, points: 4 },
                    { id: 'q6', question: "Which operation is used to check if a stack is empty?", type: 'mcq', options: ['isEmpty()', 'isFull()', 'size()', 'peek()'], correct: 0, points: 4 },
                    { id: 'q7', question: "What is a deque?", type: 'mcq', options: ['Double-ended queue', 'Double stack', 'Circular queue', 'Priority queue'], correct: 0, points: 4 },
                    { id: 'q8', question: "Which application uses a stack?", type: 'mcq', options: ['Task scheduling', 'Browser back button', 'Print queue', 'All of the above'], correct: 1, points: 4 },
                    { id: 'q9', question: "Which application uses a queue?", type: 'mcq', options: ['Function call stack', 'Undo operations', 'BFS traversal', 'Expression evaluation'], correct: 2, points: 4 },
                    { id: 'q10', question: "What is the time complexity of all operations in a well-implemented deque?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'Depends on operation'], correct: 0, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "Stack follows the ___ principle (Last In First Out).", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "Queue follows the ___ principle (First In First Out).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "The time complexity of push() in a stack is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "A deque allows insertion and deletion from ___ ends.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "BFS algorithm uses a ___ data structure.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain how a stack is used in function call management. Describe what happens when a function is called and when it returns.", type: 'text', points: 7 },
                    { id: 'q17', question: "Compare array-based vs linked list-based implementations of stacks and queues. Discuss time complexity and space overhead for each approach.", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain how stacks are used in parsing and expression evaluation. Provide an example of evaluating a postfix expression using a stack.", type: 'text', points: 7 },
                    { id: 'q19', question: "Describe how queues are used in BFS graph traversal. Explain why queues are necessary for level-order traversal.", type: 'text', points: 7 },
                    { id: 'q20', question: "Explain the advantages of a deque over separate stack and queue. Provide a real-world use case for a deque.", type: 'text', points: 7 }
                ]
            },
            "Hash-Based Structures: HashMaps and HashSets": {
                mcq: [
                    { id: 'q1', question: "What is the average time complexity of get() operation in a hash map with good hash function?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0, points: 4 },
                    { id: 'q2', question: "What is the worst-case time complexity of get() in a hash map when all keys hash to same bucket?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q3', question: "Which collision resolution strategy uses linked lists?", type: 'mcq', options: ['Linear probing', 'Quadratic probing', 'Chaining', 'Double hashing'], correct: 2, points: 4 },
                    { id: 'q4', question: "What is the typical load factor threshold for resizing a hash map?", type: 'mcq', options: ['0.5', '0.75', '1.0', '1.5'], correct: 1, points: 4 },
                    { id: 'q5', question: "What happens when load factor exceeds threshold?", type: 'mcq', options: ['Hash map fails', 'Automatic resizing and rehashing', 'Performance degrades but continues', 'All operations become O(n)'], correct: 1, points: 4 },
                    { id: 'q6', question: "Which property should a good hash function have?", type: 'mcq', options: ['Deterministic', 'Uniform distribution', 'Fast computation', 'All of the above'], correct: 3, points: 4 },
                    { id: 'q7', question: "What is the space complexity of a hash map with n elements?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q8', question: "What is the difference between HashMap and HashSet?", type: 'mcq', options: ['HashMap stores key-value pairs, HashSet stores only keys', 'No difference', 'HashMap is faster', 'HashSet uses less memory'], correct: 0, points: 4 },
                    { id: 'q9', question: "Which operation is NOT typically O(1) average in hash maps?", type: 'mcq', options: ['put()', 'get()', 'remove()', 'containsValue()'], correct: 3, points: 4 },
                    { id: 'q10', question: "What is the time complexity of rehashing all n elements in a hash map?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'], correct: 1, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "The average time complexity of hash map operations is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "Collision resolution using linked lists is called ___.", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "The load factor is calculated as size / ___.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "A good hash function should distribute keys ___ across buckets.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "Hash maps provide O(1) average but O(___) worst-case time complexity.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain how hash functions work. Describe the properties a good hash function should have and why uniform distribution is important.", type: 'text', points: 7 },
                    { id: 'q17', question: "Compare chaining vs open addressing (linear probing) for collision resolution. Discuss advantages and disadvantages of each approach.", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain how load factor affects hash map performance. Describe the resizing strategy and why it's necessary.", type: 'text', points: 7 },
                    { id: 'q19', question: "Analyze the time complexity of hash map operations. Explain why average case is O(1) but worst case can be O(n).", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe a real-world application of hash maps. Explain why hash maps are the optimal choice for that application.", type: 'text', points: 7 }
                ]
            },
            "Trees: Binary Search Trees and Traversals": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of search in a balanced BST?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the time complexity of search in an unbalanced BST (worst case)?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2, points: 4 },
                    { id: 'q3', question: "Which traversal visits nodes in sorted order for a BST?", type: 'mcq', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], correct: 1, points: 4 },
                    { id: 'q4', question: "What is the BST property?", type: 'mcq', options: ['Left child < node < right child', 'All left children < root', 'Complete binary tree', 'Balanced tree'], correct: 0, points: 4 },
                    { id: 'q5', question: "What is the time complexity of insert in a balanced BST?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q6', question: "Which case is most complex when deleting a node from BST?", type: 'mcq', options: ['Node with no children', 'Node with one child', 'Node with two children', 'All are equally complex'], correct: 2, points: 4 },
                    { id: 'q7', question: "What is the space complexity of recursive BST traversals?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1, points: 4 },
                    { id: 'q8', question: "Which traversal is used to copy a tree?", type: 'mcq', options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'], correct: 1, points: 4 },
                    { id: 'q9', question: "What is the minimum number of nodes in a BST of height h?", type: 'mcq', options: ['h', 'h+1', '2^h', '2^(h+1)-1'], correct: 1, points: 4 },
                    { id: 'q10', question: "What is the maximum number of nodes in a BST of height h?", type: 'mcq', options: ['h', 'h+1', '2^h', '2^(h+1)-1'], correct: 3, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "The time complexity of search in a balanced BST is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "___ traversal visits nodes in sorted order for a BST.", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "The BST property states: left child < node < ___.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The space complexity of recursive BST traversal is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "A BST with n nodes has minimum height of O(___).", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain the BST property and why it enables efficient search. Prove that search in a balanced BST is O(log n).", type: 'text', points: 7 },
                    { id: 'q17', question: "Describe all three cases when deleting a node from a BST. Explain the algorithm for each case with examples.", type: 'text', points: 7 },
                    { id: 'q18', question: "Compare the four types of tree traversals (in-order, pre-order, post-order, level-order). Explain when each is used and what output they produce.", type: 'text', points: 7 },
                    { id: 'q19', question: "Explain why an unbalanced BST degrades to O(n) performance. Describe scenarios that lead to unbalanced trees.", type: 'text', points: 7 },
                    { id: 'q20', question: "Compare BST with hash maps. Discuss when to use each data structure and their tradeoffs.", type: 'text', points: 7 }
                ]
            },
            "Self-Balancing Trees: AVL or Red-Black": {
                mcq: [
                    { id: 'q1', question: "What is the balance factor in an AVL tree?", type: 'mcq', options: ['Height difference between left and right subtrees', 'Number of nodes', 'Depth of tree', 'Size of tree'], correct: 0, points: 4 },
                    { id: 'q2', question: "What is the maximum allowed balance factor in an AVL tree?", type: 'mcq', options: ['0', '1', '2', '3'], correct: 1, points: 4 },
                    { id: 'q3', question: "How many rotation types are needed for AVL tree balancing?", type: 'mcq', options: ['2', '4', '6', '8'], correct: 1, points: 4 },
                    { id: 'q4', question: "What is the time complexity of insert in an AVL tree?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1, points: 4 },
                    { id: 'q5', question: "Which rotation is used when left-left case occurs?", type: 'mcq', options: ['Left rotation', 'Right rotation', 'Left-right rotation', 'Right-left rotation'], correct: 1, points: 4 },
                    { id: 'q6', question: "What guarantees O(log n) height in AVL trees?", type: 'mcq', options: ['Balance factor constraint', 'Complete tree property', 'Full tree property', 'Size constraint'], correct: 0, points: 4 },
                    { id: 'q7', question: "What is the time complexity of rotations in AVL trees?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 0, points: 4 },
                    { id: 'q8', question: "Which tree structure does Java TreeMap use?", type: 'mcq', options: ['AVL tree', 'Red-Black tree', 'BST', 'B-tree'], correct: 1, points: 4 },
                    { id: 'q9', question: "What is the main advantage of Red-Black trees over AVL trees?", type: 'mcq', options: ['Fewer rotations', 'Simpler implementation', 'Better for insertions', 'All of the above'], correct: 3, points: 4 },
                    { id: 'q10', question: "What is the maximum height of an AVL tree with n nodes?", type: 'mcq', options: ['log n', '1.44 * log(n+2)', 'n', '2n'], correct: 1, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "The balance factor in AVL trees must be between -1 and ___.", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "AVL trees guarantee O(___) height.", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "The four rotation types in AVL trees are: left, right, left-right, and ___.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The time complexity of rotations in AVL trees is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "Java TreeMap uses ___ trees for implementation.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain why self-balancing is needed in BSTs. Describe the problem with unbalanced trees and how it affects performance.", type: 'text', points: 7 },
                    { id: 'q17', question: "Describe all four rotation types in AVL trees (left, right, left-right, right-left). Explain when each rotation is applied with examples.", type: 'text', points: 7 },
                    { id: 'q18', question: "Prove that AVL trees guarantee O(log n) height. Explain the balance factor property and how it ensures logarithmic height.", type: 'text', points: 7 },
                    { id: 'q19', question: "Compare AVL trees vs Red-Black trees. Discuss their differences, advantages, and when to use each.", type: 'text', points: 7 },
                    { id: 'q20', question: "Walk through inserting a node into an AVL tree step-by-step. Show when rotations are needed and which rotations to apply.", type: 'text', points: 7 }
                ]
            },
            "Binary Heaps and Priority Queues": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of insert in a binary heap?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the time complexity of extractMin in a min-heap?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1, points: 4 },
                    { id: 'q3', question: "What is the time complexity of building a heap from an array?", type: 'mcq', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'], correct: 0, points: 4 },
                    { id: 'q4', question: "What is the heap property for a min-heap?", type: 'mcq', options: ['Parent < children', 'Parent > children', 'Left < right', 'Complete binary tree'], correct: 0, points: 4 },
                    { id: 'q5', question: "How is a heap represented in memory?", type: 'mcq', options: ['Linked nodes', 'Array', 'Hash table', 'Graph'], correct: 1, points: 4 },
                    { id: 'q6', question: "What is the index of the left child of node at index i in array representation?", type: 'mcq', options: ['2i', '2i+1', 'i/2', 'i+1'], correct: 1, points: 4 },
                    { id: 'q7', question: "What is the index of the parent of node at index i in array representation?", type: 'mcq', options: ['2i', '2i+1', '(i-1)/2', 'i/2'], correct: 2, points: 4 },
                    { id: 'q8', question: "Which algorithm uses a priority queue?", type: 'mcq', options: ['BFS', 'DFS', \"Dijkstra's\", 'Binary search'], correct: 2, points: 4 },
                    { id: 'q9', question: "What is heapify-up used for?", type: 'mcq', options: ['Insert operation', 'Extract operation', 'Build heap', 'Delete operation'], correct: 0, points: 4 },
                    { id: 'q10', question: "What is heapify-down used for?", type: 'mcq', options: ['Insert operation', 'Extract operation', 'Build heap', 'Both extract and build'], correct: 3, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "The time complexity of insert in a heap is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "The time complexity of building a heap from array is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "In array representation, parent of node at index i is at index ___.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The heap property for min-heap states: parent < ___.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "Dijkstra's algorithm uses a ___ queue.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain the heap property for both min-heap and max-heap. Describe how the property is maintained during insert and extract operations.", type: 'text', points: 7 },
                    { id: 'q17', question: "Describe the array representation of a heap. Explain the parent/child index formulas and why this representation is efficient.", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain why building a heap from an array is O(n) not O(n log n). Walk through the bottom-up heap construction algorithm.", type: 'text', points: 7 },
                    { id: 'q19', question: "Compare heaps vs BSTs for priority queue operations. Discuss when to use each and their tradeoffs.", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe how heaps are used in Dijkstra's algorithm. Explain why priority queues are necessary for finding shortest paths.", type: 'text', points: 7 }
                ]
            },
            "Graph Traversals: Breadth-First Search (BFS)": {
                mcq: [
                    { id: 'q1', question: "What data structure is used to implement BFS?", type: 'mcq', options: ['Stack', 'Queue', 'Heap', 'Hash table'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the time complexity of BFS on a graph with V vertices and E edges?", type: 'mcq', options: ['O(V)', 'O(E)', 'O(V+E)', 'O(V*E)'], correct: 2, points: 4 },
                    { id: 'q3', question: "What is the space complexity of BFS?", type: 'mcq', options: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'], correct: 1, points: 4 },
                    { id: 'q4', question: "Does BFS find the shortest path in unweighted graphs?", type: 'mcq', options: ['Yes, always', 'No, never', 'Only in trees', 'Only in directed graphs'], correct: 0, points: 4 },
                    { id: 'q5', question: "In what order does BFS visit vertices?", type: 'mcq', options: ['Depth-first', 'Level-order', 'Random', 'Sorted'], correct: 1, points: 4 },
                    { id: 'q6', question: "What is the first vertex visited in BFS?", type: 'mcq', options: ['Random', 'Start vertex', 'Smallest vertex', 'Largest vertex'], correct: 1, points: 4 },
                    { id: 'q7', question: "Can BFS be used for cycle detection?", type: 'mcq', options: ['Yes, in undirected graphs', 'No, never', 'Only in directed graphs', 'Only in trees'], correct: 0, points: 4 },
                    { id: 'q8', question: "What happens if BFS encounters a visited vertex?", type: 'mcq', options: ['Skip it', 'Process it again', 'Add to queue again', 'Throw error'], correct: 0, points: 4 },
                    { id: 'q9', question: "Which graph representation is more efficient for BFS?", type: 'mcq', options: ['Adjacency matrix', 'Adjacency list', 'Both are equal', 'Depends on graph'], correct: 1, points: 4 },
                    { id: 'q10', question: "What is the main application of BFS?", type: 'mcq', options: ['Cycle detection', 'Topological sort', 'Shortest path in unweighted graphs', 'All of the above'], correct: 2, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "BFS uses a ___ data structure for implementation.", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "The time complexity of BFS is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "BFS visits vertices in ___ order.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "BFS finds shortest path in ___ graphs.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "The space complexity of BFS is O(___).", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain how BFS algorithm works step-by-step. Describe the queue operations and visited tracking.", type: 'text', points: 7 },
                    { id: 'q17', question: "Prove that BFS finds the shortest path in unweighted graphs. Explain why level-order traversal guarantees shortest distance.", type: 'text', points: 7 },
                    { id: 'q18', question: "Compare BFS vs DFS. Discuss when to use each traversal and their different applications.", type: 'text', points: 7 },
                    { id: 'q19', question: "Analyze the time and space complexity of BFS. Explain why it's O(V+E) time and O(V) space.", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe real-world applications of BFS. Provide specific examples like social networks, web crawling, or shortest path problems.", type: 'text', points: 7 }
                ]
            },
            "Graph Traversals: Depth-First Search (DFS)": {
                mcq: [
                    { id: 'q1', question: "What data structure is used to implement iterative DFS?", type: 'mcq', options: ['Queue', 'Stack', 'Heap', 'Hash table'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the time complexity of DFS on a graph with V vertices and E edges?", type: 'mcq', options: ['O(V)', 'O(E)', 'O(V+E)', 'O(V*E)'], correct: 2, points: 4 },
                    { id: 'q3', question: "Can DFS be implemented recursively?", type: 'mcq', options: ['Yes', 'No', 'Only for trees', 'Only for directed graphs'], correct: 0, points: 4 },
                    { id: 'q4', question: "What is DFS used for in directed graphs?", type: 'mcq', options: ['Shortest path', 'Topological sort', 'Minimum spanning tree', 'All of the above'], correct: 1, points: 4 },
                    { id: 'q5', question: "How does DFS detect cycles in undirected graphs?", type: 'mcq', options: ['Check for back edges', 'Check for forward edges', 'Count vertices', 'Check degree'], correct: 0, points: 4 },
                    { id: 'q6', question: "What is the space complexity of recursive DFS?", type: 'mcq', options: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'], correct: 1, points: 4 },
                    { id: 'q7', question: "In what order does DFS visit vertices?", type: 'mcq', options: ['Level-order', 'Depth-first', 'Breadth-first', 'Sorted'], correct: 1, points: 4 },
                    { id: 'q8', question: "What is a back edge in DFS?", type: 'mcq', options: ['Edge to unvisited vertex', 'Edge to visited ancestor', 'Edge to parent', 'Edge to sibling'], correct: 1, points: 4 },
                    { id: 'q9', question: "Can DFS find all paths between two vertices?", type: 'mcq', options: ['Yes', 'No', 'Only shortest path', 'Only in trees'], correct: 0, points: 4 },
                    { id: 'q10', question: "What is the main difference between BFS and DFS?", type: 'mcq', options: ['Data structure used', 'Visit order', 'Applications', 'All of the above'], correct: 3, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "Iterative DFS uses a ___ data structure.", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "The time complexity of DFS is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "DFS can detect cycles by finding ___ edges.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "Topological sort uses ___ traversal.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "The space complexity of recursive DFS is O(___).", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain how DFS algorithm works both recursively and iteratively. Compare the two implementations.", type: 'text', points: 7 },
                    { id: 'q17', question: "Describe how DFS is used for cycle detection. Explain back edges and how they indicate cycles in both directed and undirected graphs.", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain how topological sort works using DFS. Describe the algorithm and why finish times are important.", type: 'text', points: 7 },
                    { id: 'q19', question: "Compare recursive vs iterative DFS. Discuss their space complexity differences and when to use each.", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe applications of DFS including path finding, cycle detection, topological sort, and connected components.", type: 'text', points: 7 }
                ]
            },
            "Shortest Paths: Weighted Graphs and Introduction": {
                mcq: [
                    { id: 'q1', question: "Can BFS find shortest path in weighted graphs?", type: 'mcq', options: ['Yes, always', 'No, never', 'Only with positive weights', 'Only with negative weights'], correct: 1, points: 4 },
                    { id: 'q2', question: "What is the path cost in a weighted graph?", type: 'mcq', options: ['Number of edges', 'Sum of edge weights', 'Average of weights', 'Product of weights'], correct: 1, points: 4 },
                    { id: 'q3', question: "What algorithm is used for shortest paths in weighted graphs with non-negative weights?", type: 'mcq', options: ['BFS', 'DFS', \"Dijkstra's\", 'Bellman-Ford'], correct: 2, points: 4 },
                    { id: 'q4', question: "Why doesn't BFS work for weighted graphs?", type: 'mcq', options: ['It's too slow', 'It doesn't consider edge weights', 'It only works for trees', 'It requires negative weights'], correct: 1, points: 4 },
                    { id: 'q5', question: "What is the shortest path problem?", type: 'mcq', options: ['Find any path', 'Find path with minimum edges', 'Find path with minimum total weight', 'Find longest path'], correct: 2, points: 4 },
                    { id: 'q6', question: "Can shortest path have cycles?", type: 'mcq', options: ['Yes, always', 'No, never', 'Only with negative weights', 'Only in directed graphs'], correct: 1, points: 4 },
                    { id: 'q7', question: "What data structure is needed for shortest path algorithms?", type: 'mcq', options: ['Stack', 'Queue', 'Priority queue', 'Hash table'], correct: 2, points: 4 },
                    { id: 'q8', question: "What happens if a graph has negative weight cycles?", type: 'mcq', options: ['Shortest path doesn't exist', 'Use Dijkstra', 'Use BFS', 'Use DFS'], correct: 0, points: 4 },
                    { id: 'q9', question: "What is relaxation in shortest path algorithms?", type: 'mcq', options: ['Updating distance estimates', 'Removing edges', 'Adding vertices', 'Sorting edges'], correct: 0, points: 4 },
                    { id: 'q10', question: "Which algorithm handles negative weights?", type: 'mcq', options: ['Dijkstra', 'BFS', 'Bellman-Ford', 'DFS'], correct: 2, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "The path cost in weighted graphs is the ___ of edge weights.", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "BFS does NOT work for weighted graphs because it doesn't consider ___.", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "Shortest path algorithms use ___ to update distance estimates.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "Shortest paths cannot contain ___.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "For graphs with negative weights, use ___ algorithm.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain why BFS doesn't work for weighted graphs. Provide a counterexample showing where BFS would find the wrong path.", type: 'text', points: 7 },
                    { id: 'q17', question: "Describe the shortest path problem. Explain path cost calculation and what makes a path optimal.", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain the concept of relaxation in shortest path algorithms. Describe how distance estimates are updated.", type: 'text', points: 7 },
                    { id: 'q19', question: "Compare shortest path algorithms for different graph types (unweighted, weighted with non-negative, weighted with negative). Explain which algorithm to use for each.", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe real-world applications of shortest path problems. Provide examples like GPS navigation, network routing, or game pathfinding.", type: 'text', points: 7 }
                ]
            },
            "Shortest Paths: Dijkstra's Algorithm": {
                mcq: [
                    { id: 'q1', question: "What data structure does Dijkstra's algorithm use?", type: 'mcq', options: ['Stack', 'Queue', 'Priority queue', 'Hash table'], correct: 2, points: 4 },
                    { id: 'q2', question: "What is the time complexity of Dijkstra's with binary heap?", type: 'mcq', options: ['O(V)', 'O(V log V)', 'O((V+E) log V)', 'O(V²)'], correct: 2, points: 4 },
                    { id: 'q3', question: "Does Dijkstra's work with negative edge weights?", type: 'mcq', options: ['Yes', 'No', 'Only sometimes', 'Only in directed graphs'], correct: 1, points: 4 },
                    { id: 'q4', question: "What is the greedy choice in Dijkstra's algorithm?", type: 'mcq', options: ['Smallest unvisited vertex', 'Vertex with minimum distance', 'Random vertex', 'Largest vertex'], correct: 1, points: 4 },
                    { id: 'q5', question: "What does relaxation do in Dijkstra's?", type: 'mcq', options: ['Updates distance estimates', 'Removes vertices', 'Adds edges', 'Sorts vertices'], correct: 0, points: 4 },
                    { id: 'q6', question: "How many times is each vertex processed in Dijkstra's?", type: 'mcq', options: ['Once', 'Twice', 'Multiple times', 'Depends on graph'], correct: 0, points: 4 },
                    { id: 'q7', question: "What is the space complexity of Dijkstra's?", type: 'mcq', options: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'], correct: 1, points: 4 },
                    { id: 'q8', question: "Can Dijkstra's find shortest path to all vertices?", type: 'mcq', options: ['Yes, from single source', 'No, only to one target', 'Only in trees', 'Only in DAGs'], correct: 0, points: 4 },
                    { id: 'q9', question: "What happens if graph is disconnected in Dijkstra's?", type: 'mcq', options: ['Algorithm fails', 'Finds paths to reachable vertices only', 'Returns error', 'Uses DFS first'], correct: 1, points: 4 },
                    { id: 'q10', question: "Why is Dijkstra's a greedy algorithm?", type: 'mcq', options: ['Makes locally optimal choices', 'Uses recursion', 'Backtracks', 'Uses dynamic programming'], correct: 0, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "Dijkstra's algorithm uses a ___ queue.", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "The time complexity of Dijkstra's is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "Dijkstra's does NOT work with ___ edge weights.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The greedy choice in Dijkstra's selects vertex with minimum ___.", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "Dijkstra's finds shortest paths from a single ___.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain Dijkstra's algorithm step-by-step. Describe how the priority queue is used and how relaxation updates distances.", type: 'text', points: 7 },
                    { id: 'q17', question: "Prove why Dijkstra's algorithm is correct. Explain the greedy choice property and why it guarantees shortest paths.", type: 'text', points: 7 },
                    { id: 'q18', question: "Explain why Dijkstra's doesn't work with negative weights. Provide a counterexample showing where it fails.", type: 'text', points: 7 },
                    { id: 'q19', question: "Analyze the time complexity of Dijkstra's algorithm. Explain O((V+E) log V) with binary heap and compare with other priority queue implementations.", type: 'text', points: 7 },
                    { id: 'q20', question: "Describe how to reconstruct the shortest path in Dijkstra's algorithm. Explain the parent/previous array and path reconstruction process.", type: 'text', points: 7 }
                ]
            },
            "Dynamic Programming Fundamentals": {
                mcq: [
                    { id: 'q1', question: "What are the two key properties of problems solvable by DP?", type: 'mcq', options: ['Optimal substructure and overlapping subproblems', 'Greedy choice and optimal substructure', 'Divide and conquer and memoization', 'Recursion and iteration'], correct: 0, points: 4 },
                    { id: 'q2', question: "What is memoization?", type: 'mcq', options: ['Storing results of subproblems', 'Forgetting previous results', 'Sorting subproblems', 'Combining subproblems'], correct: 0, points: 4 },
                    { id: 'q3', question: "What is the time complexity of Fibonacci with memoization?", type: 'mcq', options: ['O(2^n)', 'O(n)', 'O(n log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q4', question: "What is the time complexity of naive recursive Fibonacci?", type: 'mcq', options: ['O(n)', 'O(2^n)', 'O(n log n)', 'O(n²)'], correct: 1, points: 4 },
                    { id: 'q5', question: "What is tabulation in DP?", type: 'mcq', options: ['Top-down approach', 'Bottom-up approach', 'Recursive approach', 'Iterative approach'], correct: 1, points: 4 },
                    { id: 'q6', question: "What is optimal substructure?", type: 'mcq', options: ['Optimal solution contains optimal subproblem solutions', 'All subproblems are independent', 'Problems can be divided', 'Solutions can be combined'], correct: 0, points: 4 },
                    { id: 'q7', question: "What is the time complexity of LCS (Longest Common Subsequence) with DP?", type: 'mcq', options: ['O(m+n)', 'O(m*n)', 'O(2^(m+n))', 'O(m*n*log(m*n))'], correct: 1, points: 4 },
                    { id: 'q8', question: "What is the space complexity of LCS with DP table?", type: 'mcq', options: ['O(1)', 'O(m+n)', 'O(m*n)', 'O(2^(m+n))'], correct: 2, points: 4 },
                    { id: 'q9', question: "When should you use DP?", type: 'mcq', options: ['Always', 'When problems have optimal substructure and overlapping subproblems', 'Only for optimization problems', 'Only for counting problems'], correct: 1, points: 4 },
                    { id: 'q10', question: "What is the difference between memoization and tabulation?", type: 'mcq', options: ['Memoization is top-down, tabulation is bottom-up', 'No difference', 'Memoization is faster', 'Tabulation uses less space'], correct: 0, points: 4 }
                ],
                fillblank: [
                    { id: 'q11', question: "DP problems must have optimal substructure and ___ subproblems.", type: 'fillblank', points: 5 },
                    { id: 'q12', question: "The time complexity of Fibonacci with memoization is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q13', question: "Tabulation is a ___ approach to DP.", type: 'fillblank', points: 5 },
                    { id: 'q14', question: "The time complexity of LCS with DP is O(___).", type: 'fillblank', points: 5 },
                    { id: 'q15', question: "Memoization stores results of ___ to avoid recomputation.", type: 'fillblank', points: 5 }
                ],
                saq: [
                    { id: 'q16', question: "Explain the two key properties of dynamic programming: optimal substructure and overlapping subproblems. Provide examples of each.", type: 'text', points: 7 },
                    { id: 'q17', question: "Compare memoization vs tabulation approaches to DP. Discuss when to use each and their tradeoffs.", type: 'text', points: 7 },
                    { id: 'q18', question: "Solve the Longest Common Subsequence problem using DP. Explain the recurrence relation and how to build the DP table.", type: 'text', points: 7 },
                    { id: 'q19', question: "Explain how to recognize when a problem can be solved with DP. Describe the problem-solving framework and key indicators.", type: 'text', points: 7 },
                    { id: 'q20', question: "Analyze the time and space complexity of DP solutions. Compare recursive vs memoized vs tabulated approaches for the same problem.", type: 'text', points: 7 }
                ]
            }
        };

        const topicQuestions = questions[week.topic];
        if (topicQuestions) {
            return [...topicQuestions.mcq, ...(topicQuestions.fillblank || []), ...topicQuestions.saq];
        }

        return [
            { id: 'q1', question: `Explain the key concepts covered in "${week.topic}". Provide examples.`, type: 'text', points: 25 },
            { id: 'q2', question: `Analyze the time and space complexity of the main algorithms/data structures in "${week.topic}".`, type: 'text', points: 25 }
        ];
    };

    const questions = generateTestQuestions(week);
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const mcqQuestions = questions.filter(q => q.type === 'mcq');
    const fillBlankQuestions = questions.filter(q => q.type === 'fillblank');
    const saqQuestions = questions.filter(q => q.type === 'text');

    // Calculate score from answers
    const calculateScore = (answers, questions) => {
        let score = 0;
        questions.forEach(q => {
            if (q.type === 'mcq') {
                if (answers[q.id] === q.correct) {
                    score += q.points;
                }
            } else if (q.type === 'fillblank') {
                // Simple keyword matching for fill-in-the-blank
                const answer = (answers[q.id] || '').toLowerCase().trim();
                const correctAnswers = q.correctAnswers || [q.correctAnswer?.toLowerCase().trim()].filter(Boolean);
                if (correctAnswers.some(correct => answer.includes(correct) || correct.includes(answer))) {
                    score += q.points;
                }
            } else {
                // SAQ - give partial credit (will need manual grading, but auto-give 50% for now)
                if (answers[q.id] && answers[q.id].length > 20) {
                    score += Math.floor(q.points * 0.5);
                }
            }
        });
        return score;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const questions = generateTestQuestions(week);
        const score = calculateScore(testAnswers, questions);
        const percentage = Math.round((score / totalPoints) * 100);
        const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D';

        const submission = {
            answers: testAnswers,
            submittedDate: new Date().toISOString(),
            score: score,
            totalPoints: totalPoints,
            percentage: percentage,
            grade: grade
        };

        // Save to test_attempts table
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase
                    .from('test_attempts')
                    .insert({
                        user_id: user.id,
                        course_id: course.courseId || course.course_id,
                        week: week.week,
                        answers: testAnswers,
                        score: score,
                        total_points: totalPoints,
                        percentage: percentage
                    });
            }
        } catch (error) {
            console.error('Error saving test attempt:', error);
        }

        // Track time spent (if available)
        if (testStartTime) {
            const timeSpent = Date.now() - testStartTime;
            // Log suspicious timing if too fast
            if (timeSpent < 60000) { // Less than 1 minute for entire test
                logCheatingFlagWithContext(
                    course.courseId || course.course_id,
                    week.week,
                    'academic',
                    'suspicious_timing',
                    { time_spent_ms: timeSpent, total_questions: questions.length },
                    'high'
                );
            }
        }

        const updated = { ...course };
        if (!updated.weeks[weekIndex].submissions) {
            updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null };
        }

        // Keep only the highest score in submissions.academic
        const currentBest = updated.weeks[weekIndex].submissions.academic;
        const newHistory = [...testHistory, submission];
        
        if (!currentBest || score > (currentBest.score || 0)) {
            updated.weeks[weekIndex].submissions.academic = {
                ...submission,
                history: newHistory
            };
        } else {
            // Update history but keep best score
            updated.weeks[weekIndex].submissions.academic = {
                ...currentBest,
                history: newHistory
            };
        }

        setTestHistory(newHistory);
        onUpdateCourse(updated);
        setIsSubmitting(false);
        setQuizStarted(false);
        setTestAnswers({});
        setTestStartTime(null);
        alert(`Test submitted! Score: ${score}/${totalPoints} (${grade}). Note: Only your highest score counts, but all attempts are saved for review.`);
    };

    if (currentSubmission && !quizStarted && !showHistory) {
        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Latest Test Completed</h3>
                        <span className="text-lg font-bold text-green-700">
                            Score: {currentSubmission.score}/{currentSubmission.totalPoints} ({currentSubmission.grade})
                        </span>
                    </div>
                    <p className="text-sm text-green-600">
                        Submitted {new Date(currentSubmission.submittedDate).toISOString().split('T')[0]}
                    </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Current Best Score:</strong> {currentSubmission.score}/{currentSubmission.totalPoints} ({currentSubmission.grade})
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                        You can retake this test to improve your score. Only your highest score counts.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => setShowHistory(true)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">
                        View History ({testHistory.length} attempts)
                    </button>
                    <button onClick={() => { setQuizStarted(true); setTestAnswers({}); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                        Retake Test
                    </button>
                </div>
            </div>
        );
    }

    if (showHistory && !quizStarted) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Test History</h3>
                    <button onClick={() => setShowHistory(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">Back</button>
                </div>

                <div className="space-y-4">
                    {testHistory.map((attempt, attemptIdx) => (
                        <div key={attemptIdx} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-bold text-gray-800">Attempt #{testHistory.length - attemptIdx}</h4>
                                    <p className="text-sm text-gray-600">{new Date(attempt.submittedDate).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-gray-800">{attempt.score}/{attempt.totalPoints} ({attempt.grade})</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={() => { setQuizStarted(true); setShowHistory(false); setTestAnswers({}); }} className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                    Start New Attempt
                </button>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.academic?.title || 'Academic Assessment'}</h3>
                    <p className="text-sm text-gray-600 mb-4">{week.deliverables?.academic?.description || 'Complete this assessment to demonstrate your understanding.'}</p>

                    {week.deliverables?.academic?.guidelines && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-purple-900 mb-3">Assessment Guidelines:</h4>
                            <div className="space-y-3">
                                {week.deliverables.academic.guidelines.map((g, i) => {
                                    // Check if guideline has a colon (format: "Part X - Description: Details")
                                    const parts = g.split(':');
                                    if (parts.length > 1) {
                                        return (
                                            <div key={i} className="text-sm text-purple-800">
                                                <span className="font-semibold">{parts[0]}:</span>
                                                <span className="ml-1">{parts.slice(1).join(':')}</span>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={i} className="text-sm text-purple-800">{g}</div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Total Points:</strong> {totalPoints} | <strong>Time Limit:</strong> 90 minutes | <strong>Attempts:</strong> Unlimited
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Format:</strong> {mcqQuestions.length} MCQ ({mcqQuestions.reduce((sum, q) => sum + q.points, 0)} points) | {fillBlankQuestions.length} Fill-in-Blank ({fillBlankQuestions.reduce((sum, q) => sum + q.points, 0)} points) | {saqQuestions.length} SAQ ({saqQuestions.reduce((sum, q) => sum + q.points, 0)} points)
                    </p>
                </div>

                <button onClick={() => setQuizStarted(true)} className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">Take Quiz</button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.academic?.title || 'Academic Assessment'}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> You can take this test multiple times. Only your <strong>highest score</strong> will count toward your grade, but all attempts are saved for review.
                    </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600"><strong>Total Points:</strong> {totalPoints}</p>
                </div>

                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-gray-800">Question {idx + 1}</h4>
                            <span className="text-sm text-gray-500">{q.points} points</span>
                        </div>
                        <div className="mb-3">
                            {q.codeSnippet && (
                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-gray-600">Code Snippet:</span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setCodeLanguage('java')}
                                                className={`px-3 py-1 text-xs rounded transition-colors ${codeLanguage === 'java' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                            >
                                                Java
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCodeLanguage('cpp')}
                                                className={`px-3 py-1 text-xs rounded transition-colors ${codeLanguage === 'cpp' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                            >
                                                C++
                                            </button>
                                        </div>
                                    </div>
                                    <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-300 overflow-x-auto font-mono">
                                        {q.codeSnippet[codeLanguage] || q.codeSnippet.java || q.codeSnippet}
                                    </pre>
                                </div>
                            )}
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">{q.question}</pre>
                        </div>
                        {q.type === 'mcq' ? (
                            <div className="space-y-2">
                                {q.options.map((option, optIdx) => (
                                    <label key={optIdx} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                        <input type="radio" name={q.id} value={optIdx} checked={testAnswers[q.id] === optIdx} onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: parseInt(e.target.value) })} className="w-4 h-4" required />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        ) : q.type === 'fillblank' ? (
                            <input type="text" value={testAnswers[q.id] || ''} onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Your answer..." required />
                        ) : (
                            <textarea value={testAnswers[q.id] || ''} onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg" rows="6" placeholder="Type your answer here..." required />
                        )}
                    </div>
                ))}

                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
            </form>
        </div>
    );
};

export default AcademicTestSection;
