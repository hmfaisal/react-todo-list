import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import { getAllTodosByPage, getByTitle, updateTodo } from './services/todo.service';
import TodoContext from './context/todoContext';
import config from './config';
import { EDIT_TODO, INPUT_CHANGE, SELECT_TODO, CLOSE_SELECT_TODO } from './constants/actionTypes';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Loading from './components/Loading';


function App() {

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllTodosByPage(currentPage).then(res => {
      setTodos(old => [...old, ...res.data]);
      setLoading(false);
    });
  }, [currentPage]);


  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case SELECT_TODO: {
        const currentItem = payload;
        setCurrentTodo(currentItem);
        setOpen(true);
        return;
      }
      case CLOSE_SELECT_TODO: {
        closeDialog();
        return;
      }
      case EDIT_TODO: {
        let data = {
          title: currentTodo.title,
          body: currentTodo.body
        }
        updateTodo(currentTodo.id, data).then(res => {
          setTodos(todos.map(todo => (todo.id === res.data.id ? { ...todo, ...res.data } : todo)));
          closeDialog();
        });
        return;
      }
      case INPUT_CHANGE: {
        getByTitle(payload).then(res => {
          if (res.data.length > 0) {
            setDisabled(true);
          } else {
            let updatedValue = { title: payload };
            setCurrentTodo(currentTodo => ({ ...currentTodo, ...updatedValue }));
            setDisabled(false);
          }
        });
        return;
      }
      default:
        return;
    }
  };


  const fetchMoreData = () => {
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
    }, 1500);
  };


  const closeDialog = () => {
    setCurrentTodo({});
    setDisabled(true);
    setOpen(false);
  };


  return (
    <TodoContext.Provider value={{ config, todos, loading, dispatchUserEvent }}>
      <Container>
        {todos.length > 0 ? <TodoList fetchMoreData={fetchMoreData} /> : <></>}
        <TodoForm open={open} currentTodo={currentTodo} disabled={disabled} />
        <Loading />
      </Container>
    </TodoContext.Provider>
  );
};

export default App;