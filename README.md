# Bonsai
A website for hobbyists. Hosted using Firebase [here](https://bonsai-a18e2.firebaseapp.com/).

## Description
This site stores relevant data about users and hobbies on Firebase which is extracted by JavaScript files ([`/public/scripts`](https://github.com/ritamsarmah/bonsai/tree/final/public/scripts)) for use in corresponding HTML files. CSS files used for styling their corresponding HTML files can be found in [`/public/styles`](https://github.com/ritamsarmah/bonsai/tree/final/public/styles).

Users first visiting the site will reach `login.html`, where they can use a Google account to sign in. First-time users are redirected to `signup.html` while, prior users are directed to their home page at `index.html`. The navigation bar, powered by `NavComponent.js`, is a React component that allows users to navigate to other pages, view their current hobby, and logout.

Other key files include:
   - `goal_drawing.js` is responsible for pulling the user's goal data from Firebase and adding goal panels to the homepage and goals page.
   - `ResourceComponent.js` and `CommunityComponent.js` are React components that pull starter pack and community information from Firebase and display them on the website.

The remaining JavaScript files involve authentication using Firebase, dynamically displaying HTML elements, or CRUD operations for goals (and are typically named accordingly).

## Libraries & Frameworks
- Bootstrap
- React
- Firebase
- jQuery
- Chart.js
