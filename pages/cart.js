import { CartProvider, useCart } from "react-use-cart";
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function Cart() {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();

    if (isEmpty) return <Layout><p className="font-semibold text-warning">Tu carrito está vacío</p></Layout>
    return (
      <>
      <Layout>
        <h1 className="font-semibold pt-7 text-warning">Carrito ({totalUniqueItems})</h1>
  
        <ul>
          {items.map((item) => (
            <div className="w-auto h-40 p-2 my-5 font-semibold shadow-xl md:text-xl bg-neutral text-warning" key = {item.id}>
              {item.image ? <div className="hidden float-left md:flex">
                <Image src={item.image} height="144" width="144" objectFit="contain"/>
              </div> : <div></div>}
              <div className="float-left w-48 pl-6 text-xl h-36 md:w-2/3">
                <h1 className="justify-start text-left">{item.title}</h1>
                <p className="text-sm text-left text-accent">{item.description ?? ""}</p>
              </div>
              <button className="float-right hover:text-info" onClick={() => removeItem(item.id)}>
                x
              </button>
              <div className="items-center float-right pt-8 tracking-wide" >
                <button className="content-center min-h-0 p-3 h-9 btn btn-info" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <button className="p-5 text-justify btn-disabled text-warning">{item.quantity}</button>
                <button className="content-center min-h-0 p-3 h-9 btn btn-info" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
              <div className="">
                <p >$ {new Intl.NumberFormat("de-DE", {
                    maximumFractionDigits: 0,
                    style: "decimal",
                    currency: "USD",
                  }).format(item.quantity * item.price)}{" "}
                </p>
              </div>
            </div>
          </div>
          ))}
          <p className="font-semibold text-warning">Total $ {new Intl.NumberFormat("de-DE", {
                  maximumFractionDigits: 0,
                  style: "decimal",
                  currency: "USD",
                //}).format(items.length > 1 ? items.reduce((sum, value) => (sum.price * sum.quantity + value.price * value.quantity)) : items.map((item) => (item.quantity * item.price)) ?? 0)}{" "}
                }).format(items.reduce((previousValue, currentValue) => previousValue + currentValue.quantity * currentValue.price, 0))}{" "}
                </p>
         <div className="justify-center p-6 card-actions">
          <button className="btn btn-info">Comprar</button>
        </div>
        </ul>
        </Layout>
      </>
    );
  }
  