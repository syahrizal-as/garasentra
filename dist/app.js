(() => {
  'use strict';

  const salesNumber = '6289649532860';
  const whatsappUrl = message => `https://wa.me/${salesNumber}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('a[data-wa]').forEach(link => {
    link.href = whatsappUrl(link.dataset.wa);
  });

  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#mobile-nav');
  const setMenu = open => {
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    menuButton.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });
  const desktopQuery = window.matchMedia('(min-width: 721px)');
  desktopQuery.addEventListener('change', event => { if (event.matches) setMenu(false); });

  const dashboardDialog = document.querySelector('#dashboard-dialog');
  document.querySelectorAll('[data-dashboard-open]').forEach(button => {
    button.addEventListener('click', () => {
      dashboardDialog.showModal();
      document.documentElement.classList.add('dashboard-preview-open');
    });
  });
  dashboardDialog.querySelector('.dashboard-dialog-close').addEventListener('click', () => dashboardDialog.close());
  dashboardDialog.addEventListener('close', () => document.documentElement.classList.remove('dashboard-preview-open'));
  dashboardDialog.addEventListener('click', event => {
    if (event.target !== dashboardDialog) return;
    const bounds = dashboardDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dashboardDialog.close();
    }
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];
  const selectTab = tab => {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(tabs[next]);
        tabs[next].focus();
      }
    });
  });

  const form = document.querySelector('#demo-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const workshop = String(values.get('workshop') || '').trim();
    if (!name || !workshop) {
      const field = !name ? form.elements.namedItem('name') : form.elements.namedItem('workshop');
      field.setCustomValidity('Mohon isi nama dengan benar.');
      field.reportValidity();
      field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
      return;
    }
    const type = String(values.get('type') || '').trim();
    const needs = String(values.get('needs') || '').trim();
    const message = [
      'Halo tim BengkelPro, saya tertarik untuk konsultasi dan menjadwalkan demo.',
      '',
      `Nama: ${name}`,
      `Nama bengkel: ${workshop}`,
      `Jenis bengkel: ${type}`,
      ...(needs ? [`Kebutuhan: ${needs}`] : []),
      '',
      'Mohon informasi fitur, penawaran harga, dan jadwal demo yang tersedia. Terima kasih.'
    ].join('\n');
    const url = whatsappUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    status.replaceChildren(document.createTextNode('Pesan Anda siap ditinjau di WhatsApp. Belum ada pesan yang dikirim otomatis. '));
    const fallback = document.createElement('a');
    fallback.href = url;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'Jika WhatsApp belum terbuka, klik di sini.';
    status.append(fallback);
    status.hidden = false;
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
