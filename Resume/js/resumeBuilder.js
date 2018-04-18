/*
This is empty on purpose! Your code to build the resume will go here.
 */
googleMap+="";

//       //

  var bio = {
    name: "Filipe Oliveira",
    role: "Junior Front-End Developper",
    contacts: {
          mobile: "964257205",
          email: "filipe.dmo@gmail.com",
          github: "github.com/FDMOliveira",
          location: "Seixal"
    },
    welcomeMessage: "Hello !", 
    skills: ["HTML5","CSS3","Bootstrap 4","Javascript","jQuery"],
    biopic: "",
    display : function() {
        var formattedHeaderName = HTMLheaderName.replace("%data%",bio.name);
        var formattedHeaderRole = HTMLheaderRole.replace("%data%",bio.role);
        var formattedHTMLwelcomeMsg = HTMLwelcomeMsg.replace("%data%", "Welcome to my page!");
        var formattedHTMLbioPic = HTMLbioPic.replace("%data%", "images/pic.jpg");
    
        $('#header').prepend(formattedHeaderName,formattedHeaderRole);
        $('#header').append(formattedHTMLwelcomeMsg,formattedHTMLbioPic,HTMLskillsStart);    
        
        for (var data in bio.contacts) {
            var formattedHTMLcontactGeneric = HTMLcontactGeneric.replace("%contact%",data);
            var newFormattedHTMLcontactGeneric = formattedHTMLcontactGeneric.replace("%data%",bio.contacts[data]);
             $("#topContacts").append(newFormattedHTMLcontactGeneric);
             $('#footerContacts').append(newFormattedHTMLcontactGeneric);
        
          }
          for (var i=0; i<bio.skills.length; i++) {
             var formattedHTMLskills = HTMLskills.replace("%data%", bio.skills[i]);
             $('#skills').append(formattedHTMLskills);
          }
    } 
  };
  
  var education = {
    schools: [{
        name: "Multimedia Engineering",
        degree: "Graduation",
        majors: ["OOP","Script Programming Languages","Mobile Development","UI/UX"],
        dates: "2010-2014",
        location: "Lisbon",
        url: "www.istec.pt"
      },
      {
        name: "Computing",
        degree: "Graduation",
        majors: ["Android Java","Windows Server Administration"],
        dates: "2015-2016",
        location: "Lisbon",
        url: "www.istec.pt"
      }],
    onlineCourses: [{
        title: "Javascript, the weird parts",
        school: "Udemy",
        dates: "2017",
        url: "www.udemy.com"
    },
    {
        title: "Front-End Web Nanodegree",
        school: "Udacity",
        dates: "2018",
        url: "www.udacity.com"
    },
  ],
    display : function() {
        $('#education').append(HTMLschoolStart);
       
        for (var i=0; i<education.schools.length; i++) {
            var schoolObj = education.schools[i];
            var majorStr ="";
            var newHTMLschoolName = HTMLschoolName.replace("%data%",schoolObj["name"]);
            var newHTMLschoolDegree = HTMLschoolDegree.replace("%data%",schoolObj["degree"]);
            var newHTMLschoolDates = HTMLschoolDates.replace("%data%",schoolObj["dates"]);
            var newHTMLschoolLocation = HTMLschoolLocation.replace("%data%",schoolObj["location"]);
            for (var a=0; a<schoolObj["majors"].length;a++)
              majorStr = majorStr + schoolObj.majors[a]+", ";
              var newHTMLschoolMajor = HTMLschoolMajor.replace("%data%",majorStr);
           $('.education-entry').append(newHTMLschoolName,newHTMLschoolDegree,newHTMLschoolDates,newHTMLschoolLocation,newHTMLschoolMajor);
          }
          $('.education-entry').append(HTMLonlineClasses);
        for (var i=0; i<education.onlineCourses.length;i++) {
            var onlineCoursesObj = education.onlineCourses[i];
            var newHTMLonlineTitle = HTMLonlineTitle.replace("%data%",onlineCoursesObj.title);
            var newHTMLonlineSchool = HTMLonlineSchool.replace("%data%",onlineCoursesObj.school);
            var newHTMLonlineDates = HTMLonlineDates.replace("%data%",onlineCoursesObj.dates);
            var newHTMLonlineURL = HTMLonlineURL.replace("%data%",onlineCoursesObj.url);
            $('.education-entry').append(newHTMLonlineTitle,newHTMLonlineSchool,newHTMLonlineDates,newHTMLonlineURL);
        }
    }
  };
  var work = {
    jobs: [{
      employer: "CaveDigital", 
      title: "Support Assistant and Developer ",
      location: "Lisboa", 
      dates: "07/2017 - 09/2017",
      description: "In this experience i played a role of custommer support and i developed C# applications , which front-end languages were Javascript , CSS , JQuery and HTML. These applications were included in a Sharepoint product meant to manage organisational meetings"
    },
    {
      employer: "EmporDef", 
      title: "Mobile Developer",
      location: "Almada", 
      dates: "11/2016 - 03/2017",
      description: "At EmporDef, i developed a hybrid Mobile Application with ActionScript 3.0 and Adobe Flash CS6. The goal of the application was to provide a player to display e-learning videos"
    }], 
    display: function() {  
        $('#workExperience').append(HTMLworkStart);
        
        for (var job in work.jobs) {
            var jobArray= work.jobs[job];
            var newHTMLworkEmployer = HTMLworkEmployer.replace("%data%", jobArray["employer"]);
            var newHTMLworTitle = HTMLworkTitle.replace("%data%", jobArray["title"]);
            var newHTMLworkDates = HTMLworkDates.replace("%data%", jobArray["location"]);
            var newHTMLworkLocation = HTMLworkLocation.replace("%data%", jobArray["dates"]);
            var newHTMLworkDescription = HTMLworkDescription.replace("%data%", jobArray["description"]);
        
            $('.work-entry').append(newHTMLworkEmployer,newHTMLworTitle,newHTMLworkDates,newHTMLworkLocation,newHTMLworkDescription);
        }
    }
  };
  var projects = {
     projects: [{
      title: "My own Portefólio Web-site", 
      dates: "In progress",
      description: "This web-site is being developed by a wordpress template made by me, and its being developed with HTML5, CSS3, Javascript Vannila, jQuery, a Grunt Plugin and PHP7.",
      images: ["images/print.png","images/print_landscape.png"]
    }],
    display: function() {
        $('#projects').append(HTMLprojectStart);
        for (var project in projects.projects) {
            var projectArray = projects.projects[project];
            var newHTMLprojectTitle = HTMLprojectTitle.replace("%data%",projectArray["title"]);
            var newHTMLprojectDates = HTMLprojectDates.replace("%data%",projectArray["dates"]);
            var newHTMLprojectDescription = HTMLprojectDescription.replace("%data%",projectArray["description"]);
            $('.project-entry').append(newHTMLprojectTitle,newHTMLprojectDates,newHTMLprojectDescription);
            for (var i=0;i<projectArray["images"].length;i++) {
              var newHTMLprojectImage = HTMLprojectImage.replace("%data%",projectArray.images[i]);
              $('.project-entry').append(newHTMLprojectImage);    
            }
          }
    }
  };
  bio.display();
  education.display();
  work.display();
  projects.display();

  $('#mapDiv').append(googleMap);
  /*
  The Internationalize Names challenge found in the lesson Flow Control from JavaScript Basics requires you to create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
  */
  $(document).ready(function() {
    $('button').click(function() {
      var $name = $('#name');
      var iName = inName($name.text()) || function(){};
      $name.html(iName);
    });
   
  });