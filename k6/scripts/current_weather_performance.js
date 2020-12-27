import http from 'k6/http';
import { check } from 'k6';
import { getWeatherByCityNameRequestParams }
    from '../../builder/current_weather_request_builder.js';

const config = JSON.parse(open(`../../${__ENV.CONFIG_FILE}`));

export let options = {
    throw: true,
    scenarios: {
        load_test: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '100s', target: 100 }
            ]
        },
    },
    thresholds: {
        'http_req_duration': ['p(99)<1000'],
        'http_req_waiting': ['p(99)<500']
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
        "response code is 200": (res) => res.status == 200
    });
}