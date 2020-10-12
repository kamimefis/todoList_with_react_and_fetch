import React, { Component } from 'react';
import '../App.css';
import TodoList from './TodoList';

class TodoInput extends Component {
    constructor() {
        super();
        this.state = {
            items: [],   //almacenará los items agregados a la lista
            currentItem: { text: "", id: "" }
        }
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    //Método que maneja lo que se escribe en el input(recibe el mensaje escrito)
    handleInput = e => {
        this.setState({
            currentItem: { text: e.target.value, id: Date.now() }
        })
    }
    //Método para agregar el mensaje de input a la lista
    addItem = e => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.text !== "") {
            const items = [...this.state.items, newItem];
            this.setState({
                items: items,
                currentItem: {  //Para que al enviar el item(tarea) se vacíe el input
                    text: '',
                    id: ''
                }
            })
        }
    }
    //Método para eliminar un item utilizando filter method
    deleteItem = (id) => {
        console.log(this.state);
        const deletedItems = this.state.items.filter(item => item.id !== id);
        this.setState({
            items: deletedItems
        })
        console.log(deletedItems);
    }
   
    render() {
        return (
            <div className="container  mt-4">
                {/*title*/}
                <p className="todo-title text-center font-weight-light">todo list</p>
                
                <div className="list-group col-8 m-auto">
                    {/*Form---ADD an item to input field*/}
                    <form onSubmit={this.addItem}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Add a task"
                            value= {this.state.currentItem.text}
                            onChange={this.handleInput}
                        />
                        <button className="btn d-none" type="submit"></button>
                    </form>
                    {/*List of tasks and delete button*/}
                    <TodoList items={this.state.items} deleteItem={this.deleteItem} />

                    {/*Tasks counter*/}
                    <div className="item-counter list-group bg-white border pt-2 pl-3">
                        <p>{this.state.items.length} item left</p>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default TodoInput;