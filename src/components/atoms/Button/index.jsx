import "./styles.scss";
import cx from "classnames";

export default function Button(props) {
    return (
        <button {...props} className={cx("button", props?.className)}>
            {props?.children}
        </button>
    )
}