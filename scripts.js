const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p>' +
            '<button  class="waves-effect waves-light btn red delete-button"  data-id="' + item._id + '">Delete</button></p></div>' + // Replace the <a> tag with a <button> for delete
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.subTitle + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });

    $(".delete-button").on("click", function () {
        const itemId = $(this).data("id");
       
        deleteCatById(itemId);
        
      
    });
}


const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.subTitle = $('#subTitle').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCat(formData);
}

function postCat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Added Successfully');
                location.reload();
            }else if (result.statusCode === 400) {
                alert('Image PAth Already Exists');
            }
        }
    });
}

// function deleteCatById(catId) {
    
//     $.ajax({
//         url: '/api/cat/' + catId, 
//         type: 'DELETE',
//         success: (result) => {
           
//             if (result.statusCode === 200) {
//                 alert(' Deleted Successfully');
//                 location.reload();
//             } else {
//                 alert('Failed to delete cat with ID ' + catId);
//             }
//         }
//     });
// }

function deleteCatById(catId) {
    $.ajax({
        url: '/api/cat/' + catId,
        type: 'DELETE',
        success: (result) => {
            if (result.statusCode === 200) {
                alert('Deleted Successfully');
                location.reload();
            } else if (result.statusCode === 404) {
                alert('Cat not found');
            } else {
                alert('Failed to delete cat with ID ' + catId);
            }
        },
        error: (xhr, status, error) => {
            console.error(error);
            alert('Failed to delete cat with ID ' + catId);
        }
    });
}



function getAllCats() {
    $.get('/api/cat', (result) => {
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    });
}

let socket = io();
socket.on('number', (msg) => {
    console.log('Random Number: ' + msg);
});

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });

    $('#formDelete').click(() => {
        deleteLastCat();
    });

    $('.modal').modal();
    getAllCats();
    console.log('ready');
});
