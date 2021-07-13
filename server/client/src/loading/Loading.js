import ReactLoading from "react-loading";
import styles from "../loading/loading.module.css";
import React from "react";

export const Loading = () => {
    return (
        <div className={styles.aligner}>
            <ReactLoading className={styles.center} type={"bars"} color={"#26547C"} height={200} width={100} />
        </div>
    )
}
