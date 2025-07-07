export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Olá, Track4You Afiliados!
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Este é o seu texto padrão, renderizado com a fonte Figtree. Se você
          está vendo uma fonte limpa e moderna, está tudo certo!
        </p>
        <div className="mt-10 rounded-lg bg-gray-900 p-6 text-left shadow-lg">
          <p className="font-mono text-sm text-green-400">
            <span className="text-gray-400">
              {'// Exemplo de código com a fonte mono'}
            </span>
            <br />
            <span className="text-pink-400">const</span>{' '}
            <span className="text-blue-400">user</span> ={' '}
            <span className="text-gray-400">{'{'}</span>
            <br />
            <span className="ml-4 text-purple-400">name</span>:{' '}
            <span className="text-yellow-400">&apos;Seu Nome&apos;</span>,
            <br />
            <span className="ml-4 text-purple-400">status</span>:{' '}
            <span className="text-yellow-400">&apos;Ativo&apos;</span>
            <br />
            <span className="text-gray-400">{'}'}</span>;
          </p>
        </div>
        <p className="mt-4 font-mono text-sm text-gray-500">
          O bloco de código acima deve usar a fonte JetBrains Mono.
        </p>
      </div>
    </main>
  );
}