import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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

import user from "../../../assets/img/user.png";

const FormularioPratos = () => {
  /*  const [loading, setLoading] = useState(true); */
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

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    api
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNome("")
        setDescricao("")
        setRestaurante("")
        setTag("")
        alert("Prato cadastrado com sucesso!")
      })
      .catch((error) => console.log(error));
  };

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  return (
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
      <Box sx={{ width: "100%" }} component="form" onSubmit={aoSubmeterForm}>
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
            value={tag}
            label="Tipo"
            onChange={(e) => setTag(e.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag-res">Restaurante</InputLabel>
          <Select
            labelId="select-tag-res"
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

        <Stack alignItems="center" spacing={3}>
          {imagem ? (
            <img
              style={{ height: "300px", borderRadius: "50%" }}
              src={URL.createObjectURL(imagem)}
              alt="Foto Prato"
            />
          ) : (
            <img
              style={{ height: "300px", borderRadius: "50%" }}
              src={user}
              alt="Foto Prato"
            />
          )}

          <Button fullWidth variant="contained" component="label">
            Buscar
            <input hidden type="file" onChange={selecionarArquivo} />
          </Button>
        </Stack>
        <Button sx={{ mt: 2 }} fullWidth type="submit" variant="outlined">
          Salvar
        </Button>

        {/*  {loading ? (
                <Button
                  sx={{ mt: 2 }}
                  fullWidth
                  type="submit"
                  variant="outlined"
                >
                  Salvar
                </Button>
              ) : (
                <LoadingButton
                  sx={{ mt: 2 }}
                  loading
                  loadingPosition="start"
                  startIcon={<FaSave />}
                  variant="outlined"
                  fullWidth
                >
                  Salvando...
                </LoadingButton>
              )} */}
      </Box>
    </Box>
  );
};

export default FormularioPratos;
