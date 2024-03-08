'use client';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

const RegisterPage = () => {
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const user = await axios.post('/api/auth/signup', {
                email: formData.get('email'),
                fullname: formData.get('fullname'),
                password: formData.get('password'),
            });
            setError(null);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setError(error.response.data.message);
            }
        }
    };

    const handleDismiss = () => {
        setError(null);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>

                {error && (
                    <div
                        className=' max-w-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 mb-2 rounded relative'
                        role='alert'
                        id='error_message'
                    >
                        <strong className='font-bold'>{error} !</strong>
                        <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                            <svg
                                className='fill-current h-6 w-6 text-red-500'
                                role='button'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                onClick={() => handleDismiss()}
                            >
                                <title>Close</title>
                                <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                            </svg>
                        </span>
                    </div>
                )}

                <input
                    type='text'
                    name='fullname'
                    placeholder='fullname'
                    className='bg-zinc-800 px-4 py-2 block mb-2'
                />
                <input
                    type='text'
                    name='email'
                    placeholder='somemail@mail.com'
                    className='bg-zinc-800 px-4 py-2 block mb-2'
                />
                <input
                    type='text'
                    name='password'
                    placeholder='********'
                    className='bg-zinc-800 px-4 py-2 block mb-2'
                />
                <button className='bg-indigo-500 px-4 py-2'>Register</button>
            </form>
        </div>
    );
};
export default RegisterPage;
