Double Submit Cookies Pattern
===================


This project demonstrates how to use CSRF Tokens and Session IDs to validate sessions and users using **NodeJS**.

----------


Setup
-------------

#### <i class="icon-file"></i> Requirements

A recent version of **NodeJS** and **NPM**.

#### <i class="icon-file"></i> Running the App

Clone this repository **Use master branch !**

> **Steps:**

> - Run `npm install`.
> - Navigate to `double-submit-cookies-pattern ` directory and run `node index.js`.
> - The app runs on port **3001**.
> - Open a web browser and navigate to http://localhost:3001/  
> - User username **root** and password **root** to log in.



Description
-------------------

Upon successful user login, the server generates a **Session ID** and a **CSRF Token** for the session. Session ID and CSRF token is set as browser cookies. When user submits the form, The server validates whether the Session ID and CSRF Token matches. When user logs out Session ID and CSRF Token are deleted from the server making them unusable.

> **Note:**

> - Auto generated UUIDs are used for Session ID and CSRF Token.

About Project and Author
-------------

#### <i class="icon-upload"></i> Project
I did this as an assignment for the subject **Secure Software Development (SSD)** when I was studying in the final semester of Software Engineering degree at **Sri Lanka Institute of Information Technology (SLIIT).**






































































































































































































































































































































































































































































































































































































































































































































