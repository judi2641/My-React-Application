import { useState } from "react";
import { LoginDialog } from "./LoginDialog";

export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="page-content" id="LandingPage">
      <nav className="navbar navbar-light">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 1rem"
          }}
        >
          {/* Linke Seite: Logo */}
          <div style={{ flex: "0 0 auto" }}>
            <img
              src="/logo-bht/BHT-Logo-Varianten/BHT_Logos_SVG/BHT_Logo_horizontal_Anthrazit.svg"
              alt="logo-bht"
              style={{ height: "50px" }}
            />
          </div>

          {/* Mitte: Text zentriert */}
          <div
            style={{
              flex: "1 1 auto",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            Willkommen an der Berliner Hochschule für Technik
          </div>

          {/* Rechte Seite: Button */}
          <div style={{ flex: "0 0 auto" }}>
            <button
              id="OpenLoginDialogButton"
              className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
              style={{
                borderColor: "black",
                color: "black",
                fontSize: "0.8rem",
                width: "150px"
              }}
              onClick={() => setShowLogin(true)}
            >
              Anmelden
            </button>
          </div>
        </div>

        {showLogin && <LoginDialog onClose={() => setShowLogin(false)} />}
      </nav>
      <div
        style={{
          padding: "150px",
          boxSizing: "border-box",
          width: "100vw",
          height: "100vh"
        }}
      >
        <img
          src="/Campus__3_.jpg"
          alt="campus-bht"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
    </div>
  )
}
