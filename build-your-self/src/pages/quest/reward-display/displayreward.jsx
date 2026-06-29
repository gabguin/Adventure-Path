import { useState } from "react";
import "./displayreward.css";
import Book from "../../../assets/Book-Page.jpg";
import { AttachReward } from "./attachReward";
export function RewardComponent({ setReward, setOpenReward }) {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  function acceptImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
  function addReward() {
    if (!price || !image) {
      return;
    }
    setReward((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        image,
        info,
        requiredExp: Number(price),
        isActive: false,
        rewardExp: 0,
      },
    ]);
    setOpenReward(false);
  }
  return (
    <div
      className="reward-div"
      style={{
        backgroundImage: `url(${Book})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h2>Reward</h2>
      <div className="close-reward">
        <button onClick={() => setOpenReward(false)}>X</button>
      </div>

      <span>Image :</span>
      <input type="file" accept="image/*" onChange={acceptImage} />
      <div>
        <input
          className="input-text"
          placeholder="price"
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div>
        <textarea
          className="input-text"
          onChange={(event) => setInfo(event.target.value)}
        />{" "}
      </div>
      <div>
        <button onClick={addReward} className="confirm-quest">
          Confirm Quest
        </button>
      </div>
      <div></div>
    </div>
  );
}
