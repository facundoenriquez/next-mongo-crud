'use client';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
    const { data: session, status } = useSession();
    return (
        <div className='justify-center h-[calc(100vh-4rem)] flex flex-col items-center'>
            <h1 className='font-bold text-3xl'>Profile</h1>
            <pre className='bg-zinc-800 p-4'>
                {JSON.stringify(
                    {
                        session,
                        status,
                    },
                    null,
                    2
                )}
            </pre>
        </div>
    );
};
export default DashboardPage;
