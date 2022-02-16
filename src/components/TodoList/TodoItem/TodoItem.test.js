import React from "react";
import { render, screen } from '@testing-library/react';
import TodoContext from '../../../context/todoContext';
import TodoItem from '.';


const mockedTodo = {
        "title": "test",
        "body": "test description",
        "id": 1
};

const dispatchUserEvent = jest.fn();


function renderTodoItem(todo) {
    return render(
        <TodoContext.Provider value={{ dispatchUserEvent }}>
            <TodoItem item={mockedTodo}/>
        </TodoContext.Provider>
    );
}


test("TodoItem renders without crashing", () => {
    renderTodoItem(mockedTodo);
    expect(screen.getByText(mockedTodo.title)).toBeInTheDocument();
});
