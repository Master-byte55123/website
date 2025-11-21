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

// Pop-up Ad Elements (Intrusive Ad)
const popupAdOverlay = document.getElementById('popup-ad-overlay');
const adCloseButton = document.getElementById('ad-close-button');


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


// NEW: Gaming Gear Ads Data Array
const gamingAds = [
    {
        title: "Neon RGB Mouse",
        description: "Ultra-lightweight, 16,000 DPI sensor, perfect for e-sports.",
        price: "$79.99",
        link: "#",
        iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse"><rect x="7" y="4" width="10" height="16" rx="5"/><path d="M12 4v4"/></svg>'
    },
    {
        title: "Mechanical Keyboard",
        description: "Clicky blue switches, full anti-ghosting, customizable per-key RGB.",
        price: "$149.00",
        link: "#",
        iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-keyboard"><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M4 18v-5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v5"/><path d="M12 21v-3"/><path d="M6 21v-3"/><path d="M18 21v-3"/></svg>'
    },
    {
        title: "Pro Gaming Headset",
        description: "7.1 Surround Sound, noise-canceling mic, memory foam earcups.",
        price: "$99.50",
        link: "#",
        iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headphones"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"/><path d="M21 14h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2z"/><path d="M19 19v-4c0-4.42-3.58-8-8-8S3 10.58 3 15v4"/></svg>'
    }
];


// --- 3. Custom Alert/Message Box Function ---
/**
 * Shows a custom message box instead of using the native alert().
 * @param {string} title - The title of the message.
 * @param {string} content - The main content/body of the message.
 */
function showCustomMessage(title, content) {
    messageTitle.textContent = title;
    messageContent.textContent = content;
    messageOverlay.classList.add('visible');
    // Stop the user from scrolling the background while the message is visible
    document.body.style.overflow = 'hidden'; 
}

// Close the custom message box
messageCloseButton.addEventListener('click', () => {
    messageOverlay.classList.remove('visible');
    document.body.style.overflow = ''; // Restore scrolling
});


// --- 4. Chill Area Logic ---
// Event listener for the main Chill Area button
chillButton.addEventListener('click', () => {
    const text = chillTextarea.value.trim();
    if (text.length < 10) {
        showCustomMessage(
            'Wait a Minute!',
            'Your thoughts must be at least 10 characters long to join the Chill Area. Give us more detail!'
        );
    } else {
        // Here you would typically send the data to a server (like Firestore)
        showCustomMessage(
            'Welcome to the Chill Area!',
            `Thanks for sharing your thoughts (Length: ${text.length}). Your post is live!`
        );
        chillTextarea.value = ''; // Clear the text area
        updateCharCounter(); // Reset the counter
    }
});

// Event listener for the Copy button
copyButton.addEventListener('click', () => {
    const text = chillTextarea.value.trim();
    if (text.length === 0) {
         showCustomMessage(
            'Nothing to Copy',
            'Please type something in the box first!'
        );
        return;
    }
    
    // Use document.execCommand('copy') for better iframe compatibility
    try {
        chillTextarea.select();
        document.execCommand('copy');
        showCustomMessage(
            'Copied!',
            'Your thoughts have been copied to your clipboard.'
        );
    } catch (err) {
        showCustomMessage(
            'Copy Failed',
            'Could not copy text automatically. Please select and copy manually.'
        );
    }
});

// Character Counter Logic
chillTextarea.addEventListener('input', updateCharCounter);

function updateCharCounter() {
    const count = chillTextarea.value.length;
    charCounter.textContent = `${count} Characters (Min 10 Required)`;
    
    // Style the counter based on character count
    if (count < 10) {
        charCounter.style.color = '#ff416c'; // Neon Pink
        charCounter.style.fontWeight = 'bold';
    } else {
        charCounter.style.color = '#00bcd4'; // Neon Cyan
        charCounter.style.fontWeight = 'normal';
    }
}
// Initial counter update on load
updateCharCounter();


// --- 5. Featured Game Rotator Logic ---

/**
 * Renders the current featured game details to the DOM.
 */
function renderGame(index) {
    const game = featuredGames[index];
    
    // Add fade out class for transition
    gameContainer.style.opacity = '0'; 

    setTimeout(() => {
        // Update content
        gameTitle.textContent = game.title;
        gameGenre.textContent = game.genre;
        gameDescription.textContent = game.description;
        gameLink.href = game.link;
        
        // Generate a random placeholder icon (since we cannot load images/logos)
        gameIconContainer.innerHTML = generateRandomGameIcon();

        // Add fade in class
        gameContainer.style.opacity = '1';

    }, 500); // Wait for fade out to complete (0.5s)
}

/**
 * Generates a simple SVG icon based on game type/mood.
 * @returns {string} SVG string for a game-themed icon.
 */
function generateRandomGameIcon() {
    const icons = [
        // Controller Icon
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#ffb000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad-2"><path d="M6 12v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M12 15a3 3 0 0 1-3 3h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z"/><path d="M12 15a3 3 0 0 0 3 3h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z"/></svg>',
        // Sword Icon
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#ff416c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sword"><path d="M20 19v-4.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V19"/><path d="M20 19v3a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-3"/><path d="M15 19v-4.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V19"/><path d="M12 2v5"/><path d="M12 7h2"/><path d="M12 7L10 9"/><path d="M10 7h2"/></svg>',
        // Space Shuttle Icon
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c1.26-1.5 1.5-3 1.5-3l1.5-1.5a.5.5 0 0 1 1 0l1.5 1.5c1.26-1.5 5-2 5-2s-.5-3.74-2-5c-1.5-1.26-3-1.5-3-1.5l-1.5-1.5a.5.5 0 0 1 0-1l1.5-1.5c-1.5-1.26-2-5-2-5s3.74.5 5 2c1.26 1.5 1.5 3 1.5 3l1.5 1.5a.5.5 0 0 0 0-1l-1.5-1.5c-1.26-1.5-5-2-5-2s.5 3.74 2 5c1.5 1.26 3 1.5 3 1.5l1.5 1.5a.5.5 0 0 0 1 0l1.5-1.5c1.26-1.5 5-2 5-2s-.5-3.74-2-5c-1.5-1.26-3-1.5-3-1.5L4.5 16.5z"/></svg>'
    ];
    // Simple rotation logic based on the current game index
    const iconIndex = currentGameIndex % icons.length;
    return icons[iconIndex];
}

/**
 * Cycles to the next featured game every 8 seconds.
 */
function startGameRotator() {
    setInterval(() => {
        currentGameIndex = (currentGameIndex + 1) % featuredGames.length;
        renderGame(currentGameIndex);
    }, 8000); // Change game every 8 seconds
}


// --- 6. Gaming Gear Ads Logic ---

/**
 * Renders the dynamic advertising cards.
 */
function renderAds() {
    adContainer.innerHTML = gamingAds.map(ad => `
        <a href="${ad.link}" class="ad-card" target="_blank">
            <div class="ad-icon">${ad.iconSvg}</div>
            <div class="ad-details">
                <h4>${ad.title}</h4>
                <p>${ad.description}</p>
            </div>
            <div class="ad-price">${ad.price}</div>
        </a>
    `).join('');
    // Apply neon cyan color to the SVG icons within the ads
    document.querySelectorAll('.ad-icon svg').forEach(svg => {
        svg.setAttribute('stroke', '#00bcd4');
    });
}


// --- 7. Intrusive Pop-up Ad Logic ---

// Function to display the pop-up ad
function showAdPopup() {
    // Show the ad after a short delay to be extra annoying (2 seconds)
    setTimeout(() => {
        popupAdOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }, 2000);
}

// Close button event listener
adCloseButton.addEventListener('click', () => {
    popupAdOverlay.classList.remove('visible');
    document.body.style.overflow = ''; // Restore scrolling
});

// --- 8. Initialization (run on page load) ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial render of the featured game
    renderGame(currentGameIndex);
    // Start the game rotator
    startGameRotator();
    // Render the ads
    renderAds();
    // Show the intrusive ad popup
    showAdPopup(); 
});