"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { ResetSchema } from "@/schemas";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage
} from "@/components/ui/form";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";


export const  ResetFrom = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const { control , handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit =  (values: z.infer<typeof ResetSchema>)=> {
        setError("");
        setSuccess("");

           startTransition(() => { 
            reset(values)
            .then((res)=> {
                setError(res?.error)
                setSuccess(res?.success)
                res.success && form.reset()
            })
        });
    }
    return (
        <CardWrapper 
            headerLabel="Reset Password"
            backButtonLabel="Back to Login"
            backButtonPath="/auth/login">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                        name="email"
                        control={control}
                        disabled={isPending}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input {...field} type="email" autoComplete="email" placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage>{errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">Send reset email</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}