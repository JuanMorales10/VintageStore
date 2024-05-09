import React from 'react';
import './ContactForm.css'; // Asumiendo que el CSS para ContactForm está en ContactForm.css

const ContactForm = () => {
  return (
    <div className="contact-formm">
      <h2>Contactanos</h2>
      <form action="https://formspree.io/f/mrgnjngj" method="POST">
        <input type="text" name="name" placeholder="Tu Nombre" required />
        <input type="email" name="email" placeholder="Tu Email" required />
        <textarea name="message" placeholder="Mensaje" required></textarea>
        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default ContactForm;
