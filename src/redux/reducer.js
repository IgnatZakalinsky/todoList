import {todoListAPI} from "../api/api";

const ADD_TASK = 'ADD-TASK';
const SET_TASKS = 'SET-TASKS';
const ADD_TODO_LIST = 'ADD-TODO-LIST';
const SET_TODO_LISTS = 'SET-TODO-LISTS';
const SET_FETCHING = 'SET-FETCHING';
const SET_FETCHING_FOR_TASKS = 'SET-FETCHING-FOR-TASKS';
const DELETE_TODO_LIST_FROM_STATE = 'DELETE-TODO-LIST-FROM-STATE';
const DELETE_TASK_FROM_STATE = 'DELETE-TASK-FROM-STATE';

const initialState = {
    todoList_s: [
        //{id: 0, title: "CSS"},
        //{id: 1, title: "JS"}
    ],
    tasks: {},
    isFetching: false,
    isFetchings: []
};

/*const getNewId = (todoList_s) => {
    return todoList_s.reduce((acc, t) => {
        if (acc < t.id) return t.id; else return acc;
    }, 0) + 1;
};*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            let tasksId = {...state.tasks, [action.id]: [action.task, ...state.tasks[action.id]]};
            return {...state, tasks: tasksId};
        case SET_TASKS:
            let tasks = {...state.tasks, [action.id]: action.tasks};
            return {...state, tasks: tasks};
        case DELETE_TODO_LIST_FROM_STATE:
            let todoList_s = state.todoList_s.filter(t => t.id != action.id);
            return {...state, todoList_s: todoList_s};
        case DELETE_TASK_FROM_STATE:
            let tasksId2 = {...state.tasks, [action.id]: [...state.tasks[action.id].filter(t => t.id != action.taskId)]};
            return {...state, tasks: tasksId2};
        case SET_FETCHING_FOR_TASKS:
            let isFetchings = {...state.isFetchings, [action.id]: action.isFetching};
            return {...state, isFetchings: isFetchings};
        case ADD_TODO_LIST:
            return {...state, todoList_s: [action.todoList_s, ...state.todoList_s]};
        case SET_TODO_LISTS:
            return {...state, ...action.todoList_s};
        case SET_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
};

export const addTodoList = (todoList_s) => {
    let action = {
        type: ADD_TODO_LIST,
        todoList_s: todoList_s
    };
    return action;
};
export const setTodoLists = (todoList_s) => {
    let action = {
        type: SET_TODO_LISTS,
        todoList_s: todoList_s
    };
    return action;
};
export const addTask = (task, id) => {
    let action = {
        type: ADD_TASK,
        id: id,
        task: task
    };
    return action;
};
export const setTasks = (tasks, id) => {
    let action = {
        type: SET_TASKS,
        id: id,
        tasks: tasks
    };
    return action;
};
export const setFetching = (isFetching) => {
    let action = {
        type: SET_FETCHING,
        isFetching: isFetching
    };
    return action;
};
export const setFetchingForTasks = (id, isFetching) => {
    let action = {
        type: SET_FETCHING_FOR_TASKS,
        id: id,
        isFetching: isFetching
    };
    return action;
};
export const deleteTodoListFromState = (id) => {
    let action = {
        type: DELETE_TODO_LIST_FROM_STATE,
        id: id,
    };
    return action;
};
export const deleteTaskFromState = (id, taskId) => {
    let action = {
        type: DELETE_TASK_FROM_STATE,
        id: id,
        taskId: taskId,
    };
    return action;
};

export const getTodoLists = () => (dispatch, getState) => {
    dispatch(setFetching(true));
    todoListAPI.getTodoLists().then(res => {
        dispatch(setFetching(false));
        dispatch(setTodoLists({todoList_s: res.data}));
    });
};
export const getTasks = (id) => (dispatch, getState) => {
    dispatch(setFetchingForTasks(id, true));
    todoListAPI.getTasks(id).then(res => {
        dispatch(setFetchingForTasks(id, false));
        dispatch(setTasks(res.data.items, id));
    });
};
export const createTodoList = (title) => (dispatch, getState) => {
    todoListAPI.createTodoList(title).then(res => {
        let todolist = res.data.data.item;
        dispatch(addTodoList(todolist));
    });
};
export const createTask = (newText, id) => (dispatch, getState) => {
    todoListAPI.createTask(newText, id).then(res => {
        dispatch(addTask(res.data.data.item, id));
    });
};
export const updateTask = (tasks, id, item, todoListId) => (dispatch, getState) => {
    const task = tasks.find(t => t.id === id);
    todoListAPI.updateTask({...task, ...item}).then(res => {
        let newTasks = tasks.map(t => {
            if (t.id !== id) return t;
            else return {...t, ...res.data.data.item}
        });
        /////////////////////////////////////////////////////////////////
        dispatch(setTasks(newTasks, todoListId));
    });
};
export const deleteTodoList = (id) => (dispatch, getState) => {
    dispatch(setFetchingForTasks(id, true));
    todoListAPI.deleteTodoLists(id).then(res => {
        if (res.status == 200) dispatch(deleteTodoListFromState(id));
        dispatch(setFetchingForTasks(id, false));
    });
};
export const deleteTask = (id, taskId) => (dispatch, getState) => {
    console.log(id, taskId)
    dispatch(setFetchingForTasks(id, true));
    todoListAPI.deleteTask(taskId).then(res => {
        if (res.status == 200) dispatch(deleteTaskFromState(id, taskId));
        dispatch(setFetchingForTasks(id, false));
    });
};


export default reducer;
