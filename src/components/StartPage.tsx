import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";

export function StartPage() {
  const dispatch = useDispatch();

  return (
    <div className="page-content" id="StartPage">
      <nav className="navbar bg-dark">
        <div style={{ display: "flex", alignItems: "center",justifyContent: "space-between", width: "100%" }}>
          {/*Logo links */}
          <div style={{ flex: "0 0 auto" }}>
            <img
              src="/logo-bht/BHT-Logo-Varianten/BHT_Logos_SVG/BHT_Logo_horizontal_Negativ.svg"
              alt="logo-bht"
              style={{ height: "50px" }}
            />
          </div>
          {/* Text mitte */}
          <div
            style={{
              color: "lightgrey",
              flex: "1 1 auto",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            Deine Start Seite
          </div>
          {/* Button rechts */}
          <div style={{flex: "0 0 auto"}}>
            <button
              id="LogoutButton"
              className="btn btn-outline-primary button-standard d-flex align-items-center justify-content-center gap-2"
              style={{borderColor: "lightgrey", color: "lightgrey", fontSize: "0.8rem", width: "150px"}}
              onClick={() => dispatch(logout())}
            >
              <i className="bi bi-arrow-bar-right"></i>Abmelden
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
