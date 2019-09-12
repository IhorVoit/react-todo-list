import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckBox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'


const TodoListItem = ({ complete, id, title, toggleComplete, onDelete, onEditListItem }) => {
    const [editable, setEditable] = useState(false)
    const toggleEdit = () => {
        setEditable(editable => !editable)
    }
    return (
        <ListItem key={id}>
            <ListItemIcon>
                <CheckBox
                    checked={complete}
                    onChange={toggleComplete}
                />
            </ListItemIcon>
            {editable ? <TextField
                fullWidth
                value={title}
                onChange={onEditListItem}
            /> : <ListItemText
                    primary={<Link to={`/todoitem/${id}`} style={{textDecoration: 'none', color: 'inherit'}}>{title}</Link>}
                    style={{ textDecoration: complete ? 'line-through' : null }}
                />}
            <IconButton
                onClick={toggleEdit}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                onClick={onDelete}
            >
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}

export default TodoListItem;