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
	|-- server.js
	|-- rest_api
	|   |-- controllers
	|   |   |-- accounts.js
	|   |   |-- history.js
	|   |   |-- medicine.js
	|   |   |-- profiles.js
	|   |-- database
	|   |   |-- create_database.js
	|   |-- middleware
	|   |   |-- check-auth.js
	|   |-- routes
	|       |-- accounts.js
	|       |-- history.js
	|       |-- medicine.js
	|       |-- profiles.js
	|-- routes
	|   |-- accounts.js
	|   |-- extra.js
	|   |-- history.js
	|   |-- medicine.js
	|   |-- profiles.js
	|-- static_files
	|   |-- css
	|   |   |-- main.css
	|   |   |-- modal.css
	|   |-- js
	|       |-- addNewMed.js
	|       |-- addNewProfile.js
	|       |-- changePassword.js
	|       |-- editMedicine.js
	|       |-- history.js
	|       |-- home.js
	|       |-- login-signup.js
	|       |-- main.js
	|       |-- render.js
	|       |-- settings.js
	|       |-- viewAllMed.js
	|       |-- viewHistoryDetail.js
	|       |-- viewPillDetail.js
	|       |-- viewProfile.js
	|       |-- viewProfiles.js
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
