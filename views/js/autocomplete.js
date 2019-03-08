$('document').ready(function() {
  $('.autocomplete-input').keyup(function(e) {
    $.ajax({
      url: '/autocomplete',
      method: 'post',
      data: { value: e.target.value, item: $('.autocomplete-select').val() },
      success: function(result) {
        var res = result;
        var ul = $('.autocomplete-item>ul')[0];
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
        if (res != '') {
          res.forEach(element => {
            let li = document.createElement('li');
            let link = document.createElement('a');
            let href = document.createAttribute('href');
            let txt = document.createTextNode(
              element[$('.autocomplete-select').val()]
            );
            // href.value = '/profileview/' + element.Eid;
            // href.value = '#';
            console.log($('.autocomplete-select').val());

            if ($('.autocomplete-select').val() == 'pname') {
              href.value = '#';
            } else if (
              $('.autocomplete-select').val() == 'username' ||
              $('.autocomplete-select') == 'email'
            ) {
              href.value = '/profileview/' + element.Eid;
            }

            link.setAttributeNode(href);
            link.appendChild(txt);
            li.appendChild(link);
            ul.appendChild(li);
          });
        }
      }
    });
  });
});
