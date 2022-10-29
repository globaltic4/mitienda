/* eslint-disable */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Fragment>
            <h2 className="subtitulo">Linea de Productos</h2>
            <div className="card-deck">
                <div className="card">
                    <h5 className="card-title">Iphone 14 pro</h5>
                    <img className="card-img-top" src="./images/iphone14ProMax.jpg" alt="Card image cap"></img>
                        <div className="card-body">
                            <p className="card-text">Precio $6.800.000.</p>
                            <p className="card-text">Reciente lanzamiento.</p>
                        </div>
                        <a href="#" className="btn btn-primary">Ver detalle</a>
                        <div className="card-footer">
                            <div className='rating mt-auto'>
                                <div className='rating-outer'>
                                    <div className='rating-inner'></div>
                                </div>
                                <span id="No_opiniones">15 reviews</span>
                            </div>
                        </div>
                </div>
                <div className="card">
                    <h5 className="card-title">Samsung Flex</h5>
                    <img className="card-img-top" src="./images/samsug.jpg" alt="Card image cap"></img>
                        <div className="card-body">
                            <p className="card-text">Precio $ 9.500.000.</p>
                            <p className="card-text">Superior en detalle flexible.</p>
                        </div>
                        <a href="#" className="btn btn-primary">Ver detalle</a>
                        <div className="card-footer">
                            <div className='rating mt-auto'>
                                <div className='rating-outer'>
                                    <div className='rating-inner'></div>
                                </div>
                                <span id="No_opiniones">25 reviews</span>
                            </div>
                        </div>
                </div>
                <div className="card">
                    <h5 className="card-title">Xiomi 11</h5>
                    <img className="card-img-top" src="./images/xiaomi.jpg" alt="Card image cap"></img>
                        <div className="card-body">
                            <p className="card-text">Precio $ 1.700.000.</p>
                            <p className="card-text">Excelencia en los detalles.</p>
                        </div>
                        <a href="#" className="btn btn-primary">Ver detalle</a>
                        <div className="card-footer">
                            <div className='rating mt-auto'>
                                <div className='rating-outer'>
                                    <div className='rating-inner'></div>
                                </div>
                                <span id="No_opiniones">20 reviews</span>
                            </div>
                        </div>
                </div>
                <div className="card">
                    <h5 className="card-title">Motorola G20</h5>
                    <img className="card-img-top" src="./images/motorola_g20.jpg" alt="Card image cap"></img>
                        <div className="card-body">
                            <p className="card-text">Precio $ 1.800.000.</p>
                            <p className="card-text">Superior en desempeno</p>
                        </div>
                        <a href="#" className="btn btn-primary">Ver detalle</a>
                        <div className="card-footer">
                            <div className='rating mt-auto'>
                                <div className='rating-outer'>
                                    <div className='rating-inner'></div>
                                </div>
                                <span id="No_opiniones">12 reviews</span>
                            </div>
                        </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;