import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import sharedConfig from './ApiHelper.stories';
import { useApiHelper } from '../lib/hooks';

export default {
  ...sharedConfig,
  title: 'Hooks/useApiHelper/PUT',
  args: {
    url: '/todos/1',
    payload: { title: 'Updated Todo', completed: true },
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'API endpoint to update data via PUT',
    },
    payload: {
      control: 'object',
      description: 'Payload for the PUT request',
    },
  },
  tags: ['hooks'],
} as Meta;

export const PutDataStory: StoryFn = (args) => {
  const { url, payload } = args;

  const onSuccess = (data: unknown) => {
    alert('Data updated successfully: ' + JSON.stringify(data));
  };

  const onError = (error: unknown) => {
    alert('Error updating data: ' + JSON.stringify(error));
  };

  const { mutate, isPending, isError } = useApiHelper({
    url: url,
    method: 'PUT',
    onSuccess,
    onError,
  });

  const handleUpdate = () => {
    mutate(payload);
  };

  return (
    <div>
      <h1>Update Data</h1>
      <button onClick={handleUpdate}>Update Data</button>
      {isPending && <div>Updating...</div>}
      {isError && <div>Error updating data</div>}
    </div>
  );
};
