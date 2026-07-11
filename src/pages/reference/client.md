import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Student App APIs

This documentation provides an overview of the functionalities for APIs related
to the Student Application.

## Public APIs

### Health API

**Method**: GET\
**Path**: `/health`\
**Description**: Verifies the health of the CHITTI. backend and acts as the
primary source of verification if its an external failure of the backend as a
monolothic layer is failing together.\
**Response Code**: `200`\
**Response Body**: `The backend is live 💓 - Chitti: Your last min prep buddy!!`

## Authentication

### Sign In

**Method**: POST\
**Path**: `/auth/sign-in`\
**Description**: Authenticates a user and returns a Firebase custom token.
Checks if the roll number exists, validates credentials, and handles device ID
verification.\
**Request Header**:

```json
{
  "X-App-Version": "X.Y.Z",
  "X-Device-Id": "string",
  "X-FCM-Token": "string"
}
```

**Request Body**:

```json
{
  "roll_number": "string",
  "password": "string"
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign in<span>200</span></div>} default>
```json
    {
      "message": "Sign-in successful",
      "token": "string",
      "status": true,
      "data": {
        "name": "string"
      }
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "Roll number is required",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>
  <TabItem value="403" label={<div className="api-tab-label">Another Device Exists<span>403</span></div>}>
```json
    {
        "message": "Another device already exists, request for a revoke of your current device.",
        "status": false,
        "revokes_left": 3,
        "reset_token": "eyJhY2NvdW50X3Rva2VuIjo...",
        "error_code": "auth/device-exists"
    }
    ```
    **JWT for `reset_token`**:

    ```json
    {
      "user_id": "221203XXXX", 
      "device_id_attempted": "new_device_uuid_9999",
      "exp": 1789945200 
    }
    ```

</TabItem>
  <TabItem value="500" label={<div className="api-tab-label">Unexpected Error<span>500</span></div>}>
```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### Sign in With OAuth (Google/Apple)

**Method**: POST\
**Path**: `/auth/oauth`\
**Description**: Authenticates a user with an external oauth provider like
Google or Apple and returns a Firebase custom token. Checks if the user exists,
validates credentials, and handles device ID verification. It also replaces the
deprecated internal-login API as this API also works with Admins, Instructors
and Staff.\
**Request Header**:

```json
{
  "X-App-Version": "X.Y.Z",
  "X-Device-Id": "string",
  "X-FCM-Token": "string"
}
```

**Request Body**:

```json
{
  "provider": "string",
  "id_token": "string"
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign in<span>200</span></div>} default>
```json
    {
      "message": "Sign-in successful",
      "token": "string",
      "status": true,
      "data": {
        "name": "string"
      }
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "ID Token is required",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>
  <TabItem value="403" label={<div className="api-tab-label">Another Device Exists<span>403</span></div>}>
```json
    {
        "message": "Another device already exists, request for a revoke of your current device.",
        "status": false,
        "revokes_left": 3,
        "reset_token": "eyJhY2NvdW50X3Rva2VuIjo...",
        "error_code": "auth/device-exists"
    }
    ```
    **JWT for `reset_token`**:

    ```json
    {
      "user_id": "221203XXXX", 
      "device_id_attempted": "new_device_uuid_9999",
      "exp": 1789945200 
    }
    ```

</TabItem>
<TabItem value="404" label={<div className="api-tab-label">User doesn't exist<span>404</span></div>}>
```json
    {
      "message": "User hasn't been signed-up on our platform.",
      "token":"string",
      "status": false,
      "error_code": "auth/user-not-found"
    }
    ```

</TabItem>
  <TabItem value="500" label={<div className="api-tab-label">Unexpected Error<span>500</span></div>}>
```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### Sign Up

**Method**: POST\
**Path**: `/auth/sign-up`\
**Description**: Creates a new user account and returns student details.\
**Request Headers**:

```json
{
  "X-App-Version": "X.Y.Z",
  "X-Device-Id": "string",
  "X-FCM-Token": "string",
  "Authorization": "Bearer ey........"
}
```

**Request Body**:

```json
{
  "name": "string",
  "semester": "string",
  "branch": "string",
  "organization": "string"
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign up<span>200</span></div>} default>
```json
    {
      "message": "Sign up successful",
      "status": true,
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "Semester is required/Organization not supported yet.",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>

<TabItem value="500" label={<div className="api-tab-label">Unexpected
Error<span>500</span></div>}>

```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### Revoke Device ID

**Method**: PATCH\
**Path**: `/auth/device/reset`\
**Description**: Revokes a user's device ID, preventing them from logging in on
that device.\
**Request Headers**:

```json
{
  "X-App-Version": "X.Y.Z"
}
```

**Request Body**:

```json
{
  "reset_token": "eyJhY2NvdW50X3Rva2VuIjo..."
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign up<span>200</span></div>} default>
```json
    {
      "message": "XYZ's device ID has been revoked.",
      "status": true,
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "Malformed payload",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>
<TabItem value="403" label={<div className="api-tab-label">Revokes Exhausted<span>403</span></div>}>
```json
    {
      "message": "No revokes left. Please request for a revoke.",
      "status": false,
      "error_code": "auth/revokes-exhausted"
    }
    ```

</TabItem>
 <TabItem value="404" label={<div className="api-tab-label">User Not Found<span>404</span></div>}>
```json
    {
      "message": "User not found.",
      "status": false,
      "error_code": "auth/user-not-found"
    }
    ```

</TabItem>

<TabItem value="500" label={<div className="api-tab-label">Unexpected
Error<span>500</span></div>}>

```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### Request Revoke Device ID

**Method**: POST\
**Path**: `/auth/device-revokes`\
**Description**: Request the user's for a specific reason for requesting the
revoke to a new device ID.\
**Request Headers**:

```json
{
  "X-App-Version": "X.Y.Z"
}
```

**Request Body**:

```json
{
  "reset_token": "eyJhY2NvdW50X3Rva2VuIjo...",
  "reason": "string"
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign up<span>200</span></div>} default>
```json
    {
      "message": "Your request to revoke your device has been submitted successfully",
      "status": true,
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "Reason is required",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>

<TabItem value="500" label={<div className="api-tab-label">Unexpected
Error<span>500</span></div>}>

```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### Fetch Profile

**Method**: GET\
**Path**: `/auth/profile/:role`\
**Description**: Fetch the user profile for the specific role specified.\
**Path Params**:\
`role`: The role for which the profile is requested, i.e, ADMIN, STAFF,
INSTRUCTOR, or STUDENT.\
**Request Headers**:

```json
{
  "X-App-Version": "X.Y.Z",
  "Authorization": "Bearer ey..."
}
```

**Response**:

<Tabs>
  <TabItem value="200-I" label={<div className="api-tab-label">Instructor Profile<span>200</span></div>} default>
```json
    {
      "message": "Profile fetched successfully",
      "status": true,
      "data": {
        "roll_number": "string",
        "username": "string",
        "bio": "string",
        "assigned_courses": [
          {
            "instructor_id": "string",
            "course_id": "string",
            "roles": "string",
            "is_lead": true
          }
        ],
        "email": "string",
        "name": "string",
        "semester": 7,
        "branch": null,
        "gpa": null,
        "sgpa": null,
        "image": "string",
        "user_role": ["INSTRUCTOR"]
      }
    }
    ```

</TabItem>
<TabItem value="200" label={<div className="api-tab-label">Profile Fetched<span>200</span></div>}>
```json
    {
      "message": "Profile fetched successfully",
      "status": true,
      "data": {
        "roll_number": "string",
        "username": "string",
        "email": "string",
        "name": "string",
        "semester": 7,
        "branch": null,
        "gpa": null,
        "sgpa": null,
        "image": "string",
        "user_role": ["STUDENT"]
      }
    }
    ```

</TabItem>
  <TabItem value="403" label={<div className="api-tab-label">Mismatched role for user<span>403</span></div>}>
```json
    {
        "message": "Student is not a ....",
        "status": false,
        "error_code": "auth/unauthorized"
    }
    ```

</TabItem>
<TabItem value="404" label={<div className="api-tab-label">User doesn't exist<span>404</span></div>}>
```json
    {
      "message": "User not found",
      "status": false,
      "error_code": "auth/user-not-found"
    }
    ```

</TabItem>

<TabItem value="500" label={<div className="api-tab-label">Unexpected
Error<span>500</span></div>}>

```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### Edit Profile

**Method**: PATCH\
**Path**: `/auth/profile`\
**Description**: Edit the user's profile, especially, their name, profile
picture, organization, branch, semester, or bio.\
**Request Headers**:

```json
{
  "X-App-Version": "X.Y.Z",
  "Authorization": "Bearer ey..."
}
```

**Request Body**:

```json
{
  "name": "string",
  "image_url": "string",
  "bio": "string",
  "organization": "string",
  "branch": "string",
  "semester": 7
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign up<span>200</span></div>} default>
```json
    {
      "message": "Profile updated successfully",
      "status": true,
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "Image URL is required./Organization not supported",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>

<TabItem value="500" label={<div className="api-tab-label">Unexpected
Error<span>500</span></div>}>

```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>

### [ADMIN] Fetch Token

**Method**: POST\
**Path**: `/auth/token-exchange/:user_id`\
**Description**: Exchange a Firebase ID token for the given user ID. Should be
only used by admins for token exchange.\
**Path Params**:\
`user_id`: The user id to generate the Firebase ID token

**Request Headers**:

```json
{
  "X-App-Version": "X.Y.Z",
  "X-Internal-Secret": "ey...."
}
```

**Response**:

<Tabs>
  <TabItem value="200" label={<div className="api-tab-label">Successful Sign up<span>200</span></div>} default>
```json
    {
      "message": "Fetched Firebase ID token successfully",
      "status": true,
      "token": "ey..."
    }
    ```

</TabItem>
  <TabItem value="400" label={<div className="api-tab-label">Invalid request<span>400</span></div>}>
```json
    {
      "message": "Misformed payload",
      "status": false,
      "error_code": "payload/misformed-payload"
    }
    ```

</TabItem>
<TabItem value="403" label={<div className="api-tab-label">Unauthorized<span>403</span></div>}>
```json
    {
      "message": "Unauthorized",
      "status": false,
      "error_code": "auth/unauthorized"
    }
    ```

</TabItem>

<TabItem value="500" label={<div className="api-tab-label">Unexpected
Error<span>500</span></div>}>

```json
    {
      "message": "Internal Server Error. Actual cause of the error",
      "status": false,
      "error_code": "auth/internal-error"
    }
    ```

</TabItem>
</Tabs>


## Parameters Table

| Parameter Name | Location | Description                                                                         |
| -------------- | -------- | ----------------------------------------------------------------------------------- |
| `courseId`     | Path     | The unique identifier of the _course_ for retrieving course/topic/resource details. |
| `unitId`       | Path     | The unique identifier of the _unit_ for retrieving topics.                          |
| `topicId`      | Path     | The unique identifier of the _topic_ for retrieving resources by type.              |

## Request Body Table

| Field Name   | Type   | Description                                        |
| ------------ | ------ | -------------------------------------------------- |
| `rollNo`     | String | User's _roll number_ for authentication.           |
| `pass`       | String | User's _password_ for authentication.              |
| `deviceId`   | String | The device ID used for _device_ verification.      |
| `name`       | String | User's _name_ for registration.                    |
| `semester`   | Number | User's current _semester_ for registration.        |
| `courses`    | Array  | List of _course IDs_ for registration.             |
| `schedule`   | String | User's _schedule_ information for registration.    |
| `subId`      | Number | _Subscription ID_ for registration.                |
| `resourceId` | String | The identifier of the completed _resource_ to add. |
| `userId`     | String | User's Id for Razorpay _payment creation_.         |
| `courseId`   | String | The Course ID to which the user is _subscribing_.  |
| `amount`     | Number | The _amount_ for the Razorpay order.               |
| `receipt`    | String | _Receipt_ for the Razorpay order.                  |
| `orderId`    | String | Razorpay Order ID to _Verify Payment_.             |
| `paymentId`  | String | Razorpay Payment ID to _Verify Payment_.           |
| `signature`  | String | Razorpay signature to _Verify Payment_.            |
```
