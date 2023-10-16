import React, { useContext, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { TrackingContext } from "../TrackingContext";
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import arLogo from "../../assets/bostaArbLogo.png";
import enLogo from "../../assets/bostaEngLogo.png";


function Header() {
    const { t, i18n  } = useTranslation();
    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
    };
    const { updateTrackingNumber } = useContext(TrackingContext);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTrackingNumber = (event) => {
        event.preventDefault();
        updateTrackingNumber(inputValue);
        setInputValue("");
    };

    return <>
        <Navbar bg="light" expand="lg" style={{ minHeight: "60px" , width: "100%"}} dir={(i18n.language === 'ar' ? "rtl" : "ltr")} >
            <Navbar.Brand href="#home" style={{ marginRight: (i18n.language === 'ar') ? "50px" : "0px", marginLeft: (i18n.language === 'ar') ? "0px" : "50px" }}>
                <img src={(i18n.language === 'ar' ? arLogo : enLogo)} alt="logo" style={{ width: "7rem", height: "auto" }}></img>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="#home"><strong>{t('main')}</strong></Nav.Link>
                    <Nav.Link href="#pricing" style={{ marginLeft: "3rem", marginRight: "3rem" }}><strong>{t('pricing')} </strong></Nav.Link>
                    <Nav.Link href="#sales"><strong>{t('askSales')}</strong></Nav.Link>
                </Nav>

                <Nav>
                    <NavDropdown title={t('trackShippment')} id="basic-nav-dropdown" >
                        <div style={{ padding: "20px" }}>
                            <p>{t('trackShippment')}</p>
                            <Form onSubmit={handleAddTrackingNumber} style={{ display: "flex" }}>
                                <FormControl
                                    type="text"
                                    placeholder={t('trackNumber')}
                                    className="mr-sm-2"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    style={{ width: "200px", borderRadius: "10px", borderTopRightRadius: (i18n.language === 'ar') ? "10px" : "0px", borderBottomRightRadius: (i18n.language === 'ar') ? "10px" : "0px", borderTopLeftRadius: (i18n.language === 'ar') ? "0px" : "10px", borderBottomLeftRadius: (i18n.language === 'ar') ? "0px" : "10px" }}
                               
                               />
                                <Button variant="danger" type="submit" style={{ borderRadius: "10px", borderTopLeftRadius: (i18n.language === 'ar') ? "10px" : "0px", borderBottomLeftRadius: (i18n.language === 'ar') ? "10px" : "0px", borderBottomRightRadius: (i18n.language === 'ar') ? "0px" : "10px", borderTopRightRadius: (i18n.language === 'ar') ? "0px" : "10px" }}>
                                    <FaSearch />
                                </Button>
                            </Form>
                        </div>
                    </NavDropdown>

                    <Nav.Link href="#signin" ><strong>{t('signIn')}</strong></Nav.Link>
                    <Nav.Link href="" onClick={() => handleLanguageChange(i18n.language === 'ar' ? 'en' : 'ar')} style={{ color: "#e20a1a", marginRight: (i18n.language === 'ar') ? "0px" : "50px", marginLeft: (i18n.language === 'ar') ? "50px" : "0px" }}>
                       <strong> {i18n.language === 'ar' ? 'ENG' : 'عربي'}</strong>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>


    </>
}

export default Header