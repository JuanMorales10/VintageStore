// import React from 'react';
// import './Collections.css'; // Asumiendo que el CSS para Collections está en Collections.css

// const Collections = () => {
//   return (
//     <section id="collection">
//       <div className="collections container">
//         <div className="content">
//           <img src="https://i.postimg.cc/Xqmwr12c/clothing.webp" alt="Clothing" />
//           <div className="img-content">
//             <p>Clothing Collections</p>
//             <button><a href="#sellers">SHOP NOW</a></button>
//           </div>
//         </div>
//         <div className="content2">
//           <img src="https://i.postimg.cc/8CmBZH5N/shoes.webp" alt="Shoes" />
//           <div className="img-content2">
//             <p>Shoes Spring</p>
//             <button><a href="#sellers">SHOP NOW</a></button>
//           </div>
//         </div>
//         <div className="content3">
//           <img src="https://i.postimg.cc/MHv7KJYp/access.webp" alt="Accessories" />
//           <div className="img-content3">
//             <p>Accessories</p>
//             <button><a href="#sellers">SHOP NOW</a></button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Collections;

import React from 'react';
import { Link } from 'react-router-dom';
import './Collections.css';
import accesorios from '../../assets/accesoriosv.jpg'
import zapatosv from '../../assets/zapatosv.jpg'
import ropa2 from '../../assets/ropav2.jpg'

const Collections = () => {
  return (
    <section id="collection" className="collections container">
      <div className="content">
        <img src={ropa2} alt="Clothing" />
        <div className="img-content">
          <p>Clothing Colección</p>
          {/* Supongamos que el ID de la categoría de ropa es 1 */}
          <Link to="/coleccion" className="but">SHOP NOW</Link>
        </div>
      </div>
      <div className="content">
        <img src={zapatosv} alt="Shoes" />
        <div className="img-content">
          <p>Zapatos</p>
          {/* Supongamos que el ID de la categoría de zapatos es 2 */}
          <Link to="/categoria/9" className="but">SHOP NOW</Link>
        </div>
      </div>
      <div className="content">
        <img src={accesorios} alt="Accessories" />
        <div className="img-content">
          <p>Accessories</p>
          {/* Supongamos que el ID de la categoría de accesorios es 3 */}
          <Link to="/categoria/10" className="but">SHOP NOW</Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;
