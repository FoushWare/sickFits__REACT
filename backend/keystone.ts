import 'dotenv/config'; // Get all .env variables
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

// define the DB

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

// session config for authentication

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How Long they stay signed in ?
  secret: process.env.COOKIE_SECRET,
};

export default config({
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
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});
