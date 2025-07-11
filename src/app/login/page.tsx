'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase' // Using your existing supabase client

import { ArrowRightIcon, EnvelopeIcon, LockIcon, LoadingSpinner } from '@/components/Icons';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (signInError) {
            setError('E-mail ou senha inválidos.')
        } else {
            setMessage('Login bem-sucedido! Redirecionando...')
            router.push('/dashboard') // Redirect to a dashboard page
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Side (Branding) */}
            <div className="hidden lg:flex flex-col justify-between p-10 bg-black text-white lg:w-[45%] flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Image
                        src="/track4you/favicon-white.svg"
                        width={50}
                        height={50}
                        alt="Ícone Track4You"
                    />
                </div>
                <div className="flex flex-col justify-center items-center flex-grow text-center">
                    <Image 
                        src="/track4you/logo-white-horizontal.png" 
                        alt="Logo Track4You"
                        width={300}
                        height={80}
                        className="max-w-[220px]" 
                    />
                    <p className="text-lg text-white/70 mt-4 max-w-sm">
                        Bem-vindo ao Painel de Afiliados da Track4You
                    </p>
                </div>
                <div className="text-sm text-white/70">
                    <a href="#" className="mr-5 hover:text-white">Privacidade</a>
                    <a href="#" className="mr-5 hover:text-white">Termos de Serviço</a>
                    <a href="#" className="hover:text-white">FAQ</a>
                </div>
            </div>

            {/* Right Side (Form) */}
            <div className="w-full flex-grow flex items-center justify-center bg-slate-900 p-10">
                <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-10">
                    <h1 className="text-3xl text-purple-600 font-semibold mb-8">Bem-vindo de volta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5 relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <EnvelopeIcon />
                            </div>
                            <input 
                                id="email" 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" 
                                className="w-full pl-12 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 ring-1 ring-black"
                            />
                        </div>
                        <div className="mb-5 relative">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <LockIcon />
                            </div>
                            <input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Senha" 
                                className="w-full pl-12 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 ring-1 ring-black"
                            />
                        </div>

                        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                        {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

                        <button 
                            type="submit" 
                            className="w-full flex items-center justify-between bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-semibold text-base cursor-pointer disabled:bg-purple-400 disabled:cursor-not-allowed" 
                            disabled={loading || !email || !password}
                        >
                            <span>{loading ? 'Carregando...' : 'Log in'}</span>
                            {loading ? <LoadingSpinner /> : <ArrowRightIcon />}
                        </button>
                        <div className="flex items-center text-gray-500 text-sm my-8">
                            <div className="flex-grow h-px bg-gray-300 mr-4"></div>
                            OU
                            <div className="flex-grow h-px bg-gray-300 ml-4"></div>
                        </div>
                        <a href="#" className="block text-center text-purple-600 text-sm mb-5 hover:underline">
                            Resetar senha?
                        </a>
                        <div className="text-center mt-8 text-sm text-gray-700">
                            Não tem uma conta ainda?
                            <a className="text-purple-600 font-semibold hover:underline ml-1" href="/register">
                                Criar conta
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
