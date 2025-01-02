import React from 'react';
import RegisterForm from "@/app/(auth)/register/RegisterForm";
import styles from "@/app/(auth)/auth.module.css";

const Page = () => {
    return (
        <div className={styles.container}>
            <RegisterForm />
        </div>
    );
};

export default Page;