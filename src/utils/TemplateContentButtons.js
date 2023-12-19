const COMPONENT_BUTTONS_TYPE = 'BUTTONS'
const BUTTONS_PROPERTY = 'buttons'

export const BUTTON_TYPE = {
  PHONE_NUMBER: 'PHONE_NUMBER',
  QUICK_REPLY: 'QUICK_REPLY',
  URL: 'URL'
}

export const parseComponentButtons = (document) => {
  const { templateContent: { components = [] } = {} } = document || {}

  return components
    .filter(({ type }) => type === COMPONENT_BUTTONS_TYPE)
    .flatMap(component => component[BUTTONS_PROPERTY])
    .map((button, index) => ({
      ...button,
      parameter: getButtonParametersByIndex(document, '' + index)
    }))
}

export const getButtonParametersByIndex = (document, index) => {
  const { template: { components = [] } = {} } = document || {}

  const parameters = components
    .filter(component => component.index === index)
    .flatMap(({ parameters }) => parameters)
    .map(parameters => parameters.text)

  return parameters.length === 1 ? parameters[0] : ''
}