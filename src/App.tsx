import Cart from "@/components/app/Cart.tsx";
import SearchBox from "@/components/app/SearchBox.tsx";
import NavBar from "@/components/app/NavBar.tsx";

import { useCart } from "./utils/CartContext.tsx";
import { useSettings } from "./utils/SettingsContext.tsx";
import { useLanguageContext } from "./utils/LanguageContext.tsx";
import AnimatedIcons from "./components/app/AnimatedIcons.tsx";

function App() {
  const { t } = useLanguageContext();
  const { cart } = useCart();
  const { settings } = useSettings();

  return (
    <div
      className={
        settings.theme === "dark"
          ? `bg-xDarkBackground text-xLightBackground z-0`
          : `bg-xLightBackground text-xDarkBackground z-0`
      }
    >
      {settings.easterEgg ? <AnimatedIcons /> : <></>}
      <div className="px-4 md:px-8 xl:px-0 xl:max-w-screen-lg mx-auto py-10 flex flex-col h-screen">
        <NavBar />
        <SearchBox />
        <Cart
          items={cart}
          className="flex-1 flex flex-col overflow-hidden z-50"
        />
        <p className="text-center py-4">{t("developedBy")} CodigoRemi</p>
      </div>
    </div>
  );
}

export default App;
