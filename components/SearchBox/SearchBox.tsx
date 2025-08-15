import css from './SearchBox.module.css';

interface SearchBoxProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const SearchBox = ({ value, defaultValue, onChange }: SearchBoxProps) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      defaultValue={defaultValue}
      onChange={handleInput}
    />
  );
};
