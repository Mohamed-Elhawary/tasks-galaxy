import { constantsData } from "data";
import * as yup from "yup";

const useTaskSchema = () => {
    const {
        form: {
            requiredDescription: requiredDescriptionMsgConstant,
            requiredDueDate: requiredDueDateMsgConstant,
            requiredPriority: requiredPriorityMsgConstant,
            requiredStatus: requiredStatusMsgConstant,
            requiredTitle: requiredTitleMsgConstant,
        },
    } = constantsData.msgs.tasks;

    return yup.object({
        description: yup.string().required(requiredDescriptionMsgConstant),
        dueDate: yup.date().required(requiredDueDateMsgConstant),
        priority: yup.string().required(requiredPriorityMsgConstant),
        status: yup.string().required(requiredStatusMsgConstant),
        title: yup.string().required(requiredTitleMsgConstant),
    });
};

export default useTaskSchema;
