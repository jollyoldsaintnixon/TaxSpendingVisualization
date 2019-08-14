// https://api.usaspending.gov/docs/endpoints

export const fetchBudgetFunctions = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/v2/budget_functions/list_budget_functions/'
    })
}