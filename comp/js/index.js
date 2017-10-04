$("#dropdown").on("change", function(){
	var selected = $("#dropdown option:selected").val();

var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
url += '?' + $.param({
  'api-key': "811f3df9ce3c4d5bb2ba5ee608d21bd3"
});
$.ajax({
  url: url,
  method: 'GET',

}).done(function(result) {
	$("header").addClass("minified");
	var count = 1;

  for (var i=0; i<result.results.length; i++){

  	if (count <= 12){
  	if (result.results[i].multimedia.length){
  	  	var pic = result.results[i].multimedia[4].url;	
  	  	var n = $("<div></div>");	
   		n.html('<div class="abstract">'+result.results[i].abstract+'</div>');
		n.addClass("img_class");
		n.css('background-image',"url("+pic+")");
		$(".newsBlock").append(n);
		$(count++);
		}
	}

	else {
		break;
	};
 
 };




}).fail(function(err) {
  throw err;
});

});