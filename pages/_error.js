import React from 'react';
import {useRouter} from "next/router"
import styles from '../styles/Home.module.css';

const ErrorPage = () => {
const router = useRouter();
  return (
    <div className={styles.error_section}>
      <p className={styles.error404}>404</p>
      <p className={styles.error_details}><span className={styles.error_det}>Error:</span>Page not Found</p>
      <button
        onClick={()=> router.back()}
        className={styles.error_button}
        >Go back</button>
    </div>
  )
}

export default ErrorPage;