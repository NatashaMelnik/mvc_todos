const Task = [
    { id: 1, name: 'Task1 from List1' },
    { id: 2, name: 'Task2 from List1' },
    { id: 3, name: 'Task3 from List1' }
];

const List = {
    1: Task,
    2: [
        { id: 1, name: 'Task 1 from List2' },
        { id: 2, name: 'Task 2 from List2' },
        { id: 3, name: 'Task 3 from List2' }
    ],
    3: [
        { id: 1, name: 'Task 1 from List3' },
        { id: 2, name: 'Task 2 from List3' },
        { id: 3, name: 'Task 3 from List3' }
    ]
};

module.exports = List
