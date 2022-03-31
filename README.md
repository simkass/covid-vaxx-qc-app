# covid-vaxx-qc-app
Web App allowing users to sign up for an email notification service for covid vaccine appointment availabilities

Repo for the backend api is found here: https://github.com/simkass/covid-vaxx-qc-api

# Set up steps

PLEASE DO NOT USE THE PRODUCTION API TO TEST YOUR CHANGES

1. Make sure you've set up the api to run locally: https://github.com/simkass/covid-vaxx-qc-api
2. Make sure you have angular CLI installed
4. In src/app/data.service.ts, change the API value to the local address on which you're running the api (should be http://127.0.0.1:5000/)
5. In src/app/create-alert-steps/create-alert-steps.component.html, change the site key of the recaptcha (should be line 86) to the site key you generated when setting up the api
6. In the terminal, at the root of the project: npm install, ng serve
7. Visit the website on localhost:4200
