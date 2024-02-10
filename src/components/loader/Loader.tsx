import Image from "next/image";

import styles from "./index.module.scss";

const Loader = () => {
  return (
    <Image
      className={styles.Loader}
      src="/loader.svg"
      alt={"loader"}
      width={50}
      height={50}
    ></Image>
  );
};

export default Loader;
