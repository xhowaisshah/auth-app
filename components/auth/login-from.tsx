"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const  LoginForm = () => {
    const SearchParams = useSearchParams();
    const urlError = SearchParams?.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different providers!"
    : ""
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { control , handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit =  (values: z.infer<typeof LoginSchema>)=> {
        setError("");
        setSuccess("");

           startTransition(() => { 
            login(values)
            .then((res)=> {
                setError(res?.error)
                setSuccess(res?.success)
            })
        });
    }
    return (
        <CardWrapper 
            headerLabel="Wellcome Back"
            backButtonLabel="Don't have an Account?"
            backButtonPath="/auth/register"
            showSocialLogin>
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
                                <Button size={"sm"} variant={"link"} className="px-0 font-normal" asChild>
                                    <Link href="/auth/forgot-password">
                                        Forgot Password?
                                    </Link>
                                </Button>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}