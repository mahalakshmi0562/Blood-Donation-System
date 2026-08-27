/* =====================================
   BLOOD COMPATIBILITY CHECKER
   Blood Donation System
===================================== */



const bloodCompatibility = {


"A+":{

donate:[
"A+",
"AB+"
],

receive:[
"A+",
"A-",
"O+",
"O-"
]

},



"A-":{

donate:[
"A+",
"A-",
"AB+",
"AB-"
],

receive:[
"A-",
"O-"
]

},



"B+":{

donate:[
"B+",
"AB+"
],

receive:[
"B+",
"B-",
"O+",
"O-"
]

},



"B-":{

donate:[
"B+",
"B-",
"AB+",
"AB-"
],

receive:[
"B-",
"O-"
]

},



"AB+":{

donate:[
"AB+"
],

receive:[
"A+",
"A-",
"B+",
"B-",
"AB+",
"AB-",
"O+",
"O-"
]

},



"AB-":{

donate:[
"AB+",
"AB-"
],

receive:[
"A-",
"B-",
"AB-",
"O-"
]

},



"O+":{

donate:[
"O+",
"A+",
"B+",
"AB+"
],

receive:[
"O+",
"O-"
]

},



"O-":{

donate:[
"A+",
"A-",
"B+",
"B-",
"AB+",
"AB-",
"O+",
"O-"
],

receive:[
"O-"
]

}



};





function checkCompatibility(){



let group =
document.getElementById("bloodGroup").value;



if(group===""){


showMessage(
"Please select a blood group",
"warning"
);


return;


}



let data =
bloodCompatibility[group];



document.getElementById("resultCard")
.style.display="block";



document.getElementById("resultGroup")
.innerHTML=group;



document.getElementById("donateTo")
.innerHTML=
data.donate.join(", ");



document.getElementById("receiveFrom")
.innerHTML=
data.receive.join(", ");




document.getElementById("resultCard")
.scrollIntoView({

behavior:"smooth"

});



}