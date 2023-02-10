import { Outlet } from "react-router-dom";
import Container from "./components/extras/Container";
import { LateralMenu } from "./components/LateralMenu/LateralMenu";

function App() {
  return (
    <>
      <LateralMenu />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
