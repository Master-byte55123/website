// --- 1. Get all necessary DOM elements ---
const chillButton = document.getElementById('chill-button');
const chillTextarea = document.getElementById('chill-text');
const messageOverlay = document.getElementById('message-overlay');
const messageTitle = document.getElementById('message-title');
const messageContent = document.getElementById('message-content');
const messageCloseButton = document.getElementById('message-close-button');
const copyButton = document.getElementById('copy-button');
const charCounter = document.getElementById('char-counter'); 

// Featured Game Rotator Elements
const gameContainer = document.getElementById('featured-game-container');
const gameIconContainer = document.getElementById('game-icon-container');
const gameTitle = document.getElementById('game-title');
const gameGenre = document.getElementById('game-genre');
const gameDescription = document.getElementById('game-description');
const gameLink = document.getElementById('game-link');

// Ads Section Elements
const adContainer = document.getElementById('ad-container');

// --- 2. Featured Game Data Array ---
const featuredGames = [
    {
        title: "Cyberpunk 2077",
        genre: "Open World RPG",
        description: "A sprawling, futuristic adventure set in Night City. Customize your character, build your legend, and explore the dense urban sprawl.",
        link: "https://www.cyberpunk.net/",
    },
    {
        title: "Elden Ring",
        genre: "Action RPG",
        description: "Venture into the Lands Between, a new fantasy world created by Hidetaka Miyazaki and George R. R. Martin. Conquer formidable bosses and discover secrets.",
        link: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
    },
    {
        title: "Rocket League",
        genre: "Sports/Racing",
        description: "Football meets driving! Master the physics of rocket-powered cars to score aerial goals in this high-octane vehicular soccer game.",
        link: "https://www.rocketleague.com/",
    },
    {
        title: "God of War Ragnarök",
        genre: "Action-Adventure",
        description: "Join Kratos and Atreus on a perilous journey as they face the ultimate choice: a life of peace or the inevitable coming of Ragnarök.",
        link: "https://www.playstation.com/en-us/games/god-of-war-ragnarok/",
    },
    {
        title: "Valorant",
        genre: "Tactical FPS",
        description: "A 5v5 character-based tactical shooter where precision gunplay meets unique agent abilities. Outwit and outplay your opponents in Spike Rush or Competitive modes.",
        link: "https://playvalorant.com/",
    }
];

let currentGameIndex = 0;


// NEW: Gaming Gear Ads Data Array - UPDATED SVG ICONS
const gamingAds = [
    {
        name: "Neon Dragon Headset",
        tagline: "Hear the enemy coming!",
        price: "$129.99",
        link: "#",
        // Headset SVG with more prominent design
        icon: '<path d="M12 2a10 10 0 00-10 10v4a2 2 0 002 2h2v-4a6 6 0 0112 0v4h2a2 2 0 002-2v-4a10 10 0 00-10-10zM6 16v-4h2v4H6zm10 0v-4h2v4h-2z" fill="currentColor"/>'
    },
    {
        name: "Quantum Keyboard",
        tagline: "Zero latency mechanical keys.",
        price: "$199.99",
        link: "#",
        // Keyboard SVG with filled keys
        icon: '<rect x="2" y="6" width="20" height="12" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/><rect x="4" y="8" width="2" height="2" fill="currentColor"/><rect x="8" y="8" width="2" height="2" fill="currentColor"/><rect x="12" y="8" width="2" height="2" fill="currentColor"/><rect x="16" y="8" width="4" height="2" fill="currentColor"/><rect x="6" y="14" width="12" height="2" fill="currentColor"/>' 
    },
    {
        name: "Saber Mouse",
        tagline: "The fastest clicks in the west.",
        price: "$89.99",
        link: "#",
        // Mouse SVG - now a filled shape
        icon: '<path d="M12 2a4 4 0 00-4 4v12a4 4 0 008 0V6a4 4 0 00-4-4z" stroke="currentColor" stroke-width="2" fill="currentColor"/><path d="M12 2v4" stroke="var(--color-background)" stroke-width="2" stroke-linecap="round"/>'
    }
];


// --- 3. Function to generate SVG based on Genre ---
function getGameIcon(genre) {
    let svgInnerContent = '';
    const iconSize = 100;
    let iconColor = "#ff416c"; // Default Neon Pink
    
    if (genre.includes("RPG") || genre.includes("Adventure")) {
        // Sword icon for RPG/Adventure
        svgInnerContent = '<path d="M12 2l4.5 4.5L12 12l-4.5-5.5L12 2z" fill="currentColor"/><path d="M10 12l2 10 2-10" stroke="currentColor" stroke-width="2" fill="none"/>';
        iconColor = "#ff416c"; // Pink
    } else if (genre.includes("FPS") || genre.includes("Tactical")) {
        // Target/Crosshair icon for Shooter
        svgInnerContent = '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/>';
        iconColor = "#00bcd4"; // Cyan
    } else if (genre.includes("Sports") || genre.includes("Racing")) {
        // Car icon for Sports/Racing
        svgInnerContent = '<path d="M17.5 17.5H6.5c-1.1 0-2-.9-2-2V9.5c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2z" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="14.5" r="1.5" fill="#1a192b"/><circle cx="15.5" cy="14.5" r="1.5" fill="#1a192b"/>';
        iconColor = "#ffb000"; // Orange/Yellow
    } else {
        // Default Gamepad icon
        svgInnerContent = '<rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 10h8" stroke="currentColor" stroke-width="2"/><path d="M12 6v8" stroke="currentColor" stroke-width="2"/>';
        iconColor = "#e0e0e0";
    }

    return `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" style="color: ${iconColor};">
                ${svgInnerContent}
            </svg>`;
}

// --- 4. Function to rotate the Featured Game content ---
function rotateFeaturedGame() {
    const game = featuredGames[currentGameIndex];
    
    gameContainer.style.opacity = 0;

    setTimeout(() => {
        gameTitle.textContent = game.title;
        gameGenre.textContent = game.genre;
        gameDescription.textContent = game.description;
        gameLink.href = game.link;
        gameIconContainer.innerHTML = getGameIcon(game.genre);

        gameContainer.style.opacity = 1;

        currentGameIndex = (currentGameIndex + 1) % featuredGames.length;
    }, 500); 
}

// --- 5. Function to render the Gaming Ads ---
function renderGamingAds() {
    adContainer.innerHTML = gamingAds.map(ad => {
        // Use a generic SVG wrapper for the ad icons, making them smaller and yellow
        const adIconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="color: var(--color-neon-yellow); margin: 0 auto 5px;">
            ${ad.icon}
        </svg>`;

        return `
            <a href="${ad.link}" class="ad-card" target="_blank">
                <div>
                    ${adIconSvg}
                    <h4>${ad.name}</h4>
                </div>
                <div>
                    <p>${ad.tagline}</p>
                    <div class="ad-price">${ad.price}</div>
                </div>
            </a>
        `;
    }).join('');
}


// --- 6. Function to show the custom message box (Replaces alert()) ---
function showMessage(title, content) {
    messageTitle.textContent = title;
    messageContent.textContent = content;
    messageOverlay.classList.add('visible'); 
}

// --- 7. Function to hide the custom message box ---
function hideMessage() {
    messageOverlay.classList.remove('visible'); 
}

// --- 8. Real-Time Character Counter Handler ---
function updateCharacterCount() {
    const count = chillTextarea.value.length;
    charCounter.textContent = `${count} Characters (Min 10 Required)`;
    
    if (count < 10) {
        charCounter.style.color = '#ff416c'; 
    } else {
        charCounter.style.color = '#00bcd4';
    }
}


// --- 9. Main Submission Handler ---
function handleSubmit() {
    const userThoughts = chillTextarea.value.trim();

    if (userThoughts.length >= 10) {
        showMessage(
            'Submission Confirmed!', 
            `Thanks for your ${userThoughts.length}-character report. Entering Chill Area now!`
        );
        
        chillTextarea.value = '';
        updateCharacterCount();
        
    } else if (userThoughts.length > 0) {
         showMessage(
            'Hold Up, Gamer!', 
            'Your message is a little short. Please enter a minimum of 10 characters.'
        );
    } else {
        showMessage(
            'Input Required', 
            "Please type a message before joining the Chill Area."
        );
    }
}

// --- 10. Copy Functionality Handler ---
function handleCopy() {
    const userThoughts = chillTextarea.value.trim();
    
    if (userThoughts.length > 0) {
        chillTextarea.select(); 
        
        try {
            document.execCommand('copy');
            showMessage('Copied!', 'Text copied to clipboard!');
        } catch (err) {
            console.error('Copy failed:', err);
            showMessage('Copy Failed', 'Please copy the text manually.');
        }
        
        chillTextarea.setSelectionRange(0, 0);
        
    } else {
        showMessage('Nothing to Copy', 'The text area is empty.');
    }
}


// --- 11. Attach event listeners and start dynamic features ---
document.addEventListener('DOMContentLoaded', () => {
    // Start real-time character counter
    updateCharacterCount();
    
    // Start featured game rotation
    rotateFeaturedGame(); 
    setInterval(rotateFeaturedGame, 5000); 
    
    // Render the Ads
    renderGamingAds();
});

chillTextarea.addEventListener('input', updateCharacterCount);
chillButton.addEventListener('click', handleSubmit);
copyButton.addEventListener('click', handleCopy);
messageCloseButton.addEventListener('click', hideMessage);

messageOverlay.addEventListener('click', (e) => {
    if (e.target === messageOverlay) {
        hideMessage();
    }
});