import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TodoContext from '../../context/todoContext';
import { CANCEL, SAVE, TITLEVALIDATIONERROR } from '../../constants/lang';
import { CLOSE_SELECT_TODO, EDIT_TODO, INPUT_CHANGE } from '../../constants/actionTypes';

function TodoForm({ open, currentTodo, disabled }) {

    const [errorMessage, setErrorMessage] = useState("");
    const { dispatchUserEvent } = useContext(TodoContext);

    useEffect(() => {
        if (disabled) {
            setErrorMessage(TITLEVALIDATIONERROR);
        } else {
            setErrorMessage("");
        }
    }, [disabled]);

    const handleTodoSelectClose = () => {
        dispatchUserEvent(CLOSE_SELECT_TODO);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchUserEvent(EDIT_TODO);
    }

    const handleChangeTitle = (e) => {
        dispatchUserEvent(INPUT_CHANGE, e.target.value);
    }

    return (
        <Dialog open={open} onClose={handleTodoSelectClose}>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    helperText={errorMessage}
                    fullWidth
                    variant="standard"
                    defaultValue={currentTodo.title}
                    data-testid="title-input"
                    onChange={handleChangeTitle}
                />
                <Typography variant="body2" >
                    {currentTodo.body}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTodoSelectClose}>{CANCEL}</Button>
                <Button disabled={disabled} onClick={handleSubmit} data-testid="submit-btn">{SAVE}</Button>
            </DialogActions>

        </Dialog>
    );
}

TodoForm.propTypes = {
    open: PropTypes.bool,
    currentTodo: PropTypes.object,
    disabled: PropTypes.bool
}

export default TodoForm;