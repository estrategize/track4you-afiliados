'use client' 

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link' // Import the Link component
import { Button } from '@/components/ui/Button' 

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

        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })

        if (result?.error) {
            setError('E-mail ou senha inválidos.')
        } else {
            setMessage('Login bem-sucedido! Redirecionando...')
            router.push('/dashboard') 
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Left Side (Branding) */}
            <div className="hidden lg:flex flex-col items-center justify-center p-12 relative">
                <div className="absolute top-8 left-8">
                    <Image
                        src="/track4you/favicon-white.svg"
                        width={32}
                        height={32}
                        alt="Ícone Track4You"
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Image
                        src="/track4you/logo-horizontal-white.png"
                        width={300}
                        height={80}
                        alt="Logo da Track4You"
                        priority
                    />
                    <p className="text-lg text-foreground/70 text-center max-w-sm">
                        Bem-vindo ao painel de afiliados. Acesse sua conta para começar.
                    </p>
                </div>
                <div className="absolute bottom-8 text-sm text-foreground/50">
                    © {new Date().getFullYear()} Track4You. Todos os direitos reservados.
                </div>
            </div>

            {/* Right Side (Form) */}
            <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-card-foreground mb-2">
                        Acesse sua Conta
                    </h2>
                    <p className="text-card-muted-foreground mb-8">
                        Bem-vindo de volta!
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Senha</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                        </div>

                        {error && <p className="text-sm bg-destructive-subtle text-destructive-subtle-foreground p-3 rounded-md">{error}</p>}
                        {message && <p className="text-sm bg-success/20 text-success p-3 rounded-md">{message}</p>}

                        <div>
                            <Button type="submit" disabled={loading} variant="accent" className="w-full justify-between">
                                <span className="font-bold">{loading ? 'Carregando...' : 'Log-in'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                </svg>
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center"> Não tem uma conta ainda? 
                        <Link href="/register" className="text-sm font-bold ml-1 text-accent hover:underline">
                            Criar conta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
