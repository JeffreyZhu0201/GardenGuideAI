---
title: GardenGuideAI
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
generator: "@tarslib/widdershins v4.0.30"

---

# GardenGuideAI

Base URLs:

* <a href="http://localhost:8080">开发环境: http://localhost:8080</a>

# Authentication

# Default

## POST identifyOne

POST /api/v1/identify

> Body Parameters

```yaml
file: file:///Users/jeffreyzhu/Downloads/soybeans8.jpg

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|authorization|header|string| no |none|
|body|body|object| no |none|
|» file|body|string(binary)| no |none|

> Response Examples

> 200 Response

```
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST deepseek

POST /api/v1/deepseek

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|question|query|string| no |none|
|authorization|header|string| no |none|

> Response Examples

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "answer": "string"
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
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» answer|string|true|none||none|

## GET hello

GET /

> Response Examples

> 200 Response

```json
{
  "Hello": "string"
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
|» Hello|string|true|none||none|

# Data Schema

