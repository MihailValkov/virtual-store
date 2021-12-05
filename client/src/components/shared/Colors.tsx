import { ChangeEvent, FC, useEffect, useState } from 'react';
import Color from './Color';
import styles from './Colors.module.css';

const Colors: FC<{ colors: string[]; onSelectColor: (color: {}) => void; inputType: string }> = ({
  colors,
  onSelectColor,
  inputType,
}) => {
  const [state, setState] = useState<{}>({});

  useEffect(() => {
    const initialState = colors.reduce((a, b) => Object.assign(a, { [b]: false }), {});
    console.log('colors effect');
    
    setState(initialState);
  }, [colors]);

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputType === 'radio') {
      setState({ color: e.target.value });
      onSelectColor({ color: e.target.value });
    } else {
      setState((prev) => ({ ...prev, [e.target.name]: !!e.target.checked }));
      onSelectColor({ ...state, [e.target.name]: !!e.target.checked });
    }
  };

  return (
    <div className={styles.colors}>
      {colors.map((c) => (
        <Color
          key={c}
          color={c}
          type={inputType}
          name={inputType === 'radio' ? 'color' : c}
          onChange={changeInputHandler}
        />
      ))}
    </div>
  );
};

export default Colors;
