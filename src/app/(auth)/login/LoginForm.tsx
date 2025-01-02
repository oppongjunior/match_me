"use client"
import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {GiPadlock} from "react-icons/gi";
import {Button} from "@nextui-org/button";
import {useForm} from "react-hook-form";
import {Input} from "@nextui-org/input";
import {loginSchema, LoginSchema} from "@/lib/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInUser} from "@/app/actions/authActions";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";


const LoginForm = () => {
    const router = useRouter()
    const {register, handleSubmit, reset, formState: {errors, isValid, isSubmitting}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched"

    });
    const onSubmit = async (values: LoginSchema) => {
        console.log(values)
        const result = await signInUser(values);
        reset()
        if (result.status === "success") {
            router.push("/members")
        } else {
            toast.error(result.error as string);
        }
    }
    return (
        <Card className="py-4 w-5/6 md:w-2/5 lg:w-3/12 mx-auto my-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-default">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30}/>
                        <h1 className="text-3xl font-semibold">Login</h1>
                    </div>
                    <p>Welcome to MatchMe!</p>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div key="email" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input
                                defaultValue=""
                                label="Email" size="md"
                                type="email" {...register("email")}
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message as string}
                            />
                        </div>
                        <div key="password" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input
                                defaultValue=""
                                label="Password" size="md"
                                type="password" {...register("password")}
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message as string}
                            />
                        </div>
                        <Button
                            size="md"
                            variant="solid"
                            className="bg-pink-600 text-default"
                            fullWidth={true}
                            type="submit"
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                        >Login</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default LoginForm;