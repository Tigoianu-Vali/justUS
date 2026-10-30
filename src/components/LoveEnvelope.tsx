import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, X, Send } from 'lucide-react';

export interface LoveLetter {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  content: string;
  icon: string;
  theme: {
    accent: string;
    bg: string;
    border: string;
  };
}

export const lettersData: LoveLetter[] = [
  {
    id: 'miss-you',
    tag: 'Dor de tine',
    title: 'Deschide când ți-e dor de mine',
    subtitle: 'Când nu sunt lângă tine și ai vrea o îmbrățișare.',
    icon: '💭',
    theme: {
      accent: '#e07a93',
      bg: 'from-pink-50 to-rose-100/70',
      border: 'border-pink-200'
    },
    content: `Știu cum e, și mie mi se face dor de tine din senin în mijlocul zilei.\n\nDistanța sau orele în care suntem prinși cu munca și treburile trec repede. Până ne vedem diseară sau în weekend, să știi că mă gândesc la tine și abia aștept să povestim și să ne relaxăm împreună.\n\nDacă ai două minute libere, dă-mi un mesaj sau un apel scurt. Te pup!`
  },
  {
    id: 'hard-day',
    tag: 'Fără stres',
    title: 'Deschide când ai o zi grea',
    subtitle: 'Când s-au adunat prea multe la muncă sau la facultate.',
    icon: '☕',
    theme: {
      accent: '#d9779f',
      bg: 'from-purple-50 to-pink-100/70',
      border: 'border-purple-200'
    },
    content: `Ia o pauză de 5 minute și trage aer în piept.\n\nȘtiu că sunt zile în care se adună toate deodată și simți că nu mai ai energie sau răbdare. Nu trebuie să le rezolvi pe toate chiar în secunda asta.\n\nFă-ți un ceai bun sau o cafea, pune-ți o melodie chill și lasă restul pentru mai târziu. Diseară povestim pe îndelete sau pur și simplu punem un film și nu facem nimic. Sunt aici dacă ai nevoie de orice.`
  },
  {
    id: 'cant-sleep',
    tag: 'Insomnie',
    title: 'Deschide când nu poți să adormi',
    subtitle: 'Când e târziu și mintea refuză să se oprească.',
    icon: '🌙',
    theme: {
      accent: '#7e8ce0',
      bg: 'from-indigo-50 to-pink-50',
      border: 'border-indigo-100'
    },
    content: `Lasă telefonul deoparte și nu te mai stresa că nu adormi din prima.\n\nPune-te într-o poziție comodă, trage pătura pe tine și gândește-te la ceva simplu și plăcut — la următoarea noastră ieșire sau la ce gătim bun în weekend.\n\nDacă mintea tot aleargă, ascultă ceva liniștit în căști. Somn ușor și odihnește-te, ne auzim de dimineață!`
  },
  {
    id: 'feel-beautiful',
    tag: 'Real talk',
    title: 'Deschide când ești aspră cu tine',
    subtitle: 'Când ai o zi mai proastă și te critici în oglindă.',
    icon: '✨',
    theme: {
      accent: '#e0987a',
      bg: 'from-amber-50 to-rose-100/60',
      border: 'border-amber-200'
    },
    content: `Oprește-te din a te analiza atât de critic.\n\nToți avem zile în care ni se pare că nu ne stă părul bine, că suntem obosiți sau că nu ne iese nimic. Adevărul e că arăți foarte bine exact așa cum ești. Mie îmi place de tine naturală, fără machiaj, râzând relaxată în haine comode de casă.\n\nFii mai blândă cu tine azi. Ai o energie foarte mișto și se vede.`
  },
  {
    id: 'after-fight',
    tag: 'Pace',
    title: 'Deschide când ne-am ciondănit',
    subtitle: 'Pentru momentele când suntem amândoi încăpățânați.',
    icon: '🤝',
    theme: {
      accent: '#b96b85',
      bg: 'from-rose-50 to-orange-50',
      border: 'border-rose-200'
    },
    content: `Hai să nu lăsăm un moment de nervi sau o neînțelegere să ne strice ziua.\n\nAmândoi suntem încăpățânați uneori și e normal să mai avem păreri diferite, dar știi bine că țin prea mult la noi doi ca să rămânem îmbufnați.\n\nCând ne calmăm, hai să vorbim calm și să lămurim lucrurile, fără orgolii. O rezolvăm ca de obicei.`
  },
  {
    id: 'celebrate',
    tag: 'Felicitări',
    title: 'Deschide când ai reușit ceva',
    subtitle: 'O mică sau mare victorie care merită marcată.',
    icon: '🥂',
    theme: {
      accent: '#d86e90',
      bg: 'from-pink-50 to-yellow-50',
      border: 'border-pink-200'
    },
    content: `Felicitări! Știam că o să-ți iasă.\n\nAi depus efort pentru asta și meritai din plin să vezi rezultatul. Nu trece repede peste moment — ia-ți câteva clipe să te bucuri de ce ai realizat.\n\nDiseară ieșim, comandăm ceva bun sau sărbătorim cum vrei tu. Felicitări încă o dată!`
  }
];

export const LoveLettersSection: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);
  const [openedLetters, setOpenedLetters] = useState<Record<string, boolean>>({});
  const [sentKiss, setSentKiss] = useState(false);

  const handleOpen = (letter: LoveLetter) => {
    setActiveLetter(letter);
    setOpenedLetters(prev => ({ ...prev, [letter.id]: true }));
    setSentKiss(false);
  };

  const handleSendKiss = () => {
    setSentKiss(true);
    setTimeout(() => {
      setSentKiss(false);
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2"
        >
          <Sparkles size={14} />
          <span>Doar pentru ochii tăi</span>
        </motion.div>
        <h2 className="font-display-romantic text-3xl font-bold text-on-surface">Plicurile cu Dragoste</h2>
        <p className="text-xs text-on-surface-variant font-medium mt-1 max-w-xs mx-auto">
          Alege plicul de care sufletul tău are nevoie acum și deschide-l cu încredere.
        </p>
      </div>

      {/* Grid of Envelopes */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lettersData.map((letter, idx) => {
          const isOpened = openedLetters[letter.id];
          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpen(letter)}
              className={`cursor-pointer rounded-3xl p-5 border shadow-md relative overflow-hidden transition-all duration-300 bg-gradient-to-br ${letter.theme.bg} ${letter.theme.border} group`}
            >
              {/* Wax Seal / Heart Stamp */}
              <div className="absolute top-4 right-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 ${
                  isOpened ? 'bg-primary text-white' : 'bg-primary-fixed/60 text-primary border border-primary/30'
                }`}>
                  <Heart size={14} fill={isOpened ? "currentColor" : "none"} />
                </div>
              </div>

              {/* Tag */}
              <span className="text-[10px] font-bold tracking-wider uppercase text-primary/80 bg-white/70 px-2.5 py-1 rounded-full inline-block mb-3 shadow-xs">
                {letter.tag}
              </span>

              {/* Title & Icon */}
              <div className="flex items-start space-x-2.5 mb-2">
                <span className="text-2xl select-none">{letter.icon}</span>
                <h3 className="font-display-romantic text-lg font-bold text-on-surface leading-tight pt-0.5">
                  {letter.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-on-surface-variant/90 leading-relaxed font-medium pl-8">
                {letter.subtitle}
              </p>

              {/* Bottom interactive hint */}
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-primary font-semibold">
                <span>{isOpened ? "Recitește scrisoarea" : "Apasă pentru a deschide"}</span>
                <Mail size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal / Letter View */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, rotateX: 10 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#fffdf9] rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-primary/20 overflow-hidden max-h-[88vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative paper watermark */}
              <div className="absolute -top-12 -right-12 text-primary/5 pointer-events-none select-none">
                <Heart size={200} fill="currentColor" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container-highest/60 hover:bg-primary-container text-on-surface-variant flex items-center justify-center transition-colors"
                aria-label="Închide scrisoarea"
              >
                <X size={18} />
              </button>

              {/* Envelope Header */}
              <div className="flex items-center space-x-3 mb-4 pr-8">
                <div className="text-3xl p-2 bg-primary-container/40 rounded-2xl">
                  {activeLetter.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {activeLetter.tag}
                  </span>
                  <h3 className="font-display-romantic text-xl font-bold text-on-surface leading-tight">
                    {activeLetter.title}
                  </h3>
                </div>
              </div>

              {/* Divider with small heart */}
              <div className="relative my-3 flex items-center justify-center">
                <div className="w-full border-t border-primary/15"></div>
                <div className="absolute bg-[#fffdf9] px-3 text-primary">
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>

              {/* Letter Content (Scrollable) */}
              <div className="overflow-y-auto pr-1 my-2 text-on-surface/90 space-y-3 font-body-md text-sm leading-relaxed whitespace-pre-line select-text">
                {activeLetter.content}
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-primary/10 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-on-surface-variant font-medium">Cu toată dragostea mea,</p>
                  <p className="font-display-romantic text-lg font-bold text-primary italic">Mereu al tău ❤️</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendKiss}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                    sentKiss 
                      ? 'bg-primary text-white' 
                      : 'bg-primary-container text-primary hover:bg-primary/20'
                  }`}
                >
                  <Send size={12} />
                  <span>{sentKiss ? "Pupic trimis! 💋" : "Trimite un pupic"}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

