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
import IPrato from "../../../interfaces/IPrato";
import api from "../../../services";

const AdminPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    api
      .get("pratos/")
      .then((resposta) => setPratos(resposta.data))
      .catch((error) => console.log(error));
  }, []);

  const excluir = (pratoParaSerExcluido: IPrato) => {
    api.delete(`pratos/${pratoParaSerExcluido.id}/`).then(() => {
      const listaPrato = pratos.filter(
        (prato) => prato.id !== pratoParaSerExcluido.id
      );
      setPratos([...listaPrato]);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descricao</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.descricao}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  ver mais
                </a>
                ]
              </TableCell>

              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
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

export default AdminPratos;
