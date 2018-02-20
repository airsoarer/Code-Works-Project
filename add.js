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

function init(){
    firebase.initializeApp(config);
    $('#submit').on('click', getData);
    $('#contributors').keyup(numberOfPeople);
}

function numberOfPeople(){
    var data = $('#contributors').val();
    data = data.split(",");

    var h4 = document.createElement("h4");
    if(data.length === 1){
        h4.textContent = data.length + " person";
    }else{
        h4.textContent = data.length + " people";
    }

    $('.people').empty();
    $('.people').append(h4);
}

function getData(){
    //Get Data
    var projectName = $('#projectName').val();
    var startDate = $('#startDate').val()
    var endDate = $('#endDate').val();
    var contributors = $('#contributors').val();
    var people = contributors.split(",");
    var percent = $('#percent').val();
    var description = $('#description').val();

    //Get Firebase Ref
    var ref = firebase.database().ref('Projects').push({
        ProjectName:projectName,
        StartDate:startDate,
        EndDate:endDate,
        Contributors:people,
        Percentage:percent,
        Description:description,
    }).then(function(){
        location.replace("index.html");
    });
}
})();