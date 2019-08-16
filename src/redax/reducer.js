const ADD_TASK = 'ADD-TASK';
const SET_TASKS = 'SET-TASKS';
const ADD_TODO_LIST = 'ADD-TODO-LIST';
const SET_TODO_LISTS = 'SET-TODO-LISTS';

const initialState = {
    todoList_s: [
        //{id: 0, title: "CSS"},
        //{id: 1, title: "JS"}
    ],
    tasks: {}
};

/*const getNewId = (todoList_s) => {
    return todoList_s.reduce((acc, t) => {
        if (acc < t.id) return t.id; else return acc;
    }, 0) + 1;
};*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            let tasksId = {...state.tasks, [action.id]: [...state.tasks[action.id], action.task]};
            return {...state, tasks: tasksId};
        case SET_TASKS:
            let tasks = {...state.tasks, [action.id]: action.tasks};
            return {...state, tasks: tasks};
        case ADD_TODO_LIST:
            return {...state, todoList_s: [...state.todoList_s, action.todoList_s]};
        case SET_TODO_LISTS:
            return {...state, ...action.todoList_s};
        default:
            return state;
    }
};

export default reducer;
