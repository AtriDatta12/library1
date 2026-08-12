import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Navbar from "./components/Navbar";


import Dashboard from "./pages/Dashboard";
import ViewBooks from "./pages/ViewBooks";
import Students from "./pages/Student";
import IssueBook from "./pages/IssueBook";


function App() {


    return (

        <BrowserRouter>


            <Navbar />


            <div className="container mt-4">


                <Routes>


                    {/* Dashboard */}

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />


                    {/* Books CRUD */}

                    <Route
                        path="/books"
                        element={<ViewBooks />}
                    />


                    {/* Students CRUD */}

                    <Route
                        path="/student"
                        element={<Students />}
                    />


                    {/* Issue Book */}

                    <Route
                        path="/issue-book"
                        element={<IssueBook />}
                    />


                </Routes>


            </div>


        </BrowserRouter>

    );

}


export default App;