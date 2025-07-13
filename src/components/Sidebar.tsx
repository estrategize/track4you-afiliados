// src/components/Sidebar.tsx
import Image from 'next/image';
import Link from 'next/link'; // Use Next.js Link for navigation
import Avatar from './Avatar'
import { DashboardIcon, LinkIcon, DollarIcon, WalletIcon, SettingsIcon, LogOutIcon, OptionsIcon } from './Icons';

// --- Type definition for Sidebar props ---
interface SidebarProps {
  activePage: 'dashboard' | 'links' | 'vendas' | 'financeiro';
  userName: string;
  userAvatarUrl?: string;
}

// --- Menu items data array ---
const menuItems = [
    { href: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard', pageKey: 'dashboard' },
    { href: '/links', icon: <LinkIcon />, label: 'Meus Links', pageKey: 'links' },
    { href: '/sales', icon: <DollarIcon />, label: 'Vendas', pageKey: 'vendas' },
    { href: '/wallet', icon: <WalletIcon />, label: 'Financeiro', pageKey: 'financeiro' },
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
                    <div tabIndex={0} role="button" className="flex items-center justify-between w-full p-2 h-auto btn btn-ghost">
                        {/* Group for avatar and name on the left */}
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="w-8 rounded-full ring ring-purple-600 ring-offset-gray-800 ring-offset-2">
                                    {userAvatarUrl ? (
                                        <Image 
                                            src={userAvatarUrl} 
                                            alt="Avatar" 
                                            width={32}
                                            height={32}
                                        />
                                    ) : (
                                        <Avatar name={userName} />
                                    )}
                                </div>
                            </div>
                            <span>{userName}</span>
                        </div>
                        
                        {/* Icon on the right */}
                        <OptionsIcon className="text-white" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-700 rounded-box w-full mb-2">
                        <li><a className="active:!bg-purple-700"><SettingsIcon /> Configurações</a></li>
                        <li><a className="active:!bg-purple-700 !bg-red-700 text-white text-bold"> <LogOutIcon/><b> Sair</b></a></li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}
