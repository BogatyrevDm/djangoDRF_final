import React from "react";
import { Link } from 'react-router-dom'

const TodoItem = ({ todo, deleteToDo }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.active}
            </td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
}


const TodoList = ({ todos, deleteToDO }) => {
    return (
        <div>
            <table>
                <th>
                    Todo text
                </th>
                <th>
                    Project
                </th>
                <th>
                    User
                </th>
                <th>
                    Active
                </th>
                <th></th>
                {todos.map((todo) => <TodoItem todo={todo} deleteToDO={deleteToDO} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList
