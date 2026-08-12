import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "../config";

const BOOK_API = `${API_BASE_URL}/books`;
const STUDENT_API = `${API_BASE_URL}/students`;
const ISSUE_API = `${API_BASE_URL}/issues`;

function IssueBook() {

    const emptyIssue = {
        student: "",
        book: "",
        dueDate: ""
    };

    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [issues, setIssues] = useState([]);
    const [issue, setIssue] = useState(emptyIssue);

    useEffect(() => {

        fetchBooks();
        fetchStudents();
        fetchIssues();

    }, []);

    // ===========================
    // Fetch Books
    // ===========================

    const fetchBooks = async () => {

        try {

            const res = await axios.get(BOOK_API);

            setBooks(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Fetch Students
    // ===========================

    const fetchStudents = async () => {

        try {

            const res = await axios.get(STUDENT_API);

            setStudents(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Fetch Issues
    // ===========================

    const fetchIssues = async () => {

        try {

            const res = await axios.get(ISSUE_API);

            setIssues(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Handle Change
    // ===========================

    const handleChange = (e) => {

        setIssue({

            ...issue,

            [e.target.name]: e.target.value

        });

    };

    // ===========================
    // Issue Book
    // ===========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                ISSUE_API,

                issue

            );

            alert(response.data.message);

            setIssue(emptyIssue);

            fetchBooks();
            fetchIssues();

        }

        catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    // ===========================
    // Return Book
    // ===========================

    const returnBook = async (id) => {

        try {

            const response = await axios.put(

                `${ISSUE_API}/${id}`

            );

            alert(response.data.message);

            fetchBooks();
            fetchIssues();

        }

        catch (error) {

            alert(error.response?.data?.message);

        }

    };

    // ===========================
    // Delete Issue
    // ===========================

    const deleteIssue = async (id) => {

        if (!window.confirm("Delete Issue Record?"))

            return;

        try {

            await axios.delete(

                `${ISSUE_API}/${id}`

            );

            alert("Issue Deleted");

            fetchIssues();

        }

        catch (error) {

            alert("Delete Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary">

                Issue Book

            </h2>

            <hr />
                        <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h4>Issue New Book</h4>

                </div>


                <div className="card-body">

                    <form onSubmit={handleSubmit}>


                        <div className="row">


                            <div className="col-md-6 mb-3">


                                <label>

                                    Select Student

                                </label>


                                <select

                                    className="form-control"

                                    name="student"

                                    value={issue.student}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Student

                                    </option>


                                    {

                                        students.map((student) => (

                                            <option

                                                key={student._id}

                                                value={student._id}

                                            >

                                                {student.rollNo} - {student.name}

                                            </option>

                                        ))

                                    }


                                </select>


                            </div>




                            <div className="col-md-6 mb-3">


                                <label>

                                    Select Book

                                </label>


                                <select

                                    className="form-control"

                                    name="book"

                                    value={issue.book}

                                    onChange={handleChange}

                                    required

                                >


                                    <option value="">

                                        Select Book

                                    </option>


                                    {

                                        books.map((book) => (


                                            <option

                                                key={book._id}

                                                value={book._id}

                                                disabled={
                                                    book.availableCopies <= 0
                                                }

                                            >

                                                {book.title}

                                                {" "}
                                                (

                                                Available:

                                                {book.availableCopies}

                                                )

                                            </option>


                                        ))

                                    }


                                </select>


                            </div>


                        </div>




                        <div className="row">


                            <div className="col-md-6 mb-3">


                                <label>

                                    Due Date

                                </label>


                                <input

                                    type="date"

                                    className="form-control"

                                    name="dueDate"

                                    value={issue.dueDate}

                                    onChange={handleChange}

                                    required

                                />


                            </div>


                        </div>



                        <button

                            type="submit"

                            className="btn btn-success"

                        >

                            Issue Book

                        </button>



                    </form>


                </div>


            </div>


            <br />
                        <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h4>Issued Books List</h4>

                </div>


                <div className="card-body">


                    <table className="table table-bordered table-striped">


                        <thead className="table-dark">


                            <tr>

                                <th>S.No</th>

                                <th>Student</th>

                                <th>Roll No</th>

                                <th>Book</th>

                                <th>Issue Date</th>

                                <th>Due Date</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>


                        </thead>


                        <tbody>


                        {

                            issues.length === 0 ?


                            (

                                <tr>

                                    <td

                                        colSpan="8"

                                        className="text-center text-danger"

                                    >

                                        No Issued Books Found

                                    </td>

                                </tr>

                            )


                            :


                            issues.map((item,index)=>(


                                <tr key={item._id}>


                                    <td>

                                        {index + 1}

                                    </td>



                                    <td>

                                        {item.student?.name}

                                    </td>



                                    <td>

                                        {item.student?.rollNo}

                                    </td>



                                    <td>

                                        {item.book?.title}

                                    </td>



                                    <td>

                                        {
                                            new Date(
                                                item.issueDate
                                            )
                                            .toLocaleDateString()
                                        }

                                    </td>



                                    <td>

                                        {
                                            new Date(
                                                item.dueDate
                                            )
                                            .toLocaleDateString()
                                        }

                                    </td>



                                    <td>

                                        {

                                            item.status === "Issued"

                                            ?

                                            <span className="badge bg-warning">

                                                Issued

                                            </span>

                                            :

                                            <span className="badge bg-success">

                                                Returned

                                            </span>

                                        }


                                    </td>



                                    <td>


                                    {

                                        item.status === "Issued" &&

                                        (

                                        <button

                                            className="btn btn-success btn-sm me-2"

                                            onClick={()=>
                                                returnBook(item._id)
                                            }

                                        >

                                            Return

                                        </button>

                                        )

                                    }



                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={()=>
                                            deleteIssue(item._id)
                                        }

                                    >

                                        Delete

                                    </button>


                                    </td>



                                </tr>


                            ))

                        }


                        </tbody>


                    </table>


                </div>


            </div>


        </div>

    );


}


export default IssueBook;