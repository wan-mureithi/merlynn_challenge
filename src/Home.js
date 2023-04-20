import React, { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";



const Home = () => {
  const { response, error } = useFetch();
  const [formValues, setFormValues] = useState([]);
  const [formOptions, setFormOptions] = useState([]);

  useEffect(() => {
    if (response?.data) {
      const drinkChoice = response.data.find(
        (option) => option.attributes.name === "Drink choice"
      );
      const inputValues = drinkChoice.attributes.metadata.attributes;
      setFormOptions(inputValues);
    }
  }, [response]);

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
            placeholder={inputChoice.question}
            name={inputChoice.name}
            value={formValues?.[inputChoice.name]}
            onChange={handleChange}   
          >
            {inputChoice.domain?.values.map((choice, index) => (
              <option key={index} value={choice}>{choice}</option>
            ))}
          </select>
        </>
      );
    } else {
      return (
        <>
          <input
            name={inputChoice.name}
            value={formValues?.[inputChoice.name]}
            type={inputChoice.type === 'Continuous' ? "number" : "text"}
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
    e.preventDefault()
    console.log(formValues)
  }
  return (
    <div style={{ margin: "20px 50px" }}>
     <form onSubmit={handleSubmit}>
     {formOptions?.map((value, index) => (
        <div style={{ display: "block", marginBottom: "10px" }} key={index}>
          <label>{value.question}</label>
          {handleInputType(value)}
        </div>
      ))}
    <button type="submit">Submit</button>
     </form>
     
    </div>
  );
};

export default Home;
