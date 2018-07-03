# *Feed Reader Testing*
Project from Udacity's Front End Web Developer nanodegree program which consists in creating unit tests to test a RSS feed reader application using Jasmine framework.

## Run the project
Open [index](https://cdn.rawgit.com/FDMOliveira/Front-end-nanodegree-exercises/23edd06/FeedReaderTesting/index.html)

## Stack
* Test Framework:
  * Jasmine
  * jasmine-jquery
* Libraries:
  * JQuery
  * Handlebars
* API: Google Feed

## *Tests*
Tests that have been implemented:

* RSS Feeds
  * are defined
  * should have a URL defined, it should not be empty
  * should have a name defined, it should not be empty
* The menu
  * should be hidden by default
  * should be displayed when clicked and hidden when clicked again
  * Initial Entries
  * should have at least one entry displayed on the feed
* New Feed Selection
  * should change the content when a new feed is loaded