"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { LoadingSpinner } from '@/components/ui/loading'

export default function AuthButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn('google', { callbackUrl: "/dashboard" })
        } catch (error) {
            console.error('Sign in error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
            {isLoading ? (
                <LoadingSpinner size="sm" className="mr-2" />
            ) : (
                <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
        </Button>
    )
}