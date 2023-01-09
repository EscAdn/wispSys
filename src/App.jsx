import { Outlet } from "react-router-dom";
import { LateralMenu } from "./conponents/LateralMenu/LateralMenu";

function App() {
  return (
    <>
      <LateralMenu />
      <section className="contenido">
        <Outlet />
      </section>
    </>
  );
}

export default App;
