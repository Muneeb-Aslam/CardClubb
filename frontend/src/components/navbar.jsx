/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import logo from "../assets/Logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import React from "react";
import userContext from "../contexts/usercontext";
import Category from "./category";

const NavBar = () => {
    const { user, setLocalStorageUser,setUser } = React.useContext(userContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([
        "Happy Birthday",
        "Thank You",
    ]);
    const navigate = useNavigate();
    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://cardclub.vercel.app/category/get"
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
        };

        fetchUsers();
    }, []);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogoutClick = async () => {
        try {
            const response = await fetch(
                "https://cardclub.vercel.app/api/users/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                localStorage.removeItem("user");
                setUser({isAdmin:false,isLogin:false,username:"",email:""})
                setLocalStorageUser(null);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleCategory = (e) => {
        const categoryData = e.target.innerText;
        if (categoryData == "Happy Birthday")
            navigate("/birthday/product", {
                state: { category: "Happy Birthday" },
            });
        else if (categoryData == "Thank You")
            navigate("/thankyou/product", { state: { category: "Thank You" } });
        else    
            navigate(`/${categoryData}/product`,{state:{category:`${categoryData}`}})
        setIsOpen(!open);
    };
    return (
        <Nav>
            <Primary>
                <Logo src={logo} alt="logo"></Logo>
                {user.isLogin ? (
                    <Account>
                        <AccountLinks>{user.username}</AccountLinks>
                        <AccountLinks onClick={handleLogoutClick}>
                            Logout
                        </AccountLinks>
                    </Account>
                ) : (
                    <Account>
                        <AccountLinks as={Link} to="/login">
                            Login
                        </AccountLinks>
                        <AccountLinks as={Link} to="/register">
                            SignUp
                        </AccountLinks>
                    </Account>
                )}
            </Primary>
            <Secondary>
                <NavList>
                    <li>
                        <NavLink to="/home" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <DropdownContainer>
                            <Button onClick={toggleDropdown}>Categories</Button>
                            <DropdownContent
                                style={{ display: isOpen ? "flex" : "none" }}
                            >
                                {categories.map((item) => {
                                    return (
                                        <Category
                                            category={item}
                                            click={handleCategory}
                                        />
                                    );
                                })}
                            </DropdownContent>
                        </DropdownContainer>
                    </li>
                    <li>
                        <NavLink to="/contact" activeClassName="active">
                            Contact Us
                        </NavLink>
                    </li>
                </NavList>
            </Secondary>
        </Nav>
    );
};

export default NavBar;

const Primary = styled.div`
    width: 100%;
    height: 50%;
    background: radial-gradient(
        70.71% 70.71% at 50% 50%,
        rgba(248, 248, 248, 0.98) 0%,
        #fff 89%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @media (max-width: 700px) {
        height: 40%;
    }
`;
const Secondary = styled.div`
    width: 100%;
    background: #282828;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5rem;
    padding-left: 1.5rem;
    height: 50%;
    @media (max-width: 700px) {
        height: 40%;
    }
`;

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    & > li > a {
        color: #fff;
        font-size: 1.25rem;
        padding-bottom: 10px;
        &:hover {
            color: #fdc674;
            border-bottom: 3px solid #fdc674;
        }
        &.active {
            color: #fdc674;
            border-bottom: 3px solid #fdc674;
        }
        @media (max-width: 700px) {
            font-size: 1rem;
        }
    }
`;

const Logo = styled.img`
    width: 120px;
    height: 100%;
`;

const Nav = styled.nav`
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Account = styled.div`
    position: absolute;
    right: 15px;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
const AccountLinks = styled.a`
    font-size: 1.25rem;
    color: #000;
    &:hover {
        color: #af4b2f;
    }
    &:first-child {
        padding-right: 5px;
        border-right: 3px solid #af4b2f;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const Button = styled.button`
    color: #fff;
    font-size: 1.25rem;
    padding-bottom: 10px;
    &:hover {
        color: #fdc674;
    }
    padding: 8px;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: inherit;
`;

const DropdownContent = styled.div`
    background-color: #282828;
    border-radius: 0px 0px 10px 10px;
    width: 150px;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 13px;
    padding: 10px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    & > a {
        cursor: pointer;
        color: #fff;
    }
    & > a:hover {
        color: #fdc674;
    }
`;
