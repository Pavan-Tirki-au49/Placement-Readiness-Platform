import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { CheckCircle, Clock, Link as LinkIcon, Lock, Unlock, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProofPage = () => {
    const navigate = useNavigate();
    const [proof, setProof] = useState({
        lovableLink: '',
        githubLink: '',
        deployLink: ''
    });

    const [checklistPassed, setChecklistPassed] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    // Steps Configuration
    const steps = [
        { id: '1', title: 'Project Initialization', status: 'completed' },
        { id: '2', title: 'Design System Implementation', status: 'completed' },
        { id: '3', title: 'Core Layout & Dashboard', status: 'completed' },
        { id: '4', title: 'JD Analysis Logic', status: 'completed' },
        { id: '5', title: 'Interactive Results & History', status: 'completed' },
        { id: '6', title: 'Company Intel & Round Map', status: 'completed' },
        { id: '7', title: 'Validation & Hardening', status: 'completed' },
        { id: '8', title: 'Test Checklist Completion', status: checklistPassed ? 'completed' : 'pending' }
    ];

    useEffect(() => {
        // Load existing proof
        const savedProof = JSON.parse(localStorage.getItem('prp_final_submission') || '{}');
        if (savedProof.lovableLink) setProof(savedProof);

        // Check checklist status
        const checklist = JSON.parse(localStorage.getItem('prp_test_checklist') || '[]');
        const passed = checklist.length >= 10;
        setChecklistPassed(passed);

        // Check Shipped status
        if (passed && savedProof.lovableLink && savedProof.githubLink && savedProof.deployLink) {
            setIsShipped(true);
        } else {
            setIsShipped(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newProof = { ...proof, [name]: value };
        setProof(newProof);
        localStorage.setItem('prp_final_submission', JSON.stringify(newProof));

        // Re-evaluate shipped status
        if (checklistPassed && newProof.lovableLink && newProof.githubLink && newProof.deployLink) {
            setIsShipped(true);
        } else {
            setIsShipped(false);
        }
    };

    const copySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${proof.lovableLink}
GitHub Repository: ${proof.githubLink}
Live Deployment: ${proof.deployLink}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim();
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans pb-24">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header with Status Badge */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Proof of Work</h1>
                        <p className="text-gray-500 mt-1">Validate and finalize your project submission.</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm flex items-center shadow-sm ${isShipped ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-200 text-gray-600 border border-gray-300'}`}>
                        {isShipped ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                        {isShipped ? 'Shipped Status' : 'In Progress'}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col: Steps Status */}
                    <div className="md:col-span-1 space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Build Pipeline</h3>
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                {step.status === 'completed' ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                ) : (
                                    <Clock className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                                )}
                                <div>
                                    <div className="text-xs text-gray-400 font-bold">STEP {step.id}</div>
                                    <div className={`text-sm font-medium ${step.status === 'completed' ? 'text-gray-800' : 'text-gray-500'}`}>{step.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Col: Artifacts & Submission */}
                    <div className="md:col-span-2 space-y-6">

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <LinkIcon className="w-5 h-5 mr-2 text-indigo-600" />
                                    Project Artifacts <span className="text-red-500 ml-1">*</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lovable Project URL</label>
                                    <input
                                        type="url"
                                        name="lovableLink"
                                        value={proof.lovableLink}
                                        onChange={handleInputChange}
                                        placeholder="https://lovable.dev/..."
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository</label>
                                    <input
                                        type="url"
                                        name="githubLink"
                                        value={proof.githubLink}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/..."
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deployed URL</label>
                                    <input
                                        type="url"
                                        name="deployLink"
                                        value={proof.deployLink}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipped Message */}
                        {isShipped && (
                            <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-xl text-center space-y-4 animate-fade-in border border-indigo-700">
                                <h2 className="text-2xl font-bold">You built a real product.</h2>
                                <p className="text-indigo-200 text-lg leading-relaxed">
                                    Not a tutorial. Not a clone.<br />
                                    A structured tool that solves a real problem.<br /><br />
                                    <span className="font-bold text-white border-b-2 border-indigo-400 pb-1">This is your proof of work.</span>
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={copySubmission}
                                disabled={!isShipped}
                                className={`flex-1 py-3 px-4 rounded-lg font-bold shadow-sm flex items-center justify-center transition-all ${isShipped ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                <Copy className="w-5 h-5 mr-2" />
                                Copy Final Submission
                            </button>
                        </div>

                        {!checklistPassed && (
                            <div className="text-center text-sm text-amber-600 mt-4 bg-amber-50 p-3 rounded">
                                ⚠️ Complete the <span className="font-bold underline cursor-pointer" onClick={() => navigate('/prp/07-test')}>Test Checklist</span> to unlock shipping.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
