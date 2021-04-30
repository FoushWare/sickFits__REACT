import React from 'react';

export default function Page({ children }) {
  return (
    <>
      <h2>I'm from page component</h2>
      {children}
    </>
  );
}
