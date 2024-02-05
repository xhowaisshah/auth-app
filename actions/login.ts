"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Invalid Fields",
        }
    }

    return {
        success: true,
        message: "Login Successful",
    }
}