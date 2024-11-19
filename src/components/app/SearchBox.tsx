import { useLanguageContext } from "@/utils/LanguageContext";
import { Card, CardContent, CardHeader } from "../ui/card";
import FormSearch from "./FormSearch";
import { useSettings } from "@/utils/SettingsContext";

function SearchBox() {
  const { t } = useLanguageContext();
  const { settings } = useSettings();

  return (
    <>
      <Card
        className={`${
          settings.theme === "dark"
            ? "bg-xDarkLigthBackground border-xDarkLigthBackground text-white z-50"
            : "bg-xLightBlue border-xLightBlue text-xDarkBackground z-50"
        } my-4`}
      >
        <CardHeader className="text-sm md:text-base">
          {t("titleSearchBox")}
        </CardHeader>
        <CardContent>
          <FormSearch />
        </CardContent>
      </Card>
    </>
  );
}

export default SearchBox;
