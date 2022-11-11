import React, { Fragment } from 'react';

const VentaProductos = () => {
    return (
        <Fragment>
            <h2 className="subtitulo">Venta de Productos</h2>
            <div className="card-deck">
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Tipo de Producto</th>
                                    <th scope="col">Categoria de Producto</th>
                                    <th scope="col">Marca del Producto</th>
                                    <th scope="col">Nombre del Producto</th>
                                    <th scope="col">Cantidad de Producto Vendido</th>
                                    <th scope="col">Valor de Producto Vendido</th>
                                    <th scope="col">Fecha de Venta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src="./images/Xiomi.jpg" width="40" height="40" className="d-inline-block align-top" alt="Card image cap"></img></td>
                                    <td>Telefono</td>
                                    <td>Alta</td>
                                    <td>Apple</td>
                                    <td>Iphone 14 Pro Max</td>
                                    <td className="cantidad">1</td>
                                    <td className="valores">$5.714.286.</td>
                                    <td className="valores">2022/10/25</td>
                                </tr>
                                <tr>
                                    <td><img src="./images/samsug.jpg" width="40" height="40" className="d-inline-block align-top" alt="Card image cap"></img></td>
                                    <td>Telefono</td>
                                    <td>Alta</td>
                                    <td>Samsung</td>
                                    <td>Samsung A11</td>
                                    <td className="cantidad">1</td>
                                    <td className="valores">$672.268.</td>
                                    <td className="valores">2022/10/25</td>
                                </tr>
                                <tr>
                                    <td><img src="./images/xiaomi.jpg" width="40" height="40" className="d-inline-block align-top" alt="Card image cap"></img></td>
                                    <td>Telefono</td>
                                    <td>Media</td>
                                    <td>Xiaomi</td>
                                    <td>Xiaomi 10</td>
                                    <td className="cantidad">1</td>
                                    <td className="valores">$800.000.</td>
                                    <td className="valores">2022/10/25</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="compra-btn-group">
                        <div>
                            <a href="#" className="btn btn-primary">Imprimir Reporte</a>
                        </div>
                        <div>
                            <a href="#" className="btn btn-primary">Regresar</a>
                        </div>
                    </div>
                    <div className="card-footer"></div>
                </div>
            </div>
        </Fragment>
    )
}

export default VentaProductos;