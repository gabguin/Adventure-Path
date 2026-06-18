import { useState } from "react";
import { Overlay } from "../overlay/overlay";
import "./reward.css"
export function RewardComponent({ setReward, setOpenReward }) {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  function acceptImage(event) {
    const file = event.target.files[0];
    if(!file) return;
    if (!file.type.startsWith("image/")) {
      event.target.value = '';
      return;
    }
     setImage(URL.createObjectURL(file));
  }
  function addReward() {
    if (!price || !info) {
      return;
    }
    setReward(prev => [
      ...prev,
      {
        image,
        info,
        price
      }
    ]);
    setOpenReward(false);
  }
  return (
    <Overlay>
      <div className="reward-div">
        <div>
          <button onClick={() => setOpenReward(false)}>
          close
        </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={acceptImage}
        />
        <div>
          <input
            placeholder="price"
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div>
          <textarea
            onChange={(event) => setInfo(event.target.value)}
          /> </div>
        <div>
          <button onClick={addReward}>
            add
          </button>
        </div>
      </div>
    </Overlay>
  );
}