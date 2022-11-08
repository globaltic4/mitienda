import React, { Fragment } from 'react';

const DetalleProducto = () => {
    return (
        <Fragment>
            <h2 className="subtitulo">Detalle del Producto</h2>
            <div className="card-deck">
                <div className="card">
                    <h5 className="card-title">Iphone 14 pro</h5>
                    <img className="card-img-top" src="./images/Xiomi.jpg" alt="Card image cap"></img>
                    <div className="card-body">
                        <p className="card-text">Precio $6.800.000.</p>
                        <p className="card-text">Reciente lanzamiento.</p>
                    </div>
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
                    <h5 className="card-title">Apple iPhone 14 Pro 128 GB Color Oro</h5>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Caracteristicas</th>
                                    <th scope="col">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Marca</td>
                                    <td>Apple</td>
                                </tr>
                                <tr>
                                    <td>Nombre</td>
                                    <td>Iphone 14 Pro Max</td>
                                </tr>
                                <tr>
                                    <td>Sistema Operativo</td>
                                    <td>iOS 14</td>
                                </tr>
                                <tr>
                                    <td>Tecnología</td>
                                    <td>5G</td>
                                </tr>
                                <tr>
                                    <td>Capacidad Memoria</td>
                                    <td>128 GB</td>
                                </tr>
                                <tr>
                                    <td>Color</td>
                                    <td>Gold</td>
                                </tr>
                                <tr>
                                    <td>Tamaño Pantalla</td>
                                    <td>6.1 pulgadas</td>
                                </tr>
                                <tr>
                                    <td>Estado</td>
                                    <td className="existencia">Disponible</td>
                                </tr>
                                <tr>
                                    <td>Stock</td>
                                    <td>12</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="stockCounter d-flex">
                        <span className="btn btn-danger minus">-</span>
                        <input type="number" className="form-control count" readOnly />
                        <span className="btn btn-primary plus">+</span>
                        <div>
                            <a href="#" className="btn btn-primary">Comprar</a>
                        </div>
                        <div>
                            <a href="#" className="btn btn-primary">Regresar</a>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className='rating mt-auto'>
                            <div className='rating-outer'>
                                <div className='rating-inner'></div>
                            </div>
                            <span id="No_opiniones">25 reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetalleProducto;
