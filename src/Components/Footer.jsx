import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <section>
        <p className="footer">
          all rights reserved. all laws applicable. for entertainment purposes
          only. copyright Cherry Stone Studios 2024.
        </p>
        <Link className="registerlinks" to={"/terms"}>
          Terms of Use
        </Link>
        and
        <Link className="registerlinks" to={"/privacy"}>
          Privacy Policy
        </Link>
      </section>
    </>
  );
}
