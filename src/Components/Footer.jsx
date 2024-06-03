import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <section>
        <p className="footer">
          all rights reserved. all laws applicable. for entertainment purposes
          only. copyright Cherry Stone Studios 2024.
        </p>
        <div className="footer">
          <Link className="registerlinks" to={"/terms"}>
            Terms of Use
          </Link>
          &&
          <Link className="registerlinks" to={"/privacy"}>
            Privacy Policy
          </Link>
        </div>
      </section>
    </>
  );
}
