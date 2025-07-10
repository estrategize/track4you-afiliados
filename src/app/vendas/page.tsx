'use client'

import { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- MOCK DATA ---
const allSales = [
  { id: 1, date: '2025-07-07', product: 'Plano Básico', customer: 'joao.silva@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'facebook', utm_medium: 'cpc', utm_campaign: 'promo_julho' },
  { id: 2, date: '2025-07-06', product: 'Plano Pro', customer: 'maria.santos@example.com', value: 99.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'google', utm_medium: 'organic', utm_campaign: 'verao' },
  { id: 3, date: '2025-06-25', product: 'Plano Básico', customer: 'carlos.pereira@example.com', value: 49.90, monthly_payment: '2ª', status: 'Pendente', utm_source: 'facebook', utm_medium: 'cpc', utm_campaign: 'promo_junho' },
  { id: 4, date: '2025-06-15', product: 'Plano Premium', customer: 'ana.costa@example.com', value: 149.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'instagram', utm_medium: 'stories', utm_campaign: 'verao' },
  { id: 5, date: '2025-05-30', product: 'Plano Básico', customer: 'pedro.almeida@example.com', value: 49.90, monthly_payment: '3ª', status: 'Cancelado', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'promo_maio' },
  { id: 6, date: '2025-07-01', product: 'Plano Pro', customer: 'lucia.fernandes@example.com', value: 99.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'facebook', utm_medium: 'cpc', utm_campaign: 'promo_julho' },
  { id: 7, date: '2025-07-08', product: 'Plano Básico', customer: 'fernando.gomes@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'google', utm_medium: 'organic', utm_campaign: 'geral' },
  { id: 8, date: '2025-07-09', product: 'Plano Premium', customer: 'beatriz.lima@example.com', value: 149.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'instagram', utm_medium: 'reels', utm_campaign: 'verao' },
  { id: 9, date: '2025-07-02', product: 'Plano Básico', customer: 'rodrigo.melo@example.com', value: 49.90, monthly_payment: '1ª', status: 'Pendente', utm_source: 'facebook', utm_medium: 'ads', utm_campaign: 'promo_julho' },
  { id: 10, date: '2025-06-28', product: 'Plano Pro', customer: 'camila.rocha@example.com', value: 99.90, monthly_payment: '2ª', status: 'Completo', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'geral' },
  { id: 11, date: '2025-06-20', product: 'Plano Básico', customer: 'bruno.souza@example.com', value: 49.90, monthly_payment: '1ª', status: 'Cancelado', utm_source: 'tiktok', utm_medium: 'video', utm_campaign: 'verao' },
  { id: 12, date: '2025-07-10', product: 'Plano Pro', customer: 'gabriela.costa@example.com', value: 99.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'facebook', utm_medium: 'organic', utm_campaign: 'geral' },
  { id: 13, date: '2025-07-05', product: 'Plano Premium', customer: 'daniel.martins@example.com', value: 149.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'promo_julho' },
  { id: 14, date: '2025-07-03', product: 'Plano Básico', customer: 'larissa.oliveira@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'instagram', utm_medium: 'stories', utm_campaign: 'verao' },
  { id: 15, date: '2025-06-10', product: 'Plano Pro', customer: 'marcelo.alves@example.com', value: 99.90, monthly_payment: '3ª', status: 'Completo', utm_source: 'google', utm_medium: 'organic', utm_campaign: 'geral' },
  { id: 16, date: '2025-06-05', product: 'Plano Básico', customer: 'patricia.ribeiro@example.com', value: 49.90, monthly_payment: '2ª', status: 'Pendente', utm_source: 'facebook', utm_medium: 'cpc', utm_campaign: 'promo_junho' },
  { id: 17, date: '2025-07-11', product: 'Plano Premium', customer: 'ricardo.ferreira@example.com', value: 149.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'promo_julho' },
  { id: 18, date: '2025-07-12', product: 'Plano Básico', customer: 'sandra.carvalho@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'tiktok', utm_medium: 'video', utm_campaign: 'verao' },
  { id: 19, date: '2025-07-04', product: 'Plano Pro', customer: 'tiago.santos@example.com', value: 99.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'facebook', utm_medium: 'ads', utm_campaign: 'promo_julho' },
  { id: 20, date: '2025-06-18', product: 'Plano Básico', customer: 'vanessa.lima@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'instagram', utm_medium: 'reels', utm_campaign: 'verao' },
  { id: 21, date: '2025-06-12', product: 'Plano Premium', customer: 'wagner.moraes@example.com', value: 149.90, monthly_payment: '2ª', status: 'Cancelado', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'promo_junho' },
  { id: 22, date: '2025-07-13', product: 'Plano Básico', customer: 'yasmin.goncalves@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'facebook', utm_medium: 'organic', utm_campaign: 'geral' },
  { id: 23, date: '2025-07-14', product: 'Plano Pro', customer: 'zeca.pereira@example.com', value: 99.90, monthly_payment: '1ª', status: 'Pendente', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'promo_julho' },
  { id: 24, date: '2025-06-01', product: 'Plano Básico', customer: 'andreia.barbosa@example.com', value: 49.90, monthly_payment: '3ª', status: 'Completo', utm_source: 'instagram', utm_medium: 'stories', utm_campaign: 'verao' },
  { id: 25, date: '2025-05-20', product: 'Plano Premium', customer: 'bruna.castro@example.com', value: 149.90, monthly_payment: '4ª', status: 'Completo', utm_source: 'google', utm_medium: 'organic', utm_campaign: 'geral' },
  { id: 26, date: '2025-07-15', product: 'Plano Básico', customer: 'cesar.dias@example.com', value: 49.90, monthly_payment: '1ª', status: 'Completo', utm_source: 'facebook', utm_medium: 'cpc', utm_campaign: 'promo_julho' },
];

// --- SVG ICONS ---
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 11.414V17l-4 4v-9.586L3.293 6.707A1 1 0 013 6V4z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>;
const CommissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const NewLeadsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;

type SortKey = 'date' | 'product' | 'customer' | 'value' | 'status';
type SortOrder = 'asc' | 'desc';

export default function SalesPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [filteredSales, setFilteredSales] = useState(allSales);
    const [activeUtmFilters, setActiveUtmFilters] = useState<string[]>([]);
    const [utmFilterValues, setUtmFilterValues] = useState<{ [key: string]: string }>({});
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder } | null>({ key: 'date', order: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Simulate available UTMs from data
    const availableUtmSources = useMemo(() => [...new Set(allSales.map(s => s.utm_source).filter(Boolean))], []);
    const availableUtmMediums = useMemo(() => [...new Set(allSales.map(s => s.utm_medium).filter(Boolean))], []);
    const availableUtmCampaigns = useMemo(() => [...new Set(allSales.map(s => s.utm_campaign).filter(Boolean))], []);

    const handleDatePreset = (preset: string) => {
        const today = new Date();
        let from: Date, to: Date = today;
        switch (preset) {
            case 'hoje': from = today; break;
            case '7dias': from = subDays(today, 6); break;
            case '30dias': from = subDays(today, 29); break;
            case 'estemes': from = startOfMonth(today); break;
            case 'mespassado':
                const lastMonth = subDays(today, today.getDate());
                from = startOfMonth(lastMonth);
                to = endOfMonth(lastMonth);
                break;
            default: from = new Date();
        }
        setDateRange({ from, to });
    };

    const handleUtmFilterToggle = (filter: string) => {
        setActiveUtmFilters(prev => 
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    useEffect(() => {
        let sales = [...allSales];

        if (dateRange?.from) {
            sales = sales.filter(sale => {
                const saleDate = new Date(sale.date);
                const from = dateRange.from!;
                const to = dateRange.to || from; // If no 'to' date, use 'from'
                return saleDate >= from && saleDate <= to;
            });
        }

        activeUtmFilters.forEach(filter => {
            const value = utmFilterValues[filter];
            if (value) {
                sales = sales.filter(sale => sale[filter as keyof typeof sale] === value);
            }
        });

        if (sortConfig !== null) {
            sales.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.order === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredSales(sales);
        setCurrentPage(1); // Reset to first page on filter change
    }, [dateRange, utmFilterValues, activeUtmFilters, sortConfig]);

    const requestSort = (key: SortKey) => {
        let order: SortOrder = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    const commissions = useMemo(() => filteredSales.reduce((acc, sale) => sale.status === 'Completo' ? acc + sale.value * 0.2 : acc, 0), [filteredSales]);
    const newLeads = useMemo(() => filteredSales.length, [filteredSales]);

    // Pagination logic
    const totalPages = Math.ceil(filteredSales.length / rowsPerPage);
    const currentRows = filteredSales.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            <Sidebar activePage="vendas" userName="João Silva" userAvatarUrl="https://placehold.co/100x100/a855f7/ffffff.png?text=J" />

            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <motion.h1 className="text-3xl font-bold text-white mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    Vendas
                </motion.h1>

                <motion.div className="flex flex-wrap items-center gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-outline border-gray-600"><CalendarIcon />Filtrar por data<ChevronDownIcon /></button>
                        <div tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-gray-800 rounded-box w-96 mt-2">
                            <DayPicker mode="range" selected={dateRange} onSelect={setDateRange} locale={ptBR} showOutsideDays fixedWeeks />
                            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                                <button onClick={() => handleDatePreset('hoje')} className="btn btn-ghost btn-sm">Hoje</button>
                                <button onClick={() => handleDatePreset('7dias')} className="btn btn-ghost btn-sm">Últimos 7 dias</button>
                                <button onClick={() => handleDatePreset('30dias')} className="btn btn-ghost btn-sm">Últimos 30 dias</button>
                                <button onClick={() => handleDatePreset('estemes')} className="btn btn-ghost btn-sm">Este mês</button>
                                <button onClick={() => handleDatePreset('mespassado')} className="btn btn-ghost btn-sm">Mês passado</button>
                                <button onClick={() => setDateRange(undefined)} className="btn btn-ghost btn-sm col-span-2">Limpar</button>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-outline border-gray-600"><FilterIcon />Adicionar Filtro</button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 rounded-box w-52 mt-2">
                            <li><a onClick={() => handleUtmFilterToggle('utm_source')} className={!availableUtmSources.length ? 'disabled' : ''}>UTM Source</a></li>
                            <li><a onClick={() => handleUtmFilterToggle('utm_medium')} className={!availableUtmMediums.length ? 'disabled' : ''}>UTM Medium</a></li>
                            <li><a onClick={() => handleUtmFilterToggle('utm_campaign')} className={!availableUtmCampaigns.length ? 'disabled' : ''}>UTM Campaign</a></li>
                        </ul>
                    </div>
                </motion.div>
                
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    {activeUtmFilters.map(filter => (
                        <div key={filter} className="form-control">
                            <select className="select select-bordered select-sm bg-gray-700 border-gray-600" value={utmFilterValues[filter] || ''} onChange={(e) => setUtmFilterValues(prev => ({...prev, [filter]: e.target.value}))}>
                                <option disabled value="">{filter}</option>
                                {filter === 'utm_source' && availableUtmSources.map(s => <option key={s}>{s}</option>)}
                                {filter === 'utm_medium' && availableUtmMediums.map(m => <option key={m}>{m}</option>)}
                                {filter === 'utm_campaign' && availableUtmCampaigns.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="card-body flex-row items-center"><CommissionIcon /><div className="ml-4"><h2 className="text-gray-400">Comissões</h2><p className="text-3xl font-bold text-white">R$ {commissions.toFixed(2).replace('.', ',')}</p></div></div>
                    </motion.div>
                    <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                         <div className="card-body flex-row items-center"><NewLeadsIcon /><div className="ml-4"><h2 className="text-gray-400">Novas Indicações</h2><p className="text-3xl font-bold text-white">{newLeads}</p></div></div>
                    </motion.div>
                </div>

                <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="card-body">
                        <h2 className="card-title text-white mb-4">Vendas Recentes</h2>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead><tr className="text-gray-400 border-b border-gray-700"><th onClick={() => requestSort('date')} className="cursor-pointer">Data</th><th onClick={() => requestSort('product')} className="cursor-pointer">Produto</th><th onClick={() => requestSort('customer')} className="cursor-pointer">Cliente</th><th onClick={() => requestSort('value')} className="cursor-pointer">Valor</th><th>Mensalidade</th><th onClick={() => requestSort('status')} className="cursor-pointer">Status</th></tr></thead>
                                <tbody>
                                    {currentRows.map(sale => (
                                        <tr key={sale.id} className="hover:bg-gray-700/50 border-b border-gray-700/50">
                                            <td>{format(new Date(sale.date), 'dd/MM/yyyy')}</td><td>{sale.product}</td><td>{sale.customer}</td><td>R$ {sale.value.toFixed(2).replace('.', ',')}</td><td>{sale.monthly_payment}</td><td><span className={`badge badge-sm ${sale.status === 'Completo' ? 'badge-success' : sale.status === 'Pendente' ? 'badge-warning' : 'badge-error'}`}>{sale.status}</span></td>
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
            </main>
        </div>
    );
}
