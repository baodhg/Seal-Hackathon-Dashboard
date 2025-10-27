import React, { useState, useEffect, useRef } from 'react';

const CountdownClock = () => {
    const [remaining, setRemaining] = useState(0); // còn lại tính bằng giây
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    // Khi mount → kiểm tra localStorage
    useEffect(() => {
        const savedEnd = localStorage.getItem('countdown-end');
        if (savedEnd) {
            const endTime = parseInt(savedEnd, 10);
            const now = Date.now();
            const diff = Math.floor((endTime - now) / 1000);
            if (diff > 0) {
                setRemaining(diff);
                setIsRunning(true);
            } else {
                localStorage.removeItem('countdown-end');
            }
        }
    }, []);

    // Khi đang chạy → giảm mỗi giây
    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        localStorage.removeItem('countdown-end');
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    // Format thời gian (hh:mm:ss)
    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    // START: cho nhập phút và bắt đầu đếm ngược
    const handleStart = () => {
        const minutesStr = prompt('Nhập số phút cần đếm ngược:', '1');
        const minutes = parseInt(minutesStr, 10);

        if (!minutes || minutes <= 0) {
            alert('Vui lòng nhập số phút hợp lệ!');
            return;
        }

        const endTime = Date.now() + minutes * 60 * 1000;
        localStorage.setItem('countdown-end', endTime.toString());
        setRemaining(minutes * 60);
        setIsRunning(true);
    };

    // RESET: dừng & xóa hết
    const handleReset = () => {
        clearInterval(timerRef.current);
        localStorage.removeItem('countdown-end');
        setRemaining(0);
        setIsRunning(false);
    };

    return (
        <div className="flex flex-row items-center justify-center space-x-10 pb-2">
            {/* Time Display */}
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                bg-clip-text text-transparent font-mono drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]">
                {formatTime(remaining)}
            </h1>

            {/* Buttons */}
            {!isRunning ? (
                <button
                    onClick={handleStart}
                    className="relative px-7 py-3 rounded-2xl font-bold text-white text-sm font-mono tracking-wider
                        backdrop-blur-md bg-white/5 border-2 border-green-500 hover:bg-green-500/20
                        hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-500"
                >
                    <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-green-500 transition-opacity duration-500"></div>
                    <span className="relative flex items-center gap-3">
                        <div className="w-0 h-0 border-l-[12px] border-l-green-500 border-y-[6px] border-y-transparent"></div>
                        START
                    </span>
                </button>
            ) : (
                <button
                    onClick={handleReset}
                    className="relative px-7 py-3 rounded-2xl font-bold text-white text-sm font-mono tracking-wider
                        backdrop-blur-md bg-white/5 border-2 border-red-500 hover:bg-red-500/20
                        hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-500"
                >
                    <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-red-500 transition-opacity duration-500"></div>
                    <span className="relative flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-sm animate-pulse"></div>
                        RESET
                    </span>
                </button>
            )}
        </div>
    );
};

export default CountdownClock;
