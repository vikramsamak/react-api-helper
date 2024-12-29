import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['lib/**/*.ts', 'lib/**/*.tsx'],
      insertTypesEntry: true,
      outDir: 'dist',
      copyDtsFiles: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'react-api-helper',
      fileName: (format) => `react-api-helper-${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@react-native-async-storage/async-storage',
        '@tanstack/query-async-storage-persister',
        '@tanstack/react-query',
        '@tanstack/react-query-persist-client',
        'axios',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@react-native-async-storage/async-storage': 'AsyncStorage',
          '@tanstack/query-async-storage-persister':
            'QueryAsyncStoragePersister',
          '@tanstack/react-query': 'ReactQuery',
          '@tanstack/react-query-persist-client': 'ReactQueryPersistClient',
          axios: 'Axios',
        },
      },
    },
  },
});
