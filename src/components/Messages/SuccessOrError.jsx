import { Alert } from "@mui/material"

// eslint-disable-next-line react/prop-types
export const SuccessOrError = ({message, severity, moved}) => {

    return (
        <Alert
            variant="filled"
            severity={`${severity}`}
            className={`transition-all duration-500 ease-linear w-64  right-5
                               ${moved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                               fixed bottom-5 mt-10  h-16 flex justify-center items-center  `}
        >
            <p>{message}</p>
        </Alert >
    )
}