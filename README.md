# lunchbox
An app to help Codefellow students pick lunch. 

Collaborators:
Cait Rowland
Ken Dickey
Matthew Johnson

Wireframe
https://docs.google.com/document/d/1hq4M_KtpNEvarGNVprkY8tf16XGHjn5DZIzww7HpR3g/edit?usp=sharing

User Stories

View Local Restaurants - large
As a user, I would like to view local restaurants around campus.
	Feature Tasks: 
User can view a list of restaurants around Code Fellows from an API (Yelp)
User will have the ability to click to restaurant website to view additional info
User will be able to get directions to a restaurant 
	Acceptance Tasks: 
Ensure that the user is presented with all restaurant options in the area

Add Details - large
As a user, I would like to add details about local restaurants around campus including time to walk there, how long it took to get food and price. 
	Feature Tasks: 
Show a form that allows user to input walk time, wait time and price
Allow user to save the details of selected restaurant 
	Acceptance Tasks: 
Ensure that user is able to compile relevant info over time to refer back to

View Detailed List - small 
As a user, I would like to see a list of all the restaurants where details have been added 
	Feature Tasks: 
Render a full list of restaurants that have been added to a database with details 
	Acceptance Tasks: 
Ensure that the user is able to review a list of restaurants that have already been reviewed 
Add a like feature 
As a user, I would like the ability to favorite restaurants 
	Feature Tasks: 
Add a like button to restaurant options
Saved ‘liked’ restaurant to the database 
	Acceptance Tasks: 
Ensure that user is able to find their favorite restaurants easily 
Update Details - medium
As a user, I would like to update details about each restaurant when needed
	Feature Tasks: 
A button that takes the user to page to update details 
Shows form with current details populated, but ability to write in new info
	Acceptance Tasks: 
Allows user to keep details up to date 

Delete Restaurants -small 
As a user, I would like to delete restaurants from the list 
	Feature Tasks: 
User can delete restaurants from list/database
	Acceptance Tasks: 
Ensures that user can keep list up to date with restaurants that are open/haven’t moved



Database Entity-Relationship-Diagram

Restaurants 
Primary Key (datatype - #) 
Restaurant Name (datatype- string)
Restaurant Address (datatype -string)
Walk Time (datatype - #) 
Wait Time (datatype - #)
Price ( $)
  Category Id - Foreign (#)
  |
  V
  Categories 
  Category ID (datatype - #) 
  Category Type (datatype -string) 

