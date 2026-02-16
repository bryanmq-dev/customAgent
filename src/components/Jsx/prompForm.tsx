import { HandlePrompt } from "../../pages/api/geminiApi";
import { useState } from "react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(
    "Aquí aparecerá la respuesta de Dilan AI...",
  );
  const [loading, setLoading] = useState(false);

  const HandleResponse = (res: string) => {
    setLoading(false);
    showProgresiveResponse(res);
  };

  const showProgresiveResponse = (fullResponse: string) => {
    const interval = 20;
    let index = 0;
    const updateResponse = () => {
      if (index < fullResponse.length - 1) {
        setResponse((prev) => prev + fullResponse[index]);
        index++;
        setTimeout(updateResponse, interval);
      }
    };
    updateResponse();
  };

  const handleSubmit = () => {
    setResponse("");
    setLoading(true);
    HandlePrompt(prompt, HandleResponse);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" && !loading && prompt.trim() !== "") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="flex gap-2 w-full max-w-md items-end p-2 rounded-2xl border bg-white/80 border-none ">
        <textarea
          placeholder="Pregunta algo sobre Dilan"
          className="focus:outline-0 w-full text-lg h-auto p-2 border rounded resize-none border-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="text-black p-2 rounded-4xl hover:bg-black hover:text-white transition cursor-pointer"
          disabled={loading || prompt.trim() === ""}
          onClick={handleSubmit}
          onKeyDown={handleEnter}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>

      <div className="bg-white/40 p-4 rounded-2xl w-full max-w-md text-center min-h-25 flex items-center justify-center">
        <p className="text-lg text-gray-800 text-left">
          {loading ? "Cargando respuesta..." : response}
        </p>
      </div>
    </>
  );
}
