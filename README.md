# FEC

Hello! Welcome to our team's Front End Capstone, or FEC for short.

This was our first project as we entered the Senior Phase of the HackReactor Program. The goal of this project was to challenge, primiarly, our Front End Skills. The aim was to build a complex webpage that interacts with an API, server, and four widgets made by four different people while being thoroughly tested to ensure the best outcome. We had the oppurtunity to use some technologies including React, Jest, HTML, CSS, Axios, Express and, hopefully to no suprise, Javascript!

Our team was made up of:
* Ahmad Almomani, responsible for Product Overview.
* King-Man Chow, responsible for Related Products & Comparisons.
* Keegan Wolf, responsible for Question & Answers.
* Alex Belmonte, responsible for Ratings & Reviews.

## Description

Specifically, what we built was a product page for an online storefront. It is complete with everything you might expect in a modern online retailer, like a product overview, see related items, a place to ask questions, and to see reviews. The page is fully interactive as well! You can click around the different styles, compare a related item to the current item, leave a question or answer, and even leave a review.

### Product Overview

### Related Products & Comparisons

### Questions & Answers

The Questions & Answers widget was made up of three main parts, the container, the question list, and the individual questions.

The container holds the widget together and displays the search bar, question list, and buttons to interact with the question list. The search bar allows the user to search through the questions and, after three characters have been typed in, it will display any questions that matched the search string in the question list. Falling below three characters reverts the question list back to the original, full list of questions for the product. The buttons at the bottom of the container expand the question list to include two more quesitons at a time and also allows the user to add a question to the list. 

The question list itself is made up of all the questions for the given product that the user is viewing. Each question has a "Q:" before it, then the first answer in the list is prefaced with "A:", with all the other answers falling below the first in line. The question list will expand quite a bit if the button to view more questions is clicked enough, so it turns into a scrollable widget once it has taken up the viewable portion of the screen. 

The individual questions themselves allow for the greatest interaction within the Questions & Answers widget. Each question and answer is able to be voted as helpful, changing their ranking on the next page reload. Unlike questions, answers are able to be reported, so if they contain inaccurate information or otherwise unproductive text to the question, they can be removed and flagged for the site owners to review. Users can also add answers to a question containing their name, email, answer, and up to five photos. Lastly, they are able to load all remaining answers than just the two that are preloaded on page load and then collapse those answers back to the original two. All questions and answers are sorted based on helpfulness.

### Ratings & Reviews

We're all excited for you to take a look at our project and can't wait to tell you more about it!
