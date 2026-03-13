import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useSpring, animated } from "@react-spring/web";
import "./Contact.css";

const Contact = () => {

const formRef = useRef();

const [formData,setFormData] = useState({
name:"",
email:"",
subject:"",
message:""
});

const [isSubmitting,setIsSubmitting] = useState(false);
const [submitStatus,setSubmitStatus] = useState("");
const [visible,setVisible] = useState(false);


/* detect scroll */

useEffect(()=>{

const observer = new IntersectionObserver(
([entry])=>{
if(entry.isIntersecting){
setVisible(true);
}
},
{threshold:0.2}
);

const section = document.getElementById("contact");

if(section){
observer.observe(section);
}

return ()=> observer.disconnect();

},[]);


/* input */

const handleChange = (e)=>{
const {name,value} = e.target;

setFormData(prev=>({
...prev,
[name]:value
}));
};


/* send email */

const sendEmail = (e)=>{

e.preventDefault();

setIsSubmitting(true);
setSubmitStatus("");

emailjs.sendForm(
"YOUR_SERVICE_ID",
"YOUR_TEMPLATE_ID",
formRef.current,
"YOUR_PUBLIC_KEY"
)

.then(()=>{
setSubmitStatus("success");

setFormData({
name:"",
email:"",
subject:"",
message:""
});
})

.catch(()=>{
setSubmitStatus("error");
})

.finally(()=>{
setIsSubmitting(false);
});

};


/* animations */

const titleAnim = useSpring({
opacity:visible ? 1 : 0,
transform:visible ? "translateY(0)" : "translateY(40px)",
delay:200
});

const formAnim = useSpring({
opacity:visible ? 1 : 0,
transform:visible ? "translateY(0)" : "translateY(60px)",
delay:400
});

const infoAnim = useSpring({
opacity:visible ? 1 : 0,
transform:visible ? "translateX(0)" : "translateX(-60px)",
delay:500
});


return(

<section id="contact" className="contact-section">

<div className="container">


{/* HEADER */}

<animated.div style={titleAnim} className="contact-header">

<h2 className="section-title">
<span className="gradient-text">Get In Touch</span>
</h2>

<p className="section-subtitle">
Have a project in mind? Let's build something amazing together.
</p>

</animated.div>


<div className="contact-main">


{/* CONTACT INFO */}

<animated.div style={infoAnim} className="contact-info">

<div className="info-card">

<h3 className="info-title">Contact Info</h3>

<div className="info-items">

<div className="info-item">
<div className="info-icon">📧</div>
<div>
<h4>Email</h4>
<a href="mailto:arshiasheikh303@gmail.com" className="info-link">
arshiasheikh303@gmail.com
</a>
</div>
</div>

<div className="info-item">
<div className="info-icon">💬</div>
<div>
<h4>Discord</h4>
<span className="info-text">Arshia</span>
</div>
</div>

<div className="info-item">
<div className="info-icon">📍</div>
<div>
<h4>Location</h4>
<span className="info-text">Geeky Beast/Geeky Verse</span>
</div>
</div>

</div>

</div>

</animated.div>


{/* CONTACT FORM */}

<animated.div style={formAnim} className="contact-form-container">

<div className="form-card">

<h3 className="form-title">Send Message</h3>

<form ref={formRef} onSubmit={sendEmail} className="contact-form">


<div className="form-group">
<input
type="text"
name="name"
placeholder="Your Name"
value={formData.name}
onChange={handleChange}
required
className="form-input"
/>
<span className="input-border"></span>
</div>


<div className="form-group">
<input
type="email"
name="email"
placeholder="Your Email"
value={formData.email}
onChange={handleChange}
required
className="form-input"
/>
<span className="input-border"></span>
</div>


<div className="form-group">
<input
type="text"
name="subject"
placeholder="Subject"
value={formData.subject}
onChange={handleChange}
required
className="form-input"
/>
<span className="input-border"></span>
</div>


<div className="form-group">
<textarea
name="message"
placeholder="Your Message"
rows="5"
value={formData.message}
onChange={handleChange}
required
className="form-textarea"
/>
<span className="textarea-border"></span>
</div>


<button
type="submit"
className="submit-btn"
disabled={isSubmitting}
>

{isSubmitting ? (
<>
<span className="spinner"></span>
Sending...
</>
):(
"Send Message"
)}

</button>

</form>


{submitStatus==="success" && (
<div className="submit-status success">
Message Sent Successfully 🚀
</div>
)}

{submitStatus==="error" && (
<div className="submit-status error">
Something went wrong ❌
</div>
)}

</div>

</animated.div>

</div>

</div>

</section>

);

};

export default Contact;