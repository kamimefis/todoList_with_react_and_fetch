import React, { Component } from 'react';
import '../App.css';
import TodoList from './TodoList';

class TodoInput extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            currentItem: { label: "", done: "false" }
        }
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        // send HTTP request
        // save it to the state
        const additionalSetting = {
            headers: { "Content-Type": "application/json" },
            method: "GET",
        }
        fetch (
            "https://assets.breatheco.de/apis/fake/todos/user/camilin",
            additionalSetting)
            .then(response => response.json())
            .then(newResponse => {
                console.log(newResponse);
                // JSON a TEXTO   = JSON.stringify()
                // TEXTO A JSON   = JSON.parse()
                this.setState({ items: newResponse })
            })
            .catch((error) => console.log(error));

        console.log(this.state.items);
    };
    //PUT method:
    putMethod = (e) => {
        e.preventDefault();
        //console.log([...this.state.items, this.state.currentItem])
        const additionalSetting = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify([...this.state.items, this.state.currentItem])
        }
        fetch(
            "https://assets.breatheco.de/apis/fake/todos/user/camilin",
            additionalSetting)
            .then(response => response.json())
            .then(newResponse => {
                console.log(newResponse);
            })
            .catch((error) => console.log(error));
        this.setState({
            items: [...this.state.items, this.state.currentItem],
            currentItem: { label: "", done: "" } //clear the input field to add a new task
        })
    }
    //DELETE method:
    deleteMethod = (i) => {
        let array = this.state.items.filter((item, index) => i !== index);
        //console.log(array);
        const additionalSetting = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify([...array])
        }
        fetch(
            "https://assets.breatheco.de/apis/fake/todos/user/camilin",
            additionalSetting)
            .then(response => response.json())
            .then(newResponse => {
                console.log(newResponse);
            })
            .catch((error) => console.log(error));
        this.setState({ items: [...array] })
    }
    handleInput = e => {
        this.setState({
            currentItem: { label: e.target.value, done: true }
        })
    }
    addItem = e => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.label !== "") {
            const items = [...this.state.items, newItem];
            this.setState({
                items: items,
                currentItem: {  //clear the input field
                    label: '',
                    done: ''
                }
            })
        }
    }
    deleteItem = (id) => {
        console.log(this.state);
        const deletedItems = this.state.items.filter(item => item.id !== id);
        this.setState({
            items: deletedItems
        })
        //console.log(deletedItems);
    }
    deleteAllTasks = i => {
        let array = [this.state.items];
        const additionalSetting = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify([...array])
        }
        fetch(
            "https://assets.breatheco.de/apis/fake/todos/user/camilin",
            additionalSetting)
            .then(response => response.json())
            .then(newResponse => {
                console.log(newResponse);
            })
            .catch((error) => console.log(error));
        this.setState({ items: [] })
    }

    render() {
        return (
            <div className="container  mt-4">
                {/*title*/}
                <p className="todo-title text-center font-weight-light">todo list</p>

                <div className="list-group col-8 m-auto">
                    {/*Form---ADD an item to input field*/}
                    <form onSubmit={this.putMethod}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Add a task"
                            value={this.state.currentItem.label}
                            onChange={this.handleInput}
                        />
                    </form>

                    {/*List of tasks and delete button*/}
                    <TodoList items={this.state.items} deleteMethod={this.deleteMethod}
                    />

                    {/*Tasks counter*/}
                    <div className="item-counter list-group bg-white border pt-2 pl-3">
                        <p>{this.state.items.length} item left</p>
                    </div>

                    {/*Delete all Tasks in the list */}
                    <button
                        onClick={this.deleteAllTasks}
                        type="button"
                        className="btn btn-outline-danger btn-lg btn-block">
                        Delete all tasks
                    </button>
                </div>
            </div>
        );
    }
}

export default TodoInput;