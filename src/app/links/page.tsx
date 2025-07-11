'use client'

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar'; // Import the Sidebar component
import { motion } from 'framer-motion';
import { CopyIcon, CheckIcon, LinkIcon } from '@/components/Icons';

export default function LinksPage() {
    const affiliateCode = 'JOAOSILVA123'; // This would likely come from user data
    
    const [utmSource, setUtmSource] = useState('');
    const [utmMedium, setUtmMedium] = useState('');
    const [utmCampaign, setUtmCampaign] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState(`https://landing.track4you.app/aff?utm_origin=${affiliateCode}`);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('utm_origin', affiliateCode);
        if (utmSource) params.set('utm_source', utmSource.trim());
        if (utmMedium) params.set('utm_medium', utmMedium.trim());
        if (utmCampaign) params.set('utm_campaign', utmCampaign.trim());
        
        setGeneratedUrl(`https://landing.track4you.app/aff?${params.toString()}`);
    }, [utmSource, utmMedium, utmCampaign, affiliateCode]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    
    const resetUTM = () => {
        setUtmSource('');
        setUtmMedium('');
        setUtmCampaign('');
    }

    const handleUtmInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        // Sanitize the input to allow only letters, numbers, underscore, and hyphen
        const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '');
        setter(sanitizedValue);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            <Sidebar 
                activePage="links"
                userName="João Silva"
                userAvatarUrl="https://placehold.co/100x100/a855f7/ffffff.png?text=J"
            />

            {/* --- Main Content --- */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-white">Meus Links de Afiliado</h1>
                    <p className="text-gray-400 mt-2">Crie e gerencie seus links de campanha para rastrear suas indicações.</p>
                </motion.div>

                <motion.div 
                    className="mt-8 bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Top Section - Generated Link */}
                    <div className="p-6 border-b border-slate-700">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-600/20 p-3 rounded-lg">
                                <LinkIcon />
                            </div>
                            <div>
                                <h2 className="font-semibold text-white">Seu Link de Afiliado</h2>
                                <p className="text-gray-400 text-sm">Este é o seu link principal com os parâmetros UTM.</p>
                            </div>
                        </div>
                        <div className="form-control mt-4">
                            <div className="join w-full">
                                <input type="text" readOnly value={generatedUrl} className="input join-item w-full bg-slate-700 text-gray-300 focus:outline-none" />
                                <button className="btn join-item bg-purple-600 hover:bg-purple-700 border-none w-32" onClick={handleCopy}>
                                    {copied ? <CheckIcon /> : <CopyIcon />}
                                    <span className="ml-2">{copied ? 'Copiado!' : 'Copiar'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - UTM Builder */}
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-white">Construtor de Link UTM</h3>
                            <button onClick={resetUTM} className="btn btn-ghost btn-sm text-gray-400 hover:bg-slate-700">Resetar</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-gray-400">Origem (utm_source)</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="ex: facebook" 
                                    className="input input-bordered w-full bg-slate-700 border-slate-600 focus:ring-purple-500 focus:border-purple-500"
                                    value={utmSource}
                                    onChange={(e) => handleUtmInputChange(e, setUtmSource)}
                                />
                            </div>
                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-gray-400">Mídia (utm_medium)</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="ex: cpc" 
                                    className="input input-bordered w-full bg-slate-700 border-slate-600 focus:ring-purple-500 focus:border-purple-500"
                                    value={utmMedium}
                                    onChange={(e) => handleUtmInputChange(e, setUtmMedium)}
                                />
                            </div>
                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-gray-400">Campanha (utm_campaign)</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="ex: promocao_julho" 
                                    className="input input-bordered w-full bg-slate-700 border-slate-600 focus:ring-purple-500 focus:border-purple-500"
                                    value={utmCampaign}
                                    onChange={(e) => handleUtmInputChange(e, setUtmCampaign)}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
