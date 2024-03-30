import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
import Cookies from 'js-cookie';
function IndividualBloodStock() {
    const [bloodStock, setBloodStock] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7089/api/ViewBloodStock/ViewBloodStockByIndividual?id=`+Cookies.get("Id")).then((response) => {
           
            setBloodStock(response.data);
            console.log(bloodStock);
            console.log(response.data);
        })
    }, [])
    return (
        <div className='mainadmin mainbg '>
            <h2 className='mt-3 ms-3'>Blood Stock</h2>
            <hr />
            <div>
                <section className='tablebody px-4'>
                    <table className="table " style={{ "overflow": "auto" }}>
                        <thead className='bg-transparent rowbody'>
                            <tr>

                                <th scope="col">Blood Type</th>
                                <th scope="col">Unit</th>


                            </tr>
                        </thead>
                        <tbody className='bg-transparent rowbody'>
                            {bloodStock.map((data) => (
                                <tr className='bg-transparent'>
                                    <th scope="row">{data.bloodType}</th>
                                    <td>{data.units}</td>
                                   



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

export default IndividualBloodStock