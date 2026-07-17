/* 
   TYPING EFFECT
 */
const textArray = [
  "React Native Developer",
  "Mobile App Developer",
  "Web Developer",
  "UI-Focused Problem Solver"
];

let typingIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeText() {
  if (!typingElement) return;

  if (charIndex < textArray[typingIndex].length) {
    typingElement.textContent += textArray[typingIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 80);
  } else {
    setTimeout(eraseText, 1800);
  }
}

function eraseText() {
  if (charIndex > 0) {
    typingElement.textContent =
      textArray[typingIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50);
  } else {
    typingIndex = (typingIndex + 1) % textArray.length;
    setTimeout(typeText, 500);
  }
}

/*
   SKILLS SECTION - PARTICLES BACKGROUND
 */
function createSkillsParticles() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  
  const existingParticles = skillsSection.querySelector('.skills-particles');
  if (existingParticles) {
    existingParticles.remove();
  }
  
  // particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'skills-particles';
  
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
   
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    
    particle.style.animationDuration = Math.random() * 10 + 5 + 's';
    
    
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    particlesContainer.appendChild(particle);
  }
  
  skillsSection.appendChild(particlesContainer);
}

/* =
   SKILLS SECTION - INTERACTIVE HOVER EFFECTS
 */
function enhanceSkillsInteractivity() {
  const skillBoxes = document.querySelectorAll('.skill-box');
  
  skillBoxes.forEach(box => {
   
    if (!box.querySelector('.skill-progress')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'skill-progress';
      box.appendChild(progressBar);
    }
    
    // 3D tilt effect on mouse move
    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    // Reset transform on mouse leave
    box.addEventListener('mouseleave', () => {
      box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
    
    // Click effect
    box.addEventListener('click', () => {
      box.style.transform = 'scale(0.95)';
      setTimeout(() => {
        box.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

/* 
   SKILLS SECTION - SCROLL ANIMATION
 */
function initSkillsScrollAnimation() {
  const skillBoxes = document.querySelectorAll('.skill-box');
  
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          
         
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px' }
  );
  
  skillBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    skillsObserver.observe(box);
  });
}

/* 
   SKILLS SECTION - TOOLTIP FOR SKILLS
*/
function addSkillTooltips() {
  const skillBoxes = document.querySelectorAll('.skill-box');
  
  skillBoxes.forEach(box => {
    const skillName = box.querySelector('span').textContent;
    const icon = box.querySelector('i').className;
    
    box.setAttribute('title', `Expert in ${skillName}`);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  typeText();
  initOverlayListeners();
  createSkillsParticles();
  enhanceSkillsInteractivity();
  initSkillsScrollAnimation();
  addSkillTooltips();
  
  window.openProjectDetails = openProjectDetails;
  window.closeProjectOverlay = closeProjectOverlay;
});



/*
   SCROLL REVEAL ANIMATION
 */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

/* 
   ANIMATED COUNTERS
 */
const counters = document.querySelectorAll(".counter");

const runCounter = counter => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = target / 80;

  const update = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target + "+";
    }
  };
  update();
};

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => counterObserver.observe(counter));


/* 
   STATS SECTION - INTERACTIVE COUNTER
 */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const progressBars = document.querySelectorAll('.stat-progress-bar');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const target = parseInt(statNumber.getAttribute('data-target'));
        const progressBar = statNumber.closest('.stat-item').querySelector('.stat-progress-bar');
        
        
        if (progressBar) {
          progressBar.style.width = '100%';
        }
        
       
        animateNumber(statNumber, 0, target, 2000);
        
        
        statsObserver.unobserve(statNumber);
      }
    });
  }, { threshold: 0.5, rootMargin: '0px' });
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
}

function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 3);
    
    const current = Math.floor(easeOutQuart * (end - start) + start);
    element.textContent = current;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  };
  
  window.requestAnimationFrame(step);
}

/* 
   STATS SECTION - PARTICLES BACKGROUND
 */
function createStatsParticles() {
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;
  
 
  const existingParticles = statsSection.querySelector('.stats-particles');
  if (existingParticles) {
    existingParticles.remove();
  }
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'stats-particles';
  
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'stats-particle';
    
   
    const size = Math.random() * 15 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    
    particlesContainer.appendChild(particle);
  }
  
  statsSection.appendChild(particlesContainer);
}

/*
   STATS SECTION - HOVER EFFECTS
 */
function initStatsHoverEffects() {
  const statItems = document.querySelectorAll('.stat-item');
  
  statItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

/*  */
document.addEventListener("DOMContentLoaded", () => {
  typeText();
  initOverlayListeners();
  createSkillsParticles();
  enhanceSkillsInteractivity();
  initSkillsScrollAnimation();
  addSkillTooltips();
  initStatsCounter(); 
  createStatsParticles(); 
  initStatsHoverEffects(); 
  
  window.openProjectDetails = openProjectDetails;
  window.closeProjectOverlay = closeProjectOverlay;
});



/* 
   PROJECTS DATA
 */
const projectsData = [
  {
    id: 0,
    title: "TravelEase App",
    description: "A comprehensive travel booking app with real-time updates, Firebase authentication, and integrated payment system.",
    longDescription: "This React Native application features user authentication, real-time booking updates, push notifications, and a seamless payment gateway. The app uses Firebase for backend services and Redux for state management.",
    image: "images/TE/TE4.jpeg",
    github: "https://github.com/ShaimaTayyab",
    tech: ["React Native", "Firebase", "Redux", "Stripe API"],
    type: "mobile",
    liveDemo: {
      
      features: [
        "Search and book flights, hotels, and rental cars",
        "Real-time booking updates and notifications",
        "Secure payment processing with Stripe",
        "User profiles and booking history",
        "Interactive maps for location selection"
      ],
      screenshots: [
        "images/TE/TE1.jpeg",
        "images/TE/TE2.jpeg",
        "images/TE/TE3.jpeg",
        "images/TE/TE4.jpeg",
        "images/TE/TE5.jpeg",
        "images/TE/TE6.jpeg",
        "images/TE/TE7.jpeg",
        "images/TE/TE8.jpeg",
        "images/TE/TE9.jpeg",
      ]
    }
  },
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website with dark theme, smooth animations, and interactive elements.",
    longDescription: "This portfolio showcases my work and skills with a clean, modern design. Features include smooth scrolling, animated sections, responsive layout, and a contact form. The site is optimized for performance and SEO.",
    image: "images/P/P1.png",
    github: "https://github.com/ShaimaTayyab",
    live: "https://github.com/ShaimaTayyab",
    tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    type: "web",
    liveDemo: {
      url: "https://github.com/ShaimaTayyab",
      features: [
        "Fully responsive design for all devices",
        "Smooth scrolling and section animations",
        "Interactive project showcase with details overlay",
        "Contact form with email integration",
        "Dark theme with modern UI elements"
      ],
      screenshots: [
        "images/P/P1.png",
        "images/P/P2.png",
        "images/P/P3.png",
        "images/P/P4.png",
        "images/P/P5.png",
        "images/P/P6.png",
        "images/P/P7.png",
        "images/P/P8.png",
        "images/P/P9.png",
      ]
    }
  },
  {
    id: 2,
    title: "CS Department Website",
    longDescription: "Multi-page departmental website with complete internal navigation across Programs, Admissions, Research, Faculty, and Student Portal.Built with HTML, CSS, Bootstrap, and JavaScript. Desktop-first UI with reusable components.The site implements fully functional links across 15+ interconnected pages, ensuring smooth user flow and easy access to information. Each section features custom-built components including faculty profile cards, program listings, research publication grids, and an interactive student portal dashboard.The GitHub link is attached below for this website.Do check it.",
    image: "images/CS/CS1.png",
    github: "https://github.com/ShaimaTayyab/shaimaa.github.io",
    live: "https://shaimatayyab.github.io/shaimaa.github.io/CS%20website%201/index.html",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "GitHub", "Web Development"],
    type: "web",
    liveDemo: {
      url: "https://shaimatayyab.github.io/shaimaa.github.io/CS%20website%201/index.html",
      features: [
        "Interactive charts and data visualization",
        "Multi-page architecture with full internal navigation",
        "Program listings with curriculum info",
        "Reusable Bootstrap components",
        "Responsive tables and forms"
      ],
      screenshots: [
        "images/CS/CS1.png",
        "images/CS/CS2.png",
        "images/CS/CS3.png",
        "images/CS/CS4.png",
        "images/CS/CS5.png",
        "images/CS/CS6.png",
      ]
    }
  },
  {
    id: 3,
    title: "Fazal Group Portal App",
    description: "React Native app with MySQL backend.",
    longDescription: "The FazalGroup Portal App is developed using React Native for the mobile frontend and Node.js + Express.js for the backend server, with MySQL as the database.It enables secure authentication, complaint submissions with file uploads, and structured data storage through RESTful APIs.",
    image: "images/FG/1.jpeg",
    github:"https://github.com/ShaimaTayyab",
    live: "https://github.com/ShaimaTayyab",
    tech: ["React Native", "JavaScript", "MySQL", "REST API"],
    type: "mobile",
    liveDemo: {
      url: "https://github.com/ShaimaTayyab",
      features: [
        "🔐 Secure Login System with password encryption (bcrypt hashing)",
        "📝 Complaint Management System with token generation functionality",
        "🌐 RESTful API integration for real-time data handling",
        "💾 MySQL database integration for secure data storage",
        "📱 Responsive mobile-friendly UI"
      ],
      screenshots: [
        "images/FG/1.jpeg",
        "images/FG/2.jpeg",
        "images/FG/3.jpeg",
        "images/FG/4.jpeg",
        "images/FG/5.jpeg",
        "images/FG/6.jpeg",
        "images/FG/7.jpeg",
        "images/FG/8.jpeg",
        "images/FG/9.jpeg",
        "images/FG/10.jpeg",
        
      ]
    }
  }
];

/* 
   PROJECT OVERLAY FUNCTIONS
 */
function openProjectDetails(index) {
  const overlay = document.getElementById('projectsOverlay');
  const overlayGrid = document.getElementById('overlayProjectsGrid');
  
  const project = projectsData[index];
  const isMobileApp = project.type === 'mobile';
  
  overlayGrid.innerHTML = '';
  
  let screenshotsHTML = '';
  
  if (isMobileApp && project.liveDemo.screenshots) {
    screenshotsHTML = `
      <div class="mobile-screenshot-container">
        ${project.liveDemo.screenshots.map((screenshot, i) => `
          <div class="mobile-frame">
            <div class="mobile-notch"></div>
            <div class="mobile-screen">
              <img src="${screenshot}" alt="${project.title} screenshot ${i+1}">
            </div>
            <div class="mobile-caption">Screen ${i+1}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (project.liveDemo.screenshots) {
    screenshotsHTML = `
      <div class="screenshots-gallery">
        ${project.liveDemo.screenshots.map(screenshot => `
          <div class="screenshot-item">
            <img src="${screenshot}" alt="Project screenshot">
          </div>
        `).join('')}
      </div>
    `;
  }
  
  const credentialsHTML = project.liveDemo.credentials ? `
    <div class="credentials-box">
      <h4>🔑 Demo Credentials</h4>
      ${Object.entries(project.liveDemo.credentials).map(([key, value]) => `
        <p><span>${key}:</span> ${value}</p>
      `).join('')}
    </div>
  ` : '';
  
  const projectCard = `
    <div class="overlay-project-card">
      <img src="${project.image}" alt="${project.title}" class="overlay-project-img">
      
      <div class="overlay-project-content">
        <h3>${project.title}</h3>
        <p>${project.longDescription}</p>
        
        <div class="tech-stack">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <div class="live-demo-section">
          <h3><i class="fas fa-play-circle"></i> Live Demo</h3>
          
          <a href="${project.liveDemo.url}" target="_blank" class="demo-button">
            <i class="fas fa-external-link-alt"></i> Try Live Demo
          </a>
          
          ${credentialsHTML}
          
          <div>
            <h4 style="color: #fff; font-size: 1.2rem; margin-bottom: 1rem;">✨ Key Features</h4>
            <div class="features-grid">
              ${project.liveDemo.features.map(feature => `
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>${feature}</span>
                </div>
              `).join('')}
            </div>
          </div>
          
          ${screenshotsHTML ? `
            <div>
              <h4 style="color: #fff; font-size: 1.2rem; margin: 2rem 0 1rem 0;">
                ${isMobileApp ? '📱 App Screenshots' : '📸 Project Screenshots'}
              </h4>
              ${screenshotsHTML}
            </div>
          ` : ''}
        </div>
     
      </div>
    </div>
  `;
  
  overlayGrid.innerHTML = projectCard;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectOverlay() {
  const overlay = document.getElementById('projectsOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* 
   OVERLAY EVENT LISTENERS
 */
function initOverlayListeners() {
  const overlay = document.getElementById('projectsOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeProjectOverlay();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProjectOverlay();
    }
  });
}

/*
   INITIALIZATION
 */
document.addEventListener("DOMContentLoaded", () => {
  typeText();
  initOverlayListeners();
  
  window.openProjectDetails = openProjectDetails;
  window.closeProjectOverlay = closeProjectOverlay;
});