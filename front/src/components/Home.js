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
                    <Link className="btn btn-primary" to="/containers">
                        <span>Ver detalle</span></Link>
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
                        <Link className="btn btn-primary" to="/DetalleProducto.js">
                        <span>Ver detalle</span></Link>
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
                         <Link className="btn btn-primary" to="/DetalleProducto.js">
                        <span>Ver detalle</span></Link>
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
                    <Link className="btn btn-primary" to="/containers">
                        <span>Ver detalle</span></Link>
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
            <style>
                #mydatatable tfoot input{
                    width: 100% !important;
                }
                #mydatatable tfoot {
                    display: table-header-group !important;
            &gt;
            </style>
            <script type="text/javascript">
                $(document).ready(function() {
                    $('#mydatatable tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Filtrar.." />');
                    });

                var table = $('#mydatatable').DataTable({
                    "dom": 'B<"float-left"i><"float-right"f>t<"float-left"l><"float-right"p><"clearfix">',
                "responsive": false,
                "language": {
                    "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                    },
                "order": [[ 0, "desc" ]],
                "initComplete": function () {
                    this.api().columns().every(function () {
                        var that = this;
                        $('input', this.footer()).on('keyup change', function () {
                            if (that.search() !== this.value) {
                                that
                                    .search(this.value)
                                    .draw();
                            }
                        });
                    })
                }
                });
            });
            </script>

        </Fragment>
    )
}

export default Home;