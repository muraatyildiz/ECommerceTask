import { FunctionComponent } from "react";

interface ILoadingProps {
  loading: boolean;
}

const Loading: FunctionComponent<ILoadingProps> = ({ loading }) => {


  if (loading) {
    return <>Loading...</>;
  }

  return <>{loading}</>;
};

export default Loading;


