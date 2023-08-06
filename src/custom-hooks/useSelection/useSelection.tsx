import { useState, useCallback } from 'react';

// Define the generic type for the selected items
type SelectedItemType = string | number; // Change this to the type of your item IDs

const useSelection = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemType[]>([]);

  const toggleSelectedItem = (itemId: SelectedItemType) => {
    setSelectedItems((prevSelection) => {
      if (prevSelection.includes(itemId)) {
        return prevSelection.filter((id) => id !== itemId);
      } else {
        return [...prevSelection, itemId];
      }
    });
  };

  const isSelected = useCallback(
    (itemId: SelectedItemType) => selectedItems.includes(itemId),
    [selectedItems],
  );

  return { selectedItems, isSelected, toggleSelectedItem };
};

export default useSelection;
