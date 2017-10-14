
//Need to declare variables:

var newBtn = "";
var newGif = "";
var postGif = "";
var makeBtn = "";
var length = 10;
var apiKey = "dc6zaTOxFJmzC";
var topics = ["Mario","Luigi","Bowser"]
var topic = "cats"
var callURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key="+apiKey+"&limit="+length

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

    $.ajax({
      url : callURL,
      method : "GET"
    }).done(function(response){

    $("#apndGifHere").html("");

      for (i = 0; i < length; i++) {

        newGif = response.data[i].images.fixed_height.url;
        postGif = $("<img>");
        postGif.attr("src", newGif);
        postGif.attr("alt", "a silly gif");
        $("#apndGifHere").prepend(postGif);

        newRating = response.data[i].rating;
        postRating = $("<il>");
        postRating.html("Rated: "+newRating);
        postRating.attr("class", "gifRating");
        $("#apndGifHere").prepend(postRating);
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

});