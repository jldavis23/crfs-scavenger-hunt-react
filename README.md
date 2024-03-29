# Capitol Reef Field Station Scavenger Hunt

Welcome to the CRFS Scavenger Hunt project documentation. These docs will help you understand a little about the development of this project.

## Overview of the Project

The CRFS project is built with several technologies:
- **Smart Beacons/Bolts** (Solar powered servers placed around the field station to serve up the files for the scavenger hunt. Provided by Lightning Kite.)
- **NFC Chips** (Each programmed to pull up a specific page of the website.)
- **Website** (Built with React + Typescript and TailwindCSS + DaisyUI.)

How the scavenger hunt works:
1. The user scans the QR code to connect to the Smart Beacon/Bolt server. Then, they scan the next QR code to pull up the instructions page.
2. The user looks around the field station for NFC chips. When they find one, they scan the chip to pull up the associated web page. They read the information and complete the activity. 
3. Repeat until all the chips are found and all activities completed.
4. When all activities are completed, the user recieves a prize from the site manager. 


### Live Site 
- https://crfs.mybolt.io/

### Pages
- [Home](https://crfs.mybolt.io/?page=home)
- [Instructions](https://crfs.mybolt.io/?page=instructions) (This is the page the user will see when they scan the QR code)
- [Sustainability](https://crfs.mybolt.io/?page=sustainability) 
- [History](https://crfs.mybolt.io/?page=history)
- [Geology](https://crfs.mybolt.io/?page=geology)
- [Astronomy](https://crfs.mybolt.io/?page=astronomy)
- [Scavenger Hunt Completed](https://crfs.mybolt.io/?page=huntcompleted)

## Code Overview

### Tech Stack
- Typescript
- React
- TailwindCSS
- DaisyUI
- GSAP
- canvas-confetti

### Using Typescript and React
Typescript is a superset of Javascript which allows you to add types to your Javascript code. Check out the docs here: [Typescript Docs](https://www.typescriptlang.org/)

React is a Javascript framework. Check out the docs here: [React Docs](https://react.dev/)

### Using TailwindCSS and DaisyUI
TailwindCSS is a CSS framework that allows you to apply styles to your components through classes. Check out the docs here: [TailwindCSS Docs](https://tailwindcss.com/). Additionally, it's recommended to use the TailwindCSS IntelliSense extention for VS Code. 

DaisyUI is a component library for TailwindCSS. Classes like `btn` and `modal` used in this app are from DaisyUI. Check out the docs here: [DaisyUI Docs](https://daisyui.com/).

Modify the `tailwind.config.js` file to configure the theme, fonts, and more for the application.

### Using GSAP
GSAP is an animation library for Javascript. It is only used in one instance for animating the progress bar. Check out the docs for GSAP here: [GSAP Docs](https://gsap.com/). Look at `src/components/ProgressBar.tsx` for this appliation's use of GSAP. 

### Using canvas-confetti
canvas-confetti is an npm package to create animated confetti on the screen. It is used when a user completes an activity. Look at the docs here: [canvas-confetti Docs](https://www.npmjs.com/package/canvas-confetti)

### Routing
The routing functionality for this project is based on URL query parameters. This is because of the limitations of the Smart Beacon/Bolt servers.

This means each of the URLs that take the users to the individual activity pages ends like this: `/?page=pageName`. For example, the astronomy page url looks like this: `https://crfs.mybolt.io/?page=astronomy`

The code that creates this routing functionality resides in `App.tsx`.

### Tracking the User's Progress
The user's progress is stored in the browser's `localStorage`. This allows for the progress to be maintained across different pages. 

In `src/context/ProgressDataContext.tsx` we define a state variable called `progressData` and create a [context](https://react.dev/reference/react/createContext) for sharing the value of progressData across all the application's components. 

`ProgressDataContext.tsx` handles keeping the progressData state variable in sync with the browser's localStorage. Through the use of [`useEffect`](https://react.dev/reference/react/useEffect)s, whenever a component changes the value of progressData, it will update in the localStorage object. 

### Resetting Your Progress
When developing, you will often find yourself wanting to clear localStorage in order to reset the progress data. Here is how to do this based on your browser: https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/
