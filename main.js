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

    var percent
    var currentArr = [];

    var due;
    var developerArr =["one"];

    var developer = "";

    var pirority;
    var stuck;
    var hold;

    var y = 0;

    // Array to hold arrays
    var arrs = [
        // ["Number", "Title", "Start", "End"],
        // ["1", "Figure out how to use Trello", new Date(2018, 03, 28), new Date(2018, 04, 09)],
        // ["1", "Figure out how to use Trello", new Date(2018, 03, 02), new Date(2018, 04, 02)],
        // ["1", "Figure out how to use Trello", new Date(2018, 03, 15), new Date(2018, 04, 11)],
        // ["1", "Figure out how to use Trello", new Date(2018, 03, 24), new Date(2018, 04, 20)],
    ];

    var obj = {};

function init(){
    firebase.initializeApp(config);
    $( window ).on( "orientationchange", function( event ) {
        // alert(window.orientation);
        if(window.orientation === 0){
            $(".project").removeClass("col");
            $(".project").removeClass("s8");

            $(".project").addClass("col");
            $(".project").addClass("s12");
        }

        if(window.orientation === 90){
            $(".project").removeClass("col");
            $(".project").removeClass("s12");

            $(".project").addClass("col");
            $(".project").addClass("s8");
        }
    });

    $.getJSON("https://api.trello.com/1/boards/6PVLjz20/?key=ad18609bec500062f9944b092d1601de&token=8a16dca9b23c590fdd6819d5b3123a3656eec64fba10bafd5f84f9cc44369b48&cards=all", function(results){
        for(var i = 0; i < results.cards.length; i++){
            closed = results.cards[i].closed;
            items++;
            var id = results.cards[i].id;
            due = results.cards[i].due;
            if(due === null){
                due = "No Due Date Given in Trello";
            }else{
                due = due.split("-");
                var dueTwo = due[2];
                dueTwo = String(dueTwo);
                dueTwo = dueTwo.split("T");
                due = due[1] + "/" + dueTwo[0] + "/" + due[0];
                var dueThree = due.split("/");
                var month;
                if(dueThree[0] === "01"){
                    month = "January";
                }else if(dueThree[0] === "02"){
                    month = "Febuary";
                }else if(dueThree[0] === "03"){
                    month = "March";
                }else if(dueThree[0] === "04"){
                    month = "April";
                }else if(dueThree[0] === "05"){
                    month = "May";
                }else if(dueThree[0] === "06"){
                    month = "June";
                }else if(dueThree[0] === "07"){
                    month = "July";
                }else if(dueThree[0] === "08"){
                    month = "August";
                }else if(dueThree[0] === "09"){
                    month = "September";
                }else if(dueThree[0] === "10"){
                    month = "October";
                }else if(dueThree[0] === "11"){
                    month = "November";
                }else{
                    month = "December";
                }

                var dueTxt = month + " " + dueThree[1] + ", " + dueThree[2];
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
            endTxt.textContent = dueTxt;
            $(endTxt).css("float", "right");
            end.appendChild(endTxt);

            //Project Name Div
            var name = document.createElement("div");
            name.classList.add("name");
            name.id = id + "name";

            //Project dates div (In general information)
            var dates = document.createElement("div");
            dates.classList.add("row");
            dates.classList.add("datesHome");

            //Project start date div (In general information)
            var generalStart = document.createElement("div");
            generalStart.classList.add("col");
            generalStart.classList.add("s6");
            var startH4 = document.createElement("h4");
            startH4.classList.add("txt");
            startH4.textContent = "Start Date: ";
            $(startH4).css("color", "#474b4f");
            $(startH4).css("font-weight", "bold");
            generalStart.appendChild(startH4);
            dates.appendChild(generalStart);

            //Project end date div (In general information)
            var generalEnd = document.createElement("div");
            generalEnd.classList.add("col");
            generalEnd.classList.add("s6");
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
            var projectName = document.createElement("h4");
            projectName.textContent = apiName;
            projectName.classList.add("txt");
            projectName.classList.add("truncate");
            $(projectName).css("color", "#fffffff");
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
            projectEnd.textContent = dueTxt;
            projectEnd.classList.add("txt");
            projectEnd.className = "col s6 offset-s6";
            generalEnd.appendChild(projectEnd);

            //Project Description Div
            var h4 = document.createElement("h4");
            h4.textContent = "Description:";
            h4.classList.add("txt");
            h4.classList.add("truncate");
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
            // $(projectInfoDiv).append(priorityBtnDiv);

            developers(people, results, apiName, due);
            function developers(people, results, apiName, due){
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
                        item.className = "developer " + apiName + " " + due;
                        item.textContent = contributors;
                        projectContributorsList.appendChild(item);

                        var date = new Date();
                        var yyyy = date.getFullYear();
                        var dd = date.getDate();
                        var mm = date.getMonth() + 1;

                        var splitEnd = due.split("/");
                        var endMM = splitEnd[0];
                        endMM = Number(endMM);
                        var endDD = splitEnd[1];
                        endDD = Number(endDD);
                        var endYY = splitEnd[2];
                        endYY = Number(endYY);

                        // console.log(due:);
                        // console.log(endMM);

                        if(mm <= endMM){
                            developer += contributors + " . " + apiName + " . " + due + " | ";
                            // console.log(developer);
                        }
                    }

                    $(people).append(h2);
                    $(people).append(projectContributorsList);
                });
                startAndPercent(id, dueTxt, i, results, datesDiv, timelineDiv, dates, projectDiv, generalStart, due, i, apiName);
            }
        }

        // occupiedDevelopers();
    });

    $(document.body).on('click','.percentBtn', changePercent);
    $(document.body).on('click', '#toggleUnfinished', toggleUnfinished);
    $(document.body).on('click', '#toggleFinished', toggleFinished);
    $(document.body).on('click', '.priority', priority);
    $(document.body).on('click', '.priorityName', priorityName);
    $(document.body).on('click', '.stuck', stuck);
    $(document.body).on('click', '.stuckName', stuckName);
    $(document.body).on('click', '.hold', hold);
    $(document.body).on('click', '.holdName', holdName);
    // $(document.body).on("click", "#refresh", function(){
    //     console.log("wokring");
    //     init();
    // });
    // occupiedDevelopers();
}

function startAndPercent(id, dueTxt, i, results, datesDiv, timelineDiv, dates, projectDiv, generalStart, due, i, apiName){
    var ref = firebase.database().ref("Projects/" + id);
    ref.once("value", function(snapshot){
        var data = snapshot.val();
        if(data ===  null){
            var startDate = "NO DATA GIVEN";
            percent = "NO DATA GIVEN";
        }else if(data.Percent === undefined){
            percent = "NO DATA GIVEN";
            // console.log(" no percent");
        }else if(data.StartDate === undefined){
            startDate = "NO DATA GIVEN";
            // console.log("no Start Date");
        }else{
            startDate = data.StartDate.split("-");
            due = due.split("/");
            // console.log(due);
            // var arr =  ["1", apiName, new Date(Number(startDate[0]), Number(startDate[1]) - 1, Number(startDate[2])), new Date(Number(due[2]), Number(due[0]) - 1, Number(due[1]))];
            // arrs.push(arr);
            startDate = startDate[1] + "/" + startDate[2] + "/" + startDate[0];
            percent = data.Percent;
        }

        var dueThree = startDate.split("/");
        var month;
        if(dueThree[0] === "01"){
            month = "January";
        }else if(dueThree[0] === "02"){
            month = "Febuary";
        }else if(dueThree[0] === "03"){
            month = "March";
        }else if(dueThree[0] === "04"){
            month = "April";
        }else if(dueThree[0] === "05"){
            month = "May";
        }else if(dueThree[0] === "06"){
            month = "June";
        }else if(dueThree[0] === "07"){
            month = "July";
        }else if(dueThree[0] === "08"){
            month = "August";
        }else if(dueThree[0] === "09"){
            month = "September";
        }else if(dueThree[0] === "10"){
            month = "October";
        }else if(dueThree[0] === "11"){
            month = "November";
        }else{
            month = "December";
        }

        var startDateTxt = month + " " + dueThree[1] + ", " + dueThree[2];

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
        startTxt.textContent = startDateTxt;
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
        projectStart.textContent = startDateTxt;
        projectStart.id = id + "projectStart";
        projectStart.classList.add("txt");
        projectStart.className = "col s6";
        if(startDate === "NO DATA GIVEN"){
            $(generalStart).css("background-color", "#86c232");
        }
        generalStart.appendChild(projectStart);
        generalStart.appendChild(changeStart);

        // Timeline Div
        var timelineDivTwo = document.createElement("div");
        timelineDivTwo.id = id + "timeline";
        // $(timelineDivTwo).css("height", "400px");

        // Create Timeline


        // Append timelineDivTwo
        timelineDiv.appendChild(timelineDivTwo);

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
        // $(hr).css("background-color", "#474b4f !important");
        if(percent === "NO DATA GIVEN"){
            $(hr).css("background-color", "#86c232");
        }

        // if(priority === true){
        //     hr.classList.add("priorityName");
        // }else if(stuck === true){
        //     hr.classList.add("stuckName");
        // }else if(hold === true){
        //     hr.classList.add("holdName");
        // }else{
            
        // }

        // pirority = false;
        // stuck = false;
        // hold = false;

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

        // Priority btn div
        var priorityBtnDiv = document.createElement("div");
        priorityBtnDiv.classList.add("col");
        priorityBtnDiv.classList.add("s12");
        priorityBtnDiv.classList.add("priorityBtnDiv");

        // Priority Btn
        var priorityBtn = document.createElement("button");
        priorityBtn.classList.add("left");
        priorityBtn.classList.add("priority");
        priorityBtn.id = id + "priority";
        priorityBtn.textContent = "Priority";
        priorityBtnDiv.appendChild(priorityBtn);
        $(priorityBtn).css('background-color', '#FFFFFF !important');

        // Priority Btn Off
        // var priorityBtnOff = document.createElement("button");
        // priorityBtnOff.classList.add("left");
        // priorityBtnOff.classList.add("priorityOff");
        // priorityBtnOff.id = id + "priorityOff";
        // priorityBtnOff.textContent = "Priority";
        // priorityBtnDiv.appendChild(priorityBtnOff);
        // $(priorityBtnOff).css('background-color', '##2C3029 !important');
        // $(priorityBtnOff).css('color', '#FFFFFF !important');

        // Stuck btn div
        // var stuckBtnDiv = document.createElement("div");
        // stuckBtnDiv.classList.add("col");
        // stuckBtnDiv.classList.add("s6");
        // stuckBtnDiv.classList.add("stuckBtnDiv");

        // Stuck Btn
        var stuckBtn = document.createElement("button");
        stuckBtn.classList.add("left");
        stuckBtn.classList.add("stuck");
        stuckBtn.id = id + "stuck";
        stuckBtn.textContent = "Stuck";
        priorityBtnDiv.appendChild(stuckBtn);
        $(stuckBtn).css('background-color', '#FFFFFF !important');

        // Stuck Btn Off
        // var stuckBtnOff = document.createElement("button");
        // stuckBtnOff.classList.add("left");
        // stuckBtnOff.classList.add("stuckOff");
        // stuckBtnOff.id = id + "stuckOff";
        // stuckBtnOff.textContent = "Stuck";
        // priorityBtnDiv.appendChild(stuckBtnOff);
        // $(stuckBtnOff).css('background-color', '#FFC600 !important');
        // $(stuckBtnOff).css('color', '#FFFFFF !important');

        // On Hold Btn
        var holdBtn = document.createElement("button");
        holdBtn.classList.add("left");
        holdBtn.classList.add("hold");
        holdBtn.id = id + "hold";
        holdBtn.textContent = "On Hold";
        priorityBtnDiv.appendChild(holdBtn);
        $(holdBtn).css('background-color', '#FFFFFF !important');

        // On Hold Btn Off
        // var holdBtnOff = document.createElement("button");
        // holdBtnOff.classList.add("left");
        // holdBtnOff.classList.add("holdOff");
        // holdBtnOff.id = id + "holdOff";
        // holdBtnOff.textContent = "On Hold";
        // priorityBtnDiv.appendChild(holdBtnOff);
        // $(holdBtnOff).css('background-color', '#2C3029 !important');
        // $(holdBtnOff).css('color', '#FFFFFF !important');

        var ref = firebase.database().ref('Projects/' + id);
            ref.on("value", function(snapshot){
                var data = snapshot.val();
                // console.log(data);

                if(data.Priority === true){
                    priorityBtn.classList.add("priorityName");
                }
                
                if(data.Stuck === true){
                    stuckBtn.classList.add("stuckName");
                    // console.log("stuck", stuckBtn);
                }
                
                if(data.Hold === true){
                    holdBtn.classList.add("holdName");
                }
            });


        timelineDiv.appendChild(hr);
        timelineDiv.appendChild(rangeDiv);
        timelineDiv.appendChild(priorityBtnDiv);
        // timelineDiv.appendChild(stuckBtnDiv);
        if(percent === "100"){
            document.getElementById('finished').appendChild(projectDiv);
        }else{
            document.getElementById('projects').appendChild(projectDiv);
        }

        var y = i + 1;
        // y = new String(y);
        y = '' + y;
        // console.log(y);

        // Create seperate timelines
        google.charts.load("current", {packages:["timeline"]});
        google.charts.setOnLoadCallback(drawChart);

        // Function callback form google.charts.setOnLoadCallback
        function drawChart(){
// Individual Charts
// ###################################################################################################################################################
            // // Create a new Timeline object
            // var chart = new google.visualization.Timeline(timelineDivTwo);
            // // Create a new DataTable object
            // var dataTable = new google.visualization.DataTable();

            // // Create Data Columns
            // dataTable.addColumn({type: 'string', id: 'Number'});
            // dataTable.addColumn({type: 'string', id: 'Title'});
            // dataTable.addColumn({type: 'date', id: 'Start'});
            // dataTable.addColumn({type: 'date', id: 'End'});

            // // Reorder Date
            // startDate = startDate.split("/");
            // due = due.split("/");

            // // Give data to columns
            // dataTable.addRows([
            //     [ y, apiName, new Date(startDate[2], startDate[0], startDate[1]), new Date(due[2], due[0], due[1])],
            // ])

            // // Set option to get rid of row labels
            // var options = {
            //     timeline: {showRowLabels: false, barLabelStyle: { fontSize: 18 }},
            //     height: 150,
            // };

            // // Draw Table
            // chart.draw(dataTable, options);
// ###################################################################################################################################################
            // console.log("This is my data table");
            // console.log(dataTable);
            // console.log(startDate);
            // console.log(startDate[2], startDate[0], startDate[1], startDate);
            // console.log(arrs[i][0]);
        }

        masterTimeline(id, dueTxt, startDateTxt, i, results, datesDiv, timelineDiv, dates, projectDiv, generalStart, due, i, apiName, startDate);
    });
}

function masterTimeline(id, dueTxt, startDateTxt, i, results, datesDiv, timelineDiv, dates, projectDiv, generalStart, due, i, apiName, startDate){
    // Surronding ul
   var ul = document.createElement("ul");
   ul.classList.add("row");
//    ul.classList.add("col");
//    ul.classList.add("s12");
   ul.classList.add("ul");

   // Project li
   var li = document.createElement("li");
   li.id = id + "project";
   li.classList.add("col");
   li.classList.add("s6");
   ul.appendChild(li);
   
   // Project empty span
   var spanOne = document.createElement("span");
   li.appendChild(spanOne);

   // Sourronding div
   var div = document.createElement("div");
   li.appendChild(div);

   // Content div
   var contentDiv = document.createElement("div");
   div.classList.add("contentDiv");
   div.appendChild(contentDiv);

   // Project title div
   var titleDiv = document.createElement("div");
   titleDiv.classList.add("title");
   titleDiv.textContent = apiName;
   div.appendChild(titleDiv);

   // Project start date div
   var startDateDiv = document.createElement("div");
   startDateDiv.classList.add("startDate");
   startDateDiv.textContent = startDateTxt;
   div.appendChild(startDateDiv);

   due = due[0] + "/" + due[1] + "/" + due[2];

    // Project end date div
   var endDateDiv = document.createElement("div");
   endDateDiv.classList.add("endDate");
   endDateDiv.textContent = dueTxt;
   div.appendChild(endDateDiv);

   // Project percent div
   var percentDiv = document.createElement("div");
   percentDiv.classList.add("percent");
   percentDiv.textContent = percent + "%" + " Complete";
   div.appendChild(percentDiv);

   // Project available div
   var availableDiv = document.createElement("div");
   availableDiv.classList.add("available");
   div.appendChild(availableDiv);

   var date = new Date();
   var yyyy = date.getFullYear();
   var dd = date.getDate();
   var mm = date.getMonth() + 1;

   var splitStart = startDate.split("/");
   var startMM = splitStart[0];
   startMM = Number(startMM);
   var startDD = splitStart[1];
   startDD = Number(startDD);
   var startYY = splitStart[2];
   startYY = Number(startYY);

   var splitEnd = due.split("/");
   var endMM = splitEnd[0];
   endMM = Number(endMM);
   var endDD = splitEnd[1];
   endDD = Number(endDD);
   var endYY = splitEnd[2];
   endYY = Number(endYY);

   if((mm > startMM && mm < endMM)||
    (mm === startMM && mm === endMM)||
    (mm === startMM && mm < endMM) && 
    (dd > startDD && dd < endDD) ||
    (dd === startDD && dd < endDD)){
       $(availableDiv).css('background', 'linear-gradient(to right, #B20000, #FF1919)');
    //    console.log("working");
   }else{
       $(availableDiv).css('background', 'linear-gradient(to right, #00B233, #00FF48)');
   }

   // Span Dates
   var dateSpan = document.createElement("span");
   dateSpan.classList.add("dates");
   li.appendChild(dateSpan);

   // Span Start
   var spanStart = document.createElement("span");
   spanStart.textContent = startDateTxt;
   dateSpan.appendChild(spanStart);

   // Span End
   var spanEnd = document.createElement("span");
   spanEnd.textContent = dueTxt;
   dateSpan.appendChild(spanEnd);

   document.getElementById("master").appendChild(ul);

//    console.log(due);

   currentProjects();

    function currentProjects(){
        var date = new Date();
        var yyyy = date.getFullYear();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        if((mm > startMM && mm < endMM)||
        (mm === startMM && mm === endMM)||
        (mm === startMM && mm < endMM)){
            // console.log("working in current");
            currentArr.push(i);

            var div = document.createElement("div");
            div.id = id + "div";
            div.className = "currentDiv";

            var titleDiv = document.createElement("div");
            div.id = id + "currentTitleDiv";
            div.classList.add("currentTitleDiv");
            div.appendChild(titleDiv);

            var title = document.createElement("h4");
            title.textContent = apiName;
            title.classList.add("truncate");
            titleDiv.appendChild(title);

            var endDateDiv = document.createElement("div");
            endDateDiv.id = id + "currentEndDateDiv";
            endDateDiv.className = "currentEndDateDiv";
            div.appendChild(endDateDiv);

            var endDate = document.createElement("h5");
            endDate.textContent = dueTxt;
            endDateDiv.appendChild(endDate);

            var currentPercentDiv = document.createElement("div");
            currentPercentDiv.id = id + "currentPercentDiv";
            currentPercentDiv.className = "currentPercentDiv";
            div.appendChild(currentPercentDiv);

            var percentTxt = document.createElement("h5");
            percentTxt.textContent = percent + "% Complete";
            percentTxt.className = "percentCurrent";
            currentPercentDiv.appendChild(percentTxt);

            document.getElementById("current").appendChild(div);
            
            if(y === 0){
                occupiedDevelopers(dueTxt);
            }

            y = 1;
        }else{
            var noCurrent = document.createElement("div");
            noCurrent.id = id + "noCurrent";
            noCurrent.className = "noCurrent";

            var no = document.createElement("h4");
            no.textContent = "There are no Current Projects!";
            noCurrent.appendChild(no);

            // console.log("working");

            if((i + 1) === results.cards.length && currentArr.length === 0){
                // console.log("working a second time");
                document.getElementById("current").appendChild(noCurrent);
            }
        }
    }
}

function occupiedDevelopers(dueTxt){
    // Occupied developers
    $('#occupied').empty();
    // console.log("occupied");

    if(developerSet === ""){
        var noDeveloper = document.createElement("div");
        noDeveloper.classList.add("noDeveloper");

        var noH4 = document.createElement("h4");
        noH4.textContent = "There are no Occupied Developers";
        noDeveloper.appendChild(noH4);

        document.getElementById("occupied").appendChild(noDeveloper);
    }else{
        // console.log(developer);
        var developerSet = developer.split(" | ");
        developerSet.pop();
        // console.log(developerSet.length);

        // console.log(developerSet);
        for(var i = 0; i < developerSet.length; i++){
            // console.log(developerSet[i]);
            // console.log(developer);
            // $('#occupied').empty();
            // console.log(i);
        
            var developerInfo = developerSet[i].split(" . ");
            var developerName = developerInfo[0];
            var projectTitle = developerInfo[1];
            var projectEnd = developerInfo[2];
            // console.log(projectEnd);


            // console.log(projectTitle);

            var occupiedDiv = document.createElement("div");
            occupiedDiv.className = "occupiedDiv";

            var occupiedName = document.createElement("h4");
            occupiedName.textContent = developerName;
            // console.log(occupiedName);

            var occupiedTitle = document.createElement("h4");
            occupiedTitle.textContent = projectTitle;
            // occupiedTitle.classList.add("occupiedTitle");
            occupiedTitle.id = "occupiedTitle";
            occupiedTitle.classList.add("truncate");

            var occupiedEnd = document.createElement("h4");
            occupiedEnd.textContent = projectEnd;
            // console.log(dueTxt);

            var cardTextOne = document.createElement("p");
            cardTextOne.textContent = " is occupied working on ";

            var cardTextTwo = document.createElement("p");
            cardTextTwo.textContent = " and will be available again on ";

            occupiedDiv.appendChild(occupiedName);
            occupiedDiv.appendChild(cardTextOne);
            occupiedDiv.appendChild(occupiedTitle);
            occupiedDiv.appendChild(cardTextTwo);
            occupiedDiv.appendChild(occupiedEnd);

            // console.log(occupiedDiv/);

            document.getElementById("occupied").appendChild(occupiedDiv);
            
            // console.log(cardText);
        }
    }
    // $('.occupied').empty();
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
    // $('.finished').toggle();
    finishedClickCount++;
    if(finishedClickCount % 2 === 0){
        $('#finished').hide();
    }else{
        $('#finished').show();
    }
}

function toggleUnfinished(){
    // console.log(unfinishedClickCount);
    unfinishedClickCount++;
    $('.projects').toggle();
    if(unfinishedClickCount % 2 === 0){
        // console.log("working");
        $('#projects').css('display', 'none');
    }else{
        $('#projects').css('display', 'block');
    }
}

function priority(){
    var id = $(this).attr('id');
    id = id.split("priority");
    id = id[0];
    // console.log(id);
    
    var ref = firebase.database().ref("Projects/" + id);
    var data = {
        Priority:true,
    }

    $(this).removeClass("priority");
    $(this).addClass("priorityName");
    // $(this).css("background-image", "linear-gradient(to right, #0068FF, #00BCFF)");
    // $(this).css("background-image", "linear-gradient(to right, #0068FF, #00BCFF)");
    return ref.update(data);
}

function priorityName(){
    // console.log("working");
    var id = $(this).attr('id');
    id = id.split("priority");
    id = id[0];
    
    var ref = firebase.database().ref("Projects/" + id);
    var data = {
        Priority:false,
    }
    // console.log(data);

    $(this).removeClass("priorityName");
    $(this).addClass("priority");
    // $(this).css("background-color", "#FFFFFF !important");
    // $(this).css("color", "#0068FF !important");
    return ref.update(data);
}

function stuck(){
    var id = $(this).attr('id');
    id = id.split("stuck");
    id = id[0];
    
    var ref = firebase.database().ref("Projects/" + id);
    var data = {
        Stuck:true,
    }

    $(this).removeClass("stuck");
    $(this).addClass("stuckName");
    // $(this).css("background-image", "linear-gradient(to right, #FFC600, #FFCD1D)");
    // $(this).css("background-image", "linear-gradient(to right, #FFC600, #FFCD1D)");
    return ref.update(data);
}

function stuckName(){
    var id = $(this).attr('id');
    id = id.split("stuck");
    id = id[0];
    
    var ref = firebase.database().ref("Projects/" + id);
    var data = {
        Stuck:false,
    }

    $(this).removeClass("stuckName");
    $(this).addClass("stuck");
    // $(this).css("background-color", "#FFFFFF !important");
    // $(this).css("color", "#FFC600 !important");
    return ref.update(data);
}

function hold(){
    var id = $(this).attr('id');
    id = id.split("hold");
    id = id[0];
    
    var ref = firebase.database().ref("Projects/" + id);
    var data = {
        Hold:true,
    }

    $(this).removeClass("hold");
    $(this).addClass("holdName");
    // $(this).css("background-image", "linear-gradient(to right, #2C3029, #394036)");
    // $(this).css("background-image", "linear-gradient(to right, #2C3029, #394036)");
    return ref.update(data);
}

function holdName(){
    var id = $(this).attr('id');
    id = id.split("hold");
    id = id[0];
    
    var ref = firebase.database().ref("Projects/" + id);
    var data = {
        Hold:false,
    }

    $(this).removeClass("holdName");
    $(this).addClass("hold");
    // $(this).css("background-color", "#FFFFFF !important");
    // $(this).css("color", "#2C3029 !important");
    return ref.update(data);
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
    }, 15000);
} catch(TypeError){
    alert("This web Browser does not support auto scrolling");
}finally{
    init();
}
})();
