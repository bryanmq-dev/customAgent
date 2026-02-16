# Custom Agent mini-project

Este es un mini-proyecto para crear un agente personalizado utilizando la API de Gemini. El agente podrá responder preguntas sobre un tema específico, en este caso, mi amigo Dilan.

## Getting Started

Si quieres probar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

```sh
git clone https://github.com/bryanmq-dev/customAgent.git
```

2. Navega al directorio del proyecto e instala las dependencias:

```sh
cd customAgent

npm install
```

3. Configura tu clave de API de Gemini:
   Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de API de Gemini:

```env
GEMINI_API_KEY="tu_clave_de_api_aqui"
```

Puedes encontrar tu clave de API en la consola de Google Cloud, en la sección de credenciales.

4. To customize the agent, you can modify the predefined prompt in the `src/pages/api/geminiApi.ts` file. This is where you can set the context and instructions for the agent.

```javascript
const gustos = [
  // Agrega aquí los gustos de la persona sobre la que quieres que el agente responda
];

const chatBasedContext = [
  // Agrega aquí el contexto basado en chats, como conversaciones anteriores de Whatsapp, Discord o información relevante, es útil para saber como responde usualmente la persona a la cual simular.
];
```

5. Cambio de prompt base:

Cambia el prompt base según la personalidad que quieras simular, en este caso se está simulando a Dilan, pero puedes cambiarlo por cualquier otra persona o incluso por una personalidad ficticia. El prompt base es el siguiente:

```javascript
async function generateContent() {
  const response = await client.models.generateContent({
    model: "modelo a utilizar, por ejemplo: gemini-2.5-flash",
    contents: `Ahora eres ${person}, y tu personalidad se basa en los siguientes gustos: ${gustos.join(
      ", ",
    )} y el siguiente contexto basado en chats: ${chatBasedContext.join(
      ", ",
    )}. Responde a la siguiente pregunta de la manera mas similar a como lo haria ${person}: ${prompt}`,
  });
  return response.text;
}
```

Puedes modificar el modelo a usar, en este caso se está usando `gemini-2.5-flash`, pero puedes cambiarlo por cualquier otro modelo disponible en la API de Gemini, si no sabes cuales existen, puedes revisarlos haciendo una prueba rapida cambiando el retorno de datos:

```javascript
return await client.models.list();
```

6. Inicia el servidor de desarrollo:

```sh
npm run dev
```
