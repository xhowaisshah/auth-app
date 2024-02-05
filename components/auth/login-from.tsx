"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

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

export const  LoginForm = () => {
    const [isPending, startTransition] = useTransition();
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
           startTransition(() => { 
            login(values)
        });
    }
    return (
        <CardWrapper 
            headerLabel="Wellcome Back"
            backButtonLabel="Don't have an Account"
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
                                <Input {...field} type="email" autoComplete="email" placeholder="Enter your email" />
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
                                <Input {...field} type="password" autoComplete="current-password" placeholder="Enter your password" />
                                <FormMessage>{errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message=""/>
                    <FormSuccess message=""/>
                    <Button disabled={isPending} type="submit" className="w-full">Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}