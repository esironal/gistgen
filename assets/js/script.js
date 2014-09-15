jQuery(function(){
	var github_username = 'cdmedia';
	var github = 'https://api.github.com/users/'+github_username+'/gists';
	var github_html_url = 'https://gist.github.com/'+github_username;

	// get main github json
	$.getJSON(github, function (data) {
		var gists = [];
		var categories = [];

		// loop through the gists
		$.each(data, function (key, gist) {
			var gistUrl = gist.url;

			// parse the gist json
			$.getJSON(gistUrl, function (gistdata) {
				var gist_avatar = gistdata.owner.avatar_url;
				var gist_owner = gistdata.owner.login;

				// TODO: Get gist content
				$('#gist_title').append('<i class="fa fa-code"></i><h2>' + gistdata.description + '</h2>');
				$('#gist_owner').html(gist_owner);
				$("#gist_avatar").attr('src', gist_avatar);
				$('#gist_user_link').attr('href', github_html_url);

				//debug
				//console.log(gistdata);	
			});
			
			// loop through file info to get categories
			$.each(gist.files, function (key, file){
				categories.push('<li>' + file.language + '</li>');
				// TODO: Build links to gist
			});
		});
		// get unique categories and build categories links
		categories = $.unique(categories);
		$("<ul/>", {
			"class" : "categories",
			html: categories.join("")
		}).appendTo("#sidebar");

	});

	// image error and loading handling
	$('img').error(function(){
        $(this).html('src', 'spinner.gif');
	});
	
});