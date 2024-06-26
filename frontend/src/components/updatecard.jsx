/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import styled from "styled-components";
import { useForm,useController } from "react-hook-form";
import CategoriesOptions from "./categoriesoptions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateCard = ({card}) => {
    const navigate = useNavigate();
    const [isDisabled, setDisabled] = React.useState(false);
    const { register, handleSubmit,control,setValue } = useForm();
    const { field } = useController({
        name: 'category',
        control,
        defaultValue: `${card.category}`,
      });
    const [categories, setCategories] = React.useState([
        "Happy Birthday",
        "Thank You",
    ]);
    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/category/get`
                );
                const data = await response.json();
                const categories = data.data;
                const newData = [];
                categories.forEach((element) => {
                    newData.push(element.category);
                });
                setCategories(() => {
                    return ["Happy Birthday", "Thank You", ...newData];
                });
            } catch (error) {
                console.log(error);
            }
            setValue("name",card.name)  
        };

        fetchUsers();
    }, []);
    const onSubmit = async (data) => {
        setDisabled(true)
        const id = card._id;
        const formData = new FormData();
        formData.append('id',id)
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('front', data.front[0]);
        formData.append('image', data.image[0]);
        formData.append('envelope', data.envelope[0]);
        formData.append('custom', data.custom[0]);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/card/update`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Successfully Update the Card", { position: 'top-right' });
                setDisabled(false)
                navigate(0);
            } else {
                toast.error("Failed to Update the Card", { position: 'top-right' });
                setDisabled(false)
            }
        } catch (error) {
            toast.error("Failed to Update the Card", { position: 'top-right' });
            setDisabled(false)
        }
    };
    return (
        <CategoryDiv>
            <Title>Update Card</Title>
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Label>Name of Card</Label>
                    <Input
                        type="text"
                        placeholder="Enter Card Name"
                        {...register("name")}
                    ></Input>
                </Group>
                <Group>
                    <Label>Select Category</Label>
                    <select name="category" {...field} style={{width:"90%",height:"40px"}}>
                        {categories &&
                            categories.map((item) => {
                                return <CategoriesOptions item={item} />;
                            })}
                    </select>
                </Group>
                <Group>
                    <Label>Choose Front side of Card</Label>
                    <InputFile type="file" {...register("front")}></InputFile>
                </Group>
                <Group>
                    <Label>Choose Image Upload Side</Label>
                    <InputFile type="file" {...register('image')}></InputFile>
                </Group>
                <Group>
                    <Label>Choose Envelope</Label>
                    <InputFile type="file" {...register('envelope')}></InputFile>
                </Group>
                <Group>
                    <Label>Choose Custom</Label>
                    <InputFile type="file" {...register('custom')}></InputFile>
                </Group>
                <Button type="submit" disabled={isDisabled} style={{opacity:isDisabled?".8":"1"}}>Update Card</Button>
            </Form>
        </CategoryDiv>
    );
};

export default UpdateCard;

const CategoryDiv = styled.div`
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
`;
const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    @media (max-width:450px){
        justify-content: center;
    }
`;
const Title = styled.div`
    color: #fdc674;
    font-size: 2rem;
    font-weight: 700;
`;
const Group = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width:400px;
    gap: 10px;
    @media (max-width:450px){
        width: 330px;
    }
`;
const Input = styled.input`
    padding-left: 10px;
    width: 90%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #fff;
`;

const InputFile = styled.input`
    padding: 10px 0;
    width: 90%;
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #fff;
`;
const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 4px;
    width: 200px;
`;
const Label = styled.label`
    color: #282828;
    font-size: 1rem;
`;
