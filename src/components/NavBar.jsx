import { getServerSession } from 'next-auth'
import Link from "next/link"

const NavBar = async () => {

    const session = await getServerSession()
    console.log(session)
    let isOpen = false;

    const toggleDropdown = () => {
        isOpen = !isOpen;
    };

    return (
        <nav className="bg-gray-800 py-5 mb-2">
            <div className="container px-10 md:px-0 mx-auto flex justify-between">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextMongo/Auth</h1>
                </Link>
                {session === null
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

                            <button id="dropdownUserAvatarButton"
                                data-dropdown-toggle="dropdownAvatar"
                                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                type="button"
                                // onClick={toggleDropdown}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="user photo" />
                            </button>

                            <div id="dropdownAvatar" className={`${isOpen ? 'block' : 'hidden'
                                } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-18 right-7`}>
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>Bonnie Green</div>
                                    <div className="font-medium truncate">name@flowbite.com</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                    <li>
                                        <Link
                                            // onClick={toggleDropdown}
                                            href={'/dashboard'}
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <Link href={"/api/auth/signout"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                                </div>
                            </div>
                        </li>

                    </ul>
                }

            </div>
        </nav>
    )
}
export default NavBar