import DeleteContact from "./Delete";

export default function ContactList({ contactos, onDelete }) {
  return (
    <>
      <ul>
        {contactos.map((contacto) => {
          return (
            <DeleteContact
              key={contacto.id}
              contacto={contacto}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    </>
  );
}
