import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "../config";


function Dashboard() {


    const [data, setData] = useState({

        totalBooks: 0,

        totalStudents: 0,

        issuedBooks: 0,

        availableBooks: 0

    });



    useEffect(()=>{

        fetchDashboard();

    },[]);



    const fetchDashboard = async()=>{


        try{


            const response = await axios.get(

                `${API_BASE_URL}/dashboard`

            );


            setData(response.data.data);


        }

        catch(error){


            console.log(error);


        }


    };



    return (


        <div className="container mt-4">


            <h2 className="text-center text-primary mb-4">

                Library Dashboard

            </h2>



            <div className="row">



                <div className="col-md-3 mb-3">


                    <div className="card shadow text-center">


                        <div className="card-body">


                            <h5>

                                Total Books

                            </h5>


                            <h2 className="text-primary">

                                {data.totalBooks}

                            </h2>


                        </div>


                    </div>


                </div>





                <div className="col-md-3 mb-3">


                    <div className="card shadow text-center">


                        <div className="card-body">


                            <h5>

                                Total Students

                            </h5>


                            <h2 className="text-success">

                                {data.totalStudents}

                            </h2>


                        </div>


                    </div>


                </div>





                <div className="col-md-3 mb-3">


                    <div className="card shadow text-center">


                        <div className="card-body">


                            <h5>

                                Issued Books

                            </h5>


                            <h2 className="text-warning">

                                {data.issuedBooks}

                            </h2>


                        </div>


                    </div>


                </div>





                <div className="col-md-3 mb-3">


                    <div className="card shadow text-center">


                        <div className="card-body">


                            <h5>

                                Available Books

                            </h5>


                            <h2 className="text-danger">

                                {data.availableBooks}

                            </h2>


                        </div>


                    </div>


                </div>



            </div>



        </div>


    );


}


export default Dashboard;