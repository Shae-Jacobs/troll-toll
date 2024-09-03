# Bridge Troll Toll Calculator

## Week 7 Large group project

The cost of living is on the rise, and house prices are skyrocketing. Fortunately, for the rest of NZ, we are safe from traffic monetisation, unlike our friends in Auckland who have to deal with the trolls that live under their landmark bridges. It's tough for a troll in 2024. There is a lot of competition and not a lot of good resources for trolls. Trolls are are the hunt for smarter, more digital ways to optimize their toll revenue. That's where we come in with our *Bridge Troll Toll Calculator* app.

The goal of this app is to provide a platform for Auckland-based bridge troll toll-takers to make informed decisions on which bridge to live under and optimize their toll revenue by analyzing live data from sources such as **Waka Kotahi: Auckland Traffic API**. You can use this or similar APIs to fetch real-time data on/near bridge locations, allowing toll operators to assess the best times of the day for collections and other factors influencing toll collection.

The extended timeframe for this project presents an opportunity for comprehensive planning and a deeper understanding of how you collaborate in groups. Use this time wisely to engage in discussions about your stress profiles, articulate your learning goals, and define roles within the team. Consider incorporating proper wireframes or designs using tools such as Figma, and take advantage of this phase to craft thorough documentation for the project. This strategic approach will not only enhance the efficiency of your teamwork but also contribute to the overall success of the project.  

## Domain Knowledge

Trolls have no use for our dollars and cents. You need to know about troll currency to display information that is useful to them. Usually, a troll toll charge is around 5 rock candies per vehicle crossing a bridge. Usually, payment is automated using the cars' license plates. Some drivers pay ahead. 

**About Troll Currency:** 

- 1Ȼ is 1 troll rock candy, the smallest division of currency 
- 100 Rock Candies = 1 Gold Ring (AuR) : 10Ȼ = 1AuR
- 100 Gold Rings = 1 Goat (GT) : 100AuR = 1 GT

It would be wise to consider the troll client when building the app, they are known to be tough customers. 

**Troll Accessability:** 

When designing and building the troll toll calculator app, it's crucial to cater to the unique needs of our troll users. This means implementing large, easily clickable buttons to accommodate their robust fingers and opting for a limited color palette to ensure readability amidst their sensitive eyesight. By prioritising these accessibility features, we can guarantee a smoother and more enjoyable experience for our troll users as they navigate the app. 

Please refer to the accessibilty guide on this repo for more info


## Getting Started

A boilerplate is already set up for you with everything you will need to get started. This boilerplate is set up to use:

* [React](https://reactjs.org/docs/getting-started.html)
* [ReactQuery](https://tanstack.com/query/v4/docs/react/overview) 
* [Express](https://expressjs.com/en/api.html)
* [Knex.js](https://knexjs.org/)
* [Sass](https://sass-lang.com/)

There is already some started data in the database on the Auckland bridges (you may wish to add more fields as you go or if you wish to add data from external APIs). 

In the github projects linked to this repo, there are starter tasks to ensure good planning and fullstack features for each pair linked to each user story. 


## User Stories

*The product owner and team might have reason to change/update these to align with client needs or available data. Please make sure you confirm with your team lead (Gaby) first.*

### MVP

As a non-registered troll toll operator:
* I want to view a list of bridges in Auckland and associated stats
* I want to view a single bridge with all it's data

As a registered troll toll operator:
* I want to be able to sign in with a username 
* I want to be able to save my favourite bridges
* I want to set one bridge as my active-bridge, and no other troll can set it
* I want to log each time I take a toll on my active bridge with a running total on how much toll I have collected on that bridge


### Stretch

As a registered troll toll operator user:  
* I want to be able to log in to my account set up using auth
* I want to have a specific profile page (trollfile page) that displays my favourite bridges and my active bridge
* I want to see real live traffic data for each bridge using an external source (API)
* I want to see how the traffic data influences how much troll money can be made at each bridge 

### Stretchier Stretch

As a registered toll operator user:
* I want to analyse toll collection trends based on different times of the day through visualisations.
* I want to identify peak hours for each bridge to maximize revenue through visualisation.
* I want to receive automated recommendations for adjusting toll rates during peak hours.
* I want to see any other live analytics that might increase toll revenue and how they trend over time.
* I want to automate every time I would take a toll at my current active bridge.

## Pull Requests: merging to main/ dev branch checklist

Before you merge to main, the team-lead (Gaby) will run through the following checklist before accepting your pull request:

* 80% test coverage 
* file and function naming conventions are maintained across the app
* errors are well handled
* no sensitive data should be exposed on the client side
* it passes npm run lint without any code-related warnings or errors
* no unnecessary comments or log messages are remaining
* that Types are used where applicable, and any Type issues should be resolved
* user-facing updates (front end/ css crew) should be checked for accessibility concerns (using the WAVE tool)


---
*Here is some example starter documentation to get things going, you will update this as a team:* 


## Views (Client Side)

| name | purpose |
| --- | --- |
| Login | View for the toll operator to enter their login credentials |
| Register | View for the toll operator to sign up |
| Home | Welcome toll operators and links to the app|
| Bridges | Display a list of bridges with toll collection data |
| My Bridges | Display a list of bridges with toll collection data saved by the user|
| Analytics | Provide tools to analyze toll collection trends |

## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/v1/auth/login | Yes | Log In a Toll Operator | The Toll Operator's JWT Token |
| Post | /api/v1/auth/register | Yes | Register a Toll Operator | The Toll Operator's JWT Token |
| Get | /api/v1/bridges | No | Get all bridges with toll collection data | Array of Bridge Objects with Toll Data |
| Get | /api/v1/tolls/analytics | Yes | Get analytics data for toll collection | Analytical Data for Optimization |
| Post | /api/v1/tolls/rate-adjust | Yes | Adjust toll rates for optimal revenue | 201 status code |

## DB (Server Side)

Here is a start on your database you can update these in your documentation.

### Bridges

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each bridge |
| name | string | Name of the bridge |
| location | string | Location of the bridge |
| type | string | Type of the bridge (e.g., Motorway bridge, Road bridge) |
| yearBuilt | integer | Year the bridge was built |
| lengthMeters | string | Length of the bridge in meters |
| lanes | integer | Number of lanes on the bridge |
| addedByUser | string | Toll operator who added the bridge data |

### Toll Analytics

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each toll analytics entry |
| bridgeId | integer | Bridge ID associated with the toll data |
| timestamp | date/time | Date and time of the toll collection |
| revenue | decimal | Amount of revenue collected during the toll |
 

---

## Setup

Run the following commands in your terminal:

```sh
npm install
npm run knex migrate:latest
npm run knex seed:run
cp .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```


## Deployment

Follow the [Dokku Guide]() to deploy your site.
