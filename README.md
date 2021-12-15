# Interview Scheduler

Interview Scheduler is a simple single-page application that allows students of the LightHouse Labs Web Development Bootcamp to book and manage an interview with a mentor.

Interview Scheduler is built using React in the front-end and Express on the back-end. The data is served from the scheduler-api using a PostgreSQL database. Additionally, a suite of testing was built for this project to implement a deeper understanding of Jest and to begin working with the end-to-end testing framework, Cypress.

Appointments can be made between noon and 5 for each day of the week.

When the application is loaded, a request is made to the API server. The appointments are displayed for the selected day.

Choosing another day shows that more appointments have been booked.

When an appointment is created, the user can type in a student name and choose an interviewer from a list.

Clicking on the 'Save' button will perform a save action. A save action will make a request to the server to persist the change. Immediately, before sending the request, we show the user a status indicator. The request should take some time and the user should know that something is happening.
When the response is returned from the server, the status indicator is hidden and the interview is shown with updated data.

The user can edit an interiew. This allows them to change the student name or chosen interview and save those changes to the server.

If an interview is no longer needed, then it can be deleted. Before deleting the interview, the user is presented with a confirmation since this is a destructive action. If the server returns an error while performing an operation, an error message is displayed. The message can be dismissed be pressing the 'Close' button provided.

![20211215150952796_AdobeCreativeCloudExpress](https://user-images.githubusercontent.com/82968631/146259744-5d33e2b7-0a5b-4eb9-87a6-b7f1968fee85.gif)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
