
//Need to declare variables:

var newBtn = "";
var postGif = "";
var makeBtn = "";
var length = 10;
var apiKey = "";
var topics = ["Princess Peach","Koopa","Toad","Wario","Yoshi","Mario","Luigi","Bowser"]
var topic = ""
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

        var appenderDiv = $("<div>");

        appenderDiv.attr("class", "apndDiv");

        $("#apndGifHere").prepend(appenderDiv)

        newRating = response.data[i].rating;
        postRating = $("<div>");
        postRating.html("Rated: "+newRating);
        postRating.attr("class", "gifRating");
        appenderDiv.append(postRating);

        newGifs = response.data[i].images.fixed_height_still.url;
        postGif = $("<img>");
        postGif.attr("src", newGifs);
        postGif.attr("alt", "a silly gif");
        postGif.attr("data-state", "still");
        postGif.attr("class", "postGif");
        appenderDiv.append(postGif);
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

  $(this).on("click",".postGif", function(){

    var state = $(this).attr("data-state")

    var src = $(this).attr("src")

    if (state === "still"){
      $(this).attr("src", src)
      $(this).attr("data-state","animate")
    } else {
      $(this).attr("src", src.replace('_s',''))
      $(this).attr("data-state","still")
    }
  });

});