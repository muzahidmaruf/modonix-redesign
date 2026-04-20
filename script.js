// Modonix - Main Script
document.addEventListener('DOMContentLoaded', function() {

  // ===== Mobile Menu =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const overlay = document.querySelector('.nav-mobile-overlay');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('visible');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.mobile-dropdown-title').forEach(function(title) {
    title.addEventListener('click', function() {
      this.classList.toggle('open');
      var items = this.nextElementSibling;
      if (items) items.classList.toggle('open');
    });
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-mobile a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    });
  });

  // ===== Sticky Header =====
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      var item = this.parentElement;
      var isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('active');
      });
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== Scroll Reveal Animation =====
  var revealElements = document.querySelectorAll('.reveal');
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(function(el) {
    observer.observe(el);
  });

  // ===== Stats Counter Animation =====
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'));
        var current = 0;
        var increment = Math.ceil(target / 60);
        var suffix = el.nextElementSibling ? el.nextElementSibling.textContent : '';
        
        var timer = setInterval(function() {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + (target > 10 ? '+' : '+');
        }, 30);
        
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(function(el) {
    statsObserver.observe(el);
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Exit Intent Popup =====
  var exitPopup = document.querySelector('.exit-popup-overlay');
  var closePopup = document.querySelector('.close-popup');
  var popupReady = false;
  var popupDismissedAt = parseInt(localStorage.getItem('modonix_popup_dismissed') || '0');
  var thirtyMinutes = 30 * 60 * 1000;
  var canShowPopup = (Date.now() - popupDismissedAt) > thirtyMinutes;

  // Only allow popup after 1 minute of browsing
  if (canShowPopup && exitPopup) {
    setTimeout(function() { popupReady = true; }, 60000);
  }

  document.addEventListener('mouseout', function(e) {
    if (popupReady && e.clientY <= 0 && exitPopup) {
      exitPopup.classList.add('show');
      popupReady = false;
    }
  });

  function dismissPopup() {
    if (exitPopup) {
      exitPopup.classList.remove('show');
      localStorage.setItem('modonix_popup_dismissed', Date.now().toString());
    }
  }

  if (closePopup) {
    closePopup.addEventListener('click', dismissPopup);
  }

  if (exitPopup) {
    exitPopup.addEventListener('click', function(e) {
      if (e.target === exitPopup) { dismissPopup(); }
    });
  }

  // ===== Tab Navigation =====
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabGroup = this.closest('.section');
      tabGroup.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      tabGroup.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
      this.classList.add('active');
      var target = document.getElementById(this.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

});
