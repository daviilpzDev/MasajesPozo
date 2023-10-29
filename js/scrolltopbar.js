window.addEventListener('scroll', function() {
  var header = document.getElementById('topbar');
  var usermenu = document.getElementById('right-menu');
  var scrollPosition = window.scrollY;
  if (scrollPosition > 0) {
    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.5)';
    header.style.backgroundColor = 'var(--bar-color)';
    usermenu.style.backgroundColor = 'var(--bar-color)';
  } else {
    header.style.boxShadow = 'none';
    header.style.backgroundColor = 'var(--background-color)';
    usermenu.style.backgroundColor = 'var(--background-color)';
  }
});
