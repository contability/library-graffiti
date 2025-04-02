import { useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import CommonContainer from "../../layout/CommonContainer";
import styled from "styled-components";

const AddressDaumPostcodeEmbedContainer = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 5rem;
    text-align: center;
    color: #ffffff;
    font-weight: 700;
  }

  ul li {
    display: flex;
    gap: 0.8rem;
    font-size: 2rem;

    b {
      min-width: 32rem;
    }
  }
`;

const AddressDaumPostcodeEmbed = () => {
  const [addressData, setAddressData] = useState<Address | null>(null);
  const handleComplete = (data: Address) => {
    console.log(data);
    setAddressData(data);

    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <CommonContainer>
      <AddressDaumPostcodeEmbedContainer>
        <h2>react-daum-postcode embed</h2>
        <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
        {addressData && (
          <ul>
            {Object.entries(addressData).map(([key, value], index) => (
              <li key={`address-props__${index}`}>
                <b>{key}</b>
                <p>{value}</p>
              </li>
            ))}
          </ul>
        )}
      </AddressDaumPostcodeEmbedContainer>
    </CommonContainer>
  );
};

export default AddressDaumPostcodeEmbed;
