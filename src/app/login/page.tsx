'use client' 

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button' 

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
    const [isLoginView, setIsLoginView] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
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

        if (isLoginView) {
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
        } else {
            const fullName = `${firstName} ${lastName}`.trim()
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        full_name: fullName,
                        phone: phone
                    }
                }
            })

            if (signUpError) {
                setError(signUpError.message)
            } else if (data.user) {
                setMessage('Cadastro realizado! Por favor, verifique seu e-mail para confirmar a conta.')
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setPassword('')
            }
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Lado Esquerdo (Branding) */}
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

            {/* Lado Direito (Formulário) */}
            <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-card-foreground mb-2">
                        {isLoginView ? 'Acesse sua Conta' : 'Crie sua Conta'}
                    </h2>
                    <p className="text-card-muted-foreground mb-8">
                        {isLoginView ? 'Bem-vindo de volta!' : 'Preencha os campos para se cadastrar.'}
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginView && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-card-muted-foreground mb-1">Nome</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-card-muted-foreground mb-1">Sobrenome</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                        </div>

                        {!isLoginView && (
                             <div>
                                <label className="block text-sm font-medium text-card-muted-foreground mb-1">Telefone (Opcional)</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Senha</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground" />
                        </div>

                        {error && <p className="text-sm bg-destructive-subtle text-destructive-subtle-foreground p-3 rounded-md">{error}</p>}
                        {message && <p className="text-sm bg-success/20 text-success p-3 rounded-md">{message}</p>}

                        <div>
                            <Button type="submit" disabled={loading} variant="accent" className="w-full justify-between">
                                <span>{loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Cadastrar')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Button variant="link" onClick={() => setIsLoginView(!isLoginView)}>
                            {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
