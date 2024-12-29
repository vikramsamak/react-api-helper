import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import sharedConfig from './ApiHelper.stories';
import { useApiHelper } from '../lib/hooks';

export default {
  ...sharedConfig,
  title: 'Hooks/useApiHelper',
  args: {
    url: '/todos',
    queryKey: 'post-todo',
    payload: { title: 'New Todo', completed: false },
  },
  argTypes: {
    url: { control: 'text', description: 'API endpoint to post data to' },
    queryKey: {
      control: 'text',
      description: 'Query key for cache management',
    },
    payload: {
      control: 'object',
      description: 'Payload for the POST request',
    },
  },
  tags: ['autodocs', 'hooks'],
} as Meta;

export const PostDataStory: StoryFn = (args) => {
  const { url, queryKey, payload } = args;

  const onSuccess = (data: unknown) => {
    alert('Data posted successfully: ' + JSON.stringify(data));
  };

  const onError = (error: unknown) => {
    alert('Error posting data:' + JSON.stringify(error));
  };

  const apiHelperResult = useApiHelper({
    url: url,
    queryKey: [queryKey],
    method: 'POST',
    onSuccess,
    onError,
  });

  if ('mutate' in apiHelperResult) {
    const { mutate, isPending, isError } = apiHelperResult;

    const handlePost = () => {
      console.log('Payload:', payload);
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
  }

  return <div>Error: Expected a POST method but received something else.</div>;
};
