/* =========================================
   PREMIUM PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. SMOOTH SCROLL FOR ANCHOR LINKS
     ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* -----------------------------------------
     2. SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ----------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.service-item, .step, .work-card, .about-box, .tools-box, .section-heading'
  );

  // Initial state
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered delay for grid items
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80); // 80ms delay between each item
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* -----------------------------------------
     3. WORK CARD PARALLAX TILT EFFECT
     (Mouse move par cards 3D tilt honge)
     ----------------------------------------- */
  const workCards = document.querySelectorAll('.work-card');
  
  workCards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8; // Max 8deg tilt
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });


  /* -----------------------------------------
     4. CUSTOM CURSOR (Premium Agency Feel)
     ----------------------------------------- */
  // Sirf desktop par show hoga
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows instantly
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth follow for outer ring
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor grows on hoverable elements
    const hoverTargets = document.querySelectorAll('a, button, .work-card, .tool, .service-item');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }


  /* -----------------------------------------
     5. MEGA TITLE PARALLAX ON SCROLL
     ----------------------------------------- */
  const megaTitle = document.querySelector('.mega-title');
  
  if (megaTitle) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 800) {
        megaTitle.style.transform = `translate(-50%, calc(-60% + ${scrolled * 0.3}px))`;
      }
    });
  }


  /* -----------------------------------------
     6. AVAILABILITY DOT RANDOM PULSE
     (Subtle variation for organic feel)
     ----------------------------------------- */
  const availabilityDot = document.querySelector('.dot');
  if (availabilityDot) {
    setInterval(() => {
      availabilityDot.style.opacity = Math.random() > 0.5 ? '1' : '0.5';
    }, 1500);
  }


  /* -----------------------------------------
     7. STATS COUNTER ANIMATION
     (Numbers count up when scrolled into view)
     ----------------------------------------- */
  const stats = document.querySelectorAll('.stat strong');
  
  const animateCounter = (el, target) => {
    let current = 0;
    const increment = target / 40; // 40 frames
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + '+';
    }, 25);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        const number = parseInt(text.replace('+', ''));
        if (!isNaN(number)) {
          animateCounter(entry.target, number);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));


  /* -----------------------------------------
     8. PROCESS STEPS SEQUENTIAL HIGHLIGHT
     ----------------------------------------- */
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    step.addEventListener('mouseenter', () => {
      steps.forEach(s => s.style.opacity = '0.5');
      step.style.opacity = '1';
      step.style.borderLeft = '3px solid var(--accent-red)';
      step.style.paddingLeft = '12px';
    });
    
    step.addEventListener('mouseleave', () => {
      steps.forEach(s => {
        s.style.opacity = '1';
        s.style.borderLeft = 'none';
        s.style.paddingLeft = '0';
      });
    });
  });

});