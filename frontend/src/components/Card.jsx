import React, { useEffect, useState } from 'react'
import laptopImg from '../assets/profile.svg'
import '../../src/index.css'
import { getTopStudent } from '../services/Admin/Dashboard';
import { toast } from 'react-toastify';

function Card() {
    const [topstudent, setTopstudent] = useState({
        courseName: "",
        name: "",
        email: "",
        imagePath: "",
        gender: ""
    });
    // Fetch Top Student
    useEffect(() => {
        const fetchTopStudent = async () => {
            try {
                const data = await getTopStudent();
                setTopstudent(data);
            } catch (error) {
                console.log(error)
                toast.error("Unable to load top student");
            }
        };
        fetchTopStudent();
    }, []);
    return (
        <div>
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-100 via-pink-100 to-blue-100 rounded-2xl shadow-md top-student">
                <img src={topstudent.imagePath || laptopImg} alt="Student image" className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-2 card-img"
                    style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        border: '4px solid white',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        marginLeft: '35%',
                    }}
                />
                <h2 className="text-xl fw-bold text-gray-800" style={{ textAlign: 'center' }}>{topstudent.name}</h2>
                <div className="flex justify-between w-full px-6 mb-4">
                    <div className='container'>
                        <div className="row">
                            <div className='col text-center mt-4 fw-bold'>
                                <p className="text-md font-bold text-gray-800">{topstudent.courseName}</p>
                                <p className="text-xs text-gray-500">{topstudent.gender}</p>
                            </div>
                            <div className='col text-center mt-4 fw-bold' >
                                <p className="text-md font-bold text-gray-800">{topstudent.email}</p>
                                <p className="text-xs text-gray-500">MARKS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
