import * as z from 'zod';

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Email is invalid' }),
    password: z
        .string().min(1, { message: 'Password is required' }),
})

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Email is invalid' }),
    password: z
        .string().min(6, { message: 'Minimum 6 characters required' }),
})

export const ResetSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Email is invalid' }),
})
export const NewPasswordSchema = z.object({
    password: z
        .string().min(6, { message: 'Minimum 6 characters required' }),
})
