import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  const handleClickEvent = () => {
    navigate("/gsap/");
  };
  return (
    <>
      <main>
        <ul>
          <li>
            <button onClick={handleClickEvent}>gsap</button>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Root;
