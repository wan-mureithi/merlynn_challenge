import React, { useEffect, useState } from "react";
import { useReadBatchQuery, useReadModelsQuery } from "./data/modelSlice";

const Home = () => {
  const { data: models, error } = useReadModelsQuery();
  const [formValues, setFormValues] = useState([]);
  const [formOptions, setFormOptions] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null)
  const { data: batchData } = useReadBatchQuery(selectedModel?.id);

  useEffect(() => {
    if (models) {
      const drinkChoice = models.data.find(
        (option) => option?.attributes?.name === "Drink choice"
      );
      setSelectedModel(drinkChoice)
      const inputValues = drinkChoice?.attributes?.metadata?.attributes;
      setFormOptions(inputValues);
    }
  }, [models]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputType = (inputChoice) => {
    if (inputChoice?.domain?.type === "DomainC") {
      return (
        <>
          <select
          className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={inputChoice.question}
            name={inputChoice.name}
            value={formValues?.[inputChoice.name]}
            onChange={handleChange}
          >
            {inputChoice.domain?.values.map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </>
      );
    } else {
      return (
        <>
          <input
          className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name={inputChoice.name}
            value={formValues?.[inputChoice.name]}
            type={inputChoice.type === "Continuous" ? "number" : "text"}
            min={inputChoice.domain?.lower}
            max={inputChoice.domain?.upper}
            step={inputChoice.domain?.interval}
            onChange={handleChange}
          />
        </>
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div style={{ margin: "20px 50px" }}>
      {error ? (
        <>
          <h3>{error?.message}</h3>
        </>
      ) : (
        <>
        <h2 className="text-lg"> {selectedModel?.attributes.name} </h2>
        <p className="text-sm font-small pb-3"> {selectedModel?.attributes.description} </p>
        <form onSubmit={handleSubmit}>
          {formOptions?.map((value, index) => (
            <div className="flex mb-2 items-center gap-x-3" key={index}>
              <label className="text-sm font-medium leading-6 text-gray-900">{value.question}</label>
              {handleInputType(value)}
            </div>
          ))}
          <button type="submit" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Submit</button>
        </form>
        </>
      )}
      <br />
      <h2 className="font-medium mt-2">List batch files and running jobs</h2>
      <div class="px-4 py-6 width">
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <ul
            class="divide-y divide-gray-100 rounded-md border border-gray-200"
          >
            {batchData?.data?.files?.slice(0,5).map((item) => (
              <li
                key={item.id}
                class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
              >
                <div class="flex w-0 flex-1 items-center">
                  <svg
                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-medium">
                      {item.filename}
                    </span>
                    <span class="flex-shrink-0 text-gray-400">{item.size}kb</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <p
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {new Date(item.timestamp).toISOString().split('T')[0]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </div>
  );
};

export default Home;
