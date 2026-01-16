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
    { title: "Party Makeup", price: "Rs 8,000", img: "https://i.pinimg.com/736x/cb/41/9e/cb419e3ad5a9c9db8df7c44cf7416df6.jpg" },
    { title: "Glam Makeup", price: "Rs 10,000", img: "https://i.pinimg.com/736x/63/36/11/63361160a1d16fe64a3022a6d32c6f6f.jpg" },
  ],
  Hair: [
    { title: "Hair Cut", price: "Rs 1,500", img: "https://i.pinimg.com/736x/d2/c1/aa/d2c1aae41927dc1554970a8eb2a5a175.jpg" },
    { title: "Hair Color", price: "Rs 6,000", img: "https://i.pinimg.com/736x/dc/39/60/dc3960f464264971aeed368c19cad954.jpg" },
    { title: "Keratin Treatment", price: "Rs 12,000", img: "https://i.pinimg.com/736x/cd/44/08/cd44085795290f52d97fb1aac65f007b.jpg" },
    { title: "Hair Styling", price: "Rs 2,500", img: "https://i.pinimg.com/1200x/01/fe/e3/01fee3e68e864bab8dc056d831a6c1eb.jpg" },
  ],
  Spa: [
    { title: "Body Massage", price: "Rs 9,000", img: "https://i.pinimg.com/736x/bb/4f/14/bb4f14b2a54b5df40aaf29964618faf0.jpg" },
    { title: "Aromatherapy", price: "Rs 11,000", img: "https://i.pinimg.com/1200x/a7/cc/c6/a7ccc6099cb8728bc803cd03460fd082.jpg" },
    { title: "Steam Spa", price: "Rs 8,000", img: "https://i.pinimg.com/736x/0f/6a/0f/0f6a0fe478ca3724b12455e01d6dd7a2.jpg" },
    { title: "Hot Stone Massage", price: "Rs 12,000", img: "https://i.pinimg.com/736x/74/83/df/7483dfd0eda211e48cbe4aa884e03bd4.jpg" },
  ],
  Facial: [
    { title: "Hydra Facial", price: "Rs 7,000", img: "https://i.pinimg.com/736x/13/90/c7/1390c730eef36b9fa0891fc74d9bdd6d.jpg" },
    { title: "Gold Facial", price: "Rs 4,000", img: "https://i.pinimg.com/736x/21/f6/ab/21f6ab8003e3710d6b45879d95a09dab.jpg" },
    { title: "Acne Treatment", price: "Rs 6,000", img: "https://i.pinimg.com/736x/12/95/15/129515f3896c9eccdd344cf38f854dbd.jpg" },
    { title: "Anti-aging Facial", price: "Rs 8,500", img: "https://i.pinimg.com/736x/69/34/ec/6934ec72b838109add8995985c2257a1.jpg" },
  ],
  Nails: [
    { title: "Manicure", price: "Rs 2,000", img: "https://i.pinimg.com/736x/46/90/e0/4690e0713fa57e135e78646a8f178d5f.jpg" },
    { title: "Pedicure", price: "Rs 2,500", img: "https://i.pinimg.com/736x/4c/c6/28/4cc62899254a757aa59f7c9898be8f14.jpg" },
    { title: "Nail Art", price: "Rs 3,500", img: "https://i.pinimg.com/736x/81/d3/65/81d3658c3c61a2e57298e6d20bf5e357.jpg" },
    { title: "Gel Nails", price: "Rs 4,000", img: "https://i.pinimg.com/736x/98/b7/89/98b78928676324ae3dbf2c2cab2c8b3b.jpg" },
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
      {/* nav */}
<nav className="navbar">
  <div className="logo">PinkBlush Salon</div>
  
  <ul className="menu">
    {Object.keys(servicesData).map((cat) => (
      <li key={cat}>{cat}</li>
    ))}
    <li>Contact</li>
  </ul>

  <div className="search-container">
    <input
      type="text"
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


      {/* service */}
<section className="luxury-services">
{Object.keys(servicesData).map((category) => {
  const filteredServices = servicesData[category].filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  if (filteredServices.length === 0) return null;

  return (
    <div key={category} className="luxury-section">
      <h2 className="luxury-title">{category}</h2>

      <div className="luxury-grid">
        {filteredServices.map((item, i) => (
          <div className="lux-card" key={i}>
            <img src={item.img} alt={item.title} />

            <div className="lux-overlay">
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <button onClick={() => bookNow(item.title)}>Book Now ✨</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
})}

</section>


      {/* form */}
<section className="contact-wow">
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
