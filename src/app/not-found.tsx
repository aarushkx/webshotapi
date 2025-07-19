import Image from "next/image";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-xl md:text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                    404 – Page Not Found
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                    Yikes, this page is as elusive as a donkey in quicksand.
                </p>
                <Image
                    src="/images/not_found.png"
                    alt="404"
                    width={250}
                    height={250}
                    className="mt-4 mx-auto"
                />
            </div>
        </div>
    );
};

export default NotFound;
