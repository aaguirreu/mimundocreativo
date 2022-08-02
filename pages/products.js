// pages/products.js
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import prisma from '@/components/prisma'

export async function getServerSideProps() {
  const products = await prisma.productos.findMany();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function Products({ products = [] }) {
  return (
    <Layout>
      <div className="p-5 mt-2">
        <Grid products={products} />
      </div>
    </Layout>
  );
}
