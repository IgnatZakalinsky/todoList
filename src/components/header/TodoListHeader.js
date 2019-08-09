import React from 'react';
import '../../App.css';
import AddNewItemForm from "../common/AddNewItemForm";

class TodoListHeader extends React.Component {

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <AddNewItemForm delete={this.props.delete}
                                AddItem={this.props.AddTask}/>
            </div>
        );
    }
}

export default TodoListHeader;

