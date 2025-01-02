"use client"
import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useForm} from "react-hook-form";
import {registerSchema, RegisterSchema} from "@/lib/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerUser} from "@/app/actions/authActions";
import {ZodIssue} from "zod";


const RegisterForm = () => {
    const {register, handleSubmit, setError, reset, formState: {errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });
    const onSubmit = async (values: RegisterSchema) => {
        const result = await registerUser(values);
        reset();
        if (result.status === "success") {
            console.log("User registered successfully")
        } else {
            if (Array.isArray(result.error)) {
                result.error.forEach((e:ZodIssue) => {
                    const fieldName = e.path.join(".") as "email" | "name" | "password";
                    setError(fieldName, {message: e.message})
                })
            } else {
                console.log(result.error)
                setError("root.serverError", {message: result.error})
            }
        }
    }
    return (
        <Card className="py-4 w-5/6 md:w-1/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-default">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30}/>
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p>Create An Account Now!</p>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div key="name" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input
                                defaultValue=""
                                label="Name" size="md"
                                type="name" {...register("name")}
                                isInvalid={!!errors.name}
                                errorMessage={errors.name?.message as string}
                            />
                        </div>
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

export default RegisterForm;