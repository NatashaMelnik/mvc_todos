const List = require('../models/model');

const output = {
    1: [
        { id: 1, name: 'Task1 from List1' },
        { id: 2, name: 'Task2 from List1' },
        { id: 3, name: 'Task3 from List1' }
    ],
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

const output2 = [
    { id: 1, name: 'Task1 from List1' },
    { id: 2, name: 'Task2 from List1' },
    { id: 3, name: 'Task3 from List1' },
    { id: 4, name: 'added Task' }
];

const output3 = [
    { id: 1, name: 'Task 1 from List2' },
    { id: 2, name: 'Task 2 from List2', done: true },
    { id: 3, name: 'Task 3 from List2' }
];

const output4 = [
    { id: 1, name: 'Task 1 from List3' },
    { id: 2, name: 'Task 2 from List3' },
    { id: 3, name: 'rewrite!!!!' }
];

const output5 = [
    { id: 1, name: 'Task 1 from List3' },
    { id: 2, name: 'Task 2 from List3' }
]; 

it('show correct array of tasks', () => {
    expect(List.displayAll(1)).toStrictEqual(output["1"]);
});

it('show correct task', () => {
    expect(List.displaySingle(1, 1)).toStrictEqual(output["1"][0]);
});

it('add one task', () => {
    expect(List.addTask(1, { "name": "added Task" })).toStrictEqual(output2);
});

it('change task"s done status', () => {
    expect(List.updateTask(2, 2, { "done": true })).toStrictEqual(output3);
});

it('change task"s name', () => {
    expect(List.rewriteTask(3, 3, { "name": "rewrite!!!!" })).toStrictEqual(output4);
});

it('delete task', () => {
    expect(List.deleteTask(3, 3)).toStrictEqual(output5);
});