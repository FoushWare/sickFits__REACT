import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
Page.propTypes = {
  children: PropTypes.any,
};
