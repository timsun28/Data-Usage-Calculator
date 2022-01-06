# Data usage calculator
This app has been created to calculate how much data the user should have left on the current date of the month. This app assumes your data resets at the end of the month. 

It uses local storage to store the selected amount of GB and uses service workers to cache the app for offline availability.

Feel free to update and tweak how you like it and don't forget to try out the [demo](https://data-usage-v2.vercel.app/)

## Why this app? 
My mobile provider phone app shows me two values when looking at my current usage. The amount of days left until my plan renews and the amount of MB's I had left at that moment. This always had me guessing if at some point during the month I was already over my data usage and should slow down a bit or if I had some spare GB's to use in the rest of the month. 

This is why I built this tool to see at any point in the month to see how many MB's I should have left to be on track for the month.

## Technologies used
* [NextJS](https://nextjs.org/)
* [TailwindCSS](https://tailwindcss.com/)

## How to run locally
You can deploy your own version by clicking this button: 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftimsun28%2Fdata-usage-v2)

If you want to run it on your own machine, clone the project on your own machine and run npm install to get all the dependencies.
Once installed: npm run dev should start the dev environment on your computer where you can access the site on localhost:3000

