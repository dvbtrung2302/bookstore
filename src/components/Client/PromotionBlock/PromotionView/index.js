import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
  Alert,
  Container
} from "reactstrap";

import './style.css';

function PromotionView(props) {
  const {
    image,
    name,
    description,
    code
  } = props;
  const [copy, setCopy] = useState(false);

  return (
    <Container className="promotion-view">
      <div className="image">
        <img src={image} />
      </div>
      <div className="info">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        <div className="code">Code: {code}</div>
        <CopyToClipboard text={code} onCopy={() => setCopy(true)}>
          <img className="copy" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1609164814/Books/copy-icon_ugrrsy.svg" />
        </CopyToClipboard>
        {
          copy &&
          <Alert>Copied</Alert>
        }
      </div>
    </Container>
  );
}

export default PromotionView;