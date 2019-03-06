function disable(b) {
  $('#un').prop('disabled', b);
  $('#resetpass').prop('disabled', b);
}

function resetPassword() {
  let un = $('#un-reset').val();
  if (un) {
    disable(true);
    axios.post('https://memvers-api.sparcs.org/api/reset', { un: un }, {withCredentials: true});
    window.location.href = '/login';
  }
}

$(document).ready(() => {
  $('#resetpass').click(resetPassword);
  $('#un-reset').keyup(e => {
    if (e.which == 13) resetPassword();
  });
});
