import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'

class ItemAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            description: ''
        }
    }

    handleChange = (label) => (e) => {
        this.setState({
            [label]: e.target.value
        })
    }

    onItemAdd = () => {
        const { value, description } = this.state
        if (value) {
            this.props.addNewItem(value, description)
        }
        this.setState({
            value: '',
            description: ''
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
        const { value, description } = this.state;
        return <>
            <Grid
                container
                justify='space-between'
            >
                <TextField
                    value={value}
                    onChange={this.handleChange('value')}
                    onKeyPress={this.handleKeyPress}
                    placeholder='Title'
                />
                <IconButton
                    onClick={this.handleClickAddButton}
                >
                    <AddIcon />
                </IconButton>
            </Grid>
            <TextField
                value={description}
                onChange={this.handleChange('description')}
                onKeyPress={this.handleKeyPress}
                fullWidth
                variant='outlined'
                placeholder='Description'
            />
        </>
    }
}

export default ItemAddForm