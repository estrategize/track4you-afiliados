'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const salesData = [
  { name: 'Jan', Vendas: 4000 },
  { name: 'Fev', Vendas: 3000 },
  { name: 'Mar', Vendas: 5000 },
  { name: 'Abr', Vendas: 4500 },
  { name: 'Mai', Vendas: 6000 },
  { name: 'Jun', Vendas: 5500 },
  { name: 'Jul', Vendas: 7000 },
];

const recentSales = [
  { id: 1, product: 'Plano Básico', date: '07/07/2025', customer: 'joao.silva@example.com', value: 'R$ 49,90', status: 'Completo' },
  { id: 2, product: 'Plano Pro', date: '06/07/2025', customer: 'maria.santos@example.com', value: 'R$ 99,90', status: 'Completo' },
  { id: 3, product: 'Plano Básico', date: '06/07/2025', customer: 'carlos.pereira@example.com', value: 'R$ 49,90', status: 'Pendente' },
  { id: 4, product: 'Plano Premium', date: '05/07/2025', customer: 'ana.costa@example.com', value: 'R$ 149,90', status: 'Completo' },
  { id: 5, product: 'Plano Básico', date: '04/07/2025', customer: 'pedro.almeida@example.com', value: 'R$ 49,90', status: 'Cancelado' },
];

// --- SVG ICONS ---
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 stroke-current text-purple-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 stroke-current text-purple-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 stroke-current text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 stroke-current text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// --- Type definition for StatCard props ---
interface StatCardProps {
    title: string;
    icon: React.ReactNode;
    value: string;
    statusText: string;
    statusColor: string;
    progress: string;
    progressText: string;
    progressValue: string;
}

// --- NEW STATS CARD COMPONENT ---
const StatCard: React.FC<StatCardProps> = ({ title, icon, value, statusText, statusColor, progress, progressText, progressValue }) => (
    <motion.div 
        className="bg-slate-800 p-4 md:p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
    >
        <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm md:text-base">{title}</span>
            {icon}
        </div>
        <h3 className="text-2xl md:text-3xl mt-4 text-white font-black">{value}</h3>
        <p className={`text-sm ${statusColor}`}>{statusText}</p>
        <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">{progressText}</span>
                <span className="text-white text-sm font-medium">{progressValue}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1.5">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    </motion.div>
);


export default function DashboardPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            {/* --- Lateral Menu --- */}
            <aside className="w-64 bg-gray-800 text-gray-300 flex-col hidden lg:flex">
                <div className="p-4 flex items-center justify-center h-20">
                    <Image src="/track4you/logo-white-horizontal.png" width={150} height={40} alt="Track4You Logo"/>
                </div>
                <ul className="menu p-4 flex-grow space-y-2">
                    <li className="menu-title"><span className="text-gray-500">Menu</span></li>
                    <li><a className="bg-purple-600/20 text-purple-400 rounded-lg"><DashboardIcon/> Dashboard</a></li>
                    <li><a className="hover:bg-gray-700/50 rounded-lg"><LinkIcon/> Meus Links</a></li>
                    <li><a className="hover:bg-gray-700/50 rounded-lg"><WalletIcon/> Financeiro</a></li>
                </ul>
                <div className="p-4 border-t border-gray-700">
                     <div className="dropdown dropdown-top w-full">
                        <div tabIndex={0} role="button" className="btn btn-ghost w-full justify-start p-2 h-auto">
                            <div className="avatar">
                                <div className="w-10 rounded-full ring ring-purple-600 ring-offset-gray-800 ring-offset-2">
                                    <img src="https://placehold.co/100x100/a855f7/ffffff.png?text=J" alt="Avatar do usuário" />
                                </div>
                            </div>
                            <span className="ml-2">João Silva</span>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-700 rounded-box w-52 mb-2">
                            <li><a><SettingsIcon /> Configurações</a></li>
                            <li><a>Sair</a></li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats Cards */}
                    <StatCard 
                        title="Indicações Totais"
                        icon={<UsersIcon />}
                        value="1,200"
                        statusText="Sem alteração"
                        statusColor="text-yellow-500"
                        progress="75"
                        progressText="Conversão geral"
                        progressValue="75%"
                    />
                     <StatCard 
                        title="Novas Indicações"
                        icon={<UserPlusIcon />}
                        value="85"
                        statusText="↗︎ 15%"
                        statusColor="text-green-500"
                        progress="15"
                        progressText="Meta mensal"
                        progressValue="15%"
                    />
                     <StatCard 
                        title="Indicações Ativas"
                        icon={<UserCheckIcon />}
                        value="950"
                        statusText="Estável"
                        statusColor="text-blue-500"
                        progress="95"
                        progressText="Retenção"
                        progressValue="95%"
                    />
                     <StatCard 
                        title="Pageviews"
                        icon={<EyeIcon />}
                        value="24.5k"
                        statusText="↗︎ 20%"
                        statusColor="text-green-500"
                        progress="80"
                        progressText="Engajamento"
                        progressValue="80%"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sales Graph */}
                    <motion.div className="lg:col-span-2 card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <div className="card-body">
                            <h2 className="card-title text-white">Desempenho de Vendas</h2>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                        <XAxis dataKey="name" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="Vendas" stroke="#9333ea" strokeWidth={2} activeDot={{ r: 8 }} dot={{r: 4, fill: '#9333ea'}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Balance Card */}
                    <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <div className="card-body">
                            <h2 className="card-title text-white">Seu Saldo</h2>
                            <div className="space-y-4 mt-4">
                                <div className="card bg-gray-700/50">
                                    <div className="card-body p-4">
                                        <div className="text-sm text-gray-400">Saldo Total</div>
                                        <div className="text-2xl font-bold text-white">R$ 5.430,50</div>
                                    </div>
                                </div>
                                <div className="card bg-gray-700/50">
                                    <div className="card-body p-4">
                                        <div className="text-sm text-gray-400">Saldo Disponível</div>
                                        <div className="text-2xl font-bold text-green-400">R$ 2.150,00</div>
                                    </div>
                                </div>
                                <button className="btn bg-purple-600 hover:bg-purple-700 border-none text-white w-full mt-2">Solicitar Saque</button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Sales Table */}
                <motion.div className="mt-8 card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                     <div className="card-body">
                        <h2 className="card-title mb-4 text-white">Vendas Recentes</h2>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr className="text-gray-400 border-b border-gray-700">
                                        <th>Produto</th>
                                        <th>Data</th>
                                        <th>Cliente</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSales.map(sale => (
                                        <tr key={sale.id} className="hover:bg-gray-700/50 border-b border-gray-700/50">
                                            <td>{sale.product}</td>
                                            <td>{sale.date}</td>
                                            <td>{sale.customer}</td>
                                            <td>{sale.value}</td>
                                            <td>
                                                <span className={`badge badge-sm ${
                                                    sale.status === 'Completo' ? 'badge-success' :
                                                    sale.status === 'Pendente' ? 'badge-warning' :
                                                    'badge-error'
                                                }`}>{sale.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
