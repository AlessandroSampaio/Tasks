import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";

const EditarTarefa = ({
  handleCloseEditar,
  idTarefaSelecionada,
  tarefas,
  setTarefas,
}) => {
  const [tarefaEditada, setTarefaEditada] = useState({
    tituloTarefa: "",
    descricaoTarefa: "",
    inicioTarefa: "",
    fimTarefa: "",
    recursoTarefa: "",
    statusTarefa: "",
  });

  useEffect(() => {
    const tarefaEncontrada = tarefas.find(
      (tarefa) => tarefa.idTarefa === idTarefaSelecionada
    );
    console.log(tarefaEncontrada);
    setTarefaEditada(tarefaEncontrada || {});
  }, [idTarefaSelecionada, tarefas]);

  const {
    tituloTarefa,
    descricaoTarefa,
    inicioTarefa,
    fimTarefa,
    recursoTarefa,
    statusTarefa,
  } = tarefaEditada;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTarefaEditada((prevTarefa) => ({
      ...prevTarefa,
      [name]: value,
    }));
  };

  const handleRecursoChange = (event) => {
    setTarefaEditada((prevTarefa) => ({
      ...prevTarefa,
      recursoTarefa: event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setTarefaEditada((prevTarefa) => ({
      ...prevTarefa,
      statusTarefa: event.target.value,
    }));
  };

  const handleEditar = () => {
    fetch(`http://localhost:5000/tarefas/${idTarefaSelecionada}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefaEditada),
    })
      .then((response) => response.json())
      .then((tarefaAtualizada) => {
        setTarefas((tarefas) =>
          tarefas.map((t) =>
            t.idTarefa === idTarefaSelecionada ? tarefaAtualizada : t
          )
        );
      });
    handleCloseEditar();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Tarefas" subheader="Edição de Tarefas" />
        <CardContent sx={{ width: "95%", maxWidth: "100%" }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                name="tituloTarefa"
                id="tarefa_titulo"
                aria-describedby="tarefa_titulo_helper_text"
                value={tarefaEditada.tituloTarefa}
                onChange={handleInputChange}
              />
              <FormHelperText id="tarefa_titulo_helper_text">
                Título da Tarefa.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                name="descricaoTarefa"
                id="tarefa_descricao"
                aria-describedby="tarefa_descricao_helper_text"
                value={tarefaEditada.descricaoTarefa}
                onChange={handleInputChange}
              />
              <FormHelperText id="tarefa_descricao_helper_text">
                Descrição da Tarefa.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <FormControl>
                <Input
                  name="inicioTarefa"
                  id="tarefa_inicio"
                  type="date"
                  aria-describedby="tarefa_inicio_helper_text"
                  value={tarefaEditada.inicioTarefa}
                  onChange={handleInputChange}
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 400,
                    paddingLeft: "13px",
                  }}
                />
                <FormHelperText id="tarefa_inicio_helper_text">
                  Início da Tarefa.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <Input
                  name="fimTarefa"
                  id="tarefa_fim"
                  type="date"
                  aria-describedby="tarefa_fim_helper_text"
                  value={tarefaEditada.fimTarefa}
                  onChange={handleInputChange}
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 400,
                    paddingLeft: "13px",
                  }}
                />
                <FormHelperText id="tarefa_fim_helper_text">
                  Fim da Tarefa.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                <Select
                  id="tarefa_recurso"
                  name="recursoTarefa"
                  value={tarefaEditada.recursoTarefa}
                  label="Recurso"
                  onChange={handleRecursoChange}
                  size="small"
                  sx={{ color: "rgba(0, 0, 0, 0.6)", fontWeight: 400 }}
                >
                  <MenuItem value={"Recurso 1"}>Recurso 1</MenuItem>
                  <MenuItem value={"Recurso 2"}>Recurso 2</MenuItem>
                  <MenuItem value={"Recurso 3"}>Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Status</InputLabel>
                <Select
                  id="tarefa_status"
                  name="statusTarefa"
                  value={tarefaEditada.statusTarefa}
                  label="Status"
                  onChange={handleStatusChange}
                  size="small"
                  sx={{ color: "rgba(0, 0, 0, 0.6)", fontWeight: 400 }}
                >
                  <MenuItem value={"Aguardando"}>Aguardando</MenuItem>
                  <MenuItem value={"Em Andamento"}>Em Andamento</MenuItem>
                  <MenuItem value={"Concluída"}>Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleEditar(idTarefaSelecionada)}
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleCloseEditar}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  p: 4,
};

export default EditarTarefa;
