import React from "react";

interface IProps {
  name?: string,
  onChange?: (name: string) => void
}

const Demo: React.FC<IProps> = ({ name }) => (<div>{ name }</div>);

Demo.defaultProps = {
  name: 'Amber'
}

type Cat = Record<string, React.FC>

export default Demo