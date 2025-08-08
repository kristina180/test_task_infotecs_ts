"use client";

import { useEffect, useState } from "react";
import { useStores } from "../../store/root-store-context";

import { observer } from "mobx-react-lite";

import styles from "./PageList.module.scss";

const PageList = observer(() => {
  const [pageValue, setPageValue] = useState<number>(1);
  const {
    userStore: { filterUsers, sortUsers, getShowedUsers },
  } = useStores();

  const pageCount: number = Math.ceil(sortUsers.length / 10);
  let pages: number[] = Array.from({ length: pageCount }, (_, i) => i + 1);

  function handleClick(page: number) {
    if (page !== pageValue) {
      getShowedUsers(page);
      setPageValue(page);
    }
  }

  useEffect(() => {
    setPageValue(1);
  }, [filterUsers]);

  return (
    <div className={styles.pages}>
      {pages.map((page) => (
        <button
          key={page}
          className={pageValue === page ? styles.buttonSelect : styles.button}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
});
export default PageList;
