import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

import styles from "../../styles/Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSabmit = evt => {
    evt.preventDefault(); // const isEmpty = Object.values(values).some(val => !val);    // if (isEmpty) return;

    const isNotEmpty = Object.values(values).every(val => val);
    if (!isNotEmpty) return;

    dispatch(updateUser(values));
    // closeForm();
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
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
              // type="text"
              type="name"
              name="name"
              placeholder="Your name"
              value={values.name}
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

          <div className={styles.group}>
            <input
              // type="text"
              type="avatar"
              name="avatar"
              placeholder="Your avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
