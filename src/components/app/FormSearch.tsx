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

const formSchema = z.object({
  quantity: z
    .number({ required_error: "Este campo es obligatorio" })
    .min(1, "This field is required"),
  idProduct: z
    .number({ required_error: "Este campo es obligatorio" })
    .min(1, "This field is required"),
});

function FormSearch() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t, currentLanguage } = useLanguageContext();
  const { settings } = useSettings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
          toast({
            description: "Producto agregado correctamente.",
          });
        } else {
          toast({
            description: "Added to cart successfully",
          });
        }
      })
      .catch(() => {
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
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-6 md:items-end"
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
                  placeholder="4"
                  className={`mt-1 ${
                    settings.theme === "dark" ? "border-white" : "border-black"
                  }`}
                  min={1}
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
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full md:col-start-4 bg-xPrimary" type="submit">
          {t("add")}
        </Button>
      </form>
    </Form>
  );
}

export default FormSearch;
