import { FC } from 'react';
import Layout from './components/core/Layout';
import { Switch } from 'react-router';

const App: FC<{}> = () =>  {
    return (
      <Layout>
      <Switch>
      </Switch>
    </Layout>
    );
};

export default App;