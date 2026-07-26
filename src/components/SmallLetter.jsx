import React, { useState, useRef } from 'react';
import masshoqa from '../assets/masshoqa.mp3';
import musicCover from '../assets/musicCover.webp';
import mewmew from '../assets/mewmew.gif';
import '../SmallLetter.css';

const SmallLetter = () => {
    // 1. State to control the letter's open/close status
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // 2. Ref to hold the main letter container DOM element
    // This is needed to manually add/remove the '--close' class for the animation timing
    const letterRef = useRef(null);
    const audioRef = useRef(null);

    const handleAudioToggle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            audio.pause();
        }
    };

    const handleRestart = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
    };

    const handleProgressClick = (event) => {
        const audio = audioRef.current;
        if (!audio || !Number.isFinite(audio.duration)) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        audio.currentTime = ((event.clientX - bounds.left) / bounds.width) * audio.duration;
    };

    // --- Logic for Envelope Click (Toggle) ---

    const handleToggleLetter = () => {
        const letterElement = letterRef.current;
        if (!letterElement) return; // Safety check

        if (isOpen) {
            // CLOSE SEQUENCE:
            // 1. Set the class for the closing animation
            letterElement.classList.add('small-rajib-letter--close');
            setIsOpen(false);

            // 2. Remove the closing class after the animation duration (600ms)
            setTimeout(() => {
                letterElement.classList.remove('small-rajib-letter--close');
            }, 600);

        } else {
            // OPEN SEQUENCE:
            // 1. Ensure the close class is removed
            letterElement.classList.remove('small-rajib-letter--close');
            // 2. Set state to open (which adds 'small-rajib-letter--open')
            setIsOpen(true);
        }
    };

    // --- Logic for 'X' Click (Close Only) ---

    const handleCloseLetter = () => {
        const letterElement = letterRef.current;
        if (!letterElement) return; // Safety check

        // Start the close animation immediately
        letterElement.classList.remove('small-rajib-letter--open');
        letterElement.classList.add('small-rajib-letter--close');
        setIsOpen(false); // Update state to reflect closed status

        // Remove the closing class after the animation duration (600ms)
        setTimeout(() => {
            letterElement.classList.remove('small-rajib-letter--close');
        }, 600);
    };

    // Determine the dynamic class based on 'isOpen' state
    const letterStateClass = isOpen ? 'small-rajib-letter--open' : '';

    return (
        <>
            <div
                className={`small-rajib-letter ${letterStateClass}`}
                ref={letterRef} // Attach the ref here
            >
                <div
                    className="small-rajib-envelope"
                    onClick={handleToggleLetter} // Attach the toggle handler
                >
                    <div className="small-rajib-envelope-flap"></div>
                    <div className="small-rajib-envelope-paper"></div>
                    <div className="small-rajib-envelope-detail"></div>
                </div>

                <div className="small-rajib-paper">
    <div className="small-rajib-paper-content">
        <div
            className="small-rajib-paper-close"
            onClick={handleCloseLetter} // Attach the close handler
        >
            x
        </div>
        <div className={`small-rajib-player ${isPlaying ? 'small-rajib-player--playing' : ''}`}>
            <div className="small-rajib-player-info">
                <h4>Our little song</h4>
                <button
                    className="small-rajib-progress-track"
                    type="button"
                    onClick={handleProgressClick}
                    aria-label="Change song position"
                >
                    <span className="small-rajib-progress-bar" style={{ width: `${progress}%` }} />
                </button>
            </div>
            <div className="small-rajib-disc-wrap">
                <button
                    className="small-rajib-disc"
                    type="button"
                    onClick={handleAudioToggle}
                    aria-label={isPlaying ? 'Pause song' : 'Play song'}
                >
                    <img src={musicCover} alt="Masshoqa cover" />
                </button>
            </div>
            <div className="small-rajib-navigation">
                <button className="small-rajib-action-btn" type="button" onClick={handleRestart} aria-label="Restart song">↺</button>
                <button className="small-rajib-action-btn small-rajib-action-btn--big" type="button" onClick={handleAudioToggle}>
                    {isPlaying ? 'Ⅱ' : '▶'}
                </button>
            </div>
            <img className="small-rajib-player-cat" src={mewmew} alt="A small cat listening to the song" />
            <audio
                ref={audioRef}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={(event) => {
                    const { currentTime, duration } = event.currentTarget;
                    setProgress(Number.isFinite(duration) ? (currentTime / duration) * 100 : 0);
                }}
            >
                <source src={masshoqa} type="audio/mpeg" />
            </audio>
        </div>
    </div>

    {/* --- NEW SVG DIARY PAGE DECORATION --- */}
    <svg className="rajib-diary-deco" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Left 'binding' line */}
        <line x1="5" y1="0" x2="5" y2="100" stroke="#E0DDB7" strokeWidth="1" className="diary-line left-line" />
        {/* Right 'border' line */}
        <line x1="95" y1="0" x2="95" y2="100" stroke="#E0DDB7" strokeWidth="1" className="diary-line right-line" />
        
        {/* Optional: Top/bottom faint lines for page feel */}
        <line x1="0" y1="5" x2="100" y2="5" stroke="#E0DDB7" strokeWidth="0.5" className="diary-line top-line" />
        <line x1="0" y1="95" x2="100" y2="95" stroke="#E0DDB7" strokeWidth="0.5" className="diary-line bottom-line" />
        
        {/* Subtle, pulsing dots along the left (like stitching) */}
        <circle cx="5" cy="10" r="0.5" fill="#E0DDB7" className="diary-dot dot-1" />
        <circle cx="5" cy="20" r="0.5" fill="#E0DDB7" className="diary-dot dot-2" />
        <circle cx="5" cy="30" r="0.5" fill="#E0DDB7" className="diary-dot dot-3" />
        <circle cx="5" cy="40" r="0.5" fill="#E0DDB7" className="diary-dot dot-4" />
        <circle cx="5" cy="50" r="0.5" fill="#E0DDB7" className="diary-dot dot-5" />
        <circle cx="5" cy="60" r="0.5" fill="#E0DDB7" className="diary-dot dot-6" />
        <circle cx="5" cy="70" r="0.5" fill="#E0DDB7" className="diary-dot dot-7" />
        <circle cx="5" cy="80" r="0.5" fill="#E0DDB7" className="diary-dot dot-8" />
        <circle cx="5" cy="90" r="0.5" fill="#E0DDB7" className="diary-dot dot-9" />
    </svg>
    
</div>
            </div>
        </>
    )
}

export default SmallLetter;
