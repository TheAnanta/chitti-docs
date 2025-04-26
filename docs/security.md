# Security

## Overview

The CHITTI application is highly secured through a series of security measures and policies well defined at different levels of implementation.

## Client Application

The client application makes comprehensive use of [**`no_screenshot_plus`**](https://pub.dev/packages/no_screenshot_plus) package to disable screenshotting, screen recording, and screen sharing of any form/means.

As the app starts up, the **`no_screenshot_plus`** package is initialized to enable all the security policies and start listening for events related to taking a screenshot, to warn the user of the not allowed action.

The client application also makes extensive usage of the watermark widget, to overlay the user's ID over the content to be able to identify the source root of proprietory data leak.

Device-restriction is implied over the entire application framework, to ensure a single user account is used in a single time-frame to not allow misuse of content and protect CHITTI and its proprietory content from infringement/data sharing.

## Serverlet and Admin SDK

Every API route that provides confidential or proprietory data as a response is securely authenticated with the help of the token sent through the **`Authorization`** header in the form of a bearer token.

The exchange of tokens happens on the client side, and is used to uniquely identify the user to process the personalized HTTP request.

## Admin application

The admin panel is secured through the user authentication token which is short-lived and is generated when the admin signs into the application. Although users can gain access to specific endpoints of the admin panel, mitigating the network requests and obtaining a valid admin auth token poses a serious hardship for unauthorized attackers.
