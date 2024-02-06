"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid email or password",
        }
    }

    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await getUserByEmail(email);
    
    if(userExists) {
        return {
            error: "User already exists",
        }
    }
    
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return {
        success: "Registered successfully",
    }
}