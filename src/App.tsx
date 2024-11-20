import Cart from "@/components/app/Cart.tsx";
import SearchBox from "@/components/app/SearchBox.tsx";
import NavBar from "@/components/app/NavBar.tsx";

import { useCart } from "./utils/CartContext.tsx";
import { useSettings } from "./utils/SettingsContext.tsx";
import { useLanguageContext } from "./utils/LanguageContext.tsx";
import AnimatedIcons from "./components/app/AnimatedIcons.tsx";
import PanelOption from "./components/app/PanelOption.tsx";

function App() {
  const { t } = useLanguageContext();
  const { cart } = useCart();
  const { settings } = useSettings();

  return (
    <div
      className={
        settings.theme === "dark"
          ? `bg-xDarkBackground text-xLightBackground z-0`
          : `bg-xLightBlue text-xDarkBackground z-0`
      }
    >
      {settings.easterEgg ? <AnimatedIcons /> : <></>}
      <div className="px-4 md:px-8 xl:px-0 xl:max-w-screen-xl mx-auto py-10 flex flex-col h-screen">
        <NavBar />
        <SearchBox />
        <div className="flex-1 grid grid-cols-12 gap-x-4">
          <Cart
            items={cart}
            className="flex-1 flex flex-col overflow-hidden z-50 col-span-9"
          />
          <PanelOption items={cart} />
        </div>

        <p className="text-center py-4">
          {t("developedBy")}{" "}
          <a
            href="https://github.com/CodigoRemi"
            target="_blank"
            className="text-xPrimary"
          >
            CodigoRemi
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
