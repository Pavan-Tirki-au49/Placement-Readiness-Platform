import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../../utils/analysis';
import { Card, CardContent } from '../../components/ui/card';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

const JDHistory = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = getHistory();
        setHistory(data);
    }, []);

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <Briefcase className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No History Yet</h3>
                <p className="text-gray-500 mt-2 mb-6">Analyze your first job description to get started.</p>
                <button
                    onClick={() => navigate('/dashboard/analysis')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Go to Analyzer
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Analysis History</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => navigate(`/dashboard/analysis/result/${item.id}`)}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                                    {item.company?.charAt(0) || 'J'}
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-semibold ${item.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    Score: {item.score}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 truncate">{item.role || 'Job Role'}</h3>
                            <p className="text-sm text-gray-500 mb-4 truncate">{item.company || 'Unknown Company'}</p>
                            <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(item.createdAt).toLocaleDateString()}
                                <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default JDHistory;
