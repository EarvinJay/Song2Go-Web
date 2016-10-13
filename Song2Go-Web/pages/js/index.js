(function(){   

    var config = {
        apiKey: "AIzaSyCDkeeVzvndeSC6KZwenYcuVioJZ_glMJI",
        authDomain: "songtogo-f2eae.firebaseapp.com",
        databaseURL: "https://songtogo-f2eae.firebaseio.com",
        storageBucket: "songtogo-f2eae.appspot.com",
    };
    firebase.initializeApp(config);
    
    var ShowSongs;
    var Songs;
    var databaseRef = firebase.database().ref('SongList-Ktv1');


   databaseRef.on('child_added', function(snapshot){
                
               ShowSongs = snapshot.val();
                var increment = 0;
                
                var convert;
               for(var i = 0; i<ShowSongs.length; i++)
               {
                   increment + 1;
                   increment.toString();
               }
                
                console.log(increment);
                var mContent = document.createTextNode(increment);
                var mShowSongs = document.getElementById("OwnedSongs").appendChild(mContent);
                 
    });

}());