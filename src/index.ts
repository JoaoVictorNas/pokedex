import express, { Request, Response } from "express";
import path from "path";
import fetch from "node-fetch";

const app = express();
const port = 3000;

// Configurações de view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// Rota principal
app.get('/', async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    res.render("index", { pokemons: data.results });
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    res.status(500).send("Erro ao buscar dados da API.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});