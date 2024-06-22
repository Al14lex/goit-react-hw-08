import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter} from "../../redux/filters/selectors";
import { changeNameFilter} from "../../redux/filters/slice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);

  const handleNameFilter = (e) => {
    const name = e.target.value.trim();
    dispatch(changeNameFilter(name));
  };

  return (
    <div className={css.divSearch}>
      <p>Find contacts</p>
      <input
        type="text"
        value={nameFilter}
        id='searchBox'
        onChange={handleNameFilter}
      />
    </div>
  );
}
