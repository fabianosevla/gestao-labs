import Link from "next/link";

export default function HomeNavbar() {
    return (
        <nav className="bg-white shadow-md py-4 fixed top-0 w-full z-10">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    Gestão de Laboratórios UNIFEI
                </Link>
                <div>
                    <Link href="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}