// interfaces/HeaderProps.ts
export interface HeaderProps {
    search: string;
    setSearch: (value: string) => void;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showDropdown: boolean;
    filteredCharacters: Array<{ id: number; name: string }>;
    handleCharacterClick: (id: number) => void;
    setShowDropdown: (value: boolean) => void;
  }
  