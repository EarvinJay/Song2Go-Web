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

        for (var i = 0; i < fileLength; i++) {
            uploadTask = storageRef.child('SongList/' + files[i].name).put(files[i]);
            Songs = files[i].name;
             var mSongs = { Name: Songs, Location: mLocation };
                                    var database = databaseRef.child('SongList');
                                    database.push().set(mSongs);
            
        }

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
                    var downloadURL = uploadTask.snapshot.downloadURL;

                });

                   
    });

}());