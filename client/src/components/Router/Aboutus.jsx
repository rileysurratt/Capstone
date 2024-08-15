//A small page about us
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Aboutus = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        <b style={{ fontSize: "24px" }}>Get to Know the Developers</b>
      </h2>
      <div className="row">
        {/* Tyler's Card */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="./tyler.jpg" className="card-img-top" alt="Tyler Woyshner" />
            <div className="card-body">
              <h5 className="card-title"><b>Tyler Woyshner</b></h5>
              <p className="card-text">
                <b>Email:</b> tywoysh@gmail.com
                <br />
                <a href="https://www.linkedin.com/in/tyler-woyshner/" target="_blank" rel="noopener noreferrer">
                <b>LinkedIn</b>
                </a>
                <br />
                <b>About Me:</b> I'm an engineer who loves creating and building new things. I'm currently enrolled in FullStack Academy's Web Development Bootcamp to enhance my coding knowledge. In my spare time I enjoy playing & coaching hockey. Feel free to reach out if you'd like to connect!
              </p>
            </div>
          </div>
        </div>

        {/* Riley's Card */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="./riley.jpg" className="card-img-top" alt="Riley Surratt" />
            <div className="card-body">
              <h5 className="card-title"><b>Riley Surratt</b></h5>
              <p className="card-text">
              <b>Email:</b> rileysurratt13@gmail.com
                <br />
                <a href="https://www.linkedin.com/in/rileysurratt/" target="_blank" rel="noopener noreferrer">
                  <b>LinkedIn</b>
                </a>
                <br />
                <b>About Me:</b> Hi all, I'm Riley! I love scrapbooking and trying to get Genius on NYT Spelling Bee game. I'm currently enrolled in Fullstack Academy for Software Engineering and work full time as a barista. Feel free to reach out if you'd like to chat about coding, grab a coffee, or just share your latest Spelling Bee score!
              </p>
            </div>
          </div>
        </div>

        {/* Ken's Card */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="./ken.png" className="card-img-top" alt="Ken Langsdorf" />
            <div className="card-body">
              <h5 className="card-title"><b>Ken Langsdorf</b></h5>
              <p className="card-text">
              <b>Email:</b> kelangsdorf@gmail.com
                <br />
                <a href="https://www.linkedin.com/in/ken-langsdorf-225358a7" target="_blank" rel="noopener noreferrer">
                <b>LinkedIn</b>
                </a>
                <br />
                <b>About Me:</b> Hey y'all, the name is Ken. I'm currently enrolled in Fullstack Academy for Software Engineering. In my free time I play ice hockey, work on passion projects such as cosplay and develop my own websites to challenge myself. I love meeting people, so please reach out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
