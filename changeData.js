(function(){
    $(document).ready(init);
    var config = {
        apiKey: "AIzaSyCKxTNjiXp5A878Wjw7LAqsRg8TeQooQUM",
        authDomain: "undecided-9c63e.firebaseapp.com",
        databaseURL: "https://undecided-9c63e.firebaseio.com",
        projectId: "undecided-9c63e",
        storageBucket: "undecided-9c63e.appspot.com",
        messagingSenderId: "955262371102"
    };
    var location = window.location.href;
    var uid = location.split("room=%20");
    uid = uid[1];

function init(){
    firebase.initializeApp(config);
    $(document.body).on('click', '.change', changeData);
}

function changeData(){
    //Get Firebase Ref
    var ref = firebase.database().ref('Projects/' + uid);

    //Get new Data
    var startDate = $('#startDate').val();
    if(startDate === ""){
        startDate = "";
    }

    var percentage = $('#percent').val();
    if(percentage === ""){
        percentage = "";
    }

    //Create Object with new item upload
    var items = {
        StartDate:startDate,
        Percent:percentage,
    }

    //Pull data from data from Firebase for empty input fields
    ref.once('value', function(snapshot){
        var data = snapshot.val();

        //To check to see if input fields our empty
        //If empty, fill with respective key info pair with current data

        if(startDate === ""){
            items.StartDate = data.StartDate;
        }

        if(percentage === ""){
            items.Percent = data.Percent;
        }
    });
    setTimeout(function(){
        update(ref, items);
    }, 500);
}

function update(ref, items){
     //Update Data
    firebase.database().ref('Projects/' + uid).set(items);
    // location.replace("index.html");
    alert("Your data has been changed");
}
})();