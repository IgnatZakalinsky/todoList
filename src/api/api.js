import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '90297751-3ddc-4305-acfa-a9dc74e7e3f8'}
});

const _getTasksQueue = [];
setInterval( () => {
    if (_getTasksQueue.length > 0) {
        let firstItem = _getTasksQueue.shift();
        //firstItem.resolve();
        instance.get(`todo-lists/${firstItem.todolistId}/tasks`)
            .then(res => {
                firstItem.resolve(res);
            });
    }
}, 2000);

export const todoListAPI = {
    createTodoList(title) {
        return instance.post("todo-lists", {title: title})
    },
    createTask(title, id) {
        return instance.post(`todo-lists/${id}/tasks`, {title: title})
    },
    getTodoLists() {
        return instance.get("todo-lists")
    },
    getTasks(todolistId) {
        return new Promise((resolve) => {
            let item = {
                resolve: resolve,
                todolistId: todolistId
            };
            _getTasksQueue.push(item);
        });
        // put to queue
        // return instance.get(`todo-lists/${todolistId}/tasks`);
    },
    updateTask(task) {
        return instance.put(`todo-lists/tasks`, task)
    }
};