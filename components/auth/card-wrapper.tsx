"use Client";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/soacial";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonPath: string;
    showSocialLogin?: boolean;
}

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonPath, showSocialLogin }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {showSocialLogin && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} path={backButtonPath}/>
            </CardFooter>
        </Card>
    )
}