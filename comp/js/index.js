$( document ).ready(function(){
	var selected = $("#dropdown option:selected").val();
	if (selected == "sections"){
		selected = "home";
		apiCall(selected)
	}
});

$("#dropdown").on("change", function(){
	var selected = $("#dropdown option:selected").val();
	if (selected == "sections"){
		$(".newsBlock").remove();
		$("header").removeClass("minified");
	}
	else{
		apiCall(selected);
	}
})

apiCall = function(selected){
	var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
	url += '?' + $.param({
		'api-key': "811f3df9ce3c4d5bb2ba5ee608d21bd3"
	});
	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(result) {
		if (selected == "home"){
			populateDropdown(result)
		}
		else {
			populateArticles(result)
		}
	}).fail(function(err) {
		throw err;
	});
}

//Populating dropdown menu
var populateDropdown = function(result){
	var dropdown_items = result.results;
	for (i=0; i < dropdown_items.length; i++) {
		var dropdown = dropdown_items[i].section;
		var id = dropdown.replace(/[^a-z0-9]/gi,'');
		console.log(id);
			var select_cat = $("<option id="+dropdown+" value="+id.toLowerCase()+">"+dropdown+"</option>");
			var alreadyExists = document.getElementById(dropdown);
			if (!alreadyExists){
				$("#dropdown").append(select_cat);
			}
			else{
				null
			}
	}
};

// Watching for changes to poppulate appropriate articles
var populateArticles = function(result){
	console.log("hi");
	var results = result.results;
			$("header").addClass("minified");
	
			var count = 0;
	
			$(".newsBlock").html("");
			for (var i=0; i < results.length; i++){
				if (count <= 12){
					if (results[i].multimedia.length){
						var pic = results[i].multimedia[4].url;
						var abstract = results[i].abstract;
						var url = results[i].url;
						var newDiv = $("<div class='newsItem'></div>");	
						newDiv.html('<a href='+url+' target="_blank"><div class="abstract">'+abstract+'</div></a>');
	
						$("div.abstract").text(function(index, currentText) {
							return currentText.substr(0, 100) + "...";
						});
	
						newDiv.css('background-image',"url("+pic+")");
						$(".newsBlock").append(newDiv);
						$(count++);
					}
				}
				else {
					break;
				};
			}

};