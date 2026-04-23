import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BookOpen,
  GitBranch,
  Box,
  Layers,
  Zap,
  Sparkles,
  Globe,
  Wrench,
  ArrowRight
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
    <div className="glass-panel w-full h-full flex flex-col overflow-hidden relative group text-left">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="mx-auto text-xs font-mono text-white/50">gemini-cli — bash</div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 flex-1 font-mono text-sm text-gray-300 overflow-hidden relative">
        <div className="text-[#00E5FF] mb-6 opacity-80">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>
          Gemini CLI v2.0.6<br/>
          Loaded 1 context files, 0 extensions<br/>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>

        <div className="space-y-5">
          {/* Step 0: Prompt */}
          <div className="flex gap-3">
            <span className="text-[#FF2E93]">❯</span>
            <span className="text-white/50">[agent]</span>
          </div>

          {/* Step 1: User Input */}
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-3 text-[#00E5FF]">
                <span>╸</span>
                <span className="font-semibold">you</span>
                <span className="text-white ml-2">buatkan REST API di ./api</span>
              </div>
            </motion.div>
          )}

          {/* Step 2: Tool Call */}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-3 text-white/40 ml-5">
                <span>├─</span>
                <span className="text-[#FF8A00]">run_shell</span>
                <span className="text-white/60">command:"mkdir -p ./api && touch ./api/index.js"</span>
              </div>
            </motion.div>
          )}

          {/* Step 3: Tool Call 2 */}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-3 text-white/40 ml-5">
                <span>├─</span>
                <span className="text-[#FF8A00]">write_file</span>
                <span className="text-white/60">path:"./api/index.js"</span>
              </div>
            </motion.div>
          )}

          {/* Step 4: Assistant Response */}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-3 text-[#B537F2]">
                <span>╸</span>
                <span className="font-semibold">gemini</span>
              </div>
              <div className="ml-5 border-l-2 border-[#B537F2]/30 pl-4 py-2 text-white/80 leading-relaxed">
                Saya telah membuat folder <span className="text-[#00E5FF]">./api</span> dan file <span className="text-[#00E5FF]">index.js</span> yang berisi setup dasar REST API menggunakan Express.
              </div>
              <div className="ml-5 text-[#B537F2]/50">╹</div>
            </motion.div>
          )}

          {/* Blinking Cursor */}
          {step < 4 && (
            <div className="flex gap-3 mt-5">
              <span className="text-[#FF2E93]">❯</span>
              <span className="text-white/50">[agent]</span>
              <span className="cursor-block"></span>
            </div>
          )}
        </div>
        
        {/* Ambient Glow inside terminal */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00E5FF] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, icon: Icon, colorClass }) => (
  <div className="glass-card p-6 flex flex-col items-center text-center group">
    <div className={`p-3 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
      <Icon size={28} />
    </div>
    <div className="text-4xl font-display font-bold text-white mb-2">{value}</div>
    <div className="text-sm text-white/60 font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ title, desc, icon: Icon, colorClass, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="glass-card p-8 group relative overflow-hidden text-left"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-[40px] rounded-full transition-opacity duration-500 group-hover:opacity-30 ${colorClass.replace('text-', 'bg-')}`}></div>
    
    <div className={`mb-6 ${colorClass}`}>
      <Icon size={36} strokeWidth={1.5} />
    </div>
    <h3 className="text-2xl font-display font-bold text-white mb-3">
      {title}
    </h3>
    <p className="text-white/60 leading-relaxed">
      {desc}
    </p>
  </motion.div>
);

const UseCaseCard = ({ title, items, icon: Icon, colorClass }) => (
  <div className="glass-card p-8 text-left">
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 rounded-xl bg-white/5 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-display font-bold text-white">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-white/70">
          <Check size={18} className={`mt-0.5 shrink-0 ${colorClass}`} />
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
    <div className="min-h-screen relative selection:bg-[#FF2E93]/30 selection:text-white">
      {/* Fluid Background */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {/* Main Content */}
      <main className="pt-16 pb-24">
        
        {/* HERO SECTION - CENTERED */}
        <section className="max-w-5xl mx-auto px-6 mb-32 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 mb-8 backdrop-blur-md">
              <Sparkles size={16} className="text-[#FF8A00]" />
              <span>AI Terminal Generasi Berikutnya</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1]">
              Terminal Anda, <br/>
              <span className="text-gradient-primary">Bertenaga Super.</span>
            </h1>
            
            <p className="text-lg text-white/60 mb-10 max-w-2xl leading-relaxed">
              Terapkan agen AI otonom langsung ke ruang kerja Anda. Mampu mengeksekusi perintah shell, mengelola sistem file, dan memecahkan masalah kompleks tanpa meninggalkan terminal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {/* Install Command Box */}
              <div className="flex items-center justify-between glass-panel p-2 pl-6 w-full sm:w-auto">
                <div className="font-mono text-sm text-white/90 mr-6">
                  npm i -g @ikyyofc/gemini-cli
                </div>
                <button 
                  onClick={handleCopy}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {copied ? <Check size={18} className="text-[#27C93F]" /> : <Copy size={18} />}
                </button>
              </div>

              <button 
                onClick={scrollToDocs}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform"
              >
                Mulai Sekarang
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Terminal Mockup - Centered Below */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto h-[450px] lg:h-[500px]"
          >
            <TerminalMockup />
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox label="Unduhan / Bulan" value={downloads} icon={Activity} colorClass="text-[#FF2E93]" />
            <StatBox label="Alat Bawaan" value="10+" icon={Wrench} colorClass="text-[#00E5FF]" />
            <StatBox label="Sumber Terbuka" value="80%" icon={Code2} colorClass="text-[#FF8A00]" />
            <StatBox label="Rata-rata Latensi" value="&lt;50ms" icon={Zap} colorClass="text-[#B537F2]" />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Keluarkan <span className="text-gradient-secondary">Kekuatan Asli</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Bukan sekadar chatbot. Gemini CLI memiliki akses langsung ke kemampuan asli sistem Anda, memungkinkannya bertindak sebagai pengembang otonom sejati.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              delay={0.1}
              icon={TerminalIcon}
              colorClass="text-[#FF2E93]"
              title="Eksekusi Shell"
              desc="Kemampuan asli untuk menjalankan perintah shell apa pun. Instal paket, jalankan pengujian, bangun proyek, atau kelola repositori git secara otonom."
            />
            <FeatureCard 
              delay={0.2}
              icon={Database}
              colorClass="text-[#00E5FF]"
              title="Akses Sistem File"
              desc="Baca, tulis, tambal, dan hapus file. Agen memahami struktur proyek Anda dan dapat memfaktorkan ulang kode di berbagai file."
            />
            <FeatureCard 
              delay={0.3}
              icon={Globe}
              colorClass="text-[#FF8A00]"
              title="Integrasi Web"
              desc="Ambil konten mentah dari URL, berinteraksi dengan REST API, dan kikis dokumentasi langsung dari terminal."
            />
            <FeatureCard 
              delay={0.4}
              icon={Cpu}
              colorClass="text-[#B537F2]"
              title="Kesadaran Konteks"
              desc="Menggunakan GEMINI.md untuk menetapkan aturan global, konteks proyek, dan instruksi spesifik sebelum mengeksekusi tugas apa pun."
            />
            <FeatureCard 
              delay={0.5}
              icon={Box}
              colorClass="text-[#27C93F]"
              title="Ekstensibilitas"
              desc="Muat keterampilan dan ekstensi kustom dari ~/.gemini/extensions untuk memberi agen kekuatan super baru yang disesuaikan dengan alur kerja Anda."
            />
            <FeatureCard 
              delay={0.6}
              icon={ShieldAlert}
              colorClass="text-[#FFBD2E]"
              title="Penambalan Aman"
              desc="Menggunakan penggantian string yang ditargetkan (patch_file) alih-alih menulis ulang seluruh file, meminimalkan risiko kerusakan kode."
            />
          </div>
        </section>

        {/* USE CASES SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="glass-panel p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#FF2E93]/10 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Apa yang bisa Anda bangun?</h2>
              <p className="text-white/60 text-lg">Kemungkinannya tak terbatas ketika AI Anda memiliki tangan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <UseCaseCard 
                title="Perancah (Scaffolding)"
                colorClass="text-[#00E5FF]"
                icon={Layers}
                items={[
                  "Inisialisasi proyek full-stack",
                  "Siapkan kode boilerplate secara otomatis",
                  "Konfigurasi Webpack, Vite, atau Babel",
                  "Hasilkan struktur folder yang kompleks"
                ]}
              />
              <UseCaseCard 
                title="Men-debug"
                colorClass="text-[#FF8A00]"
                icon={Activity}
                items={[
                  "Analisis log kesalahan dan jejak tumpukan",
                  "Temukan dan perbaiki bug di kode sumber",
                  "Jalankan pengujian dan perbaiki kegagalan",
                  "Analisis hambatan kinerja"
                ]}
              />
              <UseCaseCard 
                title="DevOps & Sistem"
                colorClass="text-[#B537F2]"
                icon={Network}
                items={[
                  "Tulis Dockerfile dan docker-compose",
                  "Konfigurasi pipeline CI/CD",
                  "Kelola cabang dan komit Git",
                  "Terapkan aplikasi melalui shell"
                ]}
              />
            </div>
          </div>
        </section>

        {/* DOCUMENTATION SECTION */}
        <section id="dokumentasi" className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Dokumentasi</h2>
            <p className="text-white/60">Semua yang perlu Anda ketahui untuk menguasai Gemini CLI.</p>
          </div>

          <div className="glass-panel overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Tabs Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
              {['instalasi', 'konteks', 'ekstensi', 'alat'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-xl text-left font-medium transition-all whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-white/10 text-white shadow-lg' 
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 md:p-10 bg-[#05050A]/50 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/80 space-y-6"
                >
                  {activeTab === 'instalasi' && (
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-6">Instalasi & Penggunaan</h3>
                      <p className="mb-4">Instal paket secara global menggunakan npm:</p>
                      <div className="bg-black/50 p-4 rounded-xl font-mono text-sm text-[#00E5FF] mb-6 border border-white/10">
                        npm i -g @ikyyofc/gemini-cli
                      </div>
                      <p className="mb-4">Untuk memulai agen interaktif, cukup jalankan:</p>
                      <div className="bg-black/50 p-4 rounded-xl font-mono text-sm text-[#FF8A00] mb-6 border border-white/10">
                        gemini
                      </div>
                      <p className="text-white/60">
                        Anda akan memerlukan Kunci API Gemini. CLI akan meminta Anda untuk memasukkannya pada proses pertama dan menyimpannya dengan aman.
                      </p>
                    </div>
                  )}

                  {activeTab === 'konteks' && (
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-6">File Konteks (GEMINI.md)</h3>
                      <p className="mb-4">
                        Anda dapat memandu perilaku AI dengan membuat file <code className="text-[#FF2E93] bg-white/10 px-2 py-1 rounded">GEMINI.md</code> di root proyek Anda.
                      </p>
                      <div className="bg-black/50 p-4 rounded-xl font-mono text-sm text-white/70 mb-6 border border-white/10 whitespace-pre">
{`---
name: aturan-proyek-saya
description: Aturan global untuk proyek ini
---

# Konteks Proyek
Ini adalah proyek React menggunakan Tailwind CSS.

# Aturan
1. Selalu gunakan komponen fungsional.
2. Jangan pernah gunakan var, hanya let dan const.
3. Tulis pengujian untuk setiap komponen baru.`}
                      </div>
                    </div>
                  )}

                  {activeTab === 'ekstensi' && (
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-6">Ekstensi & Keterampilan</h3>
                      <p className="mb-4">
                        Ekstensi memungkinkan Anda menambahkan alat dan keterampilan khusus ke agen. Mereka dimuat dari <code className="text-[#00E5FF] bg-white/10 px-2 py-1 rounded">~/.gemini/extensions/</code>.
                      </p>
                      <ul className="list-disc list-inside space-y-3 text-white/70 ml-2">
                        <li><strong>Keterampilan (Skills):</strong> File Markdown yang mengajarkan AI cara melakukan alur kerja tertentu (misalnya, TDD, Debugging).</li>
                        <li><strong>Alat (Tools):</strong> File JavaScript yang mengekspor fungsi baru yang dapat dipanggil AI secara asli.</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === 'alat' && (
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-6">Alat Bawaan</h3>
                      <p className="mb-6">Agen dilengkapi dengan alat bawaan yang kuat:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { name: 'run_shell', desc: 'Eksekusi perintah terminal' },
                          { name: 'read_file', desc: 'Baca isi file' },
                          { name: 'write_file', desc: 'Buat atau timpa file' },
                          { name: 'patch_file', desc: 'Modifikasi string tertentu dengan aman' },
                          { name: 'list_dir', desc: 'Jelajahi direktori' },
                          { name: 'read_url', desc: 'Ambil konten web atau API' },
                        ].map(tool => (
                          <div key={tool.name} className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="font-mono text-[#B537F2] mb-1">{tool.name}</div>
                            <div className="text-sm text-white/60">{tool.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#05050A] py-8 text-center">
        <p className="text-white/40 text-sm">
          Dibuat dengan <span className="text-[#FF2E93]">♥</span> oleh Komunitas Open Source. <br/>
          © {new Date().getFullYear()} Gemini CLI. Hak cipta dilindungi undang-undang.
        </p>
      </footer>
    </div>
  );
}