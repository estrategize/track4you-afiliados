// src/components/Sidebar.tsx
import Image from 'next/image';
import Link from 'next/link'; // Use Next.js Link for navigation

// --- Type definition for Sidebar props ---
interface SidebarProps {
  activePage: 'dashboard' | 'links' | 'vendas' | 'financeiro';
  userName: string;
  userAvatarUrl: string;
}

// --- SVG ICONS ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const DollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// --- Menu items data array ---
const menuItems = [
    { href: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard', pageKey: 'dashboard' },
    { href: '/links', icon: <LinkIcon />, label: 'Meus Links', pageKey: 'links' },
    { href: '/vendas', icon: <DollarIcon />, label: 'Vendas', pageKey: 'vendas' },
    { href: '/financeiro', icon: <WalletIcon />, label: 'Financeiro', pageKey: 'financeiro' },
];

export default function Sidebar({ activePage, userName, userAvatarUrl }: SidebarProps) {
    return (
        <aside className="w-64 bg-slate-800 text-gray-300 flex-col hidden lg:flex">
            <div className="p-4 flex items-center justify-center h-20">
                <Image src="/track4you/logo-white-horizontal.png" width={150} height={40} alt="Track4You Logo"/>
            </div>
            <ul className="menu p-4 w-full flex-grow space-y-2">
                <li className="menu-title pointer-events-none">
                    <span className="text-gray-500">Menu</span>
                </li>
                {menuItems.map((item) => (
                    <li key={item.pageKey}>
                        <Link 
                            href={item.href} 
                            className={`flex items-center gap-3 w-full rounded-lg ${
                                activePage === item.pageKey 
                                ? 'bg-purple-600/20 text-purple-400 pointer-events-none' 
                                : 'hover:bg-gray-700/50 active:!bg-purple-700'
                            }`}
                        >
                            {item.icon} {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="p-1 border-t border-gray-700">
                 <div className="dropdown dropdown-top w-full">
                    <div tabIndex={0} role="button" className="btn btn-ghost w-full justify-start p-2 h-auto">
                        <div className="avatar">
                            <div className="w-8 rounded-full ring ring-purple-600 ring-offset-gray-800 ring-offset-2">
                                <img src={userAvatarUrl} alt="Avatar do usuário" />
                            </div>
                        </div>
                        <span className="ml-2">{userName}</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-700 rounded-box w-full mb-2">
                        <li><a><SettingsIcon /> Configurações</a></li>
                        <li><a>Sair</a></li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}
