window.onload = function() {
  document.getElementById('exitBtn').addEventListener('click', handleExit, false);

  function handleExit() {
    window.location.href = 'https://broadcast-it.herokuapp.com';
  }
}