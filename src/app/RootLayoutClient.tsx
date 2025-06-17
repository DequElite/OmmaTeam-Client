'use client'

import { Provider } from "react-redux";
import store, { useAppDispatch } from "@/store/store";
import { MessageBoxProvider } from "@/contexts/MessageBoxContext/MessageBox.provider";
import ConfirmBoxProvider from "@/contexts/ConfirmBoxContext/ConfirmBox.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfirmBox from "@/components/ConfirmBox/ConfirmBox.component";
import { LanguageBox } from "@/components/LanguageBox/LanguageBox.component";
import { MessageBox } from "@/components/MessageBox/MessageBox.component";
import { useEffect } from "react";
import { getUserProfile } from "@/store/services/userProfile.service";
import { getUserTeamsShortData } from "@/store/services/userTeams.service";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";

const queryClient = new QueryClient();

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  // НЕ вызываем хуки до провайдера!

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
      <InnerRootLayoutClient>{children}</InnerRootLayoutClient>
      </I18nextProvider>
    </Provider>
  );
}

function InnerRootLayoutClient({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserTeamsShortData());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <MessageBoxProvider>
        <ConfirmBoxProvider>
          {/*{isOpened && <ConfirmBox />}*/}
          <LanguageBox />
          <MessageBox />
          {children}
        </ConfirmBoxProvider>
      </MessageBoxProvider>
    </QueryClientProvider>
  );
}
