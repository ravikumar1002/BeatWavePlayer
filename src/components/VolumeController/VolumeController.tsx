import { IconButton, Slider, Stack } from "@mui/material"
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

interface IVolumeController {
    isAudioMuted: boolean
    audioRef: React.MutableRefObject<HTMLAudioElement>
    audioLevel: number
    setIsAudioMuted: (isAudioMuted: boolean) => void
    volumeChangeHandler: (e: number | number[]) => void
}

const VolumeController = (props: IVolumeController) => {

    const { isAudioMuted, setIsAudioMuted, audioRef, audioLevel, volumeChangeHandler } = props

    return (
        <Stack spacing={1} direction="row" sx={{ mb: 1, px: 1, mr: 4 }} alignItems="center">
            <IconButton aria-label="next song" onClick={() => {
                if (isAudioMuted) {
                    setIsAudioMuted(false)
                    audioRef.current.volume = audioLevel
                } else {
                    setIsAudioMuted(true)
                    audioRef.current.volume = 0
                }
            }}>
                {isAudioMuted ? <VolumeOffRoundedIcon fontSize="medium" /> : <VolumeUpRounded fontSize="medium" />}
            </IconButton>
            <Slider
                aria-label="Volume"
                value={isAudioMuted ? 0 : audioLevel}
                onChange={(_, value) => {
                    volumeChangeHandler(value)
                }}
                min={0}
                max={1}
                step={0.01}
                sx={{
                    width: '10rem',
                    color: 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                        border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        backgroundColor: '#fff',
                        '&:before': {
                            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                            boxShadow: 'none',
                        },
                    },
                }}
            />
        </Stack>
    )
}

export default VolumeController