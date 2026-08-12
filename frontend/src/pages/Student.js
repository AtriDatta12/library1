import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/students`;

function Students() {

    const emptyStudent = {
        rollNo: "",
        name: "",
        gender: "",
        department: "",
        year: "",
        section: "",
        email: "",
        phone: "",
        address: "",
        status: "Active"
    };

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState(emptyStudent);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {

        try {

            const res = await axios.get(API);

            setStudents(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId) {

                await axios.put(

                    `${API}/${editId}`,

                    student

                );

                alert("Student Updated Successfully");

            }

            else {

                await axios.post(

                    API,

                    student

                );

                alert("Student Added Successfully");

            }

            setStudent(emptyStudent);

            setEditId(null);

            fetchStudents();

        }

        catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    const editStudent = (data) => {

        setStudent(data);

        setEditId(data._id);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const deleteStudent = async (id) => {

        if (!window.confirm("Delete Student?"))

            return;

        try {

            await axios.delete(

                `${API}/${id}`

            );

            alert("Student Deleted");

            fetchStudents();

        }

        catch (error) {

            alert("Delete Failed");

        }

    };

    const filteredStudents = students.filter((s) =>

        s.name.toLowerCase().includes(search.toLowerCase()) ||

        s.rollNo.toLowerCase().includes(search.toLowerCase()) ||

        s.department.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="container mt-4">

            <h2 className="text-center text-success">

                Student Management

            </h2>

            <hr />
            <div className="card shadow">

    <div className="card-header bg-success text-white">

        <h4>

            {editId ? "Update Student" : "Add Student"}

        </h4>

    </div>

    <div className="card-body">

        <form onSubmit={handleSubmit}>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label>Roll Number</label>

                    <input
                        type="text"
                        className="form-control"
                        name="rollNo"
                        value={student.rollNo}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label>Student Name</label>

                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label>Gender</label>

                    <select
                        className="form-control"
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>

                    </select>

                </div>

                <div className="col-md-4 mb-3">

                    <label>Department</label>

                    <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label>Year</label>

                    <select
                        className="form-control"
                        name="year"
                        value={student.year}
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select Year</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Year</option>
                        <option value="3">3 Year</option>
                        <option value="4">4 Year</option>

                    </select>

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label>Section</label>

                    <input
                        type="text"
                        className="form-control"
                        name="section"
                        value={student.section}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label>Phone</label>

                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="mb-3">

                <label>Address</label>

                <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                    required
                ></textarea>

            </div>

            <button
                className="btn btn-success"
                type="submit"
            >

                {editId ? "Update Student" : "Save Student"}

            </button>

            {editId && (

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {

                        setStudent(emptyStudent);

                        setEditId(null);

                    }}
                >

                    Cancel

                </button>

            )}

        </form>

    </div>

</div>

<br />
            <div className="card shadow">

                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                    <h4 className="mb-0">Students List</h4>

                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="card-body">

                    <table className="table table-bordered table-striped table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>S.No</th>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Section</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredStudents.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="10"
                                        className="text-center text-danger"
                                    >
                                        No Students Found
                                    </td>

                                </tr>

                            ) : (

                                filteredStudents.map((student, index) => (

                                    <tr key={student._id}>

                                        <td>{index + 1}</td>
                                        <td>{student.rollNo}</td>
                                        <td>{student.name}</td>
                                        <td>{student.department}</td>
                                        <td>{student.year}</td>
                                        <td>{student.section}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.status}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => editStudent(student)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteStudent(student._id)}
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

export default Students;