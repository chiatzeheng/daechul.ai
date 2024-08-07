"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { redirect } from 'next/navigation'


const Apply = () => {

    return (
        <Card className="bg-gradient-to-br from-blue-500 to-pink-500 text-white shadow-xl border-0">
            <CardHeader>
                <CardTitle className="flex items-center text-2xl">

                    Apply for new loan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-lg">Get quick approval on your next loan!</p>
                <Button onClick={() => redirect("/loans")} className="w-full bg-white text-blue-700 hover:bg-blue-100 font-semibold text-lg py-3">
                    Apply Now
                </Button>
            </CardContent>
        </Card>

    )
}

export default Apply