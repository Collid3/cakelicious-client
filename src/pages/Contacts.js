import React, { useContext, useEffect, useRef, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { SiGooglemessages } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../Context/DataContext";

const Contacts = () => {
  const messageSubjectRef = useRef("");
  const messageRef = useRef("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const { apiWithCred } = useContext(DataContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      messageSubjectRef?.current.value === "" ||
      messageRef?.current.value === ""
    ) {
      return setResponseMessage(
        "Fill out all the email and message fields before you submit"
      );
    }

    // send an email
    try {
      const response = await apiWithCred.post("/sendemail", {
        messageSubject: messageSubjectRef.current.value,
        message: messageRef.current.value,
      });

      console.log(response);

      messageSubjectRef.current.value = "";
      messageRef.current.value = "";
      return setResponseMessage("Message succefully sent");
    } catch (err) {
      console.log(err.message);
      // eslint-disable-next-line default-case
      switch (err.message) {
        case "Request failed with status code 403":
          setResponseMessage("You need to login to send a message");
          break;
      }
    }
  }

  return (
    <div className="Contacts-container">
      <div className="corner-button">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      <div>
        <section className="physical-address-container">
          <div>
            <GoLocation />

            <h3>Address</h3>
          </div>

          <address>
            <p>Xxxxxxxxxxxx xxxx</p>
            <p>xxxxxx</p>
            <p>xxxx</p>
          </address>
        </section>

        <section className="phone-container">
          <div>
            <FaPhoneAlt />

            <h3>Phone</h3>
          </div>

          <article className="phone-numbers">
            <p>012 3456 7890</p>
            <p>012 345 56788</p>
          </article>
        </section>

        <section className="socials-container">
          <div>
            <SiGooglemessages />

            <h3>Socials</h3>
          </div>

          <article className="socials">
            <p>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookSquare />
              </a>

              <span>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  cakelicious-sa
                </a>
              </span>
            </p>

            <p>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>

              <span>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @cakelicious-sa
                </a>
              </span>
            </p>

            <p>
              <a href="https://wa.me/" target="_blank" rel="noreferrer">
                <IoLogoWhatsapp />
              </a>

              <span>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  012 345 6789
                </a>
              </span>
            </p>
          </article>
        </section>
      </div>

      <section>
        <form
          className="contact-form-container"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2>Contact Us</h2>

          <p
            className={`${responseMessage.includes("sent") && "success"} ${
              responseMessage === "" && "invinsible"
            }`}
          >
            {responseMessage === "You need to login to send a message" ? (
              <>
                You need to login to send a message{" "}
                <span>
                  <Link to="/signin">Signin</Link>
                </span>
              </>
            ) : (
              responseMessage
            )}
          </p>

          <input
            type="text"
            placeholder="Subject"
            ref={messageSubjectRef}
            onChange={() => setResponseMessage("")}
            spellCheck="false"
            required
          />

          <textarea
            cols="30"
            rows="8"
            placeholder="Write your Message"
            ref={messageRef}
            onChange={() => setResponseMessage("")}
            spellCheck="false"
            required
          />

          <input type="file" name="" id="" />

          <button type="submit">Submit</button>
        </form>

        <div className="open-hours">
          <h3>Open Hours</h3>

          <ul>
            <li>
              Mon-Thur: <i>9am-5pm</i>
            </li>

            <li>
              Friday: <i>9am-3pm</i>
            </li>

            <li>
              Sat-Sun: <i>closed</i>
            </li>

            <li>
              Public holidays: <i>closed</i>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
