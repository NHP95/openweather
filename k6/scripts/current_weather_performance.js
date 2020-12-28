import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { getWeatherByCityNameRequestParams }
    from '../../builder/current_weather_request_builder.js';

const config = JSON.parse(open(`../../${__ENV.CONFIG_FILE}`));
const errorRate = new Rate('error_rate');

export let options = {
    scenarios: {
        load_test: {
            executor: 'constant-arrival-rate',
            rate: 10,
            preAllocatedVUs: 0,
            duration: '10s',
            maxVUs: 10
        },
    },
    thresholds: {
        'error_rate': ['rate<0.001'],
        http_req_duration: ['p(95)<1000']
    }
};

export default function () {
    let urlParams = getWeatherByCityNameRequestParams("Ha Noi")['params'];
    let params = {
        tags: {
            search_by: "city name",
        }
    };

    let response = http.get(`${config.baseUrl}${config.env.apiPath}?${urlParams}&&appid=${config.env.apiKey}`, params);
    check(response, {
        "response code is 200": (response) => response.status == 200
    });
    errorRate.add(response.status !== 200);
}