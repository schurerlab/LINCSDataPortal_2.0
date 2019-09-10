# Signature Commons UI

Jeff Jones (github:jeffsocal)
2018-08-23

## Known Issues

1. API calls are made using Thunk and Axios, yet slow fetching can override faster calls if iniated prior to completed fetch calls. Example: initial home loads the fetch-counts api which takes 5-10sec to update counts, organized-suggest api is relatively quick and will update counts quickly, fetch-counts will override if finished post organized-suggest. Solution: implement an api fetch cancel on current fetches with known overlaps.



