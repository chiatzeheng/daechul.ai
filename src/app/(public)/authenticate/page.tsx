import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaGoogle } from 'react-icons/fa'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'
import AuthButton from './AuthButton'

const features = [
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Lightning Fast",
        description: "Get approved in minutes, not days"
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Secure & Safe",
        description: "Bank-level security for your data"
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: "Expert Support",
        description: "24/7 customer support team"
    }
]

export default function AuthenticatePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left Side - Marketing Content */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Welcome to{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Daechul.AI
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Transform your business mortgage experience with AI-powered underwriting. 
                                Get faster approvals, better rates, and complete transparency.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                                        <div className="text-blue-600">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
                            <p className="text-blue-100 mb-4">
                                Join thousands of businesses that have streamlined their mortgage process
                            </p>
                            <div className="flex items-center text-sm">
                                <span>✓ No hidden fees</span>
                                <span className="mx-4">✓ Quick approval</span>
                                <span>✓ Expert guidance</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Auth Form */}
                    <div className="flex justify-center">
                        <Card className="w-full max-w-md shadow-xl border-0">
                            <CardHeader className="text-center pb-8">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Sign in to your account
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Access your dashboard and manage your loan applications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <AuthButton />
                                
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        By signing in, you agree to our{' '}
                                        <a href="#" className="text-blue-600 hover:underline">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="text-blue-600 hover:underline">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}