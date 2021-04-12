# Sick-fits

A complete web app where users are able to sell and buy products. It keeps a history of previous orders and items added to shopping cart can be paid using **Stripe**.

## Preview
You can visite the website Here [ link](https://foushwaresickfits-next.herokuapp.com/)
![Screenshot](https://res.cloudinary.com/dr4a6933v/image/upload/v1543992798/2018-12-05_07-52-29_3_ibrhlk.png)

## Used technologies

### Frontend

- ReactJS
- Apollo
- Jest & Enzyme
- Styled components
- Next
- cloudinary [ for image manipulation make small and large images and add filter to images ]

### Backend

- NodeJS
- GraphQL
- Yoga
- Prisma
- Docker


### cloudinary 
- Cloudinary Platform Powering Your Media · Image and Video API for Powerful Visual Experiences · Automatically optimize and deliver images and videos

Code to do this in my project[frontend/components/createitem.js] is : 
```

uploadFile = async e => {
    console.log('uploading file...');
    const { files } = e.target;
    console.log(files);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dgnyyo3a3/image/upload/',
      {
        method: 'POST',
        body: data,
      }
    );
    console.log(res);
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };
  


<label htmlFor="file">
                image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {image && <img width="200" src={image} alt="upload Preview" />}
```



upload preset => this is the preset of this project which i created on cloudinary

```
  data.append('upload_preset', 'sickfits');
```
This is my preset on cloudinary 

![Screenshot](https://res.cloudinary.com/dgnyyo3a3/image/upload/v1618265590/images/preset_z5cvck.png)


## What to do when create Mutation or Query in graphql 
 
- Create a type in datamodel.prisma 
```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password:String!
  resetToken:String
  resetTokenExpiry:String
  permissions:[Permission] @scalarList(strategy: RELATION)
  cart:[CartItem!]!
}
type Item {
  id: ID!  @id
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  user:User!
}

```

- Deploy it to prisma [to update the db] to get the  prisma schema (generated/prisma.graphql)
```
npm run deploy

```

- Write the type of mutation or Query  [like function declaration in c programming] in schema.graphql
```

type Mutation {
  createItem(
    title: String
    description: String
    price: Int
    image: String
    largeImage: String
  ): Item!
  
  type Query {
  items(
    where: ItemWhereInput
    orderBy: ItemOrderByInput
    skip: Int
    first: Int
  ): [Item]!
  item(where: ItemWhereUniqueInput!): Item
  itemsConnection(where: ItemWhereInput): ItemConnection!
  me: User
  users: [User]!
}
```

- Write a query or mutation in the resolvers [like function implementation in c programming]

Query
```

 async users(parent,args,ctx,info){
    // 1. check if the user[who query users query] is logged in
    if(!ctx.request.userId){
      throw new Error('You must be logged in!');
    }
    console.log(ctx.request.userId);
    // 2. check if the user has the permission to query all users
    hasPermission(ctx.request.user, ['ADMIN','PERMISSIONUPDATE']);
    // 3. if they do, query all the users
    return ctx.db.query.users({},info);
  }


};


```

Mutation 

```
async createItem(parent, args, ctx, info){
    //TODO: check if they are logged in
    if(!ctx.request.userId){
      throw new Error('You must be logged in to do that !');
    }
    //interface to prisma db
        //this ctx.db.*** return promise so i'm using async
    const item= await ctx.db.mutation.createItem({
      data:{
        //this is how we create a relationship between the user and items
        user:{
            connect:{
                id:ctx.request.userId,
            }
        },
        ...args
      }
    },info);  //this is from createserver.js
    console.log(item);
    return item;

  },
```
## Installation

First, clone this repository into your machine

```shell
git clone https://github.com/FoushWare/Sick-fits
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
## Deployment 

I needed 3 apps on the cloud 
 - one for prisma 
 - one for yoga server for backend graphQL
 - one for the frontend app [ React app with nextjs ]

So i chooses Heroku[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)]

<img src="https://format-com-cld-res.cloudinary.com/image/private/s--fOhTTFi6--/c_crop,h_2000,w_2960,x_0,y_0/c_fill,g_center,h_1200/fl_keep_iptc.progressive.apng/v1/005d1937177ba469e6110debcce15d3f/heroku-logo-thumbnail.png" width="200px"/>




I deployed it to heroku but i had some errors 


- CORS error

    I tried all the answers on the internet, but you won't believe me 

    i put the FRONTENT_URL to Heroku  like that 

    ```jsx
    https://foushwaresickfits-next.herokuapp.com/
    ```

    But the correct one was the same URL without the ending slash 

    ```jsx
    https://foushwaresickfits-next.herokuapp.com
    ```

    Backend config for cors 

    ```jsx
    server.start(
      {
        cors: {
          credentials: true,
          // origin: process.env.FRONTEND_URL,
          origin: process.env.FRONTEND_URL,
          // origin: 'https://foushwaresickfits-next.herokuapp.com',
        },
      },
      deets => {
        console.log(`Server is now running on port http://localhost:${deets.port}`);
      }
    );
    ```

    for the frontend

    ```jsx
    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        request: operation => {
          operation.setContext({
            fetchOptions: {
              credentials: 'include',
            },
            headers,
          });
        },
    ```

    ---

- set cookie

    how to set cookies when using CORS.

    i didn't see cookie in the browser but you can know more info from the network tab in the developer tool in chrome that the cookie is send from the server but the browser block it so i need to make 

    sameSite: "none "    && secure : true  in the cookie setting process

    ```jsx
    ctx.response.cookie('token', token, {
          httpOnly: true,
          secure: true, // only transfer over https
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });
    ```







