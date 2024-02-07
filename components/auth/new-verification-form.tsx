"use client";

import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
    const request = useRef(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();


    const params = useSearchParams();

    const token = params?.get("token");

    const onSubmit = useCallback(() => {
        if(!token) {
            setError("Missing verification token!");
            return;
        }

        if(!request.current) {
            newVerification(token)
            .then((res) => {
                setSuccess(res?.success);
                setError(res?.error);
            }).catch((err) => {
                setError("Something went wrong!");
            })    
            request.current = true;
        }
    },[token]);
    
    useEffect(() => {
       onSubmit()
    },[])


    return (
        <CardWrapper
        headerLabel="Verify your email"
        backButtonLabel="Back to login"
        backButtonPath="/auth/login"
        showSocialLogin={false}
        >
            <div className="flex items-center justify-center w-full">
                {!success && !error && (
                                    <BeatLoader />
                )}
            </div>
            <div className="pt-4">
            <FormError message={error}/>
            <FormSuccess message={success}/>
            </div>
        </CardWrapper>
    )
}