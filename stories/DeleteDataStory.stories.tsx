import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import sharedConfig from './ApiHelper.stories';
import { useApiHelper } from '../lib/hooks';

export default {
  ...sharedConfig,
  title: 'Hooks/useApiHelper/DELETE',
  args: {
    url: '/todos/1',
  },
  argTypes: {
    url: { control: 'text', description: 'API endpoint to delete data' },
  },
  tags: ['hooks'],
} as Meta;

export const DeleteDataStory: StoryFn = (args) => {
  const { url } = args;

  const onSuccess = (data: unknown) => {
    alert('Data deleted successfully: ' + JSON.stringify(data));
  };

  const onError = (error: unknown) => {
    alert('Error deleting data: ' + JSON.stringify(error));
  };

  const { mutate, isPending, isError } = useApiHelper({
    url: url,
    method: 'DELETE',
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    mutate({});
  };

  return (
    <div>
      <h1>Delete Data</h1>
      <button onClick={handleDelete}>Delete Data</button>
      {isPending && <div>Deleting...</div>}
      {isError && <div>Error deleting data</div>}
    </div>
  );
};
