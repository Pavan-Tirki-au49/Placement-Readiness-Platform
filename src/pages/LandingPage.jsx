import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-white flex-grow flex items-center justify-center py-20 px-4">
                <div className="max-w-4xl w-full text-center space-y-8">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight md:text-6xl">
                        Ace Your <span className="text-[hsl(245,58%,51%)]">Placement</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                    </p>
                    <div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-[hsl(245,58%,51%)] hover:bg-[hsl(245,58%,45%)] transition-colors duration-200"
                        >
                            Get Started
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                                <Code className="h-6 w-6 text-[hsl(245,58%,51%)]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Problems</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Solve coding challenges across various difficulty levels and topics.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <Video className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mock Interviews</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Simulate real interview scenarios with AI-driven feedback.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <BarChart3 className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Monitor your performance and identify areas for improvement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
