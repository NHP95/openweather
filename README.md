# OpenWeather Test Automation & Performance
This repo contains automation and performance source files to test [OpenWeather](https://openweathermap.org/) application.
## Tools
* Automation: Cypress
* Report: Cypress Dashboard + Mochawesome
* Performance: k6.io
* Monitoring: Grafana + InfluxDB

## Installation
* Install node.js v10.0.0
* Run `npm install` to install necessary packages

## Test Execution
### Automation
* Run `npm run cy:all` to run all the spec files
* Run `npm run cy:api` to run api tests
* Run `npm run cy:schema` to run schema validation tests

The results of each run can be found at [cypress dashboard](https://dashboard.cypress.io/projects/shie33/runs)

### Performance
Run the following command will trigger a test to fire 100 RPS in which it has a validation on the 95th percentile to check if the response time is below 1 second, and the error rate is below 0.001%
```
npm run k6:benchmark
```