import { CartItem } from "@/types/CartInterface";
import { CartContextType } from "@/types/CartInterface";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartCreatedDate, setCartCreatedDate] = useState<string>(() => {
    const savedDate = localStorage.getItem("cartCreatedDate");
    return savedDate || "";
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    if (cart.length === 0) {
      setCartCreatedDate("");
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cartCreatedDate", cartCreatedDate);
  }, [cartCreatedDate]);

  const addToCart = (newItem: CartItem) => {
    setCart((currentCart) => {
      if (currentCart.length === 0) {
        setCartCreatedDate(new Date().toISOString());
      }
      const existingItemIndex = currentCart.findIndex(
        (item) => item.product.id === newItem.product.id
      );

      if (existingItemIndex > -1) {
        const newCart = [...currentCart];
        const totalQuantity =
          newCart[existingItemIndex].quantity + newItem.quantity;
        newCart[existingItemIndex].quantity = Math.min(totalQuantity, 20);
        return newCart;
      }

      return [...currentCart, newItem];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => {
      const newCart = currentCart.filter(
        (item) => item.product.id !== productId
      );
      if (newCart.length === 0) {
        setCartCreatedDate(new Date().toISOString());
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartCreatedDate(new Date().toISOString());
  };

  const addQuantity = (productId: number) => {
    setCart((currentCart) => {
      const newCart = [...currentCart];
      const itemIndex = newCart.findIndex(
        (item) => item.product.id === productId
      );
      if (itemIndex > -1) {
        newCart[itemIndex].quantity += 1;
      }
      return newCart;
    });
  };

  const removeQuantity = (productId: number) => {
    setCart((currentCart) => {
      const newCart = [...currentCart];
      const itemIndex = newCart.findIndex(
        (item) => item.product.id === productId
      );
      if (itemIndex > -1) {
        if (newCart[itemIndex].quantity === 1) {
          const filteredCart = newCart.filter(
            (item) => item.product.id !== productId
          );
          if (filteredCart.length === 0) {
            setCartCreatedDate(new Date().toISOString());
          }
          return filteredCart;
        }
        newCart[itemIndex].quantity -= 1;
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCreatedDate,
        addToCart,
        removeFromCart,
        clearCart,
        addQuantity,
        removeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
