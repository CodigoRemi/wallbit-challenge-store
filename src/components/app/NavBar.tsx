import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "../ui/separator";

import { useSettings } from "@/utils/SettingsContext";
import { useLanguageContext } from "@/utils/LanguageContext";
import { useState } from "react";

const NavBar = () => {
  const { settings, updateSettings } = useSettings();
  const { t, i18n } = useLanguageContext();

  const [isOpen, setIsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState({
    language: settings.language,
    theme: settings.theme,
    currency: settings.currency,
  });

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTempSettings({
        language: settings.language,
        theme: settings.theme,
        currency: settings.currency,
      });
    }
  };

  const handleLanguageChange = (value: "es" | "en") => {
    setTempSettings((prev) => ({ ...prev, language: value }));
  };

  const handleThemeChange = (value: "light" | "dark") => {
    setTempSettings((prev) => ({ ...prev, theme: value }));
  };

  const handleCurrencyChange = (value: "ARS" | "USD") => {
    setTempSettings((prev) => ({ ...prev, currency: value }));
  };

  const handleSaveSettings = () => {
    updateSettings(tempSettings);
    if (tempSettings.language !== settings.language) {
      i18n.changeLanguage(tempSettings.language);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between z-50">
      <div className="flex items-center">
        <h1 className="text-xl md:text-4xl pe-4">
          {t("store")} - {t("mole")}
        </h1>
        <Button
          variant={"ghost"}
          className="hover:bg-transparent"
          onClick={() => updateSettings({ easterEgg: !settings.easterEgg })}
        >
          <img src="./topo.png" className="w-6 md:w-9" />
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-xPrimary border-xPrimary text-white">
          <DialogHeader>
            <DialogTitle>{t("settings")}</DialogTitle>
            <DialogDescription className="text-white">
              {t("settingSubtitle")}
            </DialogDescription>

            <div className="grid gap-4 pt-6 pb-4">
              <RadioGroup
                defaultValue="spanish"
                className="grid grid-cols-3"
                value={tempSettings.language}
                onValueChange={handleLanguageChange}
              >
                <p className="pe-4 font-light">{t("language")}</p>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="es" id="r2" />
                  <Label htmlFor="r2">{t("spanish")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="r3" />
                  <Label htmlFor="r3">{t("english")}</Label>
                </div>
              </RadioGroup>

              <Separator />

              <RadioGroup
                defaultValue="dark"
                className="grid grid-cols-3"
                value={tempSettings.theme}
                onValueChange={handleThemeChange}
              >
                <p className="pe-4 font-light">{t("mode")}</p>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="r2" />
                  <Label htmlFor="r2">{t("light")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="r3" />
                  <Label htmlFor="r3">{t("dark")}</Label>
                </div>
              </RadioGroup>

              <Separator />

              <RadioGroup
                defaultValue="ARS"
                className="grid grid-cols-3"
                value={tempSettings.currency}
                onValueChange={handleCurrencyChange}
              >
                <p className="pe-4 font-light">{t("currency")}</p>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ARS" id="r2" />
                  <Label htmlFor="r2">ARS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="USD" id="r3" />
                  <Label htmlFor="r3">USD</Label>
                </div>
              </RadioGroup>

              <p className="text-sm font-light">{t("exchange")}</p>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSaveSettings}>{t("saveSettings")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavBar;
