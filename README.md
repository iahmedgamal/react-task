# User Profile Dashboard

## Project Overview

This is a react project built using Vite , TypeScript, and Tailwind CSS.

The dashboard allows users to view and edit their profiles  with form validation, and it includes functionality to analyze and display the most frequent activity performed by a user.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn

### Project Setup

1. **Clone the Repository**
2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Development Server**

    ```bash
   npm run dev
    ```

### Project Structure

- src/components/: React components for various parts of the dashboard.
- src/pages/: Pages for different routes (Profile, Settings) mocked so far.

- src/interfaces : For any interface we have in the application

### Algorthmic Approach

## Finding The Most Frquent Activity

The algorthim implmented in this project designed to effecinetly determine the most frequent performaed activity by a user. 

- In the beggining since we had a mocked data I added the activity for every user seprated to skip one operation that's filtering the whole activites and determine which actvity belong to which user, each activity has a description this filed indicating the type of activity as an example [`Logged in`, `Updated profile`, `Logged out`]

- Counting Occurrences by using `Map` data structure in TS, will count occurrences of each activity description 

- Iterate throw the the list of activites and update the value which is the count
- Iterate over the map to get the maximum count number on all activites keys in the map
- Performance: This approach is efficent with a time complexity `O(n)` where n is the number of activities in the list.  
- One more performance technique applied: To use the `web worker` to not block the main thread from doing this heavy dataset apprach.