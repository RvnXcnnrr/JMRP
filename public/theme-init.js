(function () {
  try {
    var saved = localStorage.getItem('theme')
    // Portfolio requirement: dark mode is the default unless the user chose otherwise.
    var theme = saved === 'light' || saved === 'dark' ? saved : 'dark'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  } catch (e) {
    // no-op
  }
})()
