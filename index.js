const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

// Middleware para permitir requisições de outros domínios
app.use(cors());

// Fatores de emissão para diferentes tipos de combustível
const emissionFactors = {
    'HFO': 3.114,
    'MDO': 3.206,
    'LNG': 2.750
};

app.get('/', (req, res) => {
    res.send('API para calcular emissão de CO2');
});

// Rota para calcular a emissão de CO2
app.post('/calculate-co2', (req, res) => {
    const { fuelType, fuelConsumption } = req.body;

    // Verificar se os dados de entrada são válidos
    if (!fuelType || !fuelConsumption || fuelConsumption <= 0) {
        return res.status(400).json({ error: 'Dados de entrada inválidos.' });
    }

    // Verificar se o tipo de combustível é válido
    const emissionFactor = emissionFactors[fuelType];
    if (!emissionFactor) {
        return res.status(400).json({ error: 'Tipo de combustível inválido.' });
    }

    // Calcular a emissão de CO2
    const co2Emissions = fuelConsumption * emissionFactor;

    // Retornar o resultado
    res.json({ co2Emissions: co2Emissions.toFixed(2) });
});

// Define a porta a partir da variável de ambiente PORT, ou use a porta 3000 como padrão
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
