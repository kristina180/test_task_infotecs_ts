"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "../../store/root-store-context";
import styles from "./FilterUser.module.css";

const initialState = {
  name: "",
  age: "not_selected",
  gender: "not_selected",
  city: "not_selected",
  phone_code: "not_selected",
};
const FilterUser = observer(() => {
  const [values, setValue] = useState(initialState);

  const {
    userStore: { users, filterUsers, getUsers, getFilterUsers, clearFilters },
  } = useStores();
  const arr_phoneCode =
    [
      ...new Set(
        users.map((user) => user.phone.slice(0, user.phone.indexOf(" ")))
      ),
    ].sort() || [];
  const arr_city =
    [...new Set(users.map((user) => user.address?.city))].sort() || [];

  function handleChangeValue({ target: { value, name } }) {
    setValue({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !Object.keys(initialState).every(
        (key) => values[key] === initialState[key]
      )
    ) {
      getFilterUsers(values);
    }
  }
  function handleClick() {
    setValue(initialState);
    getFilterUsers(initialState);
    // clearFilters();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Search for name"
        value={values.name}
        className={styles.input}
        onChange={handleChangeValue}
      />

      <select
        id="gender"
        name="gender"
        value={values.gender}
        onChange={handleChangeValue}
      >
        <option value="not_selected">Gender is not selected</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        id="age"
        name="age"
        value={values.age}
        onChange={handleChangeValue}
      >
        <option value="not_selected">Age is not selected</option>
        <option value="0_19">Less 20</option>
        <option value="20_29">From 20 to 29</option>
        <option value="30_39">From 30 to 39</option>
        <option value="40+">More 40</option>
      </select>

      <select
        id="phone_code"
        name="phone_code"
        value={values.phone_code}
        onChange={handleChangeValue}
      >
        <option value="not_selected">Phone code is not selected</option>
        {arr_phoneCode &&
          arr_phoneCode.map((code) => (
            <option key={`code_${code}`} value={`${code}`}>
              {code}
            </option>
          ))}
      </select>
      <select
        id="city"
        name="city"
        value={values.city}
        onChange={handleChangeValue}
      >
        <option value="not_selected">City is not selected</option>
        {arr_city &&
          arr_city.map((city) => (
            <option key={`city_${city}`} value={`${city}`}>
              {city}
            </option>
          ))}
      </select>

      <button type="submit" className={styles.buttonSubmit}>
        Search
      </button>
      <button
        type="button"
        onClick={handleClick}
        className={styles.buttonClear}
      >
        Clear
      </button>
    </form>
  );
});

export default FilterUser;
