"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { features } from '@/lib/constants';


export default function SplashPage() {

    return (
        <div className="bg-white h-screen text-black p-8 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full"
            >
                <h1 className=" text-6xl font-bold mb-6 text-center
            text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">Daechul.AI</h1>
                <p> We simplify the loan application process for Applicants & Stakeholders in the financial industry</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-1 shadow-lg border-black hover:bg-black hover:text-white transition-colors duration-300">
                                <CardContent className="p-6">
                                    <div className="text-4xl mb-4">{feature.emoji}</div>
                                    <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                                    <p className="text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href="/authenticate">
                        <Button className="bg-black text-white hover:bg-white hover:text-black text-lg py-6 px-12 transition-colors duration-300">
                            Ready?
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}