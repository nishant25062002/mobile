import React from 'react';
import Collections from '../screens/Collections';
import renderWithAuth from '../utils/authProvider';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';
import { waitFor } from '@testing-library/react-native';

const mockGroups = {
  id: '1',
  label: 'test group',
};

const mocks = [
  {
    request: {
      query: GET_COLLECTIONS,
      variables: {
        filter: { term: '', searchGroup: true },
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10 },
      },
    },
    result: {
      data: {
        search: [
          {
            group: mockGroups,
          },
        ],
      },
    },
  },
];

describe('Collections Screen', () => {
  test('renders the Collections screen', async () => {
    const { getByTestId, findByText } = renderWithAuth(<Collections />, mocks);
    const searchInput = getByTestId('searchInput');

    await waitFor(async () => {
      expect(searchInput).toBeDefined();

      const collectionCard = await getByTestId('collectionCard');
      const testGroup = await findByText('test group');

      expect(collectionCard).toBeTruthy();
      expect(testGroup).toBeTruthy();
    });
  });
});
