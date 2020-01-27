Software Requirements
Vision
Our vision is to create a functional and smoothly rendered application for the finding of local restaurants
and inputting data about those restaurants, and then retrieving, editing, deleting and sorting the input data.

What pain point does this project solve?
This solves a pain point for the user by allowing overworked codefellows students who are exhausted to quickly
find new restaurants, and save / retrieve data on current restaurants.

Why should we care about your product?
If you are someone who values your time and great food, you would love our app!

Scope (In/Out)
IN - 
The app will provide information to the user about local eateries.
The app will provide directions to each destination.
Users will be able to like and save their favorite eateries.
Each eatery will have data for the user like walk time, price, and rating

OUT -
For our first attempt, this will not be an Android or IOS app, and we will not have funcionality between users. 

MVP Functionality
Minimum MVP would be using api's to give data on local eateries, have an intake form saving info to a database, 
and render saved data to a new page.

Stretch
What stretch goals are you going to aim for?
-Add a like feature
-Create an admin login

Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:

A user can freely move between pages
A user will be presented with a list of restaurants based on their input.
A user will be presented with links for each restaurant.
A user will be given directions to each restaurant.

Data Flow
Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.
When the user lands on the index page, they will be presented with beutiful backdrop of the area, 
and possibly an embedded video. On the lower part of the page, the user will see information about local restaurants. 
They will then clock to proceed to the next page. 
On page 2, the user will be able to use forms to select parameters 
like walk time and price, and the click on <Go!> to proceed. 
On page 3, the user will be presented with a map and a list of rendered eateries that they can scroll through in a side-bar.
In the header, there will be functional icons and a hamburger menu that will take the user to a different part of the 
app or an external link. Also, the user will be presented with a great sight and sound experience as the move through the application. 

Non-Functional Requirements
Security - We will use a .env file to obscure our keys
Scaleability - Our code base will be created with scaleability in mind so we can add new features in the future.
Availability - We will test our application across different screen sizes to ensure that it is useable and responsive on most platforms.
