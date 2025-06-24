import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MessageBoxProvider } from './contexts/MessageBoxContext/MessageBox.provider.tsx'
import './i18n/i18n.ts';
import ConfirmBoxProvider from './contexts/ConfirmBoxContext/ConfirmBox.provider.tsx'

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> 
      <QueryClientProvider client={queryClient}>
        <MessageBoxProvider>
          <ConfirmBoxProvider>
            <App />
          </ConfirmBoxProvider>
        </MessageBoxProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
