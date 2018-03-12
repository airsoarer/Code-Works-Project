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
    var rotateNum = 0;
    var items = 0;

function init(){
    firebase.initializeApp(config);
    $.getJSON("https://api.trello.com/1/boards/6PVLjz20/?key=ad18609bec500062f9944b092d1601de&token=8a16dca9b23c590fdd6819d5b3123a3656eec64fba10bafd5f84f9cc44369b48&cards=all", function(results){
        for(var i = 0; i < results.cards.length; i++){
            items++;
            var id = results.cards[i].id;
            var due = results.cards[i].due;
            if(due === null){
                due = "No Due Date Given in Trello";
            }else{
                due = due.split("-");
                var dueTwo = due[2];
                dueTwo = String(dueTwo);
                dueTwo = dueTwo.split("T");
                due = due[1] + "/" + dueTwo[0] + "/" + due[0];
            }
            var apiName = results.cards[i].name;
            var desc = results.cards[i].desc;

            //Create div for project
            var projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.classList.add("row");
            projectDiv.classList.add("rotate" + i);
            projectDiv.id = id + "div";

            //Create div for information except the Project Name
            var projectInfoDiv = document.createElement("div");
            projectInfoDiv.classList.add("col.s12");
            projectInfoDiv.classList.add("extraInfoDisplay");
            projectInfoDiv.id = id + "extraInfoDiv";

            //Div for timeline Bar
            var timelineDiv = document.createElement("div");
            timelineDiv.classList.add("row");
            timelineDiv.id = id + "timelineBar";

            //Div for dates (above progress bar)
            var datesDiv = document.createElement("div");
            datesDiv.classList.add("row");
            datesDiv.id = id + "datesDiv";
            timelineDiv.appendChild(datesDiv);

            //End Date Div (above progress bar)
            var end = document.createElement("div");
            end.className = "col s6";
            $(end).css("float", "right");
            datesDiv.appendChild(end);

            //End date (above progress bar)
            var endTxt = document.createElement("h4");
            endTxt.className = "endTxt";
            endTxt.textContent = due;
            $(endTxt).css("float", "right");
            end.appendChild(endTxt);

            //Project Name Div
            var name = document.createElement("div");
            name.className = "name";

            //Project dates div (In general information)
            var dates = document.createElement("div");
            dates.classList.add("row");
            dates.classList.add("datesHome");

            //Project start date div (In general information)
            var generalStart = document.createElement("div");
            generalStart.classList.add("col.s6");
            var startH4 = document.createElement("h4");
            startH4.textContent = "Start Date: ";
            $(startH4).css("color", "#474b4f");
            $(startH4).css("font-weight", "bold");
            generalStart.appendChild(startH4);
            dates.appendChild(generalStart);
            
            //Project end date div (In general information)
            var generalEnd = document.createElement("div");
            generalEnd.classList.add("col.s6");
            var endH4 = document.createElement("h4");
            endH4.textContent = "End Date: ";
            $(endH4).css("color", "#474b4f");
            $(endH4).css("font-weight", "bold");
            generalEnd.appendChild(endH4);
            dates.appendChild(generalEnd);

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
            projectName.textContent = apiName;
            $(projectName).css("color", "#86c232");
            $(projectName).css("font-weight", "bold");
            name.appendChild(projectName);

            //Change info Button Element
            var button = document.createElement("button");
            button.textContent = "Change Data";
            button.className = "col s4 offset-s4";
            button.classList.add("changeData");
            button.id = id + "button";

            //Project End Date Element
            var projectEnd = document.createElement("h5");
            projectEnd.textContent = due;
            projectEnd.className = "col s6";
            generalEnd.appendChild(projectEnd);

            //Project Description Div
            var h4 = document.createElement("h4");
            h4.textContent = "Description:";
            $(h4).css("color", "#474b4f")
            $(h4).css("font-weight", "bold");
            var projectDescription = document.createElement("h5");
            if(desc === ""){
                projectDescription.textContent = "No Description"
            }else{
                projectDescription.textContent = desc;
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
            $(document.body).on('click','.changeData', changeData);
            $(document.body).on('click', '#toggleUnfinished', toggleUnfinished);
            $(document.body).on('click', '#toggleFinished', toggleFinished)
            developers(people, results);
            function developers(people, results){
                var cardID = results.cards[i].shortLink;
                $.getJSON("https://api.trello.com/1/cards/" + cardID + "/members?key=ad18609bec500062f9944b092d1601de&token=8a16dca9b23c590fdd6819d5b3123a3656eec64fba10bafd5f84f9cc44369b48&cards=all", function(results){
                    //Contributors Element 
                    var h2 = document.createElement("h4");
                    h2.textContent = "Developers:";
                    $(h2).css("color", "#474b4f")
                    $(h2).css("font-weight", "bold");
                    var projectContributorsList = document.createElement('ul');
                    for(var i = 0; i < results.length; i++){
                        var contributors = results[i].fullName;
                        var item = document.createElement("li");
                        item.textContent = contributors;
                        projectContributorsList.appendChild(item);
                    }
                    $(people).append(h2);
                    $(people).append(projectContributorsList);
                }); 
                startAndPercent(id, datesDiv, timelineDiv, dates, projectDiv, generalStart);
            }
        }
    });
}

function startAndPercent(id, datesDiv, timelineDiv, dates, projectDiv, generalStart){
    var ref = firebase.database().ref("Projects/" + id);
    ref.once("value", function(snapshot){
        var data = snapshot.val();
        var startDate = data.StartDate;
        if(startDate === ""){
            startDate = "NO DATA GIVEN";
        }else{
            startDate = startDate.split("-");
            startDate = startDate[1] + "/" + startDate[2] + "/" + startDate[0];
        }
        var percent = data.Percent;
        if(percent === ""){
            percent = "NO DATA GIVEN";
        }
        //Start Date Div
        var start = document.createElement("div");
        start.classList.add("col.s6");
        start.id = id + "startDate";
        $(start).css("float", "left");
        if(startDate === "NO DATA GIVEN"){
            $(start).css("background-color", "#86c232");
        }
        datesDiv.prepend(start);

        //Start date
        var startTxt = document.createElement("h4");
        startTxt.className = "startTxt";
        startTxt.textContent = startDate;
        $(start).append(startTxt);

        //Project Start Date Element
        var projectStart = document.createElement("h5");
        projectStart.textContent = startDate;
        projectStart.className = "col s6";
        if(startDate === "NO DATA GIVEN"){
            $(dates).css("background-color", "#86c232");
        }
        generalStart.appendChild(projectStart);

        //timeline hr
        var hr = document.createElement("hr");
        if(percent === "NO DATA GIVEN"){
            hr.textContent = "NO DATA GIVEN";
        }else{
            hr.textContent = percent + "% Complete";
        }   
        $(hr).css("font-size", "18px");
        $(hr).css("height", "30px");
        $(hr).css("width", percent + "%");
        $(hr).css("float", "left");
        $(hr).css("background-color", "#474b4f");
        if(percent === "NO DATA GIVEN"){
            $(hr).css("background-color", "#86c232");
        }
        timelineDiv.appendChild(hr);
        if(percent === "100"){
            document.getElementById('finished').appendChild(projectDiv);
        }else{
            document.getElementById('projects').appendChild(projectDiv);
        }
    });
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

setInterval(function(){
    if(rotateNum >= items){
        console.log(rotateNum);
        rotateNum = 0;
    }
    $(".rotate" + rotateNum)[0].scrollIntoView({
        behavior: 'smooth'
    });
    rotateNum++;
}, 5000);
})();