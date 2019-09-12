import React from 'react'
import List from '@material-ui/core/List'
import TodoListItem from '../todo-list-item'

const TodoList = ({todoData, onToggleDoneItem, onDeleteItem, onEditListItem}) => {
    const onToggleDone = (id) => () => {
        onToggleDoneItem(id)
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
                    onToggleDone={onToggleDone(id)}
                    onDelete={onDelete(id)}
                    onEditListItem={handleEditListItem(id)}
                    {...item}
                />
            })}
        </List>
    )
}

export default TodoList