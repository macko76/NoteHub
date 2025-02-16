# 	API Book

This markdown file is meant to be used as a reference for different API in the routes (`./src/routes/`) directory.

To make you easier to use this manual, I will document all APIs in its **relative path** from the host.

[TOC]

## /api/

`/api` is the father endpoint of all APIs listed in `routes` directory.

**Note: It does not hold any functionalities.**



## /api/user/

`/api/user` is the father endpoint of all APIs listed in `routes/user` directory.

### /insert-user

_Insert a user into the user schema_

- **Method**: POST
- **Params**: A JSON object

```JSON
{
    "firstName": "NoteHub",					// Required
    "lastName": "Lover",					// Required
    "email": "abcdefg@illinois.edu",		// Required
    "avatarUrl": "https://xxxxx.com"		// Optional
}
```

- **Return**:
  - 200 - SUCCESS: The original JSON object
  - 400 - FAIL: A JSON object containing the error message





### /get-user-by-token

_Get a user by his email_

- **Method**: GET
- **Params**: No Params

```JSON

```

- **Return**:
  - 200 - SUCCESS: A JSON object containing a user's information
  - 400 - FAIL: A JSON object containing the error message


### /get-user-level

get the user's current level.

- **Method**: GET
- **Params**: A JSON object


- Return:
  - 200 - SUCCESS: A JSON object contains the level of the user.
  - 400 - FAIL: A JSON object containing the error message




### /update-user

*Update a user's info by his email. Only put the information needed to be changed. Otherwise do not put into inputs. **Note: Do not use null string `""` as it will set the corresponding field to `""`*

- **Method**: PUT
- **Params**: A JSON object

```JSON
{
    "firstName": "NoteHub", 			// Optional
    "lastName": "Lover",				// Optional
    "email": "abcdefg@illinois.edu",	// Required
    "avatarUrl": "https://xxxxx.com"	// Optional
}
```

- Return:
  - 200 - SUCCESS: The original JSON object
  - 400 - FAIL: A JSON object containing the error message





### /delete-user-by-email

_Delete a user's info by his email._

- **Method**: DELETE
- **Params**: A JSON object

```JSON
{
    "email": "abcdefg@illinois.edu",	// Required
}
```

- Return:
  - 204 - SUCCESS: null
  - 400 - FAIL: A JSON object containing the error message



### /get-note-providers

*Find all users whose note can be accessed by that userId.*

- **Method**: GET
- **Params**: No Params

```json

```

Return:

- 204 - SUCCESS: A list of User object 
- 400 - FAIL: A JSON object containing the error message



### /search-user-by-keyword

Search a user by keyword, this search will combine all users whose firs name, last name, or email contains the given keyword. 

- **Method**: POST
- **Params**: A JSON object

```json
{
    keyword: "anyString"
}
```

Return:

- 200 - SUCCESS: A list of distinct Users object
- 400 - FAIL: A JSON object containing the error message



## /api/note/

`/api/note` is the father endpoint of all APIs listed in `routes/note` directory.



### /insert-note

*Insert a note with noteTitle, dataId, and a list of categories*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"noteTitle": "abcdefg",
	"dataId": "asdsafgdfqqweqweqw",
  "categories": ["MATH", "CS", "..."]
}
```

Return:

- 201 - SUCCESS: The Note Object created 
- 400 - FAIL: A JSON object containing the error message



### /update-note

*Update noteTitle by noteId*.

- **Method**: POST
- **Params**: A JSON object

```json
{
	"noteTitle": "abcdefg",
	"noteId": "asdsafgdfqqweqweqw",
}
```

Return:

- 200 - SUCCESS: A  Notes Object 
- 400 - FAIL: A JSON object containing the error message



### /get-user-notes

*Get all notes that this user can access with*.

- **Method**: GET
- **Params**: No Params

```

```

Return:

- 200 - SUCCESS: A list of the Notes Object (defined by the interface)
- 400 - FAIL: A JSON object containing the error message



### /transfer-note-ownership

*This endpoint is to delete/update NoteAccess status for a note. If the newOwnerId is NULL, calling this endpoint will delete the NoteAccess AND Note itself but not transfer ownership to a new owner*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"noteId": "123456",      //Required
	"newOwnerId": "abcdefg" //Optional
}
```

Return:

- 200 - SUCCESS: NULL
- 400 - FAIL: A JSON object containing the error message



### /get-all-accessors

*This endpoint is to get all accessors who have rights to own, view, or edit the note given the input noteId*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"noteId": "123456",      //Required
}
```

Return:

- 200 - SUCCESS: A list of users who have access to this note 
- 400 - FAIL: A JSON object containing the error message



### /get-note-by-noteId

*This endpoint is to get the note by the noteId*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"noteId": "123456",      //Required
}
```

Return:

- 200 - SUCCESS: A Note object
- 400 - FAIL: A JSON object containing the error message



### /alter-note-community

*This endpoint is to alter(INSERT, DELETE) the rows in the `CommunityNote` schema, the only allowed two commands are `INSERT` and `DELETE` *

- **Method**: POST
- **Params**: A JSON object

```json
{
	"command": "INSERT",      //Required: :INSERT: or "DELETE"
    "noteId": "123123",
    "communityId": "456789",
}
```

Return:

- 200 - SUCCESS: NULL
- 400 - FAIL: A JSON object containing the error message



### /alter-note-categories

*This endpoint is to alter(INSERT, DELETE) the rows in the `NoteCategory` schema, the only allowed two commands are `INSERT` and `DELETE` *

- **Method**: POST
- **Params**: A JSON object

```json
{
	"command": "INSERT",      //Required: :INSERT: or "DELETE"
    "noteId": "123123",
    "categories": ["MATH", "CS", "SCIENCE"],
}
```

Return:

- 200 - SUCCESS: NULL
- 400 - FAIL: A JSON object containing the error message



### /alter-note-access

*This endpoint is to alter(INSERT, DELETE, UPDATE) the rows in the `NoteAccess` schema, the only allowed commands are `INSERT` and `DELETE`  `UPDATE`*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"command": "INSERT",      //Required: :INSERT: or "DELETE" or "UPDATE"
    "noteId": "123123",
    "accessStatus": "editor" ,       // one of "owner", "editor", "viewer"
}
```

Return:

- 200 - SUCCESS: NULL
- 400 - FAIL: A JSON object containing the error message



### /get-note-access-by-noteId-userId

This is to get a row of note access by noteId and userId

- **Method**: POST
- **Params**: A JSON object

```json
{
	"noteId": "123123",
    "userId": "1231235"
}
```

Return:

- 200 - SUCCESS: A NoteAccess object
- 400 - FAIL: A JSON object containing the error message



### /get-all-categories

This is to get all categories

- **Method**: GET
- **Params**:  Null

```json

```

Return:

- 200 - SUCCESS: All categories
- 400 - FAIL: A JSON object containing the error message



### /get-notes-by-communityId

*This endpoint is to get all notes by a community Id*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"communityId": "123456",      //Required
}
```

Return:

- 200 - SUCCESS: A list Note objects with extra attribute: **comments**
- 400 - FAIL: A JSON object containing the error message



### /:noteId/insert-comment

*This endpoint is to add a comment by the current user to a note defined by the `:noteId` slug.

- **Method**: POST
- **Params**: A JSON contains content field

```JSON
{
	"content": "I love this notebook"
}
```

Return:

- 200 - SUCCESS: A newly added Comment object

  ```JSON
  {
  	"commentId": 100,
      "userId": "abcabaad"
      "noteId": "abcabaad",
      "content": "I love this notebook",
      "createdAt" : 123456345345312
  }
  ```

  

- 400 - FAIL: A JSON object containing the error message



### /:noteId/like-note

*This endpoint is to add a like by the current user `:userId` to a note defined by the `:noteId` slug.

- **Method**: GET
- **Params**: A JSON contains content field

```JSON

```

Return:

- 200 - SUCCESS: Nothing

- 400 - FAIL: A JSON object containing the error message



### /get-top-10-users

*This endpoint is to get top 10 popular users

* **Method**: GET

- **Params**: A JSON object

Return:

- 201 - SUCCESS: A list of modified Users

- 400 - FAIL: A JSON object containing the error message



## /api/community/

`/api/community` is the father endpoint of all APIs listed in `routes/community` directory.



### /insert-community

*This endpoint is to create a new community by the current user*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"name": "CS233 Review Community",
	"description": "I love CS233 really!",
    "photo": "https://image.com/123123"
}
```

Return:

- 201 - SUCCESS: The Community Object created 
- 400 - FAIL: A JSON object containing the error message



### /get-all-communities

*This endpoint is to get all communities that the current user is a member of*

- **Method**: GET
- **Params**: NO Params

```json

```

Return:

- 200 - SUCCESS: A list of communities
- 400 - FAIL: A JSON object containing the error message



### /get-community-by-community-id

*This endpoint is to get a community by a community id*

- **Method**: POST
- **Params**: A JSON object

```json
{
    communityId: "123456"
}
```

Return:

- 200 - SUCCESS: A community object
- 400 - FAIL: A JSON object containing the error message



### /search-community-by-name

Search communities whose name is similar to input name (case insensitive)

- **Method**: POST
- **Params**: A JSON object

```json
{
    name: "CS111"
}
```

Return:

- 200 - SUCCESS: A list of community object
- 400 - FAIL: A JSON object containing the error message



### /update-community

*Update a community by the update community object with all its attributes.*

- **Method**: PUT
- **Params**: A JSON object

```JSON
{
    "communityId": 123,     //Required
    "name": "NoteHub", 		//Required
    "description": "Lover",			//Required	
    "createdAt": "123123123",        //ignored
    "photo": "123@qq.com",         //Required
    "memberCount": "123",         //Required
    "ownerId": "asdasd"         //This will be ignored
}
```

- Return:

  - 200 - SUCCESS: The original JSON object
  - 400 - FAIL: A JSON object containing the error message

  

### /insert-membership

*Insert a membership given userId and communityId*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"communityId": "CS233 Review Community",
    "userId": "asdfghjk"
    "role": "manager"
}
```

Return:

- 201 - SUCCESS: The Membership object created 
- 400 - FAIL: A JSON object containing the error message



### /delete-membership

*Delete a membership given userId and communityId*

- **Method**: DELETE
- **Params**: A JSON object

```JSON
{
	"communityId": "CS233 Review Community",
    "userId": "asdfghjk"
}
```

- Return:
  - 204 - SUCCESS: null
  - 400 - FAIL: A JSON object containing the error message



### /get-members-by-community-id	

*Get all User objects that a community is a member of*

- **Method**: POST
- **Params**: A JSON object

```json
{
	"communityId": "CS233 Review Community"
}
```

Return:

- 200 - SUCCESS: A list of special User object who are members of this Community 

```json
[
    { role: "Owner",
  icon: "123123....",
  users: Array<User>}, 
     
  { role: "Manager",
  icon: "123123...",
  users: Array<User>}, 
    
  { role: "Member",
  icon: "123123...",
  users: Array<User>}
   ]
```

- ​	400 - FAIL: A JSON object containing the error message



### /alter-membership-role

*Alter a user's role with a communityId and userId*

**This method is not meant to change the role as "owner"**, use **transfer-ownership** instead

- **Method**: POST
- **Params**: A JSON object

```json
{
    "communityId": "123123",
    "userId": "asdfghjkl",
    "role": "member" // One of "member" or "manager"
}
```

Return:

- 200 - SUCCESS: Updated membership
- 400 - FAIL: A JSON object containing the error message



### /add-note-to-community

*This endpoint is to insert a note to a community*

***Method**: POST

- **Params**: A JSON object

```json
{
	"communityId": 123123,
    "noteIds": [1,2,3]
}
```

Return:

- 201 - SUCCESS: null

- 400 - FAIL: A JSON object containing the error message

  

### /get-top-10-notes

*This endpoint is to get top 10 popular notes of a  community based on the matrix: `commentCount*3 + likeCount*2 + viewCount`*

 If a note in the returned list does not have comments, the field `topComment`  will be null, `topCommentLikeCount` will be null.

* **Method**: POST

- **Params**: A JSON object

```json
{
	"communityId": "123",
}
```

Return:

- 201 - SUCCESS: A list of modified Community Objects

  ```json
   {
      noteId: 123,
      dataId: 'QYZIUvgtiwXSLChQHvYUOTedeNIR',
      noteTitle: 'PageRank',
      likeCount: 123,
      viewCount: 123,
      commentCount: 123,
      ownerId: 'EkFNkkWPznJHDBkSQgcneaKDtSVZ',
      ownerName: 'Mike Peterson',
      categoryName: 'CS357',
      topComment: 'Long develop often remain offer...',
      topCommentLikeCount: 123
    }
  ```

- 400 - FAIL: A JSON object containing the error message



### /get-all-comments-by-noteId
*This endpoint is to get all comments given a note by id (each comment contains a list of replies).*

- **Method**: POST
- **Params**: A JSON object


```json
{
	"nodeId": "123"
}
```

Return:

- 201 - SUCCESS: A list of Comments Objects

- 400 - FAIL: A JSON object containing the error message


### /get-top-10-users
*This endpoint is to get up to 10 popular users who have at least 5 notes which contain the most likeCounts and commentCounts.*

- **Method**: GET
- **Params**: No Params

Return:
- 201 - SUCCESS: A list of User objects of the most ten popular users.

- 400 - FAIL: A JSON object containing the error message


### /get-notehub-statistics
*This endpoint is to get the overall statistics of the platform based on user's data.*

- **Method**: GET
- **Params**: No Params

Return:
- 201 - SUCCESS: A list of STATS Objects
```json {
          {
            "categoryName": "I hate triggers",
            "UserStatistics": [
          {
            "categoryName": "I hate triggers",
            "userLevel": "0",
            "userLevelCounts": "123123123234"
          }, {
            "categoryName": "I hate triggers",
            "userLevel": "1",
            "userLevelCounts": "3243243242"
          }, {
            "..."
          }, {
            "categoryName": "I hate triggers",
            "userLevel": "10",
            "userLevelCounts": "12"
          }],
          "NoteStatistics": {
              "categoryName": "I hate triggers",
              "notesCount": "123",
              "avgLikeCounts": "666",
              "avgViewCounts": "666",
              "avgCommentCounts": "777"
          }
        }, {
          "categoryName": "I like triggers",
          "UserStatistics": [
          {
            "categoryName": "I like triggers",
            "userLevel": "0",
            "userLevelCounts": "123123123234"
          }, {
            "categoryName": "I like triggers",
            "userLevel": "1",
            "userLevelCounts": "3243243242"
          }, {
            "..."
          }, {
            "categoryName": "I like triggers",
            "userLevel": "10",
            "userLevelCounts": "12"
          }],
          "NoteStatistics": {
              "categoryName": "I like triggers",
              "notesCount": "123",
              "avgLikeCounts": "666",
              "avgViewCounts": "666",
              "avgCommentCounts": "777"
          }
        }
      }
  ```

- 400 - FAIL: A JSON object containing the error message


# WebSocket
*Experiment endpoint, there is no `api` prefix for websocket endpoint*

### /note/:noteId/:userId/:firstName
Way to call it: `ws://localhost:8000/note/123/user123/Alex`
This is a websocket endpoint. If success, the user will be upgraded to a websocket connection. If verification fails, it will return a 403 error.   



