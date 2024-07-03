import Select from "react-select";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { BsTranslate } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { getLanguages, translateText } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  const translateState = useSelector((store) => store.translateReducer);

  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer
  );

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });

  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    toast("Success! :)", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="bg-purple-200 h-screen text-zinc-800 grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col">
        <h1 className=" text-center mb-7 text-4xl font-semibold">
          Translate App
        </h1>
        {/*ust kisim*/}
        <div className="flex gap-2 text-black">
          <Select
            onChange={(e) => setSourceLang(e)}
            value={sourceLang}
            className="flex-1"
            options={formatted}
          />
          <button
            onClick={handleSwap}
            className=" bg-zinc-700 px-6 py-2 rounded text-white hover:ring-2 hover:bg-zinc-800"
          >
            <LiaExchangeAltSolid />
          </button>

          <Select
            onChange={(e) => setTargetLang(e)}
            value={targetLang}
            className="flex-1"
            options={formatted}
          />
        </div>
        {/*text alanlari*/}
        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] text-zinc-800 p-[10px] text-[20px] rounded"
            ></textarea>
          </div>
          <div className="flex-1">
            <textarea
              value={translateState.answer}
              disabled
              className="w-full bg-zinc-400 min-h-[300px] max-h-[500px] text-gray-200 p-[10px] text-[20px] rounded"
            ></textarea>
            {translateState.isLoading && (
              <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleTranslate}
          className="flex align-items-center justify-center gap-2 text-[17px] text-white bg-zinc-700 fs-4 mt-3 py-3 mb-5 px-5 rounded duration-75 hover:bg-zinc-600 hover:ring-2"
        >
          Translate <BsTranslate />
        </button>
      </div>
    </div>
  );
}

export default App;
