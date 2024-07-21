# QuickCaff

Quickcaff is a platform that allows users to quickly and easily choose their coffee.

## Getting Started

These instructions outline the steps required to run the project on your local machine.

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Folder Structure](#folder-structure)

### Requirements

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (v20 or above)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yunus-acar/quickcaff-api.git
   cd quickcaff-api
   ```

2. **Copy the Docker environment file:**

   ```sh
   cp docker.env.example docker.env
   ```

3. **Copy the environment file:**

   ```sh
   cp .env.example .env
   ```

4. **Start the services with Docker Compose:**

   ```sh
   docker-compose up -d
   ```

5. **Install Node.js dependencies:**

   ```sh
   yarn install
   ```

6. **Start the development server:**

   ```sh
   yarn start:dev
   ```

## Folder Structure

```plaintext
quickcaff-api/
├── docker-compose.yml
├── docker.env
├── docker.env.example
├── .env.example
├── graphql/
├── nest-cli.json
├── package.json
├── README.md
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── aws/
│   │   ├── coffees/
│   │   ├── email/
│   │   ├── jobs/
│   │   ├── logger/
│   │   └── users/
│   ├── app.module.ts
│   ├── graphql.module.ts
│   ├── env.validation
│   └── main.ts
├── test/
│   └── ...
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```
