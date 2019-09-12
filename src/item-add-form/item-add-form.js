import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

class ItemAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    onItemAdd = () => {
        if (this.state.value) {
            this.props.addNewItem(this.state.value)
        }
        this.setState({
            value: ''
        })
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onItemAdd()
        }
    }

    handleClickAddButton = () => {
        this.onItemAdd()
    }

    render() {
        const {value} = this.state;
        return <>
            <TextField
                value={value}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                fullWidth
            />
            <IconButton
                onClick={this.handleClickAddButton}
            >
                <AddIcon />
            </IconButton>
        </>
    }
}

export default ItemAddForm;