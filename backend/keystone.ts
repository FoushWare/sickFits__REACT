import 'dotenv/config'; // Get all .env variables
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';

import { User } from './schemas/User';
import { Product } from './schemas/Product';

// define the DB

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

// session config for authentication

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How Long they stay signed in ?
  secret: process.env.COOKIE_SECRET,
};
// Auth to access the Admin UI
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO : add in init roles here
  },
});

export default withAuth(
  config({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
    }, // Keystone deal with entity[users,products,orders] as lists
    lists: createSchema({
      // Schema items go in here`:w
      User,
      Product,
    }),
    ui: {
      // TODO: change this for roles
      isAccessAllowed: ({ session }) => {
        console.log(session);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return !!session?.data;
      },
    },
    // TODO: Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // Graphql Query
      User: 'id name email',
    }),
  })
);
