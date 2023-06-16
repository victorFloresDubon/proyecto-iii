import { Button, Modal, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { BsHouseAdd, BsViewList } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import puebloService from '../service/pueblo.service';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


function Inicio() {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate(); 

    const mostrarAlertaCreado = (mensaje) => {
        Swal.fire({
            icon : 'success',
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
                    mostrarAlertaCreado(res.data.mensaje);
                    navigate("/pueblos")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const verListadoPueblos = () => {
        navigate("/pueblos")
    }

    return (
        <>
            <div className='h-screen flex items-center justify-center'>
                <div className='grid gap-4 my-4 py-5 px-6'>
                    <Button type='button' gradientDuoTone={"greenToBlue"} onClick={() => props.setOpenModal('crear-pueblo-form')}>
                        <BsHouseAdd className='mr-2 h-5 w-5' /> Crear Pueblo
                    </Button>
                    <Button type='button' gradientDuoTone={"greenToBlue"} onClick={() => verListadoPueblos()}>
                        <BsViewList className='mr-2 h-5 w-5' /> Ver pueblos existentes
                    </Button>
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

export default Inicio;