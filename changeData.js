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
    console.log(uid);

function init(){
    firebase.initializeApp(config);
    //Get firebase ref to show data to be changed
<<<<<<< HEAD
    // var ref = firebase.database().ref('Projects/' + uid);
    // ref.once('value', function(snapshot){
    //     var data = snapshot.val();  
    //     var startDate = data.startDate;
    //     var percent = data.Percent;

    //     if(startDate === ""){
    //         startDate = "NO START DATE";
    //     }

    //     if(percent === ""){
    //         percent = "NO PERCENTAGE";
    //     }

    //     //Project Start Date Element
    //     var startDate = document.createElement("h4");
    //     startDate.textContent = "Start Date: " + startDate; 
    //     $('.startDateDiv').prepend(startDate);

    //     //Project Percentage Element
    //     var percentage = document.createElement("h4");
    //     percentage.textContent = "Percentage: " + percent;
    //     $('.percentageDiv').prepend(percentage);
    // });
=======
    var ref = firebase.database().ref('Projects/' + uid);
    ref.once('value', function(snapshot){
        var data = snapshot.val();  
        
        // //Project Name Element
        // var name = document.createElement("h4");
        // name.textContent = "Project Name: " + data.ProjectName;
        // $('.nameDiv').prepend(name);

        //Project Start Date Element
        var startDate = document.createElement("h4");
        startDate.textContent = "Start Date: " + data.StartDate; 
        $('.startDateDiv').prepend(startDate);

        /*
        //Project End Date Element
        var endDate = document.createElement("h4");
        endDate.textContent = "End Date: " + data.EndDate;
        $('.endDateDiv').prepend(endDate);
        */

        /*
        //Project Contributors Element
        var contributors = document.createElement("h4");
        contributors.textContent = "Contributors:  " + data.Contributors;
        $('.contributorsDiv').prepend(contributors);
        */

        //Project Percentage Element
        var percentage = document.createElement("h4");
        percentage.textContent = "Percentage: " + data.Percentage;
        $('.percentageDiv').prepend(percentage);

        /*
        //Project Description Element 
        var description = document.createElement("h4");
        description.textContent = "Description: " + data.Description;
        $('.descriptionDiv').prepend(description);
        */
    });
>>>>>>> d83fb8669be1d94132dcb53013d7ede01261297a
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
<<<<<<< HEAD
        StartDate:startDate,
        Percent:percentage,
=======
        //ProjectName:name,
        StartDate:startDate,
        //EndDate:endDate,
        //Contributors:contributors,
        Percentage:percentage,
        //Description:description,
>>>>>>> d83fb8669be1d94132dcb53013d7ede01261297a
    }

    //Pull data from data from Firebase for empty input fields
    ref.once('value', function(snapshot){
        var data = snapshot.val();
        console.log(data);

        //To check to see if input fields our empty
        //If empty, fill with respective key info pair with current data

        if(startDate === ""){
            startDate = data.StartDate;
            items.StartDate = startDate;
        }

        if(percentage === ""){
            percentage = data.Percentage;
            items.Percent = percentage;
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