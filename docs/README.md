## SRE Bootcamp
This repo contains the code for SRE bootcamp by One2N. You can find the link for the same [here](https://playbook.one2n.in/sre-bootcamp).

### Purpose
The purpose of this book is to create a REST API and to facilitate learning of different parts that goes into an application.

## Setup and Run the app
The app is built using express a framework of node.js used to create web servers as well as applications.

**Prerequisites**
To successfully run the application you would require the following prerequisites
- Node.js (~v16 and above)
- DB (TBA)

Moving on with the requirements, you can download the dependencies using this command
```sh
npm install
```

**Setting up your envs**
After you've successfully installed the dependencies to run the application, you need to create a file named `.env`. This file will contain your secrets such as database passwords, keys etc.

To know what environment variables to create check out `.env_example` in the repo.

The codebase allows for multiple environments. To set a different environment, you have to create a file name like this `.env.<environment_name>` (e.g `.env.development`, `.env.staging`) and set the NODE_ENV environment variable w.r.t the environment name.

