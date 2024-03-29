import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import styled from "styled-components";
import React from "react";
import UserContext from "../contexts/usercontext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';

const AdminLogin = () => {
    const { setUser, setLocalStorageUser } = React.useContext(UserContext);
    const navigate = useNavigate();
    const loginSchema = object({
        email: string().email(),
        password: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });
    const [isDisabled, setDisabled] = React.useState(false);
    const onSubmit = async (data) => {
        setDisabled(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/auth/admin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const data = await response.json();
                const { name, email } = data;
                setUser({
                    isAdmin: true,
                    isLogin: true,
                    name: name,
                    email: email,
                });
                toast.success("Login Successfully", { position: "top-right" });
                const storageData = { name, email, isAdmin: true };
                Cookies.set("user", JSON.stringify(storageData),{ expires: 1 / 24 });
                setLocalStorageUser(data);
                setDisabled(false);
                navigate("/admin/dashboard");
            } else {
                toast.error("Invalid Ceredentials", { position: "top-right" });
                setDisabled(false);
            }
        } catch (error) {
            toast.error("Failed to Login", { position: "top-right" });
            setDisabled(false);
        }
    };
    return (
        <>
            <NavBar />
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Label>Email</Label>
                    {errors.email && <Error>{errors.email.message}</Error>}
                    <Input
                        type="text"
                        placeholder="Enter Email"
                        {...register("email")}
                    ></Input>
                </Group>
                <Group>
                    <Label>Password</Label>
                    {errors.password && (
                        <Error>{errors.password.message}</Error>
                    )}
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password")}
                    ></Input>
                </Group>
                <Button type="submit" disabled={isDisabled} style={{opacity:isDisabled?".8":"1"}}>
                    Login
                </Button>
            </Form>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default AdminLogin;

const Form = styled.form`
    padding: 20px 0px;
    width: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    @media (max-width: 800px) {
        min-height: 50vh;
    }
`;
const Error = styled.div`
    color: red;
    font-size: 0.75rem;
`;
const Input = styled.input`
    padding-left: 10px;
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #fff;
`;
const Label = styled.label`
    color: #282828;
    font-size: 1rem;
`;

const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 50px;
    border: none;
    border-radius: 4px;
    width: 200px;
`;
const Group = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    @media (max-width: 800px) {
        width: 60%;
    }
`;
