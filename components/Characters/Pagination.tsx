// components/Characters/Pagination.tsx
import React from 'react';
import styles from '../../styles/Characters.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const visiblePagesCount = 5;

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
    let end = start + visiblePagesCount - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePagesCount + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={styles.pagination}>
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? styles.active : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
