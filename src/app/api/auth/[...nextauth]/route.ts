import NextAuth, { type Session, type User } from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js'

// Este é o arquivo principal de configuração do NextAuth.js.
// Ele define como os usuários podem fazer login e como as sessões são gerenciadas.

export const authOptions = {
  // O Supabase Adapter conecta o NextAuth ao seu banco de dados Supabase.
  // Ele automaticamente gerencia usuários, sessões e contas.
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  // }),

  // 'providers' é a lista de métodos de login que você aceita.
  // Por enquanto, vamos usar apenas "Credentials", que significa login com e-mail e senha.
  providers: [
    CredentialsProvider({
      // O nome que aparecerá na página de login (opcional)
      name: 'Credentials',
      // Define os campos que o formulário de login terá
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // A função 'authorize' é a mais importante.
      // Ela é chamada quando um usuário tenta fazer login.
      // É aqui que você verifica se o e-mail e a senha estão corretos.
      async authorize(credentials) { // Corrigido: parâmetro _req removido
        // Se 'credentials' não for fornecido, retorna nulo.
        if (!credentials) return null

        // Cria um cliente Supabase para interagir com o banco de dados.
        // Usamos as chaves do seu arquivo .env.local.
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        // Tenta fazer login no Supabase usando o e-mail e a senha fornecidos.
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        // Se o Supabase retornar um erro (senha incorreta, usuário não existe),
        // a autenticação falha e retornamos nulo.
        if (error) {
          console.error("Erro de autenticação no Supabase:", error.message)
          return null
        }

        // Se o login no Supabase for bem-sucedido, o 'user' terá os dados.
        // Nós então buscamos o perfil completo desse usuário na nossa tabela 'public.users'.
        if (user?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.user.id)
            .single()

          // Se encontrarmos um perfil, retornamos um objeto com os dados do usuário.
          // O NextAuth usará isso para criar a sessão.
          if (profile) {
            return {
              id: profile.id,
              email: profile.email,
              name: profile.full_name,
              role: profile.role, // Incluímos a 'role' para usar no app
            }
          }
        }

        // Se nenhum usuário ou perfil for encontrado, retorna nulo.
        return null
      }
    })
  ],

  // 'callbacks' permite customizar o que acontece durante o fluxo de autenticação.
  callbacks: {
    // O callback 'jwt' é chamado ao criar ou atualizar um JSON Web Token.
    // Usamos para adicionar a 'role' do usuário ao token.
    async jwt({ token, user }: { token: JWT; user?: User & { role?: string } }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    // O callback 'session' é chamado ao criar uma sessão.
    // Usamos para adicionar a 'role' e o 'id' do usuário ao objeto da sessão,
    // para que possamos acessá-los no nosso aplicativo.
    async session({ session, token }: { session: Session & { user?: { id?: string; role?: string } }; token: JWT & { role?: string } }) { // Corrigido: Adicionado 'id' ao tipo do usuário da sessão
      if (session?.user && token.sub) {
        session.user.role = token.role
        session.user.id = token.sub // 'sub' é o ID do usuário no token
      }
      return session
    }
  },

  // Define as páginas customizadas de login. Se não definir, o NextAuth usa uma página padrão.
  pages: {
    signIn: '/login', // A rota para sua página de login
  },

  // A chave secreta que você gerou e colocou no .env.local
  secret: process.env.AUTH_SECRET,
}

// Exporta os handlers GET e POST que o NextAuth precisa para funcionar.
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
