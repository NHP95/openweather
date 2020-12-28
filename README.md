# OpenWeather Test Automation & Performance
This repo contains automation and performance source files to test [OpenWeather](https://openweathermap.org/) application.
## Tools
* Automation: Cypress
* Report: Cypress Dashboard + Mochawesome
* Performance: k6.io
* Monitoring: Grafana + InfluxDB

## Installation
* Install node.js > v10.0.0
* Install `k6`: https://k6.io/docs/getting-started/installation
* Run `npm install` to install necessary packages

## Test Execution
### Automation
* Run `npm run cy:all` to run all the spec files
* Run `npm run cy:api` to run api tests
* Run `npm run cy:smoke` to run tests tagged with 'smoke' label (UNIX only)
* Run `npm run cy:schema` to run schema validation tests

The results of each run can be found at [cypress dashboard](https://dashboard.cypress.io/projects/shie33/runs). And the generated report (in .json format) can be found under the `results` folder
### Performance
Run the following command will trigger a test to fire 10 RPS (sending too many requests to the server will return 429 status code - please keep this number low just for testing purposes) in which it has a validation on the 95th percentile to check if the response time is below 1 second, and the error rate is below 0.001%

```
npm run k6:benchmark
```
You should see the following output
```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6/scripts/current_weather_performance.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
           * load_test: 100.00 iterations/s for 10s (maxVUs: 0-100, gracefulStop: 30s)


running (11.0s), 000/036 VUs, 938 complete and 0 interrupted iterations
load_test ✓ [======================================] 036/036 VUs  10s  100 iters/s

    ✓ response code is 200

    checks.....................: 100.00% ✓ 938  ✗ 0   
    data_received..............: 730 kB  66 kB/s
    data_sent..................: 144 kB  13 kB/s
    dropped_iterations.........: 63      5.722168/s
  ✓ error_rate.................: 0.00%   ✓ 0    ✗ 938 
    http_req_blocked...........: avg=13.21ms  min=3µs      med=7µs      max=1.24s p(90)=13µs     p(95)=27.14µs 
    http_req_connecting........: avg=13.2ms   min=0s       med=0s       max=1.24s p(90)=0s       p(95)=0s      
  ✓ http_req_duration..........: avg=250.38ms min=151.05ms med=191.42ms max=1.47s p(90)=558.49ms p(95)=617.44ms
    http_req_receiving.........: avg=96.89µs  min=24µs     med=88µs     max=458µs p(90)=145µs    p(95)=167.15µs
    http_req_sending...........: avg=43.24µs  min=13µs     med=39µs     max=355µs p(90)=66µs     p(95)=87.14µs 
    http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s    p(90)=0s       p(95)=0s      
    http_req_waiting...........: avg=250.24ms min=150.95ms med=191.32ms max=1.47s p(90)=558.33ms p(95)=617.3ms 
    http_reqs..................: 938     85.196716/s
    iteration_duration.........: avg=263.97ms min=151.35ms med=192.46ms max=2.04s p(90)=560.6ms  p(95)=631.07ms
    iterations.................: 938     85.196716/s
    vus........................: 0       min=0  max=36
    vus_max....................: 36      min=26 max=36
```