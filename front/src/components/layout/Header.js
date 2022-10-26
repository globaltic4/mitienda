import React, { Fragment } from 'react';

const Header = () => {
    return (
        <Fragment>
            <div className="headerPrincipal">
                <div className="container">
                    <nav className="navbar navbar-light bg-light">
                        <a className="navbar-brand" href="#">
                            <img src="./images/globaltic.jpg" width="30" height="30" className="d-inline-block align-top" alt="Logo Global Tic 4"></img>
                        </a>
                    </nav>
                    <h1 className="headerPrincipal-titulo">Mi tienda</h1>
                </div>
                <div className="container1">
                    <div className="input-group">
                        <input type="text" id="search_field" className="form-control" placeholder='Que producto busca?'></input>
                        <div className="input-group-append">
                            <button id="search-btn" className="btn">
                                <i className="fa fa-search-plus fa-2x text-white" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <nav className="headerPrincipal-nav">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <div>
                                <a href="#" className="btn btn-outline-secondary btn-sm ">Home</a>
                            </div>
                            <div>
                                <a href="#" className="btn btn-outline-secondary btn-sm ">Categoria</a>
                            </div>
                            <div>
                                <a href="#" className="btn btn-outline-secondary btn-sm ">Fecha</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;