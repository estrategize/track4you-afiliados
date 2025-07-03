'use client' 

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button' 
import CustomSelect, { type SelectOption } from '@/components/ui/CustomSelect'
import { Input } from '@/components/ui/Input' // Import the new Input component
import * as countryCodes from 'country-codes-list'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function countryCodeToFlag(isoCode: string): string {
    const OFFSET = 127397;
    if (typeof isoCode !== 'string' || isoCode.length !== 2) {
        return '🌐';
    }
    const codePoints = [...isoCode.toUpperCase()].map(char => char.charCodeAt(0) + OFFSET);
    return String.fromCodePoint(...codePoints);
}

const commonCountryISOs = [
  'BR', 'US', 'PT', 'AR', 'ES', 'MX', 'CO', 'CL', 'PE', 'GB', 'DE', 
  'FR', 'IT', 'CA', 'AU', 'JP', 'CN', 'IN', 'ZA', 'AO', 'CH', 'NL'
];

const priorityMap: { [key: string]: string } = {
  '+1': 'US',
};

const countryOptionsMap = new Map<string, SelectOption>();
const commonCountries = countryCodes.all().filter(country => 
    commonCountryISOs.includes(country.countryCode)
);

commonCountries.forEach(country => {
  const callingCode = `+${country.countryCallingCode}`;
  const isoCode = country.countryCode;

  if (!countryOptionsMap.has(callingCode)) {
    countryOptionsMap.set(callingCode, { value: callingCode, label: `${countryCodeToFlag(isoCode)} ${callingCode}` });
  } 
  else if (priorityMap[callingCode] === isoCode) {
    countryOptionsMap.set(callingCode, { value: callingCode, label: `${countryCodeToFlag(isoCode)} ${callingCode}` });
  }
});

const allCountryData: SelectOption[] = Array.from(countryOptionsMap.values())
  .sort((a, b) => parseInt(a.value.substring(1)) - parseInt(b.value.substring(1)));

const brazilIndex = allCountryData.findIndex(c => c.value === '+55');
if (brazilIndex > -1) {
    const brazil = allCountryData.splice(brazilIndex, 1)[0];
    allCountryData.unshift(brazil);
}

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [countryCode, setCountryCode] = useState('+55');
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const fullName = `${firstName} ${lastName}`.trim()
        const fullPhoneNumber = `${countryCode}${phone}`

        const { data, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { first_name: firstName, last_name: lastName, full_name: fullName, phone: fullPhoneNumber }
            }
        })

        if (signUpError) {
            setError(signUpError.message)
        } else if (data.user) {
            setMessage('Cadastro realizado! Por favor, verifique seu e-mail para confirmar a conta.')
            setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setPassword('');
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background">
            <div className="hidden lg:flex flex-col items-center justify-center p-12 relative">
                <div className="absolute top-8 left-8"><Image src="/track4you/favicon-white.svg" width={32} height={32} alt="Ícone Track4You" /></div>
                <div className="flex flex-col items-center gap-4">
                    <Image src="/track4you/logo-horizontal-white.png" width={300} height={80} alt="Logo da Track4You" priority />
                    <p className="text-lg text-foreground/70 text-center max-w-sm">Crie sua conta para se tornar um afiliado e começar a lucrar.</p>
                </div>
                <div className="absolute bottom-8 text-sm text-foreground/50">© {new Date().getFullYear()} Track4You. Todos os direitos reservados.</div>
            </div>
            <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-card-foreground mb-2">Crie sua Conta</h2>
                    <p className="text-card-muted-foreground mb-8">Preencha os campos para se cadastrar.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-card-muted-foreground mb-1">Nome</label>
                                <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-muted-foreground mb-1">Sobrenome</label>
                                <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Email</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Telefone</label>
                            <div className="flex items-center gap-2">
                                <CustomSelect 
                                    className="w-32 flex-shrink-0"
                                    options={allCountryData}
                                    value={countryCode}
                                    onChange={setCountryCode}
                                    dropdownClassName="max-h-60 overflow-y-auto custom-scrollbar"
                                />
                                <Input 
                                    type="tel" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    required
                                    mask="(99) 99999-9999" // Apply the phone mask here
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-card-muted-foreground mb-1">Senha</label>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error && <p className="text-sm bg-destructive-subtle text-destructive-subtle-foreground p-3 rounded-md">{error}</p>}
                        {message && <p className="text-sm bg-success/20 text-success p-3 rounded-md">{message}</p>}
                        <div>
                            <Button type="submit" disabled={loading} variant="accent" className="w-full justify-between">
                                <span className="font-bold">{loading ? 'Criando conta...' : 'Cadastrar'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6 text-center text-sm"> Já tem uma conta? 
                        <Link href="/login" className="text-sm ml-1 font-bold text-accent hover:underline">Faça login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
