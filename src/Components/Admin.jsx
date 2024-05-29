export function Admin({ userToken }) {
  const [updatedUser, setUpdatedUser] = useState([]);
  const navigate = useNavigate();

  // update users
  const updateUser = async (
    userId,
    name,
    username,
    email,
    password,
    date_of_birth,
    is_admin,
    nyan_unlocked
  ) => {
    const confirmation = confirm(
      "Are you sure you want to update this user?\n\nIf you update this user's password, be sure to let them know what the new one is!"
    );
    if (confirmation === true) {
      try {
        const response = await fetch(
          `https://cherry-stone-studios.onrender.com/api/admin/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              name,
              username,
              email,
              password,
              date_of_birth,
              is_admin,
              nyan_unlocked,
            }),
          }
        );
        const result = await response.json();

        console.log("THIS IS THE UPDATE USER RESPONSE", result);

        setUpdatedUser(result);
        navigate("/admin");
      } catch (err) {
        throw err;
      }
    }
  };

  // delete users
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://cherry-stone-studios.onrender.com/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const result = await response.json();

      console.log("THIS IS THE UPDATE USER RESPONSE", result);

      alert("The user has been deleted.");
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  // update scores
  const updateScore = async (scoreId) => {
    const confirmation = confirm(
      "Are you sure you want to update this user?\n\nIf you update this user's password, be sure to let them know what the new one is!"
    );
    if (confirmation === true) {
      try {
        const response = await fetch(
          `https://cherry-stone-studios.onrender.com/api/admin/scores/${scoreId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              name,
              username,
              email,
              password,
              date_of_birth,
              is_admin,
              nyan_unlocked,
            }),
          }
        );
        const result = await response.json();

        console.log("THIS IS THE UPDATE SCORE RESPONSE", result);

        setUpdatedUser(result);
        navigate("/admin");
      } catch (err) {
        throw err;
      }
    }
  };

  // delete scores
  const deleteScore = async (scoreId) => {
    try {
      const response = await fetch(
        `https://cherry-stone-studios.onrender.com/api/admin/scores/${scoreId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const result = await response.json();

      console.log("THIS IS THE UPDATE SCORE RESPONSE", result);

      alert("The user has been deleted.");
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <h1>ADMIN</h1>
    </>
  );
}
