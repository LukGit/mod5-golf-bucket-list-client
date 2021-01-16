# The Golf Bucket List
![alt text](https://github.com/LukGit/mod5-golf-bucket-list-client/blob/master/src/img/Golf_Bucket_screenshot.png?raw=true)
This is an app for users to maintain a bucket list of golf courses they would like to play in. It provides the ability to research a course hole by hole. The other feature is to let users create foursomes on the foursome board so that other users can join. 

## Technical information

The app's frontend is built in JavaScript with React/Redux framework. The backend is Ruby on Rails with a PostgreSQL DB. All map rendering is done using Google Maps React. Weather information is obtained via weather API Email capability is executed using EmailJS. JSON web token is also implemented for user authentication. Styling is impleneted using Sematic UI React with some CSS. 

## General operation

Once logged in, users are greeted with a world map showing markers respresenting the courses they have added to the bucket list. User can select a course from the research list for further information. When a course is selcted, user sees a map showing the location of the clubhouse. User can then select each hole from the hole dropdown list and see a map showing markers of the tee box and the green. User can click on any point on the map and a marker will show a polyline with the distance from the tee and the distance to the green in yards. User can obtain current weather infromation at the course by clicking the weather button. User can also watch an overview video about the course by clicking on the video button. Once research is complete, user can choose to add the course to the bucket list by clicking the add button. Once clicked, the course will show up as a marker on the world map. User can also remove a course by click remove on the bucket list item page. Once removed, the marker disappears from the map. 

While in the bucket list item page, user can create a foursome by clicking the "+" foursome button. A foursome can then be added by inputing a date and a handicap number (to allow users to play with others with similar skills). Once added, user is shown all the available foursomes sorted by dated. User can then filter by foursome he/she is in, by course, handicap, and date range. User can click on join on a foursome to join or click on leave to remove himself from the foursome. User cannot join a foursome already joined, nor can leave one that is not joined. User is only allowed to removed his/her own created foursome. 

User can check off a bucket list item on the item detail page after he/she has played a course. After entering a date and a scrore, the saved bucket list item cannot be removed. User can also elect to share the result of the event with friends via email with one or more email addresses (separated by comma) and click the mail button. 

## Technical Notes

In order to use Google Maps, all components must be first imported from google-map-reacts: 

```javascript
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
```
An API key obtained in your google account must also be specified in the same container where map and its components are used:
```javascript
export default GoogleApiWrapper({
  apiKey: 'your-api-key-from-google'
})(MapContainer)
```
In order to use Sematic UI react, the following must be specified in the index.html file:
```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
```
To use EmailJS, the following must be specified in the index.html file along with the API keys obtained after an EmailJS account is created:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js"></script>
<script type="text/javascript">
   (function(){
       emailjs.init("user_your-user-api-key-from-emailjs-account");
   })();
</script>
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
