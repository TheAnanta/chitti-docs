# Use cases

Use cases are constraint-bounded well-defined functions that are the backbone for the bussiness activity of the application. They are functions which are called frequently from different parts of the application to serve the purpose of the application. They expose functions, methods and data through well-defined strucutre and schema like data fetching, modifying data, etc.

The CHITTI app heavily relies on two major use cases:

1. fetchSemester
2. fetchResourcesForUnit

## `fetchDeviceId`

### Description

Fetches a unique device identifier based on the platform the application is running on.

### Inputs

- No external input parameters.

### Outputs

- Returns a `Future<String>` which contains the device identifier.
  - For **MacOS**: `systemGUID`
  - For **iOS**: `identifierForVendor`
  - For **Windows**: `deviceId`
  - For **Other platforms** (e.g., Android): Firebase Messaging Token.

### Behavior

- If fetching fails, returns `"revoked"` as a fallback identifier.

---

## `fetchSemester`

### Description

Fetches the current semester details for a student using their authentication token and device ID.

### Inputs

- `token` (type: `String`): A valid Firebase authentication token.
- `onSignOut` (type: `Function`): A callback function to execute in case of token invalidation (401 error).

### Outputs

- Returns a `Future<Semester>` model populated with the course data.

### Behavior

- Makes a GET request to the cloud function endpoint using the device ID.
- If successful (HTTP 200), parses the response into a `Semester` object.
- If unauthorized (HTTP 401), signs the user out and triggers `onSignOut`.
- On other errors, attempts to extract a message from the server response or throws a general exception.

---

## `fetchResourcesForUnit`

### Description

Fetches all learning resources for a specific unit, including its roadmap, videos, notes, and cheatsheets.

### Inputs

- `context` (type: `BuildContext`): Required to show snackbars in case of errors.
- `subjectId` (type: `String`): Unique ID of the subject/course.
- `unitId` (type: `String`): Unique ID of the unit within the subject.
- `roadmapId` (type: `String`): Unique ID of the roadmap for that unit.

### Outputs

- Returns a `Future<(Roadmap?, List<Video>?, List<Notes>?, List<Cheatsheet>?)>`.
  - `Roadmap?`: The list of roadmap steps for the unit.
  - `List<Video>?`: List of videos associated with the unit.
  - `List<Notes>?`: List of notes associated with the unit.
  - `List<Cheatsheet>?`: List of cheatsheets for the unit.

### Behavior

- Makes a GET request to the `/unit/{subjectId}/{unitId}/{roadmapId}/all` endpoint.
- Parses roadmap, videos, notes, and cheatsheets individually from the server response.
- If the request fails, shows an error `SnackBar` with the server message.
- Returns all parsed data grouped in a tuple.

---

## `addCompletedResource`

### Description

Adds a completed resource entry for a student after they've finished engaging with a learning item (video, notes, cheatsheet, etc).

### Inputs

- `context` (type: `BuildContext`): Required to show snackbars in case of errors.
- `res` (type: `CompletedResources`): A completed resource object that contains the resource metadata.

### Outputs

- Returns a `Future<String>` which contains the server response message.

### Behavior

- Makes a POST request to the `/add-completed` endpoint.
- Sends the serialized JSON form of the `CompletedResources` model.
- Displays success or error messages using a `SnackBar`.
- Returns the success message received from the server, if available.
