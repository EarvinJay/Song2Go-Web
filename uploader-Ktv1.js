(function()  {


    var config = {
        apiKey: "AIzaSyCDkeeVzvndeSC6KZwenYcuVioJZ_glMJI",
        authDomain: "songtogo-f2eae.firebaseapp.com",
        databaseURL: "https://songtogo-f2eae.firebaseio.com",
        storageBucket: "songtogo-f2eae.appspot.com",
    };
    firebase.initializeApp(config);
    
    var databaseRef = firebase.database().ref();
    var storageRef = firebase.storage().ref();
    


    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');
    var songRetrieve = document.getElementById('SongRetriever'); //Song Retriever
    var mLocation = "gs://songtogo-f2eae.appspot.com/SongList/";


    fileButton.addEventListener('change', function (e) {
        var fileLength = e.target.files.length;
        var files = []
        var fileNames = []

        for (var i = 0; i < fileLength; i++) {
            files.push(e.target.files[i]);
        }

        console.log(files.length);

        var uploadTask;

        for (var o = 0; o < fileLength; o++) {
            uploadTask = storageRef.child('SongList-Ktv1/' + files[o].name).put(files[o]);
                 Songs = files[o].name; // dili ni pwede butngnan og var ang Songs?
             var mSongs = { Name: Songs, Location: mLocation };
                                    var database = databaseRef.child('SongList-Ktv1').child(files[o].name);
                                    database.push().set(mSongs);
          
          // mao ni ang pag retrieve gkan firebase
             
        }

           // databaseRef.on('child_added', function(snapshot){
                
           //      var mSongs = snapshot.val();
           //          var GetSongs = mSongs;
           //      console.log(GetSongs);
           //    });
          
             // songRetrieve = GetSong; 
      
        uploadTask.on('state_changed',
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    uploader.value = progress;
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            
                            break;
                       
                    }
                }, function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                }, function () {
                    // Upload completed successfully, now we can get the download URL
                    var downloadURL = uploadTask.snapshot.downloadURL; // unsaon ni pag apil sa loop? dli siya pareha sa android nga pwede ra tawgon ang variable sa ubos padung sa taas

                });

                   
    });

}());