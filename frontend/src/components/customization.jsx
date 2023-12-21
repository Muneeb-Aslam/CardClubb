import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, } from "react-router-dom";
import ImageUpload from "./imageupload";
import Inside from "./Inside";
import UserContext from "../contexts/usercontext";

const Customization = () => {
    const { state } = useLocation();
    const { category, index } = state;
    const [image, setImage] = React.useState("Front");
    const navigate = useNavigate();
    const {user}=useContext(UserContext)
    const labelClick = (e) => {
        return setImage(e.target.innerText);
    };
    const handleSaveClick = () => {
        if (image == "Front") {
            setImage("Inside");
        } else if (image == "Inside") {
            setImage("Envelope");
        }else {
            if(user.isLogin)
                navigate(`/card/${category}/design/send`,{state:{category,index}})
            else   
                navigate('/login')
        }
    };
    return (
        <CustomContainer>
            <ImageNav>
                <Label onClick={labelClick}>Front</Label>
                <Label onClick={labelClick}>Inside</Label>
                <Label onClick={labelClick}>Envelope</Label>
                <Button onClick={handleSaveClick}>Save</Button>
            </ImageNav>

            {image == "Front" ? (
                <ImageContainer>
                    <Image
                        src={`/${category}/${index}/Front/Front.png`}
                    ></Image>
                </ImageContainer>
            ) : image == "Inside" ? (
                <ImageContainer>
                    <Inside category={category} index={index} />
                </ImageContainer>
            ) : (
                <ImageUploadContainer>
                    <ImageUpload category={category} index={index} />
                </ImageUploadContainer>
            )}
        </CustomContainer>
    );
};

export default Customization;

const CustomContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ImageNav = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);
    @media (max-width: 650px) {
        padding: 1px 10px;
        gap: 10px;
    }
`;

const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 12px;
    width: 150px;
`;

const Label = styled.div`
    background: #fdc674;
    cursor: pointer;
    color: #282828;
    font-size: 1.25rem;
    font-weight: 500;
    height: 40px;
    border: none;
    border-radius: 12px;
    width: 110px;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const Image = styled.img`
    width: 450px;
    height: 500px;
`;

const ImageContainer = styled.div`
    padding: 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 750px) {
        width: 60%;
    }
    @media (max-width: 550px) {
        width: 50%;
    }
`;

const ImageUploadContainer = styled.div`
    padding: 30px 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
