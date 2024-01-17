import { Slider } from "@mui/material"

interface IProgressSLider {
    sliderValue: number
    sliderFunction: (value: number | number[]) => void
}

export const ProgressSlider = (props: IProgressSLider) => {
    const { sliderValue, sliderFunction } = props

    return (
        <Slider
            aria-label="time-indicator"
            size="small"
            value={sliderValue}
            min={0}
            step={0.01}
            max={100}
            onChange={(_, value) => {
                sliderFunction(value)
            }}
            sx={{
                position: "absolute",
                width: "100%",
                top: 0,
                height: 4,
                margin: "0.1rem",
                padding: "0",
                color:"purple",
                '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%) }`,
                    },
                    '&.Mui-active': {
                        width: 20,
                        height: 20,
                    },
                },
                '& .MuiSlider-rail': {
                    opacity: 0.50,
                },
            }}
        />
    )
}
