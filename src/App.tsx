import { useEffect, useState } from 'react';
import {
  Dices,
  Terminal as TerminalIcon,
  Users,
  Map,
  Shield,
  Zap,
  Check,
  X,
  Github,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import Terminal from '@/components/Terminal';

const FEATURES = [
  {
    icon: Dices,
    title: 'Dados que rolam bonito',
    desc: 'Dados 3D com física de verdade, histórico da mesa e macros pra aquele ataque de 2d6+5 que você usa toda rodada.',
  },
  {
    icon: TerminalIcon,
    title: 'Interface de terminal',
    desc: 'Feita pra quem gosta de eficiência: atalhos rápidos, comandos diretos e zero frescura visual no meio do combate.',
  },
  {
    icon: Users,
    title: 'Mesa completa',
    desc: 'Chat de voz e texto, fichas de personagem compartilhadas e iniciativa automática. O mestre no controle, sempre.',
  },
  {
    icon: Map,
    title: 'Mapa tático',
    desc: 'Grade, névoa de guerra, tokens animados e medição de alcance. Seu grid simples, sem renderizar um filme.',
  },
  {
    icon: Shield,
    title: 'Fichas prontas',
    desc: 'Suporte aos sistemas mais jogados do Brasil: D&D 5e, Tormenta20, Ordem Paranormal e folha em branco livre.',
  },
  {
    icon: Zap,
    title: 'Leve e rápida',
    desc: 'Roda no navegador do notebook velho do Caio. Sem instalar nada, sem travar no pico do boss fight.',
  },
];

const STEPS = [
  { code: 'npm i resenhalends', label: 'Crie sua mesa em segundos — sem cartão, sem cadastro chato.' },
  { code: 'convite --mesa "Sessão de Domingo"', label: 'Mande o link pros jogadores. Eles entram direto do navegador.' },
  { code: 'rolar 1d20 --iniciativa', label: 'Rode a sessão com dados, fichas e mapa. Tudo incluso.' },
];

const FAQ = [
  {
    q: 'O R$ 20,00 é mensal?',
    a: 'Não. É pagamento único. Você paga R$ 20,00 uma vez e a sua conta é permanente, com todas as atualizações inclusas.',
  },
  {
    q: 'Meus jogadores precisam pagar também?',
    a: 'Não. Quem compra o acesso é o mestre (ou quem criar a mesa). Os jogadores entram de graça pelo link de convite.',
  },
  {
    q: 'Quais sistemas são suportados?',
    a: 'Fichas prontas para D&D 5e, Tormenta20 e Ordem Paranormal, além de uma folha livre que serve para qualquer sistema.',
  },
  {
    q: 'Preciso instalar algo?',
    a: 'Não. A ResenhaLends roda direto no navegador, em computador, tablet ou celular.',
  },
];

function App() {
  const [secretOn, setSecretOn] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.documentElement.classList.toggle('secret-mode', secretOn);
  }, [secretOn]);

  const openCheckout = () => setCheckoutOpen(true);

  return (
    <div className="crt vignette min-h-screen bg-night-950 text-slate-300">
      <div className="pointer-events-none fixed inset-0 grid-bg" />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-night-700/60 bg-night-950/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <a href="#topo" className="flex items-center gap-2 text-sm font-semibold text-phosphor-300">
            <span className="grid h-6 w-6 place-items-center rounded border border-phosphor-600/50 bg-phosphor-800/20 font-bold shadow-glow-sm">
              R
            </span>
            resenhalends<span className="text-slate-600">.gg</span>
          </a>
          <div className="ml-auto hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#recursos" className="transition hover:text-phosphor-300">Recursos</a>
            <a href="#como-funciona" className="transition hover:text-phosphor-300">Como funciona</a>
            <a href="#preco" className="transition hover:text-phosphor-300">Preço</a>
            <a href="#faq" className="transition hover:text-phosphor-300">FAQ</a>
          </div>
          <button
            onClick={openCheckout}
            className="ml-auto flex items-center gap-1 rounded-md border border-phosphor-600/60 bg-phosphor-800/20 px-3 py-1.5 text-sm font-medium text-phosphor-200 shadow-glow-sm transition hover:bg-phosphor-700/30 hover:text-phosphor-100 md:ml-0"
          >
            Comprar — R$ 20,00
          </button>
        </nav>
      </header>

      <main id="topo" className="relative">
        {/* hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-night-600 bg-night-850 px-3 py-1 text-xs text-phosphor-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-phosphor-400" />
              v2.0.26 — mesa estável no ar
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Sua mesa de RPG,
              <br />
              <span className="text-phosphor-400 drop-shadow-[0_0_12px_rgba(0,210,106,0.4)]">direto do terminal.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              A ResenhaLends é a mesa de RPG virtual feita para mesas brasileiras: dados, fichas,
              chat e mapa tático num só lugar. Sem mensalidade, sem instalar nada —
              <span className="text-slate-200"> paga uma vez e joga pra sempre.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openCheckout}
                className="group flex items-center gap-2 rounded-md bg-phosphor-500 px-5 py-3 text-sm font-semibold text-night-950 shadow-glow transition hover:bg-phosphor-400"
              >
                Garantir meu acesso — R$ 20,00
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#como-funciona"
                className="rounded-md border border-night-600 px-5 py-3 text-sm text-slate-300 transition hover:border-phosphor-600 hover:text-phosphor-300"
              >
                Ver como funciona
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-600">
              Pagamento único · jogadores entram grátis · sem pegadinha
            </p>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <Terminal onPurchaseClick={openCheckout} secret={{ active: secretOn, toggle: () => setSecretOn((s) => !s) }} />
          </div>
        </section>

        {/* stats strip */}
        <section className="border-y border-night-700/60 bg-night-900/50">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-night-700/60 px-4 sm:px-6 md:grid-cols-4">
            {[
              ['1x', 'pagamento único'],
              ['R$ 20', 'preço de entrada'],
              ['3+', 'sistemas com ficha pronta'],
              ['0', 'instalações necessárias'],
            ].map(([value, label]) => (
              <div key={label} className="px-4 py-6 text-center">
                <div className="text-2xl font-bold text-phosphor-300 sm:text-3xl">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* features */}
        <section id="recursos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-phosphor-400">$ cat recursos.md</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-100 sm:text-4xl">
              Tudo que a mesa precisa. Nada que atrapalhe.
            </h2>
            <p className="mt-4 text-slate-400">
              Construímos cada ferramenta pensando na sessão de domingo: rápida de abrir, fácil de
              ensinar pros jogadores e bonita de ver no projetor da sala.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-lg border border-night-700 bg-night-900/60 p-6 transition hover:border-phosphor-700 hover:bg-night-850"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-md border border-phosphor-700/40 bg-phosphor-800/15 text-phosphor-300 transition group-hover:shadow-glow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* how it works */}
        <section id="como-funciona" className="border-y border-night-700/60 bg-night-900/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-phosphor-400">$ ./como-funciona.sh</span>
              <h2 className="mt-3 text-3xl font-bold text-slate-100 sm:text-4xl">Três passos. Só isso.</h2>
            </div>
            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <li
                  key={step.code}
                  className="flex flex-col gap-3 rounded-lg border border-night-700 bg-night-900/70 p-5 sm:flex-row sm:items-center"
                >
                  <span className="text-sm text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                  <code className="rounded border border-night-600 bg-night-950 px-3 py-1.5 text-sm text-phosphor-300">
                    {step.code}
                  </code>
                  <span className="text-sm text-slate-400 sm:ml-auto sm:text-right">{step.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* pricing */}
        <section id="preco" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-phosphor-400">$ preco --final</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-100 sm:text-4xl">
              Um preço. Sem asterisco.
            </h2>
            <p className="mt-4 text-slate-400">
              Menos que a pizza da sessão. E a pizza acaba — a sua mesa não.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-md">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-phosphor-600/40 via-night-600 to-transparent" />
            <div className="relative rounded-xl border border-night-600 bg-night-900 p-8 shadow-glow">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-lg text-slate-400">R$</span>
                <span className="text-6xl font-bold tracking-tight text-phosphor-300 drop-shadow-[0_0_16px_rgba(0,210,106,0.35)]">
                  20
                </span>
                <span className="text-lg text-slate-400">,00</span>
              </div>
              <p className="mt-2 text-center text-xs uppercase tracking-widest text-slate-500">
                pagamento único · acesso permanente
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {[
                  'Mesa ilimitada de tempo e sessões',
                  'Até 10 jogadores por mesa',
                  'Dados 3D, fichas e mapa tático',
                  'Todas as atualizações futuras',
                  'Jogadores entram de graça',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <Check className="h-4 w-4 shrink-0 text-phosphor-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={openCheckout}
                className="mt-8 w-full rounded-md bg-phosphor-500 px-5 py-3.5 text-sm font-semibold text-night-950 shadow-glow transition hover:bg-phosphor-400"
              >
                Quero minha mesa — R$ 20,00
              </button>
              <p className="mt-4 text-center text-xs text-slate-600">
                Garantia de 7 dias. Não curtiu, devolvemos.
              </p>
            </div>
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="border-t border-night-700/60 bg-night-900/40">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <span className="text-xs uppercase tracking-[0.2em] text-phosphor-400">$ man resenhalends</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-100 sm:text-4xl">Perguntas frequentes</h2>
            <div className="mt-10 divide-y divide-night-700 border-y border-night-700">
              {FAQ.map((item, i) => (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-slate-200 transition hover:text-phosphor-300"
                  >
                    {item.q}
                    <span className={`text-phosphor-400 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      openFaq === i ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className="min-h-0 text-sm leading-relaxed text-slate-400">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* final cta */}
        <section className="relative overflow-hidden border-t border-night-700/60">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">
              A próxima sessão começa aqui.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Por R$ 20,00 — uma vez só — você leva a mesa completa pra sempre. O terminal já está
              aberto esperando você.
            </p>
            <button
              onClick={openCheckout}
              className="mt-8 rounded-md bg-phosphor-500 px-8 py-4 text-sm font-semibold text-night-950 shadow-glow transition hover:bg-phosphor-400"
            >
              Comprar acesso — R$ 20,00
            </button>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t border-night-700/60 bg-night-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="grid h-5 w-5 place-items-center rounded border border-phosphor-700/40 bg-phosphor-800/20 text-[10px] font-bold text-phosphor-300">
              R
            </span>
            ResenhaLends — feito com dado crítico por mesas brasileiras.
          </div>
          <div className="flex items-center gap-4 text-slate-500 sm:ml-auto">
            <a href="#" aria-label="GitHub" className="transition hover:text-phosphor-300">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Discord da comunidade" className="transition hover:text-phosphor-300">
              <MessageCircle className="h-4 w-4" />
            </a>
            <span className="text-xs text-slate-600">© 2026 ResenhaLends</span>
          </div>
        </div>
      </footer>

      {/* checkout modal */}
      {checkoutOpen && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setCheckoutOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-lg border border-night-600 bg-night-900 shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-night-600 px-5 py-3">
              <span className="text-sm text-phosphor-300">$ checkout --secure</span>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="text-slate-500 transition hover:text-slate-200"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 px-5 py-6 text-sm">
              <div className="flex items-center justify-between rounded-md border border-night-600 bg-night-850 px-4 py-3">
                <span className="text-slate-400">Acesso permanente</span>
                <span className="font-semibold text-phosphor-300">R$ 20,00</span>
              </div>
              <p className="text-slate-400">
                Finalize sua compra em segundos: Pix, cartão ou boleto. Assim que o pagamento cai,
                sua mesa é liberada na hora e os convites dos jogadores já funcionam.
              </p>
              <button className="w-full rounded-md bg-phosphor-500 px-5 py-3 font-semibold text-night-950 shadow-glow-sm transition hover:bg-phosphor-400">
                Ir para o pagamento
              </button>
              <p className="text-center text-xs text-slate-600">
                Pagamento único · garantia de 7 dias
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
