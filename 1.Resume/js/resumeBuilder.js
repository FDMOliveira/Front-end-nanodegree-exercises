googleMap+="";

const bio = {
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
        const formattedHeaderName = HTMLheaderName.replace("%data%",bio.name);
        const formattedHeaderRole = HTMLheaderRole.replace("%data%",bio.role);
        const formattedHTMLwelcomeMsg = HTMLwelcomeMsg.replace("%data%", "Welcome to my page!");
        const formattedHTMLbioPic = HTMLbioPic.replace("%data%", "images/pic.jpg");
    
        $('#header').prepend(formattedHeaderName,formattedHeaderRole);
        $('#header').append(formattedHTMLwelcomeMsg,formattedHTMLbioPic,HTMLskillsStart);    
        
        for (let data in bio.contacts) {
            const formattedHTMLcontactGeneric = HTMLcontactGeneric.replace("%contact%",data);
            const newFormattedHTMLcontactGeneric = formattedHTMLcontactGeneric.replace("%data%",bio.contacts[data]);
             $("#topContacts").append(newFormattedHTMLcontactGeneric);
             $('#footerContacts').append(newFormattedHTMLcontactGeneric);
        
          }
          for (let i=0; i<bio.skills.length; i++) {
             const formattedHTMLskills = HTMLskills.replace("%data%", bio.skills[i]);
             $('#skills').append(formattedHTMLskills);
          }
    } 
  };
  
  const education = {
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
       
        for (let i=0; i<education.schools.length; i++) {
            const schoolObj = education.schools[i];
            let majorStr ="";
            const newHTMLschoolName = HTMLschoolName.replace("%data%",schoolObj["name"]);
            const newHTMLschoolDegree = HTMLschoolDegree.replace("%data%",schoolObj["degree"]);
            const newHTMLschoolDates = HTMLschoolDates.replace("%data%",schoolObj["dates"]);
            const newHTMLschoolLocation = HTMLschoolLocation.replace("%data%",schoolObj["location"]);
            for (let a=0; a<schoolObj["majors"].length;a++)
              majorStr = majorStr + schoolObj.majors[a]+", ";
              const newHTMLschoolMajor = HTMLschoolMajor.replace("%data%",majorStr);
           $('.education-entry').append(newHTMLschoolName,newHTMLschoolDegree,newHTMLschoolDates,newHTMLschoolLocation,newHTMLschoolMajor);
          }
          $('.education-entry').append(HTMLonlineClasses);
        for (let i=0; i<education.onlineCourses.length;i++) {
            const onlineCoursesObj = education.onlineCourses[i];
            const newHTMLonlineTitle = HTMLonlineTitle.replace("%data%",onlineCoursesObj.title);
            const newHTMLonlineSchool = HTMLonlineSchool.replace("%data%",onlineCoursesObj.school);
            const newHTMLonlineDates = HTMLonlineDates.replace("%data%",onlineCoursesObj.dates);
            let newHTMLonlineURL = HTMLonlineURL.replace("%data%",onlineCoursesObj.url);
            $('.education-entry').append(newHTMLonlineTitle,newHTMLonlineSchool,newHTMLonlineDates,newHTMLonlineURL);
        }
    }
  };
  const work = {
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
        
        for (let job in work.jobs) {
            const jobArray= work.jobs[job];
            const newHTMLworkEmployer = HTMLworkEmployer.replace("%data%", jobArray["employer"]);
            const newHTMLworTitle = HTMLworkTitle.replace("%data%", jobArray["title"]);
            const newHTMLworkDates = HTMLworkDates.replace("%data%", jobArray["location"]);
            const newHTMLworkLocation = HTMLworkLocation.replace("%data%", jobArray["dates"]);
            const newHTMLworkDescription = HTMLworkDescription.replace("%data%", jobArray["description"]);
        
            $('.work-entry').append(newHTMLworkEmployer,newHTMLworTitle,newHTMLworkDates,newHTMLworkLocation,newHTMLworkDescription);
        }
    }
  };
  const projects = {
     projects: [{
      title: "My own Portefólio Web-site", 
      dates: "In progress",
      description: "This web-site is being developed by a wordpress template made by me, and its being developed with HTML5, CSS3, Javascript Vannila, jQuery, a Grunt Plugin and PHP7.",
      images: ["images/print.png","images/print_landscape.png"]
    }],
    display: function() {
        $('#projects').append(HTMLprojectStart);
        for (let project of projects.projects) {
            const projectArray = project;
            const newHTMLprojectTitle = HTMLprojectTitle.replace("%data%",projectArray["title"]);
            const newHTMLprojectDates = HTMLprojectDates.replace("%data%",projectArray["dates"]);
            const newHTMLprojectDescription = HTMLprojectDescription.replace("%data%",projectArray["description"]);
            $('.project-entry').append(newHTMLprojectTitle,newHTMLprojectDates,newHTMLprojectDescription);
            for (let i=0;i<projectArray["images"].length;i++) {
              const newHTMLprojectImage = HTMLprojectImage.replace("%data%",projectArray.images[i]);
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
      const $name = $('#name');
      const iName = inName($name.text()) || function(){};
      $name.html(iName);
    });
   
  });