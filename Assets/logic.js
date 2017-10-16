
//Need to declare variables:

var newBtn = "";
var newGifd = "";
var newGifs = "";
var postGif = "";
var makeBtn = "";
var length = 10;
var apiKey = "";
var topics = ["Mario","Luigi","Bowser"]
var topic = "bats"
var callURLa = "http://api.giphy.com/v1/gifs/search?q="
var callURLb = "&api_key=dc6zaTOxFJmzC&limit=10"
var callURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10"


//Need a loop to append buttons for each string in topics[]

$(document).ready(function(){

  for (i = 0; i < topics.length; i++) {
    var makeBtn = $("<button>");
    makeBtn.text(topics[i]);
    makeBtn.attr("id", topics[i]);
    makeBtn.attr("class", "getgifs");
    $("#apndBtnHere").prepend(makeBtn); 
  }

  //Need an onclick event to trigger ajax call and pull data and assign to var newGif

  console.log(callURL)

  $(document).on('click','.getgifs',function(event){

    //Need to get the id of the button and use it to find the topic to search
    topic = $(this).attr("id")

    //Need an ajax call to the URL to pull in gifs
    $.ajax({
      url : callURLa+topic+callURLb,
      method : "GET"
    }).done(function(response){

      console.log(response)

    //Need to clear the existing gifs to make room for the new ones
    $("#apndGifHere").html("");

      for (i = 0; i < length; i++) {

        var appenderDivO = $("<div>");
        var appenderDivC = $("</div>");

        appenderDivO.attr("class", "apndDiv");

        $("#apndGifHere").append(appenderDivO)

        newRating = response.data[i].rating;
        postRating = $("<div>");
        postRating.html("Rated: "+newRating);
        postRating.attr("class", "gifRating");
        appenderDivO.append(postRating);

        newGifd = response.data[i].images.fixed_height_small.url;
        newGifs = response.data[i].images.fixed_height_small_still.url;
        postGif = $("<img>");
        postGif.attr("src", newGifs);
        postGif.attr("alt", "a silly gif");
        postGif.attr("class", "postGif");
        appenderDivO.append(postGif);

        postRating.append(appenderDivC);

      }
    });
  });

  //Need a "createBtn()" function to generate buttons

  function createBtn(){
    var makeBtn = $("<button>"+newBtn+"</button>");
    makeBtn.attr("id",newBtn)
    makeBtn.attr("class", "getgifs")
    $("#apndBtnHere").prepend(makeBtn);
  };

  //Need a button on('click') function to store the input value in a btnValue variable and trigger next function "createBtn()"
  
  $(".newBtn").click(function(){
    newBtn = $("#btnValue").val();
    createBtn()
  });

  $(".gifRating").on("click", function(){

    var state = $(this).attr("data-state")

        console.log(state)

    if (state === "still"){
      $(this).attr("src", $(this).attr(newGifd))
      $(this).attr("data-state","animate")
    } else {
      $(this).attr("src",$(this).attr(newGifs))
      $(this).attr("data-state","still")
    }

  })


});