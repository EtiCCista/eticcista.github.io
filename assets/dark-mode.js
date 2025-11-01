(() => {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon'); // now a span with emoji
  const storageKey = 'eticcista-theme';

  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      btn.setAttribute('aria-pressed','true');
      // update emoji and accessible label
      if(icon){
        icon.textContent = '🌙';
        icon.setAttribute('aria-label','Alternar modo: atualmente modo escuro. Clique para alternar para modo claro.');
      }
    } else {
      root.setAttribute('data-theme','light');
      btn.setAttribute('aria-pressed','false');
      if(icon){
        icon.textContent = '🌞';
        icon.setAttribute('aria-label','Alternar modo: atualmente modo claro. Clique para alternar para modo escuro.');
      }
    }
  }

  function init(){
    // Preferência salva ou preferência do sistema
    const saved = localStorage.getItem(storageKey);
    const prefer = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(prefer);

    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
