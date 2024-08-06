"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface LoanProps {
    loan: {
        name: string;
        amount: number;
        progress: number;
    };
}

export default function LoanCardComponent({ loan }: LoanProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-gray-700 hover:bg-gray-600 transition-colors border-0 shadow-md">
                <CardContent className="p-4">
                    <motion.div
                        className="flex justify-between items-center mb-2"
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-semibold text-lg">{loan.name}</h3>
                        <motion.span
                            className="text-sm bg-gray-800 px-2 py-1 rounded-full"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ${loan.amount.toLocaleString()}
                        </motion.span>
                    </motion.div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Progress value={loan.progress} className="h-2 bg-gray-500" />
                    </motion.div>
                    <motion.p
                        className="text-right text-sm mt-1 text-blue-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {loan.progress}% paid
                    </motion.p>
                </CardContent>
            </Card>
        </motion.div>
    );
}