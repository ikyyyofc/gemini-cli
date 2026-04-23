const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

const instalasiNew = `              {activeTab === 'instalasi' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Instalasi & Penggunaan</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI membutuhkan Node.js terinstal di sistem Anda. Instal secara global menggunakan npm:
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-[#00f0ff]">
                    npm install -g @ikyyofc/gemini-cli
                  </div>
                  
                  <h4 className="text-lg font-bold text-[#00f0ff] mt-6">Prasyarat</h4>
                  <p className="text-white/70 leading-relaxed">
                    Anda memerlukan API Key dari Google AI Studio. Dapatkan di <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#b026ff] hover:underline">Google AI Studio</a>.
                    Setelah itu, atur sebagai variabel lingkungan:
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300">
                    <span className="text-white/50"># Linux / macOS</span><br/>
                    export GEMINI_API_KEY="your_api_key_here"<br/><br/>
                    <span className="text-white/50"># Windows (PowerShell)</span><br/>
                    $env:GEMINI_API_KEY="your_api_key_here"
                  </div>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-6">Memulai Sesi</h4>
                  <p className="text-white/70 leading-relaxed">
                    Jalankan perintah berikut di direktori proyek Anda untuk memulai agen interaktif:
                  </p>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-[#00f0ff]">
                    gemini
                  </div>
                  <p className="text-white/70 leading-relaxed mt-4">
                    Agen akan memuat konteks dari file <code className="text-[#00f0ff]">GEMINI.md</code> (jika ada) dan siap menerima perintah Anda. Anda dapat meminta agen untuk membuat file, menjalankan skrip, atau menganalisis kode.
                  </p>
                </motion.div>
              )}`;

const arsitekturNew = `              {activeTab === 'arsitektur' && (
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

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Aliran Data (ReAct Loop)</h4>
                  <ol className="space-y-2 text-white/70 text-sm list-decimal pl-5">
                    <li>Pengguna memasukkan prompt di CLI.</li>
                    <li>CLI memuat konteks dari file <code className="text-[#00f0ff]">GEMINI.md</code> dan ekstensi.</li>
                    <li>Prompt, konteks, dan deklarasi alat dikirim ke API Gemini.</li>
                    <li>Model memutuskan apakah akan merespons dengan teks atau memanggil alat (misal: <code className="text-[#00ff66]">read_file</code>).</li>
                    <li>Jika alat dipanggil, agen mengeksekusinya secara lokal (meminta konfirmasi jika destruktif) dan mengirimkan hasilnya kembali ke model sebagai <code className="text-[#b026ff]">functionResponse</code>.</li>
                    <li>Langkah 4 dan 5 diulang hingga model memiliki informasi yang cukup untuk menyelesaikan tugas.</li>
                    <li>Setelah model selesai bernalar dan bertindak, respons teks akhir dirender ke pengguna.</li>
                  </ol>
                </motion.div>
              )}`;

const apiNew = `              {activeTab === 'api' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Referensi API</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI mengekspos fungsionalitas intinya melalui <code className="text-[#b026ff]">src/gemini.js</code> dan <code className="text-[#b026ff]">src/tools.js</code>.
                  </p>

                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h4 className="text-lg font-mono font-bold text-[#00f0ff] mb-2">callGemini(options)</h4>
                    <p className="text-white/70 text-sm mb-3">Fungsi utama untuk berinteraksi dengan API Gemini, mendukung pemanggilan fungsi asli dan input multimodal.</p>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Parameter:</p>
                    <ul className="space-y-1 text-white/70 text-sm list-disc pl-5 mb-3">
                      <li><code className="text-[#b026ff]">messages</code> (Array): Riwayat percakapan.</li>
                      <li><code className="text-[#b026ff]">fileBuffer</code> (Buffer, opsional): Buffer berisi file untuk dikirim sebagai lampiran sebaris.</li>
                      <li><code className="text-[#b026ff]">tools</code> (Array, opsional): Array deklarasi alat (biasanya <code className="text-[#00ff66]">GEMINI_TOOLS</code>).</li>
                      <li><code className="text-[#b026ff]">systemInstruction</code> (String, opsional): Prompt sistem untuk memandu perilaku model.</li>
                    </ul>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Mengembalikan:</p>
                    <p className="text-white/70 text-sm">Promise yang menyelesaikan ke objek berisi <code className="text-[#00ff66]">parts</code>, <code className="text-[#00ff66]">raw</code>, dan <code className="text-[#00ff66]">full</code>.</p>
                  </div>

                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h4 className="text-lg font-mono font-bold text-[#00f0ff] mb-2">executeTool(name, args, options)</h4>
                    <p className="text-white/70 text-sm mb-3">Mengeksekusi alat bawaan berdasarkan nama dan argumen yang diberikan oleh model.</p>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Parameter:</p>
                    <ul className="space-y-1 text-white/70 text-sm list-disc pl-5 mb-3">
                      <li><code className="text-[#b026ff]">name</code> (String): Nama alat (misal: "read_file").</li>
                      <li><code className="text-[#b026ff]">args</code> (Object): Argumen untuk alat tersebut.</li>
                      <li><code className="text-[#b026ff]">options.autoApprove</code> (Boolean): Jika true, melewati konfirmasi pengguna untuk alat destruktif.</li>
                    </ul>
                    <p className="text-white/50 text-xs font-bold uppercase mb-1">Mengembalikan:</p>
                    <p className="text-white/70 text-sm">Promise yang menyelesaikan ke objek <code className="text-[#00ff66]">{'{ result }'}</code> atau <code className="text-[#ff3366]">{'{ error }'}</code>.</p>
                  </div>
                </motion.div>
              )}`;

const alatNew = `              {activeTab === 'alat' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Alat Bawaan (Native Tools)</h3>
                  <p className="text-white/70 leading-relaxed">
                    Agen dilengkapi dengan alat bawaan yang memungkinkannya berinteraksi dengan sistem Anda. Alat yang ditandai dengan <span className="text-[#ff3366]">*</span> bersifat destruktif dan memerlukan konfirmasi pengguna sebelum dieksekusi (kecuali dijalankan dengan flag <code className="text-[#00f0ff]">--yes</code>).
                  </p>
                  
                  <div className="space-y-6 mt-4">
                    <div>
                      <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Operasi Sistem File</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">read_file</div>
                          <div className="text-white/70 text-sm">Membaca isi file. Mengembalikan hingga 400 baris dengan nomor baris. <br/><span className="text-white/40 text-xs">Parameter: path (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">write_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Membuat atau menimpa file. Membuat direktori induk secara otomatis. <br/><span className="text-white/40 text-xs">Parameter: path (String), content (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">patch_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Mengganti string spesifik dengan aman. old_str harus unik di dalam file. <br/><span className="text-white/40 text-xs">Parameter: path (String), old_str (String), new_str (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">append_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Menambahkan teks ke akhir file yang ada. <br/><span className="text-white/40 text-xs">Parameter: path (String), content (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">delete_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Menghapus file atau direktori kosong secara permanen. <br/><span className="text-white/40 text-xs">Parameter: path (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">move_file <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Memindahkan atau mengganti nama file atau direktori. <br/><span className="text-white/40 text-xs">Parameter: from (String), to (String)</span></div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Operasi Direktori & Pencarian</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">list_dir</div>
                          <div className="text-white/70 text-sm">Mencantumkan file dan subdirektori. Mengecualikan node_modules dan .git. <br/><span className="text-white/40 text-xs">Parameter: path (String), show_hidden (Boolean)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">create_dir <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Membuat direktori dan semua direktori induk yang diperlukan (mkdir -p). <br/><span className="text-white/40 text-xs">Parameter: path (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">find_files</div>
                          <div className="text-white/70 text-sm">Mencari file yang cocok dengan pola nama (glob) secara rekursif. <br/><span className="text-white/40 text-xs">Parameter: pattern (String), dir (String)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">search_in_files</div>
                          <div className="text-white/70 text-sm">Mencari pola teks (grep) di dalam file secara rekursif. <br/><span className="text-white/40 text-xs">Parameter: pattern (String), dir (String), extension (String), case_insensitive (Boolean)</span></div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Eksekusi & Lingkungan</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">run_shell <span className="text-[#ff3366]">*</span></div>
                          <div className="text-white/70 text-sm">Mengeksekusi perintah shell apa pun (npm, git, dll). Mengembalikan stdout dan stderr. <br/><span className="text-white/40 text-xs">Parameter: command (String), cwd (String), timeout (Number)</span></div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">get_env</div>
                          <div className="text-white/70 text-sm">Mengambil informasi tentang lingkungan saat ini (CWD, platform, versi Node, cabang Git).</div>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="text-[#00f0ff] font-mono min-w-[140px]">read_url</div>
                          <div className="text-white/70 text-sm">Mengambil konten mentah dari URL (halaman web, REST API, file mentah). Mengembalikan hingga 50KB. <br/><span className="text-white/40 text-xs">Parameter: url (String), headers (String)</span></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}`;

const ekstensiNew = `              {activeTab === 'ekstensi' && (
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

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Contoh Manifest (gemini-extension.json)</h4>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300 whitespace-pre">
{'{'}
  "name": "react-expert",
  "version": "1.0.0",
  "description": "Konteks dan perintah untuk React",
  "contextFileName": "GEMINI.md",
  "commands": {'{'}
    "setup": {'{'}
      "description": "Buat komponen React baru",
      "prompt": "Buatkan komponen React bernama {{args}} di src/components/"
    {'}'}
  {'}'},
  "enabled": true
{'}'}
                  </div>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Perintah Kustom</h4>
                  <p className="text-white/70 text-sm">Perintah kustom yang didefinisikan dalam manifes dapat dipanggil di CLI menggunakan sintaks <code className="text-[#00ff66]">/extension-name:command-name [args]</code>. Misalnya: <code className="text-[#00ff66]">/react-expert:setup Button</code>.</p>
                  
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
              )}`;

const memoriNew = `              {activeTab === 'memori' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Memori & Konteks (GEMINI.md)</h3>
                  <p className="text-white/70 leading-relaxed">
                    Gemini CLI menggunakan sistem pemuatan konteks hierarkis berdasarkan file <code className="text-[#00f0ff]">GEMINI.md</code>. Ini memungkinkan Anda memberikan instruksi persisten, konvensi pengkodean, dan pengetahuan khusus proyek kepada agen AI.
                  </p>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Hierarki Konteks</h4>
                  <p className="text-white/70 text-sm mb-2">Saat Anda memulai percakapan, CLI memuat konteks dari file <code className="text-[#00f0ff]">GEMINI.md</code> dalam urutan berikut (prioritas terendah ke tertinggi):</p>
                  <ol className="space-y-2 text-white/70 text-sm list-decimal pl-5">
                    <li><strong>Konteks Global</strong>: <code className="text-[#b026ff]">~/.gemini/GEMINI.md</code> - Gunakan ini untuk preferensi global (misal: "Selalu gunakan bahasa Indonesia").</li>
                    <li><strong>Konteks Ekstensi</strong>: <code className="text-[#b026ff]">~/.gemini/extensions/&lt;name&gt;/GEMINI.md</code> - Ekstensi dapat menyuntikkan konteks mereka sendiri saat diaktifkan.</li>
                    <li><strong>Konteks Proyek</strong>: Berjalan naik dari Direktori Kerja Saat Ini (CWD) ke akar proyek (ditentukan oleh keberadaan folder <code className="text-[#b026ff]">.git</code>). Ini memungkinkan Anda menentukan aturan di seluruh proyek di akar, dan aturan spesifik untuk subdirektori.</li>
                  </ol>

                  <h4 className="text-lg font-bold text-[#00f0ff] mt-4">Impor File (@import)</h4>
                  <p className="text-white/70 text-sm mb-2">Anda dapat memodulasi file konteks Anda menggunakan sintaks <code className="text-[#00ff66]">@./path/to/file.md</code>. CLI akan secara rekursif menyelesaikan dan menyisipkan isi file tersebut ke dalam prompt sistem.</p>
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
                    <li><code className="text-[#b026ff]">/memory reload</code>: Memuat ulang file konteks dari disk (berguna jika Anda baru saja mengedit GEMINI.md).</li>
                    <li><code className="text-[#b026ff]">/memory add &lt;text&gt;</code>: Menambahkan teks ke file <code className="text-[#b026ff]">~/.gemini/GEMINI.md</code> global Anda.</li>
                  </ul>
                </motion.div>
              )}`;

// Replace the blocks using regex
content = content.replace(/\{activeTab === 'instalasi' && \([\s\S]*?\}\)/, instalasiNew);
content = content.replace(/\{activeTab === 'arsitektur' && \([\s\S]*?\}\)/, arsitekturNew);
content = content.replace(/\{activeTab === 'api' && \([\s\S]*?\}\)/, apiNew);
content = content.replace(/\{activeTab === 'alat' && \([\s\S]*?\}\)/, alatNew);
content = content.replace(/\{activeTab === 'ekstensi' && \([\s\S]*?\}\)/, ekstensiNew);
content = content.replace(/\{activeTab === 'memori' && \([\s\S]*?\}\)/, memoriNew);

fs.writeFileSync('src/App.jsx', content);
console.log('Updated App.jsx');
