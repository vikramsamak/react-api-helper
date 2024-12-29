import React from 'react';
import { ApiHelperProvider } from '../lib/contexts';
import { JSONPLACEHOLDER_BASE_URL } from './StoriesConstant';
import { Meta } from '@storybook/react';

const sharedConfig: Meta = {
  decorators: [
    (Story) => (
      <ApiHelperProvider baseURL={JSONPLACEHOLDER_BASE_URL}>
        <Story />
      </ApiHelperProvider>
    ),
  ],
};

export default sharedConfig;
