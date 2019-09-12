import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TodoList from '../todo-list'
import ItemAddForm from '../item-add-form'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoData: [],
            error: false
        }
    }

    setDataToStorage = (data) => {
        localStorage.setItem('todoData', JSON.stringify(data))
    }

    getMaxId = (data) => {
        let newData = data.map(item => item.id)
        return Math.max(...newData) + 1
    }

    componentDidMount() {
        if (localStorage.getItem('todoData')) {
            const listItems = JSON.parse(localStorage.getItem('todoData'))
            this.id = this.getMaxId(listItems)
            this.setState({
                todoData: listItems
            })
        } else {
            fetch('data.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ todoData: data })
                    this.id = this.getMaxId(data)
                    this.setDataToStorage(data)
                })
                .catch(err => {
                    this.setState({
                        error: true
                    })
                })
        }
    }

    createTodoItem = (title, description) => {
        return {
            complete: false,
            id: this.id++,
            title,
            description
        }
    }

    addNewItem = (title, description) => {
        const newItem = this.createTodoItem(title, description);
        this.setState(({ todoData }) => {
            const newData = [...todoData, newItem]
            this.setDataToStorage(newData)
            return {
                todoData: newData
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const newData = todoData.filter(item => item.id !== id)
            this.setDataToStorage(newData)
            return {
                todoData: newData
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

    onEditListItem = (id, title) => {
        this.setState(({ todoData }) => {

            const [currentItem, idx] = this.findIndexAndElemFromArray(todoData, id)
            const updateItem = { ...currentItem, title: title }
            const newData = [
                ...todoData.slice(0, idx),
                updateItem,
                ...todoData.slice(idx + 1)
            ]

            this.setDataToStorage(newData)
            return {
                todoData: newData
            }
        })
    }

    toggleComplete = (id) => {
        this.setState(({ todoData }) => {
            const newData = this.togglePropItem(todoData, id, 'complete')

            this.setDataToStorage(newData)
            return {
                todoData: newData
            }
        })
    }

    render() {
        const { todoData, error } = this.state
        if (error) {
            return <Typography>Some error with fetching data</Typography>
        }
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
                            toggleComplete={this.toggleComplete}
                            onDeleteItem={this.deleteItem}
                            onToggleEdit={this.onToggleEdit}
                            onEditListItem={this.onEditListItem}
                        />
                    </Grid>
                }
                <Grid
                    item
                    container
                    direction="column"
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