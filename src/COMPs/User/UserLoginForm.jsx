import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

import styles from "../../styles/User.module.css";

const UserSignUpForm = ({ closeForm,toggleCurrentFormType }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSabmit = evt => {
    evt.preventDefault();

    // const isEmpty = Object.values(values).some(val => !val);
    // if (isEmpty) return;

    const isNotEmpty = Object.values(values).every(val => val);
    if (!isNotEmpty) return;

    dispatch(loginUser(values)); //createUser in UserSignUpForm
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Login</div>

      <form className={styles.form} onSubmit={handleSabmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("signup")}
        >
          Create an account
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
