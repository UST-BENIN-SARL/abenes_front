import { Endpoints } from '@/endpoints'

export const useUser = () => {
  const { get, post } = useHttpClient()
  const isLoading = ref(false)
  const { t } = useI18n ? useI18n() : { t: (key: string) => key }

  const login = async (email: string, password: string) => {
    isLoading.value = true

    const { data, error, pending } = await post(Endpoints.auth.login, {
      email,
      password
    })

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false
      }
    }

    if (data && (data.value as LoginResponse).token != null) {
      isLoading.value = false
      const response = data.value as LoginResponse
      useAuth().access_token.value = response.token as any
      useAuth().user.value = response.user as any
      useCustomToast(t('common.user.login_success'), 'success').temporary()
    }

    return {
      success: !!(data && data.value && (data.value as LoginResponse).token),
      pending: isLoading.value
    }
  }

  const logout = async () => {
    const { error } = await post(Endpoints.auth.logout, {})

    if (error && error.value) {
      useCustomToast(t('common.user.logout_error'), 'error').temporary()
      return
    }

    await useAuth().clearAuthData()
    await navigateTo('/login', { replace: true })
    useCustomToast(t('common.user.logout_success'), 'success').temporary()
  }

  const register = async (userData: RegisterData) => {
    isLoading.value = true

    const formData = new FormData()
    formData.append('email', userData.email)
    formData.append('phoneNumber', userData.phoneNumber)
    formData.append('firstName', userData.firstName)
    formData.append('lastName', userData.lastName)
    formData.append('userType', userData.userType)
    formData.append('password', userData.password)
    if (userData.ifu) formData.append('ifu', userData.ifu)
    if (userData.ifuDocument) formData.append('ifuDocument', userData.ifuDocument)

    const { data, error, pending } = await post(Endpoints.register.init, formData)

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false,
        data: null
      }
    }

    if (data && data.value) {
      isLoading.value = false
      useCustomToast(t('common.user.register_success'), 'success').temporary()
      return {
        success: true,
        pending: false,
        data: data.value
      }
    }

    return {
      success: false,
      pending: isLoading.value,
      data: null
    }
  }

  const registerBusinessDetails = async (businessData: BusinessDetailsData) => {
    isLoading.value = true

    const formData = new FormData()
    formData.append('sessionId', businessData.sessionId)
    formData.append('businessName', businessData.businessName)
    formData.append('activityDescription', businessData.activityDescription)
    formData.append('location', businessData.location)

    if (businessData.ifu) formData.append('ifu', businessData.ifu)
    if (businessData.rccm) formData.append('rccm', businessData.rccm)
    // if (businessData.institutionName)
    //   formData.append('institutionName', businessData.institutionName)

    if (businessData.ifuDocument) formData.append('ifuDocument', businessData.ifuDocument)
    if (businessData.rccmDocument) formData.append('rccmDocument', businessData.rccmDocument)
    if (businessData.institutionDoc) formData.append('institutionDoc', businessData.institutionDoc)

    const { data, error } = await post(Endpoints.register.businessDetails, formData)

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false,
        data: null
      }
    }

    if (data && data.value) {
      isLoading.value = false
      useCustomToast(t('common.user.business_details_success'), 'success').temporary()
      return {
        success: true,
        pending: false,
        data: data.value
      }
    }

    return {
      success: false,
      pending: isLoading.value,
      data: null
    }
  }

  const registerVerify = async (verifyData: VerifyRegistrationData) => {
    isLoading.value = true

    const { data, error } = await post(Endpoints.register.verify, {
      sessionId: verifyData.sessionId,
      code: verifyData.code
    })

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false,
        data: null
      }
    }

    if (data && data.value) {
      isLoading.value = false
      const response = data.value as VerifyRegistrationResponse
      useAuth().access_token.value = response.token as any
      useAuth().user.value = response.user as any
      useCustomToast(t('common.user.verify_success'), 'success').temporary()
      return {
        success: true,
        pending: false,
        data: response
      }
    }

    isLoading.value = false
    return {
      success: false,
      pending: false,
      data: null
    }
  }

  const registerResendCode = async (resendData: ResendCodeData) => {
    isLoading.value = true

    const { data, error } = await post(Endpoints.register.resendCode, {
      sessionId: resendData.sessionId
    })

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false
      }
    }

    if (data && data.value) {
      isLoading.value = false
      useCustomToast(t('common.user.resend_code_success'), 'success').temporary()
      return {
        success: true,
        pending: false
      }
    }

    isLoading.value = false
    return {
      success: false,
      pending: false
    }
  }

  const requestPasswordReset = async (resetData: RequestPasswordResetData) => {
    isLoading.value = true

    const { data, error } = await post(Endpoints.register.requestPasswordReset, {
      email: resetData.email
    })

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false,
        data: null
      }
    }

    isLoading.value = false
    useCustomToast(
      'Si cet email existe, vous recevrez un code de réinitialisation. Vous serez redirigé vers la page de réinitialisation dans quelques instants.',
      'success'
    ).temporary()
    useCustomToast(t('common.user.password_reset_request_success'), 'success').temporary()
    return {
      success: true,
      pending: false,
      data: data?.value || null
    }
  }

  const resetPassword = async (resetData: ResetPasswordData) => {
    isLoading.value = true

    const { data, error } = await post(Endpoints.register.resetPassword, {
      resetToken: resetData.resetToken,
      verificationCode: resetData.verificationCode,
      newPassword: resetData.newPassword
    })

    if (error && error.value) {
      isLoading.value = false
      return {
        success: false,
        pending: false,
        data: null
      }
    }

    if (data && data.value) {
      isLoading.value = false
      useCustomToast(t('common.user.password_reset_success'), 'success').temporary()
      return {
        success: true,
        pending: false,
        data: data.value
      }
    }

    isLoading.value = false
    return {
      success: false,
      pending: false,
      data: null
    }
  }

  const me = async () => {
    const { data, error } = await get(Endpoints.auth.me)

    if (error && error.value) {
      return {
        data: null
      }
    }

    if (data && data.value) {
      // useAuth().user.value = data.value as any;
      return {
        data: data.value
      }
    }

    return {
      data: null
    }
  }

  return {
    login,
    logout,
    me,
    register,
    registerBusinessDetails,
    registerVerify,
    registerResendCode,
    requestPasswordReset,
    resetPassword
  }
}
