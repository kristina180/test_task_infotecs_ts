// import styles from "./page.module.css";
import TableContent from "@/components/TableContent/TableContent";
import FilterUser from "@/components/FilterUser/FilterUser";
import PageList from "@/components/PageList/PageList";

export default function Home() {
  return (
    <>
      <FilterUser />
      <TableContent />
      <PageList />
    </>
  );
}
