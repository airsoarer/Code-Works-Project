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
    var uid = location.split("%20");
    uid = uid[1];

function init(){
    firebase.initializeApp(config);
    //Get firebase ref to show data to be changed
    var ref = firebase.database().ref('Projects/' + uid);
    ref.once('value', function(snapshot){
        var data = snapshot.val();  
        
        //Project Name Element
        var name = document.createElement("h4");
        name.textContent = "Project Name: " + data.ProjectName;
        $('.nameDiv').prepend(name);

        //Project Start Date Element
        var startDate = document.createElement("h4");
        startDate.textContent = "Start Date: " + data.StartDate; 
        $('.startDateDiv').prepend(startDate);

        //Project End Date Element
        var endDate = document.createElement("h4");
        endDate.textContent = "End Date: " + data.EndDate;
        $('.endDateDiv').prepend(endDate);

        //Project Contributors Element
        var contributors = document.createElement("h4");
        contributors.textContent = "Contributors:  " + data.Contributors;
        $('.contributorsDiv').prepend(contributors);

        //Project Percentage Element
        var percentage = document.createElement("h4");
        percentage.textContent = "Percentage: " + data.Percentage;
        $('.percentageDiv').prepend(percentage);

        //Project Description Element 
        var description = document.createElement("h4");
        description.textContent = "Description: " + data.Description;
        $('.descriptionDiv').prepend(description);
    });
    $(document.body).on('click', '.change', changeData);
}

function changeData(){
    //Get Firebase Ref
    var ref = firebase.database().ref('Projects/' + uid);

    //Get new Data
    var name = $('#name').val();
    var startDate = $('#startDate').val();
    console.log(startDate);
    var endDate = $('#endDate').val();
    var contributors = $('#contributors').val();
    if(contributors === ""){
        contributors = [];
    }else{
        contributors = contributors.split(",");
    }
    var percentage = $('#percent').val();
    var description = $('#description').val();

    //Create Object with new item upload
    var items = {
        ProjectName:name,
        StartDate:startDate,
        EndDate:endDate,
        Contributors:contributors,
        Percentage:percentage,
        Description:description,
    }

    //Pull data from data from Firebase for empty input fields
    ref.once('value', function(snapshot){
        var data = snapshot.val();

        //To check to see if input fields our empty
        //If empty, fill with respective key info pair with current data
        if(name === ""){
            name = data.ProjectName;
            items.ProjectName = name;
        }

        if(startDate === ""){
            startDate = data.StartDate;
            items.StartDate = startDate;
        }

        if(endDate === ""){
            endDate = data.EndDate;
            items.EndDate = endDate;
        }

        if(contributors.length === 0){
            contributors = data.Contributors;
            items.Contributors = contributors;
        }

        if(percentage === ""){
            percentage = data.Percentage;
            items.Percentage = percentage;
        }

        if(description === ""){
            description = data.Description;
            items.Description = description;
        }
    });
    setTimeout(function(){
        update(ref, items);
    }, 500);
}

function update(ref, items){
     //Update Data
    firebase.database().ref('Projects/' + uid).update(items);
    // location.replace("index.html");
    alert("Your data has been changed");
}
})();