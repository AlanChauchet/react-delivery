// @flow

export type Theme = {
  fontFamily: string,
  color: {
    background: {
      greyLight: string
    },
    text: {
      primary: string,
      secondary: string
    }
  },
  units: {
    spacing: number,
    radius: number,
  },
  shadows: string[],
  button: {
    primary: {
      borderRadius: number,
      height: number,
      background: string,
      boxShadow: string,
      '&[disabled]': {
        opacity: number
      }
    }
  }
}
