(function(){   

    var config = {
        apiKey: "AIzaSyCDkeeVzvndeSC6KZwenYcuVioJZ_glMJI",
        authDomain: "songtogo-f2eae.firebaseapp.com",
        databaseURL: "https://songtogo-f2eae.firebaseio.com",
        storageBucket: "songtogo-f2eae.appspot.com",
    };
    firebase.initializeApp(config);
    
    const mbtnSignUp = document.getElementById('btnSignUp');
    
    var databaseRef = firebase.database().ref();
    var mForm = document.getElementById('account_form');
  

mbtnSignUp.addEventListener('click', e=>{

    var mEmail = document.getElementById('txtEmail').value;
    var mPass = document.getElementById('txtPass').value;
    var mKtvName = document.getElementById('txtKtvName').value;
    
    if(!mEmail || !mPass)
    {
      return alert('email and password required');
    }

    else
    {
      firebase.auth().createUserWithEmailAndPassword(mEmail, mPass).catch(function(error) {
       
        console.log('register error', error);
        if(error.code === 'auth/email-already-in-use')
        {
          alert('Email Address is already in use');
          mForm.reset();
        }
      });

    }
     var mAccount = 
        { 
          email: mEmail, 
          pass: mPass,
          ktv: mKtvName 
        };

        var databaseAccount = databaseRef.child('KTV-Owner');
            databaseAccount.push().set(mAccount);

        var mKTV =
        {
          KTV: mKtvName
        };

        var databaseKtv = databaseRef.child('KTV-Bar');
            databaseKtv.push().set(mKTV);
 
});

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
}());