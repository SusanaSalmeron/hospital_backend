
[![CircleCI](https://img.shields.io/circleci/build/github/SusanaSalmeron/hospital_backend?style=plastic)](https://app.circleci.com/pipelines/github/SusanaSalmeron/hospital_backend)

<div align="center">
<h3 align="center">API REST Hospital Management</h3>
<p align="center">
    Hospital administration. Sign up and register. Patient search, see and add clinical records for doctors. Appointments for patients.
    <br />
    <a href="https://github.com/SusanaSalmeron/hospital_backend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SusanaSalmeron/hospital_backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/SusanaSalmeron/hospital_backend/issues">Request Feature</a>
  </p>
</div>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

This project was created for learning to use this technologies.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Loki.js](http://techfort.github.io/LokiJS/)
* [Faker](https://www.npmjs.com/package/faker)
* [Npmlog](https://github.com/npm/npmlog#readme)
* [Swagger autogen](https://github.com/davibaltar/swagger-autogen#readmehttps://svelte.dev/)
* [Jest.js](https://jestjs.io/)
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)


<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites
You will need installed this technologies:

* Node.js v14.x
* Nodemon v2.x
* npm v8.x
  
### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/SusanaSalmeron/hospital_backend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

For using this application, it is mandatory to create a file called `.env` at root level with the following content:

```
SECRET_TOKEN="your private key"
```
With this, the application will be able to generate JWT tokens

Next, in the root directory, you can run:
* To start the project
```sh
   npm run dev
```

* To create the swagger docs
```sh
   npm docs
```

* To start project + swagger
```sh
    npm run docdev
```

* To run test
```sh
    npm test
```

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `license.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Susana Salmeron - [@exdream76](https://twitter.com/ExDream76) - exdream76@gmail.com

Project Link: [https://github.com/SusanaSalmeron/hospital_backend](https://github.com/SusanaSalmeron/hospital_backend)

<p align="right">(<a href="#top">back to top</a>)</p>