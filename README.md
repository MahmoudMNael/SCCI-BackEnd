# SCCI'24 MC Back-End API Documentation

## Announcements

```http
POST "/app/24/api/announcements/(announcementType)"
```

Replace **(announcementType)** with one of the following: _General, Appsplash, Techsolve, Investeneur, Devology_ **or** _Markative_

### Request Body

```js
{
	"announcementMessage": "The body of the announcement",
}
```

### Response Body

#### Successful 200

```js
{
	message:  'Announcement Added!',
}
```

#### Failed 500

Check the error message and debug

---

```http
GET "/app/24/api/announcements/(announcementType)"
```

Replace **(announcementType)** with one of the following: _General, Appsplash, Techsolve, Investeneur, Devology_ **or** _Markative_

### Response Body

#### Successful 200

```js
{

	"data":  [

				{

					"announcementID":  4,

					"authorName":  "Mahmoud Nael",

					"announcementMessage":  "this is a new announcement",

					"announcementDate":  "11 Feb 2024, 7:39 pm"

				},

				{

					"announcementID":  3,

					"authorName":  "Mahmoud Nael",

					"announcementMessage":  "Wussup\nmy name is mahmoud❤😂🦇",

					"announcementDate":  "11 Feb 2024, 5:57 am"

				},

				{

					"announcementID":  2,

					"authorName":  "Mahmoud Nael",

					"announcementMessage":  "Wussup\nmy name is mahmoud",

					"announcementDate":  "11 Feb 2024, 5:54 am"

				}

			]
}
```

#### Failed 500

Check the error message and debug

#### Failed 404

There is no announcements there

---

```http
DELETE "/app/24/api/announcements/(announcementID)"
```

Replace **(announcementID)** with the id of the desired announcement

### Response Body

#### Successful 200

```js
{
	"message": "announcement deleted!"
}
```

#### Failed 500

Check the error message and debug

---

```http
PUT "/app/24/api/announcements/(announcementID)"
```

Replace **(announcementID)** with the id of the desired announcement

### Request Body

```js
{
	"announcementMessage": "This is the body of the announcement",
}
```

### Response Body

#### Successful 200

```js
{
	"message": "announcement updated!"
}
```

#### Failed 500

Check the error message and debug

---

```http
GET "/app/24/api/announcements/one/(announcementID)"
```

Replace **(announcementID)** with the id of the desired announcement

### Response Body

#### Successful 200

```js
{

	"data":	{

				"announcementID":  4,
				"authorName":  "Mahmoud Nael",
				"announcementMessage":  "this is a new announcement",
				"announcementDate":  "11 Feb 2024, 7:39 pm"
			},
}
```

#### Failed 500

Check the error message and debug

#### Failed 404

There is no announcements there

## Tasks

```http
POST "/app/24/api/tasks/(taskWorkshop)"
```

Replace **(taskWorkshop)** with one of the following: _Appsplash, Techsolve, Investeneur, Devology_ **or** _Markative_

### Request Body

```js
{
	"taskMessage": "The body of the task",
	"taskDeadline": DateObject.toString(),
}
```

### Response Body

#### Successful 200

```js
{
	message:  'task Added!',
}
```

#### Failed 500

Check the error message and debug

---

```http
GET "/app/24/api/tasks/(taskWorkshop)"
```

Replace **(taskWorkshop)** with one of the following: Appsplash, Techsolve, Investeneur, Devology* **or** *Markative\*

### Response Body

#### Successful 200

```js
{

	"data":  [

				{

					"taskID":  4,

					"authorName":  "Mahmoud Nael",

					"taskMessage":  "this is a new announcement",

					"taskDate":  "11 Feb 2024, 7:39 pm",

					"taskDeadline": "11 Feb 2024, 7:39 pm",

				},

			]
}
```

#### Failed 500

Check the error message and debug

#### Failed 404

There is no announcements there

---

```http
DELETE "/app/24/api/tasks/(taskID)"
```

Replace **(taskID)** with the id of the desired task

### Response Body

#### Successful 200

```js
{
	"message": "task deleted!"
}
```

#### Failed 500

Check the error message and debug

---

```http
GET "/app/24/api/tasks/one/(taskID)"
```

Replace **(taskID)** with the id of the desired task

### Response Body

#### Successful 200

```js
{

	"data":	{

				"taskID":  4,
				"authorName":  "Mahmoud Nael",
				"taskMessage":  "this is a new announcement",
				"taskDate":  "11 Feb 2024, 7:39 pm",
				"taskDeadline": "11 Feb 2024, 7:39 pm",
			},
}
```

#### Failed 500

Check the error message and debug

#### Failed 404

There is no tasks there

## Task Submissions

```http
POST "/app/24/api/tasks/(taskID)/submissions"
```

Replace **(taskID)** with id of the desired task

### Request Body

```js
{
	"taskMessage": "The link of the submission (Google Drive)",
}
```

### Response Body

#### Successful 200

```js
{
	"message":  'Submission Added!',
}
```

#### Failed 500

Check the error message and debug

---

```http
GET "/app/24/api/tasks/(taskID)/submissions"
```

Replace **(taskID)** with id of the desired task

### Response Body

#### Successful 200

```js
{

	"data":  [

				{

					"submissionID":  4,

					"authorName":  "Mahmoud Nael",

					"submissionMessage":  "this is a new announcement",

					"submissionDate":  "11 Feb 2024, 7:39 pm"

				},

			]
}
```

#### Failed 500

Check the error message and debug

#### Failed 404

There is no announcements there

---

```http
DELETE "/app/24/api/tasks/(taskID)/(submissionID)"
```

- Replace **(taskID)** with the id of the desired task
- Replace **(submissionID)** with the id of the desired submission

### Response Body

#### Successful 200

```js
{
	"message": "submission deleted!"
}
```

#### Failed 500

Check the error message and debug

---

```http
GET "/app/24/api/tasks/(taskID)/submissions/user"
```

- Replace **(taskID)** with the id of the desired task

### Response Body

#### Successful 200

```js
{
	"data": {

					"submissionID":  4,

					"authorName":  "Mahmoud Nael",

					"submissionMessage":  "this is a new announcement",

					"submissionDate":  "11 Feb 2024, 7:39 pm"

				},
}
```

#### Failed 500

Check the error message and debug
