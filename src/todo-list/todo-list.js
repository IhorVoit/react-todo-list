import React from 'react'
import List from '@material-ui/core/List'
import TodoListItem from '../todo-list-item'

const TodoList = ({todoData, toggleComplete, onDeleteItem, onEditListItem}) => {
    const onToggleComplete = (id) => () => {
        toggleComplete(id)
    }
    const onDelete = (id) => () => {
        onDeleteItem(id)
    }
    const handleEditListItem = (id) => (e) => {
        onEditListItem(id, e.target.value)
    }
    return (
        <List>
            {todoData.map(({id, ...item}) => {
                return <TodoListItem
                    key={id}
                    id={id}
                    toggleComplete={onToggleComplete(id)}
                    onDelete={onDelete(id)}
                    onEditListItem={handleEditListItem(id)}
                    {...item}
                />
            })}
        </List>
    )
}

export default TodoList