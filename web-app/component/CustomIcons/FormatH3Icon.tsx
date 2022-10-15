import {SvgIcon, SvgIconProps} from "@mui/material";

const FormatH3Icon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props} >
            <path
                d="M3 17V7h2v4h4V7h2v10H9v-4H5v4Zm10 0v-2h6v-2h-4v-2h4V9h-6V7h6q.825 0 1.413.587Q21 8.175 21 9v6q0 .825-.587 1.413Q19.825 17 19 17Z"/>
        </SvgIcon>
    );
}

export default FormatH3Icon;
