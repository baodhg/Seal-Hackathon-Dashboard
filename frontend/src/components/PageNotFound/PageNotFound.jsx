import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../common/path'

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
            {/* Animated background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse"></div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute top-[20%] right-[15%] w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-[20%] left-[80%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-cyan-300 rounded-full animate-bounce delay-150"></div>
                <div className="absolute bottom-[40%] right-[25%] w-2 h-2 bg-blue-300 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-[80%] left-[60%] w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Tech grid pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full"
                    style={{
                        backgroundImage: `
                             linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                         `,
                        backgroundSize: '30px 30px'
                    }}>
                </div>
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
                {/* 404 Number with futuristic effect */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-3xl opacity-30"></div>
                    <h1 className="relative text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl tracking-wider animate-pulse">
                        404
                    </h1>
                    {/* Glitch lines */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-ping"></div>
                </div>

                {/* Error message */}
                <div className="mb-8 space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent tracking-wide">
                        PAGE NOT FOUND
                    </h2>
                    <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    <p className="text-cyan-200/80 text-lg font-light tracking-wide max-w-md mx-auto leading-relaxed">
                        The digital pathway you seek has been lost in the quantum void.
                        Navigate back to safety.
                    </p>
                </div>

                {/* Futuristic Home Button */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <Link
                        to={path.main}
                        className="relative block bg-gray-900/90 border border-cyan-400/50 rounded-lg px-8 py-4 text-cyan-300 font-semibold tracking-wider uppercase hover:text-white hover:border-cyan-300 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span>Return to Base</span>
                        </div>
                    </Link>
                </div>

                {/* Decorative elements */}
                <div className="mt-12 flex justify-center space-x-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>

                {/* Status indicator */}
                <div className="mt-8 text-xs text-cyan-400/60 font-mono tracking-widest">
                    STATUS: CONNECTION_LOST | ERROR_404 | REDIRECTING...
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/30"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/30"></div>
        </div>
    )
}

export default PageNotFound
