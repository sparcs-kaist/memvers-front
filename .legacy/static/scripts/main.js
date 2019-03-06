$(document).ready(() => {
  axios.get('https://memvers-api.sparcs.org/api/un', {withCredentials: true})
  .then(res => {
    if (res.data.expired) window.location.href = '/login';
    else if (res.data.un === 'wheel') {
      $('.a-wheel').css('display', 'flex');
      $('.a-non-wheel').css('display', 'none');
    }
  })
  .catch(err => {
    window.location.href = '/';
  });
});

function logout() {
  axios.get('https://memvers-api.sparcs.org/api/logout', {withCredentials: true});
  window.location.href = '/login';
}
