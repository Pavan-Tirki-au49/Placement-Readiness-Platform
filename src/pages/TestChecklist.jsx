import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, RotateCcw, Lock, Unlock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChecklistItem = ({ id, label, hint, checked, onToggle }) => (
    <div
        className={`flex items-start p-4 rounded-lg border transition-all duration-200 cursor-pointer ${checked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-indigo-300'}`}
        onClick={() => onToggle(id)}
    >
        <div className={`mt-0.5 mr-3 flex-shrink-0 ${checked ? 'text-green-600' : 'text-gray-300'}`}>
            {checked ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-current" />}
        </div>
        <div className="flex-1">
            <p className={`font-medium ${checked ? 'text-green-900' : 'text-gray-900'}`}>{label}</p>
            {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
        </div>
    </div>
);

const TestChecklist = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([
        { id: 'jd_req', label: 'JD required validation works', hint: 'Go to Analyzer, leave empty, click Analyze. Button should be disabled or show error.' },
        { id: 'short_jd', label: 'Short JD warning shows for <200 chars', hint: 'Enter "Too short" in Analyzer. Warning banner should appear.' },
        { id: 'skills_extract', label: 'Skills extraction groups correctly', hint: 'Paste JD with "React, SQL". Check if React is under Web and SQL under Data.' },
        { id: 'round_map', label: 'Round mapping changes based on company + skills', hint: 'Analyze "Google" (Enterprise) vs "Startup". Rounds should differ.' },
        { id: 'score_calc', label: 'Score calculation is deterministic', hint: 'Analyze same JD twice. Score should be identical.' },
        { id: 'skill_toggle', label: 'Skill toggles update score live', hint: 'In Results, toggle a skill. Live score should change +/- 2.' },
        { id: 'persist', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh page. Toggle should remain.' },
        { id: 'history', label: 'History saves and loads correctly', hint: 'Check "View History" page. Click an entry to load it.' },
        { id: 'export', label: 'Export buttons copy the correct content', hint: 'Click "Copy" on sections or Download icon. Verify text content.' },
        { id: 'console', label: 'No console errors on core pages', hint: 'Open DevTools (F12) and browse. Console should be clean.' }
    ]);

    const [checkedIds, setCheckedIds] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            setCheckedIds(JSON.parse(saved));
        }
    }, []);

    const handleToggle = (id) => {
        const newChecked = checkedIds.includes(id)
            ? checkedIds.filter(c => c !== id)
            : [...checkedIds, id];

        setCheckedIds(newChecked);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newChecked));
    };

    const handleReset = () => {
        if (confirm('Reset all progress?')) {
            setCheckedIds([]);
            localStorage.removeItem('prp_test_checklist');
        }
    };

    const allPassed = items.every(i => checkedIds.includes(i.id));

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Pre-Ship Checklist</h1>
                        <p className="text-gray-500 mt-1">Verify all functionality before unlocking the ship route.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</div>
                        <div className={`text-2xl font-bold ${allPassed ? 'text-green-600' : 'text-amber-600'}`}>
                            {checkedIds.length} / {items.length} Passed
                        </div>
                    </div>
                </div>

                {/* Status Banner */}
                {!allPassed ? (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r shadow-sm flex items-start">
                        <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-amber-800">Ship Locked</h3>
                            <p className="text-amber-700 text-sm">Please complete all tests to proceed to shipping.</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r shadow-sm flex items-start">
                        <Unlock className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-green-800">Ready to Ship</h3>
                            <p className="text-green-700 text-sm">All systems go. You can now access the ship route.</p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 space-y-3">
                        {items.map(item => (
                            <ChecklistItem
                                key={item.id}
                                {...item}
                                checked={checkedIds.includes(item.id)}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                    <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                        <button
                            onClick={handleReset}
                            className="flex items-center text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> Reset Checklist
                        </button>

                        <button
                            onClick={() => navigate('/prp/08-ship')}
                            disabled={!allPassed}
                            className={`flex items-center px-6 py-2 rounded-lg font-bold shadow-sm transition-all ${allPassed ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            {allPassed ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                            Proceed to Ship
                            {allPassed && <ArrowRight className="w-4 h-4 ml-2" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestChecklist;
