import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdminRestaurante from "./paginas/Administracao/Restaurantes";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";
import AdminPratos from "./paginas/Administracao/Pratos/AdministracaoPratos";
import FormularioPratos from "./paginas/Administracao/Pratos/FormularioPratos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdminRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdminPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
      </Route>
    </Routes>
  );
}

export default App;
