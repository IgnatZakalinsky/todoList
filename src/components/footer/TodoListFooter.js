import React from 'react';
import '../../App.css';

class TodoListFooter extends React.Component {
    state = {
        hide: false
    };
    changeHide = () => {
        this.setState({hide: !this.state.hide});
    };

    render = () => {
        let ClassForAll = this.props.filterValue === 'All' ? 'filterActive' : '';
        let ClassForCompleted = this.props.filterValue === 'Completed' ? 'filterActive' : '';
        let ClassForActive = this.props.filterValue === 'Active' ? 'filterActive' : '';

        return (
            <div className="todoList-footer">
                {!this.state.hide && <div>
                    <button onClick={() => {this.props.onFilterChanged('All')}}
                            className={ClassForAll}>All
                    </button>
                    <button onClick={() => {this.props.onFilterChanged('Completed')}}
                            className={ClassForCompleted}>Completed
                    </button>
                    <button onClick={() => {this.props.onFilterChanged('Active')}}
                            className={ClassForActive}>Active
                    </button>
                    <span onClick={this.changeHide}>hide</span>
                </div>}
                {this.state.hide && <span onClick={this.changeHide}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;
