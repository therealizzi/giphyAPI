
//These are the global variables
var newBtn = "";
var postGif = "";
var makeBtn = "";
var length = 10;
var apiKey = "";
var response = "";
var topics = ["Princess Peach","Koopa","Toad","Wario","Yoshi","Mario","Luigi","Bowser"];
var topic = "";
var callURLa = "http://api.giphy.com/v1/gifs/search?q=";
var callURLb = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

//This starts the program, once the DOM is loaded
$(document).ready(function(){
  displayButtons()
  });

//This displays the buttons on the screen
function displayButtons(){

  for (i = 0; i < topics.length; i++) {
    var makeBtn = $("<button>");
    makeBtn.text(topics[i]);
    makeBtn.attr("id", topics[i]);
    makeBtn.attr("class", "getgifs");
    $("#apndBtnHere").prepend(makeBtn); 
  };
}; 

//This onclick event pulls gifs from the url
$(document).on('click','.getgifs', function(event){

  //This gets the id of the button pressed
  topic = $(this).attr("id");

  //This calls the API for the id of the button ("topic")
  function getData(yt_url, callback) {
    $.ajax({
      url : yt_url,
      method : "GET",
      success: callback,
    });
  }
  
  //This syncs api results with the global 'response' variable
  getData(callURLa+topic+callURLb, function(output){
    window.response = output;
    apndGif();
  });
});

//This appends gifs to the DOM
function apndGif(){

  //This clears any existing gifs
  $("#apndGifHere").html("");

    //This loops through the display object 
    for (i = 0; i < length; i++) {

      //This creates jquery HTML to display the object
      var appenderDiv = $("<div>");
      appenderDiv.attr("class", "apndDiv");
      $("#apndGifHere").prepend(appenderDiv)

      //This selects which gif to display and wraps it in an 'img' tag
      newGifs = response.data[i].images.fixed_height_small_still.url;
      postGif = $("<img>");
      postGif.attr("src", newGifs);
      postGif.attr("alt", "a silly gif");
      postGif.attr("data-state", "still");
      postGif.attr("class", "postGif");
      appenderDiv.append(postGif);

      //This selects which rating to display and wraps it in a 'div' tag
      newRating = response.data[i].rating;
      postRating = $("<div>");
      postRating.html("Rated: "+newRating);
      postRating.attr("class", "gifRating");
      appenderDiv.append(postRating);
    };
};

//This makes new buttons
function createBtn(){
  var makeBtn = $("<button>"+newBtn+"</button>");
  makeBtn.attr("id",newBtn)
  makeBtn.attr("class", "getgifs")
  $("#apndBtnHere").prepend(makeBtn);
};

//This takes the user input and stores the value
$(".newBtn").click(function(){
  newBtn = $("#btnValue").val();
  topics.push(newBtn);
  createBtn();
});

//This stops the dom reload on the form submission
$(".newBtn").click(function(e){
  e.preventDefault();
});

//This changes the data-state of the gif
$(document).on("click",".postGif", function(){

  var state = $(this).attr("data-state");
  var src = $(this).attr("src");

  if (state === "still"){
    $(this).attr("src", src.replace('100_s','100'))
    $(this).attr("data-state","animate")
  } else {
    $(this).attr("src", src.replace('100','100_s'));
    $(this).attr("data-state","still")
  }
});