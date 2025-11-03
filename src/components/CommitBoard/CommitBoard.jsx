import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertCommitsToHeatmap, getTeamColor, getRepoShortName, sortReposByLatestCommit } from '../../utils/converCommitToHeapmap.js';
const hours = [7, 8, 9, 10, 11, 12, 13, 14];

// High contrast cyberpunk colors - easy to distinguish

function calcGlobalMaxCommitSlot(repos) {
    const allCounts = repos.flatMap(repo => Object.values(repo.heatmap).flat());
    if (!allCounts.length) return 5;
    const sorted = allCounts.sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    return Math.max(5, p95);
}

const CommitBoard = ({ data }) => {
    const convertData = convertCommitsToHeatmap(sortReposByLatestCommit(data));

    const maxCommitGlobal = useMemo(
        () => calcGlobalMaxCommitSlot(convertData),
        [convertData]
    );

    return (
        <div className=" font-mono select-none bg-black rounded-lg border border-pink-500/30 shadow-2xl shadow-cyan-500/20">
            {/* Header */}
            <div className="grid grid-cols-9">
                <div className="col-span-1 border border-pink-500 bg-gradient-to-r from-purple-900 to-pink-900 text-pink-400 font-bold text-center p-2 shadow-lg shadow-pink-500/50">
                    REPO NAME
                </div>
                {hours.map((h) => (
                    <div
                        key={h}
                        className={`col-span-1 border border-pink-500 bg-gradient-to-r from-purple-900 to-pink-900 text-pink-400 font-bold text-center p-2 cursor-pointer shadow-lg shadow-pink-500/50`}
                    >
                        {h}:00
                    </div>
                ))}
            </div>

            {/* Body */}
            <AnimatePresence mode="sync" initial={false}>
                {convertData.map((repo, repoIdx) => (
                    <motion.div
                        key={repo.repo_full_name}
                        layout="position"
                        initial={{
                            opacity: 0,
                            y: -60,  // Start higher for dramatic effect
                            scale: 1.08,  // Larger initial scale
                            zIndex: 100,
                            rotateX: -15,  // 3D tilt effect
                            backgroundColor: "rgba(34, 197, 94, 0.4)",
                            boxShadow: "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4)"
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            zIndex: 1,
                            rotateX: 0,
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            boxShadow: "0 0 0px rgba(34, 197, 94, 0)"
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            y: -30,  // Exit upward 
                            rotateX: -15,
                            filter: "blur(4px)",
                            position: "absolute",  // Remove from layout flow
                            zIndex: -1,  // Behind everything
                            transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                                position: { delay: 0 },  // Immediate position change
                                zIndex: { delay: 0 }     // Immediate z-index change
                            }
                        }}
                        transition={{
                            y: {
                                type: 'spring',
                                stiffness: 150,
                                damping: 18,
                                mass: 1.2,
                                duration: 1
                            },
                            scale: {
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            },
                            rotateX: {
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            },
                            backgroundColor: {
                                duration: 2,
                                ease: "easeOut",
                                delay: 0.5
                            },
                            boxShadow: {
                                duration: 2,
                                ease: "easeOut",
                                delay: 0.5
                            },
                            opacity: {
                                duration: 0.4,
                                ease: "easeOut"
                            },
                            layout: {
                                type: 'spring',
                                stiffness: 300,  // Faster layout changes
                                damping: 30,
                                mass: 0.8,
                                velocity: 0
                            }
                        }}
                        style={{
                            position: 'relative',
                            zIndex: repoIdx === 0 ? 50 : 1  // New items on top
                        }}
                        className={`grid grid-cols-9 transition-all duration-300
                ${repoIdx === convertData.length - 1 ? 'border-b border-pink-500' : ''}
                ${repo.highlight ? 'repo-highlight' : ''}  /* ✅ highlight cả hàng */
            `}
                    >
                        {/* Repo name */}
                        {/* <div
                            className="col-span-1 border-l border-pink-500 bg-gradient-to-r from-gray-900 to-purple-900 font-semibold text-xl pl-4 flex items-center"
                            style={{ color: getTeamColor(getRepoShortName(repo.repo_full_name)) }}
                        >
                            <span
                                className="truncate block max-w-[180px]"
                                title={getRepoShortName(repo.repo_full_name)}
                            >
                                {getRepoShortName(repo.repo_full_name)}
                            </span>
                            
                        </div> */}
                        <div
                            className="col-span-1 border-l border-pink-500 bg-gradient-to-r from-gray-900 to-purple-900 font-semibold text-xl pl-4 flex items-center hover:bg-purple-800/40 transition-all duration-200"
                        >
                            <a
                                href={`https://github.com/${repo.repo_full_name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate block max-w-[180px] text-pink-400 hover:text-cyan-300"
                                style={{ color: getTeamColor(getRepoShortName(repo.repo_full_name)) }}
                                title={`Open ${repo.repo_full_name} on GitHub`}
                            >
                                {getRepoShortName(repo.repo_full_name)}
                            </a>
                        </div>

                        {/* Heatmap */}
                        {hours.map((h) => (
                            <div
                                key={h}
                                className={`col-span-1 text-center cursor-pointer bg-[#161b22]
                    ${h === hours[hours.length - 1] ? 'border-r border-pink-500' : ''}
                `}
                            >
                                <div className="grid grid-cols-4">
                                    {repo.heatmap[h].map((count, idx) => {
                                        const intensity = Math.min(count / maxCommitGlobal, 1);

                                        // GitHub green color palette
                                        const getGitHubColor = (intensity) => {
                                            if (intensity === 0) return '#161b22'; // GitHub dark background
                                            if (intensity <= 0.2) return '#0e4429'; // Dark green
                                            if (intensity <= 0.4) return '#006d32'; // Medium dark green
                                            if (intensity <= 0.6) return '#26a641'; // Medium green
                                            if (intensity <= 0.8) return '#39d353'; // Bright green
                                            return '#39d353'; // Max bright green
                                        };

                                        const bg = getGitHubColor(intensity);

                                        return (
                                            <div
                                                key={idx}
                                                className="col-span-1 text-center font-bold text-xl text-white/50"
                                                style={{
                                                    backgroundColor: bg,
                                                }}
                                                title={`Commits: ${count}`}
                                            >
                                                {count > 0 ? count : ' '}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CommitBoard;