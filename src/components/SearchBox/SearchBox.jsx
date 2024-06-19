import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter, selectPhoneFilter } from "../../redux/filters/selectors";
import { changeNameFilter, changePhoneFilter  } from "../../redux/filters/slice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const phoneFilter = useSelector(selectPhoneFilter);

  const handleNameFilter = (e) => {
    const name = e.target.value.trim();
    dispatch(changeNameFilter(name));
  };

  const handlePhoneFilter = (e) => {
    const phone = e.target.value.trim();
    dispatch(changePhoneFilter(phone));
  };

  return (
    <div className={css.divSearch}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={nameFilter}
        id='searchBox'
        onChange={handleNameFilter}
      />
      <p>Find contacts by phone number</p>
      <input
        type="text"
        value={phoneFilter}
        id='phoneSearchBox'
        onChange={handlePhoneFilter}
      />
    </div>
  );
}
