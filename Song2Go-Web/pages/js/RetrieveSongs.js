(function(){   

    var config = {
        apiKey: "AIzaSyCDkeeVzvndeSC6KZwenYcuVioJZ_glMJI",
        authDomain: "songtogo-f2eae.firebaseapp.com",
        databaseURL: "https://songtogo-f2eae.firebaseio.com",
        storageBucket: "songtogo-f2eae.appspot.com",
    };
    firebase.initializeApp(config);
    
  
    var mRetrieveSongs;
    var mAccounts;
    var accountRef = firebase.database().ref('KTV-Owner');
    accountRef.on('child_added', function(snapshot){

            mAccounts = snapshot.val();
            console.log(mAccounts);
    });
   
    var songsRef = firebase.database().ref('SongList-Ktv1');
   songsRef.on('child_added', function(snapshot){
                
               mRetrieveSongs  = snapshot.val();
                 $("#dataTables").append(
                  "<tr>"
                    +"<td>"+mRetrieveSongs.Name+"</td>"
                    +"<td>"+mRetrieveSongs.Location+"</td>"
                    +"<td>"+'<input type="button" value="Add" id = "add">'
                    +'<input type="button" value="Delete" id = "delete">'
                    +"</td>"
                +"</tr>" )
   });

}());