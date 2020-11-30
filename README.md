# Portchain test

this test project is written in node.js as an assignment for the Portchain company.

It fetches a list of port calls from the provided API and upon user's request, returns
the requested result.

## To run

```
npm i
npm run start <Args>
```

## Args

- top5arrival: Shows the top 5 Ports with the most arrivals
- bottom5arrival: Shows the top 5 Ports with the least arrivals
- durations: The percentiles of port call durations, grouped by port
- delays: The percentiles of vessel delays, grouped by vessels

an example command:

```
npm run start top5arrival durations
```

or

```
npm run start top5arrival bottom5arrival durations delays
```
