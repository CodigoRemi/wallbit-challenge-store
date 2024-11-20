import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useCart } from "@/utils/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from "@/utils/LanguageContext";
import { useSettings } from "@/utils/SettingsContext";
import { LoaderIcon, ShoppingBag } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  quantity: z
    .number({ message: "Este campo es obligatorio" })
    .min(1, "Debe ser un valor entre 1 y 20")
    .max(20, "La cantidad no puede ser superior a 20 unidades")
    .int({ message: "Debe ser un número entero" }),
  idProduct: z
    .number({ required_error: "Este campo es obligatorio" })
    .min(1, "Debe ser un número entero")
    .int({ message: "Debe ser un número entero" }),
});

function FormSearch() {
  const { addToCart, cart } = useCart();
  const { toast } = useToast();
  const { t, currentLanguage } = useLanguageContext();
  const { settings } = useSettings();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const existingItem = cart.find(
      (item) => item.product.id === values.idProduct
    );
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentQuantity + values.quantity;

    fetch(`https://fakestoreapi.com/products/${values.idProduct}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((product) => {
        addToCart({
          product,
          quantity: values.quantity,
        });

        form.reset({
          quantity: undefined,
          idProduct: undefined,
        });

        if (currentLanguage === "es") {
          if (newTotalQuantity > 20) {
            toast({
              variant: "destructive",
              title: "Máximo alcanzado",
              description:
                "No se pueden agregar más de 20 unidades de este producto.",
            });

            setLoading(false);

            return;
          } else {
            toast({
              description: "Producto agregado correctamente.",
            });
          }
        } else {
          if (newTotalQuantity > 20) {
            toast({
              variant: "destructive",
              title: "Maximum reached",
              description: "You cannot add more than 20 units of this product.",
            });

            setLoading(false);

            return;
          } else {
            toast({
              description: "Added to cart successfully",
            });
          }
        }

        setLoading(false);
      })
      .catch(() => {
        form.reset({
          quantity: undefined,
          idProduct: undefined,
        });

        if (currentLanguage === "es") {
          toast({
            variant: "destructive",
            title: "Ups! Algo salió mal.",
            description: "El producto no existe. Intenta con otro ID.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Product doesn't exist. Try another ID.",
          });
        }

        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-6"
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("quantity")}</FormLabel>
              <FormControl>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="1"
                  className={`mt-1 ${
                    settings.theme === "dark" ? "border-white" : "border-black"
                  }`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idProduct"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("idProduct")}</FormLabel>
              <FormControl>
                <Input
                  id="idProduct"
                  type="number"
                  placeholder="4"
                  className={`mt-1 ${
                    settings.theme === "dark" ? "border-white" : "border-black"
                  }`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!loading ? (
          <Button
            className="w-full md:col-start-4 md:self-end bg-xPrimary"
            type="submit"
          >
            <ShoppingBag /> {t("add")}
          </Button>
        ) : (
          <Button className="w-full md:col-start-4 md:self-end bg-xPrimary disabled">
            <LoaderIcon />
          </Button>
        )}
      </form>
    </Form>
  );
}

export default FormSearch;
