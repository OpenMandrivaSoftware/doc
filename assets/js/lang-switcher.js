(function() {
  'use strict';

  function initLangSwitcher() {
    // Detect current language from URL path
    var path = window.location.pathname;
    var currentLang = 'en';
    if (path.startsWith('/fr/') || path === '/fr') {
      currentLang = 'fr';
    }

    var switcher = document.querySelector('.lang-switcher');
    if (!switcher) {
      return;
    }

    var currentSpan = switcher.querySelector('.lang-current-text');
    if (currentSpan) {
      currentSpan.textContent = currentLang.toUpperCase();
    }

    switcher.querySelectorAll('.dropdown-item').forEach(function(item) {
      var lang = item.dataset.lang;
      var pagePath = window.location.pathname;

      // Remove language prefix from current path
      var cleanPath = pagePath;
      if (pagePath.startsWith('/fr/')) {
        cleanPath = pagePath.substring(3);
      } else if (pagePath === '/fr') {
        cleanPath = '/';
      }

      // Remove language suffix AND .html extension
      cleanPath = cleanPath.replace(/\.(en|fr)\.html$/, '');
      cleanPath = cleanPath.replace(/\.(en|fr)$/, '');
      cleanPath = cleanPath.replace(/\.html$/, '');

      // Build URL for this language
      var href;
      if (lang === 'en') {
        // English: use clean path with .en.html suffix
        href = cleanPath === '' || cleanPath === '/' ? '/index.en.html' : cleanPath + '.en.html';
      } else {
        // French: prefix with /fr and add .fr.html suffix
        if (cleanPath === '/' || cleanPath === '') {
          href = '/fr/index.fr.html';
        } else {
          href = '/fr' + cleanPath + '.fr.html';
        }
      }

      item.setAttribute('href', href);

      if (item.dataset.lang === currentLang) {
        item.style.fontWeight = '600';
        item.style.background = 'rgba(255,255,255,0.1)';
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    var currentSpan = switcher.querySelector('.lang-current-text');
    if (currentSpan) {
      currentSpan.textContent = currentLang.toUpperCase();
    }

    // Dropdown toggle
    var dropdown = switcher.querySelector('.dropdown');
    if (!dropdown) return;

    var toggle = dropdown.querySelector('.dropdown-toggle');
    var menu = dropdown.querySelector('.dropdown-menu');

    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = menu.classList.contains('show');
      document.querySelectorAll('.lang-switcher .dropdown-menu').forEach(function(m) {
        m.classList.remove('show');
      });
      menu.classList.toggle('show', !isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Try multiple ways to ensure init runs
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLangSwitcher);
  } else {
    initLangSwitcher();
  }
})();