"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { redirect } from 'next/navigation'


const Apply = () => {

    return (
        
                <Button onClick={() => redirect("/loans")} className="w-full bg-white text-blue-700 hover:bg-blue-100 font-semibold text-lg py-3">
                    Apply Now
                </Button>
         

    )
}

export default Apply