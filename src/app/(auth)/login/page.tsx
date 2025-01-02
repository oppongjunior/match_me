import React from 'react';
import LoginForm from "@/app/(auth)/login/LoginForm";
import styles from "../auth.module.css";

const Page=()=> {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
}

export default Page;