import Link from "next/link"

const NavBar = () => {
    return (
        <nav className="bg-gray-800 py-5 mb-2">
            <div className="container px-10 md:px-0 mx-auto flex justify-between">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextMongo/Auth</h1>
                </Link>
                <ul className="flex gap-x-4">
                    <li>
                        <Link href="/tasks/new">new</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar