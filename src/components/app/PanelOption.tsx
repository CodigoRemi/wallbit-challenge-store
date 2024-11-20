import { useSettings } from "@/utils/SettingsContext";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { CartItem } from "@/types/CartInterface";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CreditCard, TicketPercentIcon, Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useLanguageContext } from "@/utils/LanguageContext";

interface PanelOptionsProps {
  items: CartItem[];
}

const formSchema = z.object({
  code: z.string({ required_error: "Debes agregar un cupón válido." }),
});

const PanelOption: React.FC<PanelOptionsProps> = ({ items }) => {
  const { settings } = useSettings();
  const { t } = useLanguageContext();
  const { toast } = useToast();
  const [discount, setDiscount] = useState<number>(1);
  const [cuponCode, setCode] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.code === "WALLBIT") {
      setDiscount(0.5);
      setCode("WALLBIT");
      if (settings.language === "es") {
        toast({
          description: "Descuento del 50% aplicado correctamente.",
        });
      } else {
        toast({
          description: "50% discount applied successfully.",
        });
      }
    } else if (values.code === "TUKI") {
      setDiscount(0.9);
      setCode("TUKI");
      if (settings.language === "es") {
        toast({
          description: "Descuento del 10% aplicado correctamente.",
        });
      } else {
        toast({
          description: "10% discount applied successfully.",
        });
      }
    } else {
      setDiscount(1);
      if (settings.language === "es") {
        toast({
          variant: "destructive",
          title: "Cupón inválido",
          description: "Sigue buscando y encuentra los cupones.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid coupon.",
          description: "Keep searching and find the coupons.",
        });
      }
    }

    form.reset({
      code: undefined,
    });
  }

  const subtotal =
    items.reduce((acc, item) => acc + item.product.price * item.quantity, 0) *
    (settings.currency === "ARS" ? 1000 : 1);

  let taxes = 0;

  if (settings.currency === "ARS") {
    taxes = subtotal * 0.21;
  }

  let discountValue = 0;

  if (discount !== 1) {
    discountValue = (subtotal + taxes) * (1 - discount);
  }

  const total = subtotal + taxes - discountValue;

  function navigate() {
    window.open("https://wallbit.io/", "_blank");
  }

  useEffect(() => {
    if (items.length === 0) {
      setCode(null);
      setDiscount(1);
    }
  }, [items.length]);

  return (
    <>
      <Card
        className={`${
          settings.theme === "dark"
            ? "bg-xDarkLigthBackground border-xDarkLigthBackground text-white z-50"
            : "bg-xLightBackground border-xLightBackground text-xDarkBackground z-50"
        } my-4 col-span-3`}
      >
        <CardHeader className="text-sm md:text-base pb-3">
          {t("order")}
        </CardHeader>
        {items.length !== 0 ? (
          <CardContent>
            <p className="text-sm pb-2">
              {t("coupon")} {cuponCode ? `: ${cuponCode}` : <></>}
            </p>
            {cuponCode === null ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex space-x-2 items-end"
                >
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="code"
                            type="string"
                            placeholder="TUKI"
                            className={`mt-1 ${
                              settings.theme === "dark"
                                ? "border-white"
                                : "border-black"
                            }`}
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant={"ghost"}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <TicketPercentIcon />
                  </Button>
                </form>
              </Form>
            ) : (
              <Button
                onClick={() => {
                  setCode(null);
                  setDiscount(1);
                  toast({
                    variant: "destructive",
                    description: "Cupón removido.",
                  });
                }}
                className="w-full bg-red-800"
              >
                <Trash /> Eliminar cupón
              </Button>
            )}

            <div className="space-y-2 text-sm pt-8">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>
                  {settings.currency} {subtotal.toFixed(2)}
                </p>
              </div>

              {settings.currency === "ARS" && (
                <div className="flex justify-between">
                  <p>{t("taxes")} (21%)</p>
                  <p>
                    {settings.currency} {taxes.toFixed(2)}
                  </p>
                </div>
              )}

              {discount !== 1 && (
                <div className="flex justify-between">
                  <p>
                    {t("discount")} ({Math.round((1 - discount) * 100)}%)
                  </p>
                  <p>
                    - {settings.currency} {discountValue.toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex justify-between text-base font-bold">
                <p>
                  Total ({items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items)
                </p>
                <p>
                  {settings.currency} {total.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent className="text-sm text-center">
            <p className="p-4">{t("noProductPayment")}</p>

            <div className="bg-white w-fit rounded p-4 mx-auto">
              <img src="/tuki.jpg" width={64} className="overflow-hidden" />
            </div>
          </CardContent>
        )}
        {items.length !== 0 ? (
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-xPrimary w-full">
                  <CreditCard /> {t("pay")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-xPrimary border-xPrimary">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    {t("paymentTitle")}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-white">
                    {t("paymentDescription")}
                    <div className="py-6">
                      <img src="/tuki.jpg" width={64} className="mx-auto" />
                    </div>
                    <p>{t("paymentCode")}</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("closePayment")}</AlertDialogCancel>
                  <AlertDialogAction onClick={navigate}>
                    {t("visitPayment")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};

export default PanelOption;
