import { faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, FormEvent, useEffect } from 'react';
import useInput from '../../hooks/use-input';
import useThrottle from '../../hooks/use-trottle';
import Button from './Button';
import Card from './Card';
import styles from './SearchBar.module.css';

const SearchBar: FC<{
  limitValue: number;
  filterValue: string;
  onChangeLimit: (event: FormEvent<HTMLSelectElement>) => void;
  onChangeFilter: (event: FormEvent<HTMLSelectElement>) => void;
  onChangeInputValue: (event: FormEvent<HTMLInputElement>) => void;
  inputValue: string;
}> = ({ onChangeLimit, onChangeFilter, onChangeInputValue, limitValue,filterValue,inputValue }) => {
  return (
    <Card classes={styles.card}>
      <form className={styles['search-form']}>
        <h2>
          <FontAwesomeIcon icon={faList} className={styles.icon} />
          <span>Orders</span>
        </h2>

        <div className={styles['search-input']}>
          <input
            type='text'
            placeholder='Search...'
            name='search'
            onChange={onChangeInputValue}
            value={inputValue}
          />
          <Button icon={faSearch} classes={styles.btn} />
        </div>

        <div className={styles['filter']}>
          <span>Filter By:</span>
          <select name='filter' className={styles.criteria} value={filterValue} onChange={onChangeFilter}>
            <option value='_id'>Order ID</option>
            <option value='userId'>User ID</option>
            <option value='deliveryAddress'>Delivery Address</option>
            <option value='status'>Status</option>
            <option value='paymentMethod'>Payment Method</option>
            <option value='amount'>Amount</option>
            <option value='totalPrice'>Total Price</option>
          </select>
          <span>Limit:</span>
          <select name='limit' className={styles.limit} value={limitValue} onChange={onChangeLimit}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
      </form>
    </Card>
  );
};

export default SearchBar;
