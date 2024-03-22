'use client';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/Loading';

const LoginForm = () => {
    const [error, setError] = useState('');

    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, router]);

    if (status === 'loading') return <Loading />

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        if (res?.error) return setError(res.error);

        setError(null);
    };

    const handleDismiss = () => {
        setError(null);
    };

    return (
        status === 'unauthenticated' && (
            <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
                <form
                    onSubmit={handleSubmit}
                    className='bg-neutral-950 px-8 py-10 w-3/12'
                >
                    <h1 className='text-4xl font-bold mb-7'>SignIn</h1>

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
                        name='email'
                        placeholder='somemail@mail.com'
                        className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='********'
                        className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                    />
                    <button className='bg-indigo-500 px-4 py-2 w-full'>
                        Login
                    </button>

                    <div className='flex items-center mt-4'>
                        <div className='h-px bg-neutral-600 flex-1'></div>
                        <div className='text-xs text-neutral-600 px-2'>O</div>
                        <div className='h-px bg-neutral-600 flex-1'></div>
                    </div>

                    <button
                        type='button'
                        onClick={() => signIn('google')}
                        className='mt-4 px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full justify-center'
                    >
                        <img
                            className='w-6 h-6'
                            src='https://www.svgrepo.com/show/475656/google-color.svg'
                            loading='lazy'
                            alt='google logo'
                        />
                        <span>Ingresa con Google</span>
                    </button>
                </form>
            </div>
        )
    );
};
export default LoginForm;
