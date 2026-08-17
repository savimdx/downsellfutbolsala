import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Clock, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Lock,
  ChevronRight,
  Flame,
  FileText
} from 'lucide-react';

interface UpsellRFEFProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellRFEF({ onAccept, onDecline }: UpsellRFEFProps) {
  const [secondsLeft, setSecondsLeft] = useState(1511); // Initialized to 25:11 matching the image
  const widgetMountedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 1511 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load Hotmart Sales Funnel script and initialize widget immediately
  useEffect(() => {
    const mountHotmart = () => {
      if (widgetMountedRef.current) return true;
      const checkoutElements = (window as any).checkoutElements;
      const container = document.getElementById('hotmart-sales-funnel');
      
      if (checkoutElements && container) {
        try {
          if (!container.querySelector('iframe')) {
            checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
          }
          widgetMountedRef.current = true;
          return true;
        } catch (err) {
          console.error("Error initializing Hotmart widget:", err);
        }
      }
      return false;
    };

    // Try immediate mount
    if (mountHotmart()) return;

    // Listen to load event or fallback polling
    const script = document.getElementById('hotmart-checkout-elements-script');
    if (script) {
      script.addEventListener('load', mountHotmart, { once: true });
    }

    const checkInterval = setInterval(() => {
      if (mountHotmart()) {
        clearInterval(checkInterval);
      }
    }, 100);

    // Timeout safety
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="downsell-page" className="relative min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-clip font-sans pb-16 selection:bg-orange-500 selection:text-white">
      
      {/* Soccer/Futsal court line overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Elegant glowing background highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* ================= HIGH URGENCY HEADER TICKER ================= */}
      <div className="bg-[#E61E05] text-white py-1.5 sm:py-2 px-3 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex flex-row items-center justify-center gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-1 sm:gap-1.5 font-black tracking-wider text-xs sm:text-sm uppercase">
            <span className="text-sm sm:text-base select-none animate-pulse">🔥</span>
            <span>¡OFERTA VÁLIDA SOLO HOY!</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#9c1202]/50 border border-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black font-mono tracking-wider">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white animate-pulse" />
            <span>{formatTime(secondsLeft)}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-8">
        
        {/* ================= STEP PROGRESS BAR CARD ================= */}
        <div className="bg-[#070d1e]/95 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-wide leading-snug uppercase text-white">
              PASO 2 DE 3: <span className="text-[#FFC700]">¡FALTA POCO PARA FINALIZAR!</span> TU PEDIDO PRINCIPAL YA ESTÁ RESERVADO
            </h2>
          </div>
          
          <div className="flex items-center justify-between gap-4 mt-6 max-w-2xl mx-auto">
            <div className="relative flex-1 bg-slate-950/60 h-4.5 rounded-full overflow-hidden border border-slate-800/40">
              <div 
                className="bg-[#FFC700] h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,199,0,0.4)]"
                style={{ width: '85%' }}
              />
            </div>
            <span className="text-[#FFC700] text-sm sm:text-base font-black tracking-widest whitespace-nowrap uppercase">
              85% COMPLETADO
            </span>
          </div>
        </div>
        
        {/* ================= HEADLINE & HOOK ================= */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white uppercase">
            ¿De verdad vas a dejar pasar las <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Sesiones Tácticas de Élite
            </span> <br />
            por solo <span className="text-orange-400 underline decoration-amber-500/50 decoration-2">U$4,90</span>?
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            Entendemos que el precio anterior podía ser un obstáculo. Por eso, hemos rebajado el material oficial al <span className="text-amber-400 font-bold">precio mínimo de costo</span>. No volverás a ver esta oportunidad jamás.
          </p>
        </div>

        {/* ================= COMPACT HERO CARD ================= */}
        <div className="flex flex-col gap-6 bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden items-center max-w-3xl mx-auto">
          
          {/* Mockup (Visual Highlight) */}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="relative group overflow-hidden rounded-xl bg-slate-950 p-1.5 border border-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.6)] w-full max-w-[560px] flex items-center justify-center">
              <picture className="w-full flex items-center justify-center">
                <source srcSet="/rfef-book.webp" type="image/webp" />
                <img 
                  src="/rfef-book.png" 
                  alt="Estrategias y Tácticas en Fútbol Sala - RFEF" 
                  className="w-full h-auto max-h-[520px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 block"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                  decoding="async"
                  width={640}
                  height={512}
                />
              </picture>
            </div>
          </div>

          {/* Quick Core Benefits */}
          <div className="w-full space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white uppercase flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-400 flex-shrink-0" />
              <span>Lo que Recibes al Instante en tu Email:</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-slate-200">
                  <span className="font-bold text-white">Planes de Entrenamiento Completos</span>: Diseñados con la metodología de la Selección Española.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-slate-200">
                  <span className="font-bold text-white">Sistemas Tácticos Avanzados</span>: Salidas rápidas de presión, rotaciones del sistema 4-0 y 3-1 Pivot, y jugadas de balón parado listas para aplicar.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-slate-200">
                  <span className="font-bold text-white">Descarga en 1 Clic (Material de Alta Calidad)</span>: Consúltalo desde tu teléfono inteligente, tablet o portátil directamente en la pista.
                </p>
              </div>
            </div>

            {/* Price block comparison */}
            <div className="pt-6 border-t border-slate-800 flex flex-col items-center justify-center gap-4 text-center bg-slate-950/40 p-4 rounded-xl border border-slate-850">
              <div className="flex flex-col items-center justify-center gap-1.5 bg-orange-500/10 border-2 border-orange-500/60 px-4 sm:px-8 py-5 rounded-2xl w-full max-w-md shadow-[0_0_25px_rgba(249,115,22,0.25)]">
                <span className="text-xs text-orange-400 uppercase tracking-widest font-black">OFERTA FINAL:</span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-orange-400 font-mono tracking-tight whitespace-nowrap [webkit-text-stroke:2.5px_currentColor] sm:[webkit-text-stroke:4px_currentColor] drop-shadow-[0_2px_4px_rgba(249,115,22,0.4)]">U$4,90</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-1">
                  <span>💳</span> Puede pagar en tu moneda local
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider text-center">Pago único • Acceso de descarga inmediato</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= HIGH-CONVERSION OFFER INTERACTIVE CARD ================= */}
        <div className="bg-gradient-to-b from-orange-950/40 via-slate-900 to-slate-900 border-2 border-orange-500 rounded-2xl p-6 text-center space-y-6 shadow-2xl relative">
          
          <div className="space-y-1.5 pt-2">
            <h4 className="text-lg font-extrabold text-white uppercase tracking-tight">
              ¿Listo para dar el gran salto táctico por una fracción de su costo?
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Solo haz clic abajo para añadir este material exclusivo a tu pedido. El cargo de U$4,90 se procesará de forma segura.
            </p>
          </div>



          {/* Hotmart Sales Funnel Widget Container */}
          <div className="max-w-md mx-auto space-y-4">
            <div 
              id="hotmart-sales-funnel" 
              className="w-full min-h-[100px] flex justify-center items-center py-2 text-xs font-mono text-slate-500 bg-slate-950/20 border border-slate-900/40 rounded-xl"
            >
              {/* Hotmart element auto-mounts here */}
            </div>
          </div>


          <div className="flex justify-center items-center gap-5 text-[9px] font-mono text-slate-500 uppercase tracking-widest pt-2 border-t border-slate-800/60">
            <span className="flex items-center gap-1">🔒 SSL ENCRIPTADO</span>
            <span className="flex items-center gap-1">🛡️ 7 DÍAS GARANTÍA</span>
            <span className="flex items-center gap-1">⚡ DESCARGA DIGITAL</span>
          </div>

        </div>

        {/* Footer/Guarantee section removed */}

      </div>
    </div>
  );
}
