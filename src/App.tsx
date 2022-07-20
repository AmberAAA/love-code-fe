import { BrowserRouter, Router } from 'react-router-dom'
import { Layout } from './Layout';

interface User {
  name?: string
};

interface Props {
  user?: User
}

const App: React.FC<Props> = (props) => {
  const a = props.user?.name?.toLocaleLowerCase();  // string | null | undefind

  const b = props.user!.name!.toLocaleLowerCase();  // string

  return (
    <Layout>
      { props.user?.name.toString() }
    </Layout>
  )
}

export default App;


interface IPerson {
  readonly name: string;
  age: number;
}

type TModifyPerson = Partial<IPerson>;

type A =  Required<TModifyPerson>

