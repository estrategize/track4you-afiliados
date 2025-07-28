'use client'

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { UserIcon, LockIcon, UploadIcon } from '@/components/Icons';

export default function SettingsPage() {
    
    // State for "Informações" tab
    const [firstName, setFirstName] = useState('João');
    const [lastName, setLastName] = useState('Silva');
    const [phone, setPhone] = useState('(11) 99999-9999');
    const [pixKey, setPixKey] = useState('joao.silva@example.com');
    const [profilePic, setProfilePic] = useState('https://placehold.co/100x100/a855f7/ffffff.png?text=J');

    // State for "Segurança" tab
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePic(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const passwordsDoNotMatch = newPassword && confirmPassword && newPassword !== confirmPassword;
    const isPasswordFormValid = currentPassword.length > 0 && newPassword.length >= 8 && newPassword === confirmPassword;

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            <Sidebar 
                activePage="settings"
                userName="João Silva"
                userAvatarUrl={profilePic}
            />

            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>
                </motion.div>

                {/* --- Informações Section --- */}
                <motion.div
                    className="card bg-slate-800 shadow-xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="card-body p-6 md:p-8">
                        <h2 className="card-title text-white mb-6">
                            <UserIcon className="w-6 h-6 text-purple-400" />
                            Informações
                        </h2>
                        
                        {/* Profile Picture Section */}
                        <div className="flex flex-row items-center gap-6 mb-8">
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-purple-600 ring-offset-base-100 ring-offset-2">
                                    <Image src={profilePic} alt="Foto de Perfil" width={128} height={128} />
                                </div>
                            </div>
                            <label htmlFor="upload-button" className="btn btn-sm btn-outline border-gray-600 cursor-pointer">
                                <UploadIcon className="w-4 h-4 mr-2" /> Alterar Foto
                            </label>
                            <input type="file" id="upload-button" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="label"><span className="label-text text-gray-400">Nome</span></label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full bg-slate-700 border-slate-600" />
                            </div>
                            <div>
                                <label className="label"><span className="label-text text-gray-400">Sobrenome</span></label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full bg-slate-700 border-slate-600" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="label"><span className="label-text text-gray-400">Telefone</span></label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-bordered w-full bg-slate-700 border-slate-600" />
                            </div>
                                <div className="sm:col-span-2">
                                <label className="label"><span className="label-text text-gray-400">Chave Pix</span></label>
                                <input type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} className="input input-bordered w-full bg-slate-700 border-slate-600" />
                            </div>
                        </div>
                        
                        <div className="card-actions justify-start mt-8 border-t border-slate-700 pt-6">
                            <button className="btn bg-purple-600 hover:bg-purple-700 border-none text-white">Salvar Informações</button>
                        </div>
                    </div>
                </motion.div>

                {/* --- Segurança Section --- */}
                <motion.div
                    className="card bg-slate-800 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="card-body p-6 md:p-8">
                        <h2 className="card-title text-white mb-6">
                            <LockIcon className="w-6 h-6 text-purple-400" />
                            Segurança
                        </h2>
                        <div className="w-full mx-auto space-y-4">
                            <div>
                                <label className="label"><span className="label-text text-gray-400">Senha Atual</span></label>
                                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input input-bordered w-full bg-slate-700 border-slate-600" />
                            </div>
                            <div>
                                <label className="label"><span className="label-text text-gray-400">Nova Senha</span></label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input input-bordered w-full bg-slate-700 border-slate-600" />
                                <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
                            </div>
                            <div>
                                <label className="label"><span className="label-text text-gray-400">Confirmar Nova Senha</span></label>
                                <input 
                                    type="password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className={`input input-bordered w-full bg-slate-700 mb-1 border-slate-600 ${passwordsDoNotMatch ? '!border-red-500' : ''}`}
                                />
                                <div className="min-h-[1.5rem]"> 
                                    {passwordsDoNotMatch && <p className="text-xs text-red-500">As senhas não coincidem.</p>}
                                </div>
                            </div>
                        </div>
                        <div className="card-actions justify-start mt-1 border-t border-slate-700 pt-6">
                            <button className="btn bg-purple-600 hover:bg-purple-700 border-none text-white" disabled={!isPasswordFormValid}>Alterar Senha</button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
