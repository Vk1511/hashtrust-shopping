import React from "react";
import { Filters, ProductList } from "../../Components";

import { Typo } from "../../HSComponents";

export default function Home() {
  return (
    <div>
      <Filters />
      <Typo text="Trending Items" />
      <ProductList />
    </div>
  );
}
