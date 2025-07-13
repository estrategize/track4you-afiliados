'use client'

import { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { DateRange, DayPicker, ClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
    CalendarIcon, 
    FilterIcon, 
    CommissionIcon, 
    UserPlusIcon,
    ChevronUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    CloseIcon,
    SearchIcon
} from '@/components/Icons';

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

type SortKey = 'date' | 'product' | 'customer' | 'value' | 'monthly_payment' | 'status';
type SortOrder = 'asc' | 'desc';

// --- Custom Styles for DayPicker ---
const calendarClassNames: Partial<ClassNames> = {
    root: 'bg-transparent p-0',
    month: 'space-y-2',
    month_caption: 'flex justify-center items-center h-10 relative',
    caption_label: 'text-base font-semibold text-white uppercase',
    nav: 'flex items-center',
    button_previous: 'h-8 w-8 z-10 flex pr-1 items-center justify-center !text-purple-600 top-0 rounded-full hover:bg-slate-700 absolute left-0',
    button_next: 'h-8 w-8 z-10 flex pl-1 items-center justify-center !text-purple-600 top-0 rounded-full hover:bg-slate-700 absolute right-0',
    month_grid: 'w-full border-collapse',
    weekdays: 'flex',
    weekday: 'w-10 h-10 flex items-center justify-center text-xs text-gray-400 capitalize',
    week: 'flex w-full mt-1',
    day: 'w-10 h-10 flex items-center justify-center',
    day_button: 'h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-700 cursor-pointer text-sm',
    today: '!text-yellow-300 font-bold',
    selected: '!bg-purple-600 text-white',
    outside: 'text-gray-600 opacity-50',
    range_middle: 'bg-purple-600/30 !rounded-none',
    range_start: '!rounded-l-full',
    range_end: '!rounded-r-full',
};


export default function SalesPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [filteredSales, setFilteredSales] = useState(allSales);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
    const [customerSearch, setCustomerSearch] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder } | null>({ key: 'date', order: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const availableUtmSources = useMemo(() => [...new Set(allSales.map(s => s.utm_source).filter(Boolean))], []);
    const availableUtmMediums = useMemo(() => [...new Set(allSales.map(s => s.utm_medium).filter(Boolean))], []);
    const availableUtmCampaigns = useMemo(() => [...new Set(allSales.map(s => s.utm_campaign).filter(Boolean))], []);
    const availableStatuses = useMemo(() => [...new Set(allSales.map(s => s.status).filter(Boolean))], []);

    const handleDatePreset = (preset: string) => {
        const today = new Date();
        let from: Date, to: Date = today;
        switch (preset) {
            case 'hoje': from = today; break;
            case 'ontem': from = subDays(today, 1); to = subDays(today, 1); break;
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

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleFilterToggle = (filter: string) => {
        setActiveFilters(prev => 
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleFilterValueChange = (filter: string, value: string) => {
        setFilterValues(prev => ({ ...prev, [filter]: value }));
        // Close the dropdown by blurring the active element
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleRemoveFilter = (filterToRemove: string) => {
        setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
        setFilterValues(prev => {
            const newValues = { ...prev };
            delete newValues[filterToRemove];
            return newValues;
        });

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    useEffect(() => {
        let sales = [...allSales];
        if (dateRange?.from) {
            sales = sales.filter(sale => {
                const saleDate = new Date(sale.date);
                const from = dateRange.from!;
                const to = dateRange.to || from;
                return saleDate >= from && saleDate <= to;
            });
        }
        if (customerSearch) {
            sales = sales.filter(sale => sale.customer.toLowerCase().includes(customerSearch.toLowerCase()));
        }
        activeFilters.forEach(filter => {
            const value = filterValues[filter];
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
        setCurrentPage(1);
    }, [dateRange, customerSearch, filterValues, activeFilters, sortConfig]);

    const requestSort = (key: SortKey) => {
        let order: SortOrder = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    const commissions = useMemo(() => filteredSales.reduce((acc, sale) => sale.status === 'Completo' ? acc + sale.value * 0.2 : acc, 0), [filteredSales]);
    const newLeads = useMemo(() => filteredSales.length, [filteredSales]);
    
    const totalPages = Math.ceil(filteredSales.length / rowsPerPage);
    const currentRows = filteredSales.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const SortableHeader = ({ sortKey, children }: { sortKey: SortKey, children: React.ReactNode }) => (
        <th onClick={() => requestSort(sortKey)} className="cursor-pointer">
            <div className="flex items-center gap-2">
                {children}
                {sortConfig?.key === sortKey && (
                    sortConfig.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />
                )}
            </div>
        </th>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-gray-300">
            <Sidebar activePage="vendas" userName="João Silva" />
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <motion.h1 className="text-3xl font-bold text-white mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    Vendas
                </motion.h1>
                <div>
                <motion.div className="flex flex-wrap items-center gap-4 mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-outline border-gray-600"><CalendarIcon />Filtrar por data<ChevronDownIcon /></div>
                        <div className="dropdown-content z-[1] shadow bg-slate-700 rounded-box mt-2 flex flex-row w-auto p-0">
                            <div className="flex w-max flex-col space-y-1 p-4 border-r border-slate-700">
                                <button onClick={() => handleDatePreset('hoje')} className="btn btn-ghost btn-sm justify-start">Hoje</button>
                                <button onClick={() => handleDatePreset('ontem')} className="btn btn-ghost btn-sm justify-start">Ontem</button>
                                <button onClick={() => handleDatePreset('7dias')} className="btn btn-ghost btn-sm justify-start">Últimos 7 dias</button>
                                <button onClick={() => handleDatePreset('30dias')} className="btn btn-ghost btn-sm justify-start">Últimos 30 dias</button>
                                <button onClick={() => handleDatePreset('estemes')} className="btn btn-ghost btn-sm justify-start">Este mês</button>
                                <button onClick={() => handleDatePreset('mespassado')} className="btn btn-ghost btn-sm justify-start">Mês passado</button>
                                <div className="divider my-2"></div>
                                <button onClick={() => setDateRange(undefined)} className="btn btn-ghost btn-sm justify-start">Limpar</button>
                            </div>
                            <div className="p-4">
                                <DayPicker 
                                    mode="range" 
                                    selected={dateRange} 
                                    onSelect={setDateRange} 
                                    locale={ptBR} 
                                    showOutsideDays 
                                    classNames={calendarClassNames}
                                    components={{
                                        Chevron: (props) => {
                                            if (props.orientation === 'right') {
                                                return <ChevronRightIcon className="text-purple-600" />;
                                            }
                                            return <ChevronLeftIcon className="text-purple-600" />;
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-outline border-gray-600"><FilterIcon />Adicionar Filtro</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 rounded-box w-52 mt-2">
                            <li><a onClick={() => handleFilterToggle('status')} className={!availableStatuses.length ? 'disabled' : ''}>Status</a></li>
                            <li><a onClick={() => handleFilterToggle('utm_source')} className={!availableUtmSources.length ? 'disabled' : ''}>UTM Source</a></li>
                            <li><a onClick={() => handleFilterToggle('utm_medium')} className={!availableUtmMediums.length ? 'disabled' : ''}>UTM Medium</a></li>
                            <li><a onClick={() => handleFilterToggle('utm_campaign')} className={!availableUtmCampaigns.length ? 'disabled' : ''}>UTM Campaign</a></li>
                        </ul>
                    </div>
                     <div className="h-10 pl-2 pr-2 rounded-md w-80 flex items-center gap-2 bg-gray-800 border-1 border-gray-600">
                        <input 
                            type="text" 
                            className="focus:outline-none grow bg-transparent" 
                            placeholder="Buscar cliente..." 
                            value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} />
                        <SearchIcon className="absolute-left-4 w-4 h-4" />
                    </div>
                </motion.div>

                {/* ACTIVE FILTERS CONTAINER*/}
                <div className="flex flex-wrap items-center gap-4 mb-4 min-h-14">
                    {activeFilters.map(filter => (
                        <div key={filter} className="flex items-center gap-1 bg-gray-700/50 pl-1 p-0 rounded-full">
                             <button onClick={() => handleRemoveFilter(filter)} className="btn btn-xs btn-ghost hover:shadow-none hover:border-transparent hover:bg-transparent p-1">
                                <CloseIcon className="w-4 h-4 text-gray-400 hover:text-red-300" />
                            </button>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn pl-2 pr-2 bg-gray-700 rounded-full border-transparent">
                                    {filterValues[filter] || filter.replace('_',' ')}
                                    <ChevronDownIcon/>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-slate-700 rounded-box w-52 mt-1">
                                    {filter === 'status' && availableStatuses.map(s => 
                                        <li key={s}><a onClick={() => handleFilterValueChange(filter, s)}>{s}</a></li>
                                    )}
                                    {filter === 'utm_source' && availableUtmSources.map(s => 
                                        <li key={s}><a onClick={() => handleFilterValueChange(filter, s)}>{s}</a></li>
                                    )}
                                    {filter === 'utm_medium' && availableUtmMediums.map(m => 
                                        <li key={m}><a onClick={() => handleFilterValueChange(filter, m)}>{m}</a></li>
                                    )}
                                    {filter === 'utm_campaign' && availableUtmCampaigns.map(c => 
                                        <li key={c}><a onClick={() => handleFilterValueChange(filter, c)}>{c}</a></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

                {/* DATA TABLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><div className="card-body flex-row items-center"><CommissionIcon /><div className="ml-4"><h2 className="text-gray-400">Comissões</h2><p className="text-3xl font-bold text-white">R$ {commissions.toFixed(2).replace('.', ',')}</p></div></div></motion.div>
                    <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><div className="card-body flex-row items-center"><UserPlusIcon /><div className="ml-4"><h2 className="text-gray-400">Novas Indicações</h2><p className="text-3xl font-bold text-white">{newLeads}</p></div></div></motion.div>
                </div>

                <motion.div className="card bg-gray-800 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="card-body">
                        <h2 className="card-title text-white mb-4">Vendas Recentes</h2>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr className="text-gray-400 border-b border-gray-700">
                                        <SortableHeader sortKey="date">Data</SortableHeader>
                                        <SortableHeader sortKey="product">Produto</SortableHeader>
                                        <SortableHeader sortKey="customer">Cliente</SortableHeader>
                                        <SortableHeader sortKey="value">Valor</SortableHeader>
                                        <SortableHeader sortKey="monthly_payment">Mensalidade</SortableHeader>
                                        <SortableHeader sortKey="status">Status</SortableHeader>
                                    </tr>
                                </thead>
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
