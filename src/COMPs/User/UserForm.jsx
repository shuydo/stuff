// // import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleForm } from "../../features/user/userSlice";

// import styles from "../../styles/User.module.css";

// import UserSignUpForm from "./UserSignUpForm";

// const UserForm = () => {
//   const dispatch = useDispatch();

//   const { showForm } = useSelector(({ user }) => user);
//   console.log("showForm:", showForm);

//   const closeForm = () => dispatch(toggleForm(false));

//   return showForm ? (
//     <>
//       <UserSignUpForm closeForm={closeForm} />
//       <div className={styles.overlay} onClick={closeForm} />
//     </>
//   ) : (
//     <></>
//   );

//   {
//     /* {formType === "signup" ? (
//         <UserSignupForm
//           toggleCurrentFormType={toggleCurrentFormType}
//           closeForm={closeForm}
//         />
//       // ) : (
//         <UserLoginForm
//           toggleCurrentFormType={toggleCurrentFormType}
//           closeForm={closeForm}
//         />
//       )} */
//   }
// };

// export default UserForm;

// ==================<J>

// import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserSignUpForm from "./UserSignUpForm";
import UserLoginForm from "./UserLoginForm";

import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);
  // const { showForm } = useSelector(({ user }) => user);

  // console.log("showForm:", showForm);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = type => dispatch(toggleFormType(type));

  return showForm ? (
    <>
      {formType === "signup" ? (
        <UserSignUpForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}

      <div className={styles.overlay} onClick={closeForm} />
    </>
  ) : (
    <></>
  );
};

export default UserForm;
