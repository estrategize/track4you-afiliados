'use client'

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar'; // Import the new Sidebar component
import { UserMinusIcon, UsersIcon, UserPlusIcon, UserCheckIcon } from '@/components/Icons';
import Link from 'next/link';

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

// --- Type definition for StatCard props ---
interface StatCardProps {
    title: string;
    icon: React.ReactNode;
    value: string;
    description: string;
    statusText: string;
    statusColor: string;
}

// --- STATS CARD COMPONENT ---
const StatCard: React.FC<StatCardProps> = ({ title, icon, value, description, statusText, statusColor }) => (
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
        <h3 className="text-2xl md:text-3xl mt-4 text-white font-bold">{value}</h3>
        <p className={`text-sm mt-2 ${statusColor}`}>{statusText}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
    </motion.div>
);


export default function DashboardPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            <Sidebar 
                activePage="dashboard"
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
                    <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats Cards */}
                    <StatCard 
                        title="Indicações Totais"
                        icon={<UsersIcon />}
                        value="1.200"
                        description="Desde o início"
                        statusText="Sem alteração"
                        statusColor="text-yellow-500"
                    />
                     <StatCard 
                        title="Novas Indicações"
                        icon={<UserPlusIcon />}
                        value="85"
                        description="Últimos 30 dias"
                        statusText="↗︎ 15%"
                        statusColor="text-green-500"
                    />
                     <StatCard 
                        title="Indicações Ativas"
                        icon={<UserCheckIcon />}
                        value="950"
                        description="Clientes pagantes"
                        statusText="Estável"
                        statusColor="text-blue-500"
                    />
                     <StatCard 
                        title="Indicações Inativas"
                        icon={<UserMinusIcon />}
                        value="24.5k"
                        description="Assinaturas canceladas"
                        statusText="↗︎ 20%"
                        statusColor="text-green-500"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sales Graph */}
                    <motion.div className="lg:col-span-2 card bg-slate-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
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
                    <motion.div className="card bg-slate-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <div className="card-body">
                            <h2 className="card-title text-white">Seu Saldo</h2>
                            <div className="space-y-4 mt-4">
                                <div className="card bg-gray-700/50">
                                    <div className="card-body p-4">
                                        <div className="text-sm text-gray-400">Saldo Total</div>
                                        <div className="text-2xl font-bold text-white">R$ 5.430,50</div>
                                    </div>
                                </div>
                                <div className="card bg-slate-700/50">
                                    <div className="card-body p-4">
                                        <div className="text-sm text-gray-400">Saldo Disponível</div>
                                        <div className="text-2xl font-bold text-green-400">R$ 2.150,00</div>
                                    </div>
                                </div>
                                <Link href="/wallet">
                                <button className="btn bg-purple-600 hover:bg-purple-700 border-none text-white w-full mt-2">Solicitar Saque </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Sales Table */}
                <motion.div className="mt-8 card bg-slate-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
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
