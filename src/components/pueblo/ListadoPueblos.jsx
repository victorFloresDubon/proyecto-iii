'use client'

import { Button, Table, Modal, Label, TextInput, Navbar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { BsHouseAdd, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import puebloService from '../../service/pueblo.service';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListadoPueblos() {
    const [pueblos, setPueblos] = useState([]);
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate(); 


    useEffect(() => {
        puebloService.getPueblos()
            .then((res) => {
                console.log(res.data)
                setPueblos(res.data)
            })
            .catch((err) => {
                setPueblos([])
            });
    }, []);


    const mostrarAlerta = (tipoAlerta, mensaje) => {
        Swal.fire({
            icon : tipoAlerta,
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const onSubmit = (data) => {
        // Creación del nuevo pueblo
        puebloService.crearPueblo(data)
            .then((res) => {
                if(res.status === 200){
                    mostrarAlerta('success',res.data.mensaje);
                    navigate("/pueblos")
                }
            })
            .catch((err) => {
                console.log(err);
                mostrarAlerta('error', 'Algo ocurrió')
            })
    }

    return (
        <>
            <Navbar
            fluid
            rounded
            >
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <div className="flex md:order-2">
                        <Button color={"failure"}>
                            Salir
                        </Button>
                        <Navbar.Toggle />
                    </div>                    
                </Navbar.Collapse>
            </Navbar>
            {/** Tabla de pueblos registrados */}
            <div className='h-screen'>
                <div className='container text-center'>
                    <div className='float-right'>
                        <Button color='success' onClick={() => props.setOpenModal('crear-pueblo-form')}>
                            <BsHouseAdd className='mr-2 h-5 w-5' />
                            Nuevo Pueblo
                        </Button>
                    </div>
                    <h3 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>Pueblos</h3>
                </div>
                <div>
                    <Table hoverable className='mt-4'>
                        <Table.Head className='text-center'>
                            <Table.HeadCell>Nombre</Table.HeadCell>
                            <Table.HeadCell>Población</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">
                                    Acciones
                                </span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {
                                pueblos.map((data) => {
                                    return (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" key={data.key}>
                                                {data.pueblo}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-right">
                                                {data.poblacion}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button.Group>
                                                    <Button color='warning' size='sm'>
                                                        <BsPencilSquare className='mr-2 h-5 w-5' />
                                                        Editar
                                                    </Button>
                                                    <Button color='failure' size='sm'>
                                                        <BsFillTrashFill className='mr-2 h-5 w-5' />
                                                        Eliminar
                                                    </Button>
                                                </Button.Group>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
            {/* Cuadro modal para creación de nuevo pueblo */}
            <Modal show={props.openModal === 'crear-pueblo-form'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crear nuevo pueblo</h3>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Nombre del pueblo" />
                                </div>
                                <TextInput id="pueblo" required {...register("nombre")}/>
                            </div>
                            <div className="w-full">
                                <Button type='submit'>Crear pueblo</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ListadoPueblos;