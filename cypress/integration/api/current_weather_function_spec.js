import {
    getWeatherByCityNameRequestParams,
    getWeatherByCityIDRequestParams
} from "../../../builder/current_weather_request_builder.js";

describe('Get current weather data (api) (smoke)', () => {
    const buildrequest = (urlParams) => {
        return {
            url: `${Cypress.env('apiPath')}?${urlParams}&appid=${Cypress.env('apiKey')}`,
            failOnStatusCode: false
        }
    }

    context('Using city name', () => {
        const inputs = [
            {
                cityName: 'ho chi minh'
            },
            {
                cityName: 'new york',
                stateCode: 'US-NY'
            },
            {
                cityName: 'new york',
                countryCode: 'US'
            },
            {
                cityName: 'new york',
                stateCode: 'US-NY',
                countryCode: 'US'
            }
        ];

        inputs.forEach((input) => {
            it(`should return correct search results ${input.cityName},${input.stateCode},${input.countryCode}`, () => {
                const urlParams = getWeatherByCityNameRequestParams(
                    input.cityName,
                    input.stateCode,
                    input.countryCode)['params'];
                cy.request(buildrequest(urlParams)).as('weather');
                cy.get('@weather').its('status').should('be.equal', 200);
                cy.get('@weather').then((response) => {
                    expect(response.body.name.toLowerCase()).to.include(input.cityName);
                    if (input.countryCode)
                        expect(response.body.sys.country).to.equal(input.countryCode);
                });
            });
        });
        it('should return error message', () => {
            const urlParams = getWeatherByCityNameRequestParams(
                '', "VN", "VN"
            )['params'];
            cy.request(buildrequest(urlParams)).as('weather');
            cy.get('@weather').its('body.message').should('be.equal', 'city not found');
        });
    });
    context('Using city id', () => {
        const cities = require('../../fixtures/cities.json');
        cities.forEach((city) => {
            it(`should return correct search results ${city.id}`, () => {
                const urlParams = getWeatherByCityIDRequestParams(city.id)['params'];
                cy.request(buildrequest(urlParams)).as('weather');
                cy.get('@weather').its('status').should('be.equal', 200);
                cy.get('@weather').its('body.id').should('be.equal', city.id);
            });
        });
    });
});