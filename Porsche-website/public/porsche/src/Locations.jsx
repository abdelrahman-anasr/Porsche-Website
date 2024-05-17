import React from 'react';
import './css/main.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Navbar';

const Locations = () => {
  const openNav = () => {
    document.getElementById("sidebar").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("sidebar").style.width = "0";
  };

  const opensecondNav = () => {
    document.getElementById("secondSidebar").style.width = "250px";
  };

  const closeSecondNav = () => {
    document.getElementById("secondSidebar").style.width = "0";
  };

  return (
    <>
    
      <Nav />
      <h3 style={{ fontFamily: 'porscheFont', marginLeft: '20px' }}>Where to find us</h3>
      <hr className="black" />
      <div className="wrapper">
        <div className="location_1">
          <p style={{ fontWeight: 'bold', marginLeft: '40px' }}>
            <span style={{ color: '#B12B28' }}>Porsche Centre Zayed</span><br />
            Capital Business Park - Building #B7 <br />
            26 July Corridor, Sheikh Zayed <br />
            6 October City - Giza 12461 <br />
            Tel: +20 (2) 38512 911<br />
            Email: Info.Porsche@smg.com.eg
          </p>
          <iframe title="Porsche Centre Zayed" style={{ border: 'solid white', marginLeft: '20px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4282353284866!2d31.011063276174063!3d30.024569919510945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585be8e26e6ecf%3A0x86496bed02fea326!2sPorsche%20Centre%20Zayed!5e0!3m2!1sen!2seg!4v1710430521930!5m2!1sen!2seg" width="400" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="location_2">
          <p style={{ fontWeight: 'bold', marginLeft: '40px' }}>
            <span style={{ color: '#B12B28' }}>Porsche Centre Kattameya</span><br />
            5A by the Water Way, Plot 5A North, Choueifat,<br />
            Touristic Zone, New Cairo, 11835, Egypt.<br />
            Tel: (+20) 1272 911 911<br />
            Email: Info.Porsche@smg.com.eg<br /><br />
          </p>
          <iframe title="Porsche Centre Kattameya" style={{ border: 'solid white', marginLeft: '20px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.030752865556!2d31.400417665032823!3d30.009097500645524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d1b7fee9c45%3A0x2c50254e122580b6!2sPorsche%20Centre%20Katameya!5e0!3m2!1sen!2seg!4v1710439103459!5m2!1sen!2seg" width="400" height="300"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="location_3">
          <p style={{ fontWeight: 'bold', marginLeft: '40px' }}>
            <span style={{ color: '#B12B28' }}>Porsche Centre Abu-Rawas</span><br />
            SMG Engineering Automotive Company<br />
            Smart Village Kilo 28 Road Abu-Rawash,<br />
            Giza 12676, Egypt<br />
            Tel: +20 (2) 353 90 911<br />
            Email: Info.Porsche@smg.com.eg
          </p>
          <iframe title="Porsche Centre Abu-Rawas" style={{ border: 'solid white', marginLeft: '20px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.8292014005747!2d31.206277676173908!3d30.013060320055914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847ccd4c322a1%3A0x3501e13b58e1213a!2sPorsche%20Centre%20Abo%20Rawash!5e0!3m2!1sen!2seg!4v1710439568285!5m2!1sen!2seg" width="400" height="300"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <footer className="bg-dark text-center text-white" style={{ marginTop: '200px' }}>
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/checkpoint/828281030927956/?next=https%3A%2F%2Fwww.facebook.com%2Fporsche%2F" role="button"><i className="fa fa-facebook-f"></i></a>
            <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/Porsche" role="button"><i className="fa fa-twitter"></i></a>
            <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/Porsche/" role="button"><i className="fa fa-instagram"></i></a>
          </section>
        </div>
        <div className="d-flex justify-content-center text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <img src="../images/porsche_logo.svg" alt="Porsche™ logo" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
          Porsche © 2024 All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Locations;