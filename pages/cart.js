import { CartProvider, useCart } from "react-use-cart";
import Image from 'next/image';
import Layout from '@/components/Layout';
import styles from '../styles/CartPage.module.css';


export default function Cart() {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();

    if (isEmpty) return <Layout><p>Tu carrito está vacío</p></Layout>
    return (
      <>
      <Layout>
        <h1 className="font-semibold text-warning">Carrito ({totalUniqueItems})</h1>
        <div className={styles.header}>
              <div>Image</div>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Actions</div>
              <div>Total Price</div>
            </div>
        <ul>
          {items.map((item) => (
            <div className={styles.body} key = {item.id}>
            {item.image ? <div className={styles.image}>
              <Image src={item.image} height="90" width="65" objectFit='contain'/>
            </div> : <div></div>}
            <p>{item.title}</p>
            <p>$ {item.price}</p>
            <p>{item.quantity}</p>
            <div className={styles.buttons}>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                +
              </button>
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <button onClick={() => removeItem(item.id)}>
                x
              </button>
            </div>
            <p>$ {new Intl.NumberFormat("de-DE", {
                  maximumFractionDigits: 0,
                  style: "decimal",
                  currency: "USD",
                }).format(item.quantity * item.price)}{" "}
                 </p>
          </div>
          ))}
          <p className="font-semibold text-warning">Total $ {new Intl.NumberFormat("de-DE", {
                  maximumFractionDigits: 0,
                  style: "decimal",
                  currency: "USD",
                }).format(items.length > 1 ? items.reduce((sum, value) => (sum.price * sum.quantity + value.price * value.quantity)) : items.map((item) => (item.quantity * item.price)) ?? 0)}{" "}
                </p>
         <div className="justify-center p-6 card-actions">
          <button className="btn btn-info">Comprar</button>
        </div>
        </ul>
        </Layout>
      </>
    );
  }
  