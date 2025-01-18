import { constantsData } from "data";
import * as yup from "yup";

const {
    msgs: {
        dateEarlier: dateEarlierMsgConstant,
        dateLater: dateLaterMsgConstant,
    },
} = constantsData;

const useFiltersSchema = () => yup.object().shape({
    dueDateFrom: yup.
        date().
        nullable().
        transform((curr, date) => (date === "" ? null : curr)).
        max(
            yup.ref("dueDateTo"),
            dateEarlierMsgConstant,
        ),
    dueDateTo: yup.
        date().
        nullable().
        transform((curr, date) => (date === "" ? null : curr)).
        min(
            yup.ref("dueDateFrom"),
            dateLaterMsgConstant,
        ),
});

export default useFiltersSchema;
