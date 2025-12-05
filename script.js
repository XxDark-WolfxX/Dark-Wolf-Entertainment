// The entry point: Runs when the page is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initial Load: Check the URL hash and load the right page
    handleNavigation();
    
    // 2. Attach listeners to ALL navigation links (the SPA Engine)
    setupSPARouting();
    
    // 3. Setup listeners for the specific elements on the home page
    fetchProjectStatus();
    setupProjectLink(); 
});

// --- SPA ROUTING LOGIC (Handles all 11 pages + Logo Enhancement) ---

/**
 * Attaches click handlers to all navigation links to prevent full reloads.
 */
function setupSPARouting() {
    // Selects ALL links that have the 'data-route' attribute
    const navLinks = document.querySelectorAll('.nav-link[data-route]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Stop the default browser action (prevents full page reload)
            event.preventDefault(); 
            
            // Get the route hash (e.g., '#stories') from the link's href
            const routeHash = link.getAttribute('href');
            
            // NEW LOGIC: If the link is the Logo, add a smooth scroll to the top
            if (link.classList.contains('logo')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // Manually update the URL hash and trigger the navigation handler
            window.location.hash = routeHash;
        });
    });
    
    // This listener handles both user clicks AND the browser's back/forward buttons
    window.addEventListener('hashchange', handleNavigation);
}

/**
 * Hides all pages and shows the one that matches the current URL hash.
 */
function handleNavigation() {
    // Determine the target page ID (default to 'home' if no hash is present)
    let targetPageId = window.location.hash.substring(1) || 'home';

    // 1. Hide ALL pages and remove 'active' state from ALL nav links
    document.querySelectorAll('.page-content').forEach(page => {
        // We only remove the active class. CSS handles the visibility and height transition.
        page.classList.remove('active-page');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 2. Show the target page by ID 
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        // Add the active class. CSS instantly makes it visible and expands its height.
        targetPage.classList.add('active-page'); 
    }

    // 3. Highlight the correct nav link
    const activeNavLink = document.querySelector(`.nav-link[data-route="${targetPageId}"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }
}

// --- DYNAMIC DATA FETCH (Runs only on the home page to fill the status) ---

async function fetchProjectStatus() {
    const container = document.getElementById('dynamic-status-content');
    
    // Simulate a network delay (a fake API call)
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    const projectData = {
        name: "Dev Portfolio CLI",
        status: "Active Development",
        progress: 75,
        lastUpdate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    
    const contentHTML = `
        <p><strong>Project:</strong> ${projectData.name}</p>
        <p><strong>Status:</strong> <span class="status-badge">${projectData.status}</span></p>
        <p><strong>Last Commit:</strong> ${projectData.lastUpdate}</p>
        
        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${projectData.progress}%;">
                ${projectData.progress}% Complete
            </div>
        </div>
    `;

    container.innerHTML = contentHTML;
    
    // Injects the necessary styles for the dynamic elements
    const style = document.createElement('style');
    style.textContent = `
        .status-badge { background: #E74C3C; color: #1A1A1A; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 0.9em; }
        .progress-bar-container { height: 20px; background: #444; border-radius: 10px; margin-top: 10px; overflow: hidden; }
        .progress-bar { 
            height: 100%; 
            background: linear-gradient(to right, #C0392B, #E74C3C); 
            color: white; 
            text-align: center; 
            line-height: 20px; 
            font-size: 12px; 
            transition: width 1s ease-out; 
        }
    `;
    document.head.appendChild(style);
}

// --- LINK INTERACTION (Example of custom JS behavior) ---

function setupProjectLink() {
    // The element 'project-link' may not exist in the HTML, so we check first.
    const projectLink = document.getElementById('project-link');
    
    if (projectLink) {
        projectLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            if (confirm("Heads up! This link takes you off the site. Continue to project demo?")) {
                // Placeholder: Use your actual project link here
                window.open("https://github.com/XxDark-WolfxX/latest-project", "_blank");
            } else {
                console.log("User cancelled navigation.");
            }
        });
    }
}