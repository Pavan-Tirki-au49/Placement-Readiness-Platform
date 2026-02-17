import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById, saveToHistory, getUpdatedScore } from '../../utils/analysis';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { CheckCircle, AlertTriangle, BookOpen, Clock, Lightbulb, Download, Copy, Share2, Building, Briefcase, Zap, MapPin } from 'lucide-react';

const JDResult = () => {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState(null);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const data = getAnalysisById(id);
            if (data) {
                // Migration/Fallback logic would go here ideally
                // For now, we assume data adheres to schema or we handle missing safely
                setAnalysis(data);
                setScore(data.finalScore || data.score || 0);
            } else {
                navigate('/dashboard/analysis');
            }
        }
    }, [id, navigate]);

    const handleSkillToggle = (skill, status) => {
        if (!analysis) return;
        const newMap = { ...analysis.skillConfidenceMap, [skill]: status };

        // Calculate new score based on base
        let newScore = analysis.baseScore;
        Object.values(newMap).forEach(s => {
            if (s === 'know') newScore += 2;
            if (s === 'practice') newScore -= 2;
        });
        newScore = Math.max(0, Math.min(100, newScore));

        const updatedAnalysis = {
            ...analysis,
            skillConfidenceMap: newMap,
            finalScore: newScore,
            updatedAt: new Date().toISOString()
        };

        setAnalysis(updatedAnalysis);
        setScore(newScore);
        saveToHistory(updatedAnalysis);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const downloadTxt = () => {
        if (!analysis) return;

        let content = `PLACEMENT ANALYSIS REPORT\nRole: ${analysis.role}\nCompany: ${analysis.company}\nScore: ${score}\nDate: ${new Date().toLocaleDateString()}\n\n`;

        content += `SKILLS:\n${Object.entries(analysis.extractedSkills).map(([cat, skills]) => `${cat}: ${skills.join(', ')}`).join('\n')}\n\n`;

        if (analysis.plan7Days) {
            content += `7-DAY PLAN:\n${analysis.plan7Days.map(d => `${d.day} (${d.focus}): ${d.tasks.join(', ')}`).join('\n')}\n\n`;
        }

        if (analysis.checklist) {
            // Handle both array (new) and object (old)
            content += `CHECKLIST:\n`;
            if (Array.isArray(analysis.checklist)) {
                content += analysis.checklist.map(r => `${r.roundTitle}:\n- ${r.items.join('\n- ')}`).join('\n');
            } else {
                Object.entries(analysis.checklist).forEach(([r, items]) => {
                    content += `${r}:\n- ${items.join('\n- ')}\n`;
                });
            }
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Analysis_${analysis.role.replace(/\s+/g, '_')}.txt`;
        a.click();
    };

    if (!analysis) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const { extractedSkills, checklist, plan7Days, questions, skillConfidenceMap, companyIntel, roundMapping, plan } = analysis;

    // Flatten skills for display
    const allSkills = Object.values(extractedSkills).flat();
    const weakSkills = allSkills.filter(skill => skillConfidenceMap && skillConfidenceMap[skill] !== 'know');

    // Helper for Plan Rendering (New Array vs Old Object)
    const renderPlan = () => {
        if (plan7Days && Array.isArray(plan7Days)) {
            return (
                <div className="relative">
                    <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200"></div>
                    {plan7Days.map((item, idx) => (
                        <div key={idx} className="relative pl-8 pb-6 last:pb-0">
                            <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-indigo-700 z-10">{idx + 1}</div>
                            <h5 className="font-semibold text-sm">{item.day} - {item.focus}</h5>
                            <ul className="text-sm text-gray-600 mt-1 list-disc pl-4">
                                {item.tasks.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        } else if (plan) { // Fallback
            return Object.entries(plan).map(([day, focus], idx) => (
                <div key={idx} className="mb-4">
                    <h5 className="font-bold">{day}</h5>
                    <p>{focus}</p>
                </div>
            ));
        }
        return <p>No plan generated.</p>;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{analysis.role || 'Job Role'} Analysis</h1>
                    <p className="text-gray-500">{analysis.company || 'Unknown Company'} • {new Date(analysis.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-6">
                    <button onClick={downloadTxt} className="p-2 text-gray-500 hover:text-indigo-600 bg-gray-50 rounded-full" title="Download Report">
                        <Download className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <div className="text-xs text-gray-400 uppercase font-semibold">Live Score</div>
                            <div className={`text-4xl font-bold ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {score}
                            </div>
                        </div>
                        <div className="relative w-16 h-16">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={score >= 70 ? '#10B981' : score >= 50 ? '#D97706' : '#EF4444'}
                                    strokeWidth="3"
                                    strokeDasharray={`${score}, 100`}
                                    className="transition-all duration-300"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Company Intel */}
                    {companyIntel && (
                        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
                            <CardHeader>
                                <CardTitle className="flex items-center text-blue-900">
                                    <Building className="w-5 h-5 mr-2" /> Company Intel
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs uppercase text-gray-500 font-bold">Industry</span>
                                    <p className="font-semibold text-gray-900">{companyIntel.industry}</p>
                                </div>
                                <div>
                                    <span className="text-xs uppercase text-gray-500 font-bold">Size</span>
                                    <p className="font-semibold text-gray-900">{companyIntel.size}</p>
                                </div>
                                <div className="md:col-span-2 mt-2">
                                    <span className="text-xs uppercase text-gray-500 font-bold">Hiring Focus</span>
                                    <p className="text-sm text-gray-700 bg-white p-3 rounded border border-blue-100 mt-1">{companyIntel.focus}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Skills */}
                    <Card>
                        <CardHeader><CardTitle>Skills & Confidence</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {allSkills.length > 0 ? allSkills.map((skill, idx) => {
                                    const status = (skillConfidenceMap && skillConfidenceMap[skill]) || 'practice';
                                    return (
                                        <div key={`${skill}-${idx}`} className={`flex items-center px-3 py-2 rounded border ${status === 'know' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                            <span className={`text-sm font-medium ${status === 'know' ? 'text-green-800' : 'text-yellow-800'}`}>{skill}</span>
                                            <div className="ml-2 flex bg-white rounded border">
                                                <button onClick={() => handleSkillToggle(skill, 'know')} className={`p-1 ${status === 'know' ? 'text-green-600' : 'text-gray-300'}`}><CheckCircle className="w-3 h-3" /></button>
                                                <div className="w-px bg-gray-100"></div>
                                                <button onClick={() => handleSkillToggle(skill, 'practice')} className={`p-1 ${status === 'practice' ? 'text-yellow-600' : 'text-gray-300'}`}><AlertTriangle className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                    );
                                }) : <p className="text-gray-500 text-sm">No specific skills detected.</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Round Mapping / Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-indigo-900">
                                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                                Interview Rounds
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Handle new roundMapping array or fallback to checklist values */}
                            {roundMapping && Array.isArray(roundMapping) ? (
                                <div className="space-y-6">
                                    {roundMapping.map((round, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className="absolute top-2 left-3 bottom-[-1.5rem] w-0.5 bg-indigo-100 last:bottom-0 last:hidden"></div>
                                            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-indigo-50 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-700">{idx + 1}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{round.roundTitle}</h4>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {round.focusAreas.map((f, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{f}</span>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1 italic">"{round.whyItMatters}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No round mapping available.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* 7-Day Plan */}
                    <Card className="bg-gradient-to-br from-white to-gray-50">
                        <CardHeader>
                            <CardTitle className="flex items-center"><Clock className="w-5 h-5 mr-2 text-indigo-600" /> 7-Day Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderPlan()}
                        </CardContent>
                    </Card>

                    {/* Questions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-yellow-500" /> Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {questions.map((q, i) => <li key={i} className="text-sm flex"><span className="font-bold mr-2 text-gray-400">{i + 1}.</span> {q}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Action Box */}
            {weakSkills.length > 0 && (
                <div className="bg-gray-900 text-white rounded-lg p-6 shadow-xl border-t-4 border-indigo-500 mt-8">
                    <h3 className="text-lg font-bold flex items-center mb-2"><BookOpen className="w-5 h-5 mr-2" /> Improvement Action</h3>
                    <p className="text-gray-300 text-sm mb-4">You have marked {weakSkills.length} skills for practice. Prioritize: {weakSkills.slice(0, 3).join(', ')}</p>
                    <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded font-bold text-sm shadow-lg transform transition hover:scale-105">Start Plan</button>
                </div>
            )}
        </div>
    );
};

export default JDResult;
