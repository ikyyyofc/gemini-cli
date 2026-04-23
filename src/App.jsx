import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Network, 
  Database, 
  Code2, 
  ShieldAlert, 
  Activity,
  Copy,
  Check,
  Layers,
  Zap,
  Sparkles,
  Globe,
  Wrench,
  ArrowRight,
  Radio,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Package
} from 'lucide-react';

// --- COMPONENTS ---

const TypewriterText = ({ text, delay = 50, showCursor = true, loop = false, loopDelay = 3000 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timer;
    let timeout;
    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;

      if (!isDeleting) {
        // Typing
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          timer = setTimeout(tick, delay);
        } else {
          // Finished typing
          if (loop) {
            isDeleting = true;
            timeout = setTimeout(tick, loopDelay);
          }
        }
      } else {
        // Deleting
        if (i > 0) {
          setDisplayedText(text.substring(0, i - 1));
          i--;
          timer = setTimeout(tick, delay / 2); // Delete a bit faster
        } else {
          // Finished deleting
          isDeleting = false;
          timeout = setTimeout(tick, 500); // Short pause before typing again
        }
      }
    };

    tick();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [text, delay, loop, loopDelay]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      {showCursor && <span className="cursor-block ml-1"></span>}
    </span>
  );
};


const TerminalMockup = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="holo-panel w-full h-full flex flex-col overflow-hidden relative group text-left">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#00f0ff]/20 bg-[#00f0ff]/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20"></div>
          <div className="w-3 h-3 rounded-full bg-white/20"></div>
          <div className="w-3 h-3 rounded-full bg-white/20"></div>
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-[#00f0ff]/70 flex items-center gap-2">
          <Radio size={12} className="animate-pulse" />
          SYS.CONN.ESTABLISHED
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-6 flex-1 font-mono text-[10px] sm:text-sm text-gray-300 overflow-hidden relative">
        <div className="text-[#00f0ff] mb-4 sm:mb-6 opacity-80 whitespace-pre">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>
          Gemini CLI v2.0.6 [HOLO-EDITION]<br/>
          Loaded 1 context files, 0 extensions<br/>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>

        <div className="space-y-3 sm:space-y-5">
          {/* Step 0: Typing Prompt */}
          {step === 0 && (
            <div className="flex gap-3">
              <span className="text-[#b026ff]">❯</span>
              <span className="text-white/50">[agent]</span>
              <span className="text-white"><TypewriterText text="buatkan REST API di ./api" delay={50} /></span>
            </div>
          )}

          {/* Step 1+: User Input Executed */}
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex gap-3 text-[#00f0ff]">
                <span>╸</span>
                <span className="font-semibold">you</span>
                <span className="text-white ml-2">buatkan REST API di ./api</span>
              </div>
            </motion.div>
          )}

          {/* Step 2+: Tool Call 1 */}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex gap-3 text-white/40 ml-2 sm:ml-5">
                <span>├─</span>
                <span className="text-[#00ff66]">run_shell</span>
                <span className="text-white/60 truncate">command:"mkdir -p ./api && touch ./api/index.js"</span>
              </div>
            </motion.div>
          )}

          {/* Step 3+: Tool Call 2 */}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex gap-3 text-white/40 ml-2 sm:ml-5">
                <span>├─</span>
                <span className="text-[#00ff66]">write_file</span>
                <span className="text-white/60">path:"./api/index.js"</span>
              </div>
            </motion.div>
          )}

          {/* Step 4: Assistant Response */}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex gap-3 text-[#b026ff]">
                <span>╸</span>
                <span className="font-semibold">gemini</span>
              </div>
              <div className="ml-2 sm:ml-5 border-l-2 border-[#b026ff]/30 pl-3 sm:pl-4 py-2 text-white/80 leading-relaxed">
                Saya telah membuat folder <span className="text-[#00f0ff]">./api</span> dan file <span className="text-[#00f0ff]">index.js</span> yang berisi setup dasar REST API menggunakan Express.
              </div>
              <div className="ml-2 sm:ml-5 text-[#b026ff]/50">╹</div>
              
              {/* New Prompt waiting */}
              <div className="flex gap-3 mt-3 sm:mt-5">
                <span className="text-[#b026ff]">❯</span>
                <span className="text-white/50">[agent]</span>
                <span className="cursor-block"></span>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Ambient Glow inside terminal */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00f0ff] opacity-5 blur-[80px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, icon: Icon, colorClass }) => (
  <div className="holo-card p-4 sm:p-6 flex flex-col items-center text-center group">
    <div className={`p-2 sm:p-3 rounded-xl bg-white/5 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
      <Icon size={24} className="sm:w-7 sm:h-7" />
    </div>
    <div className="text-2xl sm:text-4xl font-display font-bold text-white mb-1 sm:mb-2 tracking-tight">{value}</div>
    <div className="text-[10px] sm:text-sm text-white/50 font-mono uppercase tracking-wider">{label}</div>
  </div>
);

const FeatureCard = ({ title, desc, icon: Icon, colorClass, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="holo-card p-6 sm:p-8 group relative overflow-hidden text-left"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-[40px] rounded-full transition-opacity duration-500 group-hover:opacity-30 ${colorClass.replace('text-', 'bg-')}`}></div>
    
    <div className={`mb-4 sm:mb-6 ${colorClass}`}>
      <Icon size={32} className="sm:w-9 sm:h-9" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 sm:mb-3 flex items-center gap-2">
      <span className="tech-bracket">[</span>
      {title}
      <span className="tech-bracket">]</span>
    </h3>
    <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
      {desc}
    </p>
  </motion.div>
);

const UseCaseCard = ({ title, items, icon: Icon, colorClass }) => (
  <div className="holo-card p-6 sm:p-8 text-left border-t-2" style={{ borderTopColor: colorClass.includes('00f0ff') ? '#00f0ff' : colorClass.includes('b026ff') ? '#b026ff' : '#00ff66' }}>
    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className={`p-2 sm:p-3 rounded-lg bg-white/5 ${colorClass}`}>
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-wide">{title}</h3>
    </div>
    <ul className="space-y-2 sm:space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 sm:gap-3 text-white/70 text-xs sm:text-sm">
          <Check size={14} className={`mt-0.5 shrink-0 sm:w-4 sm:h-4 ${colorClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 sm:py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#00f0ff] transition-colors pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-[#00f0ff] shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-white/50 group-hover:text-[#00f0ff] shrink-0 transition-colors" size={20} />
        )}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-4 sm:pb-6 text-white/60 text-sm sm:text-base leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [copied, setCopied] = useState(false);
  const [downloads, setDownloads] = useState("...");
  const [activeTab, setActiveTab] = useState("instalasi");

  const handleCopy = () => {
    navigator.clipboard.writeText("npm i -g @ikyyofc/gemini-cli");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToDocs = () => {
    document.getElementById('dokumentasi').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-month/@ikyyofc/gemini-cli')
      .then(res => res.json())
      .then(data => {
        if (data && data.downloads) {
          setDownloads(data.downloads.toLocaleString() + "+");
        } else {
          setDownloads("500+");
        }
      })
      .catch(() => setDownloads("500+"));
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-[#00f0ff]/30 selection:text-white">
      {/* Holographic Background */}
      <div className="holo-bg"></div>
      <div className="holo-orb orb-cyan"></div>
      <div className="holo-orb orb-purple"></div>

      {/* Main Content */}
      <main className="pt-12 pb-24">
        
        {/* HERO SECTION - CENTERED */}
        <section className="max-w-5xl mx-auto px-6 mb-32 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-xs font-mono text-[#00f0ff] mb-8 backdrop-blur-md uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Sistem AI Aktif</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              GEMINI <span className="text-glow-cyan">CLI</span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl leading-relaxed px-4 sm:px-0">
              Terapkan agen AI otonom langsung ke ruang kerja Anda. Mampu mengeksekusi perintah shell, mengelola sistem file, dan memecahkan masalah kompleks tanpa meninggalkan terminal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 w-full sm:w-auto">
              {/* Install Command Box */}
              <div className="flex items-center justify-between holo-panel p-2 pl-4 sm:pl-6 w-full sm:w-auto">
                <div className="font-mono text-xs sm:text-sm text-[#00f0ff] mr-4 sm:mr-6 flex items-center">
                  <span className="text-white/40 mr-2">$</span>
                  <TypewriterText text="npm i -g @ikyyofc/gemini-cli" delay={50} loop={true} loopDelay={4000} />
                </div>
                <button 
                  onClick={handleCopy}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#00f0ff]/20 text-white transition-colors"
                >
                  {copied ? <Check size={18} className="text-[#00ff66]" /> : <Copy size={18} />}
                </button>
              </div>

              <button 
                onClick={scrollToDocs}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#00f0ff] text-black font-bold hover:bg-white transition-colors uppercase tracking-wide text-sm"
              >
                Inisialisasi
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Terminal Mockup - Centered Below */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto h-[380px] sm:h-[450px] lg:h-[500px] relative z-10"
          >
            <TerminalMockup />
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox label="Unduhan / Bulan" value={downloads} icon={Activity} colorClass="text-[#00f0ff]" />
            <StatBox label="Alat Bawaan" value="10+" icon={Wrench} colorClass="text-[#b026ff]" />
            <StatBox label="Sumber Terbuka" value="80%" icon={Code2} colorClass="text-[#00ff66]" />
            <StatBox label="Rata-rata Latensi" value="<50ms" icon={Zap} colorClass="text-[#00f0ff]" />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4 uppercase tracking-wide">
              <span className="tech-bracket">[</span> Modul Inti <span className="tech-bracket">]</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-mono text-sm">
              // KEMAMPUAN_AGEN_OTONOM_DIAKTIFKAN
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              delay={0.1}
              icon={TerminalIcon}
              colorClass="text-[#00f0ff]"
              title="Eksekusi Shell"
              desc="Kemampuan asli untuk menjalankan perintah shell apa pun. Instal paket, jalankan pengujian, bangun proyek, atau kelola repositori git secara otonom."
            />
            <FeatureCard 
              delay={0.2}
              icon={Database}
              colorClass="text-[#b026ff]"
              title="Akses Sistem File"
              desc="Baca, tulis, tambal, dan hapus file. Agen memahami struktur proyek Anda dan dapat memfaktorkan ulang kode di berbagai file."
            />
            <FeatureCard 
              delay={0.3}
              icon={Globe}
              colorClass="text-[#00ff66]"
              title="Integrasi Web"
              desc="Ambil konten mentah dari URL, berinteraksi dengan REST API, dan kikis dokumentasi langsung dari terminal."
            />
            <FeatureCard 
              delay={0.4}
              icon={Cpu}
              colorClass="text-[#00f0ff]"
              title="Kesadaran Konteks"
              desc="Menggunakan GEMINI.md untuk menetapkan aturan global, konteks proyek, dan instruksi spesifik sebelum mengeksekusi tugas apa pun."
            />
            <FeatureCard 
              delay={0.5}
              icon={Layers}
              colorClass="text-[#b026ff]"
              title="Ekstensibilitas"
              desc="Muat keterampilan dan ekstensi kustom dari ~/.gemini/extensions untuk memberi agen kekuatan super baru yang disesuaikan dengan alur kerja Anda."
            />
            <FeatureCard 
              delay={0.6}
              icon={ShieldAlert}
              colorClass="text-[#00ff66]"
              title="Penambalan Aman"
              desc="Menggunakan penggantian string yang ditargetkan (patch_file) alih-alih menulis ulang seluruh file, meminimalkan risiko kerusakan kode."
            />
          </div>
        </section>

        {/* USE CASES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 relative z-10">
          <div className="holo-panel p-6 sm:p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#00f0ff]/5 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="mb-8 sm:mb-12 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 sm:mb-4 uppercase tracking-wide">Parameter Eksekusi</h2>
              <p className="text-white/50 font-mono text-xs sm:text-sm">Apa yang bisa dibangun oleh agen ini?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <UseCaseCard 
                title="Perancah"
                colorClass="text-[#00f0ff]"
                icon={Layers}
                items={[
                  "Inisialisasi proyek full-stack",
                  "Siapkan kode boilerplate otomatis",
                  "Konfigurasi Webpack, Vite, Babel",
                  "Hasilkan struktur folder kompleks"
                ]}
              />
              <UseCaseCard 
                title="Men-debug"
                colorClass="text-[#b026ff]"
                icon={Activity}
                items={[
                  "Analisis log kesalahan & jejak tumpukan",
                  "Temukan dan perbaiki bug kode",
                  "Jalankan pengujian & perbaiki kegagalan",
                  "Analisis hambatan kinerja"
                ]}
              />
              <UseCaseCard 
                title="DevOps"
                colorClass="text-[#00ff66]"
                icon={Network}
                items={[
                  "Tulis Dockerfile & docker-compose",
                  "Konfigurasi pipeline CI/CD",
                  "Kelola cabang dan komit Git",
                  "Terapkan aplikasi melalui shell"
                ]}
              />
            </div>
          </div>
        </section>

                {/* HOW IT WORKS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4 uppercase tracking-wide">
              <span className="tech-bracket">[</span> Alur Eksekusi <span className="tech-bracket">]</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-mono text-sm">
              // BAGAIMANA_AGEN_BEKERJA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#00f0ff]/0 via-[#00f0ff]/20 to-[#00f0ff]/0 -translate-y-1/2 z-0"></div>

            {[
              {
                step: "01",
                title: "Inisialisasi",
                desc: "Jalankan perintah `gemini` di terminal Anda untuk memulai sesi interaktif.",
                icon: TerminalIcon,
                color: "text-[#00f0ff]"
              },
              {
                step: "02",
                title: "Analisis Konteks",
                desc: "Agen membaca file GEMINI.md dan memindai struktur proyek untuk memahami lingkungan.",
                icon: Database,
                color: "text-[#b026ff]"
              },
              {
                step: "03",
                title: "Eksekusi Otonom",
                desc: "Agen menggunakan alat bawaan (shell, file system) untuk menyelesaikan tugas yang diberikan.",
                icon: Cpu,
                color: "text-[#00ff66]"
              },
              {
                step: "04",
                title: "Penyelesaian",
                desc: "Hasil akhir disajikan, dan agen siap untuk menerima instruksi selanjutnya.",
                icon: Check,
                color: "text-[#00f0ff]"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="holo-card p-6 relative z-10 bg-black/80 backdrop-blur-xl flex flex-col items-center text-center group"
              >
                <div className={`text-4xl font-display font-bold opacity-20 absolute top-4 right-4 ${item.color}`}>
                  {item.step}
                </div>
                <div className={`p-4 rounded-full bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DOCUMENTATION SECTION */}
        <section id="dokumentasi" className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 sm:mb-4 uppercase tracking-wide">
              <span className="tech-bracket">[</span> Manual Sistem <span className="tech-bracket">]</span>
            </h2>
            <p className="text-white/50 font-mono text-xs sm:text-sm">Dokumentasi teknis lengkap untuk Gemini CLI.</p>
          </div>

          <div className="holo-panel overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-[#00f0ff]/20 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
              {['instalasi', 'arsitektur', 'api', 'alat', 'ekstensi', 'memori'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-left font-mono text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-l-2 border-[#00f0ff]' 
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10 text-left overflow-y-auto max-h-[600px] custom-scrollbar">
              {activeTab === 'instalasi' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Instalasi & Penggunaan</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI membutuhkan Node.js terinstal di sistem Anda. Instal secara global menggunakan npm:
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-[#00f0ff]">
                    npm install -g @ikyyofc/gemini-cli
                  </div>
                  <p className="text-white/70 leading-relaxed mt-6">
                    Untuk memulai agen, cukup jalankan perintah berikut di direktori proyek Anda:
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-[#00f0ff]">
                    gemini
                  </div>
                  <p className="text-white/70 leading-relaxed mt-4">
                    Ini akan memulai sesi obrolan interaktif di mana agen dapat membaca file Anda dan mengeksekusi perintah.
                  </p>
                </motion.div>
              )}

              {activeTab === 'arsitektur' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Arsitektur Sistem</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI dibangun di sekitar loop agen <strong>ReAct (Reasoning and Acting)</strong> yang memanfaatkan kemampuan pemanggilan fungsi (function calling) asli dari Gemini.
                  </p>
                  
                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Komponen Inti</h4>
                  <ul className="space-y-3 text-white/70 text-sm list-disc pl-5">
                    <li><strong>Agent Loop (<code className="text-[#b026ff]">src/agent.js</code>)</strong>: Mengimplementasikan loop ReAct. Mengirim riwayat percakapan dan alat yang tersedia ke API Gemini. Jika model merespons dengan panggilan fungsi, agen mengeksekusinya secara lokal dan mengembalikan hasilnya.</li>
                    <li><strong>Native Function Calling (<code className="text-[#b026ff]">src/gemini.js</code> & <code className="text-[#b026ff]">src/tools.js</code>)</strong>: Mendefinisikan skema untuk semua alat yang tersedia (misal: <code className="text-[#00ff66]">read_file</code>, <code className="text-[#00ff66]">run_shell</code>) menggunakan format subset OpenAPI.</li>
                    <li><strong>Memory & Context (<code className="text-[#b026ff]">src/memory.js</code>)</strong>: Sistem pemuatan konteks hierarkis berdasarkan file <code className="text-[#00f0ff]">GEMINI.md</code>.</li>
                    <li><strong>Extension System (<code className="text-[#b026ff]">src/extensions.js</code>)</strong>: Memungkinkan perluasan kemampuan CLI dengan perintah dan konteks kustom.</li>
                    <li><strong>Terminal UI (<code className="text-[#b026ff]">src/renderer.js</code> & <code className="text-[#b026ff]">src/input.js</code>)</strong>: Menangani rendering markdown, penyorotan sintaks, dan status eksekusi alat di terminal.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Aliran Data</h4>
                  <ol className="space-y-2 text-white/70 text-sm list-decimal pl-5">
                    <li>Pengguna memasukkan prompt di CLI.</li>
                    <li>CLI memuat konteks dari file <code className="text-[#00f0ff]">GEMINI.md</code> dan ekstensi.</li>
                    <li>Prompt, konteks, dan deklarasi alat dikirim ke API Gemini.</li>
                    <li>Model memutuskan apakah akan merespons dengan teks atau memanggil alat.</li>
                    <li>Jika alat dipanggil, agen mengeksekusinya dan mengirimkan hasilnya kembali ke model.</li>
                    <li>Setelah model selesai bernalar dan bertindak, respons teks akhir dirender ke pengguna.</li>
                  </ol>
                </motion.div>
              )}

              {activeTab === 'api' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Referensi API</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI mengekspos fungsionalitas intinya melalui <code className="text-[#b026ff]">src/gemini.js</code>.
                  </p>

                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h4 className="text-lg font-mono font-bold text-[#00f0ff] mb-2">callGemini(options)</h4>
                    <p className="text-white/70 text-sm mb-3">Fungsi utama untuk berinteraksi dengan API Gemini, mendukung pemanggilan fungsi asli dan input multimodal.</p>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Parameter:</p>
                    <ul className="space-y-1 text-white/70 text-sm list-disc pl-5 mb-3">
                      <li><code className="text-[#b026ff]">messages</code> (Array): Riwayat percakapan.</li>
                      <li><code className="text-[#b026ff]">fileBuffer</code> (Buffer, opsional): Buffer berisi file untuk dikirim sebagai lampiran sebaris.</li>
                      <li><code className="text-[#b026ff]">tools</code> (Array, opsional): Array deklarasi alat.</li>
                      <li><code className="text-[#b026ff]">systemInstruction</code> (String, opsional): Prompt sistem untuk memandu perilaku model.</li>
                    </ul>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Mengembalikan:</p>
                    <p className="text-white/70 text-sm">Promise yang menyelesaikan ke objek berisi <code className="text-[#00ff66]">parts</code>, <code className="text-[#00ff66]">raw</code>, dan <code className="text-[#00ff66]">full</code>.</p>
                  </div>

                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h4 className="text-lg font-mono font-bold text-[#00f0ff] mb-2">chat(messages, systemInstruction)</h4>
                    <p className="text-white/70 text-sm mb-3">Pembungkus yang disederhanakan di sekitar <code className="text-[#00f0ff]">callGemini</code> untuk obrolan teks biasa tanpa alat.</p>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Parameter:</p>
                    <ul className="space-y-1 text-white/70 text-sm list-disc pl-5 mb-3">
                      <li><code className="text-[#b026ff]">messages</code> (Array): Riwayat percakapan.</li>
                      <li><code className="text-[#b026ff]">systemInstruction</code> (String, opsional): Prompt sistem.</li>
                    </ul>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Mengembalikan:</p>
                    <p className="text-white/70 text-sm">Promise yang menyelesaikan ke respons teks gabungan dari model.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'alat' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Alat Bawaan (Native Tools)</h3>
                  <p className="text-white/70 leading-relaxed">
                    Agen dilengkapi dengan alat bawaan yang memungkinkannya berinteraksi dengan sistem Anda. Alat yang ditandai dengan <span className="text-[#ff3366]">*</span> memerlukan konfirmasi pengguna sebelum dieksekusi.
                  </p>
                  
                  <div className="space-y-6 mt-4">
                    <div>
                      <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Operasi Sistem File</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">read_file</div>
                          <div className="text-white/70 text-sm">Membaca isi file dengan nomor baris.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">write_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Membuat atau menimpa file. Membuat direktori induk secara otomatis.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">patch_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Mengganti string spesifik dengan aman. Lebih aman daripada menulis ulang seluruh file.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">append_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Menambahkan teks ke akhir file yang ada.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">delete_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Menghapus file atau direktori kosong secara permanen.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">move_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Memindahkan atau mengganti nama file atau direktori.</div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Operasi Direktori & Pencarian</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">list_dir</div>
                          <div className="text-white/70 text-sm">Mencantumkan file dan subdirektori. Mengecualikan node_modules dan .git secara default.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">create_dir <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Membuat direktori dan semua direktori induk yang diperlukan (mkdir -p).</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">find_files</div>
                          <div className="text-white/70 text-sm">Mencari file yang cocok dengan pola nama (glob) secara rekursif.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">search_in_files</div>
                          <div className="text-white/70 text-sm">Mencari pola teks (grep) di dalam file secara rekursif.</div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Eksekusi & Lingkungan</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">run_shell <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Mengeksekusi perintah shell apa pun (npm, git, dll). Mengembalikan stdout dan stderr.</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">get_env</div>
                          <div className="text-white/70 text-sm">Mengambil informasi tentang lingkungan saat ini (CWD, platform, versi Node, cabang Git).</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[120px]">read_url</div>
                          <div className="text-white/70 text-sm">Mengambil konten mentah dari URL (halaman web, REST API, file mentah).</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ekstensi' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Sistem Ekstensi</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI mendukung sistem ekstensi yang memungkinkan Anda menambahkan perintah dan konteks kustom ke agen. Ekstensi dikelola di <code className="text-[#00f0ff]">~/.gemini/extensions/</code>.
                  </p>
                  
                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Struktur Ekstensi</h4>
                  <p className="text-white/70 text-sm">Sebuah ekstensi adalah direktori yang berisi setidaknya file manifes <code className="text-[#b026ff]">gemini-extension.json</code>. Ini juga dapat menyertakan file <code className="text-[#b026ff]">GEMINI.md</code> untuk konteks.</p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300">
                    ~/.gemini/extensions/my-extension/<br/>
                    ├── gemini-extension.json<br/>
                    └── GEMINI.md
                  </div>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Perintah Kustom</h4>
                  <p className="text-white/70 text-sm">Perintah kustom yang didefinisikan dalam manifes dapat dipanggil di CLI menggunakan sintaks <code className="text-[#00ff66]">/extension-name:command-name [args]</code>.</p>
                  
                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Mengelola Ekstensi</h4>
                  <p className="text-white/70 text-sm mb-2">Anda dapat mengelola ekstensi menggunakan perintah <code className="text-[#00f0ff]">/ext</code> di CLI interaktif:</p>
                  <ul className="space-y-1 text-white/70 text-sm list-disc pl-5">
                    <li><code className="text-[#b026ff]">/ext list</code>: Mencantumkan semua ekstensi yang diinstal.</li>
                    <li><code className="text-[#b026ff]">/ext install &lt;path-or-url&gt;</code>: Menginstal ekstensi dari jalur lokal atau repositori Git.</li>
                    <li><code className="text-[#b026ff]">/ext uninstall &lt;name&gt;</code>: Menghapus instalan ekstensi.</li>
                    <li><code className="text-[#b026ff]">/ext enable &lt;name&gt;</code>: Mengaktifkan ekstensi.</li>
                    <li><code className="text-[#b026ff]">/ext disable &lt;name&gt;</code>: Menonaktifkan ekstensi.</li>
                    <li><code className="text-[#b026ff]">/ext update &lt;name&gt;</code>: Memperbarui ekstensi (jika diinstal via Git).</li>
                  </ul>
                </motion.div>
              )}

              {activeTab === 'memori' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Memori & Konteks (GEMINI.md)</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI menggunakan sistem pemuatan konteks hierarkis berdasarkan file <code className="text-[#00f0ff]">GEMINI.md</code>. Ini memungkinkan Anda memberikan instruksi persisten, konvensi pengkodean, dan pengetahuan khusus proyek kepada agen AI.
                  </p>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Hierarki Konteks</h4>
                  <p className="text-white/70 text-sm mb-2">Saat Anda memulai percakapan, CLI memuat konteks dari file <code className="text-[#00f0ff]">GEMINI.md</code> dalam urutan berikut (prioritas terendah ke tertinggi):</p>
                  <ol className="space-y-2 text-white/70 text-sm list-decimal pl-5">
                    <li><strong>Konteks Global</strong>: <code className="text-[#b026ff]">~/.gemini/GEMINI.md</code> - Gunakan ini untuk preferensi global.</li>
                    <li><strong>Konteks Ekstensi</strong>: <code className="text-[#b026ff]">~/.gemini/extensions/&lt;name&gt;/GEMINI.md</code> - Ekstensi dapat menyuntikkan konteks mereka sendiri saat diaktifkan.</li>
                    <li><strong>Konteks Proyek</strong>: Berjalan naik dari Direktori Kerja Saat Ini (CWD) ke akar proyek (ditentukan oleh keberadaan folder <code className="text-[#b026ff]">.git</code>). Ini memungkinkan Anda menentukan aturan di seluruh proyek di akar, dan aturan spesifik untuk subdirektori.</li>
                  </ol>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Impor</h4>
                  <p className="text-white/70 text-sm mb-2">Anda dapat memodulasi file konteks Anda menggunakan sintaks <code className="text-[#00ff66]">@./path/to/file.md</code>. CLI akan secara rekursif menyelesaikan dan menyisipkan impor ini.</p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300">
                    # Konteks Proyek<br/>
                    Ini adalah proyek React.<br/>
                    <br/>
                    @./docs/conventions.md<br/>
                    @./docs/architecture.md
                  </div>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Mengelola Memori</h4>
                  <p className="text-white/70 text-sm mb-2">Anda dapat berinteraksi dengan sistem memori menggunakan perintah <code className="text-[#00f0ff]">/memory</code> di CLI interaktif:</p>
                  <ul className="space-y-1 text-white/70 text-sm list-disc pl-5">
                    <li><code className="text-[#b026ff]">/memory show</code>: Menampilkan semua file konteks yang saat ini dimuat dan isinya.</li>
                    <li><code className="text-[#b026ff]">/memory reload</code>: Memuat ulang file konteks dari disk.</li>
                    <li><code className="text-[#b026ff]">/memory add &lt;text&gt;</code>: Menambahkan teks ke file <code className="text-[#b026ff]">~/.gemini/GEMINI.md</code> global Anda.</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4 uppercase tracking-wide">
              <span className="tech-bracket">[</span> FAQ <span className="tech-bracket">]</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-mono text-sm">
              // PERTANYAAN_YANG_SERING_DIAJUKAN
            </p>
          </div>

          <div className="holo-panel p-6 sm:p-10">
            <FaqItem 
              question="Apakah Gemini CLI gratis digunakan?" 
              answer="Ya, Gemini CLI sepenuhnya gratis untuk digunakan dan Anda tidak memerlukan API Key sama sekali untuk mulai menggunakannya." 
            />
            <FaqItem 
              question="Model AI apa yang digunakan di balik layar?" 
              answer="Gemini CLI menggunakan model AI yang paling canggih saat ini, yaitu gemini pro latest (alias gemini 3.1 pro), untuk memberikan hasil yang maksimal dan cerdas." 
            />
            <FaqItem 
              question="Apakah aman memberikan akses shell ke AI?" 
              answer="Keamanan adalah prioritas utama. Secara default, semua operasi yang berpotensi merusak (seperti menjalankan perintah shell, menulis file, atau menghapus file) memerlukan konfirmasi eksplisit dari Anda sebelum dieksekusi. Anda memegang kendali penuh." 
            />
            <FaqItem 
              question="Bagaimana cara agen memahami proyek saya?" 
              answer="Agen menggunakan alat bawaan untuk menjelajahi sistem file Anda. Selain itu, Anda dapat membuat file GEMINI.md di direktori proyek Anda untuk memberikan konteks spesifik, aturan pengkodean, atau arsitektur proyek yang akan dibaca agen secara otomatis." 
            />
            <FaqItem 
              question="Bisakah saya menambahkan alat (tools) saya sendiri?" 
              answer="Tentu! Gemini CLI memiliki sistem ekstensi yang kuat. Anda dapat membuat ekstensi kustom di ~/.gemini/extensions/ untuk menambahkan perintah baru, alat khusus, atau konteks tambahan yang disesuaikan dengan alur kerja Anda." 
            />
          </div>
        </section>

        {/* FOOTER / OWNER INFO */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 pb-12 relative z-10 border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                <TerminalIcon size={20} />
              </div>
              <div>
                <h3 className="text-white font-display font-bold tracking-wide">GEMINI CLI</h3>
                <p className="text-white/50 text-xs font-mono">Created by @ikyyofc</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://www.npmjs.com/package/@ikyyofc/gemini-cli" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-[#cb3837]/20 hover:text-[#cb3837] text-white/70 transition-all group" title="NPM">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>
              </a>
              <a href="https://github.com/ikyyyofc" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-white/20 hover:text-white text-white/70 transition-all group" title="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://wa.me/6287866255637" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] text-white/70 transition-all group" title="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://instagram.com/kyy.ofc" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 hover:text-[#E1306C] text-white/70 transition-all group" title="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div className="text-center mt-12 text-white/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} IkyyOFC. All rights reserved. <br/>
            SYS.STATUS: ONLINE
          </div>
        </footer>

      </main>
    </div>
  );
}