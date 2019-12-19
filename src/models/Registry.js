export default class Registry {
  static TYPE = {
    PROVENTO: 0,
    DESCONTO: 1,
  }

  static STATUS = {
    NOT_PAID: 0,
    PAID: 1,
    PAID_FINANCIAL_CASH: 2,
    RESERVERD_SAVINGS: 3,
  }

  static getStatusString(status) {
    switch (status) {
    case Registry.STATUS.NOT_PAID:
      return 'Não pago'
    case Registry.STATUS.PAID:
      return 'Pago'
    case Registry.STATUS.PAID_FINANCIAL_CASH:
      return 'Depositar em poup'
    case Registry.STATUS.RESERVERD_SAVINGS:
      return 'Depositado em poup'
    default:
      return ''
    }
  }
}
