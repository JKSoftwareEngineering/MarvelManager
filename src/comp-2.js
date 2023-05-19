
// this will be used to log the number of times that a hero is sarched or a comic is clicked to show its popularity

// get rid of the border of the first <igm-footer> - works!
document.querySelector("igm-footer").style.border = "none";
// change an attribute of the first <igm-footer> - fails!
document.querySelector("igm-footer").setAttribute("data-year",1066);
document.querySelector("igm-footer").dataset.text= "William the Conquerer";