import http from './http-common';
import config from '../config';

const limit = config.itemPerPage;

export const getAllTodosByPage = (page) => {
    return http.get(`/todos/?_page=${page}&_limit=${limit}`);
};

export const getByTitle = (query) => {
    return http.get(`/todos/?title=${query}`);
};

export const getTodo = (id) => {
    return http.get(`/todos/${id}`);
};

export const updateTodo = (id, data) => {
    return http.put(`/todos/${id}`, data);
};
