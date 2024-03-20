import React, { useEffect, useState } from "react";

function Signout() {
    localStorage.clear();
    window.location.href='/';
  return;
}

export default Signout