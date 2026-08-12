import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/books`;

function ViewBooks() {

    const emptyBook = {
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        category: "",
        totalCopies: "",
        availableCopies: ""
    };

    const [books, setBooks] = useState([]);
    const [book, setBook] = useState(emptyBook);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {

        try {

            const response = await axios.get(API);

            setBooks(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setBook({

            ...book,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId) {

                await axios.put(

                    `${API}/${editId}`,

                    book

                );

                alert("Book Updated Successfully");

            }

            else {

                await axios.post(

                    API,

                    book

                );

                alert("Book Added Successfully");

            }

            setBook(emptyBook);

            setEditId(null);

            fetchBooks();

        }

        catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    const editBook = (selectedBook) => {

        setBook({

            title: selectedBook.title,
            author: selectedBook.author,
            publisher: selectedBook.publisher,
            isbn: selectedBook.isbn,
            category: selectedBook.category,
            totalCopies: selectedBook.totalCopies,
            availableCopies: selectedBook.availableCopies

        });

        setEditId(selectedBook._id);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const deleteBook = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this book?"

        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `${API}/${id}`

            );

            alert("Book Deleted Successfully");

            fetchBooks();

        }

        catch (error) {

            alert("Delete Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary">

                Library Management System

            </h2>

            <hr />
                        <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h4>

                        {editId ? "Update Book" : "Add New Book"}

                    </h4>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Book Title

                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={book.title}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Author

                                </label>

                                <input
                                    type="text"
                                    name="author"
                                    className="form-control"
                                    value={book.author}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Publisher

                                </label>

                                <input
                                    type="text"
                                    name="publisher"
                                    className="form-control"
                                    value={book.publisher}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    ISBN

                                </label>

                                <input
                                    type="text"
                                    name="isbn"
                                    className="form-control"
                                    value={book.isbn}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={book.category}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Total Copies

                                </label>

                                <input
                                    type="number"
                                    name="totalCopies"
                                    className="form-control"
                                    value={book.totalCopies}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Available Copies

                                </label>

                                <input
                                    type="number"
                                    name="availableCopies"
                                    className="form-control"
                                    value={book.availableCopies}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >

                            {editId ? "Update Book" : "Save Book"}

                        </button>

                        {editId && (

                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => {

                                    setBook(emptyBook);

                                    setEditId(null);

                                }}
                            >

                                Cancel

                            </button>

                        )}

                    </form>

                </div>

            </div>
            <div className="card shadow mt-4">

                <div className="card-header bg-dark text-white">

                    <h4>Books List</h4>

                </div>

                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>S.No</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>ISBN</th>
                                <th>Category</th>
                                <th>Total</th>
                                <th>Available</th>
                                <th width="180">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {books.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center text-danger"
                                    >

                                        No Books Found

                                    </td>

                                </tr>

                            ) : (

                                books.map((book, index) => (

                                    <tr key={book._id}>

                                        <td>{index + 1}</td>

                                        <td>{book.title}</td>

                                        <td>{book.author}</td>

                                        <td>{book.publisher}</td>

                                        <td>{book.isbn}</td>

                                        <td>{book.category}</td>

                                        <td>{book.totalCopies}</td>

                                        <td>{book.availableCopies}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => editBook(book)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteBook(book._id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default ViewBooks;
            