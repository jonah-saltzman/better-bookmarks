# Better Bookmarks
![Cool app](https://i.imgur.com/Xo8d2Zf.png)

[Better Bookmarks](https://jonah-saltzman.github.io/better-bookmarks/) is an app for managing Twitter Tweets. While bookmark functionality is built-in to Twitter's own apps, Twitter only provides one "folder" that stores all your bookmarked Tweets. With Better Bookmarks, you can create any number of folders to store Tweets for later, and a Twitter account is not required to do so. If you choose to connect your Twitter account to Better Bookmarks, you can easily add Tweets that you've "liked" to your Better Bookmarks folders; otherwise, an import feature lets you add any Tweet just by copy/pasting its URL. And even if a Tweet you've bookmarked gets deleted, Better Bookmarks allows you to view an archived version of the Tweet that lasts forever.

## Update 1/4/22 - Image archiving!
![Image archiving](https://i.imgur.com/6euuApL.png)

Better Bookmarks now automatically downloads all images included in any bookmarked Tweet. If the Tweet gets deleted, the BB client will now fetch and render the images stored in the BB database.

# Client
![Auth page](https://i.imgur.com/ODPpIkX.png)

The client for Better Bookmarks is a single-page application built with React. Users interact with the client, which creates and makes appropriate requests of the Better Bookmarks API, provided by my [Express-based Node.js server](https://github.com/jonah-saltzman/bookmarks-plus). The client makes use of many UI elements provided by react-bootstrap. React-router is used to route the user between different parts of the application, while react-in-viewport is used to implement lazy-loading functionality for displaying Tweets with high performance.

## Folders
![One folder](https://i.imgur.com/0h8hoSU.png)

The central feature of Better Bookmarks is the folders into which you may save Tweets. A user can have an unlimited number of folders, a folder can hold an unlimited number of Tweets, and a user may save the same Tweet into any number of folders. Folders can be re-named and deleted, and Tweets can be added to and removed from their folders. In a future update, color-coding of folders will be added. Selecting a folder will cause the Tweets it contains to be rendered in a scrollable container; by default, the actual, live Tweet will be displayed by implementing Twitter's [JavaScript API](https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-factory-functions). Media, including GIFs and videos, are fully playable once a Tweet has been added to a folder.

## Sharing
![Share a folder](https://i.imgur.com/urY6FFz.png)

Users can toggle any folder to be shareable. While a folder is shared, the generated link can be used by anyone to view the Tweets in that folder, even without a Better Bookmarks account. If a user wants to stop sharing a shared folder, they may simply toggle sharing to be off, and the link will no longer work. The archived version of a Tweet that is stored in the BB database is also accessable to viewers of a shared folder.

## Deleted Tweets
![Deleted Tweet](https://i.imgur.com/a5LCRXL.png)

When a Tweet is added to a folder, Better Bookmarks fetches a large amount of information about the Tweet using [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api), which is completely separate from the JavaScript API. All of this information is stored in the Better Bookmarks database, and is then used to construct a request to the [Twitter oEmbed API](https://developer.twitter.com/en/docs/twitter-for-websites/timelines/guides/oembed-api), to retrieve an HTML string representing the Tweet, which is then also stored in the database. When viewing the Tweets stored in a folder, first the archived version of the Tweet is rendered while the client attempts to fetch the live Tweet. Tweets that have been deleted simply remain as the archived version, while non-deleted Tweets will be replaced with the embedded version once loading is complete.

![Deleted Tweet](https://i.imgur.com/VSXtAnK.png)

## Likes

The easiest way to add Tweets to a folder for a user to connect their Twitter account to their Better Bookmarks account, which allows BB to display all of their liked Tweets, starting with the most recent, and in the same format as Tweets in a folder. A user simply clicks on the Liked Tweet they wish to add, and it will be added to the currently selected folder. Any Liked Tweet that has been added to the selected folder will be blurred out, so it is easy to tell which Tweets have already been added to that folder. Upon selecting a different folder, only those Tweets already in that folder will blur.

## Import
![Import a Tweet](https://i.imgur.com/nJszKRW.png)

Better Bookmarks was designed to be completely usable without a Twitter account. If a user does not have a Twitter account or does not want to connect it to their BB account, they can manually import Tweets using the Import section. The easiest way to import a Tweet is to simply click "Copy Link to Tweet" in the "share" menu of any Tweet, and paste the URL into one of the import fields. BB will automatically confirm that the URL is a valid Tweet URL and add it to the selected folder using the same method by which Liked Tweets are added. Tweets added in this way are also archived and are therefore also protected against deletion.

## Sign in with Twitter
![Sign in with Twitter](https://i.imgur.com/GgsggVw.png)

In addition to the authorization flow to allow Better Bookmarks to access a user's Liked Tweets, BB also allows users to sign up for an account and login using only their Twitter account, no email or password required. If a user creates an account with an email address and connects that account to their Twitter account, then subsequently uses the "Login with Twitter" method with the same Twitter account, the Better Bookmarks server will determine that that email+password account should be merged with the "Login with Twitter", after which the user will be able to use either login method to access their account.

## User Stories

Prior to starting the development of Better Bookmarks, I wrote the following user stories to guide my process:
 - As a twitter user, I want to be able to bookmark tweets into
   different folders that I define myself.
   
 - As a twitter user, I want my bookmarked tweets to be saved even if   
   one of them gets deleted from twitter.
   
 - As a Better Bookmarks user, I want it to be easy to find the tweets  
   that I want to bookmark.
   
 - As a Better Bookmarks user, I don't want Better Bookmarks to make any
   changes to my twitter account.
   
 - As a Better Bookmarks user, I want to be able to share my bookmark   
   folders with people who don't use Better Bookmarks.

## Wireframes

### Homepage
![Homepage](https://i.imgur.com/SX6vzNR.jpg)
### Login/Signup
![Authentication](https://i.imgur.com/syxns11.jpg)
### Folder view
![Folder view](https://i.imgur.com/eo6drwj.jpg)