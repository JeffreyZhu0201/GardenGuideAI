---
description: Ensures consistent response structure.
alwaysApply: true
---

All responses should use the domain.Response struct with Code, Message, and Data fields.  Use NewResponse, NewErrorResponse, and NewSuccessResponse to create responses.