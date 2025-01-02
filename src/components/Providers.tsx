"use client"
import {ReactNode} from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Providers({children}: Readonly<{ children: ReactNode }>) {
    return (
        <NextUIProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {children}
        </NextUIProvider>
    );
}