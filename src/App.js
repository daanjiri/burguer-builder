import React from 'react';
import Layout from './components/Layout/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.jsx';

function App() {
  return (
    <div >
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
