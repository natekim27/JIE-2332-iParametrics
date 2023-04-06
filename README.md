# iParametrics
### This is the repository for Team 2332's Junior Design project!
Team
- Nate Kim
- Pranav Thomas
- Ankith Kanderi
- Hemang Dash
- Eli Kessler
- Xiaodong Gao

# Summary

Our client is iParametrics and we are making a web application to show the Community Willingness and Capability Scores, or CWCS, of different communities. The world has been constantly plagued with natural disasters. It is imperative that national and local administration takes steps to mitigate such disasters. However, to reduce unnecessary spending, it is important to find out which communities are the best to invest into for mitigation efforts. Hence, using machine learning,  this project determines the CWCS of different communities and displays them in an easy to understand web application. 

# Installation & Development

We use Yarn as our package management library. To install the packages needed to run the web app: 

```
yarn install
```

To start a development server: 

```
yarn start
```

To build a compiled version for deployment: 

```
yarn build
```

The react-start script behind each command is located in ```package.json```. 


# Release Notes

## Version 0.4.0
### New Features
- Created search page for community comparison
- Created 'Compare Community' page to compare backing data of communities
- Readjusted display of backing data in order of relevance to CWCS
- Added extended data view
- Improved ML algorithm accuracy
- Added data visualization for community data through graphs
- Created 'Add Community' page
### Bug Fixes
- Rerouted 'Add Community' button to the 'Add Community' page
- Added units to data features
- Renamed 'Region' to 'County'
- Readjusted styling to follow iParametrics brand guide
### Known Issues
- Database values failing to show on M1 and M2 Macs

## Version 0.3.0
### New Features
- Auto complete for login and create account
- Early version of ML Algorithm using SVM
- AzureSQL Database
- Service connection to AzureSQL database
- API endpoints to create/read/update/delete data from DB
- User authentication API endpoint
- Change password functionality
- Edit community details page
- Community deletion functionality
### Bug Fixes
- Class JSX error in pages fixed
- Capitalization of factors on the Community Details page
- Reformatted numbers to round them
### Known Issues
- Need to implement more tests for features
- Continue to update main() in algorithm.py
- Explore SVC rather than SVM for ML algorithm
- Have algorithm.py read from DB rather than local

## Version 0.2.0
### New Features
- Displaying data on Community Details as cards
- Download data for a community as JSON or CSV
- Sorting on the Communities Table based on Region, State or CWCS
- Added target feature for the ML algorithm
### Bug Fixes
- Added missing backing data to the Community Details page
- Make mouse cursor a hand pointer when hovering on table row

## Version 0.1.0
### New Features
- Population dropdown menu on the Community Search page to filter communities by population
- View all the backing data for a community
### Bug Fixes
- CSS alignment fixed for the search bar
- Duplicated communities bug is fixed
