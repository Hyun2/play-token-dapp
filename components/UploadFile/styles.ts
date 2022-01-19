import styled from "styled-components";

export const InputTemp = styled.div`
  border-radius: 10px;
  border: 3px dashed rgb(127, 117, 117);
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  height: 320px;
  // width: 350px;
  :hover {
    background-color: rgb(226, 224, 224);
  }
`;

export const PreviewImage = styled.img`
  // width: 100%;
  height: 100%;
  border-radius: 10px;
  :hover {
    background-color: transparent;
  }
`;

export const PreviewImageCloseButton = styled.button`
  color: #ffffff;
  outline: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  cursor: pointer;
  font-size: 20px;
  :hover {
    color: rgb(127, 117, 117);
  }
`;

export const InputImage = styled.input`
  display: none;
`;
