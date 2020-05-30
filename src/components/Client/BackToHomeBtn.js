import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/Client/BackToHomeBtn.css';

export default function() {
  return(
    <div className="BackToHomeBtn">
      <Link to='/'>Back to Home</Link>
    </div>
  );
}