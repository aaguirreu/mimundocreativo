import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import axios from "axios";
import { useSession } from "next-auth/react"
import Error404 from "@/components/Error404";

const AddProducts = () => {
  const createProduct = (data) => axios.post("/api/products", data);
  //const { data: session } = useSession()
  const { data: session, status } = useSession()
  
  if (session && session.user.role === "admin") {
  return (status === "loading" ? <a/>:
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
      status === "loading" ? <a/>: <Error404/> 
    )
  }
};

export default AddProducts;
