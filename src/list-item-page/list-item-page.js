import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'

const ListItemPage = ({ match: { params: { id } } }) => {
    const itemId = parseInt(id);
    const listItems = JSON.parse(localStorage.getItem('todoData'))
    const listItem = listItems.find(item => item.id === itemId)
    const { title, description, complete } = listItem

    return (
        <Grid
            container
            alignItems='center'
            justify='space-between'
            direction='column'
            component={Paper}
            style={{padding: 50}}
        >
            <Typography
                variant='h4'
                gutterBottom
            >
                {title}
            </Typography>
            <Typography
                variant='body1'
                gutterBottom
            >
                {description}
            </Typography>
            {complete && <Typography style={{color: 'tomato'}}>It's already done, good for you!!!</Typography>}
            <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                <Button
                    color='primary'
                >
                    <ArrowBack style={{marginRight: 20}} />
                    Back
            </Button>
            </Link>
        </Grid>
    )
}

export default ListItemPage