import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
  modelOutput: string;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initialValues: { [key: number]: string } = {};
    props.model.paramValues.forEach(paramValue => {
      initialValues[paramValue.paramId] = paramValue.value;
    });

    this.state = {
      paramValues: initialValues,
      modelOutput: '',
    };
  }

  public getModel(): Model {
    const { paramValues } = this.state;
    const paramValuesArray: ParamValue[] = Object.keys(paramValues).map(key => ({
      paramId: parseInt(key),
      value: paramValues[parseInt(key)],
    }));

    return {
      paramValues: paramValuesArray,
      colors: [],
    };
  }

  private handleChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  private handleShowModel = () => {
    const model = this.getModel();
    this.setState({ modelOutput: JSON.stringify(model, null, 2) });
  };

  render() {
    const { params } = this.props;
    const { paramValues, modelOutput } = this.state;

    return (
      <div>
        {params.map(param => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={paramValues[param.id] || ''}
              onChange={e => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={this.handleShowModel}>Показать модель</button>
        {modelOutput && (
          <div>
            <h3>Вывод модели:</h3>
            <pre>{modelOutput}</pre>
          </div>
        )}
      </div>
    );
  }
}

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [],
};

const App = () => (
  <div>
    <h1>Редактор параметров</h1>
    <ParamEditor params={params} model={model} />
  </div>
);

export default App;
