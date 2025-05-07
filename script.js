const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const scrollTopBtn = document.getElementById('scrollToTop');
const currentYearSpan = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.querySelector('.toast-message');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsContainer = document.querySelector('.projects-grid');

// Project data
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online shopping platform with product listings, cart functionality, and payment gateway integration.',
    tags: ['React', 'Node.js', 'MySQL', 'Tailwind.css'],
    demoUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/jaysam01/',
    featured: true,
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio website built with modern web technologies.',
    tags: ['React', 'TailwindCSS', 'TypeScript'],
    demoUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/jaysam01/',
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates and team workspaces.',
    tags: ['React', 'Typescript', 'MySQL', 'TailwindCSS'],
    demoUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/jaysam01/',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather forecast application displaying current conditions and 5-day predictions.',
    tags: ['JavaScript', 'CSS', 'OpenWeather API'],
    demoUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/jaysam01/',
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'A content management system allowing users to create, edit, and publish blog posts.',
    tags: ['Next.js', 'MongoDB', 'TailwindCSS'],
    demoUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/jaysam01/',
    featured: true,
  },
  {
    id: 6,
    title: 'Recipe Finder',
    description: 'An application for finding and saving recipes with ingredient-based search.',
    tags: ['React', 'Redux', 'Firebase'],
    demoUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/jaysam01/',
  },
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();
  
  // Load projects initially
  filterProjects('all');
  
  // Add event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile navigation toggle
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    navToggle.innerHTML = mobileNav.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
  
  // Close mobile nav when clicking on a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // Scroll to top button
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  // Project filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Filter projects
      const filter = btn.getAttribute('data-filter');
      filterProjects(filter);
    });
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

// Filter projects based on tag
function filterProjects(filter) {
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(filter));
    
  displayProjects(filteredProjects);
}

// Display projects in the DOM
function displayProjects(projectsList) {
  projectsContainer.innerHTML = ''; // Clear the container

  projectsList.forEach(project => {
    const card = document.createElement('div');
    card.className = `project-card ${project.featured ? 'project-featured' : ''}`;
    card.innerHTML = `
      <div class="project-image">
        <div class="project-overlay">
          <div class="project-title-overlay">${project.title}</div>
        </div>
        <div class="project-placeholder"></div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link btn-secondary"><i class="fab fa-github"></i> Code</a>` : ''}
          ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="project-link btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
        </div>
      </div>
    `;
    projectsContainer.appendChild(card);
  });

  console.log('Projects displayed:', projectsList); // Debugging
}

// Handle contact form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const formData = new FormData(contactForm);
  const formProps = Object.fromEntries(formData);
  
  // Change button text
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    // Reset form
    contactForm.reset();
    
    // Show success message
    showToast('Message sent successfully. I\'ll get back to you soon!');
    
    // Reset button
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }, 1500);
}

// Show toast notification
function showToast(message) {
  // Set message
  toastMessage.textContent = message;
  
  // Show toast
  toast.classList.add('show');
  
  // Remove toast after animation completes
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
