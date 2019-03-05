function disable(b) {
  $('#name').prop('disabled', b);
  $('#desc').prop('disabled', b);
  $('#create').prop('disabled', b);
}

function isLower(ch) { return 'a' <= ch && ch <= 'z'; }
function isDigit(ch) { return '0' <= ch && ch <= '9'; }

function _acceptable(ch) {
  return isLower(ch) || isDigit(ch) || ch === '-';
}

function acceptable(str) {
  for (var i = 0; i < str.length; i++)
    if (!_acceptable(str[i])) return false;
  return true;
}

function create() {
  let name = $('#name').val();
  let desc = $('#desc').val();
  if (name && desc) {
    disable(true);
    if (acceptable(name)) {
      axios.post('/api/create', { name: name, desc: desc })
      .then(res => {
        if (res.data.expired) window.location.href = '/login';
        else if (res.data.result) {
          $('#h-alert').text('Creation succeeded :)');
          $('#close').click(() => { window.location.href = '/'; });
          $('#modal-alert').modal('show');
        } else {
          $('#h-alert').text('Existing name :(');
          $('#modal-alert').modal('show');
          $('#name').val('');
        }
      })
      .catch(err => {
        $('#h-alert').text('Network error :(');
        $('#modal-alert').modal('show');
      });
    } else {
      $('#h-alert').text('Use a-z, 0-9, or -');
      $('#modal-alert').modal('show');
    }
  }
}

$(document).ready(() => {
  checkSession();
  $('#create').click(create);
  $('#name').keyup(e => {
    if (e.which == 13) create();
  });
  $('#desc').keyup(e => {
    if (e.which == 13) create();
  });
  $('#close').click(() => { disable(false); });
});
