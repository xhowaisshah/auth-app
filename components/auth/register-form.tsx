"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { RegisterSchema } from "@/schemas";
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
import { Register } from "@/actions/register";

export const  RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const { control , handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit =  (values: z.infer<typeof RegisterSchema>)=> {
        setError("");
        setSuccess("");

           startTransition(() => { 
            Register(values)
            .then((res)=> {
                setError(res?.error)
                setSuccess(res?.success)
            })
        });
    }
    return (
        <CardWrapper 
            headerLabel="Create Account"
            backButtonLabel="Already have an Account?"
            backButtonPath="/auth/login"
            showSocialLogin>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                        name="name"
                        control={control}
                        disabled={isPending}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input {...field} type="text" autoComplete="name" placeholder="Enter your name" />
                                </FormControl>
                                <FormMessage>{errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                        />
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
                        <FormField
                        name="password"
                        control={control}
                        disabled={isPending}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input {...field} type="password" autoComplete="current-password" placeholder="Enter your password" />
                                </FormControl>
                                <FormMessage>{errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">Register</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}