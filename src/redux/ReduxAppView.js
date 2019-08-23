import React from 'react';
import AddNewItemForm from "../components/common/AddNewItemForm";

const ReduxAppView = (props) => {
    return <div>
        <AddNewItemForm delete={props.delete} AddItem={props.addTodoList}/>
        {props.todoList_s}
    </div>
};

export default ReduxAppView;
