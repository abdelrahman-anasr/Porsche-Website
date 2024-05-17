import React from 'react';
import './App.css'
import Nav  from './Navbar';
import './css/main.css'
import './css/style.css'
function ContactPage() {

    return (
    <>
        
            <Nav />
            <div className="container10">
                <div className="yellow-container">
                    <div className="social-icons">
                        <h1 className="typed-out">Contact </h1>
                        <h1 className="typed-out">Us</h1>
                        <a href="https://www.instagram.com/porsche/" target="_blank"><img src={require("./images/Instagram.png")} alt="Instagram" width="50" height="50" /></a>
                        <a href="https://www.facebook.com/porsche" target="_blank"><img src={require("./images/facebook.png")} alt="Facebook" width="50" height="50" /></a>
                        <a href="https://linkedin.com/company/porsche-ag" target="_blank"><img src={require("./images/logo2.png")} alt="linkedin" width="50" height="50" /></a>
                    </div>
                    <div className="formContrainerClass">
                        <h3>Contact Form</h3>
                        <form action="#" method="post">
                            <label htmlFor="fname">First Name</label><br />
                            <input type="text" id="fname" name="firstname" placeholder="Your name.." style={{ fontFamily: 'porscheFont' }} /><br />
                            <label htmlFor="lname">Last Name</label><br />
                            <input type="text" id="lname" name="lastname" placeholder="Your last name.." style={{ fontFamily: 'porscheFont' }} /><br />
                            <label htmlFor="subject">Subject</label><br />
                            <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: '100px', fontFamily: 'porscheFont' }}></textarea><br />
                            <button id="myBtn" className="btn btn-primary custom-btn" onClick={() => alert('Submitted Successfully!')}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactPage;