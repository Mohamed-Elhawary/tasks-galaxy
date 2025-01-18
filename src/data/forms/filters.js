import constantsData from "../constants";
import { priorityOptionsData } from "../tasks";

const {
    dueDateFrom: {
        label: dueDateFromInputLabel,
        name: dueDateFromInputName,
    },
    dueDateTo: {
        label: dueDateToInputLabel,
        name: dueDateToInput,
    },
    priority: {
        label: priorityInputLabel,
        name: priorityInputName,
    },
} = constantsData.inputs;

const filtersFormData = {
    tasks: [
        {
            data: priorityOptionsData,
            label: priorityInputLabel,
            name: priorityInputName,
            type: "select",
        },
        {
            label: dueDateFromInputLabel,
            name: dueDateFromInputName,
            type: "date",
        },
        {
            label: dueDateToInputLabel,
            name: dueDateToInput,
            type: "date",
        },
    ],
};

export default filtersFormData;
