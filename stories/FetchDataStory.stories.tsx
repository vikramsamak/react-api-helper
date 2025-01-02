import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useApiHelper } from '../lib/hooks';
import sharedConfig from './ApiHelper.stories';

export default {
  ...sharedConfig,
  title: 'Hooks/useApiHelper/FETCH',
  args: {
    url: '/todos/1',
    queryKey: ['todo'].join(','),
  },
  argTypes: {
    url: { control: 'text', description: 'API endpoint to fetch data from' },
    queryKey: {
      control: 'text',
      description: 'Query key for cache management (comma-separated)',
      transform: (value: string) => value.split(',').map((item) => item.trim()),
    },
  },
  tags: ['hooks'],
} as Meta;

export const FetchDataStory: StoryFn = (args) => {
  const { url, queryKey } = args;

  const { data, isError, isPending } = useApiHelper({
    url: url,
    queryKey: [queryKey],
    method: 'GET',
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Fetched Todo</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
