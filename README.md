# Spotipie desktop app

A desktop app that allows you to gain insights into your Spotify listening habits.
With this app, you can connect your Spotify account and get detailed statistics about your listening behavior, including your favorite artists, top tracks, listening history, and more..

/!\ Building in progress..

![login](https://github.com/iammaxence/Spotipie/assets/32987179/6d966917-7c4d-4e37-8005-39d737145962)
![home](https://github.com/iammaxence/Spotipie/assets/32987179/70e58ab5-ea68-46f7-84f9-fc18056b78a0)

## Install

I need to update the docker-file to make the installation easy.
For now, you need to :

- Install Cargo to run the app: `curl https://sh.rustup.rs -sSf | sh`
- Go to spotipie folder: `npm i`
- Go to spotipieBack: `mvn clean install`

### Frontend

I split my buisness and application logic using hexagonal architecture:

- Domain folder is my buisness logic
- Primary folder is all the logic inside my application.
- Secondary folder is the part of the code that communicate with outside.

For each of my component, i tried to separate the view from the logic:

- Helper files contain the logic of a specific component (ex: Home.tsx for the view, HomeHelper.ts for the logic)

### Backend

I use the same structure like the frontend

## Board

- Add env variables
- Add real logout (maybe complexe because there is no real logout using spotify api)
- Handle exceptions from backend to frontend
- Update docker-compose file => It's deprecated

## About

App build using Tauri, React, Typescript and Java
