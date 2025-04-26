# Architecture

## Overview

The CHITTI. client application is built with the Flutter SDK following the clean architectural principles and taking guidance from the [Android Architectural Components](https://developer.android.com/topic/architecture) such as **modularization, unidirectional dataflow and Hilt-like injection**.

The **Flutter SDK** [<sup>1</sup>](#references-1) is a comprehensive framework that aids in building beautiful, native-like cross-platform applications from a single codebase with the help of the Flutter Engine which renders content over native applications as a fragment, making use of the rich performance and optimization delivered by the **Dart** [<sup>2</sup>](#references-2) programming language.

## Components

The components of the client application can be primary divided into 3 layers: data, domain and presentation layer.

• **The data layer** deals with data and operations related to maintaining the application data. The data layer includes datasources, implementation of repositories and model with their functions.

• **The domain layer** deals with handling busssiness logic and performing common repetitive operations and defined the scope of code to the scope of the bussiness activity. The domain layer includes abstract repository patterns, entities that the bussiness deals with, and use cases that the application needs to handle to meet bussiness requirements.

• **The presentation layer** deals with interfaces that the user interacts with. The presentation layer includes widgets and pages that are visible to the user, injectors and state management that aid in providing the state to the respective widgets and pages to be used to draw the elements on the screen and making sure the data is always up-to-date and synchronized.

### Models

Models are the digital implementation of real-world objects. They include properties and methods that help identify the object and define boundaries around which/how the object can be handled. The CHITTI. application makes use of the following models throughout the scope of the application:

1. Semester
2. Subject
3. Unit
4. UnitWithResources
5. CompletedResource
6. Roadmap
7. RoadmapItem
8. Cheatsheet
9. Video
10. Notes
11. Important Questions

These specific models are defined based on the **bussiness model** of CHITTI. and are [static final](https://www.geeksforgeeks.org/final-static-variable-java/) classes that are implemented in the data layer to help set constraints on the various operations that can be performed on data of the particular type. More about the schemas of each of the above models can be read [**here**](models).

<!-- 1. [**`Semester`**](https://github.com/TheAnanta/chitti-app/blob/main/lib/data/semester.dart): The **`Semester`** data class is used to hold student specific data such as subjects, visited resources, etc.  -->

### Datasources

Datasources are specialized classes that hold, provide and allow for modification of application data. For CHITTI. the API responses from the serverlet application acts as the primary datasource and the **primary source of truth**.

The data source uses the `fetch` method provided by the `http` package to make the HTTP requests to the serverlet.

For convenience, better state management and better user experience, a copy of the data from the primary source of truth is cloned and cached in the repository for faster, cheaper and easier access to data, i.e, acts as the **secondary source of truth**, however as an **online-first experience**, the data from the primary source of truth, the application data from the APIs serve as the final ultimate source of truth.

### Repositories

Repositories are specialized classes that interface the presentation layer and data sources to expose the application data from multiple data sources to provide the latest source of truth to the presentation layer.
Due to high upsurge in the HTTP requests that are sent to the servelet from the client application, proper management of the source of truth becomes inevitable.

As per the requirement of the product owner, the application can only be run only from a single device instance at a particular instance of time. This eliminates the chance of deadlock on the data present in the server. Hence, optimal fetching of data can be implemented by using the repository through cloning the application data from the server during app startup, and then making changes to both offline and online datasources implemented through the repository to reduce the HTTP `GET` requests, reducing the bandwith on the server.

Thus, the client application, extends the [**`SemesterRepository`**](https://github.com/TheAnanta/chitti-app/blob/main/lib/data/semester_repository.dart) to interface the application data pertaining to the relevant semester details of a particular authenticated student and the presentation layer. The data in the `SemesterRepository` is further utilized to fetch the specific topic-related data and content at runtime on request by the [**`UnitRepository`**](https://github.com/TheAnanta/chitti-app/blob/main/lib/data/unit_repository.dart) which holds the latest data about each individual topic of a unit present in a subject, stored as cache in the internal memory, to be retrived for further use and upholds the latest changes to the data to synchronize indirectly with the data present in the server.

### Use cases

Use cases are constraint-bounded well-defined functions that are the backbone for the bussiness activity of the application. They are functions which are called frequently from different parts of the application to serve the purpose of the application. They expose functions, methods and data through well-defined strucutre and schema like data fetching, modifying data, etc.

The CHITTI app heavily relies on two major use cases:

1. fetchSemester
2. fetchResourcesForUnit

More about the use cases, their input and output schemas and usage can be understood [**here**](usecases).

### Injector

The injector is a specialized static class that exposes the repository to the presentation layer, providing the specific instance of a specific class that is very costly to construct to the descendants of the application widget tree below the initialization.

According to the [Android Architectural Components](https://developer.android.com/topic/architecture), injection of specific dependencies caters for the ability to be able to develop and test efficient code to work with different sources, i.e, abstracts the logic into well-defined classes that can swapped out at any particular instance of time without disturbing the harmonical balance of the application, thus avoiding any potential coupling within the application.

In the context of the CHITTI., the injector injects a [**singleton**](https://en.wikipedia.org/wiki/Singleton_pattern) instance of the `SemesterRepository` and `UnitRepository` to the descendants of the `MaterialApp` widget.

### State Management

State management libraries maintain (fetched and updated) the application data provided by the repositories through the static singleton instance of the injector contains the application state based on user interaction. They maintain a history of the state to be able to produce the dynamic user interace in the application upon binding with the stateless state holder views.

In CHITTI., the in-built state management functionality provided by the Flutter SDK such as [`ChangeNotifier`](https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html), [`ValueListenableBuilder`](https://api.flutter.dev/flutter/widgets/ValueListenableBuilder-class.html) and [`setState`](https://api.flutter.dev/flutter/widgets/State/setState.html) are used to manage and share state across the application with help from the singleton instance of the related repositories through the injector.

### Widgets

Widgets are specialized Dart classes that are defined to be producing a stateless/stateful user interface after a series of computatations, measurements, composition and painting.

Flutter follows the declarative pattern of writing code, i.e, the user interface is built/updated on the application state that is provided rather than
user called functions to set the application state, i.e, in laymans terms, what you provide is what you get.

In CHITTI., most of the widgets are simple stateless widgets due to their low-cost of construction, simplicity of lifecycle, and static data they display. The state management libraries act as the primary source of stateless holders for the app state to be displayed with the lifeless stateless widgets.

### Pages

Pages are stateless/stateful widgets that are a combination of specific components rendered to build complex user interface screens that help establish the userflow.

The primary pages of CHITTI. are follows:

1. Splash Page
2. Login Page
3. Home Page
4. Dashboard Fragment
5. Subject Page
6. Topic Page
7. PDF Viewer Page
8. Video Player Page
9. Profile Page

## References

<span id="references-1">1. The "Flutter" name and logo are trademarks owned by Google.</span><br/><br/>

<span id="references-2">2. The "Dart" name and logo are trademarks owned by Google.</span><br/><br/>
