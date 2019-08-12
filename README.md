# TaxSpendingVisualization

  A breakdown of how every $100 of tax revenue is spent by federal, state, and local governments

## Background and Overview

  This project will allow the user to visualize via JavaScript how their tax money is spent at the federal, state, and local levels in one app.  Federal data is readily available at https://api.usaspending.gov/docs/endpoints.  The accessibility  of state and local information will depend on the entity in question.

## Funcionality and MVP

  In TaxSpendingVisualization, users will be able to:
    - [] select level of government
    - [] select tax year
    - [] breakdown primary divisions into subdivisions
  This app will also:
    - [] allow comparison of tax spending breakdown over different years
    - [] allow comparison of tax spending breakdown across different states and cities
    
## Wireframes

[wireframe link] (https://github.com/jollyoldsaintnixon/TaxSpendingVisualization/blob/master/src/assets/images/tsv_wireframe.jpg?raw=true)


## Architecture and Technology

Only vanilla javascript will be used to create the logic of this project.  SASS will be used to render the display.

## Implementation Timeline

Phase 1: (1 day)
* Meet with coach and refine plan
* Find datasets to pull from and parse any CSVs

Phase 2: (1-2 days)
* Implement JS logic, (dropdown buttons, event listeners for all segments of pie chart)

Phase 3) (2-3 days)
* Use SASS to make app visually appealing

## Bonus Feature
  
  Federal data and at least 3 states must be implemented in order for the beta to be released.  Any other state, territory, or city will follow in the bonus features.  Normalization of state and local spending categories will help with comparison.
