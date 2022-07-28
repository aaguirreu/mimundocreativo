import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Loading.module.css"

function Loading(props) {
    return (
        <div className={props.loading ? styles.body_loading : styles.none}>
          <div
            className={styles.lds_ellipsis}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
}

function Cargando({ Component, pageProps }) {
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
    
      return (
        <>
              <Loading loading={loading} />  
              <Component {...pageProps} />
        </>
      );
}
    
    export default Cargando;
    