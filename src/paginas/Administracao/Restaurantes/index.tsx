import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import api from "../../../services";

const AdminRestaurante = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    api
      .get("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data))
      .catch((error) => console.log(error));
  }, []);

  const excluir = (restauranteParaSerExcluido: IRestaurante) => {
    api.delete(`restaurantes/${restauranteParaSerExcluido.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteParaSerExcluido.id
      );
      setRestaurantes([...listaRestaurante]);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
            <TableCell>
              [<Link to={`/admin/restaurantes/novo`}>Criar</Link>]
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>

              <TableCell>
                [
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminRestaurante;
