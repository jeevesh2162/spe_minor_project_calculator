import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calculator, Binary, FunctionSquare as Functions, Ruler, Power } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api/calculator';

function App() {
    const [inputVal, setInputVal] = useState('');
    const [powerBase, setPowerBase] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOperation = async (op, params) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/${op}`, { params });
            setResult(response.data);
        } catch (err) {
            setError('API Error: Ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl text-white"
            style={{
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-600 rounded-xl">
                    <Calculator size={24} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Scientific Calculator</h1>
            </div>

            <div className="space-y-6">
                {/* Main Input Display */}
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                    <span className="text-slate-500 text-sm block mb-1">Display</span>
                    <div className="text-3xl font-mono overflow-auto whitespace-nowrap">
                        {loading ? 'Calculating...' : result !== null ? result : inputVal || '0'}
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="text-xs text-slate-400 mb-1 block">Value (x)</label>
                        <input
                            type="number"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder="Enter number..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
                            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '12px', width: '100%', color: 'white' }}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 mb-1 block">Exponent (b)</label>
                        <input
                            type="number"
                            value={powerBase}
                            onChange={(e) => setPowerBase(e.target.value)}
                            placeholder="For x^b..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
                            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '12px', width: '100%', color: 'white' }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleOperation('sqrt', { x: inputVal })}
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition-all"
                        style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Binary size={18} /> √x
                    </button>
                    <button
                        onClick={() => handleOperation('factorial', { x: parseInt(inputVal) })}
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition-all"
                        style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Functions size={18} /> x!
                    </button>
                    <button
                        onClick={() => handleOperation('ln', { x: inputVal })}
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition-all"
                        style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Ruler size={18} /> ln(x)
                    </button>
                    <button
                        onClick={() => handleOperation('power', { x: inputVal, b: powerBase })}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 p-4 rounded-xl transition-all"
                        style={{ backgroundColor: '#2563eb', borderRadius: '12px', padding: '16px', border: 'none', color: 'white', cursor: 'pointer', gridColumn: 'span 1' }}
                    >
                        <Power size={18} /> x^b
                    </button>
                </div>

                <button
                    onClick={() => { setInputVal(''); setPowerBase(''); setResult(null); }}
                    className="w-full py-3 bg-red-900/30 text-red-400 rounded-xl hover:bg-red-900/50 transition-colors"
                    style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', color: '#f87171', borderRadius: '12px', width: '100%', padding: '12px', border: 'none', marginTop: '16px', cursor: 'pointer' }}
                >
                    Clear
                </button>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                        {error}
                    </div>
                )}
            </div>

            <p className="text-slate-500 text-[10px] mt-8 text-center uppercase tracking-widest">
                SPE Project | Mini Project
            </p>
        </motion.div>
    );
}

export default App;
