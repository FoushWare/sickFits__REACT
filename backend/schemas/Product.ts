import { integer, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
  fields: {
    // TODO
    // access:
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Availbale', value: 'AVALIABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    // TODO: Photo
  },
});
