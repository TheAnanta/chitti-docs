# Student App APIs

This documentation provides an overview of the functionalities for APIs related to the Student Application.

## General

### Login

**Method**: POST\
**Request Body**:
```json
{
  "rollNo": ,
  "pass": ,
  "deviceId":
}
```
**Description**: Authenticates a user and returns a Firebase custom token.  Checks if the roll number exists, validates credentials, and handles device ID verification.

### Reauthenticate

**Method**: POST\
**Headers**:
- `Authorization`: Bearer "token"

**Description**: Re-authenticates a user using an existing Firebase ID token and returns a new token.

### Revoke Device ID

**Method**: POST\
**Request Body**:
```json
{
  "rollNo":
}
```
**Description**: Revokes a user's device ID, preventing them from logging in on that device.

### Signup

**Method**: POST\
**Request Body**:
```json
{
  "rollNo": ,
  "pass": ,
  "name": ,
  "semester": ,
  "courses": ,
  "schedule": ,
  "subId": ,
  "deviceId":
}
```
**Description**: Creates a new user account and returns student details along with a Firebase custom token.

### Dashboard

**Method**: GET\
**Path Parameters**:
- `deviceId` 

**Headers**:
- `Authorization`: Bearer "token"

**Description**: Retrieves the user's dashboard information, including semester, completed resources, and course details.

### Add Completed Resource

**Method**: POST\
**Request Body**:
```json
{
  "resourceId":
}
```
**Headers**:
- `Authorization`: Bearer "token"

**Description**: Adds a resource to the user's list of completed resources.

### Get Course Details

**Method**: GET\
**Path Parameters**:
- `cid`

**Description**: Retrieves detailed information about a specific course, including its units.

### Get Topic

**Method**: GET\
**Path Parameters**:
- `cid`
- `uid`

**Headers**:
- `Authorization`: Bearer "token"

**Description**: Retrieves the topic for a given unit within a course.

### Get Resources by Type

**Method**: GET\
**Path Parameters**:
- `cid`
- `uid`
- `tid`
- `resourceId`

**Headers**:
- `Authorization`: Bearer "token"

**Description**: Retrieves resources of a specific type (notes, cheatsheets, videos, importantQuestions) for a given topic within a unit and course.  If `resourceId` is "all", it retrieves all resource types.

## Admin APIs

### Admin Login

**Method**: POST\
**Request Body**:
```json
{
  "rollNo": ,
  "pass":
}
```
**Description**: Authenticates an admin user and returns a Firebase custom token.

### Admin Router

All routes under `/admin` require admin authentication.

**Middleware**: `checkAdminAuth`

**Description**: This router handles administrative tasks related to course content management.  Refer to `admin-router.ts` for specific endpoints and functionalities.

## Razorpay Integration

### Create Order

**Method**: POST\
**Request Body**:
```json
{
  "userId": ,
  "courseId": ,
  "amount": ,
  "receipt":
}
```
**Description**: Creates a Razorpay order for a given user and course.

### Verify Signature

**Method**: POST\
**Request Body**:
```json
{
  "orderId": ,
  "paymentId": ,
  "signature":
}
```
**Description**: Verifies the Razorpay signature for a payment.

### Webhook

**Method**: POST\
**Description**: Handles Razorpay webhook events, such as payment capture.  Updates the user's subscription status and course access upon successful payment.

