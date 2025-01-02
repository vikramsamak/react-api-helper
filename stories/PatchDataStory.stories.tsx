import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import sharedConfig from './ApiHelper.stories';
import { useApiHelper } from '../lib/hooks';

export default {
  ...sharedConfig,
  title: 'Hooks/useApiHelper/PATCH',
  args: {
    url: '/todos/1',
    payload: { completed: true },
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'API endpoint to partially update data via PATCH',
    },
    payload: {
      control: 'object',
      description: 'Payload for the PATCH request',
    },
  },
  tags: ['hooks'],
} as Meta;

export const PatchDataStory: StoryFn = (args) => {
  const { url, payload } = args;

  const onSuccess = (data: unknown) => {
    alert('Data partially updated successfully: ' + JSON.stringify(data));
  };

  const onError = (error: unknown) => {
    alert('Error partially updating data: ' + JSON.stringify(error));
  };

  const { mutate, isPending, isError } = useApiHelper({
    url: url,
    method: 'PATCH',
    onSuccess,
    onError,
  });

  const handlePatch = () => {
    mutate(payload);
  };

  return (
    <div>
      <h1>Partially Update Data</h1>
      <button onClick={handlePatch}>Patch Data</button>
      {isPending && <div>Patching...</div>}
      {isError && <div>Error patching data</div>}
    </div>
  );
};
