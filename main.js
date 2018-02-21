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
    var finishedClickCount = 1;
    var unfinishedClickCount = 1;

function init(){
    firebase.initializeApp(config);
    //Get reference to Firebase
    var ref = firebase.database().ref('Projects');
    ref.on('child_added', function(snapshot){
        var data = snapshot.val();
        var key = snapshot.key;

        //Create div for info
        var projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.classList.add("col.s12");
        projectDiv.id = key + "div";

        //Create div for information except the Project Name
        var projectInfoDiv = document.createElement("div");
        projectInfoDiv.className = "extraInfoDisplay";
        projectInfoDiv.id = key + "extraInfoDiv";

        //Div for timeline Bar
        var timelineDiv = document.createElement("div");
        timelineDiv.classList.add("row");
        timelineDiv.classList.add();
        timelineDiv.id = key + "timelineBar";

        //Div for dates
        var datesDiv = document.createElement("div");
        datesDiv.classList.add("row");
        datesDiv.id = key + "datesDiv";
        timelineDiv.appendChild(datesDiv);

        //Start Date Div
        var start = document.createElement("div");
        start.classList.add("col.s6");
        start.id = key + "startDate";
        $(start).css("float", "left");
        datesDiv.appendChild(start);

        //Start date
        var startTxt = document.createElement("h4");
        startTxt.className = "startTxt";
        startTxt.textContent = data.StartDate;
        start.appendChild(startTxt);

        //End Date Div
        var end = document.createElement("div");
        end.className = "col s6";
        $(end).css("float", "right");
        datesDiv.appendChild(end);

        //End date
        var endTxt = document.createElement("h4");
        endTxt.className = "endTxt";
        endTxt.textContent = data.EndDate;
        $(endTxt).css("float", "right");
        end.appendChild(endTxt);

        //timeline hr
        var hr = document.createElement("hr");
        hr.textContent = data.Percentage + " Complete";
        $(hr).css("font-size", "18px");
        $(hr).css("height", "30px");
        $(hr).css("width", data.Percentage);
        $(hr).css("float", "left");
        $(hr).css("background-color", "purple");
        timelineDiv.appendChild(hr);

        //Project Name Div
        var name = document.createElement("div");
        name.className = "name";

        //Project dates div
        var dates = document.createElement("div");
        dates.className = "datesHome";

        //Description and Contributors Div
        var div = document.createElement("div");

        //Contributors Div
        var people = document.createElement("div");
        people.classList.add("col.s6");
        people.classList.add("people")
        div.appendChild(people);

        //Description Div
        var description = document.createElement("div");
        description.classList.add("col.s6");
        description.classList.add("descript");
        div.appendChild(description);

        //Project Name Element 
        var projectName = document.createElement("h3");
        projectName.textContent = data.ProjectName;
        name.appendChild(projectName);

        //Change info Button Element
        var button = document.createElement("button");
        button.textContent = "Change Data";
        button.className = "col s4 offset-s4";
        button.classList.add("changeData");
        button.id = key + "button";

        //Project Start Date Element
        var projectStart = document.createElement("h5");
        projectStart.textContent = "Start Date: "  + data.StartDate;
        projectStart.className = "col s6";
        dates.appendChild(projectStart);

        //Project End Date Element
        var projectEnd = document.createElement("h5");
        projectEnd.textContent = "End Date: " + data.EndDate;
        projectEnd.className = "col s6";
        dates.appendChild(projectEnd);

        //Contributors Element (For loop to loop through array of names gotten from Firebase)
        var h2 = document.createElement("h4");
        h2.textContent = "Developers:";
        $(h2).css("font-weight", "bold");
        var projectContributorsList = document.createElement('ul');
        var contributors = data.Contributors;
        for(var i = 0; i < contributors.length; i++){
            var item = document.createElement("li");
            item.textContent = contributors[i];
            projectContributorsList.appendChild(item);
        }
        people.appendChild(h2);
        people.appendChild(projectContributorsList);

        //Project Description Div
        var h4 = document.createElement("h4");
        h4.textContent = "Description:";
        $(h4).css("font-weight", "bold");
        var projectDescription = document.createElement("h5");
        if(data.Description === ""){
            projectDescription.textContent = "No Description"
        }else{
            projectDescription.textContent = data.Description;
        }
        $(description).append(h4);
        $(description).append(projectDescription);

        //Append Elements to their respective Divs
        $(projectDiv).append(name);
        $(projectInfoDiv).append(dates);
        $(projectInfoDiv).append(div);
        $(projectInfoDiv).append(timelineDiv);
        $(projectDiv).append(projectInfoDiv);
        projectDiv.appendChild(button);
        if(data.Percentage === "100%"){
            document.getElementById('finished').appendChild(projectDiv);
        }else{
            document.getElementById('projects').appendChild(projectDiv);
        }
    });
    $(document.body).on('click','.changeData', changeData);
    $(document.body).on('click', '#toggleUnfinished', toggleUnfinished);
    $(document.body).on('click', '#toggleFinished', toggleFinished)
}

function changeData(){
    var id = $(this).attr("id");
    id = id.split("button");
    id = id[0];
    location.replace("changeData.html?room= " + id);
}

function toggleFinished(){
    finishedClickCount++;
    if(finishedClickCount % 2 === 0){
        $('#finished').hide();
    }else{
        $('#finished').show();
    }
}

function toggleUnfinished(){
    unfinishedClickCount++;
    if(unfinishedClickCount % 2 === 0){
        $('#projects').hide();
    }else{
        $('#projects').show();
    }
}
})();