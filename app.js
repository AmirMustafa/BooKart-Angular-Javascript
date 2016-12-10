var app = angular.module("bookart", ["ngRoute", "ngAnimate"]);		/*Dependency modules are ngRoute and ngAnimate*/


app.config(function ($routeProvider) {								/*config file is for routing*/ 
	$routeProvider 
		.when("/books",												//When book is clicked(from line 96 index.html)
			{
				templateUrl: "book-list.html",						//This partial is called
				controller: "BookListCtrl"							// This controller is called for book
			})
		.when("/kart", 
			{
				templateUrl: "kart-list.html",						//When kart is clicked(from line 97 index.html)
				controller: "KartListCtrl"							// This controller is called for kart							
			})
		.otherwise({												//For others whatever user tries via url --> redirectto the index.html page
			redirectTo: "/books"
		})
});
														//Factories are created and passed in its controller
app.factory("bookService", function () {				//Whenever there is dependency we write service/factory
	var books = [										//here dependency between BookListCtrl and KartListCtrl
		{										//Data of Books are written here accessed in index.html (line 28 to 36)
			imgUrl: "adultery.jpeg",
			name: "Adultery",
			price: 205,
			rating: 4,
			binding: "Paperback",
			publisher: "Random House India",
			releaseDate: "12-08-2014",
			details: "Linda, in her thirties, begins to question the routine and predictability of her days. In everybodys eyes, she has a perfect life-happy marriage, children and a career. Yet what she feels is an eno... <a href='#'>View More<a>"
		},
		{
			imgUrl: "geronimo.jpeg",
			name: "Geronimo Stilton Spacemice#2 : You're Mine, Captain!",
			price: 168,
			rating: 5,
			binding: "Paperback",
			publisher: "Scholastic",
			releaseDate: "01-07-2014",
			details: "Geronimo Stilton meets outer space in this cosmically fun spin-off series!Meet Geronimo StiltonixHe is a spacemouse - the Geronimo Stilton of a parallel universe! He is captain of the spaceship Mou... View More"
		},
		{
			imgUrl: "life-or-death.jpeg",
			name: "Life or Death",
			price: 339,
			rating: 4,
			binding: "Paperback",
			publisher: "Hachette India",
			releaseDate: "01-04-2014",
			details: "Why would a man escape from prison the day before he's due to be released? Audie Palmer has spent a decade in prison for an armed robbery in which four people died, including two of his gang. Five... View More"
		},
		{
			imgUrl: "playing.jpeg",
			name: "Playing It My Way : My Autobiography",
			price: 599,
			rating: 5,
			binding: "Hardcover",
			publisher: "Hodder & Stoughton",
			releaseDate: "01-08-2014",
			details: "I knew that if I agreed to write my story, I would have to be completely honest, as thats the way I have always played the game and that would mean talking about a number of things I have not addr... View More"
		},
		{
			imgUrl: "the-fault.jpeg",
			name: "The Fault in Our Stars",
			price: 227,
			rating: 4.5,
			binding: "Paperback",
			publisher: "Penguin Books Ltd",
			releaseDate: "25-01-2013",
			details: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist n... View More"
		},
		{
			imgUrl: "wings-of-fire.jpeg",
			name: "Wings of Fire: An Autobiography",
			price: 124,
			rating: 5,
			binding: "Paperback",
			publisher: "Universities Press",
			releaseDate: "25-08-2000",
			details: "Wings of Fire traces the life and times of India's former president A.P.J. Abdul Kalam. It gives a glimpse of his childhood as well as his growth as India's Missile Man. Summary of the Book Wings... View More"
		}
	];

	return {
		getBooks: function () {						//So these functions are used to access from its controller
			return books;
		},

		addToKart: function(book) {

		}
	}
});
																//Factory for Kart and passed in controller
app.factory("kartService", function () {				        
	var kart = [];											    //Empty kart is created where we push the data

	return {
		getKart: function() {
			return kart;
		},
		addToKart: function(book) {				//When addToKart function is called from BookListCtrl, this function gets fired
			kart.push(book);					//Therefore data is pushed into the kart array
		},
		buy: function(book) {					//When buy function is called from KartListCtrl,  ThankYou alert message displayed
			alert("Thanks for buying !! ", book.name);
		}
	}
})
																//HEADER CONTROLLER
app.controller("HeaderCtrl", function ($scope, $location) {  //$location is used to access current link eg. #/books or #/kart
	$scope.appDetails = {									//Message of Controller defined in index.html (line 82 and 83)
		title: "BooKart",
		tagline: "We have collection of 1 Million books"
	};

	$scope.nav = {};							//This is the function for showing active links in header
	$scope.nav.isActive = function (path) {
		if (path === $location.path()) {		//whatever path is true, that will be active
			return true;
		}
		return false;							// The other one is not active
	}
});
												// factory named bookService and kartService passed 
app.controller("BookListCtrl", function ($scope, bookService, kartService) {	//BOOKLISTCONTROLLER
	$scope.books = bookService.getBooks();							//getBooks is function defined in factory (line 86)

	$scope.addToKart = function (book) {					//On click of add to kart-->kart factory/service is called (line 103)
		kartService.addToKart(book);
	}
});
												//factory named kartService passed 
app.controller("KartListCtrl", function ($scope, kartService) {					//KARTLISTCONTROLLER
	$scope.kart = kartService.getKart();			

	$scope.buy = function (book) {				//When user click buy function, buy function is called
		// console.log("buy ", book);			

		$scope.buy = kartService.buy(book);		//so calling the buy function from kartService factory
	}
});