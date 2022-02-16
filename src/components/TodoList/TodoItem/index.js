import React, { useContext }  from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import TodoContext from '../../../context/todoContext';
import { SELECT_TODO } from '../../../constants/actionTypes';



function TodoItem({ item }) {

    const { dispatchUserEvent } = useContext(TodoContext);

    const handleTodoSelect = () => {
		dispatchUserEvent(SELECT_TODO, item);
	};

    return (
        <Grid item xs={12} sm={4} >
            <Card sx={{ boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)" }} >
                <CardHeader
                    action={
                        <IconButton aria-label="edit" value={item} onClick={handleTodoSelect}>
                            <EditIcon />
                        </IconButton>
                    }
                    title={item.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {item.body}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

TodoItem.propTypes = {
    item: PropTypes.object
}


export default TodoItem;