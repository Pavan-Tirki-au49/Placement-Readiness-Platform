import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJD, saveToHistory } from '../../utils/analysis';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { ChevronRight, FileText, Briefcase, Building, AlertCircle } from 'lucide-react';

const JDAnalysisInput = () => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');
    const navigate = useNavigate();

    const handleAnalyze = () => {
        if (!jdText.trim()) return;

        // soft validation
        if (jdText.length < 200 && !warning) {
            setWarning("This JD is short. Paste the full description for better results. Click Analyze again to proceed anyway.");
            return;
        }

        setLoading(true);

        // Simulate processing delay for "feel"
        setTimeout(() => {
            const result = analyzeJD(company, role, jdText);
            saveToHistory(result);
            setLoading(false);
            navigate(`/dashboard/analysis/result/${result.id}`);
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Analysis Engine</h1>
                <p className="text-gray-500 mt-2">Paste a job description to extract skills, generate a preparation roadmap, and get a readiness score.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="e.g. Google, Amazon"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title (Optional)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="e.g. Software Engineer"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={`md:h-64 flex flex-col justify-center items-center border transition-colors ${warning ? 'bg-yellow-50 border-yellow-200' : 'bg-indigo-50 border-indigo-100'}`}>
                        <CardContent className="text-center p-6 w-full">
                            {warning ? (
                                <div className="text-yellow-800 mb-4 flex flex-col items-center">
                                    <AlertCircle className="w-8 h-8 mb-2" />
                                    <p className="text-sm font-medium">{warning}</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-lg font-medium text-indigo-900 mb-2">Ready to Analyze?</h3>
                                    <p className="text-indigo-600 text-sm mb-6">Our system identifies key skills and creates a custom study roadmap.</p>
                                </>
                            )}

                            <button
                                onClick={handleAnalyze}
                                disabled={!jdText.trim() || loading}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(!jdText.trim() || loading) ? 'bg-indigo-400 cursor-not-allowed' : warning ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {loading ? 'Analyzing...' : warning ? 'Analyze Anyway' : 'Analyze Job Description'}
                                {!loading && <ChevronRight className="ml-2 h-4 w-4" />}
                            </button>
                        </CardContent>
                    </Card>
                </div>

                <div className="h-full">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Job Description Text <span className="text-red-500">*</span></CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col h-full">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    className={`block w-full h-full min-h-[300px] pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 sm:text-sm resize-none ${warning ? 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                    placeholder="Paste the full job description here..."
                                    value={jdText}
                                    onChange={(e) => {
                                        setJdText(e.target.value);
                                        if (e.target.value.length > 200) setWarning('');
                                    }}
                                ></textarea>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                {warning && <span className="text-xs text-yellow-600 font-medium flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> Too short</span>}
                                <p className={`text-xs ml-auto ${jdText.length < 200 ? 'text-red-400' : 'text-gray-400'}`}>{jdText.length} characters</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JDAnalysisInput;
