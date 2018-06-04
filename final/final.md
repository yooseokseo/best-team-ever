# Team Members:
- Lindy Wong
- Mayreni Abajian
- Peem Takoonsawat
- Yooseok Seo

# Contributions

**Lindy**:
- created paper UX/UI version of initial app
- explained UX/UI developments in milestone markdown files
- implemented help.handlebars page
- edited and recorded voice-over for demo video
- created pill icons

**Mayreni**:
- implemented account settings page in settings.handlebars
- implemented edit account info page in editAccountInfo.handlebars (file revoked)
- implemented changePassword.handlebars
- implemented functionality in addNewMed.js and addNewMed.handlebars to autofill Medicine name with data API
- implemented UI skeleton

**Peem**:
  - Created entire backend
  - Linked backend w/ frontend
  - All files in rest_api folder
  - All files in routes folder
  - Most of the files in static_files/js folder
  - A few files in views folder

**Yooseok**:
  - Most of the files in views folder
  - addNewMed Page layout(HTML/CSS)
  -	addNewProfile Page layout(HTML/CSS)
  -	home Page layout(HTML/CSS)
  -	login Page layout(HTML/CSS)
  -	noUserProfile Page layout(HTML/CSS)
  -	viewAllMed Page layout(HTML/CSS)
  -	viewHistory Page layout(HTML/CSS)
  -	viewPillDetail Page layout(HTML/CSS)
  -	viewProfile Page layout(HTML/CSS)
  -	Implemented Add new profile functionality
  -	Implemented display functionality that shows all medicines for a specific profile user
  -	Implemented profile Selection functionality
  -	Implemented display functionality that shows whether a user takes assigned pills or not
  -	Implemented notification functionality
  -	Implemented Service worker
  -	Making Database Schema (Users, Profiles, Medicine, History)



# Source code tree
<pre>
|-- COGS 121 - HCI Programming Studio
	|-- app.js 			
	|-- server.js                                   : Hosts and runs the server
	|-- rest_api
	|   |-- controllers
	|   |   |-- accounts.js  			: REST API controller for dealing with all requests related to account
	|   |   |-- history.js 				: REST API controller for dealing with all requests related to history
	|   |   |-- medicine.js 			: REST API controller for dealing with all requests related to medicine
	|   |   |-- profiles.js 			: REST API controller for dealing with all requests related to profile
	|   |   |-- accounts.js                         : REST API controller for handling accounts related requests
	|   |   |-- history.js                          : REST API controller for handling history related requests
	|   |   |-- medicine.js                         : REST API controller for handling medicine related requests
	|   |   |-- profiles.js                         : REST API controller for handling profile related requests
	|   |-- database
	|   |   |-- create_database.js 			: create the initial database as the users.db file
	|   |-- middleware
	|   |   |-- check-auth.js 			: Middleware file for checking user authentication
	|   |-- routes
	|       |-- accounts.js 			: list all of routes for all requests related to account
	|       |-- history.js 				: list all of routes for all requests related to history
	|       |-- medicine.js 			: list all of routes for all requests related to medicine
	|       |-- profiles.js 			: list all of routes for all requests related to profile
	|-- routes
	|   |-- accounts.js 				: contains all functionality for all requests related to account
	|   |-- extra.js				: contains all functionality for extra stuff
	|   |-- history.js				: contains all functionality for all requests related to medicine
	|   |-- medicine.js				: contains all functionality for all requests related to medicine
	|   |-- profiles.js				: contains all functionality for all requests related to profile
	|   |   |-- check-auth.js                       : Check user's JWT for authentication
	|   |-- routes
	|       |-- accounts.js                         : REST API route to handle accounts related requests
	|       |-- history.js                          : REST API route to handle history related requests
	|       |-- medicine.js                         : REST API route to handle medicine related requests
	|       |-- profiles.js                         : REST API route to handle profile related requests
	|-- routes
	|   |-- accounts.js                             : Route to render all accounts related pages
	|   |-- extra.js                                : Route to render all extra front end pages
	|   |-- history.js                              : Route to render all history related frontend pages
	|   |-- medicine.js                             : Route to render all medicine related frontend pages
	|   |-- profiles.js                             : Route to render all profile related frontend pages
	|-- static_files
  	|   |-- notification.html 			: Page for notification settings
    	|   |-- sw.js                   		: adding event handler into service worker
	|   |-- css
	|   |   |-- main.css   				: css style for entire project
	|   |   |-- modal.css  				: css style for only modal
	|   |-- js
	|       |-- addNewMed.js 			: User adds new medication by filling in several fields in the form, New med is added database.
	|       |-- addNewProfile.js 			: Adding a new profile functionality
	|       |-- changePassword.js 			: Given user's old password, user's password is changed to a new one.
	|       |-- editMedicine.js 			: Medicine's info is edited by user with updated data
	|       |-- history.js 				: Shows list of current medications
	|       |-- home.js  				: Switching home view between yesterday, today and tomorrow
	|       |-- login-signup.js 			: User's login credidentials are checked for authorization before entry to the app
	|       |-- main.js 				: Going to previous page a user visited, Dropdown navigation
	|       |-- notify.js 				: Requesting permission to show notifications
  	|       |-- render.js 				: function to allow rendering page with post request
  	|       |-- settings.js 			: Account settings page
	|       |-- viewHistoryDetail.js 		: View pill history for a single medication
	|       |-- viewPillDetail.js 			: Option to delete the pill on pill detail page
	|       |-- viewProfile.js 			: View a user profile, option to edit info or delete the profile
	|-- views
		|-- addNewMed.handlebars		: Page where users can add information for new medication
		|-- addNewProfile.handlebars		: Page for users to add information and create new profile
		|-- changePassword.handlebars		: Page where user can change their password
		|-- editMedicine.handlebars		: Page where users can edit information for their medication
		|-- error.handlebars			: Page that displays errors
		|-- help.handlebars			: Page with some questions and answers to help users
		|-- home.handlebars			: Home page that displays upcoming medication for default profile
		|-- login.handlebars			: Page where users can login or sign up
		|-- noUserProfile.handlebars		: Page that shows users they have no profiles
		|-- settings.handlebars			: Page where user can view/edit account info or change password
		|-- viewAllMed.handlebars		: Page display selected profile's current medications
		|-- viewHistory.handlebars		: Page that prompts users to choose which profile history to view
		|-- viewHistoryDate.handlebars		: Page that displays profile's medication history by date
		|-- viewHistoryDateDetail.handlebars	: Page that displays profile's medication history by day in more detail
		|-- viewHistoryDetail.handlebars	: Page that displays profile's medication history with pill details
		|-- viewPillDetail.handlebars		: Page that displays selected pill information
		|-- viewPillHistory.handlebars		: Page that show selected pill's history of intake
		|-- viewProfile.handlebars		: Page for user to view a selected profile
		|-- viewProfileHistory.handlebars	: Page for user to the medication history of a profile
		|-- viewProfiles.handlebars		: Page for user to view and manage profiles
		|-- layouts
		|   |-- main.handlebars			: Page for a general layout
		|-- partials
			|-- delete_modal.handlebars	: Page for deleting a modal
			|-- header.handlebars		: Page for header section
			|-- history_modal.handlebars	: Page for history modal
			|-- navigation.handlebars	: Page for navigation section
			|-- nonscript.handlebars	: Display a message if JS has been disabled on the browser
			|-- post.handlebars		: Page for posting
			|-- script.handlebars		: Page for script section
</pre>

# Video
