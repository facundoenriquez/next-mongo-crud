'use client';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [error, setError] = useState();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const signupResponse = await axios.post('/api/auth/signup', {
                email: formData.get('email'),
                fullname: formData.get('fullname'),
                password: formData.get('password'),
            });

            const res = await signIn('credentials', {
                email: signupResponse.data.email,
                password: formData.get('password'),
                redirect: false,
            });

            if (res.ok) return router.push('/dashboard');

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
        <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
            <form
                onSubmit={handleSubmit}
                className='bg-neutral-950 px-8 py-10 w-3/12'
            >
                <h1 className='text-4xl font-bold mb-7'>SignUp</h1>

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
                    className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                />
                <input
                    type='text'
                    name='email'
                    placeholder='somemail@mail.com'
                    className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                />
                <input
                    type='text'
                    name='password'
                    placeholder='********'
                    className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                />
                <button className='bg-indigo-500 px-4 py-2'>Register</button>
            </form>
        </div>
    );
};
export default RegisterPage;
