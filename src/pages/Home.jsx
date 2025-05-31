import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, loadMore, filterByRegion } from '../redux/countriesSlice';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import '../styles/home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from 'react-bootstrap/Spinner';
import { Navbar, Nav, Container as BsContainer } from 'react-bootstrap';


const Home = () => {
    const dispatch = useDispatch();
    const { filtered, visible, status, error } = useSelector((state) => state.countries);

    const [selectedFilter, setSelectedFilter] = useState("All");

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleLoadMore = () => dispatch(loadMore());
    const handleFilter = (region) => {
        dispatch(filterByRegion(region));
        setSelectedFilter(region);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (status === 'loading') {
        return (
            <Container className="home-page d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status" />
            </Container>
        );
    }

    if (status === 'failed') {
        return (
            <Container className="home-page text-center mt-5">
                <h4>Error loading countries</h4>
                <p>{error}</p>
            </Container>
        );
    }

    return (
        <Container className="home-page">

            <Suspense fallback="loading">
                <>
                    
                    <Navbar expand="md" className="mb-3 border-bottom">
                        <Container>
                            <Navbar.Brand href="#" className="fw-bold">Countries</Navbar.Brand>
                            <Navbar.Toggle aria-controls="main-navbar" />
                            <Navbar.Collapse id="main-navbar">
                                <Nav className="ms-auto d-flex gap-3 region-filters">
                                    <Button
                                        variant=""
                                        onClick={() => handleFilter('All')}
                                        className={selectedFilter === "All" ? 'active-filter' : ''}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        variant=""
                                        onClick={() => handleFilter('Asia')}
                                        className={selectedFilter === "Asia" ? 'active-filter' : ''}
                                    >
                                        Asia
                                    </Button>
                                    <Button
                                        variant=""
                                        onClick={() => handleFilter('Europe')}
                                        className={selectedFilter === "Europe" ? 'active-filter' : ''}
                                    >
                                        Europe
                                    </Button>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>



                    <h2 className="text-center my-4 home-text">WELCOME</h2>

                    
                    <Row className="gx-3 mb-4">
                        <Col md={8}>
                            <Slider {...sliderSettings}>
                                {filtered.slice(0, 6).map((country, index) => (
                                    <div className="slider-item" key={index}>
                                        <Card className="text-center custom-border">
                                            <Card.Body>
                                                <Card.Img variant="top" src={country.flag} style={{ width: '100%', objectFit: 'cover' }} />
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 text-center custom-border">
                                <Card.Body className="p-0">
                                    <Card.Img
                                        variant="center"
                                        src={filtered[10]?.flag}
                                        style={{ width: '100%', objectFit: 'cover' }}
                                    />
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>

                    {/* Countries Grid */}
                    <Row className="gx-3 gy-4 country-list">
                        {filtered.slice(0, visible).map((country, index) => (
                            <Col xs={12} sm={6} md={6} lg={6} key={index}>
                                <Card className="h-100 d-flex flex-row align-items-center  custom-border">
                                    <Card.Img
                                        variant="top"
                                        src={country.flag}
                                        className="bannerImage"
                                        style={{ width: '120px', height: 'auto', objectFit: 'cover', flexShrink: 0 }}
                                    />
                                    <Card.Body className="text-start" style={{ flex: 1 }}>
                                        <Card.Title>{country.name}</Card.Title>
                                        <Card.Text>{country.region}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    
                    {visible < filtered.length && (
                        <div className="text-center mt-4">
                            <Button onClick={handleLoadMore} variant="dark" className="loadeMore">Load More</Button>
                        </div>
                    )}

                    
                    <footer className="text-center mt-5 py-4 border-top">
                        <div className="d-flex justify-content-center gap-3 social-icons">
                            <div className="social-icon"><FaGoogle size={18} /></div>
                            <div className="social-icon"><FaFacebookF size={18} /></div>
                            <div className="social-icon"><FaLinkedinIn size={18} /></div>
                            <div className="social-icon"><FaTwitter size={18} /></div>
                        </div>
                        <p>example@domain.com</p>
                        <small>Copyright © 2025 Home. All rights reserved.</small>
                    </footer>
                </>
            </Suspense>

        </Container>
    );
};

export default Home;
