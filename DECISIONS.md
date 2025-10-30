# Design decisions
This document details the reason to my approach on this project

## 1. Database
### MongoDB
- **Speed:** As this project was developed in less than a week, MongoDB offers a quick integration and great **flexibility**, enabling a high-paced development and space to evolve
- **Flexibility:** A schema-less database is ideal to store data that can vary in size and complexity, as localization and timestamp. Also, it's faster to implement the desired features without having to run a migration

### Redis
- **Improved performance:** As the main endpoint (`GET /:hash`) will be highly accessed, adding caching is a great way to improve performance, reducing the amount of disk access (MongoDB) by storing the data in a key-value database that uses RAM

## 2. Software Architecture
### I. Functional requirements
- Given a long URL, the system shall return a shortened URL
- Given a shortened URL, the system shall redirect the user to the correspondent URL
- The system shall permit a user to create a shortened URL without having to log in, but it will be hard deleted after a period of time
- The system shall permit a user to create an account with `email` and `password`
- A logged-in user can create shortened URLs and have access to the following features:
    - See all the created URLs
    - Deactivate a created URL (soft delete)
    - See gathered information from a selected URL (clicks count, access time graph, user agent info and locale heat map*)
- The system shall permit a user to delete an account, soft deleting it and deactivating all of its created URLs

### II. Quality requirements
- The system must be able to receive at least 1.000.000 requisitions daily
- The system will receive more *read* requests then *write* requests, at a 10:1 ratio
- The hash of the shortened URLs must use the following characters: [a-z], [A-Z] and [0-9]
- The shortened URL must be the shortest possible
    - It's estimated that half of the write requests will be logged-in created URLs, that will be stored for 10 years
    - Each shortened URL must redirect to only **one original URL**
- The `GET /:hash` endpoint must respond in less than 200ms
- The system must avoid malicious users spamming new URLs

### III. Important decisions
#### Calculating the shortened URL hash length
> #### Different URLs quantity
> - 1,000,000 requests daily
> - 1,000,000/10 = 100,000 write requests daily
> - 100,000/2 = **50,000** shortened URLs that lasts 10 years daily
> - 10 years = 10 * 365 = 3,650 days * 50,000 URLs/day = **182,500,000 different URLs after 10 years**
> #### The size of a shortened URL hash
> - The hash alphabet has 62 different characters
> - 62^n >= 182,500,000
> - n >= 4.61, so **n = 5**
> - 62^5 = 916,132,832
> - 916,132,832 - 182,500,000 = **733,632,832 spare hashes** to temporary URLs and increase in write requests
> #### Conclusion
> The hash length of the shortened URLs must be **5 characters**

- Because of the GET speed requirement, the system must implement incremental id generation in base 62, granting that every new URL will have an exclusive hash
- Database protection:
    - Captcha when a not logged-in user is creating a URL
    - Rate limit for URL creation
- URL data protection:
    - Rate limit for `GET /:hash`
    - The data of a specific URL access will only be given to authenticated users (JWT), so it's not necessary to protect the predictability of the next hash
