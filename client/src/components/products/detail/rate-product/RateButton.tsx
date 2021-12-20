import { FC } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RateButton: FC<{
  id?: string;
  type?: 'radio' | 'checkbox';
  name?:string;
  onClick?: () => void;
  icon?: IconDefinition | null;
}> = ({ type, onClick, icon, id,name }) => {
  return (
    <>
      <input type={type} id={id} name={name} onClick={onClick} defaultValue={id}/>
      <label htmlFor={id}>{icon && <FontAwesomeIcon icon={icon} />}</label>
    </>
  );
};

export default RateButton;
