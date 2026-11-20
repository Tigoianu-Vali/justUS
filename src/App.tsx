import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, CalendarHeart, Sparkles, PartyPopper, Gift, Music, Pause, Mail, Quote } from 'lucide-react';
import { LoveLettersSection } from './components/LoveEnvelope';

const TogetherCounter: React.FC<{ startDate: Date }> = ({ startDate }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeTogether = Math.max(0, now.getTime() - startDate.getTime());
  const togetherDays = Math.floor(timeTogether / (1000 * 60 * 60 * 24));
  const togetherHours = Math.floor((timeTogether / (1000 * 60 * 60)) % 24);
  const togetherMinutes = Math.floor((timeTogether / 1000 / 60) % 60);
  const togetherSeconds = Math.floor((timeTogether / 1000) % 60);

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="flex flex-col bg-white/60 rounded-2xl py-2.5 px-1 border border-primary/10 shadow-xs">
        <span className="text-2xl sm:text-3xl font-bold text-primary font-display-romantic leading-tight">{togetherDays}</span>
        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mt-0.5">Zile</span>
      </div>
      <div className="flex flex-col bg-white/60 rounded-2xl py-2.5 px-1 border border-primary/10 shadow-xs">
        <span className="text-2xl sm:text-3xl font-bold text-primary font-display-romantic leading-tight">{togetherHours}</span>
        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mt-0.5">Ore</span>
      </div>
      <div className="flex flex-col bg-white/60 rounded-2xl py-2.5 px-1 border border-primary/10 shadow-xs">
        <span className="text-2xl sm:text-3xl font-bold text-primary font-display-romantic leading-tight">{togetherMinutes}</span>
        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mt-0.5">Min</span>
      </div>
      <div className="flex flex-col bg-white/60 rounded-2xl py-2.5 px-1 border border-primary/10 shadow-xs">
        <span className="text-2xl sm:text-3xl font-bold text-primary font-display-romantic leading-tight">{togetherSeconds}</span>
        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mt-0.5">Sec</span>
      </div>
    </div>
  );
};

function App() {
  const [messageOffset, setMessageOffset] = useState(0);
  const [tapHearts, setTapHearts] = useState<{ id: number, x: number, y: number }[]>([]);
  
  const [titleClicks, setTitleClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [dateIdea, setDateIdea] = useState<string | null>(null);
  const [showReasons, setShowReasons] = useState(false);
  const [currentReason, setCurrentReason] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'letters' | 'activities'>('home');

  const dateIdeas = [
    "🍿 Maraton de filme sub pătură cu floricele calde",
    "🍕 Comandăm pizza și ne uităm la serialul preferat",
    "🧖‍♀️ Seară de relaxare cu măști de față și masaj acasă",
    "🍷 Bem un pahar de vin și povestim pe canapea în liniște",
    "🥞 Facem clătite sau mic dejun... dar la cină!",
    "🎨 Pictăm împreună în timp ce ascultăm muzică chill",
    "🍰 Gătim un desert nou de la zero împreună",
    "🧩 Facem un puzzle cu o ciocolată caldă sau un ceai",
    "⛺ Ne construim un fort din pături, perne și luminițe",
    "🍝 Gătim o cină romantică acasă cu lumânări aprinse",
    "🛁 O baie cu spumă și muzică relaxantă în surdină",
    "☕ Ieșim la o cafenea cochetă pentru un cappuccino bun",
    "🥂 Luăm cina la un restaurant elegant",
    "🍷 Mergem la un restaurant nou, cu atmosferă intimă",
    "🍰 Ieșim la o cofetărie fancy pentru un desert deosebit",
    "🍸 Un cocktail seara târziu într-un loc cu lumini calde",
    "🍽️ Ne îmbrăcăm elegant și ieșim la o întâlnire clasică"
  ];

  const reasons = [
    "Pentru că ai cel mai sincer zâmbet din lume.",
    "Pentru felul în care mă privești când crezi că nu te văd.",
    "Pentru că alături de tine pot fi exact așa cum sunt.",
    "Pentru că ai mereu grijă de mine.",
    "Pentru mirosul tău care mă liniștește instantaneu.",
    "Pentru că râzi la glumele mele, chiar și când nu sunt bune.",
    "Pentru inteligența și ambiția ta.",
    "Pentru că aduci liniște în viața mea.",
    "Pentru felul în care mă asculți.",
    "Pentru că ești cea mai bună prietenă a mea.",
    "Pentru felul în care mă strângi în brațe noaptea.",
    "Pentru vocea ta care e melodia mea preferată.",
    "Pentru că faci ca lucrurile simple să pară extraordinare.",
    "Pentru bunătatea ta pură.",
    "Pentru cum te joci cu părul tău.",
    "Pentru că ești absolut superbă în fiecare zi.",
    "Pentru felul în care spui numele meu.",
    "Pentru că ești pur și simplu tu.",
    "Pentru că pui suflet în tot ce faci.",
    "Pentru sclipirea din ochii tăi când ești fericită.",
    "Pentru că ești sufletul meu pereche.",
    "Pentru curajul și puterea ta interioară.",
    "Pentru că mă faci să vreau să fiu un om mai bun.",
    "Pentru că viața e o aventură frumoasă alături de tine.",
    "Pentru felul în care mă ții de mână.",
    "Pentru că m-ai învățat ce înseamnă iubirea adevărată."
  ];

  const generateReason = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentReason(reasons[Math.floor(Math.random() * reasons.length)]);
  };

  const coupons = [
    "O sesiune lungă de săruturi pasionale.",
    "5 minute de bulăneală pe canapea, fără întreruperi.",
    "Săruturi dulci pe gât timp de 1 minut.",
    "O îmbrățișare strânsă și săruturi pe toată fața.",
    "Masaj prelungit, care poate duce fix unde vrei tu...",
    "Sesiune de sărutat apăsat oricând și oriunde ai chef.",
    "Bulăneală maximă în timp ce ne facem că ne uităm la film.",
    "Săruturi lente pe fiecare milimetru de piele pe care îl alegi.",
    "Mă poți prinde și săruta pe neașteptate absolut toată ziua.",
    "Sesiune de tandrețe pură și atingeri fine.",
    "Un French kiss lung, oriunde vrei tu.",
    "Fără haine sub pătura de la filmul de diseară...",
    "Mângâieri senzuale în timp ce mă ți în brațe strâns."
  ];

  const generateCoupon = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentCoupon(coupons[Math.floor(Math.random() * coupons.length)]);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.log("Audio play failed:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitleClicks(prev => prev + 1);
    if (titleClicks + 1 === 3) {
      setShowSecret(true);
      setTimeout(() => {
        setShowSecret(false);
        setTitleClicks(0);
      }, 6000); 
    }
  };

  const generateDateIdea = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateIdea(dateIdeas[Math.floor(Math.random() * dateIdeas.length)]);
  };

  const startDate = new Date('2026-06-05T00:00:00');

  const messages = [
    "Abia aștept să te țin în brațe, bibica mea. ❤️",
    "Fiecare secundă care trece e una mai aproape de tine, gurița mea.",
    "Mi-e dor de tine, inima mea. Ne vedem curând.",
    "Număr zilele până te strâng în brațe, sufletul meu.",
    "Te iubesc enorm, puișorul meu mic.",
    "Zâmbetul tău îmi face ziua mai bună, bibica mea.",
    "Te port mereu în gând, gurița mea.",
    "Orice zi e mai frumoasă de când ești tu în ea, inima mea.",
    "Sunt cel mai norocos că te am, sufletul meu.",
    "Mă gândesc mereu la tine, puișorul meu mic.",
    "Ești cel mai frumos lucru care mi s-a întâmplat, bibica mea.",
    "Inima mea bate doar pentru tine. ❤️",
    "Fiecare dimineață e mai frumoasă știind că ești a mea, gurița mea.",
    "Abia aștept să te sărut din nou, puișorul meu mic.",
    "Mă faci să zâmbesc chiar și când mi-e cel mai greu, inima mea.",
    "Lumea e un loc mai bun cu tine în ea, sufletul meu.",
    "Ochii tăi sunt preferații mei, bibica mea. ✨",
    "Te ador din tot sufletul meu!",
    "Ești perfectă exact așa cum ești, gurița mea.",
    "Nu trece nicio zi fără să mă gândesc la tine, inima mea.",
    "Vreau să te țin de mână pentru totdeauna, puișorul meu mic.",
    "Te iubesc mai mult azi decât ieri, dar mai puțin decât mâine. ❤️",
    "Ești tot ce mi-am dorit vreodată, bibica mea.",
    "Sunt dependent de îmbrățișările tale, gurița mea."
  ];

  const todayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const currentMessage = messages[(todayIndex + messageOffset) % messages.length];

  const handleNextMessage = () => {
    setMessageOffset(prev => prev + 1);
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, nav, input, a, [role="button"]')) return;

    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY
    };

    setTapHearts(prev => [...prev.slice(-7), newHeart]);

    setTimeout(() => {
      setTapHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center px-4 font-body-md overflow-x-hidden relative transition-colors duration-500 pb-36 pt-[max(0.75rem,env(safe-area-inset-top,0.75rem))]"
      onClick={handleScreenTap}
    >
      {/* Audio Element with preload none so mobile doesn't download 8.5MB on load */}
      <audio ref={audioRef} src="/song.mp3" preload="none" loop />

      {/* GPU-Optimized Background Glow for Smooth 60-120FPS on Mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255, 184, 202, 0.6) 0%, rgba(255, 184, 202, 0) 70%)',
            transform: 'translateZ(0)'
          }}
        />
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(224, 122, 147, 0.45) 0%, rgba(224, 122, 147, 0) 70%)',
            transform: 'translateZ(0)'
          }}
        />
        <div 
          className="absolute top-[35%] left-[10%] w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(232, 198, 183, 0.5) 0%, rgba(232, 198, 183, 0) 70%)',
            transform: 'translateZ(0)'
          }}
        />
      </div>

      {/* App Header (iOS Safe Area & Notch Ready) */}
      <header className="w-full max-w-md pt-2 pb-5 flex items-center justify-between z-30 relative px-1">
        {/* Date Tag */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-primary/20 shadow-xs text-on-surface-variant text-[11px] font-semibold select-none">
          <Heart size={12} className="text-primary" fill="currentColor" />
          <span>Din 5 Iunie 2026</span>
        </div>

        {/* Center Title */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer select-none"
          onClick={handleTitleClick}
          title="Apasă de 3 ori..."
        >
          <h1 className="font-display-romantic text-3xl font-extrabold tracking-tight text-primary glow-text leading-tight">
            JustUs
          </h1>
          <span className="font-display-romantic italic text-[11px] text-on-surface-variant/80 -mt-0.5">
            Povestea Noastră ✨
          </span>
        </motion.div>

        {/* Music Player Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAudio}
          className={`h-9 px-3 rounded-full shadow-xs border transition-all flex items-center space-x-1.5 text-xs font-semibold backdrop-blur-md ${
            isPlaying
              ? "bg-primary text-white border-primary shadow-primary/30"
              : "bg-white/85 text-primary border-primary/25 hover:bg-white"
          }`}
          aria-label={isPlaying ? "Oprește muzica" : "Pornește muzica"}
        >
          {isPlaying ? (
            <>
              <Pause size={13} fill="currentColor" />
              <span>Pauză</span>
              <div className="flex space-x-[2px] items-end h-3 ml-0.5">
                <motion.div animate={{ height: ["30%", "100%", "30%"] }} transition={{ duration: 0.7, repeat: Infinity }} className="w-[2px] bg-white rounded-full" />
                <motion.div animate={{ height: ["80%", "20%", "80%"] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-[2px] bg-white rounded-full" />
                <motion.div animate={{ height: ["100%", "40%", "100%"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-[2px] bg-white rounded-full" />
              </div>
            </>
          ) : (
            <>
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Music size={13} />
              </motion.div>
              <span>Muzică</span>
            </>
          )}
        </motion.button>
      </header>

      {/* Secret Explosion */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none overflow-hidden"
            onClick={() => setShowSecret(false)}
          >
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  scale: 0, 
                  x: 0, 
                  y: 0 
                }}
                animate={{ 
                  opacity: 0, 
                  scale: Math.random() * 2 + 1,
                  x: (Math.random() - 0.5) * window.innerWidth * 1.2,
                  y: (Math.random() - 0.5) * window.innerHeight * 1.2,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3, 
                  ease: "easeOut" 
                }}
                className="absolute text-primary"
              >
                <Heart size={40} fill="currentColor" />
              </motion.div>
            ))}
            <motion.h1 
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-4xl sm:text-6xl font-display-romantic font-bold text-white text-center drop-shadow-2xl px-4 leading-tight"
            >
              Te Iubesc Cel<br/>Mai Mult!
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Tap Hearts */}
      <AnimatePresence>
        {tapHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.2, x: heart.x - 24, y: heart.y - 24, rotate: -20 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: heart.y - 150,
              x: heart.x - 24 + (Math.random() * 60 - 30),
              rotate: 20
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none text-primary"
          >
            <Heart size={48} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center w-full max-w-md">
        {/* Tab Content with Smooth Animation */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full space-y-4"
            >
              {/* Together Counter Card */}
              <div className="w-full glass-effect rounded-3xl p-5 border border-white/70 shadow-md relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 bg-primary h-full"></div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-primary-container/70 rounded-full text-primary">
                      <CalendarHeart size={18} />
                    </div>
                    <h2 className="font-display-romantic text-lg font-bold text-on-surface">Împreună de...</h2>
                  </div>
                  <span className="text-[11px] font-semibold text-primary bg-primary-container/40 px-2.5 py-1 rounded-full">
                    În fiecare secundă ❤️
                  </span>
                </div>

                <TogetherCounter startDate={startDate} />
                
                <p className="text-center text-xs text-on-surface-variant mt-3 font-medium opacity-85">
                  Fiecare clipă alături de tine e o binecuvântare ✨
                </p>
              </div>

              {/* Message of the Day Card */}
              <div className="w-full glass-effect rounded-3xl p-5 border border-white/70 shadow-md relative overflow-hidden flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-2.5 py-0.5 rounded-full">
                    Gândul Zilei Pentru Tine
                  </span>
                  <Quote size={14} className="text-primary/40" />
                </div>

                <div className="min-h-[72px] flex items-center justify-center my-1 w-full px-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={messageOffset}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="font-display-romantic text-lg text-primary italic leading-relaxed"
                    >
                      „{currentMessage}”
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex items-center space-x-2 mt-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextMessage}
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 shadow-2xs"
                    aria-label="Schimbă mesajul"
                  >
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                  </motion.button>
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    Apasă pe inimă pentru alt mesaj
                  </span>
                </div>
              </div>

              {/* Quick Actions Grid (Fills the lower half beautifully) */}
              <div className="w-full grid grid-cols-2 gap-3 pt-1">
                {/* Letters Quick Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('letters')}
                  className="bg-gradient-to-br from-pink-100/90 via-rose-50/80 to-peach-100/70 rounded-3xl p-4 border border-primary/20 shadow-xs flex flex-col justify-between cursor-pointer group min-h-[130px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                      <Mail size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-white/80 px-2 py-0.5 rounded-full">
                      6 plicuri
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display-romantic text-sm font-bold text-on-surface leading-snug">
                      Plicurile cu Dragoste 💌
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-tight">
                      Când ți-e dor de mine...
                    </p>
                  </div>
                </motion.div>

                {/* Date Ideas Quick Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    generateDateIdea();
                    setActiveTab('activities');
                  }}
                  className="bg-gradient-to-br from-peach-100/90 via-rose-50/80 to-pink-100/70 rounded-3xl p-4 border border-secondary/40 shadow-xs flex flex-col justify-between cursor-pointer group min-h-[130px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-2xl bg-secondary text-on-surface flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                      <PartyPopper size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant bg-white/80 px-2 py-0.5 rounded-full">
                      Idei romantice
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display-romantic text-sm font-bold text-on-surface leading-snug">
                      Ce facem diseară? 🍿
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-tight">
                      Apasă pentru o idee nouă
                    </p>
                  </div>
                </motion.div>

                {/* Love Reasons Quick Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    generateReason();
                    setShowReasons(true);
                  }}
                  className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-4 border border-purple-200/50 shadow-xs flex flex-col justify-between cursor-pointer group min-h-[130px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Heart size={16} fill="currentColor" />
                    </div>
                    <Sparkles size={14} className="text-primary/60" />
                  </div>
                  <div>
                    <h3 className="font-display-romantic text-sm font-bold text-on-surface leading-snug">
                      De ce te iubesc? ✨
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-tight">
                      Află un motiv sincer
                    </p>
                  </div>
                </motion.div>

                {/* Love Coupon Quick Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    generateCoupon();
                    setShowCoupons(true);
                  }}
                  className="bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 rounded-3xl p-4 border border-amber-200/50 shadow-xs flex flex-col justify-between cursor-pointer group min-h-[130px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Gift size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-white/80 px-2 py-0.5 rounded-full">
                      Cadou
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display-romantic text-sm font-bold text-on-surface leading-snug">
                      Cupoane Dulci 🎟️
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-tight">
                      Extrage un răsfăț
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Romantic Bottom Note */}
              <div className="text-center pt-3 pb-1 text-[11px] text-on-surface-variant/70 font-medium select-none">
                Mereu împreună, oriunde am fi ❤️
              </div>
            </motion.div>
          )}

          {activeTab === 'letters' && (
            <motion.div
              key="letters"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <LoveLettersSection />
            </motion.div>
          )}

          {activeTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full space-y-6"
            >
              {/* Date Night Generator */}
              <div className="w-full glass-effect rounded-3xl p-6 border border-white/60 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 bg-primary-fixed h-full"></div>
                <div className="flex items-center space-x-3 mb-5">
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="p-2 bg-primary-container rounded-full text-primary"
                  >
                    <Sparkles size={20} />
                  </motion.div>
                  <h2 className="font-display-romantic text-xl font-semibold text-on-surface">Ce facem diseară?</h2>
                </div>
                
                <div className="min-h-[70px] flex items-center justify-center text-center bg-white/40 rounded-2xl p-4 border border-white/50 mb-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={dateIdea || "empty"}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-base md:text-lg font-medium leading-tight text-primary"
                    >
                      {dateIdea || "Apasă butonul pentru o idee romantică!"}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateDateIdea}
                    className="bg-primary hover:bg-secondary text-white rounded-full px-6 py-3 shadow-md transition-colors flex items-center space-x-2 font-medium"
                  >
                    <PartyPopper size={18} />
                    <span>Alege o idee</span>
                  </motion.button>
                </div>
              </div>

              {/* Love Reasons Generator */}
              <div className="w-full glass-effect rounded-3xl p-6 border border-white/60 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 bg-primary h-full"></div>
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    className="p-2 bg-primary-container rounded-full text-primary"
                  >
                    <Heart size={20} fill="currentColor" />
                  </motion.div>
                  <h2 className="font-display-romantic text-xl font-semibold text-on-surface">Motive pentru care te iubesc</h2>
                </div>
                
                <div className="flex justify-center mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); generateReason(); setShowReasons(true); }}
                    className="bg-secondary hover:bg-primary text-white rounded-full px-6 py-3 shadow-md transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Sparkles size={18} />
                    <span>Află un motiv! ✨</span>
                  </motion.button>
                </div>
              </div>

              {/* Love Coupons Generator */}
              <div className="w-full glass-effect rounded-3xl p-6 border border-white/60 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 bg-secondary h-full"></div>
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    className="p-2 bg-secondary rounded-full text-white"
                  >
                    <Gift size={20} />
                  </motion.div>
                  <h2 className="font-display-romantic text-xl font-semibold text-on-surface">Cupoane de Dragoste</h2>
                </div>
                
                <div className="flex justify-center mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); generateCoupon(); setShowCoupons(true); }}
                    className="bg-primary hover:bg-primary-fixed text-white rounded-full px-6 py-3 shadow-md transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Gift size={18} />
                    <span>Extrage un Cupon 🎟️</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Navigation Bar (Symmetrical iOS Pill Dock) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))]">
        <nav className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-primary/20 rounded-full p-1.5 shadow-xl shadow-primary/15 flex items-center gap-1 w-[90%] max-w-sm">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full transition-all text-xs font-semibold relative ${
              activeTab === 'home' ? 'text-white' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {activeTab === 'home' && (
              <motion.div
                layoutId="navTabPill"
                className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Heart size={16} className="relative z-10" fill={activeTab === 'home' ? "currentColor" : "none"} />
            <span className="relative z-10">Acasă</span>
          </button>

          <button
            onClick={() => setActiveTab('letters')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full transition-all text-xs font-semibold relative ${
              activeTab === 'letters' ? 'text-white' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {activeTab === 'letters' && (
              <motion.div
                layoutId="navTabPill"
                className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <div className="relative z-10 flex items-center">
              <Mail size={16} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </div>
            <span className="relative z-10">Scrisori</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full transition-all text-xs font-semibold relative ${
              activeTab === 'activities' ? 'text-white' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {activeTab === 'activities' && (
              <motion.div
                layoutId="navTabPill"
                className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Sparkles size={16} className="relative z-10" />
            <span className="relative z-10">Răsfăț</span>
          </button>
        </nav>
      </div>

      {/* Reasons Modal */}
      <AnimatePresence>
        {showReasons && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-background/95 backdrop-blur-md pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); setShowReasons(false); }}
          >
            <div className="relative w-full max-w-lg flex flex-col items-center text-center" onClick={(e) => e.stopPropagation()}>
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-8 text-primary opacity-20 absolute top-[-50px] z-[-1]"
              >
                <Heart size={150} fill="currentColor" />
              </motion.div>
              
              <h2 className="font-body-md text-sm uppercase tracking-widest text-on-surface-variant mb-6 font-semibold">Te iubesc...</h2>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentReason}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="font-display-romantic text-3xl md:text-4xl text-primary font-medium leading-relaxed min-h-[120px] drop-shadow-sm flex items-center justify-center"
                >
                  „{currentReason}”
                </motion.p>
              </AnimatePresence>

              <div className="flex flex-col space-y-4 mt-8 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateReason}
                  className="w-full bg-primary text-white py-4 rounded-full shadow-lg font-medium text-lg"
                >
                  Mai dă-mi un motiv! ✨
                </motion.button>
                <button
                  onClick={() => setShowReasons(false)}
                  className="w-full text-on-surface-variant hover:text-primary transition-colors py-2 font-medium"
                >
                  Închide
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupons Modal */}
      <AnimatePresence>
        {showCoupons && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-background/95 backdrop-blur-md pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); setShowCoupons(false); }}
          >
            <div className="relative w-full max-w-sm flex flex-col items-center text-center bg-white rounded-3xl p-8 border-4 border-dashed border-secondary shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-secondary text-white p-4 rounded-full mb-4 shadow-lg"
              >
                <Gift size={40} />
              </motion.div>
              
              <h2 className="font-body-md text-sm uppercase tracking-widest text-primary mb-2 font-bold">Cupon Valabil Pentru:</h2>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentCoupon}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="font-display-romantic text-2xl text-on-surface font-semibold leading-snug min-h-[100px] flex items-center justify-center my-4"
                >
                  {currentCoupon}
                </motion.p>
              </AnimatePresence>

              <div className="flex flex-col space-y-3 mt-4 w-full">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateCoupon}
                  className="w-full bg-secondary text-white py-3 rounded-full shadow-md font-medium"
                >
                  Trage alt bilet! 🎟️
                </motion.button>
                <button
                  onClick={() => setShowCoupons(false)}
                  className="w-full text-on-surface-variant hover:text-primary transition-colors py-2 font-medium"
                >
                  Păstrează cuponul
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
