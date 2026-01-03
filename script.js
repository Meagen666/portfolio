// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // About section navigation - scroll to sections
    const aboutNavLinks = document.querySelectorAll('.about-nav-link');
    const aboutSections = document.querySelectorAll('.about-section-content');
    const aboutRight = document.querySelector('.about-right');

    aboutNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                // Update active nav link
                aboutNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to target section
                const offsetTop = targetElement.offsetTop - 20;
                aboutRight.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link based on scroll position
    if (aboutRight) {
        aboutRight.addEventListener('scroll', function() {
            let current = '';
            aboutSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (aboutRight.scrollTop >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            aboutNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Project selection functionality
    const projectBoxes = document.querySelectorAll('.project-box');
    const selectedProject = document.getElementById('selected-project');
    const selectedProjectName = document.getElementById('selected-project-name');
    const selectedProjectDescription = document.getElementById('selected-project-description');
    const selectedProjectSubtitle = document.getElementById('selected-project-subtitle');
    const selectedProjectMedia = selectedProject.querySelector('.selected-project-media');

    // Project data
    const projectsData = {
        1: {
            name: 'Smoking & Drinking Behaviour Prediction',
            subtitle: 'A predictive model analysing lifestyle factors to classify smoking and drinking behaviour.',
            description: 'Developed a classification model using Python, Pandas, and Scikit-learn to predict smoking and drinking status based on demographic and health-related features. Performed data cleaning, feature engineering, model training, and evaluation using metrics such as accuracy and recall. Visualised insights using Matplotlib and Seaborn to identify key behaviour patterns.',
            media: {
                type: 'video',
                src: 'assets/Smoking-Drinking-Behaviour-Prediction-vid.mp4'
            },
            category: 'ai',
            visitUrl: 'https://prkf6rc2ykyrgfbhhtm4ay.streamlit.app/',
            githubUrl: 'https://github.com/meagen666/mldp'
        },
        2: {
            name: 'SmartQueue— Cloud-Hosted Queue Length Detection System (AWS)',
            subtitle: 'A cloud-hosted queue detection platform integrating AWS services and an interactive map to help users find the nearest foodcourts with live queue estimates.',
            description: 'Developed a cloud-deployed queue length detection system integrating an image classification model with AWS Rekognition. Implemented AWS S3 for image handling, enabling scalable and efficient storage. Designed an interactive map-based interface that automatically identifies the user\'s location and displays the nearest foodcourts along with predicted queue levels for each stall. Enhanced user experience by combining cloud deployment, geolocation services, and real-time AI inference into a single accessible web platform.',
            media: {
                type: 'video',
                src: 'assets/smartqueue-web-vid.mp4'
            },
            category: 'cloud',
            visitUrl: '',
            githubUrl: ''
        },
        3: {
            name: 'SmartClaim— Expense Claim Automation',
            subtitle: 'An end-to-end automation workflow on UiPath for receipt verification and reporting.',
            description: 'Automated receipt extraction and data validation using UiPath with OCR integration. Built workflows to generate reports, manage Google Drive storage, automate Outlook notifications, and monitor approval statuses in Excel. Added exception handling and logging for reliability.',
            media: {
                type: 'video',
                src: 'assets/SmartClaim-rpa-vid.mp4'
            },
            category: 'automation',
            visitUrl: '',
            githubUrl: ''
        },
        4: {
            name: 'ChompChamp — Food Expiry Tracking App',
            subtitle: 'A flutter sustainability app using OCR for food expiry detection.',
            description: 'Developed a cross-platform Flutter app using Firebase and local storage to track food expiry dates and encourage sustainable consumption. Integrated Google ML Kit OCR to scan and extract text from packaging labels. Designed a clean, responsive UI and implemented meal planning and food tracking status visualisation to encourage sustainable food usage.',
            media: {
                type: 'video',
                src: 'assets/ChompChamp-app-vid.mp4'
            },
            category: 'web',
            visitUrl: '',
            githubUrl: ''
        },
        5: {
            name: 'TP VendoSmart — Vending Machine Admin System',
            subtitle: 'An admin vending machine management system featuring real-time product visuals and structured inventory control.',
            description: 'Built an admin-focused web system using HTML, CSS, JavaScript, and MySQL to manage vending machine inventory with item CRUD operations and structured database schemas designed in MySQL Workbench. Enhanced the interface with a real-time item display panel, where product images update dynamically to reflect the actual items shown in a vending machine layout, a unique design element that improves clarity for admins managing stock visually. Ensured intuitive navigation and consistent UX for efficient retail operations.',
            media: {
                type: 'video',
                src: 'assets/vendosmart-web-vid.mp4'
            },
            category: 'web',
            visitUrl: '',
            githubUrl: ''
        },
        6: {
            name: 'Temasek Polytechnic CCA Showcase Website',
            subtitle: 'A responsive website highlighting student CCAs at TP.',
            description: 'Designed and developed an informative site using HTML, CSS, focusing on clean layout, accessibility, and mobile responsiveness to improve accessibility and visibility of student programmes within TP.',
            media: {
                type: 'video',
                src: 'assets/cca-showcase-web-vid.mp4'
            },
            category: 'web',
            visitUrl: '',
            githubUrl: ''
        }
    };

    // Track current selected project
    let currentProjectId = 1;

    // Activities data
    const activitiesData = {
        events: [
            {
                title: 'Hong Kong University X TP Exhange',
                date: '12-16 Jun 2025',
                description: 'Together with students from Hong Kong University, participated in collaborative AI workshops and had the opportunity to tour Oracle and Google.',
                img: 'assets/hku.jpg',
                iconFallback: 'fas fa-user'
            },
            {
                title: 'AAISIG Machine Learning Workshop - Committee Member',
                date: '22 Jul 2025',
                description: 'Organised a machine learning workshop teaching model-building fundamentals and hands-on chance to create an AI-powered website.',
                img: 'assets/ML_workshop.jpeg',
                iconFallback: 'fas fa-user'
            },
            {
                title: 'Digital Kampung - Committee Member',
                date: '14 Sep 2025',
                description: 'Showcased AI diploma skills to the community through interactive booths, including “Spot the AI” and "Can you fool the AI".',
                img: 'assets/digital_kampung.jpg',
                iconFallback: 'fas fa-user'
            },
            {
                title: 'Opportunity Festival',
                date: '14 Sep 2025',
                description: 'Networked with companies and universities invited by TP to explore further education, industry insights, and career opportunities.',
                img: 'assets/opportunity_fest.jpg',
                iconFallback: 'fas fa-user'
            },
            {
                title: 'IITSC Code with Kids',
                date: '14 Sep 2025',
                description: 'Guided children through multiple AI platforms to spark early interest in technology.',
                img: 'assets/codewithkids.jpg',
                iconFallback: 'fas fa-user'
            }
        ],
        certs: [
            {
                title: 'KNIME',
                date: 'Dec 2023',
                description: 'Achieved basic proficiency in building data workflows using the KNIME analytics platform.',
                img: 'assets/knime.png',
                iconFallback: 'fas fa-certificate'
            },
            {
                title: "Director's List",
                date: 'May 2025',
                description: 'Recognised for outstanding academic performance in AY2024/2025',
                img: 'assets/directors_list.png',
                iconFallback: 'fas fa-certificate'
            },
            {
                title: 'NETS',
                date: 'Sept 2025',
                description: 'Integrated NETS QR payment into a Flutter application using official NETS APIs.',
                img: 'assets/nets.png',
                iconFallback: 'fas fa-certificate'
            },
            {
                title: 'OBS Temasek Polytechnic Leadership Programme',
                date: 'Sept 2025',
                description: 'Participated in the OBS Temasek Polytechnic Leadership Programme to enhance leadership skills and teamwork.',
                img: 'assets/obs.png',
                iconFallback: 'fas fa-certificate'
            },
            {
                title: 'Udemy ',
                date: 'Dec 2025',
                description: 'Completed a course on building fully responsive websites from scratch using HTML and CSS.',
                img: 'assets/udemy_html_css.png',
                iconFallback: 'fas fa-certificate'
            },
            {
                title: 'WorldSkills Singapore – Software Testing (2025)',
                date: 'Sept 2025',
                description: 'Participated in the WorldSkills Singapore – Software Testing (2025) competition to enhance software testing skills and knowledge.',
                img: 'assets/worldskills.png',
                iconFallback: 'fas fa-certificate'
            }
        ]
    };

    // Render activities into a grid container
    function renderActivities(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing
        container.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'activity-card';

            const media = document.createElement('div');
            media.className = 'activity-media-preview';

            const img = document.createElement('img');
            img.className = 'activity-photo';
            img.src = item.img || '';
            img.alt = item.title || 'Activity';
            img.onload = function() {
                try {
                    const w = this.naturalWidth || 0;
                    const h = this.naturalHeight || 0;
                    if (this.parentElement) {
                        // add orientation class to media container
                        if (w && h) {
                            this.parentElement.classList.add(w > h ? 'horizontal' : 'vertical');
                        }
                    }
                } catch (e) {
                    // ignore
                }
            };
            img.onerror = function() {
                this.style.display = 'none';
                if (this.parentElement) {
                    const ph = this.parentElement.querySelector('.media-placeholder-small');
                    if (ph) ph.style.display = 'flex';
                }
            };

            const placeholder = document.createElement('div');
            placeholder.className = 'media-placeholder-small';
            placeholder.style.display = 'none';
            const icon = document.createElement('i');
            icon.className = item.iconFallback || 'fas fa-image';
            placeholder.appendChild(icon);

            media.appendChild(img);
            media.appendChild(placeholder);

            const info = document.createElement('div');
            info.className = 'activity-info';

            const h4 = document.createElement('h4');
            h4.textContent = item.title || '';

            const date = document.createElement('p');
            date.className = 'activity-date';
            date.textContent = item.date || '';

            const desc = document.createElement('p');
            desc.className = 'activity-description';
            desc.textContent = item.description || '';

            info.appendChild(h4);
            info.appendChild(date);
            info.appendChild(desc);

            card.appendChild(media);
            card.appendChild(info);

            container.appendChild(card);
        });
    }

    // Render both sections
    renderActivities('activities-events', activitiesData.events);
    renderActivities('activities-certs', activitiesData.certs);

    // Function to update selected project display
    function updateSelectedProject(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        currentProjectId = parseInt(projectId);
        
        // Remove selected class from all boxes
        projectBoxes.forEach(b => b.classList.remove('selected'));
        // Add selected class to matching box
        const matchingBox = Array.from(projectBoxes).find(b => b.getAttribute('data-project') == projectId);
        if (matchingBox) {
            matchingBox.classList.add('selected');
        }
        
        // Update selected project display
        selectedProjectName.textContent = project.name;
        if (selectedProjectSubtitle) {
            selectedProjectSubtitle.textContent = project.subtitle || '';
        }
        selectedProjectDescription.textContent = project.description;
        
        // Update media
        const mediaContainer = selectedProjectMedia.querySelector('.media-placeholder');
        if (project.media.type === 'video' && project.media.src) {
            // Clear container and prepare for video
            mediaContainer.innerHTML = '';
            mediaContainer.style.display = 'block';
            mediaContainer.style.padding = '0';
            mediaContainer.style.justifyContent = 'flex-start';
            mediaContainer.style.alignItems = 'flex-start';
            
            // Create video element with all autoplay attributes
            const video = document.createElement('video');
            video.src = project.media.src;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('autoplay', '');
            video.setAttribute('loop', '');
            video.setAttribute('muted', '');
            
            mediaContainer.appendChild(video);
            
            // Force play when video loads
            const attemptPlay = () => {
                video.play().catch(() => {
                    // Autoplay was prevented, try again after user interaction
                    const tryPlayOnInteraction = () => {
                        video.play().catch(() => {});
                        document.removeEventListener('click', tryPlayOnInteraction);
                        document.removeEventListener('scroll', tryPlayOnInteraction);
                        document.removeEventListener('touchstart', tryPlayOnInteraction);
                    };
                    document.addEventListener('click', tryPlayOnInteraction, { once: true });
                    document.addEventListener('scroll', tryPlayOnInteraction, { once: true });
                    document.addEventListener('touchstart', tryPlayOnInteraction, { once: true });
                });
            };
            
            video.addEventListener('loadeddata', attemptPlay);
            video.addEventListener('canplay', attemptPlay);
            
            // Try immediately
            setTimeout(attemptPlay, 50);
            
        } else if (project.media.type === 'image' && project.media.src) {
            // If image, create img element
            mediaContainer.style.display = 'block';
            mediaContainer.style.padding = '0';
            mediaContainer.innerHTML = `<img src="${project.media.src}" alt="${project.name}">`;
        } else {
            // Placeholder - restore original flex styles
            mediaContainer.style.display = 'flex';
            mediaContainer.style.padding = '';
            mediaContainer.style.justifyContent = 'center';
            mediaContainer.style.alignItems = 'center';
            mediaContainer.innerHTML = '<i class="fas fa-image"></i><p>Project Image/Video</p>';
        }
        
        // Update buttons
        const visitBtn = document.getElementById('btn-visit');
        const githubBtn = document.getElementById('btn-github');
        
        if (visitBtn && githubBtn) {
            if (project.visitUrl) {
                visitBtn.style.display = 'inline-block';
                visitBtn.onclick = () => window.open(project.visitUrl, '_blank');
            } else {
                visitBtn.style.display = 'none';
            }
            
            if (project.githubUrl) {
                githubBtn.style.display = 'inline-block';
                githubBtn.onclick = () => window.open(project.githubUrl, '_blank');
            } else {
                githubBtn.style.display = 'none';
            }
        }
        
        // Show selected project
        selectedProject.style.display = 'block';
        
        // Scroll to top of projects section
        selectedProject.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Populate project grid boxes with videos/images
    function populateProjectGrid() {
        projectBoxes.forEach(box => {
            const projectId = box.getAttribute('data-project');
            const project = projectsData[projectId];
            const mediaContainer = box.querySelector('.project-media-preview');
            const placeholder = box.querySelector('.media-placeholder-small');
            
            if (project && project.media && project.media.src) {
                // Remove placeholder
                if (placeholder) {
                    placeholder.remove();
                }
                
                if (project.media.type === 'video') {
                    // Create and add video
                    const video = document.createElement('video');
                    video.src = project.media.src;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.autoplay = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('muted', '');
                    video.setAttribute('loop', '');
                    
                    mediaContainer.appendChild(video);
                    
                    // Try to play the video
                    const tryPlay = () => {
                        video.play().catch(() => {
                        });
                    };
                    
                    video.addEventListener('loadeddata', tryPlay);
                    video.addEventListener('canplay', tryPlay);
                    
                    // Play on hover for better UX
                    box.addEventListener('mouseenter', () => {
                        video.play().catch(() => {});
                    });
                    
                    // Pause on mouse leave
                    box.addEventListener('mouseleave', () => {
                    });
                    
                    setTimeout(tryPlay, 100);
                    
                } else if (project.media.type === 'image') {
                    // Create and add image
                    const img = document.createElement('img');
                    img.src = project.media.src;
                    img.alt = project.name;
                    mediaContainer.appendChild(img);
                }
            }
        });
    }
    
    // Populate grid boxes
    populateProjectGrid();

    // Project box click handler
    projectBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            updateSelectedProject(projectId);
        });
    });

    // Navigation arrows functionality
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const totalProjects = Object.keys(projectsData).length;

    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            currentProjectId = currentProjectId > 1 ? currentProjectId - 1 : totalProjects;
            updateSelectedProject(currentProjectId);
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            currentProjectId = currentProjectId < totalProjects ? currentProjectId + 1 : 1;
            updateSelectedProject(currentProjectId);
        });
    }

    // Initialize with first project
    updateSelectedProject(1);

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectBoxes.forEach(box => {
                if (filter === 'all' || box.getAttribute('data-category') === filter) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission (guarded) - only attach if form exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Show loading state
            if (submitBtn) submitBtn.disabled = true;
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) submitBtn.textContent = 'Sending...';

            // Use mailto fallback
            useMailtoFallback(name, email, message, submitBtn, originalText, contactForm);
        });
    }
    
    function useMailtoFallback(name, email, message, submitBtn, originalText, contactForm) {
        // Create mailto link with form data
        const subject = encodeURIComponent(`Contact Form Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:meagen666@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            alert('Your email client should open. If it doesn\'t, please send your message directly to meagen666@gmail.com');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 500);
    }
    
    function showSuccess(submitBtn, originalText, contactForm) {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('resume-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Resume modal functionality
function openResume() {
    const modal = document.getElementById('resume-modal');
    const resumeFrame = document.getElementById('resume-frame');
    
    // You can replace this with the path to your actual resume PDF
    // For now, using a placeholder
    resumeFrame.src = 'assets/meagen_resume_2025.pdf';
    
    modal.style.display = 'block';
}

// Close modal
document.addEventListener('DOMContentLoaded', function() {
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('resume-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.getElementById('resume-frame').src = '';
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
