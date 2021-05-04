# covid-vaxx-qc-app

# Set up steps
Make sure you have angular CLI installed

1. Make sure you've set up the api to run locally: https://github.com/simkass/covid-vaxx-qc-api
2. PLEASE DO NOT USE THE PRODUCTION API TO TEST YOUR CHANGES
3. In src/app/data.service.ts, change the API value to the local address on which you're running the api (should be http://127.0.0.1:5000/)
4. In src/app/create-alert-steps/create-alert-steps.component.html, change the site key of the recaptcha (should be line 86) to the site key you generated when setting up the api
5. in the terminal at the root of the project: npm install, ng serve
6. Visit the website on localhost:4200
