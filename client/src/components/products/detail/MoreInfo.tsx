import { FC } from 'react';
import styles from './MoreInfo.module.css';

const information = {
  category: 'Phone',
  brand: 'Xiaomi',
  model: 'Xiaomi 11 Lite 5G NE',
  year: '2021',
  color: 'Black',
};

const TableRow: FC<{ propName: string; value: string | number }> = ({ propName, value }) => {
  return (
    <tr>
      <td>{propName}</td>
      <td>{value}</td>
    </tr>
  );
};

const MoreInfo: FC<{ information: { [key: string]: string | number } }> = ({ information }) => {
  return (
    <table className={styles.table}>
      <tbody>
        {Object.entries(information).map(([k, v]) => (
          <TableRow key={k} propName={k} value={v} />
        ))}
      </tbody>
    </table>
  );
};

export default MoreInfo;
