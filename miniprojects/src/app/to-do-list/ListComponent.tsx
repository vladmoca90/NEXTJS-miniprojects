import { ListItem } from "./to-do-list/store/features/toDoListSlice";

interface ListComponentProps {
    item: ListItem;
    onRemove: () => void;
}

export const ListComponent = ({ item, onRemove }: ListComponentProps) => {
    return (
        <li>
            {item.item}
            <button onClick={onRemove}>Remove</button>
        </li>
    );
}
