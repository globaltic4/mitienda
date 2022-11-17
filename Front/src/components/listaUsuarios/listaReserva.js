import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState, useEffect } from 'react';

const ListaReserva = () => {

    
    const [datosReserva, setDatosReserva] = useState([{}])
    const [bancoSelect, setBancoSelect] = useState({})
    const [bancos, setBancos] = useState([
      {"type":"TC","banco":"Banco Nacional","franquicia":"MasterCard"},
      {"type":"TD","banco":"Banco Nacional","franquicia":"MasterCard"},
      {"type":"Efectivo","banco":"Banco Nacional","franquicia":"Recaudo"},
      {"type":"TC","banco":"Banco Internacional","franquicia":"Visa"},
      {"type":"TD","banco":"Banco Internacional","franquicia":"Visa"},
      {"type":"Efectivo","banco":"Banco Internacional","franquicia":"Recaudo"}
    ])

    useEffect(
        ()=> {
          //localhost - 127.0.0.1
          fetch("http://localhost:8084/reservas/estado/idcliente/?id=02&estado=Pendiente")
          .then(
            (response)=>(response.json())
          )
          .then(
            (response)=>{
                
                for(let i = 0; i<response.length;i++){
                    let reseva = response[i]
                    let sumasilla = 0

                    for(let j = 0 ; j < reseva.sillas.length; j++){
                        sumasilla += reseva.sillas[j].silla
                    }

                    response[i].total = sumasilla * reseva.vuelo.valor
                }
                setDatosReserva(response)
            }
          ) 
        },[]
       )


       const pagoReserva= async (idreserva, valor)=> {

        var pago = {}
        pago.estado = "Aprobado"
        pago.idreserva = idreserva
        pago.medio = JSON.parse(bancoSelect)
        pago.valor = valor
        
        console.log(pago)
        
        await fetch("http://localhost:8083/pagos",
        
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(pago)
        }
        
        ).then(
          (response)=>(response.json())
        ).then(
          (response)=>{
            alert(response.mensaje)
          }
        ).catch(
          (error)=>{
            console.log(error)
            alert(error)
          }
        )
  
      }

      const bancoSelectFront = (banco) =>{
        setBancoSelect(banco)
      }

    return (
            <div>
                    
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre producto</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Detalle</th>
                  <th>Valor unitario</th>
                  <th>Valor Total</th>
                  <th>Estado del pago</th>
                  <th>Forma de pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              
                { 
                  datosReserva.map(
                    (reserva,index)=>{
                      return(
                        <tr>
                          <td>{reserva._id}</td>
                          <td>{reserva.vuelo?.origen}</td>
                          <td>{reserva.vuelo?.destino}</td>
                          <td>{reserva.vuelo?.fecha}</td>
                          <td>
                        
                          {
                            reserva?.sillas?.map(
                              (sillareservar,index)=>{
                                return(
      
                                  
                                <div key={index}  className="mb-3">   
                                    <label>Categoria: {sillareservar.categoria}</label> 
                                    <br></br>  
                                    <label>Cant. Artículos: {sillareservar.silla}</label>    
                                </div>
                                  
      
                                )
                              }
                            )
                          }
                          </td>

                          <td>
                            <td>${new Intl.NumberFormat("de-DE").format(`${reserva.vuelo?.valor}`)}</td>
                          </td>

                          <td>
                            <td>${new Intl.NumberFormat("de-DE").format(`${reserva.total}`)}</td>
                          </td>

                          <td>
                            {reserva.estadoPago}
                          </td>

                          <td>
                          <Form.Select aria-label="Default select example"
                            onChange={
                              (e)=>{
                                  bancoSelectFront(e.target.value)
                              }
                            }
                          >
                            <option>Seleccione Bancos</option>
                            {
                              bancos?.map(
                                (bancosmedios,index)=>{
                                  return(
                                    <option value={JSON.stringify(bancosmedios)}>{bancosmedios.banco} - {bancosmedios.type}</option>
                                  )
                                }
                              )
                            }
                          </Form.Select>
                          </td>

                          <td>
                            <Button variant="btn btn-outline-success" onClick={
                            async ()=>{
                              await pagoReserva(reserva._id,reserva.total)
                            }
                            } >Pagar</Button>
                            </td>
                        </tr>
                      );
                    }
                  )
                }
                  
              </tbody>
            </Table>
            
              
            </div>
      
          )

}


export default ListaReserva