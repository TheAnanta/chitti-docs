# Databases

## Overview

Prisma ORM is used to manipulate the data and the database schema in both the development and production environments that each link a seperate PostgreSQL instance.

## Models

### Visual Representation

```text
Student
   │
   └─── Auth

Student
   └─── (enrolls in) Courses

Course
   └─── Units
         ├─── Roadmap
         ├─── Notes
         ├─── Cheatsheet
         ├─── ImportantQuestions
         └─── Video
```

### Student

Represents a **student** enrolled in the system.

| Field       | Type       | Description                                                   |
| :---------- | :--------- | :------------------------------------------------------------ |
| `rollNo`    | `String`   | GITAM roll number for the student (Primary Key).              |
| `name`      | `String`   | Full name of the student.                                     |
| `semester`  | `Int`      | Current semester number the student is in.                    |
| `courses`   | `String[]` | List of course IDs the student is enrolled in.                |
| `schedule`  | `String`   | Student's exams schedule in a serialized format (e.g., JSON). |
| `completed` | `String[]` | List of completed resource IDs by the student.                |

---

### Auth

Handles **authentication** details separately from student profile.

| Field       | Type                              | Description                                   |
| :---------- | :-------------------------------- | :-------------------------------------------- |
| `rollNo`    | `String`                          | Roll number (Primary Key), linked to Student. |
| `pass`      | `String`                          | Password for login.                           |
| `subId`     | **0**\|**1**\|**2**\|**3**\|**4** | Subscription or authentication identifier.    |
| `courseIds` | `String[]`                        | Courses the user has paid for.                |
| `deviceId`  | `String`                          | Device identifier used for secure login.      |

#### Subscription Types:

`0` - Freemium user\
`1` - User with access to notes, cheatsheets, important questions and roadmap\
`2`- User with subscription access to videos\
`3` - User with completete subscription of the couse/subject\
`4` - Admin access

---

### Course

Represents a **course** offered in the system.

| Field            | Type     | Description                                                   |
| :--------------- | :------- | :------------------------------------------------------------ |
| `courseId`       | `String` | Unique course ID based on GITAM mapping (Primary Key).        |
| `courseCategory` | `String` | Hyphen seperated category of the course (e.g., program-core). |
| `title`          | `String` | Title or name of the course.                                  |
| `description`    | `String` | Brief description of the course content.                      |
| `image`          | `String` | Cover URL for the course image or thumbnail.                  |
| `icon`           | `Int`    | Icon code for UI display (Default: 61239).                    |

---

### Unit

Represents a **unit/module** inside a course.

| Field            | Type     | Description                                                |
| :--------------- | :------- | :--------------------------------------------------------- |
| `courseId`       | `String` | ID of the course this unit belongs to.                     |
| `unitId`         | `String` | Unique unit ID (Primary Key, auto-generated UUID).         |
| `unitNo`         | `Int`    | Unit number/order inside the course.                       |
| `unitName`       | `String` | Name/title of the unit.                                    |
| `description`    | `String` | Summary or introduction to the unit.                       |
| `difficulty`     | `String` | Difficulty level (e.g., Beginner, Intermediate, Advanced). |
| `totalResources` | `Int`    | Total number of learning resources linked to this unit.    |

---

### Roadmap

Represents a **learning roadmap item** or topic for a unit.

| Field        | Type     | Description                                                 |
| :----------- | :------- | :---------------------------------------------------------- |
| `roadId`     | `String` | Unique ID for the topic (Primary Key, auto-generated UUID). |
| `courseId`   | `String` | ID of the course this topic is linked to.                   |
| `unitId`     | `String` | ID of the unit this topic is linked to.                     |
| `difficulty` | `String` | Priority level of the topic targeted by the roadmap.        |
| `name`       | `String` | Title/name of the topic.                                    |

> **Index:** Composite index on `courseId` and `unitId` for faster lookups.

---

### Notes

Represents a **set of notes** for a particular topic inside a unit.

| Field      | Type     | Description                                         |
| :--------- | :------- | :-------------------------------------------------- |
| `notesId`  | `String` | Unique notes ID (Primary Key, auto-generated UUID). |
| `courseId` | `String` | ID of the course.                                   |
| `unitId`   | `String` | ID of the unit.                                     |
| `topicId`  | `String` | Specific topic ID within the unit.                  |
| `url`      | `String` | URL where the notes are hosted/downloadable.        |
| `name`     | `String` | Title of the notes.                                 |

> **Index:** Composite index on `courseId`, `unitId`, and `topicId`.

---

### Cheatsheet

Represents a **cheatsheet** — quick revision material — for a topic.

| Field      | Type     | Description                                              |
| :--------- | :------- | :------------------------------------------------------- |
| `cheatId`  | `String` | Unique cheatsheet ID (Primary Key, auto-generated UUID). |
| `courseId` | `String` | ID of the course.                                        |
| `unitId`   | `String` | ID of the unit.                                          |
| `topicId`  | `String` | Topic ID inside the unit.                                |
| `url`      | `String` | URL where the cheatsheet is accessible.                  |
| `name`     | `String` | Title/name of the cheatsheet.                            |

> **Index:** Composite index on `courseId`, `unitId`, and `topicId`.

---

### ImportantQuestions

Represents **important questions** for exam preparation for a unit.

| Field      | Type     | Description                                                           |
| :--------- | :------- | :-------------------------------------------------------------------- |
| `iqId`     | `String` | Unique ID for important questions (Primary Key, auto-generated UUID). |
| `courseId` | `String` | Course ID.                                                            |
| `unitId`   | `String` | Unit ID.                                                              |
| `url`      | `String` | URL to the PDF or resource for important questions.                   |

> **Index:** Composite index on `courseId` and `unitId`.

---

### Video

Represents a **video resource** for a specific topic inside a unit.

| Field       | Type     | Description                                         |
| :---------- | :------- | :-------------------------------------------------- |
| `videoId`   | `String` | Unique video ID (Primary Key, auto-generated UUID). |
| `courseId`  | `String` | ID of the course.                                   |
| `unitId`    | `String` | ID of the unit.                                     |
| `topicId`   | `String` | Topic ID within the unit.                           |
| `url`       | `String` | URL where the video is hosted.                      |
| `thumbnail` | `String` | URL of the thumbnail image for the video.           |
| `name`      | `String` | Title of the video.                                 |

> **Index:** Composite index on `courseId`, `unitId`, and `topicId`.

---

## Quick Notes

- UUIDs (`@default(uuid())`) are used for most resource IDs for uniqueness.
- Multiple composite indexes (`@@index`) optimize frequent queries based on `courseId`, `unitId`, and `topicId`.
- Authentication (`Auth`) and profile (`Student`) are separated for modular design.
- `schedule` is saved as a `String`, suggesting it's a serialized (JSON) structure.

## Relationships Between Models

- **Student**  
  ↳ Has authentication information linked by `rollNo` in the `Auth` table.  
  ↳ Enrolled in multiple **Courses** (by storing `courseId`s in `courses` array).

- **Auth**  
  ↳ Authenticates a **Student** via `rollNo`.  
  ↳ Contains a list of enrolled `courseIds` separately (for security/permissions).

- **Course**  
  ↳ One **Course** can have multiple **Units**.  
  ↳ One **Course** can have multiple **Roadmaps**, **Notes**, **Cheatsheets**, **ImportantQuestions**, and **Videos**.

- **Unit**  
  ↳ Belongs to exactly **one Course** (`courseId`).  
  ↳ Contains multiple **Roadmaps**, **Notes**, **Cheatsheets**, **Videos**, and **ImportantQuestions**.

- **Roadmap**  
  ↳ Belongs to a **Unit** and a **Course** (`unitId`, `courseId`).  
  ↳ Defines the learning roadmap for that unit.

- **Notes**  
  ↳ Linked to a **Unit**, **Course**, and a specific **Topic** (`unitId`, `courseId`, `topicId`).  
  ↳ Provides detailed study material.

- **Cheatsheet**  
  ↳ Linked to a **Unit**, **Course**, and a specific **Topic** (`unitId`, `courseId`, `topicId`).  
  ↳ Provides quick revision material.

- **ImportantQuestions**  
  ↳ Linked to a **Unit** and **Course** (`unitId`, `courseId`).  
  ↳ Provides important exam questions for that unit.

- **Video**  
  ↳ Linked to a **Unit**, **Course**, and a specific **Topic** (`unitId`, `courseId`, `topicId`).  
  ↳ Provides video learning material.
