// main.js - basic interactivity for Aura Travel & Tours
document.addEventListener('DOMContentLoaded',function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle){
    navToggle.addEventListener('click',()=>{
      mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Simple hero slider
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  if(slides.length>0){
    slides[current].classList.add('active');
    setInterval(()=>{
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    },5000);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  });

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Lazy load images (basic)
  if('loading' in HTMLImageElement.prototype){
    document.querySelectorAll('img[loading="lazy"]').forEach(img=>{});
  } else {
    // IntersectionObserver fallback
    const imgs = document.querySelectorAll('img[data-src]');
    const obs = new IntersectionObserver((entries,observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      })
    });
    imgs.forEach(i=>obs.observe(i));
  }
});
