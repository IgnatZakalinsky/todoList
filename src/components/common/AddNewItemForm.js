import React from 'react';
import '../../App.css';
import s from './../header/TodoListHeader.module.css'

class AddNewItemForm extends React.Component {
    state = {
        error: false,
        title: ''
    };

    enter = (e) => {
        if (e.key === 'Enter') this.onAddItemClick();
    };

    onAddItemClick = () => {
        let newText = this.state.title;
        if (newText === '') this.setState({error: true});
        else {
            this.props.AddItem(newText);
            this.setState({title: ''});
        }
    };

    inputChange = (e) => {
        let newText = e.currentTarget.value;
        this.setState({
            error: false,
            title: newText
        })

    };

    render = () => {
        return (
            <div className="todoList-newTaskForm">
                <input type="text" value={this.state.title}
                       className={this.state.error ? s.error : undefined}
                       onKeyPress={this.enter}
                       onChange={this.inputChange}
                       placeholder="New item name"/>
                <button onClick={this.onAddItemClick}>Add</button>
                <button onClick={this.props.delete}>delete endItem</button>
            </div>
        );
    }
}

export default AddNewItemForm;

