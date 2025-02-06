import { useState } from "react";
import { SetSettings } from "../wailsjs/go/main/App";

const DEFAULT_VALUES = {
  wait: 1000,
  delay: 1000,
  repeat: 500,
  bounce: 0,
};

function App() {
  const [filterKeysConfig, setFilterKeysConfig] = useState(DEFAULT_VALUES);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterKeysConfig((prevState) => ({
      ...prevState,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const applySettings = async () => {
    try {
      await SetSettings(
        filterKeysConfig.wait,
        filterKeysConfig.delay,
        filterKeysConfig.repeat,
        filterKeysConfig.bounce
      );
      alert("Filter Keys actualizado correctamente!");
    } catch (error) {
      console.error("Error al aplicar los cambios:", error);
    }
  };

  return (
    <div className="p-3 w-full max-h-[400px] h-full">
      <div className="bg-zinc-900 w-[300px] p-4 rounded-md h-full">
        <div className="inline-flex gap-x-4 flex-row items-center">
          <input type="checkbox" />
          <span className="text-neutral-200 text-sm">
            Ignorar pulsaciones rápidas y configurar repetición
          </span>
        </div>
        <div className="flex flex-col w-full gap-6 my-5">
          <div className="flex flex-row items-center gap-x-3">
            <span className="text-sm text-neutral-300">Ignorar por</span>
            <input
              min={0}
              onChange={handleChange}
              value={filterKeysConfig.wait}
              className="w-20 rounded bg-zinc-700 text-sm text-neutral-100 px-2"
              type="number"
              name="wait"
            />
            <span className="text-sm text-neutral-300">ms</span>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <span className="text-sm text-neutral-300">
              Retraso de repetición
            </span>
            <input
              min={0}
              onChange={handleChange}
              value={filterKeysConfig.delay}
              className="w-20 rounded bg-zinc-700 text-sm text-neutral-100 px-2"
              type="number"
              name="delay"
            />
            <span className="text-sm text-neutral-300">ms</span>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <span className="text-sm text-neutral-300">Tasa de repetición</span>
            <input
              min={0}
              onChange={handleChange}
              value={filterKeysConfig.repeat}
              className="w-20 rounded bg-zinc-700 text-sm text-neutral-100 px-2"
              type="number"
              name="repeat"
            />
            <span className="text-sm text-neutral-300">ms</span>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <span className="text-sm text-neutral-300">Rebote</span>
            <input
              min={0}
              onChange={handleChange}
              value={filterKeysConfig.bounce}
              className="w-20 rounded bg-zinc-700 text-sm text-neutral-100 px-2"
              type="number"
              name="bounce"
            />
            <span className="text-sm text-neutral-300">ms</span>
          </div>
        </div>
        <button
          onClick={applySettings}
          className="bg-orange-600 px-3 py-1.5 rounded-xl w-full text-white font-semibold"
        >
          Aplicar Configuración
        </button>
      </div>
    </div>
  );
}

export default App;
