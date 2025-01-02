import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import sharedConfig from './ApiHelper.stories';
import { useApiHelper } from '../lib/hooks';

export default {
  ...sharedConfig,
  title: 'Hooks/useApiHelper/POST',
  args: {
    url: '/todos',
    payload: { title: 'New Todo', completed: false },
  },
  argTypes: {
    url: { control: 'text', description: 'API endpoint to post data to' },
    payload: {
      control: 'object',
      description: 'Payload for the POST request',
    },
  },
  tags: ['hooks'],
} as Meta;

export const PostDataStory: StoryFn = (args) => {
  const { url, payload } = args;

  const onSuccess = (data: unknown) => {
    alert('Data posted successfully: ' + JSON.stringify(data));
  };

  const onError = (error: unknown) => {
    alert('Error posting data:' + JSON.stringify(error));
  };

  const { mutate, isPending, isError } = useApiHelper({
    url: url,
    method: 'POST',
    onSuccess,
    onError,
  });

  const handlePost = () => {
    mutate(payload);
  };

  return (
    <div>
      <h1>Post Data</h1>
      <button onClick={handlePost}>Post Data</button>
      {isPending && <div>Posting...</div>}
      {isError && <div>Error posting data</div>}
    </div>
  );
};
