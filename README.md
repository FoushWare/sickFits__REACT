# Sick-fits

A complete web app where users are able to sell and buy products. It keeps a history of previous orders and items added to shopping cart can be paid using **Stripe**.

## Preview

![Screenshot](https://res.cloudinary.com/dr4a6933v/image/upload/v1543992798/2018-12-05_07-52-29_3_ibrhlk.png)

## Used technologies

### Frontend

- ReactJS
- Apollo
- Jest & Enzyme
- Styled components
- Next

### Backend

- NodeJS
- GraphQL
- Yoga
- Prisma
- Docker

## Installation

First, clone this repository into your machine

```shell
git clone https://github.com/iaguilarmartin/sick-fits.git
```

### Run backend

Move into **backend** folder

```shell
cd sick-fits/backend
```

Then, install package dependencies

```shell
npm install
```

Creeate a _.env_ file to configure environment variables. Here is a list of needed variables and possible values:

```
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="http://localhost:4466"
PRISMA_SECRET="asdfawe4t43gnawrq234fh"
APP_SECRET="ertweydghfgh"
STRIPE_SECRET="sk_test_safasdfrtyut"
PORT=4444
MAIL_HOST="smtp.mailtrap.io"
MAIL_PORT="2525"
MAIL_USER="5234rte68799"
MAIL_PASS="t67568irt34"
```

Run Prisma container using Docjer

```shell
npm run docker
```

Generate database schema

```shell
npm run deploy
```

Launch backend

```shell
npm run dev
```

### Run frontend

Move into **frontend** folder

```shell
cd ../frontend
```

Then, install package dependencies

```shell
npm install
```

Launch frontend

```shell
npm run dev
```
