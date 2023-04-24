# iParametrics
### This is the repository for Team 2332's Junior Design project!
Team
- Nate Kim
- Pranav Thomas
- Ankith Kanderi
- Hemang Dash
- Elijah Kessler
- Xiaodong Gao

# Summary

Our client is iParametrics and we are making a web application to show the Community Willingness and Capability Scores, or CWCS, of different communities. The world has been constantly plagued with natural disasters. It is imperative that national and local administration takes steps to mitigate such disasters. However, to reduce unnecessary spending, it is important to find out which communities are the best to invest into for mitigation efforts. Hence, using machine learning,  this project determines the CWCS of different communities and displays them in an easy to understand web application. 

# Installation Steps

## Downloading files 
- Go to our [respository](https://github.com/natekim27/JIE-2332-iParametrics). 
- Click the Code button (green) and click "Download ZIP".
- Unzip the file and you will have the folder containing all the files ready. 
## Front-End
### Windows

- On Windows, open Powershell. Navigate to the folder you downloaded in the above steps. Run
```
wsl --install
```
- Once WSL is installed, reboot your system. For more information about WSL, [click here](https://learn.microsoft.com/en-us/windows/wsl/install). On rebooting, use WSL terminal for all the commands henceforth in this installation guide. You can find out about opening it in Visual Studio Code [here](https://code.visualstudio.com/docs/remote/wsl#:~:text=From%20VS%20Code,-Alternatively%2C%20you%20can&text=Start%20VS%20Code.,Distro%20for%20a%20specific%20distro.).
- Install nodejs and npm using the following command:
```
sudo apt update
sudo apt-get install nodejs npm
```
- Verify the installation by running
```
nodejs --version
```
- To download the front-end dependencies for the app (listed in `package.json`), run
```
sudo npm install
```
- If the above throws an error, try
```
sudo npm install --force
```
- Once the dependencies are installed, run the following to start the development server for the front-end of the app:
```
sudo npm start
```

### Mac
- Install nodejs and npm using the following command:
```
brew install node
```
- Verify the installation by running
```
node --version
```
- To download the front-end dependencies for the app (listed in `package.json`), run
```
sudo npm install
```
- If the above throws an error, try
```
sudo npm install --force
```
- Once the dependencies are installed, run the following to start the development server for the front-end of the app:
```
sudo npm start
```

## Back-End
- Open a new terminal.
- We are using a package manager called `pip` to get all our back-end dependencies. In case you do not have `pip`, you can install it by installing [Python3](https://www.python.org/downloads/) on your system.
- On *Windows* only, run the following in your WSL terminal:
```
sudo apt install python3-pip
```
- Once `pip` is installed, run the following command to get all the dependencies (do not forget the "." at the end of the command):
```
pip install -e .
```
- Install the ODBC driver for SQL server. For Mac, [click here](https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/install-microsoft-odbc-driver-sql-server-macos?view=sql-server-ver16). On Windows, run
```
sudo apt install unixodbc-dev 
sudo apt-get update
```
- Run the following to start the back-end development server:
```
cd database
python3 API.py
```
- On a web browser, open the following URL to test the server (you should see all the communities' data in JSON format):
```
http://127.0.0.1:5000/features/get-all
```
- If you run into an error like this (check your server console output)
```
“Cannot open server 'iparametricsserver' requested by the login. Client with IP address 'XX.XXX.XX.XX' is not allowed to access the server.”
```
you need to go to the Azure portal and add your IP address to the list of allowed IP addresses. Do so by going to the [query editor](https://login.microsoftonline.com/iparametrics.com/oauth2/v2.0/authorize?redirect_uri=https%3A%2F%2Fportal.azure.com%2Fsignin%2Findex%2F&response_type=code%20id_token&scope=https%3A%2F%2Fmanagement.core.windows.net%2F%2Fuser_impersonation%20openid%20email%20profile&state=OpenIdConnect.AuthenticationProperties%3DMR_VqHkh1a_ZqngJWTiuv9D-k5HNqVKu4l7RIoMJSSva2rRtYJrPWrzTiS9yUP3NhKmG-rIht3XRM7AgD0vG9gYXNhyc33-CG3nOQzakjSajkh76DzAmAJTOzaRgHtxDPqhO3OUwpt7D2T7ycjXVyQ3CWd6KkCC5wz_Nrtpf_0eWD9JuvDv0U36UR3cSdpLanBltKE5_fUJQ7EiIgZJvnxHIo03Exzoyym-4IImqEA47tJtEGTw8CZOKlzvyRXCiItc79EPzTCWQthgKg2OStS8zj4iUNZzdz9qitjMn-vZiAfrJYEAMUXRKvVJXMQ3Z-nWJlBE_Yr3lQoKGbRidlR8nwSdCs0As2W7DEmS8krpEdOAsMKVCn072B0vZau16x7v_AydzKhigF90LsrSZtfa0pBGwK6joa-C_LPCqM3g7NBnZ8WJw_pCai-IvbJ9GHtuYzA8g-bcgxklPEo-ZgPA42uagj_6ZmfOBUaPQ2IySYsQFwZe_aEAw-Rcawtbpeyqt16zT8v62pqCsLCEqvw&response_mode=form_post&nonce=638175502785731022.Y2E4NTJiYWUtYjhiZC00OGY3LWIxMjgtNzM5OGY0NzZmMzMwMWY3ZTNkYTktOThlZC00Y2JjLTgwNTAtMWY1OWZlOWU0MmJh&client_id=c44b4083-3bb0-49c1-b47d-974e53cbdf3c&site_id=501430&client-request-id=900e26e8-6b87-4bf5-bfd6-62fa79c86ab8&x-client-SKU=ID_NET472&x-client-ver=6.27.0.0) in the database and log in with your credentials.

On the completion of the above steps, the installation is complete. You can access the app in your web browser through the following URL.
```
http://localhost:3000/
```
It is important to keep both the Front-end and Back-end servers running in separate terminals simultaneously.

# Troubleshooting
1. In case the app (front-end) fails to compile:
    1. Delete the `node_modules/` directory.
    2. Run `sudo npm install` again.

2. If you run into an error like this (check your server console output):
    ```
    “Cannot open server 'iparametricsserver' requested by the login. Client with IP address 'XX.XXX.XX.XX' is not allowed to access the server.”
    ```
    1. Go to the Azure portal and add your IP address to the list of allowed IP addresses. Do so by going to the [query editor](https://login.microsoftonline.com/iparametrics.com/oauth2/v2.0/authorize?redirect_uri=https%3A%2F%2Fportal.azure.com%2Fsignin%2Findex%2F&response_type=code%20id_token&scope=https%3A%2F%2Fmanagement.core.windows.net%2F%2Fuser_impersonation%20openid%20email%20profile&state=OpenIdConnect.AuthenticationProperties%3DMR_VqHkh1a_ZqngJWTiuv9D-k5HNqVKu4l7RIoMJSSva2rRtYJrPWrzTiS9yUP3NhKmG-rIht3XRM7AgD0vG9gYXNhyc33-CG3nOQzakjSajkh76DzAmAJTOzaRgHtxDPqhO3OUwpt7D2T7ycjXVyQ3CWd6KkCC5wz_Nrtpf_0eWD9JuvDv0U36UR3cSdpLanBltKE5_fUJQ7EiIgZJvnxHIo03Exzoyym-4IImqEA47tJtEGTw8CZOKlzvyRXCiItc79EPzTCWQthgKg2OStS8zj4iUNZzdz9qitjMn-vZiAfrJYEAMUXRKvVJXMQ3Z-nWJlBE_Yr3lQoKGbRidlR8nwSdCs0As2W7DEmS8krpEdOAsMKVCn072B0vZau16x7v_AydzKhigF90LsrSZtfa0pBGwK6joa-C_LPCqM3g7NBnZ8WJw_pCai-IvbJ9GHtuYzA8g-bcgxklPEo-ZgPA42uagj_6ZmfOBUaPQ2IySYsQFwZe_aEAw-Rcawtbpeyqt16zT8v62pqCsLCEqvw&response_mode=form_post&nonce=638175502785731022.Y2E4NTJiYWUtYjhiZC00OGY3LWIxMjgtNzM5OGY0NzZmMzMwMWY3ZTNkYTktOThlZC00Y2JjLTgwNTAtMWY1OWZlOWU0MmJh&client_id=c44b4083-3bb0-49c1-b47d-974e53cbdf3c&site_id=501430&client-request-id=900e26e8-6b87-4bf5-bfd6-62fa79c86ab8&x-client-SKU=ID_NET472&x-client-ver=6.27.0.0) in the database and log in with your credentials.

3. If you run into an error like this (check your server console output):
    ```
    “[Microsoft][ODBC Driver 18 for SQL Server][SQL Server]Login failed for user 'xxxxxx'”
    ```
    1. Go to your .env file within the app folder. Check the USER_NAME & PASSWORD fields there and make sure that they are correct. 

4. Why are all the images on the Visualize Data page not downloading?
    1. Wait for all the images to load (at least 10 seconds).
    2. Try to download the images again. It should download all the images now.

5. If you face a 500 Internal Server Error message while trying to log in,
    1. Check the details for the error message.
    2. Follow troubleshooting tip 2 or 3 to solve the issue.

# Future Improvements
- Deploy the app on a web server using services like Microsoft Azure.
- Create an interactive heat map of the United States showing each county's CWCS.
- Visualize Data could also generate graphs to compare data of two or more communities.
- Add more features to the dataset. Doing so will also improve the accuracy of the CWCS generation.
- Add unit tests and end to end tests to the repository for testing the app's back end and front end.
- Implement caching and database optimization techniques to improve the application's speed and responsiveness.

# Release Notes

## Version 0.5.0
### New Features
- Connect to iParametrics Azure SQL server for database
- User authentication for login
- Create account functionality with account being created on database
- Install backend dependencies using `setup.py`
- Change Community Details backing data section from cards to a table
- Modal displaying information about CWCS
- Download images from Data Visualization page
- Success and error message modals for adding and editing communities
- Navigation to community 1 or community 2 from Compare Communities page
### Bug Fixes
- Remove duplicate Compare Communities button on Community Details Page
- Number formatting for small decimal numbers and numbers greater than 1B
- Fixed timeout issues for data visualization
- Add accurate values for national and state averages
- Population Change and Above Poverty Line now show accurate values
- CWCS is now shown in Compare Communities table
- CWCS is out of a scale of 10
- ML algorithm has four target features:
    - Hazard Mitigation Obligation (20%)
    - Public Assistance Obligation (20%)
    - Ratio of Total Revenues to Total Expenses (30%)
    - Number of Federally Declared Major Disaster Declarations: 2003 to Present (30%)
- Add default values instead of NaN in the database
### Known Issues
- Visualize Data takes 10 seconds (has a timeout of 1000) to load all the images.

## Version 0.4.0
### New Features
- Search page for community comparison
- 'Compare Community' page to compare backing data of communities
- Readjusted display of backing data in order of relevance to CWCS
- Added extended data view vs top factors view
- Improved ML algorithm accuracy
- Data visualization for community data via graphs
- 'Add Community' page
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
