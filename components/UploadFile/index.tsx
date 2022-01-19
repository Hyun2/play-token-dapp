import { ethers, Signer } from "ethers";
import { create } from "ipfs-http-client";
import { IconContext } from "react-icons";
import { MdOutlineImage } from "react-icons/md";
import { ImageContainer, InputImage, InputTemp, PreviewImage, PreviewImageCloseButton } from "./styles";
import TozauNFT from "../../build/contracts/TozauNFT.json";
import useStore from "../../utils/store";

// const ipfsHttpClient = create("https://ipfs.infura.io:5001/api/v0");
const ipfsHttpClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const UploadFile = ({ imageURI, setImageURI }: { imageURI: string; setImageURI: (imageURI: string) => void }) => {
  const onHandleChange = async (event: any) => {
    if (event.target?.files[0]) {
      let file = event.target.files[0];

      try {
        const addedImg = await ipfsHttpClient.add(file, {
          progress: (prog) => {
            console.log(`received: ${prog}`);
          },
        });
        console.log(addedImg);
        const url = `https://ipfs.infura.io/ipfs/${addedImg.path}`;
        // const url = `https://ipfs.io/ipfs/${addedImg.path}`;
        console.log(url);
        setImageURI(url);
      } catch (e) {
        console.dir(`ipfs upload error: ${e}`);
      }
    }
  };

  return (
    <>
      <InputImage id="fileUpload" type="file" name="fileUpload" onChange={onHandleChange} />
      <label style={{ width: "100%" }} htmlFor="fileUpload">
        <InputTemp>
          <ImageContainer>
            {imageURI ? (
              <>
                <PreviewImage src={imageURI} />
                <PreviewImageCloseButton onClick={() => setImageURI("")}>X</PreviewImageCloseButton>
              </>
            ) : (
              <IconContext.Provider value={{ color: "rgb(204, 204, 204) " }}>
                <div>
                  <MdOutlineImage size={70} />
                </div>
              </IconContext.Provider>
            )}
          </ImageContainer>
        </InputTemp>
      </label>
    </>
  );
};

export default UploadFile;
