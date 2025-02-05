import { useState, useEffect } from 'react';
import { RefreshCw, Crosshair, AlertCircle } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import type { Project } from './types';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      // Directly using the response as an array
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm animate-glow">
            <div className="flex items-center space-x-4">
              <Crosshair className="w-10 h-10 text-blue-400" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text bg-300% animate-gradient">
                  Secure Snipe
                </h1>
                <p className="text-slate-400 mt-1">Discover and monitor high-risk tokens in the crypto market</p>
              </div>
            </div>
            <button
              onClick={fetchProjects}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-blue-500/25"
            >
              <RefreshCw className={`w-5 h-5 mr-2 inline-block ${loading ? 'animate-spin' : ''}`} />
              Refresh Projects
            </button>
          </div>
        </header>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="animate-fade-in flex items-center gap-4 bg-red-500/10 border-l-4 border-red-500 p-6 rounded-xl backdrop-blur-sm">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-400">Error Loading Projects</h3>
              <p className="text-red-300/80">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-2 text-red-400 hover:text-red-300 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="animate-fade-in text-center py-16">
            <div className="inline-block p-6 rounded-full bg-slate-800/50 mb-4">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-300 mb-2">No Projects Found</h2>
            <p className="text-slate-400">
              No projects with liquidity less than $50 are currently available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.contractAddress}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;