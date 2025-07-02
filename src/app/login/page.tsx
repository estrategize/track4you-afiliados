'use client' // Marca este componente para rodar no navegador

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

// Cria um cliente Supabase para usar no lado do cliente (navegador)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
    // Estado para alternar entre as telas de Login e Cadastro
    const [isLoginView, setIsLoginView] = useState(true)
    
    // Estados para guardar os dados do formulário
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    // Estados para feedback ao usuário
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() // Previne o recarregamento da página
        setLoading(true)
        setError('')
        setMessage('')

        if (isLoginView) {
            // Lógica de LOGIN
            const result = await signIn('credentials', {
                redirect: false, // Não redireciona automaticamente
                email: email,
                password: password,
            })

            if (result?.error) {
                setError('E-mail ou senha inválidos.')
            } else {
                setMessage('Login bem-sucedido! Redirecionando...')
                // Redireciona para o painel após o login
                router.push('/dashboard') 
            }

        } else {
            // Lógica de CADASTRO
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
                // Limpa o formulário após o sucesso
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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    {isLoginView ? 'Acessar Painel' : 'Criar Conta de Afiliado'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Campos de Cadastro (aparecem apenas na tela de cadastro) */}
                    {!isLoginView && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Nome</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Sobrenome</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" />
                            </div>
                        </div>
                    )}

                    {/* Campos Comuns */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" />
                    </div>

                    {!isLoginView && (
                         <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300">Telefone</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" />
                        </div>
                    )}

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300">Senha</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" />
                    </div>

                    {/* Mensagens de Erro e Sucesso */}
                    {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
                    {message && <p className="mt-4 text-sm text-green-500 text-center">{message}</p>}

                    <div className="mt-6">
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500">
                            {loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Cadastrar')}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-blue-400 hover:underline">
                        {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                    </button>
                </div>
            </div>
        </div>
    )
}
