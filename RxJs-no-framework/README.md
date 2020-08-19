Make sure you have node installed.
```Bash
# To get this project ready, type the following commands from a command line in this directory:
npm install
npm install gulpjs/gulp-cli#4.0 -g # install gulp globally, if it is also installed inside the directory where you run your gulp command, it will take the local gulp version
npm install live-server -g

# To watch and build our server and client scripts, run:
gulp watch:scripts

# ALWAYS HAVE THAT TASK RUNNING WHEN DEVELOPING

# To launch the server for client-side examples:
live-server public

# To launch a server-side example in node:
npm run nodemon build/example_xx # Where "xx" is example number.

npm run nodemon here_of_file_you_have_on_server_dir

# hit Ctrl + S to restart the server whenever needed
# Ctrl + C to stop the server

```