'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase' // Using your existing supabase client

// --- SVG Icons ---

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const validateEmail = (emailInput: string) => {
        if (!emailInput) {
            setEmailError('');
            return true;
        }
        if (emailInput.endsWith('.con')) {
            setEmailError('Você quis dizer .com?');
            return false;
        }
        if (!emailRegex.test(emailInput)) {
            setEmailError('Formato de e-mail inválido.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };
    
    const isFormValid = 
        firstName && 
        lastName && 
        email && 
        !emailError &&
        phone && 
        password && 
        confirmPassword && 
        password === confirmPassword && 
        password.length >= 8;

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove all non-digits
        value = value.substring(0, 11); // Limit to 11 digits
        
        let maskedValue = "";
        if (value.length > 0) {
            maskedValue = `(${value.substring(0, 2)}`;
        }
        if (value.length > 2) {
            maskedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}`;
        }
        if (value.length > 7) {
            maskedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        }
        setPhone(maskedValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setError('Por favor, corrija os erros no formulário.');
            return;
        }

        if (password.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            setError('Por favor, insira um número de telefone válido.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
        } else {
            setMessage('Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.');
            // Optionally redirect or clear form
        }
        setLoading(false);
    };

    const passwordsDoNotMatch = confirmPassword && password !== confirmPassword;

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Side (Branding) */}
            <div className="hidden lg:flex flex-col justify-between p-10 bg-black text-white lg:w-[45%] flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Image src="/track4you/favicon-white.svg" width={50} height={50} alt="Ícone Track4You" />
                </div>
                <div className="flex flex-col justify-center items-center flex-grow text-center">
                    <Image src="/track4you/logo-white-horizontal.png" alt="Logo Track4You" width={300} height={80} className="max-w-[220px]" />
                    <p className="text-lg text-white/70 mt-4 max-w-sm">Bem-vindo ao Painel de Afiliados da Track4You</p>
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
                    <h1 className="text-3xl text-purple-600 font-semibold mb-8">Crie sua Conta</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="João" className="w-full px-4 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 shadow-sm border border-gray-300" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                                <input id="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Silva" className="w-full px-4 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 shadow-sm border border-gray-300" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <input 
                                id="email" 
                                type="email" 
                                required 
                                value={email} 
                                onChange={handleEmailChange} 
                                placeholder="joao@gmail.com" 
                                className={`w-full px-4 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 shadow-sm border ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <input id="phone" type="tel" required value={phone} onChange={handlePhoneChange} placeholder="(11) 99999-9999" maxLength={15} className="w-full px-4 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 shadow-sm border border-gray-300" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 shadow-sm border border-gray-300" />
                            <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                            <input 
                                id="confirmPassword" 
                                type="password" 
                                required 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="••••••••" 
                                className={`w-full px-4 py-3 bg-[#f5f7fa] rounded-md text-base focus:outline-none focus:bg-[#eef1f6] focus:ring-2 focus:ring-purple-200 text-purple-600 shadow-sm border ${passwordsDoNotMatch ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}

                        <button type="submit" className="w-full flex items-center justify-between bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-semibold text-base cursor-pointer disabled:bg-purple-400 disabled:cursor-not-allowed mt-6" disabled={loading || !isFormValid}>
                            <span>{loading ? 'Carregando...' : 'Criar Conta'}</span>
                            {loading ? <LoadingSpinner /> : <ArrowRightIcon />}
                        </button>
                        
                        <div className="text-center mt-8 text-sm text-gray-700">
                            Já tem uma conta?
                            <a className="text-purple-600 font-semibold hover:underline ml-1" href="/login">
                                Faça Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
