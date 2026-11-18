import { useEffect, useRef, useState } from 'react';

export type Line = { id: number; text: string; tone?: 'out' | 'in' | 'err' | 'ok' | 'dim' };

type SecretState = {
  active: boolean;
  toggle: () => void;
};

type Props = {
  onPurchaseClick: () => void;
  secret: SecretState;
};

let lineId = 0;
const nextId = () => ++lineId;

export default function Terminal({ onPurchaseClick, secret }: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (text: string, tone: Line['tone'] = 'out') =>
    setLines((prev) => [...prev, { id: nextId(), text, tone }]);

  const pushMany = (texts: string[], tone: Line['tone'] = 'out') =>
    setLines((prev) => [...prev, ...texts.map((text) => ({ id: nextId(), text, tone }))]);

  useEffect(() => {
    const boot = [
      'resenhalends os v2.0.26 — bootsplash concluído',
      'inicializando mesa virtual................. [ok]',
      'carregando bestiário e fichas.............. [ok]',
      'café dos jogadores......................... [carregado]',
      '',
      'Bem-vindo(a) à ResenhaLends. Digite "help" para começar.',
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i >= boot.length) {
        clearInterval(timer);
        return;
      }
      push(boot[i], boot[i].includes('[ok]') ? 'ok' : boot[i].includes('Bem-vindo') ? 'in' : 'dim');
      i++;
    }, 220);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const roll = (expr: string): string => {
    const m = expr.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
    if (!m) return null;
    const count = Math.min(parseInt(m[1] || '1', 10), 20);
    const sides = parseInt(m[2], 10);
    const mod = m[3] ? parseInt(m[3], 10) : 0;
    const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides));
    const total = rolls.reduce((a, b) => a + b, 0) + mod;
    const detail = rolls.length > 1 ? ` [${rolls.join(', ')}]` : '';
    const modTxt = mod ? ` ${mod > 0 ? '+' : ''}${mod}` : '';
    return `🎲 ${count}d${sides}${modTxt} → ${total}${detail}`;
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push(cmd, 'in');
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setHistIndex(-1);

    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ');

    switch (name.toLowerCase()) {
      case 'help':
        pushMany([
          'Comandos disponíveis:',
          '  help          lista os comandos',
          '  sobre         o que é a ResenhaLends',
          '  preco         quanto custa (spoiler: pouco)',
          '  comprar       abre o checkout',
          '  rolar <NdM>   rola dados (ex.: rolar 2d20+3)',
          '  ficha         simula criar uma ficha',
          '  comandos      easter eggs? quem disse?',
          '  limpar        limpa o terminal',
          '  modo-secreto  ...tenta a sorte',
        ], 'out');
        break;

      case 'sobre':
        pushMany([
          'ResenhaLends é uma mesa de RPG virtual para mesas brasileiras:',
          'roll de dados, fichas de personagem, chat da mesa e mapa tático.',
          'Sem mensalidade. Paga uma vez, joga pra sempre.',
        ], 'out');
        break;

      case 'preco':
        pushMany([
          '╔══════════════════════════════╗',
          '║  ACESSO COMPLETO — R$ 20,00  ║',
          '║  pagamento único, sem        ║',
          '║  mensalidade, sem pegadinha  ║',
          '╚══════════════════════════════╝',
        ], 'ok');
        break;

      case 'comprar':
        push('Abrindo checkout… aguarde seu personagem ser convocado.', 'ok');
        setTimeout(onPurchaseClick, 600);
        break;

      case 'rolar': {
        if (!arg) {
          push('Uso: rolar <NdM[+/-mod]> — ex.: rolar 1d20+5', 'dim');
          break;
        }
        const result = roll(arg);
        push(result ?? `Não entendi "${arg}". Tente o formato NdM, ex.: rolar 2d6.`, result ? 'ok' : 'err');
        break;
      }

      case 'ficha':
        pushMany([
          'criando ficha de personagem…',
          '  nome: Dário, o Cético....... [ok]',
          '  classe: Bardo............... [ok]',
          '  atributos: FOR 10 DES 14 CON 12 INT 13 SAB 11 CAR 17',
          'Ficha pronta. Agora é só nascer barato (R$ 20,00, alias).',
        ], 'out');
        break;

      case 'comandos':
        push('Comandos secretos? Aqui não. Ok, talvez um: "modo-secreto".', 'dim');
        break;

      case 'limpar':
      case 'clear':
        setLines([]);
        break;

      case 'modo-secreto':
        if (secret.active) {
          push('Modo secreto desativado. O fanal âmbar agradece.', 'dim');
          secret.toggle();
        } else {
          pushMany([
            'desbloqueando camada oculta do sistema…',
            'protocolo PHOSPHOR ativado. Bem-vindo(a) ao outro lado.',
          ], 'ok');
          setTimeout(secret.toggle, 900);
        }
        break;

      case 'quem-sou-eu':
        push('Um herói com R$ 20,00 no bolso e uma mesa pra liderar.', 'out');
        break;

      case 'contato':
        push('Mesa aberta pra feedback: contato@resenhalends.gg', 'dim');
        break;

      case 'data':
        push(new Date().toLocaleString('pt-BR'), 'dim');
        break;

      case 'sudo':
        push('Permissão negada. Aqui quem manda é o mestre.', 'err');
        break;

      default:
        push(`comando não encontrado: ${name}. Digite "help".`, 'err');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(histIndex + 1, history.length - 1);
      setHistIndex(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIndex - 1;
      if (next < 0) {
        setHistIndex(-1);
        setInput('');
      } else {
        setHistIndex(next);
        setInput(history[next]);
      }
    }
  };

  const toneClass = (tone: Line['tone']) =>
    tone === 'in'
      ? 'text-phosphor-300'
      : tone === 'err'
        ? 'text-hot-400'
        : tone === 'ok'
          ? 'text-phosphor-400'
          : tone === 'dim'
            ? 'text-slate-500'
            : 'text-slate-400';

  return (
    <div
      className="rounded-lg border border-night-600 bg-night-900/90 shadow-glow overflow-hidden backdrop-blur"
      onClick={() => inputRef.current?.focus()}
      data-testid="terminal"
    >
      <div className="flex items-center gap-2 border-b border-night-600 bg-night-850 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-hot-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-glow/80" />
        <span className="h-3 w-3 rounded-full bg-phosphor-500/80" />
        <span className="ml-3 text-xs text-slate-500">mesa@resenhalends — bash</span>
        <span className="ml-auto hidden text-[10px] uppercase tracking-widest text-slate-600 sm:block">
          interativo · tente "help"
        </span>
      </div>

      <div ref={bodyRef} className="h-80 space-y-0.5 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed sm:text-sm">
        {lines.map((line) => (
          <pre key={line.id} className={`whitespace-pre-wrap break-words font-mono ${toneClass(line.tone)}`}>
            {line.tone === 'in' ? `$ ${line.text}` : line.text}
          </pre>
        ))}

        <div className="flex items-center gap-2">
          <span className="select-none text-phosphor-400">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent text-phosphor-100 caret-transparent outline-none placeholder:text-slate-600"
            placeholder='digite "help" e aperte Enter'
            aria-label="Terminal da ResenhaLends"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="pointer-events-none -ml-2 h-4 w-2 animate-blink bg-phosphor-400" aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-night-600 bg-night-850/60 px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-widest text-slate-600">atalhos:</span>
        {(['help', 'preco', 'rolar 2d20', 'modo-secreto'] as const).map((c) => (
          <button
            key={c}
            onClick={() => run(c)}
            className="rounded border border-night-600 bg-night-800 px-2 py-0.5 text-xs text-slate-400 transition hover:border-phosphor-600 hover:text-phosphor-300"
          >
            {c}
          </button>
        ))}
        <span className="ml-auto hidden items-center gap-1 text-[10px] text-slate-600 sm:flex">
          <kbd className="rounded border border-night-600 px-1">↑</kbd>
          <kbd className="rounded border border-night-600 px-1">↓</kbd> histórico
        </span>
      </div>
    </div>
  );
}
