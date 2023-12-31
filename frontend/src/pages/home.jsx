import Footer from "../components/footer";
import NavBar from "../components/navbar";
import styled from "styled-components";
import image_1 from "../assets/home1.png";
import image_2 from "../assets/home2.png";
import image_3 from "../assets/home3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faShare,
    faPrint,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import Typewriter from "../components/typewriter";
import React from "react";
const Home = () => {
    const [loadingPage, setLoadingPage] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {loadingPage ? (
                <>
                    <Ring>
                        Loading
                        <span></span>
                    </Ring>
                </>
            ) : (
                <>
                    <NavBar />
                    <LandingPage>
                        <HeaderSection>
                            <Label>
                                Ready to
                                <span> Celebrate ?</span>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Omnis aut qui est ex
                                    porro. Velit id corporis tenetur, magni
                                    autem totam praesentium libero, ut adipisci
                                    nemo est neque, culpa saepe!
                                </p>
                            </Label>
                            <Image src="/thanksyou/1/Front/Front.png"></Image>
                        </HeaderSection>
                        <Label
                            style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "20px",
                            }}
                        >
                            Explore What&apos;s <span> Trending</span>
                        </Label>
                        <MainSection>
                            <Image src={image_1}></Image>
                            <Image src={image_2}></Image>
                        </MainSection>
                        <MiddleSection>
                            <Image src={image_3}></Image>
                            <MiddleDiv>
                                <Label>
                                    Explore What&apos;s
                                    <span> trending</span>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Omnis aut qui est ex
                                        porro. Velit id corporis tenetur, magni
                                        autem totam praesentium libero, ut
                                        adipisci nemo est neque, culpa saepe!
                                    </p>
                                </Label>
                                <Button>Happy Birthday</Button>
                                <Button>Thanksyou Card</Button>
                            </MiddleDiv>
                        </MiddleSection>
                        <TypeWriter>
                            Endless ways to{" "}
                            <Typewriter text={"spread the joy"} />
                        </TypeWriter>
                        <BottomText>
                            Design it once, share it everywhere!
                        </BottomText>
                        <IconsDiv>
                            <Icons>
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    size={"lg"}
                                />
                                <h3>Download</h3>
                                <p>
                                    Get a digital copy of your invitation by
                                    downloading it to your device.
                                </p>
                            </Icons>
                            <Icons>
                                <FontAwesomeIcon icon={faPrint} size={"lg"} />
                                <h3>Print</h3>
                                <p>
                                    Get a digital copy of your invitation by
                                    downloading it to your device.
                                </p>
                            </Icons>
                            <Icons>
                                <FontAwesomeIcon icon={faShare} size={"lg"} />
                                <h3>Share</h3>
                                <p>
                                    Get a digital copy of your invitation by
                                    downloading it to your device.
                                </p>
                            </Icons>
                            <Icons>
                                <FontAwesomeIcon icon={faFile} size={"lg"} />
                                <h3>Manage</h3>
                                <p>
                                    Get a digital copy of your invitation by
                                    downloading it to your device.
                                </p>
                            </Icons>
                        </IconsDiv>
                    </LandingPage>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Home;

const LandingPage = styled.div`
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.75rem;
`;

const HeaderSection = styled.section`
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 4rem;
    @media (max-width: 800px) {
        & > div {
            width: 50%;
        }
        flex-direction: column;
    }
`;
const Image = styled.img`
    width: 460px;
    height: 460px;
`;
const Label = styled.div`
    width: 30%;
    color: #282828;
    font-size: 3rem;
    & > span {
        color: #fdc674;
    }
    & > p {
        font-size: 0.8rem;
    }
`;

const MainSection = styled(HeaderSection)`
    border-radius: 10px;
    gap: 5rem;
`;

const MiddleSection = styled.div`
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px;
    & > img {
        width: 350px;
        height: 350px;
    }
    @media (max-width: 800px) {
        & > div {
            justify-content: center;
            align-items: center;
            width: 70%;
        }
        flex-direction: column;
    }
`;
const MiddleDiv = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    & > div {
        width: 100%;
    }
`;
const Button = styled.button`
    font-weight: 700;
    border: none;
    border-radius: 10px;
    background: #f4f4f4;
    width: 250px;
    height: 51px;
`;

const BottomText = styled.div`
    padding: 20px;
    font-weight: 600;
    font-size: 1.1rem;
`;

const IconsDiv = styled.div`
    width: 100%;
    padding: 3rem 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`;
const Icons = styled.div`
    padding: 20px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`;

const TypeWriter = styled.div`
    font-size: 2rem;
    text-align: center;
    width: 100%;
    & > span {
        color: #fdc674;
    }
`;

const Ring = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    text-align: center;
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;
    color: #fdc674;
    letter-spacing: 4px;
    text-transform: uppercase;
    &:before {
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        width: 100%;
        height: 100%;
        border: 3px solid transparent;
        border-top: 3px solid #fdc674;
        border-right: 3px solid #fdc674;
        border-radius: 50%;
        animation: animateC 2s linear infinite;
    }
    & > span {
        display: block;
        position: absolute;
        top: calc(50% - 2px);
        left: 50%;
        width: 50%;
        height: 4px;
        background: transparent;
        transform-origin: left;
        animation: animate 2s linear infinite;
    }
    @keyframes animateC {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes animate {
        0% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(405deg);
        }
    }
`;
