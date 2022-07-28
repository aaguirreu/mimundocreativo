import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import axios from "axios";
import { useSession } from "next-auth/react"
import Error404 from "@/components/Error404";
import Cargando from "@/components/Cargando";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Loading.module.css"

const addProducts = ({ Component, pageProps }) => {
  const createProduct = (data) => axios.post("/api/products", data);
  const { data: session } = useSession()
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  
  if (session && session.user.role === "admin") {
  return (
    <Layout>
      <div className="flex-col max-w-screen-xl mx-auto">
        <h1 className="justify-center text-3xl font-medium text-success">
          Agregar Producto
        </h1>
        <div className="mt-8">
          <ProductList
            buttonText="Add Product"
            redirectPath="/products"
            onSubmit={createProduct}
          />
        </div>
      </div>
    </Layout>
  );
  } else {
    return (
      !session ? <a/>  : <Error404/> 
    )
  }
};

export default addProducts;
