import React from 'react'
import "./Footer.css"

function Footer() {
  return (
       <footer className="footer">
           <div className="footer-container">
               <div id='about' className="footer-section about">
                   <h3>About</h3>
                   <p>Welcome to BlogiFy, your go-to source for insightful articles, latest trends, and thought-provoking content across a wide range of topics. At MetaBlog, we are passionate about providing our readers with high-quality, well-researched information that not only informs but also inspires.</p>
                   <br />
                   <p><b>Email:</b> info@blogify.com</p>
                   <p><b>Phone:</b> 7088 5424 8171</p>
               </div>
               <div id='contact' className="footer-section links">
                   <h3>Quick Link</h3>
                   <ul>
                       <li><a href="#">Home</a></li>
                       <li><a href="#">About</a></li>
                       <li><a href="#">Blog</a></li>
                       <li><a href="#">Archived</a></li>
                       <li><a href="#">Author</a></li>
                       <li><a href="#">Contact</a></li>
                   </ul>
               </div>
               <div className="footer-section categories">
                   <h3>Category</h3>
                   <ul>
                       <li><a href="#">Lifestyle</a></li>
                       <li><a href="#">Technology</a></li>
                       <li><a href="#">Travel</a></li>
                       <li><a href="#">Business</a></li>
                       <li><a href="#">Economy</a></li>
                       <li><a href="#">Sports</a></li>
                   </ul>
               </div>
               <div className="footer-section newsletter">
                   <h3>Weekly Newsletter</h3>
                   <p>Get blog articles and offers via email.</p>
                   <form>
                       <input type="email" placeholder="Your Email" required />
                       <button type="submit">Subscribe</button>
                   </form>
               </div>
           </div>
           <div className="footer-bottom">
               <p>&copy; BlogiFy 2024. All Rights Reserved.</p>
               <div className="footer-bottom-links">
                   <a href="#">Terms of Use</a>
                   <a href="#">Privacy Policy</a>
                   <a href="#">Cookie Policy</a>
               </div>
           </div>
       </footer>
   
  )
}

export default Footer