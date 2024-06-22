import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/apply', {
                firstName,
                lastName,
                phoneNumber,
                email
            });

            setMessage(response.data.message || 'Application submitted successfully');
            toast.success('Application submitted successfully');
            navigate('/');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Application submission failed');
            console.error('Error submitting application:', error);
            toast.error('Application submission failed');
        }
    };

    return (
        <div className="regi">
        <div className="regiWrap">
            <h2>Заявка на консультацию</h2>
            <form onSubmit={handleSubmit} className="fromReg">
                <div className="inputRegi">
                    <p>Имя</p>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        />
                </div>
                <div className="inputRegi">
                    <p>Фамилия</p>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="inputRegi">
                    <p>Номер телефона</p>
                    <input
                        type="tel"
                        placeholder="Номер телефона"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="inputRegi">
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Применять</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    </div>
    );
};

export default Register;
