import React, {useState} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckBox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'


const TodoListItem = ({ done, id, label, onToggleDone, onDelete, toggleEdit, onEditListItem }) => {
    const [editable, setEditable] = useState(false)
    const handleEdit = () => {
        setEditable(editable => !editable)
    }
    return (
        <ListItem key={id}>
            <ListItemIcon>
                <CheckBox
                    checked={done}
                    onChange={onToggleDone}
                />
            </ListItemIcon>
            {editable ? <TextField
                fullWidth
                value={label}
                onChange={onEditListItem}
            /> : <ListItemText
                primary={label}
                style={{ textDecoration: done ? 'line-through' : null }}
            />}
            <IconButton
                onClick={handleEdit}
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