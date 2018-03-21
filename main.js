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
    var rangeClickCount = 0;
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
            endTxt.classList.add("txt");
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
            startH4.classList.add("txt");
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
            endH4.classList.add("txt");
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
            projectName.classList.add("txt");
            $(projectName).css("color", "#86c232");
            $(projectName).css("font-weight", "bold");
            name.appendChild(projectName);

            //Change info Button Element
            // var button = document.createElement("button");
            // button.textContent = "Change Data";
            // button.className = "col s4 offset-s4";
            // button.classList.add("changeData");
            // button.id = id + "button";

            //Project End Date Element
            var projectEnd = document.createElement("h5");
            projectEnd.textContent = due;
            projectEnd.classList.add("txt");
            projectEnd.className = "col s6";
            generalEnd.appendChild(projectEnd);

            //Project Description Div
            var h4 = document.createElement("h4");
            h4.textContent = "Description:";
            h4.classList.add("txt");
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
            // projectDiv.appendChild(button);
            $(document.body).on('click','.percentBtn', changePercent);
            $(document.body).on('click', '#toggleUnfinished', toggleUnfinished);
            $(document.body).on('click', '#toggleFinished', toggleFinished)
            developers(people, results);
            function developers(people, results){
                var cardID = results.cards[i].shortLink;
                $.getJSON("https://api.trello.com/1/cards/" + cardID + "/members?key=ad18609bec500062f9944b092d1601de&token=8a16dca9b23c590fdd6819d5b3123a3656eec64fba10bafd5f84f9cc44369b48&cards=all", function(results){
                    //Contributors Element 
                    var h2 = document.createElement("h4");
                    h2.textContent = "Developers:";
                    h2.classList.add("txt");
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
        if(data ===  null){
            var startDate = "NO DATA GIVEN";
            var percent = "NO DATA GIVEN";
        }else if(data.Percent === undefined){
            percent = "NO DATA GIVEN";
            console.log(" no percent");
        }else if(data.StartDate === undefined){
            startDate = "NO DATA GIVEN";
            console.log("no Start Date");
        }else{
            startDate = data.StartDate.split("-");
            startDate = startDate[1] + "/" + startDate[2] + "/" + startDate[0];
            percent = data.Percent;
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
        startTxt.classList.add("txt");
        startTxt.textContent = startDate;
        $(start).append(startTxt);

        //Change Start Date Div
        var changeStart = document.createElement("div");
        changeStart.id = id + "changeStartDateDiv";
        changeStart.className = "changeStartDiv";

        //Change Start Date Input Element
        var changeStartInput = document.createElement("input");
        changeStartInput.id = id + "changeStartDateInput";
        changeStartInput.className = "changeStart";
        $(changeStartInput).attr("type", "date");
        changeStart.appendChild(changeStartInput);

        //Project Start Date Element
        var projectStart = document.createElement("h5");
        projectStart.textContent = startDate;
        projectStart.id = id + "projectStart";
        projectStart.classList.add("txt");
        projectStart.className = "col s6";
        if(startDate === "NO DATA GIVEN"){
            $(generalStart).css("background-color", "#86c232");
        }
        generalStart.appendChild(projectStart);
        generalStart.appendChild(changeStart);

        //timeline button
        var hr = document.createElement("button");
        hr.id = id + "button";
        hr.classList.add("txt");
        hr.classList.add("percentBtn");
        if(percent === "NO DATA GIVEN"){
            hr.textContent = "NO DATA GIVEN";
        }else{
            hr.textContent = percent + "% Complete";
        }   
        $(hr).css("font-size", "18px");
        $(hr).css("height", "30px");
        $(hr).css("margin-bottom", "10px");
        $(hr).animate({
            width: percent + "%",
        },2000);
        $(hr).css("border-radius", "15px");
        $(hr).css("float", "left");
        $(hr).css("background-color", "#474b4f !important");
        if(percent === "NO DATA GIVEN"){
            $(hr).css("background-color", "#86c232");
        }
        
        //Div for range bar (To change the percentage of completion)
        var rangeDiv = document.createElement("div");
        rangeDiv.id = id + "rangeDiv";
        rangeDiv.className = "rangeDiv";

        //Range Slider
        var range = document.createElement("input");
        range.id = id + "range";
        range.className = "range";
        $(range).attr("type", "range");
        $(range).attr("step", "1");
        $(range).attr("min", "0");
        $(range).attr("max", "100");
        rangeDiv.appendChild(range);

        timelineDiv.appendChild(hr);
        timelineDiv.appendChild(rangeDiv);
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

function changePercent(){
    var id = $(this).attr("id");
    id = id.split("button");
    id = id[0];
    var rangeDivId = id + "rangeDiv";
    var startDateDivId = id + "changeStartDateDiv";
    $("#" + rangeDivId).show();
    $("#" + startDateDivId).show()
    setInterval(function(){$("#" + rangeDivId).hide(); $("#" + startDateDivId).hide();},10000);

    $('.changeStart').on("change", function(){
        var id = $(this).attr("id");
        id = id.split("changeStartDateInput");
        id = id[0];
        //Start date in general data
        var startH5 = id + "projectStart";
        //Start date above the Percent 'bar'
        var startH5Two = id + "startTxt";
        var date = $(this).val();

        var showDate = date.split("-");
        showDate = showDate[1] + "/" + showDate[2] + "/" + showDate[0];

        //Change date on page
        $("#" + startH5).html(showDate);
        $("#" + startH5Two).html(showDate);

        //Update object
        var update = {
            StartDate:date,
        };

        //Update start date in firebase
        var ref = firebase.database().ref("Projects/" + id);
        return ref.update(update);
        
    });

    $('.range').on("change", function(){
        var id = $(this).attr("id");
        id = id.split("range");
        id = id[0];
        var btnId = id + "button";
        var percent = $(this).val();

        $("#" + btnId).animate({
            width: percent + "%",
        }, 500)
        $("#" + btnId).html(percent + "% Complete");

        //Update object
        var update = {
            Percent:percent,
        };
        
        //Get firebase ref 
        var ref = firebase.database().ref("Projects/" + id);
        return ref.update(update);
    });
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
try {
    setInterval(function(){
        if(rotateNum >= items){
            rotateNum = 0;
        }
        $(".rotate" + rotateNum)[0].scrollIntoView({
            behavior: 'smooth'
        });
        rotateNum++;
    }, 10000);
} catch(TypeError){
    init();
}
})();