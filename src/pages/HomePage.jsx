import { useCallback, useState } from 'react'
import CommitBoard from '../components/CommitBoard/CommitBoard'
import MainHeader from '../components/MainHeader/MainHeader'
import { useRealtimeCommits } from '../hooks/useRealtimeCommits.js'

const HomePage = () => {

  const [commits, setCommits] = useState([]);
  // Khi có commit mới
  const handleNewCommit = useCallback((newCommit) => {
    setCommits((prev) => {
      const foundRepoIndex = prev.findIndex(
        (r) => r.repo_full_name === newCommit.repo_full_name
      );

      if (foundRepoIndex !== -1) {
        // ✅ Repo đã tồn tại
        const updatedRepo = {
          ...prev[foundRepoIndex],
          total_commits: prev[foundRepoIndex].total_commits + 1,
          commits: [...prev[foundRepoIndex].commits, newCommit],
          highlight: true, // thêm flag để highlight
        };

        // Đưa repo đó lên đầu danh sách
        const newList = [
          updatedRepo,
          ...prev.filter((_, idx) => idx !== foundRepoIndex),
        ];

        // Sau 3s bỏ highlight
        setTimeout(() => {
          setCommits((current) =>
            current.map((repo) =>
              repo.repo_full_name === updatedRepo.repo_full_name
                ? { ...repo, highlight: false }
                : repo
            )
          );
        }, 3000);

        return newList;
      } else {
        // ✅ Repo mới hoàn toàn
        const newRepo = {
          repo_full_name: newCommit.repo_full_name,
          total_commits: 1,
          commits: [newCommit],
          highlight: true,
        };

        // Sau 3s bỏ highlight
        setTimeout(() => {
          setCommits((current) =>
            current.map((repo) =>
              repo.repo_full_name === newRepo.repo_full_name
                ? { ...repo, highlight: false }
                : repo
            )
          );
        }, 3000);

        return [newRepo, ...prev];
      }
    });
  }, []);

  useRealtimeCommits(handleNewCommit);
  return (
    <div className='h-full relative p-5'>

      {/* Enhanced Circuit Lines */}
      <div className="circuit-lines">
        <div className="circuit-line horizontal" style={{ top: '15%', animationDelay: '0s' }}></div>
        <div className="circuit-line horizontal" style={{ top: '45%', animationDelay: '1.5s' }}></div>
        <div className="circuit-line horizontal" style={{ top: '75%', animationDelay: '3s' }}></div>
        <div className="circuit-line vertical" style={{ left: '20%', animationDelay: '2s' }}></div>
        <div className="circuit-line vertical" style={{ left: '50%', animationDelay: '0.5s' }}></div>
        <div className="circuit-line vertical" style={{ left: '80%', animationDelay: '2.5s' }}></div>
      </div>

      {/* Enhanced Binary Rain */}
      <div className="binary-rain">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="binary-char"
            style={{
              left: `${i * 3.3}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              fontSize: `${12 + Math.random() * 6}px`,
              color: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00ffff' : '#ff00ff'
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      {/* Hexagon Particles */}
      <div className="hackathon-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`hex-${i}`}
            className="hex-particle"
            style={{
              left: `${i * 12.5}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${10 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Data Stream Particles */}
      <div className="hackathon-particles">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`data-${i}`}
            className="data-stream"
            style={{
              top: `${10 + i * 8}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          >
            {['</>', '{}', '[]', '()', '&lt;', '&gt;', '//'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      {/* Pulse Rings */}
      <div className="pulse-ring" style={{ top: '20%', left: '10%', width: '100px', height: '100px', animationDelay: '0s' }}></div>
      <div className="pulse-ring" style={{ top: '60%', right: '15%', width: '150px', height: '150px', animationDelay: '1s' }}></div>
      <div className="pulse-ring" style={{ bottom: '30%', left: '70%', width: '80px', height: '80px', animationDelay: '2s' }}></div>

      {/* Energy Orbs */}
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={`orb-${i}`}
          className="energy-orb"
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        ></div>
      ))}

      {/* Scanning Line */}
      <div className="scan-line"></div>

      {/* Main content with enhanced glassmorphism */}
      <div className="relative z-10 px-7">
        <MainHeader />
        {commits && commits.length > 0 ? (
          <CommitBoard data={commits} />
        ) : (
          <div className="text-cyan-300 font-mono select-non p-8">
            {/* Loading/Empty State */}
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              {/* Animated loading spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>

              {/* Loading text with typing effect */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-cyan-400 animate-pulse">
                  INITIALIZING HACKATHON DASHBOARD...
                </h3>
                <p className="text-pink-300 text-sm">
                  Connecting to repositories<span className="animate-pulse">...</span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>

              {/* Decorative elements */}
              <div className="flex space-x-4 text-xs text-cyan-500/50">
                <span className="animate-pulse">LOADING...</span>
                <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>SCANNING...</span>
                <span className="animate-pulse" style={{ animationDelay: '1s' }}>ANALYZING...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
