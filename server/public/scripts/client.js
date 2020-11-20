console.log('js');

$(document).ready(function () { // readyNow function
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#viewKoalas').on('click', '.deleteButton', deleteButton);
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object

    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };

    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function deleteButton() {
  console.log('In the delete function');
  let koala = $(this).closest('tr').data('koala');
  // console logging selected book
  console.log('Koala selected is:', koala);
  // this ajax call deletes the data we pass in to delete on ${book.id}
  $.ajax({
      method: 'DELETE',
      url: `/koalas/${koala.id}`
    })
    .then(function (response) {
      saveKoala();
    })
    .catch(function (error) {
      console.log('Error', error);
      alert('Try again.');
    })
}


function checkKoala() {
  console.log('Checking out Koala');
  let koala = $(this).closest('tr').data('koala');
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koala.id}`,
    data: {
      status: koala.transfer
    }
  }).then(function (response) {
    refreshBooks();
  }).catch((error) => {
    console.log('error from db', error);
    res.sendStatus(500);
  })
}


// function to get all koalas to render to page 
function getKoalas() {
  console.log('in getKoalas');
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('Got a new koala', response);
    renderKoala(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
} // end getKoalas



function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
  }).then(function (response) {
    console.log('Response from server:', response);
    getKoalas();
  }).catch(function (error) {
    console.log('Error in POST:', error)
  });
}



function renderKoala(koalas) {
  $('#viewKoalas').empty(); 
  for (let i = 0; i < koalas.length; i++) {
    let koala = koalas[i];
    console.log('Rendering new koala onto DOM', koala);
    // for each new koala, append a new row to our table
    let $tr = $(`<tr></tr>`);
    $tr.data('koala', koala);
    $tr.append(`<td>${koala.name}</td>`);
    $tr.append(`<td>${koala.gender}</td>`);
    $tr.append(`<td>${koala.age}</td>`);
    $tr.append(`<td>${koala.ready_to_transfer}</td>`);
    $tr.append(`<td>${koala.notes}</td>`);
    // conditional for adding button or not
      if (koala.status === 'Y') {
        $tr.append(`<td><button class="btn-read">Mark as Ready</button></td>`);
      } else {
        $tr.append(`<td><button class="btn-read">Not Ready to Transfer</button></td>`);
      }
    $('#viewKoalas').append($tr);
  }
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* NOTES FOR GROUP 4 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 

KEY NOTES:
url: /koala
renderKoala(); must be called inside function refreshBooks() after 
  console log of .tehn


// this function will get all koalas from server and render to page
function getKoalas() {
  $.ajax({
    type: 'GET',
    url: '/koala'
  }).then(function (response) {
    console.log(response);
    renderKoala(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
}


// this function will create a new object, add koala to database
function saveKoala(newKoala) {
    $.ajax({
      type: 'POST',
      url: '/koala',
      data: newKoala,
    }).then(function (response) {
      console.log('Response from server.', response);
      getKoalas(); // this will update koala list upon page refresh
    }).catch(function (error) {
      console.log('Error in POST', error)
      alert('Unable to add koala at this time. Please try again later.');
    });
    }
}







function readBook() {
  console.log('read a book');
  let book = $(this).closest('tr').data('book');
  console.log(`changing status of ${book.title}...`);
  $.ajax({
    method: 'PUT',
    url: `/books/${book.id}`,
    data: {
      status: book.status
    }
  }).then(function (response) {
    refreshBooks();
  }).catch((error) => {
    console.log('error from db', error);
    res.sendStatus(500);
  })
}



function removeKoala() {
  console.log('Removing a koala....');
  let koala = $(this).closest('tr').data('book');
  console.log('book selected is:', book);
  // 
  $(this).closest('tr').empty();
  // this ajax call deletes whatever we pass in to delete
  // on ${koala.id}
  $.ajax({
      method: 'DELETE',
      url: `/koalas/${koala.id}`
    })
    .then(function (response) {
      refreshBooks();
    })
    .catch(function (error) {
      console.log('Error', error);
      alert('Try again.');
    })
  }






*/