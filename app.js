// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import {pinoHttp, logger} from './utils/logging.js';

const app = express();

// Use request-based logger for log correlation
app.use(pinoHttp);

// all
app.get('/', async (req, res) => {
  // Use basic logger without HTTP request info
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); // Example of structured logging
  // Use request-based logger with log correlation
  req.log.info('Child logger with trace Id.'); // https://cloud.google.com/run/docs/logging#correlate-logs
  res.send('Hola te estoy viendo!');
});

//Get
app.get('/api/hello', (req, res) => {
  res.json({ message: '¡Hola desde Cloud Run!' });
});

//Submit
app.post('/api/submit', (req, res) => {
  const { name, email } = req.body;
  // Aquí podrías guardar los datos en una base de datos
  res.json({ message: `Usuario ${name} registrado correctamente.` });
});

//Get with parameters
app.get('/api/users', (req, res) => {
  const { name, age } = req.query;
  // Aquí podrías realizar una búsqueda de usuarios en base a los parámetros
  res.json({ message: `Buscando usuarios con nombre ${name} y edad ${age}` });
});

export default app;
