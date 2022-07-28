import Link from "next/link";

export default function Error404() {
    return (
        <div className="flex-col max-w-screen-xl mx-auto">
            <div className="inset-2/4">
                <h1 className="p-2 text-2xl font-semibold tracking-wide text-accent">404 - Page Not Found</h1>
                <Link href="/">
                    <a className="px-4 py-3 ml-4 font-extrabold transition rounded-md bg-info hover:bg-opacity-50 hover:bg-success hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 text-primary">
                        Go back home
                    </a>
                </Link>
            </div>
        </div>
  )
}