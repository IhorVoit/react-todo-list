import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TodoList from '../todo-list'
import ItemAddForm from '../item-add-form'
import Typography from '@material-ui/core/Typography'

class App extends Component {
    constructor(props) {
        super(props)
        this.id = 10
        this.state = {
            todoData: [
                this.createTodoItem('Create item'),
                this.createTodoItem('Read item'),
                this.createTodoItem('Update item'),
                this.createTodoItem('Delete item'),
            ]
        }
    }

    createTodoItem = (label) => {
        return {
            done: false,
            id: this.id++,
            label
        }
    }

    addNewItem = (value) => {
        const newItem = this.createTodoItem(value);
        this.setState(({ todoData }) => {
            const newData = [...todoData, newItem]
            return {
                todoData: newData
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const newArray = todoData.filter(item => item.id !== id)
            return {
                todoData: newArray
            }
        })
    }

    findIndexAndElemFromArray = (arr, id) => {
        const idx = arr.findIndex((el) => el.id === id)
        const item = arr[idx]
        return [item, idx]
    }

    togglePropItem = (array, id, propName) => {
        const [oldItem, idx] = this.findIndexAndElemFromArray(array, id)
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }

        return [
            ...array.slice(0, idx),
            newItem,
            ...array.slice(idx + 1)
        ]
    }

    onEditListItem = (id, value) => {
        this.setState(({todoData}) => {
            const [currentItem, idx] = this.findIndexAndElemFromArray(todoData, id)
            const updateItem = {...currentItem, label: value}
            return {
                todoData: [
                    ...todoData.slice(0, idx),
                    updateItem,
                    ...todoData.slice(idx + 1)
                ]
            }
        })
    }

    onToggleDoneItem = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.togglePropItem(todoData, id, 'done')
            }
        })
    }

    render() {
        const { todoData } = this.state

        return (
            <Grid
                container
                alignItems='center'
                justify='space-between'
                direction='column'
            >
                {todoData.length === 0 ? <Typography>
                    Add new todo item for list below
                    </Typography> :
                    <Grid
                        item
                        component={Paper}
                        style={{ marginBottom: 40, width: '100%', maxWidth: 500 }}
                    >
                        <TodoList
                            todoData={todoData}
                            onToggleDoneItem={this.onToggleDoneItem}
                            onDeleteItem={this.deleteItem}
                            onToggleEdit={this.onToggleEdit}
                            onEditListItem={this.onEditListItem}
                        />
                    </Grid>
                }
                <Grid
                    item
                    container
                    justify='space-between'
                    wrap='nowrap'
                    style={{ width: '100%', maxWidth: 500 }}
                >
                    <ItemAddForm
                        addNewItem={this.addNewItem}
                        onToggleDoneItem={this.onToggleDoneItem}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default App;