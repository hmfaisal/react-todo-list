import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@mui/material/Grid';

import TodoContext from '../../context/todoContext';
import TodoItem from './TodoItem';

import { LOADING } from '../../constants/lang';


function TodoList({ fetchMoreData }) {

    const { todos } = useContext(TodoContext);

    return (
        <InfiniteScroll
            dataLength={todos.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>{LOADING}</h4>}
        >
            <Grid container spacing={3}>
                {todos.map((item, index) => (
                    <TodoItem item={item} key={index} />
                ))}
            </Grid>
        </InfiniteScroll>
    );
};

TodoList.propTypes = {
    fetchMoreData: PropTypes.func
}

export default TodoList;