interface SNACKBAR_OPTIONS {
  variant? : 'success' | 'warning' | 'default' | 'error' | 'info',
  autoHideDuration?: number,
  disableWindowBlurListener?: boolean,
}


const SNACKBAR_DEFAULT_OPTIONS: SNACKBAR_OPTIONS = {
  autoHideDuration: 3000,
  disableWindowBlurListener: true,
}


export const SNACKBAR_SUCCESS: SNACKBAR_OPTIONS = {
  ...SNACKBAR_DEFAULT_OPTIONS,
  variant: 'success',
}


export const SNACKBAR_WARNING: SNACKBAR_OPTIONS = {
  ...SNACKBAR_DEFAULT_OPTIONS,
  variant: 'warning',
}
