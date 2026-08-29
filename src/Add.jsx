import { useState } from 'react';

export default function AddContact({ onAdd }) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const agregar = () => {
        const nuevoContacto = {
            id: Date.now(),
            nombre: nombre,
            telefono: telefono
        };

        onAdd(nuevoContacto);

        setNombre('');
        setTelefono('');
    }

    return (<>
        <input
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
        />
        <input
            placeholder="Teléfono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
        />
        <button onClick={() => agregar()}>
            Agregar
        </button>
    </>);
}


