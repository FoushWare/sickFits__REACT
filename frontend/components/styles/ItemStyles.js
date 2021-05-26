import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    box-shadow: 0px 15px 20px #ab8b8b;
    /* box-shadow: var(--bs); */
    display: grid;
    width: 100%;
    /* border-bottom: 1px solid var(--grey); */
    border-top: 1px solid var(--lightGrey);
    border: 1px sold black;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: var(--lightGray);
    & > * {
      background: white;
      border: 0;
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
  .buttonList a,
  .buttonList button {
    border-right: 1px solid var(--lightGrey);
    text-decoration: none;
    text-transform: uppercase;
    align-items: center;
    text-align: center;
  }
  .buttonList a:hover,
  .buttonList button:hover {
    cursor: pointer;
  }
`;

export default Item;
