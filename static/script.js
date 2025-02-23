$(function() {

    var closedCap=`<div class="col-sm capsule closedCap">
    <div>
         <svg xmlns="http://www.w3.org/2000/svg" width="300" height="156" viewBox="0 0 600 156" fill="none">
             <path d="M123 78C123 121.078 157.078 156 114 156C70.9218 156 36 121.078 36 78C36 34.9218 70.9218 0 114 0C157.078 0 123 34.9218 123 78Z" fill="#D9D9D9"/>
             <circle cx="486" cy="78" r="78" fill="#D9D9D9"/>
             <rect x="114" width="372" height="156" fill="#D9D9D9"/>
             <rect x="203" y="47" width="194" height="63" rx="15" fill="white"/>
             <line x1="457" x2="457" y2="156" stroke="#7E7E7E" stroke-width="2"/>
             <line x1="150" x2="150" y2="156" stroke="#7E7E7E" stroke-width="2"/>
             <path d="M73 78.5L18.25 117.904L18.25 39.0958L73 78.5Z" fill="#D9D9D9"/>
             <path d="M527 78.5L581.75 39.0958V117.904L527 78.5Z" fill="#D9D9D9"/>
   
             <text x="300" y="88" font-family="Arial" font-weight="bold" font-size="23" fill="black" text-anchor="middle">
               
         </svg>
   
         <div class="capDetails">
         <p class="h6Cap">Date published:<span class="capUserDetails" style="display: none;"> </span><span class="capUserDetails2"> </span></p>
         <p class="h6Cap">Open date:<span class="capUserDetails" style="display: none;"> </span><span class="capUserDetails2"> </span></p>
         <p class="h6Cap">Name:<span class="capUserDetails"> </span></p>
         <p class="h6Cap">Description:<span class="capUserDetails"> </span></p>
         <p class="h6Cap">Capsule Id:<span class="capUserDetails"> </span></p>
         </div>
       </div>
   
       </div>`

       var openedCap=`<div class="col-sm capsule openedCap">
       <div>
       <svg xmlns="http://www.w3.org/2000/svg" width="300" height="156" viewBox="0 35 635 242" fill="none" class="openedCapSvg" data-toggle="modal" data-target="#exampleModal2">
       <path d="M82.3678 111.857C42.5726 128.351 23.3607 173.204 6.86611 133.409C-9.62849 93.6134 9.26041 47.9815 49.0556 31.4869C88.8509 14.9923 134.483 33.8812 150.977 73.6764C167.472 113.472 122.163 95.3621 82.3678 111.857Z" fill="#D9D9D9"/>
       <circle cx="521" cy="164" r="78" fill="#D9D9D9"/>
       <rect x="149" y="86" width="372" height="156" fill="#D9D9D9"/>
       <rect x="238" y="133" width="194" height="63" rx="15" fill="white"/>
       <line x1="492" y1="86" x2="492" y2="242" stroke="#7E7E7E" stroke-width="2"/>
       <line x1="185" y1="86" x2="185" y2="242" stroke="#7E7E7E" stroke-width="2"/>
       <path d="M62.761 65.8586L5.39612 30.3689L78.1985 0.193281L62.761 65.8586Z" fill="#D9D9D9"/>
       <path d="M562 164.5L616.75 125.096V203.904L562 164.5Z" fill="#D9D9D9"/>

       <text x="335" y="175" font-family="Arial" font-weight="bold" font-size="23" fill="black" text-anchor="middle">
               00:00:00:00:00:00
       </svg>

       <div class="capDetails">
       <p class="h6Cap">Date published:<span class="capUserDetails" style="display: none;"> </span><span class="capUserDetails2"> </span></p>
       <p class="h6Cap">Open date:<span class="capUserDetails" style="display: none;"> </span> <span class="capUserDetails2"> </span> </p>
       <p class="h6Cap">Name:<span class="capUserDetails"> </span></p>
       <p class="h6Cap">Description:<span class="capUserDetails"> </span></p>
       <p class="h6Cap">Capsule Id:<span class="capUserDetails"> </span></p>
       
         </div>
         </div>
  
       </div>
         `
  
//____________________________________________________________________________

    function formatWithLeadingZero(number) {
      return number < 10 ? `0${number}` : number.toString();
    }

    function getTimeDifference(timestamp) {
    
      const parsedUtcTime = new Date(timestamp);
      
      const offsetPattern = /([+-])(\d{2})(\d{2})$/;
      const match = timestamp.match(offsetPattern);
      if (!match) {
          throw new Error('Invalid timestamp format');
      }
  
      const sign = match[1] === '+' ? 1 : -1;
      const offsetHours = parseInt(match[2], 10) * sign;
      const offsetMinutes = parseInt(match[3], 10) * sign;
  
      const localTime = new Date(parsedUtcTime.getTime() + offsetHours * 60 * 60 * 1000 + offsetMinutes * 60 * 1000);
      
      const currentUTC = new Date();
      const currentTimeInTimeZone = new Date(currentUTC.getTime() + offsetHours * 60 * 60 * 1000 + offsetMinutes * 60 * 1000);
  
  
      // Calculate the difference in milliseconds
      const differenceInMilliseconds =  localTime - currentTimeInTimeZone;
  
      return differenceInMilliseconds;
  }
  
  
  
  

  

//____________________________________________________________________________

   function formatDate(utcTime){
             
              const timeDifferenceInMilliseconds = getTimeDifference(utcTime);
              
              
              const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
              const minutes = Math.floor(seconds / 60);
              const hours = Math.floor(minutes / 60);
              const days = Math.floor(hours / 24);
              const months = Math.floor(days / 30); 
              const years = Math.floor(months / 12); 

              const remainingMonths = months % 12 ;
              const remainingDays = days % 30 ; 
              const remainingHours = hours % 24 ;
              const remainingMinutes = minutes % 60;
              const remainingSeconds = seconds % 60 ;

              const formattedYears = formatWithLeadingZero(years);
              const formattedMonths = formatWithLeadingZero(remainingMonths);
              const formattedDays = formatWithLeadingZero(remainingDays);
              const formattedHours = formatWithLeadingZero(remainingHours);
              const formattedMinutes = formatWithLeadingZero(remainingMinutes);
              const formattedSeconds = formatWithLeadingZero(remainingSeconds);

              const formattedTimeDifference = `${formattedYears}:${formattedMonths}:${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

              return formattedTimeDifference
   }

//____________________________________________________________________________

function formatDateString(inputString) {
  
  const date = new Date(inputString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedString = `${year}-${month}-${day} at ${hours}:${minutes}`;

  return formattedString;
}



   function formateDetails(capsule,element){
    capsule.find('.capDetails .capUserDetails2').eq(0).text(formatDateString(element[5]));
    capsule.find('.capDetails .capUserDetails2').eq(1).text(formatDateString(element[4]));

    capsule.find('.capDetails .capUserDetails').eq(0).text(element[5]);
    capsule.find('.capDetails .capUserDetails').eq(1).text(element[4]);
    capsule.find('.capDetails .capUserDetails').eq(2).text(element[1]);
    capsule.find('.capDetails .capUserDetails').eq(3).text(element[2]);
    capsule.find('.capDetails .capUserDetails').eq(4).text(element[0]);

    return capsule
   }

   function getTZ(){

        let date = new Date();
        let timezoneOffset = date.getTimezoneOffset();
        let offsetHours = parseInt(-timezoneOffset / 60);
        let offsetMinutes = Math.abs(timezoneOffset % 60);
        let timezoneString = (offsetHours >= 0 ? '+' : '-') +
                            (Math.abs(offsetHours) < 10 ? '0' : '') + Math.abs(offsetHours) +
                            ':' +
                            (offsetMinutes < 10 ? '0' : '') + offsetMinutes;
        return encodeURIComponent(timezoneString);

   }
//____________________________________________________________________________
//____________________________________________________________________________

function repeatFunction() {
  var capsules=$('.capRow').find('.capsule')
  
  capsules.each(function(index, capsule) {
    capsule=$(capsule)
    
    if (capsule.find('svg text').eq(0).text().trim()!='00:00:00:00:00:00'){
    var utcTime=capsule.find('.capDetails .capUserDetails').eq(1).text();
    capsule.find('svg text').text(formatDate(utcTime))
    
  }
  })
  
}
setInterval(repeatFunction, 1000);



//____________________________________________________________________________
//____________________________________________________________________________
//____________________________________________________________________________


$(document).on("click", ".openedCapSvg", function(){

  var capsule = $(this).closest('.capsule').find('.capDetails .h6Cap');
  var modalDetails= $('.capDetailsContent .h6Cap');

  for(var i =0; i<2; i++){
    $(modalDetails[i]).find('.capUserDetails').text($(capsule[i]).find('.capUserDetails2').text())
        
}

  for(var i =2; i<capsule.length; i++){
      $(modalDetails[i]).find('.capUserDetails').text($(capsule[i]).find('.capUserDetails').text())
          
  }

  var id=$(capsule[4]).find('.capUserDetails').text().trim();

  var formData=`searchBy=6964&search=${id}&request=getContent`
  $.ajax({
    type: "POST", 
    url: "/search", 
    data:formData+"&zone="+getTZ(),
    success: function(response) {

      var content = JSON.parse(response)
      $('.contentArea').text(content)
       
    },
    error: function(xhr, status, error) {
      // Handle any errors here
      console.error(xhr.responseText);
    }
  });
 

})

//____________________________________________________________________________

    $(".all").click(function() {
    $("#spinner").show(); // Show spinner

    // Send an AJAX request
    $.ajax({
        type: "POST",
        url: "/getCaps",
        data: "&zone=" + getTZ(),
        success: function(response) {
            $(".capRow").empty();
            var array = JSON.parse(response);

            array.forEach(function(element) {
                var capsule;
                if (element[6] == 'opened') {
                    capsule = $(openedCap);
                } else {
                    capsule = $(closedCap);
                    capsule.find('svg text').text(formatDate(element[4]));
                }
                $(".capRow").append(formateDetails(capsule, element));
            });

            $("#spinner").hide(); // Hide spinner after content loads
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            $("#spinner").hide(); // Hide spinner even if there's an error
        }
    });
});
//____________________________________________________________________________

    $(".closed").click(function() {
  
    
      // Send an AJAX request
      $.ajax({
        type: "POST", 
        url: "/getClosedCaps", 
        data:"&zone="+getTZ(),
        success: function(response) {

          $(".capRow").empty();

          var array = JSON.parse(response);
          array.forEach(function(element) {

            var capsule = $(closedCap);

            capsule.find('svg text').text(formatDate(element[4]))

            $(".capRow").append(formateDetails(capsule,element));
            
        })
           
        },
        error: function(xhr, status, error) {
          // Handle any errors here
          console.error(xhr.responseText);
        }
      });

  })
//____________________________________________________________________________

    $(".opened").click(function() {
  
      // Send an AJAX request
      $.ajax({
        type: "POST",
        url: "/getOpenedCaps",
        data:"&zone="+getTZ(),
        success: function(response) {

          $(".capRow").empty();

          var array = JSON.parse(response);
          array.forEach(function(element) {

          var capsule = $(openedCap);

          $(".capRow").append(formateDetails(capsule,element));

          })
           
        },
        error: function(xhr, status, error) {
          // Handle any errors here
          console.error(xhr.responseText);
        }
      });

  })

//____________________________________________________________________________

    $("#createCapsuleForm").on("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Serialize form data
      var formData = $(this).serialize();
       
      // Send an AJAX request
      $.ajax({
        type: "POST",
        url: "/",
        data: formData+"&zone="+getTZ(),
        success: function(response) {
          
          console.log(response);
          
          $("#closeModal").click();
          location.reload();
          
        },
        error: function(xhr, status, error) {
          // Handle any errors here
          console.error(xhr.responseText);
        }
      });
    });

//____________________________________________________________________________

    $(".searchBar").on("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      var radioButtons = $("[id=search-option]");
      var selectedOption

      radioButtons.each(function(index, element) {
    if (element.checked) {
        // The radio button with index i is selected
        selectedOption = element.value;
        
    }
})

var formData = $(this).serialize().toString()+"&searchBy="+selectedOption;
  
// Send an AJAX request
$.ajax({
  type: "POST", 
  url: "/search", 
  data: formData+"&zone="+getTZ(),
  success: function(response) {
    $(".capRow").empty();

    var array = JSON.parse(response);
    array.forEach(function(element) {

      if (element[6]=='opened'){

      var capsule = $(openedCap);
    }
    else{
      var capsule = $(closedCap);
      
      capsule.find('svg text').text(formatDate(element[4]))
    }

    $(".capRow").append(formateDetails(capsule,element));
  })
  },
  error: function(xhr, status, error) {
    // Handle any errors here
    console.error(xhr.responseText);
  } });

    
    });

//____________________________________________________________________________
//____________________________________________________________________________
//____________________________________________________________________________
         
    $(".all").click();
    $("#search-option").click();
      
});
