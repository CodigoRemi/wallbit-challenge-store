import "./index.css";
import "./utils/i18next.tsx";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

import { CartProvider } from "./utils/CartContext.tsx";
import { SettingsProvider } from "./utils/SettingsContext.tsx";
import { LanguageContextProvider } from "./utils/LanguageContext.tsx";

import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <SettingsProvider>
    <LanguageContextProvider>
      <CartProvider>
        <App />
        <Toaster />
      </CartProvider>
    </LanguageContextProvider>
  </SettingsProvider>
);
