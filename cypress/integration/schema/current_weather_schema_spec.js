import {
    getWeatherByCityNameRequestParams
} from "../../../builder/current_weather_request_builder.js";

describe('Get current weather data (schema) (smoke)', () => {
    const buildrequest = (urlParams) => {
        return {
            url: `${Cypress.env('apiPath')}?${urlParams}&appid=${Cypress.env('apiKey')}`,
            failOnStatusCode: false
        }
    }
    it('Search results should contain sufficient info', () => {
        const urlParams = getWeatherByCityNameRequestParams('New York')['params'];
        cy.request(buildrequest(urlParams)).then((response) => {
            cy.task('validateJsonSchema', {
                data: response.body,
                verbose: true,
                schemaFile: 'cypress/schemas/current_weather_schema.json'
            }).should('equal', null);
        })
    })
});