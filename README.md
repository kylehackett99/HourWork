# HourWork Study Assistant
The HourWork Study Assistant is a study tool for students and learners alike, utilizing structured notes to generate mind maps and flash cards to increase retention.

##### 1. [Installation](#installation)
##### 2. [Usage](#usage)
##### 3. [Production Build](#production-build)
##### 4. [Development Environment](#development-environment)
  * [Setup](#setup)
  * [Development](#development)
  * [Build](#build)
##### 5. [Test File](#test-file)
##### 6. [Contributors](#contributors)
##### 7. [Acknowledgement](#acknowledgement)
##### 8. [License](#license)

## Installation

Fork this [Github repository](https://github.com/kylehackett99/HourWork) to install a local version of the HourWork Study Assistant.

## Usage
On the home page, click on upload file and upload the sample file or a file of your own.

The flashcard will be on the left side with a previous(left) and next(right) button.

There will also be three buttons to be selected based off your understanding: Easy, Medium, and Hard.

The Mind Map will be on the right side. Each node will be connected to a flashcard. Users are able to click on each node which would prompt the flashcard
to the left. 

Users should work their way through their deck of flash cards using the next and previous buttons, and self report the difficulty they experienced in recalling the information on that card.

## Production Build

The latest production build of the HourWork Study Assistant can be found in [HourWork/public](https://github.com/kylehackett99/HourWork)


Open HourWork/public/index.html in a web browser to use the software.

The public folder can be moved from within it's parent directory and be hosted.

## Development Environment

### Setup
1. [Install Node JS](https://nodejs.org/en/download/)
   Description
 
2. Install Webpack
  It should already be installed within the node_modules directory, but if not run the following command in the HourWork directory
   ```bash
    npm i webpack
   ```
3. Install Mind Map Dependancy
   It should already be installed within the node_modules directory, but if not run the following command in the HourWork directory
   ```bash
    npm i react-graph-vis
   ```
4. Change directories to be in HourWork/

### Development
Run a live React server (updates the page as you save your code)
  - Run the following command in HourWork 
   ```bash
    npm run dev
   ```
  - Open http://localhost:9000/ in your browser
  - Enjoy development!


### Build
  Build production code (condensed and allows for NPM modules such as the Mindmap API and others
  to be run in browser)
  - Run the following command in HourWork 
   ```bash
    npm run build
   ```

  - Production code can be found in HourWork/public and does not require the React server to render
  - To view production build, open HourWork/public/index.html in a web browser


## Test File
**Unweighted Test File**
```text
Animals

05/20/2023

Panda
Black and white fluffy animal

	What food does a panda eat?
	Bamboo

	Where do pandas generally live?
	Asia

Giraffe
Tall, yellow and brown animal

	Where do giraffes generally live?
	Africa

Geckos
Small, colorful lizards

	What happens if a gecko drops its tail?
	It grows back!
```

**Weighted Test File**
```text
Animals 
05/20/2023 

Panda
Black and white fluffy animal
12

	What food does a panda eat?
	Bamboo
	4

	Where do pandas generally live?
	Asia
	2

Giraffe
Tall, yellow and brown animal

	Where do giraffes generally live?
	Africa

Geckos
Small, colorful lizards
2

	What happens if a gecko drops its tail?
	It grows back!
```

## Contributors
[Nikol Vladinska](https://github.com/nikolvladinska),
[Kyle Hackett](https://github.com/kylehackett99),
Christopher Gonzalez,
Christa Som,
Vivek Patel,
& Parth Patel

## Acknowledgement

Thank you to Giovanni Conserva for giving us the opportunity to work on this project.

Thank you to Professor Haehn for a great class and his guidance and feedback.

Thank you to The CS410 TAs' for their feedback and assistance.

This project would not be possible without the [React graph vis](https://github.com/crubier/react-graph-vis) Component by [Vincent Lecrubier](https://github.com/crubier).

## License
[MIT](https://github.com/kylehackett99/HourWork/blob/main/LICENSE)
