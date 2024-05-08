// import React from 'react';
// import './ContactForm.css'; // Asumiendo que el CSS para ContactForm está en ContactForm.css

// const ContactForm = () => {
//   return (
//     <div className="contact-form">
//       <h2>Contact Us</h2>
//       <form action="https://formspree.io/f/xjvlpzka" method="POST">
//         <input type="text" name="name" placeholder="Your Name" required />
//         <input type="email" name="email" placeholder="Your Email" required />
//         <textarea name="message" placeholder="Your Message" required></textarea>
//         <button type="submit">Send Message</button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

import React from 'react';
import './ContactForm.css'; // Asumiendo que el CSS para ContactForm está en ContactForm.css

const ContactForm = () => {
  return (
    <div className="contact-form">
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
