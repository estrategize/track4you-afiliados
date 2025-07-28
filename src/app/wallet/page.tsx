'use client'

import { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { 
    WalletIcon as BalanceIcon, 
    CommissionIcon, 
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    WalletIcon,
} from '@/components/Icons';

// --- MOCK DATA ---
const paymentHistory = [
  { id: 'TX123456789', date: '2025-07-01', value: 1500.00, status: 'Concluído' },
  { id: 'TX987654321', date: '2025-06-01', value: 1250.50, status: 'Concluído' },
  { id: 'TX555666777', date: '2025-05-01', value: 1100.00, status: 'Concluído' },
  { id: 'TX333222111', date: '2025-04-01', value: 950.75, status: 'Concluído' },
  { id: 'TX999888777', date: '2025-03-01', value: 1320.00, status: 'Concluído' },
  { id: 'TX111222333', date: '2025-02-01', value: 1050.00, status: 'Concluído' },
  { id: 'TX444555666', date: '2025-01-15', value: 250.00, status: 'Pendente' },
  { id: 'TX777888999', date: '2025-01-01', value: 880.25, status: 'Concluído' },
  { id: 'TX121314151', date: '2024-12-01', value: 1600.00, status: 'Concluído' },
  { id: 'TX161718191', date: '2024-11-01', value: 750.00, status: 'Cancelado' },
  { id: 'TX202122232', date: '2024-10-01', value: 1900.50, status: 'Concluído' },
];


const commissionDeal = {
    description: "Você recebe o valor integral da primeira mensalidade do seu indicado e continua ganhando 20% sobre todos os pagamentos recorrentes que ele fizer."
};

// --- TYPE DEFINITIONS ---
type StatCardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
    isMain?: boolean;
};

type SortKey = 'date' | 'value' | 'status';
type SortOrder = 'asc' | 'desc';

// --- COMPONENTS ---
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, isMain = false }) => (
    <div className={`card shadow-lg ${isMain ? 'bg-purple-600 text-white' : 'bg-slate-800'}`}>
        <div className="card-body p-4 md:p-6">
            <div className="flex items-center justify-between">
                <span className={`text-sm md:text-base ${isMain ? 'text-purple-200' : 'text-gray-400'}`}>{title}</span>
                <div className={isMain ? 'text-white' : 'text-purple-500'}>{icon}</div>
            </div>
            <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
        </div>
    </div>
);

const Operator = ({ children }: { children: React.ReactNode }) => (
    <div className="hidden lg:flex items-center justify-center text-3xl font-bold text-slate-600">
        {children}
    </div>
);

const SortableHeader = ({ 
    sortKey, 
    children, 
    sortConfig, 
    requestSort 
}: { 
    sortKey: SortKey, 
    children: React.ReactNode,
    sortConfig: { key: SortKey; order: SortOrder } | null,
    requestSort: (key: SortKey) => void
}) => (
    <th onClick={() => requestSort(sortKey)} className="cursor-pointer">
        <div className="flex items-center gap-2">
            {children}
            {sortConfig?.key === sortKey && (
                sortConfig.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />
            )}
        </div>
    </th>
);


export default function WalletPage() {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder } | null>({ key: 'date', order: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const sortedHistory = useMemo(() => {
        const sorted = [...paymentHistory];
        if (sortConfig !== null) {
            sorted.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.order === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.order === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sorted;
    }, [sortConfig]);
    
    const totalPages = Math.ceil(sortedHistory.length / rowsPerPage);
    const currentRows = sortedHistory.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const requestSort = (key: SortKey) => {
        let order: SortOrder = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            <Sidebar 
                activePage="financeiro"
                userName="João Silva"
                userAvatarUrl="https://placehold.co/100x100/a855f7/ffffff.png?text=J"
            />

            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-8">Financeiro</h1>
                </motion.div>

                {/* --- Balance Cards --- */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 mb-8 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <StatCard 
                        title="Saldo Disponível"
                        value="R$ 2.150,00"
                        icon={<BalanceIcon className="h-8 w-8" />}
                        isMain={true}
                    />
                    <Operator>=</Operator>
                    <StatCard 
                        title="Comissões (Total)"
                        value="R$ 5.430,50"
                        icon={<CommissionIcon className="h-8 w-8" />}
                    />
                    <Operator>-</Operator>
                    <StatCard 
                        title="Saldo Pendente"
                        value="R$ 350,00"
                        icon={<WalletIcon className="h-8 w-8" />}
                    />
                     <Operator>-</Operator>
                    <StatCard 
                        title="Saques (Total)"
                        value="R$ 3.280,50"
                        icon={<CheckIcon className="h-8 w-8" />}
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Commission Deal & Withdraw --- */}
                    <motion.div 
                        className="lg:col-span-1 card bg-slate-800 shadow-2xl flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="card-body flex-grow p-6">
                            <h2 className="card-title text-white text-lg">
                                <CommissionIcon className="h-6 w-6 text-purple-400" />
                                Acordo de Comissionamento
                            </h2>
                            <div className="mt-6 text-center flex-grow flex flex-col items-center justify-center">
                                <div className="flex items-baseline justify-center gap-4">
                                     <div className="text-center">
                                        <p className="text-5xl font-bold text-purple-400">100%</p>
                                        <p className="text-sm text-gray-400">na 1ª mensalidade</p>
                                    </div>
                                    <p className="text-4xl font-light text-slate-500">+</p>
                                    <div className="text-center">
                                        <p className="text-5xl font-bold text-purple-400">20%</p>
                                        <p className="text-sm text-gray-400">na recorrência</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 mt-6 text-sm max-w-xs mx-auto">
                                    {commissionDeal.description}
                                </p>
                                <div className="mt-4 text-xs text-slate-500 space-y-1">
                                    <p>Saque mínimo: R$ 200,00</p>
                                    <p>Máximo 1 saque por semana</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-actions p-6 pt-0 mt-4">
                            <button className="btn bg-purple-600 hover:bg-purple-700 border-none text-white w-full">
                                Efetuar Saque
                            </button>
                        </div>
                    </motion.div>

                    {/* --- Payment History --- */}
                    <motion.div 
                        className="lg:col-span-2 card bg-slate-800 shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="card-body">
                            <h2 className="card-title text-white mb-4">Histórico de Pagamentos</h2>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr className="text-gray-400 border-b border-gray-700">
                                            <SortableHeader sortKey="date" sortConfig={sortConfig} requestSort={requestSort}>Data</SortableHeader>
                                            <SortableHeader sortKey="value" sortConfig={sortConfig} requestSort={requestSort}>Valor</SortableHeader>
                                            <SortableHeader sortKey="status" sortConfig={sortConfig} requestSort={requestSort}>Status</SortableHeader>
                                            <th>ID da Transação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRows.map(payment => (
                                            <tr key={payment.id} className="hover:bg-gray-700/50 border-b border-gray-700/50">
                                                <td>{new Date(payment.date).toLocaleDateString('pt-BR')}</td>
                                                <td className="font-semibold text-green-400">R$ {payment.value.toFixed(2).replace('.', ',')}</td>
                                                <td>
                                                    <span className={`badge badge-sm ${
                                                        payment.status === 'Concluído' ? 'badge-success' :
                                                        payment.status === 'Pendente' ? 'badge-warning' :
                                                        payment.status === 'Cancelado' ? 'badge-error' :
                                                        'badge-ghost'
                                                    }`}>{payment.status}</span>
                                                </td>
                                                <td className="text-gray-500 text-xs">{payment.id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                             <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-400">Página {currentPage} de {totalPages}</span>
                                <div className="join">
                                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="join-item btn btn-sm">«</button>
                                    <button className="join-item btn btn-sm">Página {currentPage}</button>
                                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="join-item btn btn-sm">»</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
