'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase' // Using your existing supabase client

// SVG Icon for Email Input
const EnvelopeIcon = () => (
    <svg className="w-4 h-4 text-purple-600" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
    </svg>
);

// SVG Icon for Password Input
const LockIcon = () => (
    <svg className="w-4 h-4 text-purple-600" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"></path>
    </svg>
);

// Icon for the button
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
  </svg>
);

// New component for the loading spinner
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


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
