
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { ModuleId, QuizQuestion } from './types';
import FloatingFlowers from './components/FloatingFlowers';
import ModuleWrapper from './components/ModuleWrapper';
import Viewer3D from './components/Viewer3D';
import { QUIZ_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.HOME);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(QUIZ_QUESTIONS.length).fill(-1));

  const [ionicSelection, setIonicSelection] = useState({ kation: 'Na', anion: 'Cl' });
  const [covalentSelection, setCovalentSelection] = useState('H2O');

  const handleMusicToggle = async () => {
    if (!isMusicPlaying) {
      await Tone.start();
      Tone.Transport.start();
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -20;
      const melody = [
        { time: '0:0', note: 'C4', duration: '4n' },
        { time: '0:1', note: 'E4', duration: '4n' },
        { time: '0:2', note: 'G4', duration: '4n' },
        { time: '0:3', note: 'C5', duration: '4n' },
      ];
      const part = new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.note, value.duration, time);
      }, melody).start(0);
      part.loop = true;
      part.loopEnd = '1m';
      setIsMusicPlaying(true);
    } else {
      Tone.Transport.stop();
      setIsMusicPlaying(false);
    }
  };

  const submitQuiz = () => {
    if (userAnswers.includes(-1)) {
      alert("Mohon jawab semua pertanyaan!");
      return;
    }
    let s = 0;
    QUIZ_QUESTIONS.forEach((q, i) => {
      if (userAnswers[i] === q.correct) s++;
    });
    setScore(s);
  };

  const navItems = [
    { id: ModuleId.HOME, label: '🏠 Beranda' },
    { id: ModuleId.THEORY, label: '📚 Teori Dasar' },
    { id: ModuleId.IONIC, label: '⚡ Ionik' },
    { id: ModuleId.COVALENT, label: '🔗 Kovalen' },
    { id: ModuleId.METALLIC, label: '🔩 Logam' },
    { id: ModuleId.PROPERTIES, label: '🧬 Sifat Senyawa' },
    { id: ModuleId.QUIZ, label: '🎯 Kuis' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <FloatingFlowers />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600 tracking-tighter">⚛️ IKATAN KIMIA</span>
          </div>
          <div className="hidden md:block text-center text-[10px] leading-tight text-slate-500 font-medium">
            Jamila Fitrianingsih<br />
            NIM. 220331600596 | Offering A
          </div>
          <button 
            onClick={() => setShowProfile(true)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold text-sm hover:scale-105 transition-transform"
          >
            👤 Profil
          </button>
        </div>
      </header>

      {/* Nav Menu */}
      <nav className="fixed top-[64px] inset-x-0 bg-white shadow-md z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-2 flex">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-4 transition-all ${
                activeModule === item.id 
                ? 'text-blue-600 border-blue-600 bg-blue-50/50' 
                : 'text-slate-500 border-transparent hover:text-blue-500 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mt-40 relative z-10">
        {activeModule === ModuleId.HOME && (
          <ModuleWrapper title="🎓 Selamat Datang">
            <p className="text-xl">Aplikasi pembelajaran digital dengan visualisasi 3D interaktif, simulasi, dan latihan soal untuk memahami ikatan kimia secara mendalam.</p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">🧪 Materi Pembelajaran</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>✅ Teori dasar pembentukan ikatan</li>
                  <li>✅ Ikatan ionik dan sifat-sifatnya</li>
                  <li>✅ Ikatan kovalen dan bentuk molekul</li>
                  <li>✅ Ikatan logam dan konduktivitas</li>
                  <li>✅ Gaya antarmolekul</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">🎯 Fitur Interaktif</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>🔬 Visualisasi 3D molekul</li>
                  <li>📊 Kuis interaktif</li>
                  <li>🎵 Musik latar pembelajaran</li>
                  <li>📱 Responsif untuk semua perangkat</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-12">
              <button 
                onClick={() => setActiveModule(ModuleId.THEORY)}
                className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-extrabold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
              >
                ▶ Mulai Belajar Sekarang
              </button>
            </div>
          </ModuleWrapper>
        )}

        {activeModule === ModuleId.THEORY && (
          <ModuleWrapper title="📚 Teori Dasar">
            <h3>Apa itu Ikatan Kimia?</h3>
            <p>Ikatan kimia adalah gaya tarik-menarik antara atom-atom yang menyebabkan terbentuknya molekul dan senyawa. Atom-atom berikatan untuk mencapai keadaan energi yang lebih rendah (lebih stabil).</p>
            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 my-6">
              <strong className="text-blue-700 block mb-2">Prinsip Kestabilan Energi:</strong>
              Atom cenderung mencapai konfigurasi elektron seperti gas mulia (stabil) karena memiliki energi terendah.
            </div>
            <Viewer3D type="co2" />
            <div className="mt-8">
              <h3>Video Pembelajaran</h3>
              <div className="aspect-video rounded-3xl bg-slate-200 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                <span className="text-slate-400 group-hover:scale-110 transition-transform">📺 Video Teori Dasar</span>
              </div>
            </div>
            <div className="flex justify-between mt-12">
              <button onClick={() => setActiveModule(ModuleId.HOME)} className="px-6 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">← Beranda</button>
              <button onClick={() => setActiveModule(ModuleId.IONIC)} className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">Lanjut: Ionik →</button>
            </div>
          </ModuleWrapper>
        )}

        {activeModule === ModuleId.IONIC && (
          <ModuleWrapper title="⚡ Ikatan Ionik">
            <p>Ikatan ionik terbentuk melalui transfer elektron dari atom logam ke non-logam.</p>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Pilih Logam (Kation)</label>
                  <select 
                    className="w-full p-3 rounded-xl border bg-white font-semibold"
                    value={ionicSelection.kation}
                    onChange={(e) => setIonicSelection(prev => ({ ...prev, kation: e.target.value }))}
                  >
                    <option value="Na">Natrium (Na⁺)</option>
                    <option value="Mg">Magnesium (Mg²⁺)</option>
                    <option value="Ca">Kalsium (Ca²⁺)</option>
                  </select>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Pilih Non-Logam (Anion)</label>
                  <select 
                    className="w-full p-3 rounded-xl border bg-white font-semibold"
                    value={ionicSelection.anion}
                    onChange={(e) => setIonicSelection(prev => ({ ...prev, anion: e.target.value }))}
                  >
                    <option value="Cl">Klorin (Cl⁻)</option>
                    <option value="O">Oksigen (O²⁻)</option>
                    <option value="F">Fluor (F⁻)</option>
                  </select>
                </div>
                <div className="bg-pink-50 p-6 rounded-2xl text-pink-700 font-medium">
                  Senyawa: <span className="font-bold text-xl">{ionicSelection.kation}{ionicSelection.anion}</span>
                </div>
              </div>
              <Viewer3D type="ionic" data={ionicSelection} />
            </div>
          </ModuleWrapper>
        )}

        {activeModule === ModuleId.COVALENT && (
          <ModuleWrapper title="🔗 Ikatan Kovalen">
            <p>Ikatan kovalen terbentuk melalui pemakaian pasangan elektron bersama.</p>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <button 
                  onClick={() => setCovalentSelection('H2O')}
                  className={`w-full p-4 rounded-2xl text-left border transition-all ${covalentSelection === 'H2O' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'bg-white hover:bg-slate-50'}`}
                >
                  <span className="block font-bold">Molekul Air (H₂O)</span>
                  <span className="text-sm opacity-70">Bentuk bengkok dengan sudut ~104.5°</span>
                </button>
                <button 
                  onClick={() => setCovalentSelection('NH3')}
                  className={`w-full p-4 rounded-2xl text-left border transition-all ${covalentSelection === 'NH3' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'bg-white hover:bg-slate-50'}`}
                >
                  <span className="block font-bold">Molekul Amonia (NH₃)</span>
                  <span className="text-sm opacity-70">Bentuk piramida trigonal</span>
                </button>
              </div>
              <Viewer3D type="covalent" data={covalentSelection} />
            </div>
          </ModuleWrapper>
        )}

        {activeModule === ModuleId.METALLIC && (
          <ModuleWrapper title="🔩 Ikatan Logam">
            <p>Gaya tarik antara ion logam positif dengan lautan elektron yang terdelokalisasi.</p>
            <Viewer3D type="metallic" />
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {['Konduktor Baik', 'Mudah Ditempa', 'Berkilau'].map(feat => (
                <div key={feat} className="p-4 bg-white border rounded-2xl shadow-sm text-center font-bold text-blue-600">{feat}</div>
              ))}
            </div>
          </ModuleWrapper>
        )}

        {activeModule === ModuleId.PROPERTIES && (
          <ModuleWrapper title="🧬 Sifat Senyawa">
            <div className="overflow-x-auto rounded-3xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4 font-bold text-slate-800">Jenis Ikatan</th>
                    <th className="p-4 font-bold text-slate-800">Titik Leleh</th>
                    <th className="p-4 font-bold text-slate-800">Konduktivitas</th>
                    <th className="p-4 font-bold text-slate-800">Contoh</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { id: 'Ionik', melt: 'Tinggi', cond: 'Saat cair/larutan', ex: 'NaCl, MgO' },
                    { id: 'Kovalen', melt: 'Rendah', cond: 'Isolator', ex: 'H2O, CO2' },
                    { id: 'Logam', melt: 'Variatif', cond: 'Sangat baik', ex: 'Fe, Cu, Al' }
                  ].map(row => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-blue-600">{row.id}</td>
                      <td className="p-4">{row.melt}</td>
                      <td className="p-4">{row.cond}</td>
                      <td className="p-4 font-mono text-sm">{row.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModuleWrapper>
        )}

        {activeModule === ModuleId.QUIZ && (
          <ModuleWrapper title="🎯 Kuis Pemahaman">
            {score === null ? (
              <div className="space-y-8">
                {QUIZ_QUESTIONS.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-lg font-bold mb-4">{q.question}</h4>
                    <div className="grid gap-3">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const newAns = [...userAnswers];
                            newAns[qIdx] = oIdx;
                            setUserAnswers(newAns);
                          }}
                          className={`p-4 rounded-2xl text-left border transition-all font-medium ${
                            userAnswers[qIdx] === oIdx 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                            : 'bg-white border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <button 
                    onClick={submitQuiz}
                    className="px-12 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
                  >
                    ✓ Submit Jawaban
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 py-10 bg-blue-50 rounded-3xl border-2 border-dashed border-blue-200">
                <h3 className="text-5xl font-black text-blue-600">Skor: {score}/{QUIZ_QUESTIONS.length}</h3>
                <p className="text-xl text-slate-600 font-medium">
                  {score >= 8 ? 'Luar Biasa! Kamu sudah menguasai materi.' : score >= 6 ? 'Bagus! Sedikit lagi menuju sempurna.' : 'Ayo belajar lagi untuk hasil lebih baik.'}
                </p>
                <button 
                  onClick={() => { setScore(null); setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(-1)); }}
                  className="px-8 py-3 rounded-xl bg-white border border-blue-200 text-blue-600 font-bold hover:bg-blue-100"
                >
                  🔄 Ulangi Kuis
                </button>
              </div>
            )}
          </ModuleWrapper>
        )}
      </main>

      {/* Music Control */}
      <button 
        onClick={handleMusicToggle}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all ${isMusicPlaying ? 'bg-pink-500 text-white scale-110' : 'bg-white text-slate-400 hover:text-blue-500'}`}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-blue-500 to-pink-400 opacity-10" />
            <div className="relative text-center">
              <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-blue-200 to-pink-200 border-4 border-white shadow-lg mb-6 flex items-center justify-center text-5xl">👤</div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">Jamila Fitrianingsih</h2>
              <p className="text-blue-600 font-bold mb-8">NIM. 220331600596</p>
              
              <div className="space-y-4 text-left">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Universitas</span>
                  <span className="font-bold text-slate-700">Universitas Negeri Malang</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Mata Kuliah</span>
                  <span className="font-bold text-slate-700">Bahan Ajar Digital Berbasis AI dan Coding</span>
                </div>
              </div>

              <button 
                onClick={() => setShowProfile(false)}
                className="mt-10 w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 py-10 text-center text-slate-400 font-medium text-sm">
        © 2025 Jamila Fitrianingsih • Universitas Negeri Malang
      </footer>
    </div>
  );
};

export default App;
