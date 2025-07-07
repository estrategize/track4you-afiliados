// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 p-8 text-base-content">
      <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Bem-vindo ao Track4You!</h1>
          <p className="py-6 text-gray-400">Sua plataforma de afiliados está pronta com seu novo tema.</p>
      </div>

      {/* HeroUI Stats Component Example */}
      <div className="stats shadow-lg bg-base-200">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Novos Cadastros</div>
          <div className="stat-value text-primary">31K</div>
          <div className="stat-desc text-gray-500">Jan 1st - Feb 1st</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Usuários Ativos</div>
          <div className="stat-value text-secondary">4,200</div>
          <div className="stat-desc text-gray-500">↗︎ 400 (22%)</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Conversões</div>
          <div className="stat-value text-accent">1,200</div>
          <div className="stat-desc text-gray-500">↘︎ 90 (14%)</div>
        </div>
      </div>
    </main>
  );
}