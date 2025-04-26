# Models

## Overview

Models are the digital implementation of real-world objects. They include properties and methods that help identify the object and define boundaries around which/how the object can be handled. The CHITTI. application makes use of the following models throughout the scope of the application:

1. [Semester](#semester)
2. [Subject](#subject)
3. [Unit](#unit)
4. [UnitWithResources](#unitwithresources)
5. [CompletedResources](#completedresources)
6. [Roadmap](#roadmap)
7. [RoadmapItem](#roadmapitem)
8. [Cheatsheet](#cheatsheet)
9. [Video](#video)
10. [Notes](#notes)
11. [Important Questions](#important-questions)

These specific models are defined based on the bussiness model of CHITTI. and are static final classes that are implemented in the data layer to help set constraints on the various operations that can be performed on data of the particular type.

The CHITTI. client application heavily relies on the above well-structed and well-defined rigid models to read, modify and update application data.

## Semester

### Properties

#### `semester`

**type:** `int`\
**modifier:** final\
Defines the current semester the student is enrolled in.

#### `completed`

**type:** `List<CompletedResources>`\
**modifier:** final\
A reference to the resources which have been visisted by the student in the application.

#### `courses`

**type:** `Map<String, List<Subject>>`\
**modifier:** final\
A list of all the subjects, grouped by their course category (eg. program-core) as the key in a key-value pair representation.

### Methods

#### `fromMap`

A static helper function to reduce the JSON object provided into a semester object.

1. It takes the data about the different subjects and converts to the `Subject` model using the helper function.
2. It then converts the snapshot of completed resources to be parsed into the `CompletedResources` model.
3. It then computes the progress of the user.
4. Return all the computed parameters parsed as a `Semester` object.

---

## Subject

### Properties

#### `courseId`

**type:** `String`\
**modifier:** final\
Unique identifier for the subject/course based on GITAM definition, eg. **CSEN2011, MATH2361**.

#### `courseCategory`

**type:** `String`\
**modifier:** final\
Category of the course (for example, "Program Core", "Open Elective").

#### `title`

**type:** `String`\
**modifier:** final\
Title of the subject with each word capitalized.

#### `description`

**type:** `String`\
**modifier:** final\
A brief description about the subject.

#### `icon`

**type:** `IconData`\
**modifier:** final\
Icon representing the subject visually.

#### `progress`

**type:** `double`\
**modifier:** final\
Progress percentage of resources completed within the subject.

#### `image`

**type:** `String`\
**modifier:** final\
Cover image URL for the subject.

#### `units`

**type:** `List<Unit>`\
**modifier:** final\
List of units associated with the subject.

### Methods

#### `fromMap`

Converts a `Map<String, dynamic>` into a `Subject` object.

1. Parses title, description, and units list.
2. Normalizes title casing.
3. Converts each unit to a `Unit` model.

#### `copyWithProgress`

Returns a new copy of the `Subject` with an updated progress value, keeping other properties unchanged.

---

## Unit

### Properties

#### `unitId`

**type:** `String`\
**modifier:** final\
Unique identifier for the unit.

#### `name`

**type:** `String`\
**modifier:** final\
Name/title of the unit.

#### `difficulty`

**type:** `String`\
**modifier:** final\
Difficulty level of the unit (easy, medium, hard).

#### `description`

**type:** `String`\
**modifier:** final\
Short description of what the unit covers.

#### `isUnlocked`

**type:** `bool`\
**modifier:** final\
Indicates if the unit is currently unlocked for the user.

#### `totalResources`

**type:** `int`\
**modifier:** final\
Total number of resources available in the unit.

#### `roadmap`

**type:** `Roadmap?`\
**modifier:** final\
Optional roadmap guiding how the unit should be completed.

#### `importantQuestions`

**type:** `ImportantQuestion?`\
**modifier:** final\
Optional list of important questions related to the unit.

### Methods

#### `fromMap`

Parses a `Map<String, dynamic>` into a `Unit` object.

1. Maps roadmap items into `RoadmapItem` models.
2. Converts important questions if available.

---

## UnitWithResources

### Properties

#### `unitId`, `name`, `difficulty`, `description`, `isUnlocked`, `roadmap`

(Same as Unit model.)

#### `videos`

**type:** `List<Video>?`\
**modifier:** final\
Optional list of videos related to the unit.

#### `notes`

**type:** `List<Notes>?`\
**modifier:** final\
Optional list of notes.

#### `cheatsheets`

**type:** `List<Cheatsheet>?`\
**modifier:** final\
Optional list of cheatsheets.

---

## CompletedResources

### Properties

#### `courseId`

**type:** `String`\
**modifier:** final\
Course identifier related to the completed resource.

#### `resourceId`

**type:** `String`\
**modifier:** final\
Unique identifier for the completed resource.

#### `resourceName`

**type:** `String`\
**modifier:** final\
Human-readable name of the completed resource.

### Methods

#### `fromSnapshot`

Parses a JSON string into a `CompletedResources` object.

#### `toMap`

Converts the `CompletedResources` object to a JSON-serializable map.

#### `toJson`

Converts the object to a JSON string.

---

## Roadmap

### Properties

#### `roadmapItems`

**type:** `List<RoadmapItem>`\
**modifier:** final\
List of steps/items to complete the unit sequentially.

---

## RoadmapItem

### Properties

#### `id`

**type:** `String`\
**modifier:** final\
Unique identifier for the roadmap item.

#### `name`

**type:** `String`\
**modifier:** final\
Name/title of the roadmap step.

#### `difficulty`

**type:** `String`\
**modifier:** final\
Difficulty rating for the particular roadmap step.

---

## Cheatsheet

### Properties

#### `id`

**type:** `String`\
**modifier:** final\
Unique identifier for the cheatsheet.

#### `name`

**type:** `String`\
**modifier:** final\
Name/title of the cheatsheet.

#### `url`

**type:** `String`\
**modifier:** final\
URL pointing to the cheatsheet resource.

---

## Video

### Properties

#### `id`

**type:** `String`\
**modifier:** final\
Unique identifier for the video.

#### `name`

**type:** `String`\
**modifier:** final\
Title of the video.

#### `url`

**type:** `String`\
**modifier:** final\
URL to access the video.

#### `thumbnail`

**type:** `String`\
**modifier:** final\
Thumbnail image URL for the video.

---

## Notes

### Properties

#### `id`

**type:** `String`\
**modifier:** final\
Unique identifier for the notes document.

#### `name`

**type:** `String`\
**modifier:** final\
Name/title of the notes.

#### `url`

**type:** `String`\
**modifier:** final\
URL pointing to the notes resource.

---

## Important Questions

### Properties

#### `id`

**type:** `String`\
**modifier:** final\
Unique identifier for the important question.

#### `url`

**type:** `String`\
**modifier:** final\
URL pointing to the important question resource.

---

## Summary

Each model is a final class in the data layer of the CHITTI. application.  
Their main purpose is to:

1. Set strong typing constraints.
2. Enable easy serialization/deserialization from the database.
3. Provide structure for the app’s frontend to display and manipulate user data cleanly.
