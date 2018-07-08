export default {
    fontFamily: '\'Roboto\', sans-serif',
    color: {
        background: {
            greyLight: '#F0F3F7'
        },
        text: {
            primary: '#252525',
            secondary: '#8596A6'
        }
    },
    units: {
        spacing: 8,
        radius: 4,
    },
    shadows: [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.10)',
        '0 1px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 8px 0 rgba(0, 0, 0, 0.10)',
    ],
    button: {
        primary: {
            borderRadius: 4,
            height: 40,
            background: 'linear-gradient(#10A2EA, #0F99E8)',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.10)',
            '&[disabled]': {
                opacity: 0.5
            }
        }
    }
}