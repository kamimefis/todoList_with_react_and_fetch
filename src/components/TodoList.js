import React, { Component } from 'react'
import '../App.css';

const TodoList = (props) => {

    const items = props.items;
    const listItems = items.map(item => {
        return <div className="list-group bg-white border" key={item.id}>
            <p>{item.text}
                <span>  
                    <button className="btn btn-outline-light" onClick={() =>props.deleteItem(item.id)}>X</button> 
                </span>
            </p>
        </div>
    })
    return (
        <div>{listItems}</div>
    );
}


export default TodoList;