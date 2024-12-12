# vue-weather-app

## A few notes regarding the assessment as stated at the delivery email

Just as a few notes before I send the completed assessment:

- I created an alternative GitHub account because I also use my main account for work and I don't want my employer to know that I'm in a selection process at the moment. My main account is https://github.com/adisrael just in case. The alternative account is https://github.com/ale-israel.
- I focused on the main features and added a few personal touches like the tailwindcss config, the current weather endpoint and some github actions integrations for lint and audit dependencies.
- I didn't display the next 5 days forecast but I did complete the next hours forecast which uses mostly the same logic.
- As for the extra stuff: I implemented the small city metadata csv to get the data for the selected city in the tabs though I haven't implemented the search. 

## Technologies

- Vue 3 in Vite.
- Tailwindcss

## Project Setup

```sh
npm install
npm run dev
```

### Environment Variables

```txt
VITE_WEATHER_API_URL=
VITE_WEATHER_API_ACCESS_KEY=
```
