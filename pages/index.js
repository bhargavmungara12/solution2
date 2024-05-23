import { Inter } from "next/font/google";
import ProductList from "@/components/productList/ProductList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {



  return (
    <main
      className={`flex min-h-screen flex-col     ${inter.className}`}
    >
      <ProductList />
    </main>
  );
}
