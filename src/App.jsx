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
  Radio
} from 'lucide-react';

// --- COMPONENTS ---

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
              <span className="text-white">buatkan REST API di ./api</span>
              <span className="cursor-block"></span>
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
                <div className="font-mono text-xs sm:text-sm text-[#00f0ff] mr-4 sm:mr-6">
                  <span className="text-white/40 mr-2">$</span>
                  npm i -g @ikyyofc/gemini-cli
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

        {/* DOCUMENTATION SECTION */}
        <section id="dokumentasi" className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 sm:mb-4 uppercase tracking-wide">
              <span className="tech-bracket">[</span> Manual Sistem <span className="tech-bracket">]</span>
            </h2>
            <p className="text-white/50 font-mono text-xs sm:text-sm">Dokumentasi teknis untuk Gemini CLI.</p>
          </div>

          <div className="holo-panel overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-[#00f0ff]/20 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
              {['instalasi', 'konteks', 'ekstensi', 'alat'].map((tab) => (
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
            <div className="flex-1 p-6 md:p-10 text-left">
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

              {activeTab === 'konteks' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">File Konteks (GEMINI.md)</h3>
                  <p className="text-white/70 leading-relaxed">
                    Anda dapat memandu perilaku agen dengan membuat file <code className="text-[#00f0ff]">GEMINI.md</code> di direktori proyek Anda.
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300 overflow-x-auto">
                    <pre>{`# Konteks Proyek
Ini adalah proyek React menggunakan Vite dan Tailwind CSS.

# Aturan
- Selalu gunakan komponen fungsional.
- Gunakan Tailwind untuk styling.
- Jangan gunakan var, gunakan let/const.`}</pre>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Agen akan membaca file ini sebelum merespons, memastikannya mengikuti standar pengkodean Anda.
                  </p>
                </motion.div>
              )}

              {activeTab === 'ekstensi' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Ekstensi & Keterampilan</h3>
                  <p className="text-white/70 leading-relaxed">
                    Tingkatkan kemampuan agen Anda dengan menambahkan keterampilan kustom di <code className="text-[#00f0ff]">~/.gemini/extensions/</code>.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Setiap keterampilan adalah folder yang berisi file <code className="text-[#00f0ff]">SKILL.md</code> yang mendefinisikan instruksi spesifik, alur kerja, atau alat untuk tugas tertentu (misalnya, TDD, Desain Frontend, Debugging).
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300">
                    ~/.gemini/extensions/<br/>
                    ├── frontend-design/<br/>
                    │   └── SKILL.md<br/>
                    └── debugging/<br/>
                        └── SKILL.md
                  </div>
                </motion.div>
              )}

              {activeTab === 'alat' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Alat Bawaan (Native Tools)</h3>
                  <p className="text-white/70 leading-relaxed">
                    Agen dilengkapi dengan alat bawaan yang memungkinkannya berinteraksi dengan sistem Anda:
                  </p>
                  <ul className="space-y-4 mt-4">
                    <li className="flex gap-3">
                      <div className="text-[#00f0ff] font-mono mt-1">read_file</div>
                      <div className="text-white/70 text-sm">Membaca isi file dengan nomor baris.</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="text-[#00f0ff] font-mono mt-1">write_file</div>
                      <div className="text-white/70 text-sm">Membuat atau menimpa file.</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="text-[#00f0ff] font-mono mt-1">patch_file</div>
                      <div className="text-white/70 text-sm">Mengganti string spesifik dengan aman.</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="text-[#00f0ff] font-mono mt-1">run_shell</div>
                      <div className="text-white/70 text-sm">Mengeksekusi perintah shell apa pun (npm, git, dll).</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="text-[#00f0ff] font-mono mt-1">read_url</div>
                      <div className="text-white/70 text-sm">Mengambil konten mentah dari web atau API.</div>
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
