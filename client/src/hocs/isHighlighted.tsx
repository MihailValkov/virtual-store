import { useEffect, useState, ComponentType } from 'react';

export function withHighlighted<T>(Cmp: ComponentType<T>) {
  return (props: { count?: number } & T) => {
    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
      if (props.count === 0) {
        return;
      }
      setIsHighlighted(true);
      let timer = setTimeout(() => setIsHighlighted(false), 300);

      return () => clearTimeout(timer);
    }, [props.count]);

    return props.count ? <Cmp {...props} isHighlighted={isHighlighted} /> : <Cmp {...props}/>;
  };
}
