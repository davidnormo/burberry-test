Past Climate

An historical weather application, that checks a specific location's 
past weather reports.


Running the application
1. Make sure you have Node.js (nodejs.org) and NPM (https://www.npmjs.org)
 installed.

2. Unzip the application .zip file

2. Run: 'npm install' from the root directory of the application

3. Run: 'grunt'

4. In your browser, navigate to http://localhost:9000/index.html



Running the tests:
1. Run 'grunt' if not already running

2. In your browser navigate to: http://localhost:9000/SpecRunner.html



Generating the Documentation:
1. Run: 'grunt docs' from the application root directory

2. Run: 'grunt'

3. In your browser navigate to: http://localhost:9000/docs/index.html



The Application
From js/app.js the router is setup with a single route, as the 
application is only a single page. loadApp() is the method that is called 
from this route which sets up the Views and handles the events between 
them.

The application is centred around Climate models, each holding all the 
data the application will need. They are fed by the other API based models.

When a new address is entered the Address model calls the Google Geocoder 
API converting an address to a latitude/longitude pair and passes it's 
result to a new Climate instance via the sync event (app.js ln 34).

The Climate Model then instantiates new Station and History Models which
act against the Open Weather Map API. The Display View listens to 
the Climate model (app.js ln 41) for updates and renders them when they 
become available. 

The PastSearches view holds a collection of previous Climate models and 
handles passing them back to the other views when the user clicks on them.



Application Structure Reasoning
Backbone Views could be compared to an MVC Controller 
(see Backbone documentation). But as you can see in the Router.loadApp 
method, there are 14 lines (33-47) that handles data passing between the
Views and Models which would normally belong in a Controller. 

In the case of this application the router function acts as the 
Controller and the Views act as ViewModels in a MVVM style. 
I didn't initially intend to structure it this way but as the application 
grew, I felt it made sense to have all the inter-View logic explictly 
defined in one place, opposed to be dispersed among the Views and having 
instances of the views in different places.


Notes:
- Backbone.js
For performance and stability, I've replaced Backbone's dependencies on 
the following libraries:

1. jQuery has been replaced with Zepto (https://github.com/madrobby/zepto)
2. Underscore has been replaced with Lo-dash (https://lodash.com/)