# Bridge Troll Toll Calculator

## 4 day Large group project

This was a project I worked on for our facilitator led project, I worked with a large group of people for 3-4 days where we created a project that our facilitator wanted.
we had a user story and guidelines to follow. 
## View it yourself!
### Setup
Clone this repo, navigate to it then run the following commands in your terminal.
```sh
npm install
npm run knex migrate:latest
npm run knex seed:run
```

```sh
npm run dev
```

## What I worked on for this project
During days 2 and 3, I teamed up with another student to implement Auth0 and assist others in integrating it into their code. On days 3 and 4, I collaborated with a different student to work with the Google API, focusing on displaying the location of a bridge based on the specific bridge the user was viewing. Much of my time was spent reviewing documentation for integrating the Google API into our project and revisiting a past challenge where we worked with Auth0, which helped guide our implementation.

## User story behind the project
<details>
  <summary>Click to expand!</summary>
The cost of living is on the rise, and house prices are skyrocketing. Fortunately, for the rest of NZ, we are safe from traffic monetisation, unlike our friends in Auckland who have to deal with the trolls that live under their landmark bridges. It's tough for a troll in 2024. There is a lot of competition and not a lot of good resources for trolls. Trolls are are the hunt for smarter, more digital ways to optimize their toll revenue. That's where we come in with our Bridge Troll Toll Calculator app.

The goal of this app is to provide a platform for Auckland-based bridge troll toll-takers to make informed decisions on which bridge to live under and optimize their toll revenue by analyzing live data from sources such as Waka Kotahi: Auckland Traffic API. You can use this or similar APIs to fetch real-time data on/near bridge locations, allowing toll operators to assess the best times of the day for collections and other factors influencing toll collection.
  </details>

## Domain Knowledge

<details>
  <summary>
    Click to expand
  </summary>
  Trolls have no use for our dollars and cents. You need to know about troll currency to display information that is useful to them. Usually, a troll toll charge is around 5 rock candies per vehicle crossing a bridge. Usually, payment is automated using the cars' license plates. Some drivers pay ahead.

About Troll Currency:

- 1Ȼ is 1 troll rock candy, the smallest division of currency
- 100 Rock Candies = 1 Gold Ring (AuR) : 10Ȼ = 1AuR
- 100 Gold Rings = 1 Goat (GT) : 100AuR = 1 GT
- 
It would be wise to consider the troll client when building the app, they are known to be tough customers.

Troll Accessability:

When designing and building the troll toll calculator app, it's crucial to cater to the unique needs of our troll users. This means implementing large, easily clickable buttons to accommodate their robust fingers and opting for a limited color palette to ensure readability amidst their sensitive eyesight. By prioritising these accessibility features, we can guarantee a smoother and more enjoyable experience for our troll users as they navigate the app.
</details>

## Planning
On the first day, we focused on planning everything, including wireframes, stress profiles, database diagrams, a daily schedule, Git workflow, component mind map, and more. For a detailed look at our planning process, feel free to visit the Miro board [here](https://miro.com/app/board/uXjVLWTKLLo=/?share_link_id=417120610213). Unfortunately, the Miro board doesn't contain all of our planning since we did a lot of brainstorming in person using whiteboards as well.
