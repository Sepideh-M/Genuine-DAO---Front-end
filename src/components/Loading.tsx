//* Loading modal used before transactions *//

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgClose } from "react-icons/cg";

//* Interface *//
interface LoadingProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

//* Main function *//
function Loading({ loading, setLoading }: LoadingProps) {
    //* *//
    const themeStatus = localStorage.getItem("theme");

    //* Close loading modal *//
    const close = () => {
        setLoading(false);
    };

    return (
        <>
            {/* Headless modal => Tailwind plugin */}
            <Transition appear show={loading} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[1px] bg-gray-800 bg-opacity-10"
                    onClose={() => null}
                >
                    <div className="min-h-screen px-4 text-center flex justify-center items-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span className="inline-block align-middle" aria-hidden="true"></span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={`inline-block w-full max-w-sm p-5 overflow-hidden text-left align-middle transition-all transform ${themeStatus == "light" ? "bg-blue-500" : "bg-blue-800"} shadow-xl rounded-2xl`}>
                                {/* Modal header */}
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-200"
                                >
                                    <div className="flex justify-end items-center ">
                                        <CgClose
                                            className="text-2xl cursor-pointer"
                                            onClick={() => close()}
                                        />
                                    </div>
                                </Dialog.Title>
                                {/* Modal content */}
                                <div className="mt-6">
                                    {/* Loading spinner */}
                                    <div className="mt-6 flex justify-center items-center ">
                                        <svg
                                            role="status"
                                            className="inline mr-2 w-16 h-16 text-blue-500 animate-spin fill-[#e8eaee]"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                    </div>
                                    {/* Loading messages */}
                                    <div className="flex flex-col justify-center items-center my-5 space-y-3">
                                        <h1 className="text-gray-200  text-xl font-medium">
                                            {("waiting_for_confirmation")}
                                        </h1>
                                        <h1 className="text-gray-200  font-medium">
                                            {/* {("another_txt")} */}
                                        </h1>
                                        <p className="text-gray-500 text-sm">
                                            {/* {("alert")} */}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Loading;