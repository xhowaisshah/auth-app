import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { FaExclamationCircle } from "react-icons/fa";

import {
    Card,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";
export const ErrorCard = ()=> {
    return (
        <CardWrapper
        headerLabel="Oops something went wrong!"
        backButtonLabel="Back to login"
        backButtonPath="/auth/login"
        >
            <div className="w-full flex justify-center items-center">
                <FaExclamationCircle className="w-10 h-10 text-red-500"/>
            </div>
        </CardWrapper>
    )
}