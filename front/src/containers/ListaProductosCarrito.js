import React, { Fragment } from 'react';

const ListaProductosCarrito = () => {
    return (
        <Fragment>
            <h2 className="subtitulo">Carrito de compras</h2>
            <div className="card-deck">
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Impuesto</th>
                                    <th scope="col">Total Compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src="./images/Xiomi.jpg" width="40" height="40" className="d-inline-block align-top" alt="Card image cap"></img></td>
                                    <td>Iphone 14 Pro Max</td>
                                    <td className="cantidad">1</td>
                                    <td className="valores">$5.714.286.</td>
                                    <td className="valores">$5.714.286.</td>
                                    <td className="valores">$1.085.714.</td>
                                    <td className="valores">$6.800.000.</td>
                                </tr>
                                <tr>
                                    <td><img src="./images/samsug.jpg" width="40" height="40" className="d-inline-block align-top" alt="Card image cap"></img></td>
                                    <td>Samsung A11</td>
                                    <td className="cantidad">1</td>
                                    <td className="valores">$672.268.</td>
                                    <td className="valores">$672.268.</td>
                                    <td className="valores">$127.732.</td>
                                    <td className="valores">$800.000.</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="cantidad">2</td>
                                    <td className="valores">$6.386.554.</td>
                                    <td className="valores">$6.386.554.</td>
                                    <td className="valores">$1.213.446.</td>
                                    <td className="valores">$7.600.000.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="compra-btn-group">
                        <div>
                            <a href="#" className="btn btn-primary">Finalizar Compra</a>
                        </div>
                        <div>
                            <a href="#" className="btn btn-primary">Cancelar Compra</a>
                        </div>
                    </div>
                    <div className="card-footer"></div>
                </div>
            </div>
        </Fragment>
    )
}

export default ListaProductosCarrito;