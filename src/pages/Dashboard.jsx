import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PlayCircle, Clock, Calendar, CheckCircle, Target } from 'lucide-react';

const Dashboard = () => {
    // Mock Data for Radar Chart
    const radarData = [
        { subject: 'DSA', A: 75, fullMark: 100 },
        { subject: 'System Design', A: 60, fullMark: 100 },
        { subject: 'Communication', A: 80, fullMark: 100 },
        { subject: 'Resume', A: 85, fullMark: 100 },
        { subject: 'Aptitude', A: 70, fullMark: 100 },
    ];

    // Circle Progress Calculation
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const readinessScore = 72;
    const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

    return (
        <div className="p-4 space-y-6 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* 1. Overall Readiness - Top Left (Large Circle) */}
                <Card className="col-span-4 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="relative flex items-center justify-center">
                            <svg
                                height={radius * 2.5}
                                width={radius * 2.5}
                                className="transform -rotate-90"
                            >
                                <circle
                                    stroke="#e5e7eb"
                                    strokeWidth={stroke}
                                    fill="transparent"
                                    r={normalizedRadius}
                                    cx={radius * 1.25}
                                    cy={radius * 1.25}
                                />
                                <circle
                                    stroke="hsl(245, 58%, 51%)"
                                    strokeWidth={stroke}
                                    strokeDasharray={circumference + ' ' + circumference}
                                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r={normalizedRadius}
                                    cx={radius * 1.25}
                                    cy={radius * 1.25}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-bold text-gray-900">{readinessScore}</span>
                                <span className="text-sm text-gray-500">of 100</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-500">Readiness Score</p>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown - Top Right (Radar Chart) */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <div className="w-full h-[250px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Radar
                                        name="Skills"
                                        dataKey="A"
                                        stroke="hsl(245, 58%, 51%)"
                                        strokeWidth={2}
                                        fill="hsl(245, 58%, 51%)"
                                        fillOpacity={0.2}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {/* 3. Continue Practice */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Continue Practice</CardTitle>
                        <Target className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <PlayCircle className="h-6 w-6 text-[hsl(245,58%,51%)]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Dynamic Programming</h4>
                                <p className="text-sm text-gray-500">Last practiced 2 hours ago</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-medium">3/10</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-[hsl(245,58%,51%)] h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <button className="mt-6 w-full bg-[hsl(245,58%,51%)] hover:bg-[hsl(245,58%,45%)] text-white font-medium py-2 px-4 rounded-md transition-colors">
                            Continue
                        </button>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Weekly Goals</CardTitle>
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <span className="text-2xl font-bold">12</span>
                                    <span className="text-gray-500 ml-1">/ 20</span>
                                </div>
                                <span className="text-sm font-medium text-green-600">On Track</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Problems Solved this week</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${[0, 1, 3, 4].includes(i) ? 'bg-[hsl(245,58%,51%)] text-white' : 'bg-gray-100 text-gray-400'
                                            }`}
                                    >
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                {/* 5. Upcoming Assessments */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Test" },
                                { title: "System Design Review", time: "Wed, 2:00 PM", type: "Review" },
                                { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Prep" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                                            <Calendar className="h-5 w-5 text-[hsl(245,58%,51%)]" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <div className="flex items-center text-sm text-gray-500 mt-0.5">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-sm font-medium text-[hsl(245,58%,51%)] hover:text-[hsl(245,58%,45%)]">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
