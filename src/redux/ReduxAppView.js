import React from 'react';
import AddNewItemForm from "../components/common/AddNewItemForm";
import s from "./ReduxAppView.module.css"

const ReduxAppView = (props) => {
    return <div className={s.main}>
        <AddNewItemForm AddItem={props.addTodoList}/>
        <div className={s.todoLists}>
            {props.todoList_s}
        </div>
    </div>
};

export default ReduxAppView;
