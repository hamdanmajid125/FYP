import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Loader() {
    let navigate = useNavigate();
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let response = await axios.get('/api/get')
            .catch(function (error) {

                getData();

            });
        if (response != undefined) {
            sessionStorage.setItem("processdata", JSON.stringify(response.data));
            navigate('/webform')

        }



    }


    return (
        <div className="verticallycenter d-flex flex-column  justify-content-center align-items-center">

            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div className="message">
                hello It is message
            </div>

        </div>

    )
}

export default Loader