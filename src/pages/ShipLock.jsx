import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Rocket, CheckCircle } from 'lucide-react';

const ShipLock = () => {
    const navigate = useNavigate();
    const [locked, setLocked] = useState(true);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('prp_test_checklist') || '[]');
        // Provide a small delay for better UX
        if (saved.length >= 10) {
            setLocked(false);
        } else {
            setTimeout(() => navigate('/prp/07-test'), 1500);
        }
    }, [navigate]);

    if (locked) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-gray-500 space-y-4">
                <Lock className="w-16 h-16 text-gray-300 animate-pulse" />
                <h2 className="text-xl font-semibold">Locked</h2>
                <p>Complete the test checklist first. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 text-center">
            <div className="bg-white/10 p-8 rounded-full mb-8 backdrop-blur-sm border border-white/20 shadow-2xl animate-bounce">
                <Rocket className="w-16 h-16 text-indigo-300" />
            </div>
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white">Ready for Lift-off</h1>
            <p className="text-xl text-indigo-200 mb-8 max-w-md">Your codebase has passed all critical checks. The deployment pipeline is now ready for initialization.</p>

            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold text-green-100 uppercase tracking-widest">System Verified</span>
            </div>
        </div>
    );
};

export default ShipLock;
