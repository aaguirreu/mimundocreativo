import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import axios from "axios";

const addProducts = () => {
  const createProduct = (data) => axios.post("/api/products", data);

  return (
    <Layout>
      <div className="flex-col max-w-screen-xl mx-auto">
        <h1 className="justify-center text-3xl font-medium text-accent">
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
};

export default addProducts;
