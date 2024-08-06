import React from 'react'
import { Form } from './form'

const AuthenticatePage = () => {
    return (
        <div className="relative flex w-full h-screen bg-background">
            <div className="absolute z-[1] h-full w-full dark:bg-[radial-gradient(#575757,transparent_1px)] bg-[radial-gradient(#d0d0d0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <div className="flex flex-[8] items-center justify-center relative z-[9] flex-col">


                <div className="h-6"></div>
                <Form />
                <div className="flex flex-col">
                </div>
            </div>
        </div>
    )
}

export default AuthenticatePage