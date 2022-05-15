# Front End Capstone

Hello! Welcome to our team's Front End Capstone, or FEC for short.

This was our first project as we entered the Senior Phase of the HackReactor Program. The goal of this project was to challenge, primiarly, our Front End Skills. The aim was to build a complex webpage that interacts with an API, server, and four widgets made by four different people while being thoroughly tested to ensure the best outcome. We had the oppurtunity to use some technologies including React, Jest, HTML, CSS, Axios, Express and, hopefully to no suprise, Javascript!

Our team was made up of:
* Ahmad Almomani, responsible for Product Overview.
* King-Man Chow, responsible for Related Products & Comparisons.
* Keegan Wolf, responsible for Question & Answers.
* Alex Belmonte, responsible for Ratings & Reviews.


### A note from Ahmad!

Do you want to take a quick look at the page? Checkout the Product Overview Image to see my front end contribution to the project!

* * * Set Up Instructions * * *

1. Create a file .env file. Make sure to add it to your .gitignore

2. Create a github token (to access the api content);

3. Add a single line with the below format

GIT_TOKEN='INSERT GIT TOKEN HERE'

4. Run the following commands in your terminal: npm install --> then split the terminal to show two terminal windows and run --> npm start

5. Take a look at our project at http://localhost:3000/

## Description

Specifically, what we built was a product page for an online storefront. It is complete with everything you might expect in a modern online retailer, like a product overview, see related items, a place to ask questions, and to see reviews. The page is fully interactive as well! You can click around the different styles, compare a related item to the current item, leave a question or answer, and even leave a review.

### Product Overview

The Product Overview Widget was made up of the Images Menu, Style and Add to Bag Selection Menu, and the general Product Description.

The Image Menu consists of the Central Image as well as the Image Wheel which can be found directly to the left of the large Central Image. The Image Wheel renders all the assocaited product images and allows the users to scroll through the images and select one to view as the Central Image. The selected image on the Image Wheel will have an underline to help represent which image is currently displayed. Also, the Image Wheel will allow you to scroll through additional images (if there are more than five) associated with the product. The scroll buttons are only present when there are additional images to view above or below the displayed images.

The Style and Add to Bag Selection Menu include a large amout of functionality. The user can select any of the unique styles which will update the Price, Style Name, the Image Wheel and Central Image. The user can then select a product size. Only avilable sizes will displayed and in the case of an item being out of stock the menu will display "Out Of Stock". Also, the size must be selected prior to the quantity selection in order to ensure that a given quantity for that item is available. Similar to the Size Menu, the Quantity Menu's display is based on availablity and it will display up to 15 items to select otherwise it will display up to the number of items available. Also, an "Add to Bag" button will show up as soon as the user selects a size and quantity. Lastly, the Star Selection Button allows for a user to add an item to the users "Outfit" which displays within the Related Products Widget.

Finally, the bottom of the page includes the general Product Description. This includes a description as well as a list of all the assocaited product features. This helps distinguish the unique aspects of each product and it's value to a user compared to another.

### Related Products & Comparisons

The Related Products & Comparisons widget was made up of two main parts, the related product list, and the your outfit list.

The related product list displays the products related to the current product. Each related product card has a star button, it displays a table to compare the characteristics of the current product and the product when clicked.

The your outfit list stores the products when the user clicked the "+" card inside the list or the heart button on the page. The user cannot add a similar product twice but they can delete the product from the list by clicking the "X" button at the top right corner of each card. The product data is persistent and will be stored in the local storage.

### Questions & Answers

The Questions & Answers widget was made up of three main parts, the container, the question list, and the individual questions.

The container holds the widget together and displays the search bar, question list, and buttons to interact with the question list. The search bar allows the user to search through the questions and, after three characters have been typed in, it will display any questions that matched the search string in the question list. Falling below three characters reverts the question list back to the original, full list of questions for the product. The buttons at the bottom of the container expand the question list to include two more quesitons at a time and also allows the user to add a question to the list.

The question list itself is made up of all the questions for the given product that the user is viewing. Each question has a "Q:" before it, then the first answer in the list is prefaced with "A:", with all the other answers falling below the first in line. The question list will expand quite a bit if the button to view more questions is clicked enough, so it turns into a scrollable widget once it has taken up the viewable portion of the screen.

The individual questions themselves allow for the greatest interaction within the Questions & Answers widget. Each question and answer is able to be voted as helpful, changing their ranking on the next page reload. Unlike questions, answers are able to be reported, so if they contain inaccurate information or otherwise unproductive text to the question, they can be removed and flagged for the site owners to review. Users can also add answers to a question containing their name, email, answer, and up to five photos. Lastly, they are able to load all remaining answers than just the two that are preloaded on page load and then collapse those answers back to the original two. All questions and answers are sorted based on helpfulness.

### Ratings & Reviews

We're all excited for you to take a look at our project and can't wait to tell you more about it!
