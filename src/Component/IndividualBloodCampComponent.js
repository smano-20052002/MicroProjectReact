import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
import Cookies from 'js-cookie';
function IndividualBloodCampComponent() {
    const [bloodCamp, setBloodCamp] = useState([]);
    const deleteCamp = (id) => {
        axios.delete(`https://localhost:7089/BloodCamp/` + id).then((reponse) => {
            if (reponse.status == 200) {
                alert("Deleted Successfully")
                setTimeout(() => {
                    axios.get(`https://localhost:7089/api/ViewBloodCamp/GetByIndividual?id=` + Cookies.get("Id")).then((response) => {

                        setBloodCamp(response.data);
                        console.log(bloodCamp);
                        console.log(response.data);
                    }).catch((err) => {
                        console.log(err);
                    })
                }, 1000);
            } else {
                alert("Server Error");
            }
        })
    }
    useEffect(() => {
        axios.get(`https://localhost:7089/api/ViewBloodCamp/GetByIndividual?id=` + Cookies.get("Id")).then((response) => {

            setBloodCamp(response.data);
            console.log(bloodCamp);
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div className='mainadmin mainbg '>
            <h2 className='mt-3 ms-3'>Blood Camp</h2>
            <hr />
            <div>
                <section className='tablebody'>
                    <table className="table" style={{ "overflow": "auto" }}>
                        <thead className='bg-transparent rowbody'>
                            <tr>

                                <th scope="col">Camp Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Conducted by</th>
                                <th scope='col'>Action</th>


                            </tr>
                        </thead>
                        <tbody className='bg-transparent rowbody'>
                            {bloodCamp.map((data) => (
                                <tr className='bg-transparent'>
                                    <th scope="row">{data.bloodCamp.bloodCampName}</th>
                                    <td>{data.bloodCamp.bloodCampLocation}</td>
                                    <td>{data.bloodCamp.date}</td>
                                    <td>{data.bloodCamp.time}</td>
                                    <td>{data.account.name}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => { deleteCamp(data.bloodCamp.bloodCampId) }}>Remove</button>
                                    </td>



                                </tr>
                            )

                            )}
                        </tbody>
                    </table>
                </section>

            </div>

        </div>
    )
}

export default IndividualBloodCampComponent