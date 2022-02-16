import React from "react";
import { render, rerender, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoContext from '../../context/todoContext';
import { CLOSE_SELECT_TODO, EDIT_TODO, INPUT_CHANGE } from '../../constants/actionTypes';
import TodoForm from '.';


const mockedTodo = {
    "title": "test",
    "body": "test description",
    "id": 1
};

const open = true;
const disabled = true;


function renderTodoForm(todo, dispatchUserEvent) {
    return render(
        <TodoContext.Provider value={{ dispatchUserEvent }}>
            <TodoForm open={open} currentTodo={mockedTodo} />
        </TodoContext.Provider>
    );
}


test("TodoForm contains input field and it has focus on mount", () => {
    const dispatchUserEvent = jest.fn();
    renderTodoForm(mockedTodo, dispatchUserEvent);
    const inputField = screen.getByLabelText("Title");
    expect(inputField).toHaveFocus();
});


