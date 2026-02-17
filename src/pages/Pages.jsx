export const Practice = () => {
    return (
        <div className="bg-white shadow rounded-lg p-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice Problems</h2>
            <p className="text-gray-500">Solve coding challenges here.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-100 text-[hsl(245,58%,51%)] rounded-lg font-medium">Start Solving</button>
        </div>
    );
};

export const Assessments = () => {
    return (
        <div className="bg-white shadow rounded-lg p-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mock Assessments</h2>
            <p className="text-gray-500">Take timed tests and mock interviews.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-100 text-[hsl(245,58%,51%)] rounded-lg font-medium">Take Test</button>
        </div>
    );
};

export const Resources = () => {
    return (
        <div className="bg-white shadow rounded-lg p-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Resources</h2>
            <p className="text-gray-500">Articles, videos, and documentation.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-100 text-[hsl(245,58%,51%)] rounded-lg font-medium">Browse Library</button>
        </div>
    );
};

export const Profile = () => {
    return (
        <div className="bg-white shadow rounded-lg p-6 min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h2>
            <p className="text-gray-500">Manage account settings and resume.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-100 text-[hsl(245,58%,51%)] rounded-lg font-medium">Edit Profile</button>
        </div>
    );
};
