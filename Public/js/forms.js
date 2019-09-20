$(document).ready(function() {
    //Over sabi Effect
    $('.registerBtn').click(function() {
      $('.regForm').fadeIn();
    });
    $('.closeBtn').click(function() {
      $('.regForm').fadeOut();
    });
    $('.loginBtn').click(function() {
      $('.loginForm').fadeIn();
    });
    $('.closeLoginBtn').click(function() {
      $('.loginForm').fadeOut();
    });
    //Registration Function
    $('.regSubmitBtn').click(function(event) {
      event.preventDefault();
      const fullname = $('#fullname').val();
      const username = $('#username').val();
      const password = $('#password').val();
      const email = $('#email').val();
      //Check if user input is empty
      if (!fullname || !username || !password || !email) {
        $('.regMessage').html('Kindly fill in all fields');
        return;
      }
      //Make get request to check if the user already exist
      $.ajax({
        method: 'GET',
        url: `http://localhost:3001/users?email=${email}`,
        data: {
          email,
        },
        beforeSend: function() {
          $('.regMessage').html('Loading....');
        },
        success: function(response) {
          if (response.length) {
            $('.regMessage').html('User already exist');
          } else {
            //Submit the user data if the user does not exist
            $.ajax({
              method: 'POST',
              url: 'http://localhost:3001/users',
              data: {
                fullname,
                username,
                email,
                password,
              },
              beforeSend: function() {
                $('.regMessage').html('Loading....');
              },
              success: function() {
                $('.regMessage').html('Registration Successfull');
              },
            });
          }
        },
      });
    });
    //Login Function
    $('.loginSubmitBtn').click(function(event) {
      event.preventDefault();
      const passwordLogin = $('#passwordLogin').val();
      const emailLogin = $('#emailLogin').val();
      if (!passwordLogin || !emailLogin) {
        $('.regMessage').html('Kindly fill in all fields');
        return;
      }
      //Check if the user is in the database
      $.ajax({
        method: 'GET',
        url: `http://localhost:3001/users?email=${emailLogin}&password=${passwordLogin}`,
        data: {
          email: emailLogin,
          password: passwordLogin,
        },
        beforeSend: function() {
          $('.regMessage').html('Loading....');
        },
        success: function(response) {
          if (response.length) {
            $('.regMessage').html('Login sucessful');
            $('.checkLogin').html('You are logged in');
            localStorage.setItem('email', emailLogin);
            //redirect to home page if the login is successfull
            window.location.assign('index.html');
          } else {
            $('.regMessage').html('Username or password Incorrect');
          }
        },
      });
    });
    //Logout Function
    $('.logoutBtn').click(function() {
      //clear the localstorage and redirect to signup page
      localStorage.clear();
      $('.checkLogin').html('Kindly login');
      window.location.assign('signup.html');
    });
    $('#profileButton').click(function(){
        $('.myProfile').fadeToggle();
    })
// profile form delete
$('body').on('click','.deleteBtn',function(e){
  e.preventDefault();
   let id = $(this).val()
   //alert (id)
  $.ajax({
  "url": "http://localhost:3001/Profile/" + id,
  "method": "DELETE",
  data:{id},
 
  success: function(data){
    alert("Record Deleted Successfully")
  },
  error: function (e) {
    alert("",JSON.stringify(e))
  }
  })
});

// for profile table listing
$('#listProfile').click(function(e){
e.preventDefault();
$.ajax({
  method: 'GET',
  url: 'http://localhost:3001/Profile',
  success: function (data) {
    let profileList = ''
    $.each(data, function(i,v){
      profileList += `
      <tr>
      <td>${v.id}</td>
      <td>${v.hotelName}</td>
      <td>${v.contactNumber}</td>
      <td>${v.emailAddress}</td>
      <td>${v.facilitiesAvailable}</td>
      <td>${v.hotelLocation}</td>
     
      <td><button type="button" class="btn btn-danger deleteBtn" value="${v.id}"><i class="fa fa-trash"></i> Delete </button>
      <button type="button" class="btn btn-success edit" value="${v.id}"><i class="fa fa-edit"></i> Edit </button>
      </td>
      </tr>`
    })
    $("#profileHistory").html(profileList);

  }
});
})

// getProfileTable();

    // profile form submit
    $('.profileSubmitBtn').click(function(event){
      event.preventDefault();
      // getting value from the form to database
      const hotelName = $('#hotelName').val();
      const registeredBusinessName = $('#registeredBusinessName').val();
      const hotelManagersName = $('#hotelManagersName').val();
      const contactNumber = $('#contactNumber').val();
      const registrationNumber = $('#registrationNumber').val();
      const emailAddress = $('#emailAddress').val();
      const facilitiesAvailable = $('#facilitiesAvailable').val();
      const hotelLocation = $('#hotelLocation').val();
      const hotelNearestBusStopn = $('#hotelNearestBusStopn').val();
      
      // prevent empty submission
    if(!hotelName || !registeredBusinessName || !hotelManagersName || !contactNumber || !registrationNumber  || !emailAddress || !facilitiesAvailable || !hotelLocation ||!hotelNearestBusStopn ){
      alert("complete all empty fields");
      return false;
    }else{
      // submit profile form
      $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/Profile',
        data: {
          hotelName,
          registeredBusinessName,
          hotelManagersName,
          contactNumber,
          registrationNumber,
          emailAddress,
          facilitiesAvailable,
          hotelLocation,
          hotelNearestBusStopn,
        },
        beforeSend: function(){
          $('.profileMsg').html('Loading....');
        },
        success: function(){
          $('.profileMsg').html('Profile Created');
        },
      });
    }
  });
});
