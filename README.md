TODO
* Pick decent color scheme
* Get Sass working
* Get rid of html select button in favor of pure JS dropdown
* Add different sized circles representing relative size of budget
** Normalized to larger of two budgets
* Add different year options
* Add hover effects to pie chart areas

# TaxSpendingVisualization

  A breakdown of how every $100 of tax revenue is spent by federal, state, and local governments

## Background and Overview

  This project will allow the user to visualize via JavaScript compare how tax money is spent at the state level.  This is information is pulled from US census data at https://www.census.gov/data/tables/2018/econ/stc/2018-annual.html.

## Funcionality and MVP

  In TaxSpendingVisualization, users will be able to:
    - [] select states to compare
    - [] select tax year
    - [] breakdown primary divisions into subdivisions
  This app will also:
    - [] allow comparison of tax spending breakdown over different years

    
## Wireframes

[wireframe link] (https://github.com/jollyoldsaintnixon/TaxSpendingVisualization/blob/master/src/assets/images/tsv_wireframe.jpg?raw=true)


## Architecture and Technology

Only vanilla javascript and the d3 library will be used to create the logic of this project.  SASS will be used to render the display.  

## Implementation Timeline

Phase 1: (1 day)
* Meet with coach and refine plan
* Find datasets to pull from and parse any CSVs

Phase 2: (1-2 days)
* Implement JS logic, (dropdown buttons, event listeners for all segments of pie chart)

Phase 3) (2-3 days)
* Use SASS to make app visually appealing

## Bonus Feature
  
  At least 3 states must be implemented in order for the beta to be released.  Ability to compare sub-category tax data will be added as a bonus.  Any other state, territory, or city will follow in the bonus features.

### Resources

  Revenue 2018: https://www.census.gov/data/tables/2018/econ/stc/2018-annual.html
  TA Ben spent hours helping me figure out d3

  favicon was created at https://www.favicon.cc/

  angellist icon: https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj71suu16DkAhXikOAKHZNLC3YQjRx6BAgBEAQ&url=https%3A%2F%2Ficonscout.com%2Ficon%2Fangellist&psig=AOvVaw3WE7ST1Fj1zuaQk_OAPkm-&ust=1566913794206020

