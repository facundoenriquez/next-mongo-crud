'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from "next/link"
import { useEffect, useRef, useState } from 'react'
import { Loading } from './Loading'

const NavBar = () => {

    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const closeDropdownOnOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdownOnOutsideClick);

        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);




    return (
        <nav className="bg-gray-800 py-5 mb-2">
            <div className="container px-10 md:px-0 mx-auto flex justify-between">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextMongo/Auth</h1>
                </Link>
                {status === 'loading' ? <Loading inline /> :
                    session === null || typeof session === 'undefined'
                        ?
                        <ul className="flex gap-x-4">
                            <li>
                                <Link href={"/login"}>Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Registro</Link>
                            </li>
                        </ul>
                        :
                        <ul className="flex gap-x-4">
                            <li>
                                <Link href="/tasks/new">New</Link>
                            </li>
                            <li>
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li>

                                <button
                                    ref={dropdownRef}
                                    id="dropdownUserAvatarButton"
                                    data-dropdown-toggle="dropdownAvatar"
                                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    {session?.user.image
                                        ?
                                        <img className="w-8 h-8 rounded-full" src={`${session?.user.image}`} alt="user photo" />
                                        :
                                        <img className="w-8 h-8 rounded-full" src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1" alt="user photo" />
                                    }


                                </button>

                                <div id="dropdownAvatar" className={`${isOpen ? 'block' : 'hidden'
                                    } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-18 right-7`}>
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>{session?.user.name}</div>
                                        <div className="font-medium truncate">{session?.user.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                        <li>
                                            <Link
                                                href={'/dashboard'}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                        </li>
                                    </ul>
                                    <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                                            onClick={() => signOut({
                                                callbackUrl: "/login"
                                            })}
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </li>

                        </ul>
                }

            </div>
        </nav >
    )
}
export default NavBar