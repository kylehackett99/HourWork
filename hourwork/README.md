#How to use this development environment

- Have Node JS installed
https://nodejs.org/en/download/

- Have Webpack and installed
  - It should be installed by default, but in case it is not, run the command: npm i webpack

- Have the Mindmap Dependancy installed
  - It should be installed by default, but in case it is not, run the command: npm i react-graph-vis

- cd into this directory

- Run a live react server (updates the page as you save your code)
    - run 'npm run dev' in the command line in this directory
    - open http://localhost:9000/ in your browser

- Build production code (condensed and allows for NPM modules such as the Mindmap API and others
  to be run in browser)
    - run 'npm run build'
    - production code can be found in ./public and does not require the react server to be running
        and can exist outside this development environment
    - to view, open the index.html file in a browser


Resources:
https://www.youtube.com/watch?v=ydDUm1yPZs0  -- How I figured out how to do this if you want to replicate
