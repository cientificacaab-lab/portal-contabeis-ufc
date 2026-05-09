'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [bolsas, setBolsas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL do seu Strapi no Railway
    const url = "https://portal-contabeis-ufc-production.up.railway.app";
    
    axios.get(`${url}/api/bolsas`)
      .then(res => {
        setBolsas(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header com as cores da UFC */}
      <nav className="bg-[#b62e65] p-4 sticky top-0 z-50 shadow-md">
        <h1 className="text-[#e8d2a1] font-black text-center text-lg uppercase">
          Contábeis <span className="text-white">UFC</span>
        </h1>
      </nav>

      <header className="bg-[#24272c] px-6 py-10 text-white">
        <h2 className="text-3xl font-bold italic">Portal Científica</h2>
        <p className="text-slate-400 text-sm mt-2">Dados vindos direto do seu Strapi Online!</p>
      </header>

      <section className="p-4 -mt-6">
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-slate-400 animate-pulse font-bold">Buscando dados no Strapi...</div>
          ) : bolsas.length > 0 ? (
            bolsas.map((bolsa: any) => (
              <div key={bolsa.id} className="bg-white rounded-2xl p-5 shadow-sm border-l-8 border-[#b62e65]">
                <span className="text-[10px] font-bold text-[#b62e65] uppercase tracking-wider">Edital Aberto</span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1">
                  {bolsa.attributes?.Titulo || bolsa.Titulo || "Título não encontrado"}
                </h3>
                <p className="text-slate-500 text-sm mt-2">
                  {bolsa.attributes?.Descricao || bolsa.Descricao || "Descrição não encontrada"}
                </p>
                <button className="mt-4 w-full bg-slate-100 text-[#b62e65] py-2 rounded-xl font-bold text-sm active:bg-[#e8d2a1] transition-colors">
                  Acessar Detalhes
                </button>
              </div>
            ))
          ) : (
            <div className="bg-yellow-50 p-6 rounded-2xl text-yellow-700 text-sm border border-yellow-200">
              <p className="font-bold mb-2">Nenhuma bolsa encontrada.</p>
              <p>Verifique no painel do Strapi se as permissões em <strong>Settings</strong>, <strong>Roles</strong>, <strong>Public</strong>, <strong>Bolsa</strong> estão marcadas como <strong>find</strong>.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}