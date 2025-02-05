import { useState } from 'react';
import { ExternalLink, Copy, DollarSign, Clock, CheckCircle } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Calculate liquidity percentage (assuming $50 is max)
  const liquidityPercentage = Math.min((project.liquidity / 50) * 100, 100);

  return (
    <div className="group relative bg-slate-800/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl -z-10"></div>
      
      {/* Top gradient bar */}
      <div 
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${liquidityPercentage}%` }}
      ></div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {project.tokenName}
          </h3>
          <a
            href={project.dexScreenerLink	}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-700/30 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              window.open(project.dexScreenerLink	, '_blank', 'noopener,noreferrer');
            }}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">Contract Address</span>
              <button
                onClick={() => copyToClipboard(project.contractAddress)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-700/30 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 transition-colors"
                title="Copy address"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="relative">
              <p className="text-sm text-slate-300 font-mono break-all bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                {project.contractAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-slate-400">Liquidity</span>
              </div>
              <p className="text-2xl font-bold text-green-400">
                ${project.liquidity.toFixed(2)}
              </p>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-400">First Trade</span>
              </div>
              <p className="text-sm text-slate-300">
                {formatDate(project.firstTradeTimestamp)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}