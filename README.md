# VIA-busvi web app
This is a repo for the 2nd annual VIA Codeathon Challenge
 
 This is a full stack grails web application. The purpose of this app is to help increase ridership in the city's public transit system. The app does this with features like a commute cost calculator that gives you your cost of commuting useing you vehicles mpg, local gas prices, and distance of travle beteen your two location. This calculator will also give you your CO2 emmisions for that same trip. Users can also create an account and log their bus rides to keep statistics on the amount of CO2 emissions and money saved. The app gamifies these savings with a leaderboard for the "Greenest users".
 




# Setup to run localhost
1. Create a mysql db named pixel
2. Create the vehicle table with the following query:
```
   CREATE TABLE `vehicle` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `year` int(4) NOT NULL,
  `make` varchar(255) NOT NULL DEFAULT '',
  `model` varchar(255) NOT NULL DEFAULT '',
  `transmission` varchar(255) NOT NULL DEFAULT '',
  `displacement` double NOT NULL,
  `cylinders` int(11) NOT NULL,
  `fuel_type` varchar(255) NOT NULL DEFAULT '',
  `combined` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `highway` int(11) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) 
```
3. Import the pixel-vehicle.sql data file into your vehicle table.
4. Update the /grails-app/conf/DataSource.groovy file ith your db username and password on lines 22 and 23.
5. Update the /grails-app/conf/Config.groovy file with a gmail username and password on line 65 and 66.
   (This is done to enable the ability to send verification emails to new users who register.)
6. The application is now set up to run an Apache Tomcat server instance.
7. You can now run app with ``` grails run-app ```
