'use client' // Marca este componente para rodar no navegador

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Image from 'next/image' // Importamos o componente Image do Next.js

// Cria um cliente Supabase para usar no lado do cliente (navegador)
// As variáveis de ambiente precisam estar em um arquivo .env.local
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Um componente simples para um ícone de logo em SVG
const IconLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path>
    </svg>
);


export default function AuthPage() {
    // A lógica de estado permanece a mesma
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

    // A função de submit permanece a mesma
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

    // A partir daqui, a estrutura JSX é completamente nova
    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
            {/* Lado Esquerdo (Escuro) - Visível apenas em telas grandes */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-gray-900 text-white p-12 relative">
                {/* Logo no topo esquerdo */}
                <div className="absolute top-8 left-8">
                    <IconLogo className="h-8 w-8 text-blue-500" />
                </div>

                {/* Logo principal no centro */}
                <div className="flex flex-col items-center gap-4">
                     {/* IMPORTANTE: Substitua a URL abaixo pelo caminho da sua logo */}
                    <Image
                        src="/track4you/logo-horizontal-white.png"
                        width={300}
                        height={80}
                        alt="Logo da Empresa"
                        priority
                    />
                    <p className="text-lg text-gray-400 text-center max-w-sm">
                        Bem-vindo ao painel de afiliados. Acesse sua conta para começar.
                    </p>
                </div>

                <div className="absolute bottom-8 text-sm text-gray-500">
                    © {new Date().getFullYear()} Track4You. Todos os direitos reservados.
                </div>
            </div>

            {/* Lado Direito (Claro) - Onde fica o formulário */}
            <div className="bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLoginView ? 'Acesse sua Conta' : 'Crie sua Conta'}
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {isLoginView ? 'Bem-vindo de volta! Por favor, insira seus dados.' : 'Preencha os campos abaixo para se cadastrar.'}
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Campos de Cadastro (aparecem apenas na tela de cadastro) */}
                        {!isLoginView && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                        )}

                        {/* Campos Comuns */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        {!isLoginView && (
                             <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone (Opcional)</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        {/* Mensagens de Erro e Sucesso */}
                        {error && <p className="mb-4 text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>}
                        {message && <p className="mb-4 text-sm text-green-600 text-center bg-green-100 p-3 rounded-md">{message}</p>}

                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Cadastrar')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-blue-600 hover:underline">
                            {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
