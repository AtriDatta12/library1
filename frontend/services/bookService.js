import axios from "axios";

const API = `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/books`;

export const getBooks = () => axios.get(API);

export const getBook = (id) => axios.get(`${API}/${id}`);

export const addBook = (book) => axios.post(API, book);

export const updateBook = (id, book) =>
    axios.put(`${API}/${id}`, book);

export const deleteBook = (id) =>
    axios.delete(`${API}/${id}`);