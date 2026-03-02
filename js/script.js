document.addEventListener("DOMContentLoaded", function () {

  /* =====================
     Smooth Scroll for Navbar
  ===================== */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) window.scrollTo({ top: target.offsetTop - 70, behavior:'smooth' });
    });
  });

  /* =====================
     Fade-in on Scroll
  ===================== */
  const faders = document.querySelectorAll('.feature-box, .newsletter');
  const appearOptions = { threshold:0.2, rootMargin:"0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  /* =====================
     Hero Icon Hover
  ===================== */
  document.querySelectorAll('.hero-platforms i').forEach(icon => {
    icon.addEventListener('mouseenter', ()=> icon.style.transform='rotate(15deg) scale(1.3)');
    icon.addEventListener('mouseleave', ()=> icon.style.transform='rotate(0deg) scale(1)');
  });

  /* =====================
     Back to Top Button
  ===================== */
  const backToTop = document.createElement('div');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '&#8679;';
  backToTop.style.cssText = `
    position: fixed; bottom:30px; right:30px;
    background:#F1B608; color:#030303; padding:10px 15px;
    border-radius:50%; cursor:pointer; font-size:1.5rem; display:none; z-index:1000;
    transition: transform 0.3s, opacity 0.3s;
  `;
  document.body.appendChild(backToTop);
  window.addEventListener('scroll', ()=> backToTop.style.display = window.scrollY>300?'block':'none');
  backToTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  /* =====================
     Newsletter Form Validation
  ===================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const feedback = document.createElement('div');
  feedback.style.color = '#f00';
  feedback.style.marginTop = '5px';
  newsletterForm.appendChild(feedback);

  // Force lowercase automatically
  emailInput.addEventListener('input', () => {
    emailInput.value = emailInput.value.toLowerCase();
  });

  newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // standard email check
    if(email === '') {
      feedback.textContent = "Email cannot be empty.";
      emailInput.focus();
    } else if(!emailRegex.test(email)){
      feedback.textContent = "Please enter a valid email address.";
      emailInput.focus();
    } else {
      feedback.textContent = "";
      alert("Thank you! You are subscribed.");
      newsletterForm.reset();
    }
  });

  /* =====================
     Carousel Autoplay (Bootstrap 5)
  ===================== */
  const carouselElement = document.getElementById('heroCarousel');
  if(carouselElement){
    new bootstrap.Carousel(carouselElement,{ interval:3000, wrap:true, pause:'hover' });
  }

  /* =====================
     Newsletter Social Icons Hover
  ===================== */
  document.querySelectorAll('.newsletter-social a').forEach(icon=>{
    icon.addEventListener('mouseenter', e=>{
      icon.style.transform='scale(1.4) rotate(5deg)';
      icon.style.boxShadow='0 0 15px rgba(241,182,8,0.7)';
    });
    icon.addEventListener('mouseleave', e=>{
      icon.style.transform='scale(1) rotate(0deg)';
      icon.style.boxShadow='none';
    });
  });

});

/* =====================
   Fade-in Class Injection
===================== */
const style = document.createElement('style');
style.innerHTML = `
  .fade-in{ opacity:1 !important; transform:translateY(0) !important; transition: all 1s ease-out; }
  .feature-box, .newsletter{ opacity:0; transform:translateY(50px); }
`;
document.head.appendChild(style);