"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

import type { CatalogProduct } from "@/types/catalog";

type ProductColorContextValue = {
  selectedColor: string;
  selectedImage: string;
  selectColor: (label: string, image: string) => void;
  selectImage: (image: string) => void;
};

const ProductColorContext = createContext<ProductColorContextValue | null>(null);

export function ProductColorProvider({ product, children }: { product: CatalogProduct; children: ReactNode }) {
  const initialColor = product.colors?.[0];
  const [selectedColor, setSelectedColor] = useState(initialColor?.label ?? "");
  const [selectedImage, setSelectedImage] = useState(initialColor?.image ?? product.images?.[0] ?? product.image);

  function selectColor(label: string, image: string) {
    setSelectedColor(label);
    setSelectedImage(image);
  }

  return (
    <ProductColorContext.Provider value={{ selectedColor, selectedImage, selectColor, selectImage: setSelectedImage }}>
      {children}
    </ProductColorContext.Provider>
  );
}

export function useProductColor() {
  const context = useContext(ProductColorContext);

  if (!context) {
    throw new Error("useProductColor must be used inside ProductColorProvider");
  }

  return context;
}
