# github-api
Exposing Github API endpoints to access PRs.

### To run:
`npm start`

### To test:
`npm test`

### Sample output:
```
[
	{
		"id": 795341540,
		"number": 3695,
		"title": "Enable `PrintTo` template overloads to be defined by the user",
		"author": "MakersF",
		"commit_count": 3
	},
]
```

### Sample 
run `npm start`
test endpoint with `curl "http://localhost:3001/api/pulls?owner=google&repo=googletest&page_number=1&per_page=3"`
