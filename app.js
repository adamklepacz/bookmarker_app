//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
window.addEventListener('load', fetchBookmarks);

function saveBookmark(e) {
	//Get form element
	var myForm = document.getElementById('myForm');
	//Get form values
	var siteName = document.getElementById('siteName').value,
			siteUrl = document.getElementById('siteUrl').value;
	
	//check if validation was correct
	if(!validation(siteName, siteUrl)) {
		return false;
	}
	
	var	bookmark = {
			siteName: siteName,
			url: siteUrl
		};
	
	if (localStorage.getItem('bookmarks') === null) {
		//Init array
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//get items from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Addd bookmark to array
		bookmarks.push(bookmark);
		//re-set it to localstorage;
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
		
	//Prevent form from submitting
	e.preventDefault();
	
	//Reset form after submittting
	myForm.reset();
	
	//Fetch bookmarks
	fetchBookmarks();
}

function deleteBookmark(url) {	
	//get current bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	//loop over all bookmarks and check if url matches
	for(var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			//remove from array when url matches
			bookmarks.splice(i, 1);
		}
	}
	//Re-set localstorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	
	//Re-fetch bookmarks
	fetchBookmarks();
}

function fetchBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
	
	//get output id
	var result = document.getElementById('bookmarksResults');
	
	result.innerHTML = '';
	//build html result
	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].siteName;
		var url = bookmarks[i].url; 
		
		result.innerHTML += '<div class="well">' + 
												'<h3 class="display-3">' + name + 
												'</h3>' +
												'<a class="btn btn-primary target="_blank" href="' + url + '" style="margin-right: 10px;">Visit</a>' +
												'<a onclick="deleteBookmark(\`'+url+'\`)" class="btn btn-danger" href="#"' + url + '">Delete</a>' +
												'</div';
	}
}

function validation(siteName, siteUrl) {
	//Simple validation of form
	//if there is no siteName or siteUrl passed stop from running
	if(!siteName || !siteUrl) {
		alert('Please fill the form');
		return false;
	}
	
	//URL validation
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if(!siteUrl.match(regex)) {
		alert('Please use a valid URL');
	}
	
	return true;
}

