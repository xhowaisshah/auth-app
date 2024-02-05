"use client";

import { useRouter } from "next/navigation";

interface LoginBtnProps {
    children: React.ReactNode;
    node?: "modal" | "redirect";
    asChild?: boolean;
    path?: string;
}

export const LoginButton = ({ children, node = "redirect", asChild, path }: LoginBtnProps) => {
    const router = useRouter();
    const onclick = () => {
        router.push(`/auth/${path}`);
    };

    if(node === "modal") {
        return (
            <span className="cursor-pointer">
                ToDo: impliment modal
            </span>
        )
    }
    return (
        <span className="cursor-pointer" onClick={onclick}>
            {children}
        </span>
    )
}