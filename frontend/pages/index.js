import Items from '../components/items';

const Home = props => {
  const { page } = props.query;
  return (
    <>
      <Items page={parseFloat(page) || 1} />
    </>
  );
};

export default Home;
