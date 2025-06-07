import React from 'react'
import laptopImg from '../assets/laptop.svg'
import '../../src/index.css'

function Card() {
    return (
        <div>
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-100 via-pink-100 to-blue-100 rounded-2xl shadow-md top-student">
                <img src={laptopImg} alt="Student image" className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-2 card-img"
                    style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        border: '4px solid white',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        marginLeft: '35%',
                    }}
                />
                <h2 className="text-xl fw-bold text-gray-800" style={{ textAlign: 'center' }}>Dhruv Garg</h2>
                <div className="flex justify-between w-full px-6 mb-4">
                    <div className='container'>
                        <div className="row">
                            <div className='col text-center mt-4 fw-bold'>
                                <p className="text-md font-bold text-gray-800">test@gmail.com</p>
                                <p className="text-xs text-gray-500">1234567890</p>
                            </div>
                            <div className='col text-center mt-4 fw-bold' >
                                <p className="text-md font-bold text-gray-800">23 December 2002</p>
                                <p className="text-xs text-gray-500">Male</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
