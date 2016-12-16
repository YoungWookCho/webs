require([
    "bootstrap"
], function () {
    var data = {
        greeting: "Hello",
        students: [{
            name:   "이상윤",
            gender: "남"
        },{
            name:   "조영욱",
            gender: "남"

        },{
            name: "백수현",
            gender: "여"
        }]
    };


    for (var i=0 ; i<data.students.length; i++){
        var gender=data.students[i].gender;
        var html="" ;
        html+= "<li class= '";
        if (gender === "남"){
            html+= "male" ;
        }
        else{
            html+= "female" ;
        }
        html+= "'>";
        html+=data.greeting;
        html+=", ";
        html+=data.students[i].name;
        html+=", ";
        html+=data.students[i].gender;
        html+="</li>";
        $("ol").append(html);
    }


});
