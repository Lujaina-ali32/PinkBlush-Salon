import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./App.css";

const heroSlides = [
  "https://i.pinimg.com/1200x/d3/23/ab/d323ab6b0e18c0f4133c867415752c9f.jpg",
  "https://i.pinimg.com/736x/98/3b/f2/983bf2fbc2242a22db862a284ecf7311.jpg",
  "https://i.pinimg.com/736x/d5/f7/c4/d5f7c478fa44167e058ab7348d5bc00d.jpg",
];

const servicesData = {
  Makeup: [
    { title: "Bridal Makeup", price: "Rs 25,000", img: "https://i.pinimg.com/736x/f6/7d/7e/f67d7ee73ebde9411fae75d9f08efa14.jpg" },
    { title: "Party Makeup", price: "Rs 8,000", img: "https://i.pinimg.com/736x/49/38/ef/4938efd7ced4bac00bb6aa478b414dcc.jpg" },
    { title: "HD Makeup", price: "Rs 12,000", img: "https://i.pinimg.com/736x/7b/2b/9d/7b2b9d9a5a70be9faf4563b1b91278de.jpg" },
    { title: "Airbrush Makeup", price: "Rs 18,000", img: "https://i.pinimg.com/736x/9a/82/2b/9a822b432ae3e8e9684b77e3a47e7456.jpg" },
    { title: "Engagement Makeup", price: "Rs 15,000", img: "https://i.pinimg.com/736x/fb/c7/38/fbc7380c039e24f410c5288c52bc64b9.jpg" },
    { title: "Walima Makeup", price: "Rs 20,000", img: "https://i.pinimg.com/736x/4d/d4/91/4dd49193c4720efe651ebeb5d5c158ee.jpg" },
    { title: "Nikkah Makeup", price: "Rs 14,000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9SsGxrKEIjzmrf9YVHGHOpQ6e19T7m9tGV6x_IJ70EK1QysW0L3Zns2JoN19gUd8_PQ&usqp=CAU" },
    { title: "Reception Glam", price: "Rs 22,000", img: "https://i.pinimg.com/736x/15/8d/6e/158d6e58b71f22a237e2f47542fccbf3.jpg" },
  ],

  Hair: [
    { title: "Hair Cut", price: "Rs 1,500", img: "https://i.pinimg.com/736x/36/34/65/363465309f06503bea07436a701ea8d8.jpg" },
    { title: "Hair Color", price: "Rs 6,000", img: "https://i.pinimg.com/736x/5a/8a/54/5a8a540fd811b70306b4fcbc84b09d6d.jpg" },
    { title: "Keratin", price: "Rs 12,000", img: "https://i.pinimg.com/1200x/6a/84/b6/6a84b6a99d68780b8ec653e8a5e0b57e.jpg" },
    { title: "Hair Spa", price: "Rs 5,000", img: "https://i.pinimg.com/1200x/33/5d/60/335d60b4559e4623f2406bc3b0e30ffd.jpg" },
    { title: "Rebonding", price: "Rs 14,000", img: "https://i.pinimg.com/1200x/e1/cc/26/e1cc267c82b85ea3078d56f1c3d11c81.jpg" },
    { title: "Hair Styling", price: "Rs 2,500", img: "https://i.pinimg.com/736x/b6/e4/e0/b6e4e0029512140a6e7732cbad7112bd.jpg" },
    { title: "Curls & Waves", price: "Rs 3,000", img: "https://i.pinimg.com/1200x/23/c3/c0/23c3c038dab40932bad6dd001601edc5.jpg" },
    { title: "Blow Dry", price: "Rs 1,200", img: "https://i.pinimg.com/736x/97/68/5a/97685a8ce1bf46c5894c07d73fece35d.jpg" },
  ],

  Facial: [
    { title: "Hydra Facial", price: "Rs 7,000", img: "https://i.pinimg.com/736x/13/90/c7/1390c730eef36b9fa0891fc74d9bdd6d.jpg" },
    { title: "Gold Facial", price: "Rs 4,000", img: "https://i.pinimg.com/736x/21/f6/ab/21f6ab8003e3710d6b45879d95a09dab.jpg" },
    { title: "Acne Facial", price: "Rs 6,000", img: "https://i.pinimg.com/1200x/65/db/2b/65db2b2e5f99d0324b01e8d036bd59cb.jpg" },
    { title: "Anti Aging", price: "Rs 8,500", img: "https://i.pinimg.com/1200x/d7/bc/43/d7bc43351c2fddb780f70a33601e927e.jpg" },
    { title: "Whitening Facial", price: "Rs 5,000", img: "https://i.pinimg.com/736x/9d/42/e8/9d42e893d4acd94319ff6a5809c12623.jpg" },
    { title: "Vitamin C Facial", price: "Rs 6,500", img: "https://i.pinimg.com/736x/32/c6/18/32c61824e84ba980590f2dfd292e84f6.jpg" },
    { title: "Oxygen Facial", price: "Rs 7,500", img: "https://i.pinimg.com/736x/09/43/5e/09435edc294d5d4432119ae3ebad1270.jpg" },
    { title: "Diamond Facial", price: "Rs 9,000", img: "https://i.pinimg.com/736x/85/18/85/851885279d42708a741e801501dd175d.jpg" },
  ],

  Spa: [
    { title: "Body Massage", price: "Rs 9,000", img: "https://i.pinimg.com/736x/c5/e1/b0/c5e1b01192436b81f5044a5f2de4d6a4.jpg" },
    { title: "Steam Spa", price: "Rs 8,000", img: "https://i.pinimg.com/736x/c1/50/3d/c1503d20d74e5f18a75a7b2ccf448500.jpg" },
    { title: "Hot Stone", price: "Rs 12,000", img: "https://i.pinimg.com/1200x/80/ab/6f/80ab6fdd2d6a20779fc5c16cdd593e6d.jpg" },
    { title: "Aroma Therapy", price: "Rs 11,000", img: "https://i.pinimg.com/736x/c9/87/47/c9874706927477017ed01efb97fd4354.jpg" },
    { title: "Relaxation Spa", price: "Rs 10,000", img: "https://i.pinimg.com/736x/17/cb/1d/17cb1d5c812f3a9afb11b15bb2b7c74d.jpg" },
    { title: "Foot Reflexology", price: "Rs 6,000", img: "https://i.pinimg.com/1200x/e8/53/f7/e853f719c51044a7e18260f6dc7bd23e.jpg" },
    { title: "Couple Spa", price: "Rs 18,000", img: "https://i.pinimg.com/736x/79/04/4e/79044e4ba5a14e16dfb7cd92b8219778.jpg" },
    { title: "Luxury Spa", price: "Rs 20,000", img: "https://i.pinimg.com/736x/9f/88/01/9f880100ad711d2173157e9c9452ec19.jpg" },
  ],

  Nails: [
    { title: "Manicure", price: "Rs 2,000", img: "https://i.pinimg.com/1200x/ad/d7/ee/add7ee9831c607781783a0208e046dae.jpg" },
    { title: "Pedicure", price: "Rs 2,500", img: "https://i.pinimg.com/1200x/9b/c4/3c/9bc43cc9bcb556b5a715bafac3c504a3.jpg" },
    { title: "Gel Nails", price: "Rs 4,000", img: "https://i.pinimg.com/1200x/69/32/16/693216a63f60bf59c08df85c67d6c37e.jpg" },
    { title: "French Tips", price: "Rs 3,000", img: "https://i.pinimg.com/736x/6a/03/9d/6a039da4072f196416e3c9255cd742be.jpg" },
    { title: "Nail Art", price: "Rs 3,500", img: "https://i.pinimg.com/736x/ff/ad/7f/ffad7f90385b9e4b57a7be83a64e35c4.jpg" },
    { title: "Chrome Nails", price: "Rs 4,500", img: "https://i.pinimg.com/736x/94/69/dd/9469ddf0ea3ec3ba6ba8241e5cded06c.jpg" },
    { title: "Acrylic Nails", price: "Rs 5,000", img: "https://i.pinimg.com/736x/75/0b/72/750b72be81ca4a8f9000838f7181437b.jpg" },
    { title: "Luxury Nails", price: "Rs 6,000", img: "https://i.pinimg.com/736x/5a/7a/c9/5a7ac968f1bfa14284d5a39318278ae0.jpg" },
  ],

  Bridal: [
    { title: "Complete Bridal Package", price: "Rs 80,000", img: "https://i.pinimg.com/1200x/04/8c/87/048c879d37a97c05da8e38a8d9a9a633.jpg" },
    { title: "Mehndi Look", price: "Rs 20,000", img: "https://i.pinimg.com/736x/12/cc/45/12cc451a551410b5737b0c278837dde0.jpg" },
    { title: "Nikkah Look", price: "Rs 25,000", img: "https://i.pinimg.com/736x/4b/da/f4/4bdaf4e90b6f7cc1863e0388f3259048.jpg" },
    { title: "Walima Look", price: "Rs 30,000", img: "https://i.pinimg.com/736x/a9/c2/64/a9c2646f90225d8c4b4bd1dc4c5832a8.jpg" },
    { title: "Hair + Makeup", price: "Rs 18,000", img: "https://i.pinimg.com/736x/27/2d/be/272dbeae8ca0e7c55d8abb8b987d8abf.jpg" },
    { title: "Bridal Facial", price: "Rs 10,000", img: "https://i.pinimg.com/736x/88/3e/89/883e890314f51535997437ec4ce8bccd.jpg" },
    { title: "Bridal Spa", price: "Rs 15,000", img: "https://i.pinimg.com/736x/3d/47/f2/3d47f259287b272f9aaf1b18c6f8b065.jpg" },
    { title: "Full Glam Bride", price: "Rs 40,000", img: "https://i.pinimg.com/1200x/23/d1/c5/23d1c5db9ac07027a0cc433a9577dc22.jpg" },
  ],
};



export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");
  const heroBoxRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (heroBoxRef.current) {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) * 0.02;
      const y = (e.clientY - innerHeight / 2) * 0.02;
      heroBoxRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const bookNow = (service) => {
    Swal.fire({
      title: "Appointment Booked 💖",
      text: `${service} appointment confirmed`,
      icon: "success",
      confirmButtonColor: "#ff5fa2",
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Thank You 💌",
      text: "We will contact you soon",
      icon: "success",
      confirmButtonColor: "#ff5fa2",
    });
    e.target.reset();
  };

  const filter = (text) => text.toLowerCase().includes(search.toLowerCase());
  return (
    <>

    <div className="offer-bar">
  <div className="offer-text">
    💖 Flat 20% OFF on Bridal Packages • Limited Time Offer • Book Now ✨
  </div>
</div>


      {/* nav */}
<nav className="navbar">
  <div className="logo">PinkBlush Salon</div>

  <ul className="menu">
    <li><a href="#about">About</a></li>
    {Object.keys(servicesData).map(cat => (
      <li key={cat}><a href={`#${cat}`}>{cat}</a></li>
    ))}
    <li><a href="#contact">Contact</a></li>
  </ul>

  <div className="search-container">
    <input
      className="nav-search"
      placeholder="Search services..."
      onChange={(e) => setSearch(e.target.value)}
    />
    <span className="search-icon">🔍</span>
  </div>
</nav>



      {/* hero */}
    <header
      className="hero"
      style={{ backgroundImage: `url(${heroSlides[currentSlide]})` }}
      onMouseMove={handleMouseMove}
    >
      <div className="hero-overlay"></div>

      <div className="hero-box" ref={heroBoxRef}>
        <h1 className="hero-title">
          <span className="line1">Luxury</span>
          <span className="line2">Beauty Salon</span>
        </h1>
        <p className="hero-subtitle">
          Transform your look. Elevate your confidence.
        </p>
        <button className="hero-btn" onClick={() => bookNow("Salon Service")}>
          Book Now ✨
        </button>
        <div className="hero-sparkles">
          {[...Array(5)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
      </div>
    </header>

{/* about  */}
<section id="about" className="about-premium">
  <div className="about-container">

    {/* Floating sparkles behind */}
    <div className="sparkle" style={{top:'20%', left:'5%'}}></div>
    <div className="sparkle" style={{top:'60%', right:'10%'}}></div>

    {/* IMAGE */}
    <div className="about-img">
      <img src="https://i.pinimg.com/736x/43/76/16/43761608fe0116776a3b273f7214511a.jpg" />
      <div className="img-glow"></div>
    </div>

    {/* CONTENT – slightly staggered */}
    <div className="about-content">
      <span className="about-tag">Since 2014</span>
      <h2>
        Where <span className="highlight">Luxury</span> <br />
        Meets <span className="highlight">Elegance</span>
      </h2>
      <p>
        PinkBlush Salon offers an exclusive experience with expert artists and premium products. 
        Every detail is designed to make you shine and feel extraordinary.
      </p>

      <div className="about-features">
        <div className="feature-card">💎 Expert Artists</div>
        <div className="feature-card">✨ Luxury Products</div>
        <div className="feature-card">🌸 Personalized Care</div>
        <div className="feature-card">🏆 Trusted Salon</div>
      </div>
    </div>

  </div>
</section>





      {/* service */}
<section className="luxury-services">
  {Object.keys(servicesData).map((category) => {
    const filteredServices = servicesData[category].filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredServices.length === 0) return null;

    return (
      <div
        key={category}
        id={category}
        className="luxury-section"
      >
        <h2 className="luxury-title">{category}</h2>

        <div className="luxury-grid">
          {filteredServices.map((item, i) => (
            <div className="lux-card" key={i}>
              <img src={item.img} alt={item.title} />

              <div className="lux-overlay">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
                <button onClick={() => bookNow(item.title)}>
                  Book Now ✨
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  })}
</section>

 

 {/* why  */}
<section className="why-us">
  <h2 className="why-title">Why Choose PinkBlush?</h2>

  <div className="why-grid">
    <div className="why-card">
      <div className="icon">💎</div>
      <h3>Luxury Experience</h3>
      <p>Indulge in a lavish, pampering journey with every visit.</p>
    </div>
    <div className="why-card">
      <div className="icon">🧼</div>
      <h3>Hygienic Environment</h3>
      <p>We maintain spotless cleanliness for your safety and comfort.</p>
    </div>
    <div className="why-card">
      <div className="icon">👩‍🎓</div>
      <h3>Expert Staff</h3>
      <p>Our certified professionals provide top-notch services every time.</p>
    </div>
    <div className="why-card">
      <div className="icon">💖</div>
      <h3>Affordable Packages</h3>
      <p>Premium care without breaking the bank—value meets luxury.</p>
    </div>
  </div>
</section>



      {/* form */}
<section className="contact-wow" id="contact">
  <div className="contact-wrap">

    <form className="wow-form" onSubmit={submitForm}>
      <h2>Get In Touch</h2>
      <p className="form-sub">We’d love to hear from you ✨</p>

      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email Address" required />
      <textarea rows="4" placeholder="Tell us what you need..." required />

      <button type="submit">
        Send Message
        <span>→</span>
      </button>
    </form>

    <div className="wow-content">
      <span className="badge">PinkBlush Salon</span>
      <h3>
        Because You Deserve <br /> Pure Elegance
      </h3>

      <p>
        Experience beauty crafted with passion, precision,
        and premium care. Let us elevate your confidence.
      </p>

      <div className="features">
        <div>💎 Personalized Experience</div>
        <div>💎 Premium Products</div>
        <div>💎 Trusted Beauty Experts</div>
      </div>
    </div>

  </div>
</section>


      {/* footer  */}
<footer className="lux-footer">
  <div className="footer-inner">
 
  
    <div className="footer-brand">
      <h3>PinkBlush Salon</h3>
      <p>Luxury • Beauty • Confidence</p>
    </div>

    <ul className="footer-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#book">Book Now</a></li>
    </ul>

    
    <div className="footer-social">
  <span>Follow Me</span>

  <div className="icons">
    <a
      href="https://www.linkedin.com/in/lujaina-ali-962231307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i>IN</i>
    </a>

    <a
      href="https://www.linkedin.com/in/lujaina-ali-962231307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i>IG</i>
    </a>

    <a
      href="https://www.linkedin.com/in/lujaina-ali-962231307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i>WA</i>
    </a>
  </div>
</div>


  </div>

  <div className="footer-bottom">
    © 2026 PinkBlush Salon — Crafted with Elegance ✨
  </div>
</footer>


    </>
  );
}