import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";
import api from "../../../../services";

const FormularioRestaurante = () => {
  const [nome, setNome] = useState("");

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      api
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNome(resposta.data.nome));
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      api
        .put(`restaurantes/${parametros.id}/`, {
          nome: nome,
        })
        .then(() => {
          alert("Restaurante atualizado");
        });
    } else {
      api
        .post("restaurantes/", {
          nome: nome,
        })
        .then(() => {
          alert("Restaurante cadastrado");
        });
    }
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography component="h1" variant="h6">
              Formulário de Restaurantes
            </Typography>
            <Box component="form" onSubmit={aoSubmeterForm}>
              <TextField
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                label="Nome"
                variant="standard"
                fullWidth
                required
              />
              <Button sx={{ mt: 2 }} fullWidth type="submit" variant="outlined">
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FormularioRestaurante;
