import React from "react";
import { render, screen } from '@testing-library/react';
import TodoContext from '../../context/todoContext';
import TodoList from '.';


const mockedTodos = [
    {
        "title": "mock test 1",
        "body": "test description",
        "id": 1
    }
];

const newTodo = [
    {
        "title": "mock test 2",
        "body": "test description",
        "id": 1
    }
];

const expectedTodo = [
    {
        "title": "mock test 1",
        "body": "test description",
        "id": 1
    },
    {
        "title": "mock test 2",
        "body": "test description",
        "id": 1
    }
];

function renderTodoList(todos) {
    return render(
        <TodoContext.Provider value={{ todos }}>
            <TodoList />
        </TodoContext.Provider>
    );
}


test("TodoList renders without crashing", () => {
    renderTodoList(mockedTodos);
    expect(screen.getByText(mockedTodos[0].title)).toBeInTheDocument();
});
