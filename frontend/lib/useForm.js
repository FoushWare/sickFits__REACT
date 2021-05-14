/// /////       what this hook do is :  ////////
// 00- create state for the provided inputs
// 01- Handle input changes and update the state regard to the change
// 02- reset the form inputs to the previous values
// 03- clear the form inputs

import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);
  // {
  //   name: 'Airmax 270',
  //   description: 'nice shoes',
  //   price: 1000
  // }
  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
