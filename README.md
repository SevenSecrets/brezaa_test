# Brezaa Backend Tech Test

This is a tech test for Brezaa.

### User Stories

1. POST /users/signup returns user data in JSON format like:
```
	{
		"email": "example@example.com",
		"password": "password",
		"username": "username",
		"firstName": "Jane",
		"lastName": "Doe",
		"address": "1 Example Street London, NW5 1EX",
		"typeOfUser": "1",
		"profession": "profession",
		"longitude": "175831.253",
		"latitude": "159672.723"
	}
```

2. POST /users/login returns user data in JSON format like:
```
	{
		"email": "example@example.com",
		"password": "password"
	}
```
3. GET /users/getAllSellers returns all users listed as seller user type without password data but with id

4. POST /review/?sellerId=id adds review to seller user in format:
```
	{
		"reviewValue": 5,
		"comment": "they're a good seller"
	}
```

5. GET /getSellerReviews/?sellerId=id gets all reviews for that seller user

6. GET /getNearestSellers?longitude=###&latitude=###&maxDistance=### returns closest seller