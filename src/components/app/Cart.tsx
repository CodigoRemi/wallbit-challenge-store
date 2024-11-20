import {
  Minus,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
  SquareMinus,
  SquareX,
  Trash,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { CartItem } from "@/types/CartInterface";
import { Button } from "../ui/button";
import { useCart } from "@/utils/CartContext";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import TableRowSkeleton from "./TableRowSkeleton";
import { useLanguageContext } from "@/utils/LanguageContext";
import { useSettings } from "@/utils/SettingsContext";
import { toast } from "@/hooks/use-toast";

interface CartProps {
  items: CartItem[];
  className?: string;
}

const Cart: React.FC<CartProps> = ({ items, className }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const {
    removeFromCart,
    addQuantity,
    removeQuantity,
    cartCreatedDate,
    clearCart,
  } = useCart();
  const { t } = useLanguageContext();
  const { settings } = useSettings();

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const tableBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
    }
  }, [items]);

  return (
    <div className={className}>
      <Card
        className={`${
          settings.theme === "dark"
            ? "bg-xDarkLigthBackground border-xDarkLigthBackground text-white"
            : "bg-xLightBackground border-xLightBackground text-xDarkBackground"
        } my-4 flex-1 flex flex-col min-h-0`}
      >
        <CardHeader className="flex flex-shrink-0">
          <div className="flex justify-between">
            <p>
              {t("shoppingCart")}{" "}
              {cartCreatedDate !== "" ? (
                <span>
                  - {t("creationDate")}:{" "}
                  {new Date(cartCreatedDate)
                    .toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(",", "")}
                </span>
              ) : (
                <></>
              )}
            </p>
            {items.length !== 0 ? (
              <Button
                onClick={() => {
                  clearCart();
                  if (settings.language === "es") {
                    toast({
                      description: "¡Has vaciado correctamente tu carrito!",
                    });
                  } else {
                    toast({
                      description: "You have successfully emptied your cart!",
                    });
                  }
                }}
                className="bg-red-800"
              >
                <SquareX /> {t("deleteCart")}
              </Button>
            ) : (
              <></>
            )}
          </div>
        </CardHeader>
        <CardContent ref={tableBodyRef} className="flex-1 overflow-y-auto">
          {items.length !== 0 ? (
            <Table>
              <TableHeader>
                <TableRow
                  className={`${
                    settings.theme === "dark" ? "" : "border-black"
                  }`}
                >
                  <TableHead className="w-[100px] text-center">
                    {t("quantity")}
                  </TableHead>
                  <TableHead className="md:w-[200px] lg:w-[400px]">
                    {t("name")}
                  </TableHead>
                  <TableHead className="text-center">{t("photo")}</TableHead>
                  <TableHead className="text-right">{t("unitPrice")}</TableHead>
                  <TableHead className="text-right">
                    {t("totalPrice")}
                  </TableHead>
                  <TableHead className="w-[50px]">
                    <SlidersHorizontal className="mx-auto w-4" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length > 0 &&
                  items.map((i, index) => (
                    <>
                      {!loadedImages[i.product.id] && (
                        <TableRowSkeleton key={`skeleton-${i.product.id}`} />
                      )}
                      <TableRow
                        key={index}
                        className={`h-10 ${
                          !loadedImages[i.product.id] ? "hidden" : ""
                        }`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant={"ghost"}
                              onClick={() => removeQuantity(i.product.id)}
                              size={"sm"}
                              disabled={i.quantity == 1 ? true : false}
                            >
                              <Minus className="text-xPrimary" />
                            </Button>
                            <p>{i.quantity}</p>
                            <Button
                              variant={"ghost"}
                              onClick={() => addQuantity(i.product.id)}
                              size={"sm"}
                              disabled={i.quantity == 20 ? true : false}
                            >
                              <Plus className="text-xPrimary" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{i.product.title}</TableCell>
                        <TableCell>
                          <img
                            src={i.product.image}
                            className="mx-auto"
                            width={60}
                            onLoad={() =>
                              setLoadedImages((prev) => ({
                                ...prev,
                                [i.product.id]: true,
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {settings.currency}{" "}
                          {settings.currency === "ARS"
                            ? (i.product.price * 1000).toFixed(2)
                            : i.product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {settings.currency}{" "}
                          {settings.currency === "ARS"
                            ? (i.product.price * 1000 * i.quantity).toFixed(2)
                            : (i.product.price * i.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant={"ghost"} size={"sm"}>
                                  <Trash className="text-red-700" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] border-xPrimary bg-xPrimary text-white">
                                <DialogHeader>
                                  <DialogTitle>{t("removeTitle")}</DialogTitle>
                                  <DialogDescription className="text-white">
                                    {t("removeSubtitle")}
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    onClick={() => {
                                      removeFromCart(i.product.id);
                                      dialogCloseRef.current?.click();
                                    }}
                                  >
                                    <SquareMinus />
                                    {t("removeButton")}
                                  </Button>
                                  <DialogClose
                                    ref={dialogCloseRef}
                                    className="hidden"
                                  />
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-4 h-full">
              <ShoppingCart />
              <p>{t("emptyCart")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
