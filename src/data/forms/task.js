import constantsData from "../constants";
import { priorityOptionsData, statusOptionsData } from "../tasks";

const {
    description: {
        label: descriptionInputLabel,
        name: descriptionInputName,
    },
    dueData: {
        label: dueDateInputLabel,
        name: dueDateInputName,
    },
    priority: {
        label: priorityInputLabel,
        name: priorityInputName,
    },
    status: {
        label: statusInputLabel,
        name: statusInputName,
    },
    title: {
        label: titleInputLabel,
        name: titleInputName,
    },
} = constantsData.inputs;

const taskFormData = [
    {
        col: {
            md: 4,
            xs: 12,
        },
        label: titleInputLabel,
        name: titleInputName,
        type: "text",
    },
    {
        col: {
            md: 4,
            xs: 12,
        },
        label: descriptionInputLabel,
        name: descriptionInputName,
        type: "text",
    },
    {
        col: {
            md: 4,
            xs: 12,
        },
        data: priorityOptionsData,
        label: priorityInputLabel,
        name: priorityInputName,
        type: "select",
    },
    {
        col: {
            md: 4,
            xs: 12,
        },
        data: statusOptionsData,
        label: statusInputLabel,
        name: statusInputName,
        type: "select",
    },
    {
        col: {
            md: 4,
            xs: 12,
        },
        label: dueDateInputLabel,
        name: dueDateInputName,
        type: "date",
    },
];

export default taskFormData;
