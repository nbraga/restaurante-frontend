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
import IPratos from "../../../interfaces/IPrato";
import ITag from "../../../interfaces/ITag";
import api from "../../../services";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPratos = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const parametros = useParams();

  useEffect(() => {
    api
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    api
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  useEffect(() => {
    if (parametros.id) {
      api
        .get<IPratos>(`pratos/${parametros.id}/`)
        .then((resposta) => setNome(resposta.data.nome));
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      api
        .put(`pratos/${parametros.id}/`, {
          nome: nome,
        })
        .then(() => {
          alert("Prato atualizado");
        });
    } else {
      api
        .post("pratos/", {
          nome: nome,
        })
        .then(() => {
          alert("Prato cadastrado");
        });
    }
  };

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
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
              Formulário de Pratos
            </Typography>
            <Box component="form" onSubmit={aoSubmeterForm}>
              <TextField
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                label="Nome"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />
              <TextField
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                label="Descricao"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tipo</InputLabel>
                <Select
                  labelId="select-tag"
                  id="demo-simple-select"
                  value={tag}
                  label="Tipo"
                  onChange={(e) => setTag(e.target.value)}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tipo</InputLabel>
                <Select
                  labelId="select-tag"
                  id="demo-simple-select"
                  value={restaurante}
                  label="Restaurante"
                  onChange={(e) => setRestaurante(e.target.value)}
                >
                  {restaurantes.map((restaurante) => (
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionarArquivo} />

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

export default FormularioPratos;
