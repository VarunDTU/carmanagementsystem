---
title: Car management system
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# Car management system

Base URLs:

# Authentication

# User

## POST Register New User

POST /user/register

Register New user

> Body Parameters

```json
{
  "email": "examplemail@mail.com",
  "password": "examplePassword"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

```json
"User already exists"
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|undefined|

# Cars

## POST Create a new Car

POST /car/product

> Body Parameters

```json
{
  "title": "ss",
  "description": "String",
  "car_type": "String",
  "company": "String",
  "dealer": "String",
  "year": 2001,
  "tags": [
    "first",
    "ff"
  ],
  "images": [],
  "owner": "6798c530919152b557be65f1"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» title|body|string| yes |none|
|» description|body|string| yes |none|
|» car_type|body|string| yes |none|
|» company|body|string| yes |none|
|» dealer|body|string| yes |none|
|» year|body|integer| yes |none|
|» tags|body|[string]| yes |none|
|» images|body|[string]| yes |none|
|» owner|body|string| yes |none|

> Response Examples

```json
{
  "title": "ss",
  "description": "String",
  "car_type": "String",
  "company": "String",
  "dealer": "String",
  "year": 2001,
  "tags": [
    "first",
    "ff"
  ],
  "images": [],
  "owner": "6798c530919152b557be65f1",
  "_id": "679a6a894a2468b5126a306a",
  "__v": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» title|string|true|none||none|
|» description|string|true|none||none|
|» car_type|string|true|none||none|
|» company|string|true|none||none|
|» dealer|string|true|none||none|
|» year|integer|true|none||none|
|» tags|[string]|true|none||none|
|» images|[string]|true|none||none|
|» owner|string|true|none||none|
|» _id|string|true|none||none|
|» __v|integer|true|none||none|

## GET Get cars from your userID

GET /car/products/{userId}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string| yes |none|

> Response Examples

```json
[
  {
    "_id": "679a5f301b9692c161b1a334",
    "title": "Mustang",
    "description": "about mustang\nThe Ford Mustang is an iconic American muscle car that has been in continuous production since 1964. It's known for its powerful performance, stylish design, and rich history. The Mustang has evolved over the years, with the latest models offering advanced technology and impressive performance.",
    "car_type": "",
    "company": "Teh dealer",
    "dealer": "mach e ",
    "year": 2010,
    "tags": [
      "mustang",
      "marche"
    ],
    "images": [
      "https://res.cloudinary.com/dioeprjnv/image/upload/v1738170160/car/hh2zkse715takoo4fhz3.jpg"
    ],
    "owner": "679a5f191b9692c161b1a331",
    "__v": 0
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|false|none||none|
|» title|string|false|none||none|
|» description|string|false|none||none|
|» car_type|string|false|none||none|
|» company|string|false|none||none|
|» dealer|string|false|none||none|
|» year|integer|false|none||none|
|» tags|[string]|false|none||none|
|» images|[string]|false|none||none|
|» owner|string|false|none||none|
|» __v|integer|false|none||none|

## GET Get car from carId

GET /car/product/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

```json
{
  "_id": "679a5f301b9692c161b1a334",
  "title": "Mustang",
  "description": "about mustang\nThe Ford Mustang is an iconic American muscle car that has been in continuous production since 1964. It's known for its powerful performance, stylish design, and rich history. The Mustang has evolved over the years, with the latest models offering advanced technology and impressive performance.",
  "car_type": "",
  "company": "Teh dealer",
  "dealer": "mach e ",
  "year": 2010,
  "tags": [
    "mustang",
    "marche"
  ],
  "images": [
    "https://res.cloudinary.com/dioeprjnv/image/upload/v1738170160/car/hh2zkse715takoo4fhz3.jpg"
  ],
  "owner": "679a5f191b9692c161b1a331",
  "__v": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|true|none||none|
|» title|string|true|none||none|
|» description|string|true|none||none|
|» car_type|string|true|none||none|
|» company|string|true|none||none|
|» dealer|string|true|none||none|
|» year|integer|true|none||none|
|» tags|[string]|true|none||none|
|» images|[string]|true|none||none|
|» owner|string|true|none||none|
|» __v|integer|true|none||none|

## PUT Update a car 

PUT /car/product/{id}

> Body Parameters

```json
{
  "title": "ss",
  "description": "String",
  "car_type": "String",
  "company": "String",
  "dealer": "String",
  "year": 2001,
  "tags": [
    "first",
    "ff"
  ],
  "images": [],
  "owner": "6798c530919152b557be65f1"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|body|body|object| no |none|
|» title|body|string| yes |none|
|» description|body|string| yes |none|
|» car_type|body|string| yes |none|
|» company|body|string| yes |none|
|» dealer|body|string| yes |none|
|» year|body|integer| yes |none|
|» tags|body|[string]| yes |none|
|» images|body|[string]| yes |none|
|» owner|body|string| yes |none|

> Response Examples

```json
{
  "_id": "679a6a894a2468b5126a306a",
  "title": "ss",
  "description": "String",
  "car_type": "String",
  "company": "String",
  "dealer": "String",
  "year": 2001,
  "tags": [
    "first",
    "ff"
  ],
  "images": [],
  "owner": "6798c530919152b557be65f1",
  "__v": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|true|none||none|
|» title|string|true|none||none|
|» description|string|true|none||none|
|» car_type|string|true|none||none|
|» company|string|true|none||none|
|» dealer|string|true|none||none|
|» year|integer|true|none||none|
|» tags|[string]|true|none||none|
|» images|[string]|true|none||none|
|» owner|string|true|none||none|
|» __v|integer|true|none||none|

## DELETE Delete with car Id

DELETE /car/product/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|

> Response Examples

```json
{
  "_id": "679a5f301b9692c161b1a334",
  "title": "Mustang",
  "description": "about mustang\nThe Ford Mustang is an iconic American muscle car that has been in continuous production since 1964. It's known for its powerful performance, stylish design, and rich history. The Mustang has evolved over the years, with the latest models offering advanced technology and impressive performance.",
  "car_type": "",
  "company": "Teh dealer",
  "dealer": "mach e ",
  "year": 2010,
  "tags": [
    "mustang",
    "marche"
  ],
  "images": [
    "https://res.cloudinary.com/dioeprjnv/image/upload/v1738170160/car/hh2zkse715takoo4fhz3.jpg"
  ],
  "owner": "679a5f191b9692c161b1a331",
  "__v": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» _id|string|true|none||none|
|» title|string|true|none||none|
|» description|string|true|none||none|
|» car_type|string|true|none||none|
|» company|string|true|none||none|
|» dealer|string|true|none||none|
|» year|integer|true|none||none|
|» tags|[string]|true|none||none|
|» images|[string]|true|none||none|
|» owner|string|true|none||none|
|» __v|integer|true|none||none|

# Data Schema

