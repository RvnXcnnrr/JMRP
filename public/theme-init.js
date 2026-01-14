(function () {
  try {
    var saved = localStorage.getItem('theme')
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    var theme = saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  } catch (e) {
    // no-op
  }
})()
