"use client";

import { Button } from "@/components/ui/button";
import  Link  from "next/link";

interface BackButtonProps {
    label: string;
    path: string;
}
export const BackButton = ({ label, path }: BackButtonProps) => {
    return (
        <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
            <Link href={path}>{label}</Link>
        </Button>
    )
}